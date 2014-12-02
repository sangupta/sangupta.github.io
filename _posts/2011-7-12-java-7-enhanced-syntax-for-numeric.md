---
layout: post
title: Java 7&#58; Enhanced Syntax for Numeric Literals
permalink: /tech/java-7-enhanced-syntax-for-numeric.html
redirect_from: "/2011/07/java-7-enhanced-syntax-for-numeric.html"
date: Tue Jul 12 16:06:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/07/java-7-enhanced-syntax-for-numeric.html
tags: java7
---
As far as I know, Java never updated the syntax for defining integral constants since JDK 1.2, which seems like ages before. To end that drought, Java 7 defines enhanced syntax for the following,
<br>
<ul>
    <li>Numeric constants expressed as binary</li>
    <li>Suffix to denote type as short or byte</li>
    <li>Improved readability by use of underscores in integer constants</li>
</ul>
<br>The above enhancements do not impact a seasoned developer much, nor they provide something out-of-this-world. The only benefit you get is improved readability and vanishing of minor hiccups when coding. 
<br>
<br>
<h3>Binary Values</h3>Before Java 7, in order to parse binary values one would write,
<br>
<blockquote>
    int value = Integer.parseInt("10101010", 2);
</blockquote>This in addition to some extra code, also has performance impact besides making the value as a runtime constant than compile time constant. Thankfully, Java 7 introduces the concept of 
<b>0b</b> on the same lines as 
<b>0x</b> for hexa-decimal values. Thus, the above code fragment in Java 7 would become,
<br>
<blockquote>
    int value = 0b10101010;
</blockquote>The value is now a compile time constant and also, has no performance hit.
<br>
<br>
<h3>Short and Byte values</h3>Java had several integral types such as 
<tt>short</tt> and 
<tt>byte</tt>, but no syntactical way to code the values directly in, as all numerical constant were treated as integers. Type-casting led to annoyance and discomfort during code and might also have led to limit-over-runs. With Java 7, assigning values for these integral types becomes easy as,
<br>
<blockquote>
    byte b = 245y;
</blockquote>and,
<br>
<blockquote>
    short s = 65535s;
</blockquote>The above values just provide some syntactical sugar when coding and improves readability.
<br>
<br>
<h3>Underscores in values</h3>A long binary, hexa-decimal or integral value becomes hard to read by human mind. If the number of digits increase figuring out the exact extant of the value at times gets difficult. Java 7 adds some real beauty for such use-cases by adding support to add underscores to integral values for improved readability. Thus a value of 
<tt>2 GB, 2147483648</tt> now may be expressed as,
<br>
<blockquote>
    long twoGigabytes = 2_147_483_648L;
</blockquote>In my honest opinion, this is definitely a boon for mathematical and statistical developers who really had tough time understanding someone's else code... err.. defined constants.
<br>
<br>Hope this helps me, more than anyone else in remembering the new sugars! Happy Coding!
<br>
