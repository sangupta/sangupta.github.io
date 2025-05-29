---
title: Java 7&#58; Enhanced Syntax for Numeric Literals
date: 12 Jul 2011
tags: 
- java7
alias:
- /tech/java-7-enhanced-syntax-for-numeric.html
- /2011/07/java-7-enhanced-syntax-for-numeric.html
---

As far as I know, Java never updated the syntax for defining integral constants since JDK 1.2, which 
seems like ages before. To end that drought, Java 7 defines enhanced syntax for the following,

<!-- break here -->

* Numeric constants expressed as binary
* Suffix to denote type as short or byte
* Improved readability by use of underscores in integer constants

The above enhancements do not impact a seasoned developer much, nor they provide something out-of-this-world. 
The only benefit you get is improved readability and vanishing of minor hiccups when coding. 

#### Binary Values

Before Java 7, in order to parse binary values one would write,

```java
    int value = Integer.parseInt("10101010", 2);
```

This in addition to some extra code, also has performance impact besides making the value as a runtime 
constant than compile time constant. Thankfully, Java 7 introduces the concept of `0b<` on the same lines as 
`0x` for hexa-decimal values. Thus, the above code fragment in Java 7 would become,

```java
    int value = 0b10101010;
```

The value is now a compile time constant and also, has no performance hit.

#### Short and Byte values

Java had several integral types such as `short` and `byte`, but no syntactical way to code the values directly 
in, as all numerical constant were treated as integers. Type-casting led to annoyance and discomfort during code 
and might also have led to limit-over-runs. With Java 7, assigning values for these integral types becomes easy as,

```java
    byte b = 245y;
```

and,

```java
    short s = 65535s;
```

The above values just provide some syntactical sugar when coding and improves readability.

#### Underscores in values

A long binary, hexa-decimal or integral value becomes hard to read by human mind. If the number of digits increase 
figuring out the exact extant of the value at times gets difficult. Java 7 adds some real beauty for such use-cases 
by adding support to add underscores to integral values for improved readability. Thus a value of 
`2 GB, 2147483648` now may be expressed as,

```java
    long twoGigabytes = 2_147_483_648L;
```

In my honest opinion, this is definitely a boon for mathematical and statistical developers who really had tough 
time understanding someone's else code... err.. defined constants.

Hope this helps me, more than anyone else in remembering the new sugars! Happy Coding!