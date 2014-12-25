---
layout: post
title: Deleting a given node from a linked list
permalink: /tech/deleting-given-node-from-linked-list.html
redirect_from: "/2010/03/deleting-given-node-from-linked-list.html"
date: Sat Mar 27 19:39:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/03/deleting-given-node-from-linked-list.html
tags: interview-questions
excerpt: Delete a node from a linked list - Java implementation
---

Problem
-------

Given a linked list, and a node in the list. How do you delete this very node from 
the linked list. You may safely assume that the node is not the last node of the list.

Solution
--------

Consider the following linked list, with the last node being Z. We need to delete a 
given node from this list. Remember we are in a singly linked list and hence we cannot 
traverse back in the node.

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://1.bp.blogspot.com/_Igofzvi0TDM/S64RCj0Mz7I/AAAAAAAAFXE/yK-GgWHk1Y8/s1600-h/Node2.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="41" src="http://1.bp.blogspot.com/_Igofzvi0TDM/S64RCj0Mz7I/AAAAAAAAFXE/yK-GgWHk1Y8/s320/Node2.JPG" width="320"></a>
</div>

Consider a case where the node is not the second last node. For example, we need to delete 
the node W from the list. Swap the value of node W with the next node X. Thus, the list 
would somewhat look like,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://2.bp.blogspot.com/_Igofzvi0TDM/S64RB5j5sOI/AAAAAAAAFXA/o_W1Ek1-18A/s1600-h/Node1.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="43" src="http://2.bp.blogspot.com/_Igofzvi0TDM/S64RB5j5sOI/AAAAAAAAFXA/o_W1Ek1-18A/s320/Node1.JPG" width="320"></a>
</div>

Now point the original node to the node pointed by the forward node i.e., make X point 
directly to Y, instead of W.

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://4.bp.blogspot.com/_Igofzvi0TDM/S64RC7ZE9lI/AAAAAAAAFXI/ih67CNv1Jfs/s1600-h/Node3.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="48" src="http://4.bp.blogspot.com/_Igofzvi0TDM/S64RC7ZE9lI/AAAAAAAAFXI/ih67CNv1Jfs/s320/Node3.JPG" width="320"></a>
</div>

And we have deleted the original node.

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://4.bp.blogspot.com/_Igofzvi0TDM/S64RBQ6yLHI/AAAAAAAAFW8/GERD-UzI8Tw/s1600-h/Node4.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="42" src="http://4.bp.blogspot.com/_Igofzvi0TDM/S64RBQ6yLHI/AAAAAAAAFW8/GERD-UzI8Tw/s320/Node4.JPG" width="320"></a>
</div>

For the case where the node being deleted is the last node, just make the node point to 
`NULL`, i.e. make it the tail/terminating node of the linked list.

Hope this helps.
