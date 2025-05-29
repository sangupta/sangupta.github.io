---
title: Introducting Java based HTTP server
date: 26 Feb 2015
tags: 
- coding-techniques
- java
alias:
- /tech/introducing-java-http-server.html
---

All web developers need an HTTP server to test their code snippets every other day. If
one is using `OSX` it is as simple as running the following in shell:

```sh
$ python -m SimpleHTTPServer
```

If someone is using `NodeJS` and have `http-server` installed, it becomes easy as:

```sh
$ http-server
```

However, for `Java` developers like me, it may get nasty. Either you installed `python`
or `NodeJS` just for the purpose. Using something like `Apache HTTPD` or `nginx` becomes
an overkill, as configuring them itself takes a couple of minutes.

Faced with this issue, I wrote a simple HTTP server in Java, that can be executed in any
given folder to host the same on HTTP. The following features are available:

* Support for `index.html` and `index.htm`
* Support for weak `ETags`
* Support for directory listing
* Support for correct MIME type for many common file extensions
* Support for `If-Modified-Since` header
* Support for returning a `HTTP NOT_FOUND` for hidden files
* All features can be enabled/disabled using configuration flags

The latest binary can be downloaded directly from the following link:

**1.2.0**: http://static.sangupta.com/binaries/httpd-1.2.0.jar

```
MD5: 7452a7b0653544a7d270df06e47c4a06
SHA1: 124197a24c2256e0f0bd36f8923809aa1292b198
```

For usage information and older binaries, please refer to the Github page at
https://github.com/sangupta/httpd

Hope this helps!