---
layout: project
title: URN - Object Storage Library
github: urn
---

**urn** is a Java library that helps integrate with different object stores via a simple API, allowing you to change
the provider at runtime without changing the code.

Currently available object store providers:

* In-memory
* Flat-file on disk
* Redis
* MongoDB

Ones in the pipeline:

* Amazon S3
* MongoDB GridFS
* SeaWeedFS
* LevelDB
* RocksDB
* SQlite

Feature Roadmap
---------------

- Ability for time-based eviction
- Metadata storage with object like MIME type
- A simple server that can serve the raw stream using the key
