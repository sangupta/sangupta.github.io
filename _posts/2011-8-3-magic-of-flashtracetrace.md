---
layout: default
title: Magic of flash.trace.Trace
permalink: /2011/08/magic-of-flashtracetrace.html
redirect_from: "/2011/08/magic-of-flashtracetrace.html"
date: Wed Aug 03 14:47:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/08/magic-of-flashtracetrace.html
---
One of the hidden treasures in the Flash Player is the 
<tt>flash.trace.Trace</tt> class. It was meant to be hidden, but in open-source nothing can be treasured without the world knowing it. The actual class implementation is available in the 
<a href="http://hg.mozilla.org/tamarin-central/file/e774dfe22b39/extensions/Trace.as">tamarin-central</a> codebase. An excerpt of the class implementation is as under (copyright notices etc removed),
<br>
<pre class="brush:as3">package flash.trace<br>	public class Trace<br>	{<br>		/* levels of desired logging */<br>		public static const OFF:int = 0;<br>		public static const METHODS:int = 1;						// method entry only <br>		public static const METHODS_WITH_ARGS:int = 2;				// method entry and arguments<br>		public static const METHODS_AND_LINES:int = 3;				// method entry and line numbers<br>		public static const METHODS_AND_LINES_WITH_ARGS:int = 4;	// method entry, arguments and line numbers<br><br>		/* used to select either file or listener callback logging. */<br>		public static const FILE = 1;<br>		public static const	LISTENER = 2;<br><br>		public static native function setLevel(l:int, target:int=LISTENER);<br>		public static native function getLevel(target:int=LISTENER):int;<br><br>		/**<br>		 * Register a listener to receive trace callbacks upon method and/or <br>		 * line number changes.  Passing null to this function effectively<br>		 * 'unregisters' the listener and only a single listener can <br>		 *  be specified.<br>		 * <br>		 *  The callback funcition must have the following signature:<br>		 *<br>		 *     function foo(file_name:String, linenum:int, method_name:String, method_args:String):void<br>		 *<br>		 *  Depending upon the setting of the trace level, 2 or more arguments may be non-empty.  <br>		 *  In all cases file_name and method_name are obtained and passed to the callback.  If <br>		 *  the trace level include line numbers information then this value is also obtained <br>		 *  and passed into the callback.  Setting the trace level to include method arguments implies<br>		 *  that the 'method_args' parameter will be filled with string representation of the arguments<br>		 *  passed into the call.<br>		 */<br>		public static native function setListener(f:Function);<br>		public static native function getListener():Function;<br>	};<br>};</pre>
<br>Harnessing the power of the same in ActionScript is easy. 
<b>The magic lies in the fact that for every executed line, the listener as provided in the class above would be called, giving out the class name, the method name, the file name, and yes, the method arguments as well.</b> Don't believe it. Try it.
<br>
<br>The following class is a wrapper over the 
<tt>flash.trace.Trace</tt> class to see the code execution between two points.
<br>
<pre class="brush:as3">package com.sangupta.utils<br>{<br>	import flash.trace.Trace;<br><br>	public class TraceUtility {<br>		<br>		private static var init:Boolean = false;<br>		<br>		private static var linesExecuted:uint = 0;<br>		<br>		public function TraceUtility() {<br>			super();<br>		}<br>		<br>		public static function startTracing():void {<br>			if(!init) {<br>				Trace.setListener(traceListener);<br>				init = true;<br>			}<br>			<br>			Trace.setLevel(Trace.METHODS_AND_LINES_WITH_ARGS, Trace.LISTENER);<br>		}<br>		<br>		public static function stopTracing():void {<br>			Trace.setLevel(Trace.OFF, Trace.LISTENER);<br>			trace('Total lines executed: ' + linesExecuted);<br>			linesExecuted = 0;<br>		}<br>		<br>		private static function traceListener(fileInfo:String, lineNumber:String, classAndMethod:String, methodArguments:String):void {<br>			linesExecuted++;<br>			trace(classAndMethod + '(' + methodArguments + ')'); <br>		}<br>	}<br>}</pre>
<br>Usage is simple in a class, say, 
<i>MyWorker</i>:
<br>
<pre class="brush:as3">package com.sangupta.utils<br>{<br>	import TraceUtility;<br><br>	public class TraceUtilityTest {<br>		<br>		public function myWorkingMethod():void {<br>			TraceUtility.startTracing();<br><br>			// do something expensive here<br><br>			TraceUtility.stopTracing();<br>		}<br>		<br>	}<br>}</pre>
<br>
<b>Notes:</b> First, as for every executed line the listener is called, this will slow down the execution of the code. Second, this is not meant to replace the 
<b>Application Profiling</b> workflows. Lastly, in a nutshell, this technique should not be used in releasable code.
<br>
<br>Hope this helps.
