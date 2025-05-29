---
title: Magic of flash.trace.Trace
date: 03 Aug 2011
alias:
- /tech/magic-of-flash-trace-trace.html
- /2011/08/magic-of-flashtracetrace.html
---

One of the hidden treasures in the Flash Player is the `flash.trace.Trace` class. It was 
meant to be hidden, but in open-source nothing can be treasured without the world knowing it. 
The actual class implementation is available in the 
<a href="http://hg.mozilla.org/tamarin-central/file/e774dfe22b39/extensions/Trace.as">tamarin-central</a> codebase. 
An excerpt of the class implementation is as under (copyright notices etc removed),

<!-- break here -->

```as3
package flash.trace
    public class Trace
    {
        /* levels of desired logging */
        public static const OFF:int = 0;
        public static const METHODS:int = 1;                        // method entry only 
        public static const METHODS_WITH_ARGS:int = 2;              // method entry and arguments
        public static const METHODS_AND_LINES:int = 3;              // method entry and line numbers
        public static const METHODS_AND_LINES_WITH_ARGS:int = 4;    // method entry, arguments and line numbers
 
        /* used to select either file or listener callback logging. */
        public static const FILE = 1;
        public static const LISTENER = 2;
 
        public static native function setLevel(l:int, target:int=LISTENER);
        public static native function getLevel(target:int=LISTENER):int;
 
        /**
         * Register a listener to receive trace callbacks upon method and/or 
         * line number changes.  Passing null to this function effectively
         * 'unregisters' the listener and only a single listener can 
         *  be specified.
         * 
         *  The callback funcition must have the following signature:
         *
         *     function foo(file_name:String, linenum:int, method_name:String, method_args:String):void
         *
         *  Depending upon the setting of the trace level, 2 or more arguments may be non-empty.  
         *  In all cases file_name and method_name are obtained and passed to the callback.  If 
         *  the trace level include line numbers information then this value is also obtained 
         *  and passed into the callback.  Setting the trace level to include method arguments implies
         *  that the 'method_args' parameter will be filled with string representation of the arguments
         *  passed into the call.
         */
        public static native function setListener(f:Function);
        public static native function getListener():Function;
    };
};
```

Harnessing the power of the same in ActionScript is easy. **The magic lies in the fact that for every executed line, the listener as provided in the class above would be called, giving out the class name, the method name, the file name, and yes, the method arguments as well.** Don't believe it. Try it.

The following class is a wrapper over the `flash.trace.Trace` class to see the code execution between two points.

```as3
package com.sangupta.utils
{
    import flash.trace.Trace;
 
    public class TraceUtility {
         
        private static var init:Boolean = false;
         
        private static var linesExecuted:uint = 0;
         
        public function TraceUtility() {
            super();
        }
         
        public static function startTracing():void {
            if(!init) {
                Trace.setListener(traceListener);
                init = true;
            }
             
            Trace.setLevel(Trace.METHODS_AND_LINES_WITH_ARGS, Trace.LISTENER);
        }
         
        public static function stopTracing():void {
            Trace.setLevel(Trace.OFF, Trace.LISTENER);
            trace('Total lines executed: ' + linesExecuted);
            linesExecuted = 0;
        }
         
        private static function traceListener(fileInfo:String, lineNumber:String, classAndMethod:String, methodArguments:String):void {
            linesExecuted++;
            trace(classAndMethod + '(' + methodArguments + ')'); 
        }
    }
}
```

Usage is simple in a class, say, `MyWorker`:

```as3
package com.sangupta.utils
{
    import TraceUtility;
 
    public class TraceUtilityTest {
         
        public function myWorkingMethod():void {
            TraceUtility.startTracing();
 
            // do something expensive here
 
            TraceUtility.stopTracing();
        }
         
    }
}
```

`Notes:` First, as for every executed line the listener is called, this will slow down the execution of the 
code. Second, this is not meant to replace the **Application Profiling** workflows. Lastly, in a nutshell, this 
technique should not be used in releasable code.

Hope this helps!