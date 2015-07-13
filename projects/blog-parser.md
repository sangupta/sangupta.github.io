---
layout: default
title: Blog Parser
github: blog-parser
maven: true
---

**blog-parser** is a Java library to parse blog exports into strongly-typed data object model. This 
is particularly useful when you want to allow your application to import data from existing blogs.

### Usage

Initialize the right parser for your blog export and pass it the file contents of the export, like

```java
File file = new File("blogger-export.xml");
String xml = org.apache.commons.io.FileUtils.readFileToString(file);
BloggerParser parser = new BloggerParser();
Blog blog = parser.parse(xml);
```

or, you may use the utility class `BlogParser` as:

```java
File file = new File("wordpress-export.xml");
String xml = org.apache.commons.io.FileUtils.readFileToString(file);
Blog blog = BlogParser.parse(xml, BlogType.Wordpress);
```

and you are done! The `Blog` object represents the parsed entities.

### License

The library is released under the terms of **Apache Public License Version 2**.
