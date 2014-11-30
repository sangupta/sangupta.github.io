---
layout: default
title: Find first occurrence of a string in another
permalink: /2010/08/find-first-occurrence-of-string-in.html
redirect_from: "/2010/08/find-first-occurrence-of-string-in.html"
date: Tue Aug 24 13:45:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/08/find-first-occurrence-of-string-in.html
tags: interview-questions
---
<tt>Problem: </tt>Typical question for 
<b>indexOf</b> operation. Given two strings s1 and s2, find the first index of s2 in s1 in an efficient manner.
<br>
<br>
<tt>Solution: </tt>The problem has very typical solution, starting with each character in the source string start looking if the string being searched for, exists or not. However, the implementations may differ on the way they optimize. One good approach is to first look for the starting character of the string being searched for, in the string being searched. If found, then go ahead and look for other matches character by character. A code to do the same is as under,
<br>
<br>
<pre class="brush: java">public static int findStringInString(String stringToSearchIn, String stringToSearchFor) {<br>  int lengthIn = stringToSearchIn.length();<br>  int lengthFor = stringToSearchFor.length();<br>  <br>  if(lengthFor &gt; lengthIn) {<br>//   System.out.println("Sub-string candidate is larger than original string");<br>   return -1;<br>  }<br>  <br>  if(lengthFor == lengthIn) {<br>   for(int index = 0; index &lt; lengthIn; index++) {<br>    if(stringToSearchIn.charAt(index) != stringToSearchFor.charAt(index)) {<br>     // no match found<br>     return -1;<br>    }<br>   }<br>   return 0;<br>  }<br>  <br>  // lengthFor &lt; lengthIn<br>  for(int index = 0; index &lt; (lengthIn - lengthFor); index++) {<br>   if(stringToSearchIn.charAt(index) == stringToSearchFor.charAt(0)) {<br>    boolean found = true;<br>    // first char match found<br>    // check if the string beyond this is equal<br>    for(int subIndex = 0; subIndex &lt; lengthFor; subIndex++) {<br>     if(stringToSearchIn.charAt(index + subIndex) != stringToSearchFor.charAt(subIndex)) {<br>      // no match<br>      found = false;<br>      break;<br>     }<br>    }<br>    if(found) {<br>//     System.out.println("Match found at index: " + index + " in original string.");<br>//     System.out.println(stringToSearchIn.substring(index, index + lengthFor));<br>     return index;<br>    }<br>   }<br>  }<br>  <br>  return -1;<br> }<br></pre>
<br>Above is not the most efficient implementation. As strings get longer in length, one may employ various mechanisms to check for equality. One such method being checking for the first character - if that results in a match, compare the last character. If that succeeds as well, go ahead and check the second and then second last character. This way one can zero down to matches to the center of the string being searched for. This particular approach considers that some words are used again and again in a string, but the longer the strings the probability of repetition of the letter at same index zero's down.
<br>
<br>Hope this helps.
