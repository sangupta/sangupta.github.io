---
layout: default
title: Convert a Number (unknown base) to a Base 10 Number
permalink: /2010/08/convert-number-unknown-base-to-base-10.html
redirect_from: "/2010/08/convert-number-unknown-base-to-base-10.html"
date: Mon Aug 23 13:48:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/08/convert-number-unknown-base-to-base-10.html
tags: interview-questions
---
<tt>Problem: </tt>Given an integer, write a program that converts the given number to a number (in base 10). The base of the given number is unknown.
<br>
<br>
<tt>Solution: </tt>The problem statement states that the base of the given number is unknown. Thus to proceed one must need to assume a base for the number. It is practically safe to assume that the digit with the maximum value in the number denotes the maximum that can be accounted in the unknown base. This a number if stated as, 
<tt>254</tt>, it can be assumed that the number system consists of digits 
<tt>0, 1, 2, 3, 4, 5</tt> - or base 6. 
<br>
<br>Working on this assumption, it becomes fairly simple to code a function that will return a number for the given string representation of the number. The following JAVA code sample does the same, extending the above assumption to include digits 
<tt>0 to 9</tt> and characters 
<tt>A to Z</tt>, where 
<tt>A</tt> represents 
<tt>10</tt>, 
<tt>B</tt> represents 
<tt>11</tt> and so on.
<br>
<br>
<pre class="brush: java">public Double convertUnknownBaseNumberToBase10(String number) {<br>  // null check<br>  if(number == null || number.length() == 0) {<br>   return null;<br>  }<br>  <br>  // turn to upper case - so that our logic below is easy<br>  number = number.toUpperCase();<br><br>  // scan through the string to find out the maximum number or the character<br>  int maxAscii = 0;<br>  for(int i = 0; i &lt; number.length(); i++) {<br>   int ascii = number.charAt(i);<br>   if(!(((ascii &gt;= '0') &amp;&amp; (ascii &lt;= '9')) || ((ascii &gt;= 'A') &amp;&amp; (ascii &lt;= 'Z')))) {<br>    System.out.println("Illegal number, can have only digits (0-9) and letters (A-Z)");<br>    return null;<br>   }<br>   maxAscii = Math.max(ascii, maxAscii);<br>  }<br>  <br>  // check if the number has letters or not<br>  double finalNumber = 0;<br>  int length = number.length();<br>  if(maxAscii &gt;= 'A') {<br>   int maxNumber = maxAscii - 'A' + 10 + 1;<br>   for(int i = 0; i &lt; length; i++) {<br>    int charCode = number.charAt(i);<br>    if(charCode &gt;= 'A') {<br>     charCode = charCode - 'A' + 10;<br>    }<br>    int num = charCode;<br>    finalNumber = finalNumber + (num * Math.pow(maxNumber, (length - i - 1)));<br>   }<br>  } else {<br>   int maxNumber = maxAscii - '0' + 1;<br>   // just iterate over a normal loop<br>   for(int i = 0; i &lt; length; i++) {<br>    int num = number.charAt(i) - '0';<br>    finalNumber = finalNumber + (num * Math.pow(maxNumber, (length - i - 1)));<br>   }<br>  }<br>  <br>  return finalNumber;<br> }<br></pre>
<br>Hope this helps.
