---
layout: project
title: HTML Gen
github: html-gen
---

Strongly typed HTML generation library for Java.

`html-gen` helps you create HTML code snippets using Java objects. It is useful in situations where
using templating engines may be an overkill. Support all HTML5 elements as listed by Mozilla
Developer Network at https://developer.mozilla.org/en/docs/Web/Guide/HTML/HTML5/HTML5_element_list

`html-gen` is an extremely lightweight and independent library - no external dependencies. `JDK 1.6+ compatible`.

### Usage

Generating a complete HTML file:

```java
// create new HTML object
Html html = new Html().docType(DocType.HTML5);

// write values to head
html.head()
	.title("Sample title page").meta("charset", "utf8")
	.meta("charset", "utf8")
	.meta("another meta tag", "some value");

// generate the body
html.body().div().addClass("bold").text("Sample Heading");

// Build HTML
System.out.println(html.asString());
```

This will generate the HTML output as

```html
```

#### Generating a table

```java
Html html = new Html();
html.body().table()
			.thead()
				.tr().th("head1").th("head2").th("head3")
			.parentTable().tbody()
				.tr().td("1").td("2").td("3")
				.newRow().td("a").td("b").td("c");
				
System.out.println(html.asString());
```
generating HTML code as:
```html
<html>
  <head>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>
            head1
          </th>
          <th>
            head2
          </th>
          <th>
            head3
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            1
          </td>
          <td>
            2
          </td>
          <td>
            3
          </td>
        </tr>
        <tr>
          <td>
            a
          </td>
          <td>
            b
          </td>
          <td>
            c
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

### License

The library is released under the terms of **Apache Public License Version 2**.
