---
layout: default
title: Addition of Huge Astronomical Numbers
permalink: /2011/06/addition-of-huge-astronomical-numbers.html
redirect_from: "/2011/06/addition-of-huge-astronomical-numbers.html"
date: Tue Jun 28 08:00:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/06/addition-of-huge-astronomical-numbers.html
tags: coding-techniques interview-questions
---
<tt>Problem:</tt>
<br>There are two astronomically huge numbers that need to be added. The numbers are stored digit per digit as nodes of a linked list.
<br>
<br>
<tt>Solution:</tt>
<br>This is a classic linked-list problem, and often comes up as the favorite interview question in C/C++. I have had the same experience in my recent past both as an interviewee and as an interviewer. Anyways, over to the solution.
<br>
<br>Consider that our data is stored in a simple linked list structure such as,
<br>
<pre class="brush: java">public class Node {<br><br>    public int digit;<br><br>    public Node nextNode = null;<br><br>}<br></pre>
<br>The biggest hurdle in solving the problem is that the linked list can be traversed from one end, in our case the left end of the number (as a String) whereas the addition has to happen from the right-end of the number. To solve the same the easiest solution would be to reverse the linked lists. This way once you have the result, just reverse it back. Reversing should be easy as,
<br>
<br>
<pre class="brush: java">private static Node reverse(Node sum) {<br>  Node current = null;<br>  do {<br>   Node newNode = new Node(sum.digit);<br>   newNode.nextNode = current;<br>   current = newNode;<br>   sum = sum.nextNode;<br>  } while(sum != null);<br>  <br>  return current;<br> }<br></pre>
<br>Throwing in a convenience method to convert a string into the number as a linked list,
<br>
<br>
<pre class="brush: java">public static Node createNumber(String string) {<br>  char[] array = string.toCharArray();<br>  Node parentNode = new Node(array[0] - '0');<br>  Node node = parentNode;<br>  <br>  for(int i = 1; i &lt; array.length; i++) {<br>   Node temp = new Node(array[i] - '0');<br>   node.nextNode = temp;<br>   node = temp;<br>  }<br>  <br>  return parentNode;<br> }<br></pre>and to display the number as a String, 
<pre class="brush: java">public String toString() {<br>  StringBuilder builder = new StringBuilder();<br>  builder.append(this.digit);<br>  Node nextNode = this.nextNode;<br>  while(nextNode != null) {<br>   builder.append(nextNode.digit);<br>   nextNode = nextNode.nextNode;<br>  }<br>  <br>  return builder.toString();<br> }<br><br></pre>The code piece would look something like, 
<pre class="brush: java">/**<br> * Copyright (C) 2011, Sandeep Gupta<br> * http://www.sangupta.com<br> * <br> * The file is licensed under the the Apache License, Version 2.0<br> * (the "License"); you may not use this file except in compliance with<br> * the License.  You may obtain a copy of the License at<br> * <br> * http://www.apache.org/licenses/LICENSE-2.0<br> * <br> * Unless required by applicable law or agreed to in writing, software<br> * distributed under the License is distributed on an "AS IS" BASIS,<br> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br> * <br> * See the License for the specific language governing permissions and<br> * limitations under the License.<br> * <br> */<br><br>/**<br>* Simple solution to add astronomically huge numbers.<br>* <br>* @author sangupta<br>* @since 27 Jun 2011<br>*/<br>public class Node {<br><br> private int digit;<br> <br> private Node nextNode = null;<br> <br> public Node(int digit) {<br>  this.digit = digit;<br> }<br> <br> public static void main(String[] args) {<br>  Node num1 = Node.createNumber("12345");<br>  Node num2 = Node.createNumber("55");<br>  Node sum = Node.sum(num1, num2);<br>  System.out.println("Sum: " + sum);<br> }<br> <br> public static Node sum(Node num1, Node num2) {<br>  Node n1 = reverse(num1);<br>  Node n2 = reverse(num2);<br>  <br>  int carry = 0;<br>  Node sum = sum(n1, n2, carry);<br>  <br>  sum = reverse(sum);<br>  <br>  return sum;<br> }<br><br> private static Node sum(Node num1, Node num2, int carry) {<br>  Node result;<br>  if(num1 == null &amp;&amp; num2 == null) {<br>   if(carry == 0) {<br>    result = null;<br>   } else {<br>    result = new Node(carry);<br>   }<br>  } else if(num1 != null &amp;&amp; num2 != null) {<br>   int temp = num1.digit + num2.digit + carry;<br>   int digit = temp % 10;<br>   carry = temp / 10;<br>   <br>   result = new Node(digit);<br>   result.nextNode = sum(num1.nextNode, num2.nextNode, carry);<br>  } else if(num1 != null) {<br>   int temp = num1.digit + carry;<br>   int digit = num1.digit % 10;<br>   carry = temp / 10;<br>   <br>   result = new Node(digit);<br>   result.nextNode = sum(num1.nextNode, null, carry);<br>  } else {<br>   // only num2 is not null here<br>   int temp = num2.digit + carry;<br>   int digit = num2.digit % 10;<br>   carry = temp / 10;<br>   <br>   result = new Node(digit);<br>   result.nextNode = sum(null, num2.nextNode, carry);<br>  }<br>  <br>  return result;<br> }<br> <br>}<br></pre>
<br>Hope this helps.
