---
title: Convert a Number (unknown base) to a Base 10 Number
date: 23 Aug 2010
tags: 
- interview-questions
alias:
- /tech/convert-number-unknown-base-to-base-10.html
- /2010/08/convert-number-unknown-base-to-base-10.html
---

Problem
-------

Given an integer, write a program that converts the given number to a number (in base 10). The base 
of the given number is unknown.

Solution
--------

The problem statement states that the base of the given number is unknown. Thus to proceed one must need 
to assume a base for the number. It is practically safe to assume that the digit with the maximum value 
in the number denotes the maximum that can be accounted in the unknown base. This a number if stated as, 
`254`, it can be assumed that the number system consists of digits 
`0, 1, 2, 3, 4, 5` - or base 6. 

Working on this assumption, it becomes fairly simple to code a function that will return a number for the 
given string representation of the number. The following JAVA code sample does the same, extending the above 
assumption to include digits 

* `0 to 9` and characters 
* `A to Z`, where `A` represents `10`, `B` represents `11` and so on.


```java
public Double convertUnknownBaseNumberToBase10(String number) {
  // null check
  if(number == null || number.length() == 0) {
   return null;
  }
   
  // turn to upper case - so that our logic below is easy
  number = number.toUpperCase();
 
  // scan through the string to find out the maximum number or the character
  int maxAscii = 0;
  for(int i = 0; i < number.length(); i++) {
   int ascii = number.charAt(i);
   if(!(((ascii >= '0') && (ascii <= '9')) || ((ascii >= 'A') && (ascii <= 'Z')))) {
    System.out.println("Illegal number, can have only digits (0-9) and letters (A-Z)");
    return null;
   }
   maxAscii = Math.max(ascii, maxAscii);
  }
   
  // check if the number has letters or not
  double finalNumber = 0;
  int length = number.length();
  if(maxAscii >= 'A') {
   int maxNumber = maxAscii - 'A' + 10 + 1;
   for(int i = 0; i < length; i++) {
    int charCode = number.charAt(i);
    if(charCode >= 'A') {
     charCode = charCode - 'A' + 10;
    }
    int num = charCode;
    finalNumber = finalNumber + (num * Math.pow(maxNumber, (length - i - 1)));
   }
  } else {
   int maxNumber = maxAscii - '0' + 1;
   // just iterate over a normal loop
   for(int i = 0; i < length; i++) {
    int num = number.charAt(i) - '0';
    finalNumber = finalNumber + (num * Math.pow(maxNumber, (length - i - 1)));
   }
  }
   
  return finalNumber;
 }
```

Hope this helps.