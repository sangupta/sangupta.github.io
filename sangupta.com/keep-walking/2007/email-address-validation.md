---
title: Email Address Validation
date: 11 Oct 2007
tags: 
- coding-techniques
alias:
- /tech/email-address-validation.html
- /2007/10/email-address-validation.html
---

Last night, while developing code for 
<a href="http://www.matrika-india.org" title="MATRIKA India">MATRIKA</a>, I came across a 
situation where-in I had to validate an email-address. I wanted a way to stop people putting 
`abc@abc.com` like I had been doing so, throughout my interactions with the Web. 

<!-- break here -->

The big question was: how to judge whether an entered text was really a valid email address. A 
solution to the above problem is in using a verification email, but it is not the best practice. 
Sometimes, a legitimate user has to go through the process of getting a validation email just 
because he misspelt his email address. Another approach is to ask a user to enter his email 
address twice. Again, that is a bit of inconvenience to a normal user. We are her to just seek 
information for future correspondence and better interaction with the user.

So how could I possibly find out the validity of an email address. Google is to rescue again, 
and with a few small searches I am guided to <a href="http://www.faqs.org/rfcs/rfc2822.html">
RFC2822 - Internet Message Format</a>. The specifications are more than 50 pages long, and I am 
not the kind to read them again. So I took Google again. Digging deeper and deeper I came across this 
<a href="http://mail-archives.apache.org/mod_mbox/james-mailet-api/200708.mbox/%3C20070814143449.7F72E1A981A@eris.apache.org%3E">post </a>
which has a class to validate the email address.

The official specifications can be summarized to a simpler regular expression like

```java
(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

Now, thats a really long expression. It validates both the parts of an email address, the one before '@' sign and the one after that. This expression defines all the possible valid email addresses. So an address like sandeep@matrika.org.india would be considered valid, but in practicality, it is not. For there is no top-level domain by name 'india'.

For this, I found another expression,
```java
[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])??
```

This expression is able to parse 99.99% of email addresses, but in a few cases it might fail. 
Actually, there are a few obsolete sections in the RFC 2822 specifications, and hence, have been 
removed from the above expression. Sounds good, but chances of failure are there.

Another expression worth noting here down is,

```java
[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|biz|info|name|aero|biz|info|jobs|museum)\b
```

This expression explicitly defines the allowable top domain names that can be used in the 
email address. This is constraining the user to enter an email address from a particular 
top-level domain.

In practicality, it is really tough to determine the validity of an email address. Registration 
has become a must-have feature of every website, and to even read something many a times you have 
to register. As a result users like me are getting intelligent in making up non-sense email 
addresses (like another way I learned today to add .india at the end). 

There exists no single regular expression that can validate an email address, and hence we need 
to validate an email address as per our usage and then proceed to verify using a verification email too. 

_Verification email - an inherent burden of validating an email address._