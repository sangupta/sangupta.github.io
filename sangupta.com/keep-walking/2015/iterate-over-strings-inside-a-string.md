---
title: Iterating over Strings inside a String object
date: 27 Jul 2015
tags: 
- java,
- open-source,
- jerry
alias:
- /tech/iterate-over-strings-inside-a-string
---

When reading file contents, or working with REST requests, many a times we want to read a `String` object line-by-line, that is,
read lines within a single `String` object. `Java` does not offer a simple solution to the same - either you convert the `String`
object to a `byte[]` and then use `ByteArrayInputStream` or use a `StringReader` and then push this into another line-by-line reader.

For the same, I wrote a simple utility class, <a href="https://github.com/sangupta/jerry-core/blob/master/src/main/java/com/sangupta/jerry/io/StringLineIterator.java">StringLineIterator</a>
(available in <a href="https://github.com/sangupta/jerry-core">jerry-core</a> project) simplifying reading of
lines to the following code snippet:

```java
String contents = "..."; // some contents that contains new-lines, and form-feed characters

StringLineIterator iterator = new StringLineIterator(contents);
while(iterator.hasNext()) {
  String line = iterator.next();

  // do something with this extracted line
}
```

This helps us reading sub-string lines from `contents` and reduces boiler-plate code. Note that this implementation would use
extra memory to the extent of each line, as it creates a new `String` object for each line that is read via the `iterator`.

Hope this helps.