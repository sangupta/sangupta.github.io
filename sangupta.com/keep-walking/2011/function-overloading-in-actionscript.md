---
title: Function Overloading in ActionScript
date: 26 Sep 2011
alias:
- /tech/function-overloading-in-actionscript.html
- /2011/09/function-overloading-in-actionscript.html
---

We all know that function overloading, or for that matter Constructor overloading, is not 
supported in ActionScript. This is not a big deterrent till what you are writing your own 
code, but becomes a major blocker when you plan to port some code from a code piece written 
in another language. Recently, I have started migrating one of the de-facto open-source Java 
software to ActionScript. And the piece is huge. Giving different names to each overloaded 
method and then making sure that you call the right one tends to get complicated.

<!-- break here -->

Assigning a variable `Object` to method arguments and then writing the overloaded method is 
so so messy and ugly. While porting this piece, this problem had been in my mind for almost 
a week now, and today morning it occurred that I could use `abstraction` to solve my problem. 
To outline the methodology I adopted to solve this problem is as under. Suppose you have the 
following java code, 

```java
public class Example {
 
    public void method(int x) { ... }
 
    public void method(int x, int y) { .... }
 
    public void method(String x) { .... }
 
    public void method(int x, String y) { .... }
 
}
```

The most commonly used methodology when porting to ActionScript would be,

```as3
public class Example {
 
    public function method(x:*, y:* = undefined):void {
        if(x is int && y is undefined) { ... }
 
        else if(x is String && y is undefined) { ... }
 
        else if(x is int && y is int) { .... }
 
        else if(x is int && y is String) { ... }
    }
 
}
```

This method has its own disadvantages as it looses type safety. We can thus utilize abstraction 
to make sure that we achieve the method overloading without loosing the type safety as below. 
First, define a marker interface that indicates that a given class encapsulates arguments for 
a given method, such as,

```as3
public interface IMethodArguments {
 
}
```

Next define one class for each of the arguments type and the number of arguments as,

```as3
public class SingleIntegerArguments implements IMethodArguments {
 
    public var x:int;
 
}
 
public class TwoIntegerArguments implements IMethodArguments {
 
    public var x:int;
 
    public var y:int;
 
}
 
public class SingleStringArguments implements IMethodArguments {
 
    public var x:String;
 
}
 
public class IntegerStringArguments implements IMethodArguments {
 
    public var x:int;
 
    public var y:String;
 
}
```

Lastly, modify the original method to check against the implementing class of the object passed as 
argument. This makes sure that none of the variables declared anyplace is of type `Object` or `Variable '*'`.

```as3
public class Example {
 
    public function method(argument:IMethodArguments):void {
        if(argument is SingleIntegerArguments {
            ...
        } else if(argument is TwoIntegerArguments) {
            ...
        } else if(argument is SingleStringArguments) {
            ...
        } else if(argument is IntegerStringArguments) {
            ...
        }
    }
}
```

The method outlined here is nothing novel but just a different approach to providing a functionality that is 
very common in the programming world in a type-safe way.

Hope this helps.