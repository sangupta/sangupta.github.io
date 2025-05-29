---
layout: project
title: Nutz
github: nutz
maven: true
---

`nutz` is yet another Markdown processor for the JVM. It is a handcoded parser that generates an `Abstract Syntax Tree`
before emitting the final HTML code. It may make use of Pepmint to support code highlighting in mentioned language.

The need for `nutz` arises from the fact that none of the available Markdown processors for JVM have the following characterstics:

* Generates an AST of the parsed data
* Easily extendable and customizable
* Is not regex-based
* Is fast enough
* Is as low-weight as possible

`pegdown` uses PEG grammar which is difficult to extend and passes 21 of 23 Markdown tests. `Actuarius` and `Knockoff` are 
written in Scala and use regular expressions for parsing. `txtmark` passes only 20 of 23 Markdown tests

Markdown tests are benchmark tests as laid by [Daring Fireball](http://daringfireball.net/projects/markdown). 

Links to alternative implementations are provided below.

### Features

* Support for standard Markdown syntax per Daring Fireball suite
* Suport for PHP fenced code blocks
* Support for Github-Flavored fenced code blocks
* All 23 tests pass

### Alternatives

`nutz` is not the first or the only-one around in the arena. Other Markdown processors available for JVM are:

* [Pegdown](http://pegdown.org)
* [Txtmark](https://github.com/rjeschke/txtmark)
* [Actuarius](https://github.com/chenkelmann/actuarius)
* [Knockoff](http://tristanjuricek.com/knockoff/)

### License

The library is released under the terms of **Apache Public License Version 2**.
