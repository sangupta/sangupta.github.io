---
layout: default
title: Java 7: String switching
permalink: /2011/06/java-7-string-switching.html
redirect_from: "/2011/06/java-7-string-switching.html"
date: Wed Jun 29 21:33:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/06/java-7-string-switching.html
tags: java java7
---
Today, I started my journey into the world of Java 7. Quite late I know, but as they 
<i>better late than never</i>. So I now have a build of Java 7 SDK on my desktop, and spent some time fiddling with the new features in. One of the most striking features of Java 7, specially after working in ActionScript 3, is the ability to 
<b>switch on strings</b>.
<br>
<br>ActionScript developers would know the value and power of this small feature, as it gets rid of those ugly multiple 
<tt>if-else if-else if-else</tt> blocks. One way to fool around was to use 
<b>Enum</b>s but that to me seemed overkill specifically if the input data was coming from a file, database or human interface.
<br>
<br>Thus, what looked like in the Java world till Java 6
<br>
<pre class="brush: java">public void someMethod(String command) {<br>    if("dir".equals(command)) {<br>        // list the files in folder<br>    } else if("cls".equals(command)) {<br>        // clear the screen<br>    } else if("rename".equals(command)) {<br>        // rename the given file<br>    } else if("delete".equals(command)) {<br>        // delete the given file<br>    } else if("ver".equals(command)) {<br>        // display OS version<br>    } else {<br>        throw new IllegalArgumentException("Command not found.");<br>    }<br>}<br></pre>
<br>has now been reduced to something like,
<br>
<pre class="brush: java">public void someMethod(String command) {<br>    switch(command) {<br>        case "dir":<br>            // list file in folder<br>            break;<br><br>        case "cls":<br>            // clear the screen<br>            break;<br><br>        case "rename":<br>            // rename the given file<br>            break;<br><br>        case "delete":<br>            // delete the given file<br>            break;<br><br>        case "ver":<br>            // display OS version<br>            break;<br><br>        default:<br>            throw new IllegalArgumentException("Command not found.");<br>    }<br>}<br></pre>
<br>Foshizle, it is not a super-developer-feature that may make you say a 
<tt>WOW</tt>, but it surely would make some pieces of code readable, and easily debug-
<i>able</i>.
<br>
<br>Happy Coding!
