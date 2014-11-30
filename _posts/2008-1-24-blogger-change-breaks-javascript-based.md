---
layout: default
title: Blogger change breaks Javascript based themes
permalink: /2008/01/blogger-change-breaks-javascript-based.html
redirect_from: "/2008/01/blogger-change-breaks-javascript-based.html"
date: Thu Jan 24 23:45:00 IST 2008
sharingURL: http://blog.sangupta.com/2008/01/blogger-change-breaks-javascript-based.html
tags: blogger my-projects
---
A recent Blogger update has broken many Javascript Blogger themes. The issue cropped up because of the way we code our Javascripts. Some of us are finicky enough to make them browser-safe for those old muggy browsers which don't recognize the &lt;script&gt; tag.
<p></p>
<pre class="brush: js">&lt;script type='text/javascript'&gt;<br>&lt;!-- prevent old browsers from rendering this<br>alert("Hello World!);<br>// prevent javascript interpreter from parsing end tag --&gt;<br>&lt;/script&gt;<br></pre>
<p align="justify">Now with the new update, what is happening is, Blogger cleans up all the new line breaks from the &lt;script&gt; tag. This makes the whole script as a comment and renders it unfunctional. Hence, the themes break.</p>
<pre class="brush: js">&lt;script type='text/javascript'&gt;<br>
    <!-- prevent old browsers from rendering this alert("Hello World!); // prevent javascript interpreter from parsing end tag --><br>&lt;/script&gt;<br></pre>
<p align="justify">The quick-fix to this problem is to encapsulate all your script inside a CDATA tag. This would solve the problem. Actually this is a problem with the scripts and not with Blogger. They just made their system XML compliant.</p>
<pre class="brush: js">&lt;script type='text/javascript'&gt;<br>//&lt;![CDATA[<br>alert("Hello World");<br>//]]&gt;<br>&lt;/script&gt;<br></pre>
<p align="justify">The issue was reported by Dave on my <a href="http://foliage-in-xml.blogspot.com/2007/12/modified-foliage-for-download.html">Modified Foliage Theme</a> blog. Thanks Dave for reporting it so soon.<br><br>Hope this helps.</p>
