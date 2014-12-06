---
layout: post
title: Introducing Pepmint!
permalink: /tech/introducing-pepmint.html
redirect_from: "/2012/04/introducing-pepmint.html"
date: Mon Apr 23 15:27:00 IST 2012
sharingURL: http://blog.sangupta.com/2012/04/introducing-pepmint.html
tags: java my-projects
---

I am happy to introduce <a href="">PepMint</a>, a JAVA wrapper over the awesome 
<a href="http://pygments.org/">Python's Pygments</a> code syntax highlighting 
library. With Pepmint you can easily syntax highlight your own piece of snippet 
using code. This essentially helps us to build tools that consume code and output 
HTML - blog engines, presentation tools, documentation generators etc.
<!-- break here -->

Usage
-----
Super-easy way to use the library is described in the example below,

```java
public String highlight(String code, String language) {
	Pepmint pepmint = null;
	Lexer lexer = pepmint.newLexer(format);
	Formatter formatter = pepmint.newHtmlFormatter(formatterParams);
	String formattedCode = pepmint.highlight(code, lexer, formatter);
	return formattedCode;
}
```

Dependencies
------------
The library is self-contained and does not depend on any third-party library. It is built using,

* Java 1.6
* Jython 2.5.6
* Pygments 1.4

Project Links
-------------
More details on the project can be found on project home page, 
<a href="http://www.sangupta.com/projects/pepmint">http://www.sangupta.com/projects/pemint</a>.
<br>Source Code: 
<a href="https://github.com/sangupta/pepmint">https://github.com/sangupta/pepmint</a>
<br>Downloads: 
<a href="https://github.com/sangupta/pepmint/downloads">https://github.com/sangupta/pepmint/downloads</a>
<br>Issue Management: 
<a href="https://github.com/sangupta/pepmint/issues">https://github.com/sangupta/pepmint/issues</a>
<br>Usage Instructions: 
<a href="https://github.com/sangupta/pepmint/blob/master/README.md">https://github.com/sangupta/pepmint/blob/master/README.md</a> 

Have Fun Highlighting!
