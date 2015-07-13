---
layout: project
title: Unwind
github: unwind
---

`unwind` is a very simple Java library based on Apache `HTTP Client` library that given a short URL unwinds it
to the final destination. This is preferable in conditions when you are crawling content from 3rd party sources
and would like to show the actual link someone is pointing to.

### Features

* Provides methods to indicate if a URL is shortened by any of the major URL shorteners
* Provides methods to indicate if a URL has redirects
* Provides methods to find the final destination given a URL

### Usage

Using the library is as simple as:

```java
UnwindService service = new HttpUnwindServiceImpl();

// check if this is a major URL shortener
// returns true
boolean result = service.isMajorShortener("http://goo.gl/LjAG");

// returns false
result = service.isMajorShortener("http://google.com");

// returns true
result = service.isRedirectedURL("http://github.com");

// for final destination URL
// returns https://www.facebook.com/
String finalURL = service.getFinalURL("http://facebook.com");
```

### License

The library is released under the terms of **Apache Public License Version 2**.
