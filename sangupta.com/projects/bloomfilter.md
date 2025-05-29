---
layout: project
title: Bloom Filter
github: bloomfilter
maven: true
---

`bloomfilter` is a pure Java Bloom Filter implementation that provides simple persistable bloom filters. The
entire bloom filter is abstracted into various layers so that the same can be changed by pure plug-and-play implementations
such as decomposing an object to a byte-stream, or the hash function to be used, or the serialization strategy to
be used.

### Why another Bloom Filter implementation?

`bloomfilter` was developed as I was looking for a fast persistable bloom filter implementation that could
be customized to suit needs. The `Google Guava` bloom filter for few reasons cannot be persisted well, does not
provide for a disk-backed bit array implementation, missing a counting bloom filter and last not the least 
the size of the payload. Many of my modules/projects did not need `Guava` and adding it just for using the 
bloom filter was coming out to be expensive. Thus, `bloomfilter` was born.

The `bloomfilter` is inspired by the `Guava` bloom filter implementation and uses a similar approach, with 
more extensions baked in.

### Features

* Uses pure Java murmur hash implementation as default hash function
* Various persisting methodologies - Java serialization, disk file etc
* No dependencies

### Other Similar Projects

#### Google Guava

Read more at http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/hash/BloomFilter.html

* As explained before, is heavy.

#### Orestes-Bloomfilter

https://github.com/DivineTraube/Orestes-Bloomfilter

* Does not have a persisted version of a BloomFilter
* Does not have a Murmur3 implementation

#### Greplin-bloom-filter 

https://github.com/Cue/greplin-bloom-filter

* The persisted bloom filter does not use memory-mapped files, rather the slower file-seek-change-repeat workflow. 
* No Murmur3 implementation

### License

The library is released under the terms of **Apache Public License Version 2**.
