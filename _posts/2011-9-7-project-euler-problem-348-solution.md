---
layout: post
title: Project Euler Problem 348 Solution
permalink: /tech/project-euler-problem-348-solution.html
redirect_from: "/2011/09/project-euler-problem-348-solution.html"
date: Wed Sep 07 13:21:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/09/project-euler-problem-348-solution.html
tags: project-euler
---

<b><u>Problem</u></b>
<br>Many numbers can be expressed as the sum of a square and a cube. Some of them in more than one way.
<br>
<br>Consider the palindromic numbers that can be expressed as the sum of a square and a cube, both greater than 1, in 
<b>exactly</b> 4 different ways.
<br>For example, 5229225 is a palindromic number and it can be expressed in exactly 4 different ways:
<br>
<br>2285
<sup>2</sup> + 20
<sup>3</sup>
<br>2223
<sup>2</sup> + 66
<sup>3</sup>
<br>1810
<sup>2</sup> + 125
<sup>3</sup>
<br>1197
<sup>2</sup> + 156
<sup>3</sup>
<br>
<br>Find the sum of the five smallest such palindromic numbers.
<br>
<br>
<b><u>Analysis</u></b>
<br>The given palindrome number is 7 digit. Hence, we start iterating with all palindromes that are atleast 7 digits in length and go up to the point where we find the first 5 palindromes satisfying the given condition. Finding palindromes iterating over a sequence is time consuming, hence, create a small function that generates only palindromes.
<br>
<br>For a palindrome of digit length n, when n is even, a simple loop of n/2 digits can be run. Thus for palindromes of length 4, a loop from 10 to 99 can be run, where the number and its reverse are appended. Similarly for a palindrome of digit length n, when n is odd, a first loop for (n - 1)/2 digits and a second loop from 0 to 9 can be run. Thus for palindromes with a length 5, run an outerloop from 10 to 99 and an inner loop from 0 to 9. Concatenate the number, the middle element and the reverse of the number to generate the palindromes.
<br>
<br>To check for the given condition that the number be expressed as a sum of square and cube, where both numbers are greater than 2. Simply run a loop from 2 to cube root of number minus 4 (for the square will be of atleast 2). Then see if the square root is perfect or not. Keep counting valid combinations. If a number has 4 such combinations consider it for the solution.
<br>
<br>
<b><u>Solution</u></b>
<br>Code part of 
<a href="https://github.com/sangupta/maer">Project Maer on Github</a>. Runs under 2 seconds in Java 6.
<br>
<br>
<pre class="brush: java">package com.sangupta.maer.page7;<br><br>import com.sangupta.maer.util.MathUtil;<br><br>/**<br> * Problem 348 on Project Euler, http://projecteuler.net/index.php?section=problems&amp;id=348<br> *<br> * @author <a href="http://www.sangupta.com">Sandeep Gupta</a><br> * @since 06-Sep-2011<br> */<br>public class Problem348 {<br>	<br>	private static int found = 0;<br>	<br>	private static long sum = 0;<br><br>	/**<br>	 * @param args<br>	 */<br>	public static void main(String[] args) {<br>		iterateOnPalindromes(7, 12);<br>		System.out.println("Sum: " + sum);<br>	}<br>	<br>	private static void iterateOnPalindromes(final int startDigits, final int maxDigits) {<br>		for(int numDigits = startDigits; numDigits &lt;= maxDigits; numDigits++) {<br>			if(MathUtil.isEven(numDigits)) {<br>				long end = (long) Math.pow(10, (numDigits / 2));<br>				long start = end / 10;<br>				<br>				// loop<br>				for(long i = start; i &lt; end; i++) {<br>					String palindrome = String.valueOf(i);<br>					palindrome = palindrome + new StringBuilder(palindrome).reverse().toString();<br>					boolean stopLoop = checkPalindrome(palindrome);<br>					if(stopLoop) {<br>						return;<br>					}<br>				}<br>			} else {<br>				// this is odd digit based<br>				int digitGroupLength = numDigits - 1;<br>				long end = (long) Math.pow(10, (digitGroupLength / 2));<br>				long start = end / 10;<br>				<br>				// loop<br>				for(long i = start; i &lt; end; i++) {<br>					// the middle digit comes from the second loop<br>					for(int middle = 0; middle &lt; 10; middle++) {<br>						String palindrome = String.valueOf(i);<br>						palindrome = palindrome + String.valueOf(middle) + new StringBuilder(palindrome).reverse().toString();<br>						boolean stopLoop = checkPalindrome(palindrome);<br>						if(stopLoop) {<br>							return;<br>						}<br>					}<br>				}				<br>			}<br>		}<br>	}<br><br>	/**<br>	 * @param palindrome<br>	 * @return<br>	 */<br>	private static boolean checkPalindrome(String palindrome) {<br>		Long number = Long.parseLong(palindrome);<br>		if(isPalindromeRepresentable(number)) {<br>			System.out.println("Found " + number);<br>			found++;<br>			sum += number;<br>		}<br>		<br>		if(found == 5) {<br>			return true;<br>		}<br>		return false;<br>	}<br><br>	private static boolean isPalindromeRepresentable(final long number) {<br>		int cubeLimit = (int) Math.cbrt(number - 4);<br>		<br>		int countForms = 0;<br>		<br>		for(int testNumber = 2; testNumber &lt;= cubeLimit; testNumber++) {<br>			int cube = testNumber * testNumber * testNumber;<br>			long diff = number - cube;<br>			double squareRoot = Math.sqrt(diff);<br>			int intSquareRoot = (int) squareRoot;<br>			if(squareRoot == intSquareRoot) {<br>				countForms++;<br>			}<br>		}<br>		<br>		if(countForms == 4) {<br>			return true;<br>		}<br>		<br>		return false;<br>	}<br>}</pre>
