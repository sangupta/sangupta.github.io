---
title: Immutable Classes
date: 26 Oct 2007
tags: 
- coding-techniques
- java
alias:
- /tech/immutable-classes.html
- /2007/10/immutable-classes.html
---

In the past couple of months, I had a lot of discussion with people over immutable 
classes. From novice to experts, from beginners to leads, they were all. You utter the term 
`Immutable Classes` in front of any Java/.NET professional and the immediate response would be 
`String class` showing his command over the subject. But is that the only thing that relates to 
`Immutability`. I guess there is more. If we talk of Java only, there are so many other 
classes from the JDK itself, which exhibit this behavior. Surprised - Don't be! All primitive 
wrapper classes such as `Integer, Double, Float, Boolean, Short, Byte` etc. are immutable objects.

<!-- break here -->

OK - lots of talk on immutability, lets define this first. As per 
<a href="http://www.pcmag.com/encyclopedia_term/0,2542,t=immutable+class&amp;i=44820,00.asp">PC 
Magazine</a>, it is a class in which none of the elements in the instances of the class can be 
changed. What would we do of an object if none of its elements can be changed. Lets refine our 
purview. Immutability refers to the object and not to the class. It refers to the state where 
an object once instantiated cannot be changed. Any operation which might alter the initialized 
state of the object, will return back a new object with the altered properties. Lets exemplify,

```java
public class Test {

	public static void main(String args[]) {
		String string = "Immutability";
		string = string + " in a class"
	}

}
```

In the above example as soon as we change the object `string` in `line 4`, a new object with value 
"Immutability in a class" is created in the string pool, and `string` is assigned a reference to this 
new string in the pool. The original string "Immutability" remains in the string pool.

Now, the objective of the discussion. How to achieve immutable behavior in our own custom classes. The 
many suggestions I have received over time are,

* Make the class as final
* Make all attributes as final
* Do not provide any mutator (setter) methods


To some extent the above mentioned solutions are successful. But there is a lot more to immutability 
than these. Let's take them one by one.

First, lets define our scope: We would create a class say, Person, objects of which would exhibit 
immutability. The class in general is,

```java
public class Person {
	public String name;
	public Date dob;
}
```

The first step to best coding practices, make the attributes as protected/private and provide accessor methods.

```java
public class Person {
	protected String name;

	protected Date dob;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDob() {
		return this.dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}
```

We now have some sensible class, to say a domain object (value object) which are very 
common in the OOP world. But, the provision of mutator methods: setters, will defeat the 
purpose. So we would remove them and provide a constructor to initialize the object. Remember, 
we need to put a private no-argument constructor to prevent default initialization.

```java
public class Person {

	protected String name;

	protected Date dob;

	private Person() {
		// private - only we can create an instance
	}
	
	public Person(String name, Date dob) {
		this.name = name;
		this.dob = dob;
	}
	
	public String getName() {
		return this.name;
	}

	public Date getDob() {
		return this.dob;
	}
}
```

That looks better. Now once the object is initialized via the constructor, we cannot change 
its attributes. At this point, what if the class is extended by a sub-class which in turn 
provides mutators, say as,

```java
public class NewPerson extends Person {

	public void setName(String name) {
		this.name = name;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}
}
```

Hmmm... so either we need to make our attributes as private, or we need to make them final. In 
our case making them final will not serve a purpose, for it would induce overheads at runtime.

```
public class Person {
	
	private String name;

	private Date dob;

	private Person() {

	}

	private Person(String name, Date dob) {
		this.name = name;
		this.dob = dob;
	}

	public String getName() {
		return this.name;
	}

	public Date getDob() {
		return this.dob;
	}
}
```
Again, this is not a fool-proof approach. Ponder over this,

```java
public class Test {
	
	public static void main(String args[]) {
		Date date = new Date();
		Person p = new Person("ABC", date);
		System.out.println(p.getDob());

		date.setMonth( date.getMonth() + 1);
		System.out.println(p.getDob());
	}
}
```
The output would be somewhat like,

```
Fri Oct 12 22:11:36 GMT+05:30 2007
Fri Oct 12 22:11:37 GMT+05:30 2007
```

This is what composite object does to a class. No worries, we can get away with 
this too by modifying our constructor,

```java
public class Person {

	private String name;

	private Date dob;

	private Person() {

	}

	private Person(String name, Date dob) {
		this.name = name;
		this.dob = new Date(dob.getTime());
	}

	public String getName() {
		return this.name;
	}

	public Date getDob() {
		return this.dob;
	}
}
```

Let's now consider another aspect where the above class may fail.

```java
public class Test {
	
	public static void main(String args[]) {
		Date date = new Date();

		Person p = new Person("ABC", date);
		Date myDate = p.getDob();
		System.out.println(p.getDob());
		
		myDate.setMonth( myDate.getMonth() + 1);
		System.out.println(p.getDob());
	}
}
```

Output:

```
Fri Oct 12 22:23:11 GMT+05:30 2007
Fri Oct 12 22:23:12 GMT+05:30 2007
```
Again, a hole in our immutability. We need to prevent any code from getting a direct 
reference of our embedded object. Solution: modify the getter method to clone the 
object while returning.

```
public class Person {
	
	private String name;

	private Date dob;

	private Person() {
	}

	private Person(String name, Date dob) {
		this.name = name;
		this.dob = new Date(dob.getTime());
	}
	public String getName() {
		return this.name;
	}

	public Date getDob() {
		return new Date(this.dob.getTime());
	}
}
```

This way DOB is cloned both at the time of setting and at the time of return, preventing 
from accidental modification, and providing `immutability`. In case of any other object, 
which itself might be a complicated composite object, we need to deep clone the object, both 
way in and way out. This is the only way to achieve immutability.

Again a class may override the getter methods and provide direct access. To get away with 
this, we need to make sure that either the class is `final` or all the methods defined are 
`final`, alongwith attributes being `private` or `final`.

What if there are methods that access the internal objects in some way or the other. What 
I mean to say is, lets say we have another attribute and a method in the class,


```java
byte[] description;

// some code that initialized this byte array

public void write(OutputStream out) {
	out.write(description);
}
```

It may seem that there is nothing wrong with this code piece in the context of immutability. 
But, anonymous classes play the devil here,

```java
Person.write(new OutputStream() {
	
	public void write(byte[] description) {
	// do something with this byte array<

	// say modify the description to something else
	}
});
```

All in all, we need to take care of the following rules while designing a class for immutability.

* Make all attributes/fields/variables as private. Another choice could be to make them `final`
* Ensure that either the class is final or all the methods you provide are `final`
* All non-primitive objects and other composed objects should be `deep cloned` way in and way out
* All methods that use any internal object should `deep clone` the attribute and then use it


Update: 26 Oct 2007
-------------------

Another interesting article I came across on Immutability. Read it 
<a href="http://www.javalobby.org/articles/immutable/index.jsp" title="Mutable/Immutable Patterns">here</a>.