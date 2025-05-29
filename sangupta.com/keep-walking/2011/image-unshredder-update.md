---
title: Image Unshredder - Update
date: 07 Dec 2011
tags: 
- code-challenge
- coding-techniques
- my-projects
alias:
- /tech/image-unshredder-update.html
- /2011/12/image-unshredder-update.html
---

In continuation of my
<a href="http://blog.sangupta.com/2011/12/instagrams-engineering-challenge.html">earlier post</a> about
<b>Instagram's Engineering Challenge on an Image Unshredder</b>, I took some time out yesterday
and completed the automatic strip width detection piece. The approach was easy, the euclidean
distance on the strip edge will be too high than the normal values.

<!-- break here -->

For example the values may look like,


```
3, 4, 3, 5, 3, 2, 6, <b>22</b>, 4, 3, 2, 3, 4, 3, 2, <b>27</b>, 3, ...
```

One just needs to take the average of above values, then find the average of values greater
than this average. Once you have the maxAverage, one can run a loop and find the value where
the ratio of (value / minimum) is close to the ratio of (maxAverage / minimum). The first
index where this happens is the strip width. To be doubly sure that we have chosen the right
value, make sure the strip width divides the image width in whole.

I tested my code with many a free images from `Flickr` and it all worked. Though I did find a couple
of issues with images that had a dark background and no front object - like a huge clear
sky running in.

As the challenge was to unshred the shredded `Tokyo` image, it stands completed. The remaining
improvements, I will leave for some other day.

I have also added an `image shredder` and a test suite that takes in images from a given
folder, shreds and then unshreds them.

For those interested the code is posted on my
<a href="https://github.com/sangupta/image-unshred">GitHub repository</a> at
<a href="https://github.com/sangupta/image-unshred">https://github.com/sangupta/image-unshred</a>

Hope this helps!