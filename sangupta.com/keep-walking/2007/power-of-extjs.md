---
title: Power of ExtJS
date: 30 Oct 2007
tags: 
- coding-techniques
- java
- web
alias:
- /tech/power-of-extjs.html
- /2007/10/power-of-extjs.html
---

Recently, I had a requirement wherein the client wanted to edit data from a table 
using a grid that would be editable, sortable, paginated, with column resizing and 
column locking. Anyone with a .NET background would say, quite easy. But, what if 
you had to implement all these features in Java? This was a real challenge, for I 
had never in my life came across such a thing in Java. I had heard of a few libraries 
out there in OS (Open-source) but nothing could come even close to it. So what was 
the solution?

<!-- break here -->

Google - was the starting point. A quick search revealed 
<a href="http://displaytag.sourceforge.net/">DisplayTags</a>. As it says, 

> Give it a list of objects and it will handle column display, sorting, paging, cropping, 
> grouping, exporting, smart linking and decoration of a table in a customizable XHTML style.

I digged deeper and found that it could not provide all the features, I was looking for. 
But, yes it had most of them. A quick download and a setup in Tomcat was all what I needed. 
The samples included made it quite easy to understand. I was on my way implementing it, when 
I banged across a rock. It could not be used with inline frames. Ahhh - what an architecture 
of the application!

Now what? Searched and searched and searched. Even coded a paginating grid for the purpose. 
Then went on to struggle with CSS and DIV to freeze a specified column. Lots of hit and 
trial combinations lead to partial success. Implemented server-side sorting, ok the application 
would be an internal intranet applcation - so I didn't much bother. But how about column resizing. 
Can that be achieved? I gave up - and even my client.

Somehow to my luck I came across the Yahoo User Interface library (YUI) and 
<a href="http://www.extjs.com">ExtJS</a>, its extensions. The demo on the homepage were good 
enough to knock me out of my seat. The 
<a href="http://extjs.com/deploy/dev/examples/grid/edit-grid.html">editable grid</a> and 
<a href="http://extjs.com/deploy/dev/examples/grid/paging.html">paginating grid</a> samples 
drew a conclusion - I had to use this. It was mesmerizing and simply wonderful! A few more 
samples unleash the power of ExtJS like the 
<a href="http://extjs.com/deploy/dev/examples/desktop/desktop.html">Desktop</a> and the 
<a href="http://extjs.com/deploy/dev/examples/feed-viewer/view.html">Feed Viewer</a>

Coding the grid was a bit uneasy at first as not much documentation is available at the 
beginners level. Once you are done with the initial docs, it's a breeze. For reasons better 
understood, I cannot provide the code and explanatory notes here.

For those who would like to fiddle out with ExtJS right away, check these resources,

* Official <a href="http://www.extjs.com">ExtJS</a> website
* <a href="http://tof2k.com/ext/formbuilder/">Ext GUI Builder</a> that generates a JSON for the layout you design
* ExtJS <a href="http://extjswordpress.net/">Wordpress</a> theme demo
* ExtJS <a href="http://extjstest.blogspot.com/">Blogger</a> theme demo
* <a href="http://www.pazor.com/Clients/GoogleDesktop/Files/examples/window/desktop.html">ExtJS Desktop</a>. Login using username as google and password as edesktop. The click on top left Login button, and sign-in with your google account
* <a href="http://www.codeplex.com/ExtJsExtenderControl">.NET Wrappers for ExtJS</a> with design-time support. Check <a href="http://www.extendersamples.qsh.eu/">this example</a> using the extenders
* A demo on how to integrate ExtJS with Java/Spring/DWR (<a href="http://extjs.com/forum/showthread.php?t=5586&amp;highlight=java">read here</a>). Download the sample <a href="http://scottwalter.com/mint/pepper/tillkruess/downloads/download.php?uri=http%3A//scottwalter.com/files/java-ext.zip">here</a>
* <a href="http://extjs.com/forum/showthread.php?t=12545&amp;highlight=java">Read</a> on how to integrate ExtJS and Struts.

Hope this helps!