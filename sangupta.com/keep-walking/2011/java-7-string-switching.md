---
title: Java 7&#58; String switching
date: 29 Jun 2011
tags: 
- java
- java7
alias:
- /tech/java-7-string-switching.html
- /2011/06/java-7-string-switching.html
---

Today, I started my journey into the world of Java 7. Quite late I know, but as they 
<i>better late than never</i>. So I now have a build of Java 7 SDK on my desktop, and 
spent some time fiddling with the new features in. One of the most striking features of 
Java 7, specially after working in ActionScript 3, is the ability to 
<b>switch on strings</b>.

<!-- break here -->

ActionScript developers would know the value and power of this small feature, as it gets 
rid of those ugly multiple `if-else if-else if-else` blocks. One way to fool around was to use 
`enum`s but that to me seemed overkill specifically if the input data was coming from a file, 
database or human interface.

Thus, what looked like in the Java world till Java 6

```java
public void someMethod(String command) {
    if("dir".equals(command)) {
        // list the files in folder
    } else if("cls".equals(command)) {
        // clear the screen
    } else if("rename".equals(command)) {
        // rename the given file
    } else if("delete".equals(command)) {
        // delete the given file
    } else if("ver".equals(command)) {
        // display OS version
    } else {
        throw new IllegalArgumentException("Command not found.");
    }
}
```

has now been reduced to something like,

```java
public void someMethod(String command) {
    switch(command) {
        case "dir":
            // list file in folder
            break;
 
        case "cls":
            // clear the screen
            break;
 
        case "rename":
            // rename the given file
            break;
 
        case "delete":
            // delete the given file
            break;
 
        case "ver":
            // display OS version
            break;
 
        default:
            throw new IllegalArgumentException("Command not found.");
    }
}
```

Foshizle, it is not a super-developer-feature that may make you say a `WOW`, but it surely would make some 
pieces of code readable, and easily `debug-able`.

Happy Coding!