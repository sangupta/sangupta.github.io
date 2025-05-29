---
title: Cyclomatic Complexity & JavaNCSS
date: 27 Feb 2007
tags: 
- coding-techniques
- java
alias:
- /tech/cyclomatic-complexity-javancss.html
- /2007/02/cyclomatic-complexity-javancss.html
---

In one of my previous posts, I had discussed about how Cyclomatic Complexity can 
help developers/programmers find out the health and wellness of their code. It also 
helps the test writers by guiding them with an ordinal numbers with the number of 
test cases needed to test each logical flow.

<!-- break here -->

I then started looking for something that could have given my CC details for each 
class/method in a Java Project. As "open-source" is the buzz word today, my search 
was limited to "open-source" project. JavaNCSS computes the CC metrics for a given 
Java project for every class, for every method and that too blazingly fast.

The reported metrics comprise of the number of classes and methods a package has, 
the number of Javadocs present, its CC, the average metrics per method, per class 
etc. The beauty of the JavaNCSS is the capability to set the threshold limits for 
every parameter it analyses. If the threshold limit is exceeded, JavaNCSS can raise 
a warning message.

Another beauty is its easy integration with ANT, the build tool for almost all Java 
projects. A GUI is also available for those who are more used to using the mouse 
than the keyboard.

Catch <a href="http://www.kclee.de/clemens/java/javancss/">JavaNCSS here</a>, and 
its <a href="http://sourceforge.net/projects/javancss2ant/">ANT task here</a>.