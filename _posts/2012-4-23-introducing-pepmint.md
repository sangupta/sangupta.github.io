---
layout: default
title: Introducing Pepmint!
permalink: /2012/04/introducing-pepmint.html
redirect_from: "/2012/04/introducing-pepmint.html"
date: Mon Apr 23 15:27:00 IST 2012
sharingURL: http://blog.sangupta.com/2012/04/introducing-pepmint.html
tags: java my-projects
---
I am happy to introduce 
<a href="">PepMint</a>, a JAVA wrapper over the awesome 
<a href="http://pygments.org/">Python's Pygments</a> code syntax highlighting library. With Pepmint you can easily syntax highlight your own piece of snippet using code. This essentially helps us to build tools that consume code and output HTML - blog engines, presentation tools, documentation generators etc.
<br>
<br>
<h3>Usage</h3>Super-easy way to use the library is described in the example below,
<br>
<br>
<pre class="brush:java">public String highlight(String code, String language) {<br>    Pepmint pepmint = null;<br>    Lexer lexer = pepmint.newLexer(format);<br>    Formatter formatter = pepmint.newHtmlFormatter(formatterParams);<br><br>    String formattedCode = pepmint.highlight(code, lexer, formatter);<br>    return formattedCode;<br>}<br></pre>
<br>
<h3>Dependencies</h3>The library is self-contained and does not depend on any third-party library. It is built using,
<br>
<ul>
    <li>Java 1.6</li>
    <li>Jython 2.5.6</li>
    <li>Pygments 1.4</li>
</ul>
<br>
<h3>Project Links</h3>More details on the project can be found on project home page, 
<a href="http://www.sangupta.com/projects/pepmint">http://www.sangupta.com/projects/pemint</a>.
<br>Source Code: 
<a href="https://github.com/sangupta/pepmint">https://github.com/sangupta/pepmint</a>
<br>Downloads: 
<a href="https://github.com/sangupta/pepmint/downloads">https://github.com/sangupta/pepmint/downloads</a>
<br>Issue Management: 
<a href="https://github.com/sangupta/pepmint/issues">https://github.com/sangupta/pepmint/issues</a>
<br>Usage Instructions: 
<a href="https://github.com/sangupta/pepmint/blob/master/README.md">https://github.com/sangupta/pepmint/blob/master/README.md</a> 
<br>
<br>Have Fun Highlighting!
