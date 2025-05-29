---
title: Announcing AM library 1.0.0
date: 22 Dec 2016
tags: 
- java,
- open-source
alias:
- /tech/announcing-am-1.0.0.html
---

I am happy to announce the launch of a new library called **AM** or **Assert-Mocks
for unit-testing Java servlet API code**. The library aims to make it a lot easier
and faster to test the servlet API code, including and not limited to testing of
servlets, servlet filters and tag libraries. It helps remove the need of using
[Mockito](https://github.com/mockito/mockito) framework for setting up
expectations.

## Usage

The following two examples should help you get started easily. More examples
are being added to the [Github:sangupta/am](https://github.com/sangupta/am)
repository.

## Testing a simple JSP tag

```java
AmTagLibTestHelper.testTagOutput(

    // the class implementing custom tag
    MyCustomJSPTag.class,

    // the expected String response
    expectedOutputWrittenToJspWriter,

    // set the values before invocation
    new GenericConsumer<MyCustomJSPTag>() {

        // method argument of same type as the first param
        public boolean consume(MyCustomJSPTag tag) {
            // set the properties of the tag
            tag.setProperty1(prop1);
            tag.setProperty2(prop2);

            // and so on...

            // return either true or false
            // it does not matter in this case
            return true;
        }
    }

);
```

## Testing a Servlet Filter

```java
// obtain an instance of the filter
MyCustomFilter filter = AmServletFilterTestHelper.getFilterForUnitTesting(MyCustomFilter.class);

// create request and response objects as filter will need them
// the AmHttpServletRequest.getDefault() method returns a request for a server
// deployed on localhost on port 80, and being hit with same machine where
// the servlet context is `context` and the path is `/home.html`
AmHttpServletRequest request = AmHttpServletRequest.getDefault("home.html");

// the response object to which filter will write
AmHttpServletResponse response = new AmHttpServletResponse();

// filter invocation
AmServletFilterTestHelper.assertFilterChainInvoked(filter, request, response);

// assert what was set in response
Assert.assertEquals(200, response.getStatusCode());
Assert.assertEquals("myCustomHeaderValue", response.getHeader("X-Custom-Header"));
```

## Source &amp; Downloads

The source code for the library is available at [Github:sangupta/am](https://github.com/sangupta/am)

The library is available at the following Maven coordinates:

```xml
<dependency>
    <groupId>com.sangupta</groupId>
    <artifactId>am</artifactId>
    <version>1.0.0</version>
</dependency>
```

Happy Hacking!