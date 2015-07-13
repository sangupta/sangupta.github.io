---
layout: project
title: HAR
github: har
---

HAR file reader, writer and viewer.

`har` is a library for reading and writing HAR files directly. The need for building another
library arose from the fact that all other implementations use, `jackson` JSON parser, whereas
I needed to use Google `GSON` library for parsing. As a library it also includes many convenience
methods to working with the HAR model instance.

`har` is also a command line application that can be used to view the `HAR` files offline, either
on the console or inside the browser. Every other known tool currently requires you to either go
online, or install a browser extension or run a PHP (or another) server.

`har` is also a set of utilities that help in working with files, like extracting specific pages
or request, or viewing the response. 

### Usage

Reading a HAR file is as easy as:

```java
// via a file
Har har = HarUtils.read(new File("~/test.har"));

// via a string
har = HarUtils.read(" { .... HAR as string } ");

// via a reader
har = HarUtils.read(new FileReader(new File("~/test.har")));

// via a JsonElement
har = HarUtils.read(harJsonElement);
```

### License

The library is released under the terms of **Apache Public License Version 2**.
