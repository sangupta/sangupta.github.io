---
layout: default
title: Function Overloading in ActionScript
permalink: /2011/09/function-overloading-in-actionscript.html
redirect_from: "/2011/09/function-overloading-in-actionscript.html"
date: Mon Sep 26 10:37:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/09/function-overloading-in-actionscript.html
---
We all know that function overloading, or for that matter Constructor overloading, is not supported in ActionScript. This is not a big deterrent till what you are writing your own code, but becomes a major blocker when you plan to port some code from a code piece written in another language. Recently, I have started migrating one of the de-facto open-source Java software to ActionScript. And the piece is huge. Giving different names to each overloaded method and then making sure that you call the right one tends to get complicated.
<br>
<br>Assigning a variable 
<tt>Object</tt> to method arguments and then writing the overloaded method is so so messy and ugly. While porting this piece, this problem had been in my mind for almost a week now, and today morning it occurred that I could use 
<tt>abstraction</tt> to solve my problem. To outline the methodology I adopted to solve this problem is as under. Suppose you have the following java code, 
<br>
<pre class="brush: java">public class Example {<br><br>    public void method(int x) { ... }<br><br>    public void method(int x, int y) { .... }<br><br>    public void method(String x) { .... }<br><br>    public void method(int x, String y) { .... }<br><br>}</pre>
<br>The most commonly used methodology when porting to ActionScript would be,
<br>
<pre class="brush: as3">public class Example {<br><br>    public function method(x:*, y:* = undefined):void {<br>        if(x is int &amp;&amp; y is undefined) { ... }<br><br>        else if(x is String &amp;&amp; y is undefined) { ... }<br><br>        else if(x is int &amp;&amp; y is int) { .... }<br><br>        else if(x is int &amp;&amp; y is String) { ... }<br>    }<br><br>}</pre>
<br>This method has its own disadvantages as it looses type safety. We can thus utilize abstraction to make sure that we achieve the method overloading without loosing the type safety as below. First, define a marker interface that indicates that a given class encapsulates arguments for a given method, such as,
<br>
<pre class="brush: as3">public interface IMethodArguments {<br><br>}<br></pre>Next define one class for each of the arguments type and the number of arguments as,
<br>
<pre class="brush: as3">public class SingleIntegerArguments implements IMethodArguments {<br><br>    public var x:int;<br><br>}<br><br>public class TwoIntegerArguments implements IMethodArguments {<br><br>    public var x:int;<br><br>    public var y:int;<br><br>}<br><br>public class SingleStringArguments implements IMethodArguments {<br><br>    public var x:String;<br><br>}<br><br>public class IntegerStringArguments implements IMethodArguments {<br><br>    public var x:int;<br><br>    public var y:String;<br><br>}<br></pre>Lastly, modify the original method to check against the implementing class of the object passed as argument. This makes sure that none of the variables declared anyplace is of type 
<tt>Object</tt> or 
<tt>Variable '*'</tt>.
<br>
<pre class="brush: as3">public class Example {<br><br>    public function method(argument:IMethodArguments):void {<br>        if(argument is SingleIntegerArguments {<br>            ...<br>        } else if(argument is TwoIntegerArguments) {<br>            ...<br>        } else if(argument is SingleStringArguments) {<br>            ...<br>        } else if(argument is IntegerStringArguments) {<br>            ...<br>        }<br>    }<br>}</pre>
<br>The method outlined here is nothing novel but just a different approach to providing a functionality that is very common in the programming world in a type-safe way.
<br>
<br>Hope this helps.
<br>
