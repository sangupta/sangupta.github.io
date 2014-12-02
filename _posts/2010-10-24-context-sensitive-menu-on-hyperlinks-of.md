---
layout: post
title: Context Sensitive menu on hyperlinks of Adobe AIR HTML control
permalink: /tech/context-sensitive-menu-on-hyperlinks-of.html
redirect_from: "/2010/10/context-sensitive-menu-on-hyperlinks-of.html"
date: Sun Oct 24 18:46:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/10/context-sensitive-menu-on-hyperlinks-of.html
tags: adobe-air coding-techniques
---

Adobe AIR includes a rich HTML control based on the open-source 
<a href="http://webkit.org/">WebKit</a> engine. This allows AIR applications to display rich HTML control and provide custom functionality around those web pages. Thus, an application can allow a user to display an HTML control and add functionalities like spell-check, dictionary support etc. One of the most required functionalities when making rich Web Application is the use of custom context-sensitive menus. Context-sensitive menus is a list of menu options, that open when you right click on an element of a user-interface (subject that the element supports one).
<br>
<br>In this post we will try and look on how to add a custom context-sensitive menu on hyperlinks present in an HTML page loaded inside an AIR HTML control. We would two menu options called, ‘Open link in Browser’ and ‘Copy Link’ to the context-sensitive menu. To achieve the same adopt the following procedure,
<br>
<ol>
    <li>Create an AIR application consisting of an HTML control. </li>
    <li>Capture the Event.COMPLETE event handler so as to figure out when an HTML page has completely loaded inside the HTML control. </li>
    <li>Wire a context-sensitive menu event listener that is invoked when a user right-clicks inside the HTML control. </li>
    <li>In the event handler for the same, generate a context sensitive menu and display it at the right location. </li>
</ol>Done. A snapshot of how the application looks like is,
<br>
<br>
<div class="separator" style="clear: both; text-align: center;">
    <a href="http://3.bp.blogspot.com/_Igofzvi0TDM/TMKpsrHK3lI/AAAAAAAAFdg/zlHkHCUpvok/s1600/ContextSensitiveMenuOnHyperlinksInHTMLControl.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="251" src="http://3.bp.blogspot.com/_Igofzvi0TDM/TMKpsrHK3lI/AAAAAAAAFdg/zlHkHCUpvok/s320/ContextSensitiveMenuOnHyperlinksInHTMLControl.PNG" width="320"></a>
</div>
<br>Below is the code that makes use of the above approach in a simple application. When executing the example, wait for the page to load completely. Once, all Javascript’s on the page have loaded, try clicking on the hyperlinks in the page displayed.
<br>
<br>The code for the application is also available in my 
<a href="http://code.google.com/p/sangupta">Google Code</a> repository.
<br>
<br>The main MXML code is as,
<br>
<br>
<pre class="brush: xml">
    <s:windowedapplication height="600" initialize="onInit()" width="800" xmlns:fx="http://ns.adobe.com/mxml/2009" xmlns:mx="library://ns.adobe.com/flex/mx" xmlns:s="library://ns.adobe.com/flex/spark"> 
        <br> 
        <br> 
        <fx:script>
            <br> 
            <br> 
        </fx:script>
        <br>
        <br> 
        <mx:html height="100%" id="html" width="100%">
            <br> 
            <br>
        </mx:html>
    </s:windowedapplication><br></pre>
<br>The SCRIPT block should contain the following code,
<br>
<pre class="brush: as3">import mx.controls.Menu;<br>   import mx.events.MenuEvent;<br>   <br>   /**<br>    * Instance of the menu being rendered.<br>    */<br>   private var myMenu:Menu = null;<br>   <br>   /**<br>    * Initialize the application<br>    */<br>   private function onInit():void {<br>    this.html.addEventListener(Event.COMPLETE, htmlLoadCompleteHandler);<br>    this.html.addEventListener(MouseEvent.MOUSE_DOWN, htmlMouseDownHandler);<br>    <br>    // shameless publicity<br>    this.html.location = "http://blog.sangupta.com";<br>   }<br>   <br>   private function htmlLoadCompleteHandler(event:Event):void {<br>    const document:Object = this.html.htmlLoader.window.document;<br>    document.body.oncontextmenu = contextMenuHandler;<br>    document.body.onclick = clickHandler;<br>   }<br>   <br>   /**<br>    * Remove menu when you click on Flex surface than document body<br>    */<br>   private function htmlMouseDownHandler(event:MouseEvent):void {<br>    hideContextMenu();<br>   }<br><br>   /**<br>    * Remove menu when you click on document body<br>    */<br>   private function clickHandler(event:Object = null):void {<br>    hideContextMenu();<br>   }<br>   <br>   /**<br>    * Hide the context menu<br>    */<br>   private function hideContextMenu():void {<br>    if(myMenu != null) {<br>     myMenu.hide();<br>    }<br>   }<br>   <br>   /**<br>    * Function that builds the context menu<br>    */<br>   private function contextMenuHandler(event:Object = null):* {<br>    var target:Object = event.srcElement;<br><br>    if(target.nodeType == '1' &amp;&amp; String(target.nodeName).toLowerCase() == 'a') {<br>     // the URL of the anchor element<br>     var url:String = target.href as String;<br><br>     var x:Number = event.x;<br>     var y:Number = event.y;<br>     var p:Point = new Point(x,y);<br>     p = this.localToGlobal(p);<br><br>     if(myMenu != null) {<br>      hideContextMenu();<br>      myMenu = null;<br>     }<br><br>     var items:Array = new Array();<br>     var object:Object = null;<br>     <br>     // open link in browser<br>     object = new Object();<br>     object.label = 'Open In Browser';<br>     object.eventName = 'browser';<br>     items.push(object);<br>     <br>     // separator<br>     object = new Object();<br>     object.type = 'separator';<br>     items.push(object);<br>     <br>     // copy link<br>     object = new Object();<br>     object.label = 'Copy';<br>     object.eventName = 'copy';<br>     items.push(object);<br>     <br>     // create the menu object<br>     myMenu = Menu.createMenu(parent, items, false);  <br><br>     // add menu item click handler<br>     myMenu.addEventListener(MenuEvent.ITEM_CLICK, menuItemClickHandler);<br>     <br>     // show the menu<br>     myMenu.show(p.x, p.y);<br><br>     // disable default context sensitive menu handler<br>     return false;<br>    }<br>   }<br>   <br>   private function menuItemClickHandler(event:MenuEvent):void {<br>    // handle the menu item click event here<br>   }</pre>
<br>Hope this helps. 
<br>~ Sandeep
