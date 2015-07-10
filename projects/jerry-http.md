---
layout: default
title: Jerry-Http
github: jerry-http
---

<h1>Jerry HTTP</h1>

[![Build Status](https://travis-ci.org/sangupta/jerry-http.svg?branch=master)](https://travis-ci.org/sangupta/jerry-http)
[![Coverage Status](https://coveralls.io/repos/sangupta/jerry-http/badge.png)](https://coveralls.io/r/sangupta/jerry-http)
[![Maven Version](https://maven-badges.herokuapp.com/maven-central/com.sangupta/jerry-http/badge.svg)](https://maven-badges.herokuapp.com/maven-central/com.sangupta/jerry-http)

**Jerry-Http** library makes it possible to make internet calls super-easy. All calls return a `WebResponse` object
that has many utility methods to work with. Most of the HTML/CSS/JS resource calls, or REST calls are now a single
line of code away.

Let's see the details in the following example:

```java
// fetch the response from http://sangupta.com
WebResponse response = WebInvoker.getResponse("http://sangupta.com");

// check if we could connect to the server
if(response == null) {
	// could not connect - either no internet, or no host
}

if(!response.isSuccess()) {
	// we received an HTTP error code: 4xx or 5xx
}

// get string contents in encoding specified
String content = response.getContent();

// get byte-array
byte[] bytes = response.asBytes();
```

More examples are detailed below.

The library is tested on the following JDK versions:

* Oracle JDK 8
* Oracle JDK 7
* Open JDK 7

### Examples

GET a `WebResponse` from http://sangupta.com

```java
WebResponse response = WebInvoker.getResponse("http://sangupta.com");
```
