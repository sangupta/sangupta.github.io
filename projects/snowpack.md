---
layout: project
title: SnowPack
github: snowpack
---

`snowpack` is a Java library that allows you to store millions of small files (called flakes) on disk, in larger files (called chunks)
for performance benefits. When you store millions of small files on disk, the read performance degrades considerably because of want
to disk seeks required to read the File Allocation Table as well as to read the particular disk portion. As is known, that disk seeks
are expensive than disk transfer, we utilize the fact to merge many files into larger chunks, so that seeks are reduced.

The file metadata is stored in a simple LevelDB database to make sure that we have everything to read about the file from these larger
chunks.

### Features

* Store millions of files into larger chunks
* Much faster performance - store around 5000+ files totalling 250MB+ in less than a minute on commodity hardware
* Read speeds are much faster
* Recently used files are saved in memory cache
* All files in the current writable chunks are in-memory cached to prevent disk seeks
* Metadata is stored in the fast LevelDB database
* Backups are as easy as copying the chunk files (usually 1GB in size) to the backup store
* Recovery is possible on crash using the SnowpackRecover tool
* Only chunk files are needed to recover

### License

The library is released under the terms of **Apache Public License Version 2**.
