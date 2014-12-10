---
layout: post
title: Find number of set bits in a given Integer
permalink: /tech/find-number-of-set-bits-in-given.html
redirect_from: "/2011/05/find-number-of-set-bits-in-given.html"
date: Mon May 02 08:56:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/05/find-number-of-set-bits-in-given.html
tags: interview-questions
excerpt: Find the number of set bits in an integer N.
---

Problem
-------
Find the number of set bits in a given Integer N.

Solution
--------
At the first look the problem looks like a simple AND `&` operation query. Check for each bit 
whether it is set or not, and then return the value back. For an 2-byte value, it would take 
16 operations, and for a 4-byte value 32-operations to find the number of set bits. In other 
words for any given Integer N, the operation will be O(constant) in terms of time-complexity. 
Can this time complexity be reduced further?

The answer is YES. The bitwise boolean operations help us in checking if a certain bit is on 
or not. Say for a given binary number `0010` stored as `n`, we do 
`n & (-n)`, it would return us a value of `2` indicating that the current least most bit that 
is set represents 2 in decimal. For a number like `0110`, the first operation will bring us a 
value of 2. If we subtract 2 from the original number, we get `0100` and now running the same 
operation results in a value of 4 (the next least set bit).

We can use the same principle along with recursion to find out the number of set bits in a given 
number. Keep finding the least set bit, subtract from the original number (reducing it every 
time) and keep counting. This way if a 4-byte number has only 1 bit set, we take only 1 operation
to find the same, rather than 32, reducing our time complexity drastically.

```java
/**
 * Copyright (C) 2011, Sandeep Gupta
 * http://www.sangupta.com
 * 
 * The file is licensed under the the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
 
public class Bits {
  
 public static void main(String[] args) {
  System.out.println(bits(15));
 }
  
 private static int bits(int n) {
  if(n == 0) {
   return 0;
  }
   
  int sub = n & -n;
  return 1 + bits(n - sub);
 }
 
}
```

Hope this helps.
