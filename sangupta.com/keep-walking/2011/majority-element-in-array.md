---
title: Majority Element in an Array
date: 02 May 2011
tags: 
- interview-questions
alias:
- /tech/majority-element-in-array.html
- /2011/05/majority-element-in-array.html
---

Problem
-------
Given an array consisting of N integers, find the number with the maximum occurrences, 
majority element, given the assumption that the number occurs more than N/2 times in the array.


Solution
--------
Given the assumption that the element occurs more than N/2 times in the array simplifies the 
solution a lot. This is so because if more than N/2 elements are the same, it implies that 
all other elements combined are less than N/2. Hence, the difference between the count of 
majority element and the count of non-majority numbers will always be positive. This approach 
can significantly simplify our code to the problem.

In the solution we consider the first element as the majority element and keep the count as 1. 
Now we compare the second (next) element with this element. If it is the same element we increase 
the count to 2, else decrease the count to ZERO and keep the first element as the majority element. 
Check the next element. If it is equal increase the count, else set the majority element to be 
the given current element and make the count as ONE.

This way, at the end of the traversal of the list, we will have the majority element with us. As 
comparison between two elements takes constant time, the code will run in `O(n)` time where `n` is 
the number of elements in the list.

```java
public class MajorityElement {
  
 public static void main(String[] args) {
  int[] list = new int[] {1, 2, 3, 4, 2, 3, 4, 2, 3, 2, 1, 2, 3, 4, 2, 2, 2};
   
  int count = 1;
  int majorityElement = list[0];
  for(int index = 1; index < list.length; index++) {
   if(majorityElement != list[index]) {
    if(count == 0) {
     majorityElement = list[index];
     count++;
    } else {
     count--;
    }
   } else {
    count++;
   }
  }
   
  System.out.println("Majority Element: " + majorityElement);
 }
 
}
```

Hope this helps.