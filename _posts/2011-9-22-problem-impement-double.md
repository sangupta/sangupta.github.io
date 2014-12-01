---
layout: post
title: parseDouble() in Java
permalink: /tech/problem-impement-double.html
redirect_from: "/2011/09/problem-impement-double.html"
date: Thu Sep 22 12:21:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/09/problem-impement-double.html
tags: coding-techniques interview-questions
---

<tt>Problem:</tt> Impement the 
<b>Double.parseDouble()</b> method of Java.
<br>
<br>
<tt>Solution:</tt> A classic interview problem where one needs to check in for all boundary combinations and all representations of a number. The following number representations are perfectly fine and should be accounted for,
<br>
<ul>
    <li>23</li>
    <li>+23</li>
    <li>-23</li>
    <li>+0.23</li>
    <li>-0.23</li>
    <li>.23</li>
    <li>-.23</li>
    <li>00000.23</li>
    <li>0.23000000</li>
</ul>
<br>The code for the same is as under, and is also available on 
<a href="https://github.com/sangupta/BlogExamples/blob/master/KeepWalking/src/com/sangupta/keepwalking/ParseDouble.java">GitHub</a> for reference.
<br>
<br>
<pre class="brush: java">/**<br> * Copyright (C) 2011, Sandeep Gupta<br> * http://www.sangupta.com<br> * <br> * The file is licensed under the the Apache License, Version 2.0<br> * (the "License"); you may not use this file except in compliance with<br> * the License.  You may obtain a copy of the License at<br> * <br> * http://www.apache.org/licenses/LICENSE-2.0<br> * <br> * Unless required by applicable law or agreed to in writing, software<br> * distributed under the License is distributed on an "AS IS" BASIS,<br> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br> * <br> * See the License for the specific language governing permissions and<br> * limitations under the License.<br> * <br> */<br><br>package com.sangupta.keepwalking;<br><br><br>/**<br> * A simple Java implementation of the Java's <code>Double.parseDouble()</code> function.<br> * <br> * @author Sandeep Gupta <a href="http://www.sangupta.com">[email]</a><br> * @version 1.0<br> * @since 22 Sep 2011<br> */<br>public class ParseDouble {<br>	<br>	/**<br>	 * Some tests to run.<br>	 * <br>	 * @param args<br>	 */<br>	public static void main(String[] args) {<br>		System.out.println(parseDouble(".23"));<br>	}<br><br>	/**<br>	 * A simple implementation that takes a number as a string and converts it<br>	 * to a double method, similar to what <code>Double.parseDouble()</code> does.<br>	 * <br>	 * The following number values are supported,<br>	 * +23<br>	 * -23<br>	 * +0.23<br>	 * +.23<br>	 * 0.23<br>	 * .23<br>	 * 0000.23<br>	 * 0.23000<br>	 * <br>	 * @param string the string representation of the number<br>	 * @return the double value<br>	 * @throws NumberFormatException if the string does not represent a number or is malformed<br>	 */<br>	private static double parseDouble(String num) {<br>		if(num == null || "".equals(num.trim())) {<br>			throw new NumberFormatException("Number cannot be null/empty.");<br>		}<br>		<br>		// remove any leading or trailing spaces<br>		num = num.trim();<br>		final int size = num.length();<br>		<br>		// holds the starting position of the digits<br>		int index = 0;<br>		boolean isNegative = false;<br>		boolean hasDecimal = false;<br>		<br>		// check for unary operators<br>		char first = num.charAt(0);<br>		switch(first) {<br>			case '+':<br>				index++;<br>				break;<br>				<br>			case '-':<br>				index++;<br>				isNegative = true;<br>				break;<br>				<br>			case '.':<br>				index++;<br>				hasDecimal = true;<br>				break;<br>				<br>			default:<br>				throw new NumberFormatException("Number is malformed: " + num); <br>		}<br>		<br>		// start the parsing logic<br>		<br>		double ip = 0.0, dp = 0.0;<br>		double fd = 1.0;<br>		<br>		for(int i = index; i &lt; size; i++) {<br>			char c = num.charAt(i);<br>			int digit = c - '0';<br>			<br>			if(isNumeric(c) &amp;&amp; digit != '0') {<br>				if(!hasDecimal) {<br>					ip *= 10;<br>					ip += digit;<br>				} else {<br>					dp *= 10;<br>					dp += digit;<br>					fd *= 10;<br>				}<br>			} else if(c == '.') {<br>				if(hasDecimal) {<br>					throw new NumberFormatException("Number is malformed: " + num);<br>				}<br>				<br>				hasDecimal = true;<br>			} else {<br>				throw new NumberFormatException("Number is malformed: " + num);<br>			}<br>		}<br>		<br>		// add the decimal fraction<br>		dp = dp / fd;<br>		double number = ip + dp;<br>		<br>		// test for negative<br>		if(isNegative) {<br>			number = 0 - number;<br>		}<br>		<br>		return number;<br>	}<br><br>	/**<br>	 * Tests whether the given character is a digit or not.<br>	 * <br>	 * @param digit the character to be tested<br>	 * @return <code>true</code> if character is a digit, else <code>false</code><br>	 */<br>	private static boolean isNumeric(char digit) {<br>		if('0' &lt;= digit &amp;&amp; digit &lt;= '9') {<br>			return true;<br>		}<br>		<br>		return false;<br>	}<br>	<br>}<br></pre>
