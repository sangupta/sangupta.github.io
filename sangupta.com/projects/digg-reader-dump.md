---
layout: project
title: Digg Reader Dump
github: digg-reader-dump
---

`digg-reader-dump` is a command-line tool to take dump of your Digg Reader account. 

### Why?

Digg Reader does not allow me to take a dump of all my data, except the OPML file. My saved
articles, my diggs etc - neither it provides me a way to search in them. Thus I wrote this
tool in my spare time to dump all of them for me, and probably allow me to search in them
in future.

Thus, I wrote this command-line tool to do the same for me.

### Usage


To dump all saved articles

```
$ digg saved -c <the cookie value>
```

To export an OPML of all subscriptions

```
$ digg subs -c <the cookie value>
```

The following commands are available:

```
usage: digg <command> [<args>]

The most commonly used digg commands are:
    all       Dump all articles
    diggs     Dump digged articles
    help      Display help information
    popular   Dump popular articles
    saved     Dump saved articles
    subs      Dump user subscriptions

See 'digg help <command>' for more information on a specific command.
```

### License

The library is released under the terms of **Apache Public License Version 2**.
