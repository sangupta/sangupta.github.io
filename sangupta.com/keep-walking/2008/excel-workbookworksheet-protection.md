---
title: Excel Workbook/Worksheet protection
date: 01 Feb 2008
tags: 
- coding-techniques
alias:
- /tech/excel-workbookworksheet-protection.html
- /2008/02/excel-workbookworksheet-protection.html
---

Another find of the day. Security and Microsoft seem to be antonyms. And that 
too so easy. I had been using Excel for many-many years now, but I discovered 
these holes only day-before. What a fool I have been :(

<!-- break here -->

In no particular order I would travel through various holes/tricks that can be 
exploited/used to have your way. :D Infact, I had to resort to dirty methods to 
gain some insight into understanding something.

* There are some cells that contain plain values and no formulas. The cells are 
locked, rows hidden and sheet protected. To view the cells just copy the rows 
from one before to one another, open a new workbook, paste. Now unhide all the 
rows, voilla, you have the values of all the cells.


* You have a locked sheet with hidden cells containing formulas that link to the 
same sheet. Copy the sheet to a new workbook, and you have all the cells unlocked.

* You have a protected sheet with locked hidden cells containing formulae that 
refer to other worksheets. A simple copy-paste won't do the trick. Hack it using 
VBA. Iterate through the cells, read the formula and just set it somewhere else. 
So easy :)

* To prevent a sheet from being Moved/Copied, protect the workbook with a password. 
One drawback, copy-paste of individual cell ranges bypasses this security. You may 
use VBA to copy-protect your worksheet, but again that may render workbook useless 
in case of High-security environments.

* Another way could be to protect the entire workbook, put all your formulae on a 
different worksheet, hide the worksheet. No one would be able to unhide the sheet. 
Drawback is they can access this sheet using VBA, copy the cells and get the information 
needed.

* The biggest drawback <i>or hack</i> is VBA. Using the powerful ability you can access 
information in any cell you desire, its formulae, data, formatting. Reconstruct those 
with the variations you desire, put them at any other place, and reference. No one 
will ever know you modified. :)

I guess the biggest security problem is VBA. With the feature ON, you leave your data 
vulnerable to even mediocre programmers. Its a boon to programmers and a curse to security. 
Even if you protect your VBA modules, someone else can write the code in another workbook, 
open both simulataneously, and have his way into your data. I am still to discover 
something really fool-proof.

Anyways many utilities let you make a backdoor entry into protected workbooks/worksheets 
with just them running in background. It seems there are more holes in the way Excel DOM 
is implemented. And yes, they work - I tried one with success yesterday :D

Hope this helps.