---
title: Releasing jerry-core 3.0.0
date: 21 Dec 2016
tags: 
- java,
- open-source
alias:
- /tech/jerry-core-3-release.html
---

I am happy to announce that exactly after an year of the last release, I have a
new major release for **jerry-core** library: version **3.0.0**. You may get hold
of the library from Maven Central with the following coordinates:

```xml
<dependency>
    <groupId>com.sangupta</groupId>
    <artifactId>jerry-core</artifactId>
    <version>3.0.0</version>
</dependency>
```

<!-- break here -->

Following are the major changes in this release:

* Minimum supported JDK version is now 1.7 than earlier 1.6
* Upgraded the dependencies to the latest available versions
* Fixed a critical bug in `Base62Encoder` where conflicting codes were being
generated - this impacts if numbers encoded were both positive and negative. And
thus this makes us bump up the major version - as the `Base62Encoder` is no longer
compatible with codes generated with any of the previous versions

Other additions to the library include (and not limited to):

* Added `ResourceUtils` to read files from classpath including from packaged JARs
* Added `StringArrayIterator` to iterate over a string array using `Iterator`
* Added `IndentedStringWriter` that takes care of writing long indented text that
breaks at a given line length
* Added `count`, `removeAll`, `ltrim()` and `rtrim()` methods to `StringUtils`
* Updated `ReflectionUtils` to bind values to object-wrappers for primitives
* Allow counter names to be read from `IntegerCounter` and `LongCounter`
* Added `SimpleMultiMap.numValues()`
* Added `StringUtils.wildcardMatch()` method
* Added `jitpack.yml` for allowing `jerry-core` via https://jitpack.io
* Added `isJDK8()` and `isJDK9()` methods to `JDKUtils`
* Added `asMap()` and `clear` methods to `IntegerCounter` and `LongCounter`
* Added `getNextSetBit()` method to `BitArray` and implementations
* Added `AdvancedStringReader` and corresponding unit-tests

And lastly, the **Javadocs** have been updated heavily to add missing documentation
and update the existing one to bring in more clarity.

Usage examples will be posted soon to this blog :)

Hope you find this release useful.