---
title: Introducing CodeFix
date: 27 Jan 2016
tags: 
- java,
- open-source
alias:
- /tech/introducing-codefix.html
---

Am happy to release the very first version of a command-line development tool that I had
been using for years for my own consumption: **CodeFix** - the tool helps perform some minor
code refactoring tasks via a command line interface such as adding/updating copyright headers,
removing trailing spaces in files, fixing file encoding, adding an empty line-ending to text
files and more...

Some quick and dirty examples on what could be achieved are:

```sh
# add/update copyright
$ java -jar codefix.jar addcopy -r -f COPYRIGHT.txt -p *.java c:\code

# update line endings
$ java -jar codefix.jar ending -r -p *.txt c:\docs

# remove trailing white spaces
$ java -jar codefix.jar rtrim -r -p *.java c:\code

# change file encodings
$ java -jar codefix.jar encoding -r -p *.txt -s ISO-8969 -t UTF-8 c:\textdocs
```

You may [download the binary](https://github.com/sangupta/codefix/releases/tag/codefix-1.0.0)
or may take a dive into the [source code](https://github.com/sangupta/codefix).

Hope this helps.