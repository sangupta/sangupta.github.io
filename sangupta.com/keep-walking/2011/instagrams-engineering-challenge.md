---
title: Instagram's Engineering Challenge&#58; The Unshredder
date: 06 Dec 2011
tags: 
- code-challenge
- coding-techniques
- my-projects
alias:
- /tech/instagrams-engineering-challenge.html
- /2011/12/instagrams-engineering-challenge.html
---

Three weeks ago, Instagram posted an engineering challenge:
<a href="http://instagram-engineering.tumblr.com/post/12651721845/instagram-engineering-challenge-the-unshredder">The Unshredder</a>. The challenge presented an image that had been vertically shredded/spliced and then rejoined randomly, thus resulting in an image that looks like a puzzle. What one had to do was to write a script to take that image and unshred it - yes, reconstruct the original image.

<!-- break here -->

From their blog,

> Your challenge, if you choose to accept it, is to write a simple script that
> takes a shredded image in as input:
>
>
>        <a href="http://media.tumblr.com/tumblr_luigsoCv3s1qm4rc3.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="280" src="http://media.tumblr.com/tumblr_luigsoCv3s1qm4rc3.png" width="500"></a>
>
> and outputs an unshredded and reconstituted image. That is, imagine if you took
> an image, divided it into an even number of columns and shuffled those columns
> randomly to produce a shredded image. Then, take that image into the script
> and output the original image:
>
>
>
        <a href="http://media.tumblr.com/tumblr_luih7og6QM1qm4rc3.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="280" src="http://media.tumblr.com/tumblr_luih7og6QM1qm4rc3.png" width="500"></a>
>

I happened to read and pick up this challenge yesterday, and it was surprising
to find that the solution was a very simple best-match function that had to place
a given slice alongside another based on how close the left-pixels of one were
to the right-pixels of another. I used Java and the built in AWT package to load
the image and read the pixel colors at various coordinates. Reconstructing the
image was again super easy using AWT. To test that the solution was a generic
one, I sliced some 50 random images and then reconstructed them using my code
for varying slice-widths - ranging from 4 pixel wide to 64 pixel wide.

My algorithm worked in the following way:


* Find out the number of stripes in the image (as the strip-width is known)
* Slice the image and store all sub-images in a given array
* Pick the first slice from the array
* Now for each other slice in the array (slices that have not yet been used) - compute
the average Euclidean distance of the left edge of the given slice and the right
edge of the test slice. Similarly, compute the average distance of the right
edge of the given slice and the left edge of the test slice.
* Find the slices that have the least scores for left and right side
* Now, insert the one of the test slice to the left or to the right, depending
on which test slice and edge had the lowest average distance
* Work this way to arrange each unused slice to the set of arranged slices
* At the end, you have all the slices in order resulting in the reconstructed
image

For those interested the code is posted on my
<a href="https://github.com/sangupta/image-unshred">GitHub repository</a> at
<a href="https://github.com/sangupta/image-unshred">https://github.com/sangupta/image-unshred</a>

I haven't yet completed the bonus part of it due to lack of time, but hope
to push it in a day or two.

Happy Coding!