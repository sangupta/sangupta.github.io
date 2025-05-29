---
title: iChat 5 and Google Talk Account
date: 27 Apr 2011
tags: 
- workarounds
alias:
- /tech/ichat-5-and-google-talk-account.html
- /2011/04/ichat-5-and-google-talk-account.html
---

Today, I was trying to setup Apple's iChat application for connecting with my Google Talk 
account. I have been using a Mac for over two years now, but my primary machine was always 
a Windows one. For some reason, I had to setup the Mac running Mac OS X Snow Leopard as 
the active machine.

<!-- break here -->

As with every geek, setting up IM, Mail, Chrome etc. take a precedence than setting up the 
IDE. So here I was trying to connect iChat 5 with my Google Account. At first it seemed 
so simple, you start iChat, it gives you an option to setup the chat account, choose 
Google Account, enter your credentials and you are done. Voilla. But life is not so 
simple. After a couple of minutes I got the following error,

>    "iChat could not connect to host talk.google.com"

To anyone geeky, this sounds like a network issue and without Googling I started to troubleshoot 
my network settings, firewall access, and network connectivity. After I had spend many minutes 
wasting, I realized it was nothing to do with connectivity. It was something else. I went 
ahead and read almost all forums that summarize the issue. They vary from firewall issues 
to router issues.

But none of them seemed to be the case, as on the same wire my Windows machine could connect. 
Running a Windows VM on my Mac machine worked as well, so the issue was definitely not with 
the firewall settings as well. Lastly I found 
<a href="https://discussions.apple.com/message/11235498?messageID=11235498">this post on 
Apple Forums</a>, of a user who had a similar issue. The trick was to use the host name as 
`gmail.com` and port as `443`.

Not sure why, but it worked and here I am blogging on the same so that I can easily recall 
the issue a few days later if I hit the same road block again. Yes, I am a geek but I still 
can't recall solutions to errors a couple of days later, and I am proud of it.

If this helps you, all credit goes to 
<a href="https://discussions.apple.com/people/Ralph%20Johns%20(UK)">Ralph Johns</a> for helping souls like me.