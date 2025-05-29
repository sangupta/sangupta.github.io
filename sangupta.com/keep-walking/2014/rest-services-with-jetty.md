---
title: Building a REST Server using Jetty
date: 20 Dec 2014
tags: 
- coding-techniques
- java
alias:
- /tech/rest-server-with-jetty.html
---

Today, most of the enterprise applications are distributed. And this also calls that
the various components communicate with each other either using a `Message Queue` or
via `REST services`. I have seen people still building Java web applications that are
eventually deployed in a container like `Tomcat`. This is actually **over engineering**.

<!-- break here -->

To build applications that expose `REST services` to be consumed, we do not need a
server like `Tomcat`, for that is inefficient use of resources. Running such applications
on servers like `Jetty` and `Netty` would be much more efficient. Simply fire a Java
command line application and the services are exposed. This also helps in **scalability**
of the application. For scaling, just add more nodes and fire the Java process rather
than configuring Tomcat, deploying a WAR and then waiting for container to start up.

To start with just add a `JAX-RS` based webservice as under:

```java
package com.sangupta.keepwalking.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/service/test")
public class TestWebService {

   @GET
   @Path("/available")
   @Produces(MediaType.TEXT_PLAIN)
   public String available() {
      return "yes";
   }

}
```

To load this webservice via `Jersey` and wire everything up, the following `main` function can be used:

```java
package com.sangupta.keepwalking;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

public class JobQueueServer {

 public static void main(String[] args) {

    ServletContextHandler context = new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
    context.setContextPath("/");

    Server jettyServer = new Server(9999);
    jettyServer.setHandler(context);

    ServletHolder jerseyServlet = context.addServlet(ServletContainer.class, "/*");
    jerseyServlet.setInitOrder(0);

    // Tells the Jersey Servlet which REST service/class to load.
    jerseyServlet.setInitParameter("jersey.config.server.provider.packages", "com.sangupta.keepwalking.rest");

    try {
       jettyServer.start();
       jettyServer.join();
      } catch (Exception e) {
       e.printStackTrace();
    } finally {
       jettyServer.destroy();
    }
 }

}
```

The above code will launch your REST services on local port `9999`.

I have found building services this way both efficient in terms of coding and deployment time,
in ease of creating new sub-systems, and also in resources and reduction in latency. `Tomcat`
is really good when we have a complete web application, say with session management, security,
`JSP`s and all, but when it comes out to rolling simple webservices, I have found `Jetty` to
perform better.

**Note** here that `Netty` supposedly runs faster than `Jetty` but I have never rolled a sub-system
in production based on the same, and thus I won't comment on its performance advantages.

### 16 June 2015 Update

Adding the `dependencies` section of the `pom.xml` file that I use to run the sample code:

```xml
	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.eclipse.jetty</groupId>
			<artifactId>jetty-server</artifactId>
			<version>9.2.5.v20141112</version>
		</dependency>
		<dependency>
			<groupId>org.eclipse.jetty</groupId>
			<artifactId>jetty-servlet</artifactId>
			<version>9.2.5.v20141112</version>
		</dependency>
		<dependency>
			<groupId>org.glassfish.jersey.core</groupId>
			<artifactId>jersey-server</artifactId>
			<version>2.17</version>
		</dependency>
		<dependency>
			<groupId>org.glassfish.jersey.containers</groupId>
			<artifactId>jersey-container-jetty-servlet</artifactId>
			<version>2.17</version>
		</dependency>
	</dependencies>
```

Hope this helps!