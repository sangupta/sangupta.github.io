---
title: Queue using Stacks!
date: 12 Mar 2010
tags: 
- coding-techniques
- interview-questions
alias:
- /tech/queue-using-stacks.html
- /2010/03/queue-using-stacks.html
---

Recently, a casual conversation in the office brought me to an observation, most 
of the candidates we had interviewed had flunked the question, 
`How do you implement a Queue using two Stack's?` Hence, I take today's opportunity to 
discuss the implementation for the problem stated above.

<!-- break here -->

Solution
--------

Let's consider two stacks called A and B. A stream of numbers is coming in as part of the 
`enqueue` function. The stream is numbered as 1, 2, 3, and so on for ease of understanding. 

Say, there are three `enqueue` calls with numbers 1, 2 and 3 in the respective order. Store 
them in Stack A on top of each other. Thus the stacks should look like,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://2.bp.blogspot.com/_Igofzvi0TDM/S5nV-Vo9KLI/AAAAAAAAFTc/3dF5eK3_gwc/s1600-h/QueueStack1.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="162" src="http://2.bp.blogspot.com/_Igofzvi0TDM/S5nV-Vo9KLI/AAAAAAAAFTc/3dF5eK3_gwc/s320/QueueStack1.JPG" width="320"></a>
</div>

Now, say I call a `dequeue`. We now need to get 1 back and return it. To achieve the same 
pop all numbers from stack A and push them to stack B. Thus the stacks would now look like,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://3.bp.blogspot.com/_Igofzvi0TDM/S5nV-cQtelI/AAAAAAAAFTg/HCbohzBqLSA/s1600-h/QueueStack2.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="156" src="http://3.bp.blogspot.com/_Igofzvi0TDM/S5nV-cQtelI/AAAAAAAAFTg/HCbohzBqLSA/s320/QueueStack2.JPG" width="320"></a>
</div>

Return 1, and the stacks are,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://4.bp.blogspot.com/_Igofzvi0TDM/S5nV-mrjH1I/AAAAAAAAFTk/KmtL-oPydOU/s1600-h/QueueStack3.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="156" src="http://4.bp.blogspot.com/_Igofzvi0TDM/S5nV-mrjH1I/AAAAAAAAFTk/KmtL-oPydOU/s320/QueueStack3.JPG" width="320"></a>
</div>

Now we have more `enqueue` calls for say up to 7. Push all of these to stack A. Stacks would look like,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://3.bp.blogspot.com/_Igofzvi0TDM/S5nV-g4mOEI/AAAAAAAAFTo/zn-NYFLX3DY/s1600-h/QueueStack4.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="156" src="http://3.bp.blogspot.com/_Igofzvi0TDM/S5nV-g4mOEI/AAAAAAAAFTo/zn-NYFLX3DY/s320/QueueStack4.JPG" width="320"></a>
</div>

Now for every `dequeue` call return elements from stack B till it gets empty. 

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://4.bp.blogspot.com/_Igofzvi0TDM/S5nV-tO_gUI/AAAAAAAAFTs/LaKBRIe0WKE/s1600-h/QueueStack5.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="156" src="http://4.bp.blogspot.com/_Igofzvi0TDM/S5nV-tO_gUI/AAAAAAAAFTs/LaKBRIe0WKE/s320/QueueStack5.JPG" width="320"></a>
</div>

Once stack B is empty, on the next `dequeue` call, pop all elements from stack A and push to stack B. Stacks are,

<div class="separator" style="clear: both; text-align: center;">
    <a href="http://2.bp.blogspot.com/_Igofzvi0TDM/S5nWdIcEDOI/AAAAAAAAFTw/MOmqnSqoqLE/s1600-h/QueueStack6.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="160" src="http://2.bp.blogspot.com/_Igofzvi0TDM/S5nWdIcEDOI/AAAAAAAAFTw/MOmqnSqoqLE/s320/QueueStack6.JPG" width="320"></a>
</div>

Continue this way and we now have a queue implementation with least amount of overhead.

Hope this helps!