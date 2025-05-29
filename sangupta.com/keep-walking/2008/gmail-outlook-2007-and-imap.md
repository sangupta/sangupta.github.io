---
title: GMail, Outlook 2007 and IMAP
date: 23 Feb 2008
tags: 
- web
alias:
- /tech/gmail-outlook-2007-and-imap.html
- /2008/02/gmail-outlook-2007-and-imap.html
---

Since I had bought my laptop, I had not been able to find time to configure 
my emails on to my email client. Every time I had to use the web mail client 
and it was a pain for it gets slow, specially when you just need to review your 
old mails. Finally today I took the plunge and started to configure my GMail 
account in Outlook 2007. It was a breeze setting up specially with the help of 
tutorial available on Google 
<a title="Tutorial to configure GMaill with Outlook 2007" href="http://mail.google.com/support/bin/answer.py?answer=77689" target="_blank">here</a>.

<!-- break here -->

The tricky part was to move the Outlook `.pst` file to a different drive from 
the default location. Anyone who has had worked with Windows with long would 
know how pain is to backup data from C drive in case of failures. Using the 
default procedure listed in Outlook help, I moved the PST to a new location. 
As I started the client again, it created a new PST in a default location, 
leaving me wondering as to where did I go wrong while working through the procedure. 
Well, may be, I tried again with the same problem.


Google is the only way when you get stuck up - a simple search led to me 
`experts-exchange.com`, a site that pretends to contain all results, but I guess 
is useless for it forces you to shell out money for simple answers. I am surprised 
as to why does Google indexes this site even. A browse through more results, a few 
more user experiences cursing Microsoft for making simple things so tough, and 
I was on my way to believe that this was not possible with IMAP accounts. I was 
almost planning to shift to POP account of GMail, as with POP accounts you just 
need to click `Change Folder location...` option and move your PST. I called up 
one of my friends and then we started to dig a solution for it. Here is what I did, 
to achieve a very complex simple task.

1. Open Outlook - Configure your GMail account as detailed here. Stop Outlook.

2. Open Control Panel > Choose Mails > Click on Data files.

3. Select the Account name and check for the location of the PST file. Leave the window open.

4. Open the folder containing the PST. Move the PST to the desired location.

5. Do NOT rename the file - if you do Outlook creates a new file in the default location again.

5. Switch to the Data Files window (as opened in Step 2) and double click on the PST file location.

6. Outlook displays an error window, Ignore the error, and point to the new location. Close the windows.

7. Outlook may create a new PST in the default location again, delete it, in such a case.

8. Restart Outlook.

Hope this helps.