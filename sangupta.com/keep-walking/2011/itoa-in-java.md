---
title: itoa() in Java
date: 19 Apr 2011
tags: 
- interview-questions
- java
alias:
- /tech/itoa-in-java.html
- /2011/04/itoa-in-java.html
---

Problem
-------

Write a function to convert an integer value to its ASCII equivalent and return as a 
character array, similar to `itoa()` function of C++.

Solution
--------

The solution may seem tricky at first because the array is constructed left-to-right, whereas 
the number is read right-to-left. The easiest approach is to construct an array with digits 
from right-to-left and then reverse the array itself. The result being the number representation 
in character array. The other point to note which most of the folks miss is to check for negative 
numbers. And that is the crucial thing, an interviewer is looking for.

Enjoy the Java sample code below.

```java
package com.sangupta.keepwalking;
 
public class IntegerToAscii {
 
    private static final int ASCII_VALUE_OF_ZERO = 48;
 
    /**
     * Test conversion of Integer to ASCII value.
     * 
     * @param args
     */
    public static void main(String[] args) {
        int x = -2147483647;
        char[] ascii = itoa(x);
        System.out.println(ascii);
    }
 
    /**
     * Convert the given integer number to its ASCII equivalent in a character array.
     * 
     * @param number given integer number
     * @return a character array representing ASCII form of the number
     */
    private static char[] itoa(int number) {
        boolean negative = false;
        if(number < 0) {
            negative = true;
            number = 0 - number;
        }
         
        if(number >= 0 && number <= 9) {
            char temp = (char) (ASCII_VALUE_OF_ZERO + number);
            if(!negative) {
                return new char[] { temp };
            }
             
            return new char[] { '-', temp };
        }
 
        // define an array of which can hold 12 characters
        // the max integer is 10 digits long - 1 for negative character
        char[] digits = new char[12];
 
        // now let's divide the number by 10 and keep adding the remainder
        int digitPosition = 0;
         
        do {
            int remainder = number % 10;
            number = number / 10;
             
            digits[digitPosition++] = (char) (ASCII_VALUE_OF_ZERO + remainder);
        } while(number > 0);
         
        // add negative sign if needed
        if(negative) {
            digits[digitPosition++] = '-';
        }
 
        // now reverse the array
        for(int i = 0; i < digitPosition / 2; i++) {
            char temp = digits[i];
            digits[i] = digits[digitPosition - i - 1];
            digits[digitPosition - i - 1] = temp;
        }
         
        return digits;
    }
 
}
```