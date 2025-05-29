---
title: Context Sensitive menu on hyperlinks of Adobe AIR HTML control
date: 24 Oct 2010
tags: 
- adobe-air
- coding-techniques
alias:
- /tech/context-sensitive-menu-on-hyperlinks-of.html
- /2010/10/context-sensitive-menu-on-hyperlinks-of.html
---

Adobe AIR includes a rich HTML control based on the open-source 
<a href="http://webkit.org/">WebKit</a> engine. This allows AIR applications to 
display rich HTML control and provide custom functionality around those web pages. 
Thus, an application can allow a user to display an HTML control and add functionalities 
like spell-check, dictionary support etc. One of the most required functionalities 
when making rich Web Application is the use of custom context-sensitive menus. 
Context-sensitive menus is a list of menu options, that open when you right click 
on an element of a user-interface (subject that the element supports one).

<!-- break here -->

In this post we will try and look on how to add a custom context-sensitive menu on 
hyperlinks present in an HTML page loaded inside an AIR HTML control. We would two 
menu options called, ‘Open link in Browser’ and ‘Copy Link’ to the context-sensitive 
menu. To achieve the same adopt the following procedure,

* Create an AIR application consisting of an HTML control

* Capture the Event.COMPLETE event handler so as to figure out when an HTML page has completely loaded inside the HTML control

* Wire a context-sensitive menu event listener that is invoked when a user right-clicks inside the HTML control

* In the event handler for the same, generate a context sensitive menu and display it at the right location.

Done. A snapshot of how the application looks like is,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://3.bp.blogspot.com/_Igofzvi0TDM/TMKpsrHK3lI/AAAAAAAAFdg/zlHkHCUpvok/s1600/ContextSensitiveMenuOnHyperlinksInHTMLControl.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="251" src="http://3.bp.blogspot.com/_Igofzvi0TDM/TMKpsrHK3lI/AAAAAAAAFdg/zlHkHCUpvok/s320/ContextSensitiveMenuOnHyperlinksInHTMLControl.PNG" width="320"></a>
</div>

Below is the code that makes use of the above approach in a simple application. When 
executing the example, wait for the page to load completely. Once, all Javascript’s 
on the page have loaded, try clicking on the hyperlinks in the page displayed.

The code for the application is also available in my 
<a href="http://code.google.com/p/sangupta">Google Code</a> repository.

The main MXML code is as,

```mxml
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
    </s:windowedapplication>
```

The SCRIPT block should contain the following code,

```as3
   import mx.controls.Menu;
   import mx.events.MenuEvent;
    
   /**
    * Instance of the menu being rendered.
    */
   private var myMenu:Menu = null;
    
   /**
    * Initialize the application
    */
   private function onInit():void {
    this.html.addEventListener(Event.COMPLETE, htmlLoadCompleteHandler);
    this.html.addEventListener(MouseEvent.MOUSE_DOWN, htmlMouseDownHandler);
     
    // shameless publicity
    this.html.location = "http://blog.sangupta.com";
   }
    
   private function htmlLoadCompleteHandler(event:Event):void {
    const document:Object = this.html.htmlLoader.window.document;
    document.body.oncontextmenu = contextMenuHandler;
    document.body.onclick = clickHandler;
   }
    
   /**
    * Remove menu when you click on Flex surface than document body
    */
   private function htmlMouseDownHandler(event:MouseEvent):void {
    hideContextMenu();
   }
 
   /**
    * Remove menu when you click on document body
    */
   private function clickHandler(event:Object = null):void {
    hideContextMenu();
   }
    
   /**
    * Hide the context menu
    */
   private function hideContextMenu():void {
    if(myMenu != null) {
     myMenu.hide();
    }
   }
    
   /**
    * Function that builds the context menu
    */
   private function contextMenuHandler(event:Object = null):* {
    var target:Object = event.srcElement;
 
    if(target.nodeType == '1' && String(target.nodeName).toLowerCase() == 'a') {
     // the URL of the anchor element
     var url:String = target.href as String;
 
     var x:Number = event.x;
     var y:Number = event.y;
     var p:Point = new Point(x,y);
     p = this.localToGlobal(p);
 
     if(myMenu != null) {
      hideContextMenu();
      myMenu = null;
     }
 
     var items:Array = new Array();
     var object:Object = null;
      
     // open link in browser
     object = new Object();
     object.label = 'Open In Browser';
     object.eventName = 'browser';
     items.push(object);
      
     // separator
     object = new Object();
     object.type = 'separator';
     items.push(object);
      
     // copy link
     object = new Object();
     object.label = 'Copy';
     object.eventName = 'copy';
     items.push(object);
      
     // create the menu object
     myMenu = Menu.createMenu(parent, items, false);  
 
     // add menu item click handler
     myMenu.addEventListener(MenuEvent.ITEM_CLICK, menuItemClickHandler);
      
     // show the menu
     myMenu.show(p.x, p.y);
 
     // disable default context sensitive menu handler
     return false;
    }
   }
    
   private function menuItemClickHandler(event:MenuEvent):void {
    // handle the menu item click event here
   }
```

Hope this helps.