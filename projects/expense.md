---
layout: project
title: Expense
github: expense
---

Simple command line tool to manage daily expenses.

### Usage

To add an expense of amount 500:

```
$ x -a 500 "some test expense"
```

To add an expense for some previous date, say 3rd of the current month:

```
$ x -d 3 -a 500 "some test expense"
```

To add an expense for a given date such as 3rd May 2016:

```
$ x -d 3 -m 5 -y 2016 -a 500 "some test expense"
```

To view the total for the current month:

```
$ x -t
```

To view the total for a previous month

```
$ x -m 3 -t
```

To sort all expenses in store, chronologically:

```
$ x -s
```

### License

The library is released under the terms of **Apache Public License Version 2**.
