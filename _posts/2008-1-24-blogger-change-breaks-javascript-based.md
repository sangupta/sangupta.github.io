---
layout: post
title: Blogger change breaks Javascript based themes
permalink: /tech/blogger-change-breaks-javascript-based.html
redirect_from: "/2008/01/blogger-change-breaks-javascript-based.html"
date: Thu Jan 24 23:45:00 IST 2008
sharingURL: http://blog.sangupta.com/2008/01/blogger-change-breaks-javascript-based.html
tags: blogger my-projects
---

A recent Blogger update has broken many Javascript Blogger themes. The issue cropped up 
because of the way we code our Javascripts. Some of us are finicky enough to make them 
browser-safe for those old muggy browsers which don't recognize the `<script>` tag.

```javascript
<script type='text/javascript'>
<!-- prevent old browsers from rendering this
alert("Hello World!);
// prevent javascript interpreter from parsing end tag -->
</script>
```

Now with the new update, what is happening is, Blogger cleans up all the new line breaks 
from the `script` tag. This makes the whole script as a comment and renders it unfunctional. 
Hence, the themes break.

```javascript
<script type='text/javascript'>
<!-- prevent old browsers from rendering this alert("Hello World!); // prevent javascript interpreter from parsing end tag -->
</script>
```

The quick-fix to this problem is to encapsulate all your script inside a `CDATA` 
tag. This would solve the problem. Actually this is a problem with the scripts and 
not with Blogger. They just made their system XML compliant.

```javascript
<script type='text/javascript'>
//<![CDATA[
alert("Hello World");
//]]>
</script>
```

The issue was reported by Dave on my <a href="http://foliage-in-xml.blogspot.com/2007/12/modified-foliage-for-download.html">Modified Foliage Theme</a> blog. Thanks Dave for reporting it so soon.

Hope this helps.
