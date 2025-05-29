---
title: Cyclomatic Complexity
date: 21 Feb 2007
tags: 
- coding-techniques
alias:
- /tech/cyclomatic-complexity.html
- /2007/02/cyclomatic-complexity.html
---

While reading about unit testing, I was wondering if there was a way to find out the number 
of test cases that would be needed to test the class completely. A large class can have large 
number of independent execution paths, which would be adopted. There are execution points 
which are independent of each other. This may lead to a situation where an execution path 
is covered while testing, but has not been specifically tested. So a 100% code coverage does 
not necessarily reflect 100% testing of the code.

<!-- break here -->

Here comes cyclomatic complexity to the programmer's help. This is an ordinal number which would 
be an indication of the total number of different execution paths a method may follow. This may 
give us a fairly good idea of how many test cases one would need to actually 100% test a given 
code class. For example if a method has a CC equal to 2, it requires two unit tests. If all tests 
indicated by CC are written, it would definitely lead to a 100% coverage.

History
-------

Introduced by `Thomas McCabe` in 1976, it measures the number of linearly-independent paths through 
a program module. It is independent of a programming language and its format. It has been widely 
accepted as a measure of the software programming metrics and is a good measure of soundness of 
a piece of code.

Computation
-----------

The cyclomatic complexity of a software module is calculated from a connected graph of the 
module (that shows the topology of control flow within the program):

```
Cyclomatic complexity (CC) = E - N + p
	where E = the number of edges of the graph
		  N = the number of nodes of the graph
		  p = the number of connected components
```

To actually count these elements requires establishing a counting convention (tools to count 
cyclomatic complexity contain these conventions). The complexity number is generally considered 
to provide a stronger measure of a program's structural complexity than is provided by counting 
lines of code.

As per Carnegie Mellon Univ., A low cyclomatic complexity contributes to a program's <em>understandability</em> 
and indicates it is amenable to <em>modification</em> at lower risk than a more complex program. A module's 
cyclomatic complexity is also a strong indicator of its <em>testability.</em>

A CC of 1-10 indicates a simple program without much risk. A CC of 11-20 reflects a more complex, moderate 
risk program. From 21-50, it indicates a complex and high risk program. At greater than 50, it is considered 
to be untestable.

Usage Considerations
--------------------

The usage of this number can be applied to

1. Code development risk analysis: May indicate inherent risk in a module, which can then be refactored.
2. Change risk analysis in maintenance: Measuring it before and after changes, it can be monitored to help decide the risk of change.
3. Test planning: Indicates the numberof test cases required for a particular piece of code.
4. Reengineering: Higher the CC, higher is the risk in rewriting that module code.

Now going to look for tools that may tabulate CC for a given piece of code.