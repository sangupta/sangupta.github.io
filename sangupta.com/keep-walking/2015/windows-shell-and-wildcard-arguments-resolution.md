---
title: Windows Shell and Wildcard Command-line argument resolution
date: 24 Mar 2015
tags: 
- java,
- coding-techniques
alias:
- /tech/windows-shell-wildcard-argument-resolution.html
---

`Problem:` `Windows Shell` parses any wildcard path arguments that you supply over the command
line, before passing the arguments to the actual program that has been invoked.

Now let's see why this is a problem. A simple tool when invoked from the `Windows Shell`
command line behaved very differently from when the same arguments were provided either via
Java debugger or an `OS X` environment. The command line being:

```sh
$ java -jar clitools.jar findfile -r \Users\sangupta\*.jpg
```

When this command was invoked via Windows Shell, I could see only 1 result coming. When invoked
via `Eclipse` or `OS X` shell, I could see multiple results - infact more than 1000 results.

I added a debug point and on going over could see that the logic was fine. It was recursively
fetching all files from the directory and matching against the wildcard of `*.jpg`. Then I added
some log statements to debug the incoming parameters. This was when I realized the major difference
between `Windows Shell` and others. `Windows Shell` was interpreting the path on its own, and passing
the following arguments to Java:

```sh
[ "-r", "\Users\sangupta\sangupta.jpg", "\Users\sangupta\sangupta2.jpg" ]
```

This made it clear. My code when trying to retrieve a list of files could match only 1 file
because the argument supplied was an exact match.

Now if we take a look, the meaning/result of the command line tool was completely changed due to
the behavior of pre-parsing the command line arguments by `Windows Shell`. Had there been a way
to instruct Windows not to do the same, would have been great. But there is none. The only
workaround to this is to enclose the params in double-quotes, `"`.

```sh
$ java -jar clitools.jar findfile -r "\Users\sangupta\*.jpg"
```

This makes it difficult to achieve a parity with other Windows built-in command-line tools, that
actually take similar parameters and yet can work on the wildcard arguments.

On a relatively different note, `clitools` is my own collection of common useful command line tools.