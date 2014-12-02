---
layout: post
title: Immutable Classes
permalink: /tech/immutable-classes.html
redirect_from: "/2007/10/immutable-classes.html"
date: Fri Oct 26 10:15:00 IST 2007
sharingURL: http://blog.sangupta.com/2007/10/immutable-classes.html
tags: coding-techniques java
---

In the past couple of months, I had a lot of discussion with people over immutable classes. From novice to experts, from beginners to leads, they were all. You utter the term 
<span style="font-weight: bold;">Immutable Classes</span> in front of any Java/.NET professional and the immediate response would be 
<span style="font-weight: bold;">String class</span> showing his command over the subject. But is that the only thing that relates to 
<span style="font-style: italic;">Immutability</span>. I guess there is more. If we talk of Java only, there are so many other classes from the JDK itself, which exhibit this behavior. Surprised - Don't be! All primitive wrapper classes such as 
<span style="font-style: italic;">Integer, Double, Float, Boolean, Short, Byte</span> etc. are immutable objects.
<br>
<br>OK - lots of talk on immutability, lets define this first. As per 
<a href="http://www.pcmag.com/encyclopedia_term/0,2542,t=immutable+class&amp;i=44820,00.asp">PC Magazine</a>, it is a class in which none of the elements in the instances of the class can be changed. What would we do of an object if none of its elements can be changed. Lets refine our purview. Immutability refers to the object and not to the class. It refers to the state where an object once instantiated cannot be changed. Any operation which might alter the initialized state of the object, will return back a new object with the altered properties. Lets exemplify,
<br>
<pre class="brush: java">public class Test {<br>public static void main(String args[]) {<br>String string = "Immutability";<br>string = string + " in a class";<br>}<br>}<br></pre>In the above example as soon as we change the object 
<span style="font-weight: bold;">string<span style="font-style: italic;"></span></span> in line 4, a new object with value "Immutability in a class" is created in the string pool, and 
<span style="font-weight: bold;">string<span style="font-style: italic;"></span></span> is assigned a reference to this new string in the pool. The original string "Immutability" remains in the string pool.
<br>
<br>Now, the objective of the discussion. How to achieve immutable behavior in our own custom classes. The many suggestions I have received over time are,
<br>
<ul>
    <li>Make the class as final</li>
    <li>Make all attributes as final</li>
    <li>Do not provide any mutator (setter) methods</li>
