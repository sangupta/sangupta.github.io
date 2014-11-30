---
layout: default
title: In-Place Character Array Compression
permalink: /2011/07/in-place-character-array-compression.html
redirect_from: "/2011/07/in-place-character-array-compression.html"
date: Thu Jul 14 08:00:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/07/in-place-character-array-compression.html
tags: interview-questions java
---
<tt>Problem: </tt>Given a character stream as an array, compress the characters in place appending the number of continuous characters by the numerical value and then the character. The array is terminated by a 
<tt>0x00</tt> character.
<br>
<br>
<tt>Solution: </tt>Another classic interview problem which tests multiple skills in a single problem, namely,
<br>
<ul>
    <li>Conversion from integer to ascii - the number returned is a integral value which needs to be converted to ascii and then put in place in stream</li>
    <li>Skills with pointers (not the <tt>real</tt> pointers) when operating on an array</li>
</ul>
<br>The following JAVA code illustrates how to work up the given problem. It makes use of an 
<tt><b>itoa()</b></tt> method that was explained before 
<a href="">here</a>.
<br>
<pre class="brush:java">package com.sangupta.keepwalking;<br><br>public class CharacterArrayCompression {<br><br>	public static void main(String[] args) {<br>		String stream = "aaaaaaaaaaaaaaaaaaaaabbbbbbssssskkkkjkkdkksdkkkdeeeekkllsssiii";<br>		char[] characters = stream.toCharArray();<br>		compress(characters);<br>		System.out.println(characters);<br>	}<br><br>	private static void compress(char[] characters) {<br>		if(characters == null || characters.length &lt;= 1) {<br>			// do nothing if we are not provided with any data<br>			// or if we have a single character<br>			return;<br>		}<br>		<br>		char current = characters[0];<br>		int count = 1;<br>		int destination = 0;<br>		for(int index = 1; index &lt; characters.length; index++) {<br>			char found = characters[index];<br>			if(current == found) {<br>				count++;<br>			} else {<br>				// compress and store the value<br>				if(count &gt; 1) {<br>					char[] value = IntegerToAscii.itoa(count);<br>					for(int j = 0; j &lt; value.length; j++) {<br>						char temp = value[j];<br>						if(temp != '\0') {<br>							characters[destination++] = temp;<br>						}<br>					}<br>				}<br>				characters[destination++] = current;<br>				<br>				// reset to the new occurence of character<br>				current = found;<br>				count = 1;<br>			}<br>		}<br>		<br>		for(int index = destination; index &lt; characters.length; index++) {<br>			characters[index] = '\0';<br>		}<br>	}<br><br>}</pre>
<br>Happy Coding!
<br>
