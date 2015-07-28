---
layout: post
title: Various Bit-Array Implementation in Java
permalink: /tech/various-bit-array-implementations-java.html
tags: java, open-source, jerry
---

`Bit-Arrays` are much-useful and quite-fast data-structure that have a variety of uses. One of the most important
ones in context of Big-Data is the use in Bloom filters. To store the bloom we need a very fast bit-array and the
ones that can be persisted as well. `Java` has only an in-memory bit-array implementation. I needed a file-persisted
one to be used in conjunction with the <a href="https://github.com/sangupta/bloomfilter">bloomfilter</a> filter project. Thus,
I added the following implementations to the <a href="https://github.com/sangupta/jerry-core">jerry-core</a> project.

* `FastBitArray` - an implementation that is much faster than the standard Java implementation
* `FileBackedBitArray` - backed by file persistence, and all operations are flushed back automatically
* `MMapFileBackedBitArray` - one that is file-persisted, but uses memory-mapped files for nuch faster performance
* `JavaBitSetArray` - one that uses internal `Java` implementation underneath

I have used `MMapFileBackedBitArray` in production for the last few years and has been quite useful and fast.

Hope this helps.
