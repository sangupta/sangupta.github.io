---
layout: default
title: atoi() in Java
permalink: /2010/10/atoi-in-java.html
redirect_from: "/2010/10/atoi-in-java.html"
date: Sat Oct 02 23:05:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/10/atoi-in-java.html
tags: interview-questions java
---
<tt>Problem: </tt>Write a function to convert an ASCII string to integer, similar to 
<b>atoi()</b> function of C++.
<br>
<br>
<tt>Solution: </tt>The solution is too simple, it's simple checks for erroneous inputs that makes writing such a function fun. 
<br>
<br>
<tt><b>Update:</b></tt> You may also want to refer the implementation of 
<a href="http://blog.sangupta.com/2011/09/problem-impement-double.html">parseDouble() method</a> in Java
<br>
<br>Here is my attempt at this classic problem.
<br>
<br>
<pre class="brush: java">package com.sangupta.keepwalking;<br><br>public class AsciiToInteger {<br> <br> public static void main(String[] args) {<br>  AsciiToInteger instance = new AsciiToInteger();<br>  int x = instance.atoi("-683");<br>  System.out.println("Conversion is: " + x);<br> }<br><br> private int atoi(String number) {<br>  // check for NULL or empty<br>  if(number == null || number.trim().length() == 0) {<br>   throw new IllegalArgumentException("Number cannot be null/empty.");<br>  }<br><br>  // create a variable to store the result<br>  int result = 0;<br>  <br>  // trim the number<br>  number = number.trim();<br>  <br>  // check for sign as the first character<br>  boolean negate = false;<br>  char sign = number.charAt(0);<br>  <br>  if(sign == '+' || sign == '-') {<br>   if(sign == '-') {<br>    negate = true;<br>   }<br>   <br>   number = number.substring(1);<br>  }<br>  <br>  int length = number.length();<br>  for(int index = 0; index &lt; length; index++) {<br>   char digit = number.charAt(index);<br>   <br>   // sanitize the digit<br>   if(!(digit &gt;= '0' &amp;&amp; digit &lt;= '9')) {<br>    throw new IllegalArgumentException("Number contains characters other than digits at index " + index);<br>   }<br>   <br>   digit = (char) (digit - '0');<br>   <br>   result += (digit * Math.pow(10, (length - index - 1)));<br>  }<br>  <br>  // if negative, do it<br>  if(negate) {<br>   result = 0 - result;<br>  }<br>  <br>  // return the final result<br>  return result;<br> }<br><br>}<br></pre>
