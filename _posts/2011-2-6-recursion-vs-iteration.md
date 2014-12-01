---
layout: post
title: Recursion v/s Iteration
permalink: /tech/recursion-vs-iteration.html
redirect_from: "/2011/02/recursion-vs-iteration.html"
date: Sun Feb 06 19:17:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/02/recursion-vs-iteration.html
tags: coding-techniques interview-questions
---
<p>One of the many conventional and traditional interview question is ‘Recursion or Iteration – Which is better?’. Well, both of them are used to are used for repetitive operations around data. One of the fundamental structures of programming are loops, present in various forms such as <strong>for </strong>(and its variations), <strong>while, </strong>and <strong>do</strong>. Recursion uses calling one method from the method itself. For me it is always difficult to justify the usage of one over another, and my guess, others land in the same boat often. I will try and jot my thoughts on the debate in this post.</p>
<p>In most of the situations, iteration is always faster than recursion (due to inherent stack jumps in recursion). Recursion is a self call, and uses more memory than iteration and fills in the system stack faster. Then, should we use ‘recursion’ et al? As per my (various) readings and experience, I have found the only one advantage of using ‘recursion’ over ‘iteration’: <em><strong>Cleaner and simpler code </strong>which can easily be understood.</em> </p>
<p>In case of manipulation of one or two data variables, normal loops are easy to understand. When the number of data variables increases, or the relationship in them is complex (other than normal proportionality) per iteration, normal loops can get confusing. In such occasions, it is easier to pass these dependent data variables as part of method arguments, and define the relationship inside the method. This leads to easier separation of each use-case including the <strong>base-case</strong>, the case in which the recursion breaks. Each recursion must break in one condition or another (similar as in <strong>while</strong> or <strong>do</strong> loops).</p>
<p>Let’s take an example of finding the size of a Binary Search Tree (total number of node). First an iterative-approach,</p>
<pre class="brush: java">long size(Node node) {<br>    Node tempNodes[] = new Node[Long.MAX_VALUE];<br>    long count == 0;<br>    long item = 0;<br><br>    // count the left nodes first<br>    Node currentNode = node.left;<br>    while(currentNode != null) {<br>        count++;<br>        tempNodes[item++] = currentNode;<br>        currentNode = currentNode.left;<br>    }<br><br>    for(long iterator = item; iterator &gt; 0; iterator--) {<br>        if(tempNodes[iterator - 1].right != null) {<br>            count++;<br>        }<br>    }<br><br>    item = 0;<br><br>    // count the right nodes<br>    Node currentNode = node.right;<br>    while(currentNode != null) {<br>        count++;<br>        tempNodes[item++] = currentNode;<br>        currentNode = currentNode.right;<br>    }<br><br>    for(long iterator = item; iterator &gt; 0; iterator--) {<br>        if(tempNodes[iterator - 1].left != null) {<br>            count++;<br>        }<br>    }<br><br>    return count;<br>}</pre>
<br>Now, the recursive approach:
<br>
<br>
<pre class="brush: java">long size(Node node) {<br>    if(node == null) {<br>        return 0;<br>    }<br><br>    return size(node.left) + 1 + size(node.right);<br>}</pre>
<p>In the above recursive implementation, our <em>base-case</em> is when the node is <tt>null.</tt> It’s very much evident from the above example, how recursion can lead to cleaner and simpler code. But, one must remember that there are trade-offs one has to make for cleaner code. Speed and Memory are definitely the front-runner candidates. Also, one must understand, that recursion can fail under the following cases:</p>
<ol>
    <li>When number of repetitions are too high it may lead to stack overflow. </li>
    <li>In case of infinite loops</li>
</ol>
<p>Thus, its problem and environment (at times) dependent and a little on the developer’s preferences, as to which is preferable. As an old school boy, am still inclined towards loops most of my time. Your choice is yours!</p>
