---
layout: post
title: Magical Behavior of Microsft Products
permalink: /tech/magical-behavior-of-microsft-products.html
redirect_from: "/2009/07/magical-behavior-of-microsft-products.html"
date: Thu Jul 23 09:55:00 IST 2009
sharingURL: http://blog.sangupta.com/2009/07/magical-behavior-of-microsft-products.html
tags: just-like-that
---

<div align="justify">
    Today morning I received one of those another forwarded mails telling me of all those crazy magical things that Microsoft products do, and which no one from Microsoft including Bill Gates (as claimed in the email) is able to explain. 
    <br>
    <br>Without wasting a minute let's take a look at the magic and the magic behind it ;)
    <br>
    <br>
    <b>Magic #1: </b>An Indian found that nobody can create a FOLDER anywhere on the Computer which can be named as "CON". This is something funny and inexplicable. At Microsoft the whole Team, couldn't answer why this happened! TRY IT NOW, IT WILL NOT CREATE A "CON" FOLDER
    <br>
    <b>Magic Behind: </b>First, why do every Indian has to proclaim that it was discovered by an Indian? Is it some sort of egoistic game we all are playing in this world?
    <br>
    <br>Leave it, anyways, the reason one cannot create a folder called CON is because CON is a special redirect for CONsole (meaning Monitor output, in general). You can use CON along with pipes to redirect the output streams to monitor, say in case it was going to a printer. Hence, the observed behavior. It is analogous to something like you won't use the variable *sin* in a trigonometric equation, or you can't use an *if* as a variable in a programming language.
    <br>
    <br>
    <br>
    <b>Magic #2: </b>For those of you using Windows, do the following:
    <br>1) Open an empty notepad file
    <br>2) Type "Bush hid the facts" (without the quotes)
    <br>3) Save it as whatever you want.
    <br>4) Close it, and re-open it.
    <br>Noticed the weird bug? No one can explain!
    <br>
    <b>Magic Behind: </b> This is simply an encoding issue. When notepad opens a file it tries to identify the file type encoding, and because of a bug where the characters form a particular pattern make notepad believe it is Chinese, it seems to us as if everything disappeared. Save the file in 
    <i>UTF-8/16</i> and everyhting would work fine. Open the file in Wordpad/Notepad++ etc and you can see the original text. For more details read the following Wikipedia page: 
    <a href="http://en.wikipedia.org/wiki/Bush_hid_the_facts">Bush hid the facts</a>
    <br>
    <br>
    <br>
    <b>Magic #3: </b>Again this is something funny and can't be explained. At Microsoft the whole Team, including Bill Gates, couldn't answer why this happened! It was discovered by another Indian. Try it out yourself. Open Microsoft Word and type =rand (200, 99) And then press ENTER And see the magic.
    <br>
    <br>
    <b>Magic Behind: </b>Oh gosh... another Indian thing. I am upset.
    <br>
    <br>On a serious note, this is nether a bug nor an easter egg in Microsoft word. This is a feature developed specifically on the request of users. This is a functionality that Microsoft provides. Don't believe me, well, read this 
    <a href="http://support.microsoft.com/kb/212251">Microsoft Support page</a>. 
    <b>rand(p,l)</b> is a special command you issue to Word to insert sample text in the localized language of the OS. This helps content editors, localization testers, and others a lot.
    <br>
    <br>
    <i>If only people could stop boasting about things done by Indians. I am proud to be an Indian, but not the one's as these.</i>
    <br>
</div>
