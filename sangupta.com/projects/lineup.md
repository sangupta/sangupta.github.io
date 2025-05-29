---
layout: project
title: LineUp
github: lineup
maven: true
---

`lineup` is a simple in-memory high-throughput message queue service for Java. It can be used as:

* As a standalone service accessible via REST services
* Embedded inside an application

### Features

* In-memory and high-throughput
* Three different queue types
 * Default: all messages are allowed, including duplicates
 * Reject Duplicates: reject all duplicate messages
 * Priority with Duplicates: a simple priority queue that allows duplicates to be stored
 * Priority without Duplicates: a simple priority queue that rejects duplicates
 * Merging Priority: accept all duplicates and merge them by increasing their priority
* Accesible via REST API
* Amazon SQS API compliant (to be done)

### WARNING

The library is currently under development and may not be stable or may not support all features.

### License

The library is released under the terms of **Apache Public License Version 2**.
