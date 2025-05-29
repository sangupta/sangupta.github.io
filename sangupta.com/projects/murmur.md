---
layout: project
title: Murmur
github: murmur
maven: true
---

`murmur` is a pure Java implementation of all `Murmur` hashes, namely, `Murmur1`, `Murmur2` and `Murmur3`. The library is a direct Java implementation of the C++ source code. Hash generation has been 100% unit tested against the hashes generated using the C++ code. The library should help in building bloom filters, or to just compute the hash for checking sanity of data, as `Murmur3` is much faster than MD5 and SHA computations.

### Why murmur?

`murmur` was developed as I could not find pure Java implementations for `Murmur1` and `Murmur2` hashes. Implementations were available for `Murmur3` but for some of the legacy code that I maintain, I needed the `Murmur1` and `Murmur2` hashes. Thus, I ported the original implementations.

### Features

* Pure Java implementations of various Murmur hashes
* 100% hash compatibility with original C++ code
* No dependencies

### Usage

**Murmur1**

```java
String str = "Hello, World!";
long hash = Murmur1.hash(bytes, bytes.length, SEED);
```

**Murmur2**

```java
String str = "Hello, World!";
long hash = Murmur2.hash(bytes, bytes.length, SEED);
long hash = Murmur2.hash64(bytes, bytes.length, SEED);
```

**Murmur3**

```java
String str = "Hello, World!";
long hash = Murmur3.hash_x86_32(bytes, bytes.length, SEED); // 64-bit hash

// returns 2 long values that contain the 128-bit hash
long[] hashes = Murmur3.hash_x64_128(bytes, bytes.length, SEED); // 128-bit hash
```

### Performance

The `MurmurPerformanceTests.java` file contains tests to compute hashes of 1-million random type-4 UUIDs
between various Murmur hashes, and `MD5`, `SHA-1`, `SHA-256`, and `SHA-512` hashes. 

The results of a sample run on my dev machine are as under:

```
Intel i7-2660 CPU @ 3.40Ghz
16-GB RAM
Windows 7, 64-bit, Service Pack 1
Oracle JDK 1.7.0_51 build 13, 64-bit Server VM
```

| Algorithm | Time Taken (millis) |
| :-------- | --------------: |
| Murmur-2-64 | 102 |
| Murmur-2  | 135 |
| Murmur-1  | 143 |
| Murmur-3-128 | 160 |
| Murmur-3  | 168 |
| MD5 | 369 |
| SHA-1 | 482 |
| SHA-256 | 677 |
| SHA-512 | 906 |

<h3>Downloads</h3>

The library can be downloaded from Maven Central using:

```xml
<dependency>
    <groupId>com.sangupta</groupId>
    <artifactId>murmur</artifactId>
    <version>1.0.0</version>
</dependency>
```

### License

The library is released under the terms of **Apache Public License Version 2**.

### License

The library is released under the terms of **Apache Public License Version 2**.
