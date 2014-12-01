---
layout: post
title: Majority Element in an Array
permalink: /tech/majority-element-in-array.html
redirect_from: "/2011/05/majority-element-in-array.html"
date: Mon May 02 13:25:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/05/majority-element-in-array.html
tags: interview-questions
---
<tt>Problem:</tt> Given an array consisting of N integers, find the number with the maximum occurrences, majority element, given the assumption that the number occurs more than N/2 times in the array.
<br>
<br>
<tt>Solution:</tt> Given the assumption that the element occurs more than N/2 times in the array simplifies the solution a lot. This is so because if more than N/2 elements are the same, it implies that all other elements combined are less than N/2. Hence, the difference between the count of majority element and the count of non-majority numbers will always be positive. This approach can significantly simplify our code to the problem.
<br>
<br>In the solution we consider the first element as the majority element and keep the count as 1. Now we compare the second (next) element with this element. If it is the same element we increase the count to 2, else decrease the count to ZERO and keep the first element as the majority element. Check the next element. If it is equal increase the count, else set the majority element to be the given current element and make the count as ONE.
<br>
<br>This way, at the end of the traversal of the list, we will have the majority element with us. As comparison between two elements takes constant time, the code will run in 
<tt>O(n)</tt> time where 
<b>n</b> is the number of elements in the list.
<br>
<br>
<pre class="brush: java">/**<br> * Copyright (C) 2011, Sandeep Gupta<br> * http://www.sangupta.com<br> * <br> * The file is licensed under the the Apache License, Version 2.0<br> * (the "License"); you may not use this file except in compliance with<br> * the License.  You may obtain a copy of the License at<br> * <br> * http://www.apache.org/licenses/LICENSE-2.0<br> * <br> * Unless required by applicable law or agreed to in writing, software<br> * distributed under the License is distributed on an "AS IS" BASIS,<br> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br> * <br> * See the License for the specific language governing permissions and<br> * limitations under the License.<br> * <br> */<br><br>public class MajorityElement {<br> <br> public static void main(String[] args) {<br>  int[] list = new int[] {1, 2, 3, 4, 2, 3, 4, 2, 3, 2, 1, 2, 3, 4, 2, 2, 2};<br>  <br>  int count = 1;<br>  int majorityElement = list[0];<br>  for(int index = 1; index &lt; list.length; index++) {<br>   if(majorityElement != list[index]) {<br>    if(count == 0) {<br>     majorityElement = list[index];<br>     count++;<br>    } else {<br>     count--;<br>    }<br>   } else {<br>    count++;<br>   }<br>  }<br>  <br>  System.out.println("Majority Element: " + majorityElement);<br> }<br><br>}<br></pre>
<br>Hope this helps.
