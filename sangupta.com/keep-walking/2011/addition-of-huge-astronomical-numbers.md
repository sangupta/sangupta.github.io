---
title: Addition of Huge Astronomical Numbers
date: 28 Jun 2011
tags: 
- coding-techniques
- interview-questions
alias:
- /tech/addition-of-huge-astronomical-numbers.html
- /2011/06/addition-of-huge-astronomical-numbers.html
---

Problem
-------

There are two astronomically huge numbers that need to be added. The numbers are stored digit per digit as 
nodes of a linked list.

Solution
--------

This is a classic linked-list problem, and often comes up as the favorite interview question in C/C++. I 
have had the same experience in my recent past both as an interviewee and as an interviewer. Anyways, 
over to the solution.

Consider that our data is stored in a simple linked list structure such as,

```java
public class Node {
 
    public int digit;
 
    public Node nextNode = null;
 
}
```

The biggest hurdle in solving the problem is that the linked list can be traversed from one end, in our 
case the left end of the number (as a String) whereas the addition has to happen from the right-end of 
the number. To solve the same the easiest solution would be to reverse the linked lists. This way once 
you have the result, just reverse it back. Reversing should be easy as,

```java
private static Node reverse(Node sum) {
  Node current = null;
  do {
   Node newNode = new Node(sum.digit);
   newNode.nextNode = current;
   current = newNode;
   sum = sum.nextNode;
  } while(sum != null);
   
  return current;
 }
```

Throwing in a convenience method to convert a string into the number as a linked list,

```java
public static Node createNumber(String string) {
  char[] array = string.toCharArray();
  Node parentNode = new Node(array[0] - '0');
  Node node = parentNode;
   
  for(int i = 1; i < array.length; i++) {
   Node temp = new Node(array[i] - '0');
   node.nextNode = temp;
   node = temp;
  }
   
  return parentNode;
 }
```

and to display the number as a String, 

```
public String toString() {
  StringBuilder builder = new StringBuilder();
  builder.append(this.digit);
  Node nextNode = this.nextNode;
  while(nextNode != null) {
   builder.append(nextNode.digit);
   nextNode = nextNode.nextNode;
  }
   
  return builder.toString();
 }
```

The code piece would look something like, 

```java
/**
* Simple solution to add astronomically huge numbers.
* 
* @author sangupta
* @since 27 Jun 2011
*/
public class Node {
 
 private int digit;
  
 private Node nextNode = null;
  
 public Node(int digit) {
  this.digit = digit;
 }
  
 public static void main(String[] args) {
  Node num1 = Node.createNumber("12345");
  Node num2 = Node.createNumber("55");
  Node sum = Node.sum(num1, num2);
  System.out.println("Sum: " + sum);
 }
  
 public static Node sum(Node num1, Node num2) {
  Node n1 = reverse(num1);
  Node n2 = reverse(num2);
   
  int carry = 0;
  Node sum = sum(n1, n2, carry);
   
  sum = reverse(sum);
   
  return sum;
 }
 
 private static Node sum(Node num1, Node num2, int carry) {
  Node result;
  if(num1 == null && num2 == null) {
   if(carry == 0) {
    result = null;
   } else {
    result = new Node(carry);
   }
  } else if(num1 != null && num2 != null) {
   int temp = num1.digit + num2.digit + carry;
   int digit = temp % 10;
   carry = temp / 10;
    
   result = new Node(digit);
   result.nextNode = sum(num1.nextNode, num2.nextNode, carry);
  } else if(num1 != null) {
   int temp = num1.digit + carry;
   int digit = num1.digit % 10;
   carry = temp / 10;
    
   result = new Node(digit);
   result.nextNode = sum(num1.nextNode, null, carry);
  } else {
   // only num2 is not null here
   int temp = num2.digit + carry;
   int digit = num2.digit % 10;
   carry = temp / 10;
    
   result = new Node(digit);
   result.nextNode = sum(null, num2.nextNode, carry);
  }
   
  return result;
 }
  
}
```

Hope this helps.