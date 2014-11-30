---
layout: default
title: Find number of set bits in a given Integer
permalink: /2011/05/find-number-of-set-bits-in-given.html
redirect_from: "/2011/05/find-number-of-set-bits-in-given.html"
date: Mon May 02 08:56:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/05/find-number-of-set-bits-in-given.html
tags: interview-questions
---
<tt>Problem:</tt> Find the number of set bits in a given Integer N.
<br>
<br>
<tt>Solution:</tt> At the first look the problem looks like a simple AND '&amp;' operation query. Check for each bit whether it is set or not, and then return the value back. For an 2-byte value, it would take 16 operations, and for a 4-byte value 32-operations to find the number of set bits. In other words for any given Integer N, the operation will be O(constant) in terms of time-complexity. Can this time complexity be reduced further?
<br>
<br>The answer is YES. The bitwise boolean operations help us in checking if a certain bit is on or not. Say for a given binary number 
<tt>0010</tt> stored as 
<tt>n</tt>, we do 
<tt>n &amp; (-n)</tt>, it would return us a value of 
<tt>2</tt> indicating that the current least most bit that is set represents 2 in decimal. For a number like 
<tt>0110</tt>, the first operation will bring us a value of 2. If we subtract 2 from the original number, we get 
<tt>0100</tt> and now running the same operation results in a value of 4 (the next least set bit).
<br>
<br>We can use the same principle along with recursion to find out the number of set bits in a given number. Keep finding the least set bit, subtract from the original number (reducing it every time) and keep counting. This way if a 4-byte number has only 1 bit set, we take only 1 operation to find the same, rather than 32, reducing our time complexity drastically.
<br>
<br>
<pre class="brush: java">/**<br> * Copyright (C) 2011, Sandeep Gupta<br> * http://www.sangupta.com<br> * <br> * The file is licensed under the the Apache License, Version 2.0<br> * (the "License"); you may not use this file except in compliance with<br> * the License.  You may obtain a copy of the License at<br> * <br> * http://www.apache.org/licenses/LICENSE-2.0<br> * <br> * Unless required by applicable law or agreed to in writing, software<br> * distributed under the License is distributed on an "AS IS" BASIS,<br> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br> * <br> * See the License for the specific language governing permissions and<br> * limitations under the License.<br> * <br> */<br><br>public class Bits {<br> <br> public static void main(String[] args) {<br>  System.out.println(bits(15));<br> }<br> <br> private static int bits(int n) {<br>  if(n == 0) {<br>   return 0;<br>  }<br>  <br>  int sub = n &amp; -n;<br>  return 1 + bits(n - sub);<br> }<br><br>}<br></pre>
<br>Hope this helps.
