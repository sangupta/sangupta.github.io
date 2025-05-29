---
title: Project Euler Problem 348 Solution
date: 07 Sep 2011
tags: 
- project-euler
alias:
- /tech/project-euler-problem-348-solution.html
- /2011/09/project-euler-problem-348-solution.html
---

Problem
-------

Many numbers can be expressed as the sum of a square and a cube. Some of them in more than one way.

Consider the palindromic numbers that can be expressed as the sum of a square and a cube, both greater than 1, in 
<b>exactly</b> 4 different ways. For example, 5229225 is a palindromic number and it can be expressed in exactly 
4 different ways:

<!-- break here -->

* 2285<sup>2</sup> + 20<sup>3</sup>
* 2223<sup>2</sup> + 66<sup>3</sup>
* 1810<sup>2</sup> + 125<sup>3</sup>
* 1197<sup>2</sup> + 156<sup>3</sup>

Find the sum of the five smallest such palindromic numbers.


Analysis
--------

The given palindrome number is 7 digit. Hence, we start iterating with all palindromes that are atleast 
7 digits in length and go up to the point where we find the first 5 palindromes satisfying the given 
condition. Finding palindromes iterating over a sequence is time consuming, hence, create a small function 
that generates only palindromes.

For a palindrome of digit length n, when n is even, a simple loop of n/2 digits can be run. Thus for 
palindromes of length 4, a loop from 10 to 99 can be run, where the number and its reverse are appended. 
Similarly for a palindrome of digit length n, when n is odd, a first loop for (n - 1)/2 digits and a second 
loop from 0 to 9 can be run. Thus for palindromes with a length 5, run an outerloop from 10 to 99 and an 
inner loop from 0 to 9. Concatenate the number, the middle element and the reverse of the number to 
generate the palindromes.

To check for the given condition that the number be expressed as a sum of square and cube, where both 
numbers are greater than 2. Simply run a loop from 2 to cube root of number minus 4 (for the square will 
be of atleast 2). Then see if the square root is perfect or not. Keep counting valid combinations. If a 
number has 4 such combinations consider it for the solution.


Solution
--------

Code part of <a href="https://github.com/sangupta/maer">Project Maer on Github</a>. Runs under 2 seconds in Java 6.


```java
package com.sangupta.maer.page7;
 
import com.sangupta.maer.util.MathUtil;
 
/**
 * Problem 348 on Project Euler, http://projecteuler.net/index.php?section=problems&id=348
 *
 * @author <a href="http://www.sangupta.com">Sandeep Gupta</a>
 * @since 06-Sep-2011
 */
public class Problem348 {
     
    private static int found = 0;
     
    private static long sum = 0;
 
    /**
     * @param args
     */
    public static void main(String[] args) {
        iterateOnPalindromes(7, 12);
        System.out.println("Sum: " + sum);
    }
     
    private static void iterateOnPalindromes(final int startDigits, final int maxDigits) {
        for(int numDigits = startDigits; numDigits <= maxDigits; numDigits++) {
            if(MathUtil.isEven(numDigits)) {
                long end = (long) Math.pow(10, (numDigits / 2));
                long start = end / 10;
                 
                // loop
                for(long i = start; i < end; i++) {
                    String palindrome = String.valueOf(i);
                    palindrome = palindrome + new StringBuilder(palindrome).reverse().toString();
                    boolean stopLoop = checkPalindrome(palindrome);
                    if(stopLoop) {
                        return;
                    }
                }
            } else {
                // this is odd digit based
                int digitGroupLength = numDigits - 1;
                long end = (long) Math.pow(10, (digitGroupLength / 2));
                long start = end / 10;
                 
                // loop
                for(long i = start; i < end; i++) {
                    // the middle digit comes from the second loop
                    for(int middle = 0; middle < 10; middle++) {
                        String palindrome = String.valueOf(i);
                        palindrome = palindrome + String.valueOf(middle) + new StringBuilder(palindrome).reverse().toString();
                        boolean stopLoop = checkPalindrome(palindrome);
                        if(stopLoop) {
                            return;
                        }
                    }
                }               
            }
        }
    }
 
    /**
     * @param palindrome
     * @return
     */
    private static boolean checkPalindrome(String palindrome) {
        Long number = Long.parseLong(palindrome);
        if(isPalindromeRepresentable(number)) {
            System.out.println("Found " + number);
            found++;
            sum += number;
        }
         
        if(found == 5) {
            return true;
        }
        return false;
    }
 
    private static boolean isPalindromeRepresentable(final long number) {
        int cubeLimit = (int) Math.cbrt(number - 4);
         
        int countForms = 0;
         
        for(int testNumber = 2; testNumber <= cubeLimit; testNumber++) {
            int cube = testNumber * testNumber * testNumber;
            long diff = number - cube;
            double squareRoot = Math.sqrt(diff);
            int intSquareRoot = (int) squareRoot;
            if(squareRoot == intSquareRoot) {
                countForms++;
            }
        }
         
        if(countForms == 4) {
            return true;
        }
         
        return false;
    }
}
```