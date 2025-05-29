---
title: NaN
date: 24 Oct 2007
tags: 
- interview-questions
- java
alias:
- /tech/nan.html
- /2007/10/nan.html
---

I have been lately involved a lot with the recruitment process for my current employer. It has in fact provided me a 
good platform to learn and hone my skills to the maximum. Anyways, that is not a point of discussion for now.

<!-- break here -->

In my role as an interviewer, I come across many candidates who, when asked, would rate them very highly on Core Java 
skills. It is not as if a person cannot be very strong with core computing skills, but it is understanding of basic 
concepts of computing. Take this: One of my favorite startup questions in such a scenario is,

What would be the result of compilation/execution of the following code snippet?

```java
public class NaN {
	public static void main(String[] args) {
		double d = 2.0 / 0.0;
		System.out.println(d);
	}
}
```
What's the answer: The code will not compile or will it throw a DivideByZero error? Both are wrong. The code compiles 
fine and the output is,

```
Infinity
```

Let's check another code snippet,

```java
public class NaN {
	public static void main(String[] args) {
		double d = 0.0 / 0.0;
		System.out.println(d);
	}
}
```

The output in this case is,

```
NaN
```

Surprising! Pick up any JAVA book and the first thing they explain is the concept of NaN, yet, still most of us don't 
remember it after a few months.

NaN as defined by <a href="http://en.wikipedia.org/wiki/NaN">Wikipedia</a>, is a value or symbol that is usually produced 
as the result of an operation on invalid input operands, especially in floating-point calculations.

Time to revise the concepts :)