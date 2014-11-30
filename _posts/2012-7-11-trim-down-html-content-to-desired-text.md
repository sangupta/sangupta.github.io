---
layout: default
title: Trim down HTML content to desired text length
permalink: /2012/07/trim-down-html-content-to-desired-text.html
redirect_from: "/2012/07/trim-down-html-content-to-desired-text.html"
date: Wed Jul 11 13:18:00 IST 2012
sharingURL: http://blog.sangupta.com/2012/07/trim-down-html-content-to-desired-text.html
tags: coding-techniques java
---
<tt>Problem:</tt> Given some HTML code, trim it down into valid HTML code that contains text of desired length.
<br>
<br>For example:
<br>
<pre class="brush: java">String s1 = "Text with <b>bold</b>, <i>italic</i> phrases.";<br>String s2 = trimHTML(s1, 12);<br>System.out.println(s2);<br></pre>should return
<br>
<pre class="brush: java">Text with <b>bo</b><br></pre>
<br>
<tt>Solution:</tt> For a project of mine, I had to use such a functionality. A quick google did not result in any existing function, and thus I ended up coding the following:
<br>
<br>
<pre class="brush: java">/**<br> * Strip the given HTML content to specified text length. All opening<br> * tags are then closed to make sure that the HTML is perfectly safe.<br> * <br> * Tags such as <code>br</code> are skipped for closing.<br> * <br> * @param content the HTML content that you want to trim down<br> * @param length the desired length of the text field<br> * @return the HTML code that contains text trimmed down to said length<br> */<br>public static String trimHTML(String content, int length) {<br> int currentIndex = 0;<br> int chosenTextLength = 0;<br> String tag;<br> Stack
    <string>
         tags = new Stack
        <string>
            ();
            <br> do {
            <br> int index = content.indexOf('&lt;', currentIndex);
            <br> if(index &gt; currentIndex) {
            <br> chosenTextLength += (index - currentIndex - 1);
            <br> currentIndex = index;
            <br> }
            <br> 
            <br> if(chosenTextLength &gt;= length) {
            <br> break;
            <br> }
            <br> 
            <br> if(index != -1) {
            <br> index = content.indexOf('&gt;', index);
            <br> tag = content.substring(currentIndex + 1, index);
            <br> if(!tag.startsWith("/")) {
            <br> if(tag.endsWith("/")) {
            <br> tag = tag.substring(0, tag.length() - 1);
            <br> }
            <br> 
            <br> tags.push(tag.trim());
            <br> } else {
            <br> tag = tag.substring(1);
            <br> do {
            <br> if(tags.size() == 0) {
            <br> break;
            <br> }
            <br> 
            <br> String pop = tags.pop();
            <br> if(pop.equalsIgnoreCase(tag)) {
            <br> break;
            <br> }
            <br> } while(true);
            <br> }
            <br> 
            <br> currentIndex = index;
            <br> }
            <br> 
            <br> if(index == -1) {
            <br> break;
            <br> }
            <br> } while(true);
            <br> 
            <br> if(chosenTextLength &gt; length) {
            <br> int subtract = chosenTextLength - length;
            <br> currentIndex = currentIndex - subtract;
            <br> }
            <br> 
            <br> if(tags.size() == 0) {
            <br> return content.substring(0, currentIndex);
            <br> }
            <br> 
            <br> StringBuilder builder = new StringBuilder(content.substring(0, currentIndex));
            <br> int size = tags.size();
            <br> for(int index = 0; index &lt; size; index++) {
            <br> tag = tags.pop();
            <br> 
            <br> if(!"br".equalsIgnoreCase(tag)) {
            <br> builder.append("
            <!--");<br /--> builder.append(tag);
            <br> builder.append('&gt;');
            <br> }
            <br> }
            <br> 
            <br> return builder.toString();
            <br>}
            <br>
        </string>
    </string></pre>
<br>
<br>The code is also available under the 
<a href="http://www.sangupta.com/projects/jerry">Jerry</a> project. You may browse the latest edition of this utility function in the 
<a href="https://github.com/sangupta/jerry">GitHub repository</a> in 
<a href="https://github.com/sangupta/jerry/blob/master/src/main/java/com/sangupta/jerry/util/HtmlUtils.java">HtmlUtils.java</a> file.
