---
layout: default
title: itoa() in Java
permalink: /2011/04/itoa-in-java.html
redirect_from: "/2011/04/itoa-in-java.html"
date: Tue Apr 19 14:00:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/04/itoa-in-java.html
tags: interview-questions java
---
<tt>Problem:</tt> Write a function to convert an integer value to its ASCII equivalent and return as a character array, similar to itoa() function of C++.
<br>
<br>Solution: The solution may seem tricky at first because the array is constructed left-to-right, whereas the number is read right-to-left. The easiest approach is to construct an array with digits from right-to-left and then reverse the array itself. The result being the number representation in character array. The other point to note which most of the folks miss is to check for negative numbers. And that is the crucial thing, an interviewer is looking for.
<br>
<br>Enjoy the Java sample code below.
<br>
<pre class="brush:java">package com.sangupta.keepwalking;<br><br>public class IntegerToAscii {<br><br>	private static final int ASCII_VALUE_OF_ZERO = 48;<br><br>	/**<br>	 * Test conversion of Integer to ASCII value.<br>	 * <br>	 * @param args<br>	 */<br>	public static void main(String[] args) {<br>		int x = -2147483647;<br>		char[] ascii = itoa(x);<br>		System.out.println(ascii);<br>	}<br><br>	/**<br>	 * Convert the given integer number to its ASCII equivalent in a character array.<br>	 * <br>	 * @param number given integer number<br>	 * @return a character array representing ASCII form of the number<br>	 */<br>	private static char[] itoa(int number) {<br>		boolean negative = false;<br>		if(number &lt; 0) {<br>			negative = true;<br>			number = 0 - number;<br>		}<br>		<br>		if(number &gt;= 0 &amp;&amp; number &lt;= 9) {<br>			char temp = (char) (ASCII_VALUE_OF_ZERO + number);<br>			if(!negative) {<br>				return new char[] { temp };<br>			}<br>			<br>			return new char[] { '-', temp };<br>		}<br><br>		// define an array of which can hold 12 characters<br>		// the max integer is 10 digits long - 1 for negative character<br>		char[] digits = new char[12];<br><br>		// now let's divide the number by 10 and keep adding the remainder<br>		int digitPosition = 0;<br>		<br>		do {<br>			int remainder = number % 10;<br>			number = number / 10;<br>			<br>			digits[digitPosition++] = (char) (ASCII_VALUE_OF_ZERO + remainder);<br>		} while(number &gt; 0);<br>		<br>		// add negative sign if needed<br>		if(negative) {<br>			digits[digitPosition++] = '-';<br>		}<br><br>		// now reverse the array<br>		for(int i = 0; i &lt; digitPosition / 2; i++) {<br>			char temp = digits[i];<br>			digits[i] = digits[digitPosition - i - 1];<br>			digits[digitPosition - i - 1] = temp;<br>		}<br>		<br>		return digits;<br>	}<br><br>}<br></pre>
