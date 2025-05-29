---
title: Jetty + Spring 4 + Jersey 2 Integration
date: 10 Jul 2015
tags: 
- java,
- open-source
alias:
- /tech/jetty-spring-jersey-integration
---

Today most of the enterprise systems are built over MicroServices. The advantages of the same are
well-explained as 12factor principles. In Java, this translates to using `Jetty` as the embedded
HTTP server, running `Jersey` or `RestEasy` or alike as the `Jax-RS` based REST framework.

Integration between `Spring 3` and `Jersey 2` is well documented and works great. With the coming of
`Spring 4`, the integration still works if you are building a web application using `Tomcat` or `JBoss`
or any other application server. However, for standalone `Java` applications this is broken.

Last night, I went poking my nose inside the `jersey-spring3` module to dig the reason for the same.
And finally found the reason, and a fix for the same.


### Quick Fix

For the impatient, a very simple fix to this is to create a new `WebApplicationContext`, with the parent
set to the `ApplicationContext` you created manually, and then set it in the `Jetty`s `ServletContext` as:

```java
ServletContextHandler context = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
context.setContextPath("/");

AnnotationConfigWebApplicationContext webContext = new AnnotationConfigWebApplicationContext();
webContext.setParent(rootContext);
webContext.refresh();
webContext.start();

context.setAttribute(WebApplicationContext.class.getName() + ".ROOT", webContext);
```

This will ensure that all your dependencies get wired in your web-services.

For why it happens, continue reading.

### Why is it broken?

The class `org.glassfish.jersey.server.spring.SpringComponentProvider` is responsible for detecting
existence of `Spring` context and wiring the same withint the `Jersey` code so that all your dependencies
can be `@Autowire`d or `@Inject`ed. Let's take a look at the `initialize` method of the class:

```java
@Override
public void initialize(ServiceLocator locator) {
	this.locator = locator;

	if (LOGGER.isLoggable(Level.FINE)) {
		LOGGER.fine(LocalizationMessages.CTX_LOOKUP_STARTED());
	}

	ServletContext sc = locator.getService(ServletContext.class);

	if (sc != null) {
		// servlet container
		ctx = WebApplicationContextUtils.getWebApplicationContext(sc);
	} else {
		// non-servlet container
		ctx = createSpringContext();
	}
	if (ctx == null) {
		LOGGER.severe(LocalizationMessages.CTX_LOOKUP_FAILED());
		return;
	}

	// more code omitted for brevity
}
```

If you look above, if `Jersey` figures out that there is a `ServletContext` already present, which would
be as you are running a `Jetty` server, it will then only read the `ApplicationContext`/`ctx` via the code line:

```java
ctx = WebApplicationContextUtils.getWebApplicationContext(sc);
```

If it detects that no `ServletContext` is present, only then it creates a new `ApplicationContext` instance via the
call to,

```java
ctx = createSpringContext();
```

Now the call to `WebApplicationContextUtils.getWebApplicationContext(sc)` translates to the following code (some constant
references have been modified to make the code more understandable):

```java
public static WebApplicationContext getWebApplicationContext(ServletContext sc, String attrName) {
	Assert.notNull(sc, "ServletContext must not be null");
	Object attr = sc.getAttribute(WebApplicationContext.class.getName() + ".ROOT");
	if (attr == null) {
		return null;
	}
	if (attr instanceof RuntimeException) {
		throw (RuntimeException) attr;
	}
	if (attr instanceof Error) {
		throw (Error) attr;
	}
	if (attr instanceof Exception) {
		throw new IllegalStateException((Exception) attr);
	}
	if (!(attr instanceof WebApplicationContext)) {
		throw new IllegalStateException("Context attribute is not of type WebApplicationContext: " + attr);
	}
	return (WebApplicationContext) attr;
}
```

As there is not `WebApplicationContext.class.getName() + ".ROOT"` attribute present in the `ServletContext` - `Jersey`
fails to wire the dependencies.

Now, let's take a look at the `createSpringContext()` method (again, some constants have been inlined):

```java
private ApplicationContext createSpringContext() {
  ApplicationHandler applicationHandler = locator.getService(ApplicationHandler.class);
  ApplicationContext springContext = (ApplicationContext) applicationHandler.getConfiguration().getProperty("contextConfig");
  if (springContext == null) {
    String contextConfigLocation = (String) applicationHandler.getConfiguration().getProperty("contextConfigLocation");
    springContext = createXmlSpringConfiguration(contextConfigLocation);
  }

  return springContext;
}
```

One another way to fix this, would be be to add an `ApplicationHandler` class that sets the `contextConfig` property in its configuration,
but with `annotation` support and `classpath` scanning, I don't see why someone would want to do that.

I would raise a pull-request for the same in `Jersey` code sometime soon.

Hope this helps.