</ul>To some extent the above mentioned solutions are successful. But there is a lot more to immutability than these. Let's take them one by one.
<br>
<br>First, lets define our scope: We would create a class say, Person, objects of which would exhibit immutability. The class in general is,
<br>
<pre class="brush: java">public class Person {<br>public String name;<br>public Date dob;<br>}<br></pre>The first step to best coding practices, make the attributes as protected/private and provide accessor methods.
<br>
<pre class="brush: java">public class Person {<br>protected String name;<br>protected Date dob;<br><br>public String getName() {<br>return this.name;<br>}<br><br>public void setName(String name) {<br>this.name = name;<br>}<br><br>public Date getDob() {<br>return this.dob;<br>}<br><br>public void setDob(Date dob) {<br>this.dob = dob;<br>}<br>}<br></pre>We now have some sensible class, to say a domain object (value object) which are very common in the OOP world. But, the provision of mutator methods: setters, will defeat the purpose. So we would remove them and provide a constructor to initialize the object. Remember, we need to put a private no-argument constructor to prevent default initialization.
<br>
<pre class="brush: java">public class Person {<br>protected String name;<br>protected Date dob;<br><br>private Person() {<br>}<br><br>private Person(String name, Date dob) {<br>this.name = name;<br>this.dob = dob;<br>}<br><br>public String getName() {<br>return this.name;<br>}<br><br>public Date getDob() {<br>return this.dob;<br>}<br>}<br></pre>That looks better. Now once the object is initialized via the constructor, we cannot change its attributes. At this point, what if the class is extended by a sub-class which in turn provides mutators, say as,
<br>
<pre class="brush: java">public class NewPerson extends Person {<br>public void setName(String name) {<br>this.name = name;<br>}<br><br>public void setDob(Date dob) {<br>this.dob = dob;<br>}<br></pre>Hmmm... so either we need to make our attributes as private, or we need to make them final. In our case making them final will not serve a purpose, for it would induce overheads at runtime.
<br>
<pre class="brush: java">public class Person {<br>private String name;<br>private Date dob;<br><br>private Person() {<br>}<br><br>private Person(String name, Date dob) {<br>this.name = name;<br>this.dob = dob;<br>}<br><br>public String getName() {<br>return this.name;<br>}<br><br>public Date getDob() {<br>return this.dob;<br>}<br>}<br></pre>Again, this is not a fool-proof approach. Ponder over this,
<br>
<pre class="brush: java">public class Test {<br>public static void main(String args[]) {<br>Date date = new Date();<br>Person p = new Person("ABC", date);<br>System.out.println(p.getDob());<br>date.setMonth( date.getMonth() + 1);<br>System.out.println(p.getDob());<br>}<br>}<br></pre>The output would be somewhat like,
<br>
<pre>Fri Oct 12 22:11:36 GMT+05:30 2007<br>Fri Oct 12 22:11:37 GMT+05:30 2007<br></pre>This is what composite object does to a class. No worries, we can get away with this too by modifying our constructor,
<br>
<pre class="brush: java">public class Person {<br>private String name;<br>private Date dob;<br><br>private Person() {<br>}<br><br>private Person(String name, Date dob) {<br>this.name = name;<br>this.dob = new Date(dob.getTime());<br>}<br><br>public String getName() {<br>return this.name;<br>}<br><br>public Date getDob() {<br>return this.dob;<br>}<br>}<br></pre>Let's now consider another aspect where the above class may fail.
<br>
<pre class="brush: java">public class Test {<br>public static void main(String args[]) {<br>Date date = new Date();<br>Person p = new Person("ABC", date);<br>Date myDate = p.getDob();<br>System.out.println(p.getDob());<br>myDate.setMonth( myDate.getMonth() + 1);<br>System.out.println(p.getDob());<br>}<br>}<br></pre>Output:
<br>
<pre>Fri Oct 12 22:23:11 GMT+05:30 2007<br>Fri Oct 12 22:23:12 GMT+05:30 2007<br></pre>Again, a hole in our immutability. We need to prevent any code from getting a direct reference of our embedded object. Solution: modify the getter method to clone the object while returning.
<br>
<pre class="brush: java">public class Person {<br>private String name;<br>private Date dob;<br><br>private Person() {<br>}<br><br>private Person(String name, Date dob) {<br>this.name = name;<br>this.dob = new Date(dob.getTime());<br>}<br><br>public String getName() {<br>return this.name;<br>}<br><br>public Date getDob() {<br>return new Date(this.dob.getTime());<br>}<br>}<br></pre>This way DOB is cloned both at the time of setting and at the time of return, preventing from accidental modification, and providing 
<span style="font-style: italic;">immutability</span>. In case of any other object, which itself might be a complicated composite object, we need to deep clone the object, both way in and way out. This is the only way to achieve immutability.
<br>
<br>Again a class may override the getter methods and provide direct access. To get away with this, we need to make sure that either the class is final or all the methods defined are final, alongwith attributes being private or final.
<br>
<br>What if there are methods that access the internal objects in some way or the other. What I mean to say is, lets say we have another attribute and a method in the class,
<br>
<pre class="brush: java">byte[] description;<br><br>// some code that initialized this byte array<br><br>public void write(OutputStream out) {<br>out.write(description);<br>}<br></pre>It may seem that there is nothing wrong with this code piece in the context of immutability. But, anonymous classes play the devil here,
<br>
<pre class="brush: java">Person.write(new OutputStream() {<br>public void write(byte[] description) {<br>// do something with this byte array<br>// say modify the description to something else<br>}<br>} );<br></pre>All in all, we need to take care of the following rules while designing a class for immutability.
<br>
<ul>
    <li>Make all attributes/fields/variables as private. Another choice could be to make them final.</li>
    <li>Ensure that either the class is final or all the methods you provide are final.</li>
    <li>All non-primitive objects and other composed objects should be <span style="font-style: italic;">deep cloned</span> way in and way out.</li>
    <li>All methods that use any internal object should <span style="font-style: italic;">deep clone</span> the attribute and then use it.</li>
</ul>
<span style="font-style: italic;">Update: 26 Oct 2007</span>
<br>Another interesting article I came across on Immutability. Read it 
<a href="http://www.javalobby.org/articles/immutable/index.jsp" title="Mutable/Immutable Patterns">here</a>.
