---
title: Cookie behavior for local pages in Adobe AIR HTML control
date: 27 Sep 2010
tags: 
- adobe-air
alias:
- /tech/cookie-behavior-for-local-pages-in.html
- /2010/09/cookie-behavior-for-local-pages-in.html
---

Adobe AIR includes the very powerful WebKit engine to render HTML content inside an AIR 
application. In one of our applications we heavily use this engine to render all sorts of 
HTML content. Recently, it so happened, that when viewing a local page (an HTML file on 
disk) the cookies set by the page were not being preserved. At first, it seemed like an 
AIR/WebKit limitation. Then we tried the <a href="http://www.quirksmode.org/js/cookies.html">Quirks 
Mode Cookies</a> page for testing various scenarios, storing the file on our local machine.

<!-- break here -->

In most of the scenarios the local page was able to store and retrieve cookies in subsequent 
launches of application (the cookies were being saved across sessions). However, in one of 
the use-cases it failed. On digging deep under the hood, I found the root cause of the problem. 

In case you are using `app-storage:/` protocol when loading the page, i.e. your page is stored 
in the AIR local storage and you are referencing the page via AIR protocol, the cookies are 
not preserved. This may be due to the fact that WebKit in turn does not recognizes this protocol 
and hence, fails to store/retrieve cookies.

A simple fix to the problem was to override the `set location` method of `mx.controls.HTML` 
class and include the following code,

```as3
override public function set location(value:String):void {
	if(value != null && value.length > 12) {
		var s:String = value.substring(0, 12);
		if('app-storage:' == s) {
			var f:File = new File(value);
			value = f.nativePath();
		}
	}

	super.location = value;
}
```
This will make sure that all the URL's you load are loaded via the `file://` protocol, and hence, 
all your cookies will be preserved.

Hope this helps.