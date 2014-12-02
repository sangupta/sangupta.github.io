---
layout: post
title: Server-side Password Storage
permalink: /tech/in-memory-password-storage.html
redirect_from: "/2007/05/in-memory-password-storage.html"
date: Wed May 23 15:40:00 IST 2007
sharingURL: http://blog.sangupta.com/2007/05/in-memory-password-storage.html
tags: coding-techniques
---

Today, almost all websites and products use some sort of Authentication mechanism to validate the users. Every application verifies the users credentials and allows him access to secured content. Keeping secured content, secure from prying eyes has always been a challenge. Lots of methodologies to encrypt sensitive information, and their subsequent storage and retrieval have been developed. These have rendered unauthorized access attacks to a minimum.
<br>
<br>But, the serious challenge that we still face is the 
<span style="font-weight: bold;">Impersonation</span>. All the sensitive information is secured just behind a small 8-14 character password, the typical length of a password the user keeps. Login names can quite easily be seen being typed in. Now the only barrier holding that outside world from our critical information is this PASSWORD.
<br>
<br>The password is again encrypted and stored by the application to prevent unauthorised access. But there is one loop-hole that still remains: the client side and the server's memory. Key-loggers, password snatchers, etc. have made life difficult for an average user to prevent his login credentials from being stolen. But there is little, programmers can do about the client side. They can use SSL for all information transmission, and encrypt the information client-side before transmitting.
<br>
<br>But the server side protection of users valuable information is the developers task. Unknowingly, most of us leave an area that can be abused and exploited to steal a users credentials. Let's see how.
<br>
<br>A developer needing to store a password would generally declare a string and assign it to the password, as,
<br>
<br>
<pre class="brush: java">String password = request.getParameter("password");</pre>
<br>We then proceed to encrypt it, to either store it or compare for retrieval,
<br>
<br>
<pre class="brush: java">password = getEncryptedPassword(password);</pre>
<br>Nothng wrong with this approach, but here lies a deep rooted problem, an exploit which can reveal the actual user's password.
<br>
<br>As we all know that strings are immutable objects in any managed programming language, the actual password occupies a memory address as an immutable object. In the second step, after encoding the variable 
<span style="font-style: italic;">password </span>points to the new String object that would be created in the memory. But, this leaves the first password string in the memory, and left only at the mercy of the Garbage Collector.
<br>
<br>Say, if due to some reason the original String object, is not garbage collected, it would remain in the virtual machine, and as with any object it can be reclaimed once. Some plugins (like profilers) do connect to the VMs to analyze their memory space and hence may reveal this string.
<br>
<br>To avoid such situations, for any critical data that we indeed want to destroy after immediate usage, we must use a character array to store it.
<br>
<br>
<pre class="brush: java">char[] password = { 'p' , 'a' , 's' , 's' };</pre>
<br>Being an array of a primitive data type, it would ensure that, as soon as the password array goes out of scope, its contents would be destroyed. Also, it would ensure that any modification to this original object would indeed modify this very object, and not create a clone of it. Hence, there would be no way to look at this objects contents, once it is used and destroyed.
<br>
<br>Another way of destroying such objects early, has been quoted over time and again: 
<span style="font-weight: bold; font-style: italic;">Usage of dummy scope blocks. </span>It requires that we surround our code using such information with block definition. This is a very good method of making object available for garbage collection in between long methods, for example,
<br>
<br>
<pre class="brush: java">public static void main(String[] args) {<br>//some code...<br>{<br>//dummy block starts<br>//passwords are handled<br>}<br>//the dummy block is closed to delete the information<br>//some code<br>}</pre>
<br>The above two stated techniques may help remove the possibility of server-side exploits to reveal user credentials. The technique can be employed over all information fields that are sensitive to business, say, the credit card number, expiry date, bank account number, passwords, date of birth, personal email address etc.
