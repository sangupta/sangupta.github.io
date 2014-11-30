---
layout: default
title: Cyclomatic Complexity
permalink: /2007/02/cyclomatic-complexity.html
redirect_from: "/2007/02/cyclomatic-complexity.html"
date: Wed Feb 21 14:49:00 IST 2007
sharingURL: http://blog.sangupta.com/2007/02/cyclomatic-complexity.html
tags: coding-techniques
---
<p>While reading about unit testing, I was wondering if there was a way to find out the number of test cases that would be needed to test the class completely. A large class can have large number of independent execution paths, which would be adopted. There are execution points&nbsp; which are independent of each other. This may lead to a situation where an execution path is covered while testing, but has not been specifically tested. So a 100% code coverage does not necessarily reflect 100% testing of the code.</p> 
<p>Here comes cyclomatic complexity to the programmer's help. This is an ordinal number which would be an indication of the total number of different execution paths a method may follow. This may give us a fairly good idea of how many test cases one would need to actually 100% test a given code class. For example if a method has a CC equal to 2, it requires two unit tests. If all tests indicated by CC are written, it would definitely lead to a 100% coverage.</p> 
<p><strong><u>History</u></strong></p> 
<p>Introduced by <a></a>Thomas McCabe in 1976, it measures the number of linearly-independent paths through a program module. It is independent of a programming language and its format. It has been widely accepted as a measure of the software programming metrics and is a good measure of soundness of a piece of code.</p> 
<p><u><strong>Computation</strong></u></p> 
<p>The cyclomatic complexity of a software module is calculated from a <a></a>connected graph of the module (that shows the topology of control flow within the program):</p> 
<p>Cyclomatic complexity (CC) = E - N + p </p>
<p>where E = the number of edges of the graph </p>
<p>N = the number of nodes of the graph </p>
<p>p = the number of connected components </p>
<p>To actually count these elements requires establishing a counting convention (tools to count cyclomatic complexity contain these conventions). The complexity number is generally considered to provide a stronger measure of a program's structural complexity than is provided by counting lines of code. </p>
<p>As per Carnegie Mellon Univ., A low cyclomatic complexity contributes to a program's <em>understandability</em> and indicates it is amenable to <em>modification</em> at lower risk than a more complex program. A module's cyclomatic complexity is also a strong indicator of its <em>testability.</em> </p>
<p>A CC of 1-10 indicates a simple program without much risk. A CC of 11-20 reflects a more complex, moderate risk program. From 21-50, it indicates a complex and high risk program. At greater than 50, it is considered to be untestable. </p>
<p><strong><u>Usage Considerations</u></strong> </p>
<p>The usage of this number can be applied to </p>
<ol> 
    <li>Code development risk analysis: May indicate inherent risk in a module, which can then be refactored.</li> 
    <li>Change risk analysis in maintenance: Measuring it before and after changes, it can be monitored to help decide the risk of change.</li> 
    <li>Test planning: Indicates the numberof test cases required for a particular piece of code.</li> 
    <li>Reengineering: Higher the CC, higher is the risk in rewriting that module code.</li>
</ol> 
<p>Now going to look for tools that may tabulate CC for a given piece of code. </p>
