---
title: Trim down HTML content to desired text length
date: 11 Jul 2012
tags: 
- coding-techniques
- java
alias:
- /tech/trim-down-html-content-to-desired-text.html
- /2012/07/trim-down-html-content-to-desired-text.html
---

Problem
-------
Given some HTML code, trim it down into valid HTML code that contains text of desired length.

For example:

```java
String s1 = "Text with <b>bold</b>, <i>italic</i> phrases.";
String s2 = trimHTML(s1, 12);
System.out.println(s2);
```

should return

```html
Text with <b>bo</b><br>
```

Solution
--------
For a project of mine, I had to use such a functionality. A quick google did not result 
in any existing function, and thus I ended up coding the following:

```java
/**
 * Strip the given HTML content to specified text length. All opening
 * tags are then closed to make sure that the HTML is perfectly safe.
 * 
 * Tags such as <code>br</code> are skipped for closing.
 * 
 * @param content the HTML content that you want to trim down
 * @param length the desired length of the text field
 * @return the HTML code that contains text trimmed down to said length
 */
public static String trimHTML(String content, int length) {
 int currentIndex = 0;
 int chosenTextLength = 0;
 String tag;
 Stack<string> tags = new Stack<string>();
 do {
  int index = content.indexOf('<', currentIndex);
  if(index > currentIndex) {
   chosenTextLength += (index - currentIndex - 1);
   currentIndex = index;
  }
   
  if(chosenTextLength >= length) {
   break;
  }
   
  if(index != -1) {
   index = content.indexOf('>', index);
   tag = content.substring(currentIndex + 1, index);
   if(!tag.startsWith("/")) {
    if(tag.endsWith("/")) {
     tag = tag.substring(0, tag.length() - 1);
    }
     
    tags.push(tag.trim());
   } else {
    tag = tag.substring(1);
    do {
     if(tags.size() == 0) {
      break;
     }
      
     String pop = tags.pop();
     if(pop.equalsIgnoreCase(tag)) {
      break;
     }
    } while(true);
   }
    
   currentIndex = index;
  }
   
  if(index == -1) {
   break;
  }
 } while(true);
  
 if(chosenTextLength > length) {
  int subtract = chosenTextLength - length;
  currentIndex = currentIndex - subtract;
 }
  
 if(tags.size() == 0) {
  return content.substring(0, currentIndex);
 }
  
 StringBuilder builder = new StringBuilder(content.substring(0, currentIndex));
 int size = tags.size();
 for(int index = 0; index < size; index++) {
  tag = tags.pop();
   
  if(!"br".equalsIgnoreCase(tag)) {
   builder.append("<!--");
   builder.append(tag);
   builder.append('-->');
  }
 }
  
 return builder.toString();
}
</string></string>
```

The code is also available under the <a href="http://www.sangupta.com/projects/jerry">Jerry</a> project. You 
may browse the latest edition of this utility function in the <a href="https://github.com/sangupta/jerry">GitHub 
repository</a> in <a href="https://github.com/sangupta/jerry/blob/master/src/main/java/com/sangupta/jerry/util/HtmlUtils.java">HtmlUtils.java</a> file.

Hope this helps.