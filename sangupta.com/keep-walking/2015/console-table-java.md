---
title: Tabular data in a Java Console application
date: 09 Sep 2015
tags: 
- java,
- open-source,
- jerry
alias:
- /tech/console-table-java.md
---

Displaying tabular data is a very common use-case, but working a console application and displaying the
same becomes a tedious task. Why? First, you have to take care of formatting the entire data. Second, you
need to make sure that the data does not spill-over the boundary of the cell. Third, it takes time and
precision for such a code, and spending time on this boiler-plate code is total-waste.

Thus, I created <a href="https://github.com/sangupta/jerry-core/blob/master/src/main/java/com/sangupta/jerry/print/ConsoleTable.java">ConsoleTable</a>, 
a new helper class in <a href="https://github.com/sangupta/jerry-core">Jerry-Core</a> framework. This class 
is pretty useful to create such console outputs. 

### Features

* Supports automatic sizing of columns in full-width layout
* Supports multi-line layout where column text is broken at word boundaries to spill over multi-line
* Support export to CSV, XML and JSON formats

### Examples

For example, to create a layout like:

```text
 | ------------ | --------- | --------------- | 
 | Stock Ticker | Company   | Any one product | 
 | ------------ | --------- | --------------- | 
 | APPL         | Apple     | iPhone          | 
 | GOOG         | Google    | GMail           | 
 | MSFT         | Microsoft | Windows         | 
 | ------------ | --------- | --------------- | 
```

you just need to code something like:

```java
ConsoleTable table = new ConsoleTable();

table.addHeaderRow("Stock Ticker", "Company", "Any one product");

table.addRow("APPL", "Apple", "iPhone");
table.addRow("GOOG", "Google", "GMail");
table.addRow("MSFT", "Microsoft", "Windows");

table.write(System.out);
```

The code itself takes care of proper alignment and spacing of each element. This is not the end.

The `ConsoleTable` also supports multi-line output by breaking the sentence at word boundaries to make sure
that the text fits in the cell.

For example:

```java
ConsoleTable table = new ConsoleTable(ConsoleTableLayout.MULTI_LINE);
		
table.addHeaderRow("Stock Ticker", "Company", "Products");
table.addRow("APPL", "Apple", "iPhone, iPad, iPod, Mac, OSX, Mac Pro");
table.addRow("GOOG", "Google", "GMail, Blogger, AdSense, Analytics, Search");
table.addRow("MSFT", "Microsoft", "Windows, Office, Remote Desktop");

table.setColumnSize(2, 20);

table.write(System.out);
```

produces output as:

```text
 | ------------ | --------- | -------------------- | 
 | Stock Ticker | Company   | Products             | 
 | ------------ | --------- | -------------------- | 
 | APPL         | Apple     | iPhone, iPad, iPod,  | 
 |              |           | Mac, OSX, Mac Pro    | 
 | GOOG         | Google    | GMail, Blogger,      | 
 |              |           | AdSense,             | 
 |              |           | Analytics, Search    | 
 | MSFT         | Microsoft | Windows, Office,     | 
 |              |           | Remote Desktop       | 
 | ------------ | --------- | -------------------- | 
```

The table also supports export to various formats:

```java
Console table = getMyTable(); // some table data

// create a CSV
ConsoleTableWriter.writeCsv(table, System.out);

// create JSON output
ConsoleTableWriter.writeJson(table, System.out);

// create an XML
// wrap everthing inside a <data> ... </data> tag
// each row be wrappped inside a <row> ... </row> tag
ConsoleTableWriter.writeXml(table, System.out, "data", "row"); 
```

Hope this helps.