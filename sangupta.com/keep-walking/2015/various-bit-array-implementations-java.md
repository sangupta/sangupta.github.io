---
title: Various Bit-Array Implementation in Java
date: 28 Jul 2015
tags: 
- java,
- open-source,
- jerry
alias:
- /tech/various-bit-array-implementations-java.html
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

Usage is pretty simple as,

```java
final int maxElements = 1000 * 1000; // 1 million
BitArray ba = new FileBackedBitArray(new File("my-bit-array.ba"), maxElements);

boolean updated = ba.setBit(13); // returns true
updated = ba.setBit(13); // returns false
ba.clearBit(13);
udpated = ba.setBit(13); // returns true

boolean isSet = ba.getBit(13); // returns true


// using the memory-mapped version is similar
ba = new MMapFileBackedBitArray(new File("my-bit-array"), maxElements);

// all other operations are the same
```

I have used `MMapFileBackedBitArray` in production for the last few years and has been quite useful and fast.

Hope this helps.