---
title: atoi() in Java
date: 02 Oct 2010
tags: 
- interview-questions
- java
alias:
- /tech/atoi-in-java.html
- /2010/10/atoi-in-java.html
---

Problem
-------
Write a function to convert an ASCII string to integer, similar to 
<b>atoi()</b> function of C++.

Solution
--------
The solution is too simple, it's simple checks for erroneous inputs that makes writing such a function fun. 

`Update:` You may also want to refer the implementation of 
<a href="http://blog.sangupta.com/2011/09/problem-impement-double.html">parseDouble() method</a> in Java

```java
package com.sangupta.keepwalking;
 
public class AsciiToInteger {
  
 public static void main(String[] args) {
  AsciiToInteger instance = new AsciiToInteger();
  int x = instance.atoi("-683");
  System.out.println("Conversion is: " + x);
 }
 
 private int atoi(String number) {
  // check for NULL or empty
  if(number == null || number.trim().length() == 0) {
   throw new IllegalArgumentException("Number cannot be null/empty.");
  }
 
  // create a variable to store the result
  int result = 0;
   
  // trim the number
  number = number.trim();
   
  // check for sign as the first character
  boolean negate = false;
  char sign = number.charAt(0);
   
  if(sign == '+' || sign == '-') {
   if(sign == '-') {
    negate = true;
   }
    
   number = number.substring(1);
  }
   
  int length = number.length();
  for(int index = 0; index < length; index++) {
   char digit = number.charAt(index);
    
   // sanitize the digit
   if(!(digit >= '0' && digit <= '9')) {
    throw new IllegalArgumentException("Number contains characters other than digits at index " + index);
   }
    
   digit = (char) (digit - '0');
    
   result += (digit * Math.pow(10, (length - index - 1)));
  }
   
  // if negative, do it
  if(negate) {
   result = 0 - result;
  }
   
  // return the final result
  return result;
 }
 
}
```