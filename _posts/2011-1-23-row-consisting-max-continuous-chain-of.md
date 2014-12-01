---
layout: post
title: Row consisting max continuous chain of 1’s in an n * n grid
permalink: /tech/row-consisting-max-continuous-chain-of.html
redirect_from: "/2011/01/row-consisting-max-continuous-chain-of.html"
date: Sun Jan 23 13:36:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/01/row-consisting-max-continuous-chain-of.html
tags: interview-questions
---
<p><tt>Problem:</tt> Given an n * n grid consisting of only ZEROs and ONEs, such that if in a row a ZERO is present all elements to the right of it will be ZEROs. Thus, a row can start with ONEs and end in only ZEROs, there cannot be a mix and match. You need to find the row with maximum ONEs in a given row. For example in the grid below,</p>
<blockquote>
    <p>1 1 1 0 0 <br>1 0 0 0 0 <br>0 0 0 0 0 <br>1 1 1 1 0 <br>1 1 0 0 0</p>
</blockquote>
<p>In the example above, row 4 has the maximum continuous chain of ONEs.</p>
<p><tt>Solution:</tt> One’s first guess would be to crawl through each row, finding the maximum number of ONEs in each and keep traversing till the end. Considering the fact that finding ONEs in a given row will take <tt>O(n)</tt> time and traversing each row will take its own <tt>O(n)</tt> time, taking the total time complexity to <tt>O(n<sup>2</sup>)</tt>, the solution, though perfect would not be optimal as the value of <tt>n</tt> tends to get larger.</p>
<p>A better solution is to find the position of last ONE in the first row, which takes <tt>O(n)</tt> time. Considering the example above, it is the 3rd element. Now traverse down row by row, checking the 3rd element of each row. In case the element is ONE, check the next element for being ONE. In the example above, we see that row 2 and row 3 do not yield a ONE on column 3. But row 4 does. Now the 4th element in row 4 is also a ONE, and thus, we move down on column 4 now. In row 5, it is a ZERO and hence, the row with maximum number of ONEs will be row 4.</p>
<p>This particular approach involves checking first x elements of row 1, and then crawling down through each row checking for one element, occasionally moving right if needed. Thus, considering the worst case where a row contains all ONEs, we will crawl n rows down, and n elements to the right. This lowers down the time complexity to <tt>O(n)</tt> which surely better than the first approach.</p>
<p>Hope this helps. </p>
