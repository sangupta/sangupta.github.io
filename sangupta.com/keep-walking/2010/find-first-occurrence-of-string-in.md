---
title: Find first occurrence of a string in another
date: 24 Aug 2010
tags: 
- interview-questions
alias:
- /tech/find-first-occurrence-of-string-in.html
- /2010/08/find-first-occurrence-of-string-in.html
---

Problem
-------

Typical question for `indexOf` operation. Given two strings s1 and s2, find the first index of 
s2 in s1 in an efficient manner.

Solution
--------

The problem has very typical solution, starting with each character in the source string start 
looking if the string being searched for, exists or not. However, the implementations may differ 
on the way they optimize. One good approach is to first look for the starting character of the 
string being searched for, in the string being searched. If found, then go ahead and look for 
other matches character by character. A code to do the same is as under,

```java
public static int findStringInString(String stringToSearchIn, String stringToSearchFor) {
  int lengthIn = stringToSearchIn.length();
  int lengthFor = stringToSearchFor.length();
   
  if(lengthFor > lengthIn) {
//   System.out.println("Sub-string candidate is larger than original string");
   return -1;
  }
   
  if(lengthFor == lengthIn) {
   for(int index = 0; index < lengthIn; index++) {
    if(stringToSearchIn.charAt(index) != stringToSearchFor.charAt(index)) {
     // no match found
     return -1;
    }
   }
   return 0;
  }
   
  // lengthFor < lengthIn
  for(int index = 0; index < (lengthIn - lengthFor); index++) {
   if(stringToSearchIn.charAt(index) == stringToSearchFor.charAt(0)) {
    boolean found = true;
    // first char match found
    // check if the string beyond this is equal
    for(int subIndex = 0; subIndex < lengthFor; subIndex++) {
     if(stringToSearchIn.charAt(index + subIndex) != stringToSearchFor.charAt(subIndex)) {
      // no match
      found = false;
      break;
     }
    }
    if(found) {
//     System.out.println("Match found at index: " + index + " in original string.");
//     System.out.println(stringToSearchIn.substring(index, index + lengthFor));
     return index;
    }
   }
  }
   
  return -1;
 }
```

Above is not the most efficient implementation. As strings get longer in length, one may employ 
various mechanisms to check for equality. One such method being checking for the first 
character - if that results in a match, compare the last character. If that succeeds as well, 
go ahead and check the second and then second last character. This way one can zero down to matches 
to the center of the string being searched for. This particular approach considers that some words 
are used again and again in a string, but the longer the strings the probability of repetition 
of the letter at same index zero's down.

Hope this helps.