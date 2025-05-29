---
layout: project
title: Comparator
github: comparator
maven: true
---

`comparator` consists of utility classes that allow comparison of various free-form structured data such as 
HTML, XML and JSON markup. String comparison is neither sufficient nor correct, as:

* there may be white spaces
* or the attributes may be written in a different order
* tags without any data may be self-closed

And thus, the comparison needs markup analysis.

### Features

* Added support for XML and JSON comparison
* Support for HTML comments
* Fixed bug where attribute present in actual HTML was not present in expected HTML
* Support for comparing HTML markup

### License

The library is released under the terms of **Apache Public License Version 2**.
