---
layout: project
title: File Analysis
github: fileanalysis
---

**SQLize files to analyze dumps and logs.**

`FileAnalysis` is a simple tool that helps push data from various file formats
such as `CSV`, `tab-delimited`, `Apache HTTP Logs`, `Log4j`, `Logback` and others
into an embedded disk persisted `H2 database`. Once the data is in, you can run
proper SQL queries around the data and analyze them in a variety of ways.

### Features


* Run SQL queries against structured data
* Supports pagination during queries
* Interactive tool
* Plugin mechanism to add more file formats

### Inspiration

The idea is inspired from the fact that I need to analyze a lot of log files
and dumps and decipher information from them. Tools such as `Excel`, `splunk` etc 
have never helped me do things faster, and thus, I always ended up writing code
to do my tasks.

I then saw a small demo video of the `textql` tool at https://github.com/dinedal/textqlb
The concept of the tool was fantastic, push data into an in-memory SQL store and then
run a query against the data.

I improved upon the idea to first persist the data on disk as well, so that multiple
queries could be run. Ended up adding stuff to nicely display the data for `SELECT` queries
as well and made sure that when the result set had hundreds of rows, we paginated the
result with user's consent.

Once achieved, I though of extending to many more formats that I often use. And thus, it
led to the birth of `FileAnalysis`.

### Changelog

* Added `CSV` format - comma-delimited files
* Added Apache `log4j` format
* Added `logback` format
* Added Apache `httpd` log format
* Added `TSV` format - tab-delimited files
* Added pipe-delimited format
* Added custom-delimited format

### License

The library is released under the terms of **Apache Public License Version 2**.
