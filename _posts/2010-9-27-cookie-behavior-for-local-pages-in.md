---
layout: default
title: Cookie behavior for local pages in Adobe AIR HTML control
permalink: /2010/09/cookie-behavior-for-local-pages-in.html
redirect_from: "/2010/09/cookie-behavior-for-local-pages-in.html"
date: Mon Sep 27 10:43:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/09/cookie-behavior-for-local-pages-in.html
tags: adobe-air
---
Adobe AIR includes the very powerful WebKit engine to render HTML content inside an AIR application. In one of our applications we heavily use this engine to render all sorts of HTML content. Recently, it so happened, that when viewing a local page (an HTML file on disk) the cookies set by the page were not being preserved. At first, it seemed like an AIR/WebKit limitation. Then we tried the 
<a href="http://www.quirksmode.org/js/cookies.html">Quirks Mode Cookies</a> page for testing various scenarios, storing the file on our local machine.
<br>
<br>In most of the scenarios the local page was able to store and retrieve cookies in subsequent launches of application (the cookies were being saved across sessions). However, in one of the use-cases it failed. On digging deep under the hood, I found the root cause of the problem. 
<br>
<br>In case you are using 
<tt>app-storage:/</tt> protocol when loading the page, i.e. your page is stored in the AIR local storage and you are referencing the page via AIR protocol, the cookies are not preserved. This may be due to the fact that WebKit in turn does not recognizes this protocol and hence, fails to store/retrieve cookies.
<br>
<br>A simple fix to the problem was to override the 
<b>set location</b> method of 
<b>mx.controls.HTML</b> class and include the following code,
<br>
<br>
<pre class="brush: as3">override public function set location(value:String):void {<br>    if(value != null &amp;&amp; value.length &gt; 12) {<br>        var s:String = value.substring(0, 12);<br>        if('app-storage:' == s) {<br>            var f:File = new File(value);<br>            value = f.nativePath();<br>        }<br>    }<br><br>    super.location = value;<br>}</pre>
<br>This will make sure that all the URL's you load are loaded via the 
<b>file://</b> protocol, and hence, all your cookies will be preserved.
<br>
<br>Hope this helps.
