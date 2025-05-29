---
title: Recursion v/s Iteration
date: 06 Feb 2011
tags: 
- coding-techniques
- interview-questions
alias:
- /tech/recursion-vs-iteration.html
- /2011/02/recursion-vs-iteration.html
---

One of the many conventional and traditional interview question is ‘Recursion or Iteration – 
Which is better?’. Well, both of them are used to are used for repetitive operations around 
data. One of the fundamental structures of programming are loops, present in various forms 
such as `for` (and its variations), `while`, and `do`. 

<!-- break here -->

Recursion uses calling one method from the method itself. For me it is always difficult to 
justify the usage of one over another, and my guess, others land in the same boat often. I will 
try and jot my thoughts on the debate in this post.

In most of the situations, iteration is always faster than recursion (due to inherent stack 
jumps in recursion). Recursion is a self call, and uses more memory than iteration and fills in 
the system stack faster. Then, should we use ‘recursion’ et al? As per my (various) readings and 
experience, I have found the only one advantage of using `recursion` over `iteration`: 

* **Cleaner and simpler code** which can easily be understood.

In case of manipulation of one or two data variables, normal loops are easy to understand. When 
the number of data variables increases, or the relationship in them is complex (other than normal 
proportionality) per iteration, normal loops can get confusing. In such occasions, it is easier 
to pass these dependent data variables as part of method arguments, and define the relationship 
inside the method. This leads to easier separation of each use-case including the `base-case`, the 
case in which the recursion breaks. Each recursion must break in one condition or another (similar 
as in `while` or `do` loops).

Let’s take an example of finding the size of a Binary Search Tree (total number of node). First 
an iterative-approach,

```java
long size(Node node) {
    Node tempNodes[] = new Node[Long.MAX_VALUE];
    long count == 0;
    long item = 0;
 
    // count the left nodes first
    Node currentNode = node.left;
    while(currentNode != null) {
        count++;
        tempNodes[item++] = currentNode;
        currentNode = currentNode.left;
    }
 
    for(long iterator = item; iterator > 0; iterator--) {
        if(tempNodes[iterator - 1].right != null) {
            count++;
        }
    }
 
    item = 0;
 
    // count the right nodes
    Node currentNode = node.right;
    while(currentNode != null) {
        count++;
        tempNodes[item++] = currentNode;
        currentNode = currentNode.right;
    }
 
    for(long iterator = item; iterator > 0; iterator--) {
        if(tempNodes[iterator - 1].left != null) {
            count++;
        }
    }
 
    return count;
}
```

Now, the recursive approach:

```java
long size(Node node) {
    if(node == null) {
        return 0;
    }
 
    return size(node.left) + 1 + size(node.right);
}
```

In the above recursive implementation, our `base-case` is when the node is `null`. It’s very much evident 
from the above example, how recursion can lead to cleaner and simpler code. But, one must remember that 
there are trade-offs one has to make for cleaner code. Speed and Memory are definitely the front-runner 
candidates. Also, one must understand, that recursion can fail under the following cases:

* When number of repetitions are too high it may lead to stack overflow
* In case of infinite loops

Thus, its problem and environment (at times) dependent and a little on the developer’s preferences, as to 
which is preferable. As an old school boy, am still inclined towards loops most of my time. Your choice is 
yours!