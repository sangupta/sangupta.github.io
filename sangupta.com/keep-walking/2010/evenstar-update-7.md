---
title: Evenstar | Update 7
date: 24 Feb 2010
tags: 
- evenstar
- my-projects
alias:
- /tech/evenstar-update-7.html
- /2010/02/evenstar-update-7.html
---

This one is going to be a short. A friend of mine did spend some time 
on <a href="http://www.poetinside.com">PoetInside</a>, which now runs on `Evenstar` 
and informed me of three cool bugs which I missed unit-testing.

<!-- break here -->

* First, that all my apostrophe's were converted to junk characters. The root 
cause of the issue lies in the character formatting issues. The XML file exported 
from Blogger is in UTF-8, and while importing I lost the UTF-8 encoding. Thus, 
all those somehow were messed up. Anyways, the bug is fixed in the codebase and 
I shall soon be reimporting my blog to make way for the corrections.

* This particular bug I am proud to have introduced, as this happens to be a 
UX (User Experience) bug. In case a post has multiple labels I missed out adding 
the separating character to the template. Result of waking up late on a Saturday 
night and that too without intoxication. The good part is that the template can 
be updated on-th-fly from the admin screen (eeehhh... I have't uploaded the snaps 
for admin screen yet) and thus, it now stands fixed.

* Last but not the least, the bug does not allow a user with permissions to view 
restricted posts even after signing-in. This seems to be a trickier issue for it
works with my account which has been configured the same way, as others. But with 
some luck..err...bad luck, I am able to reproduce the issue with another account. 
This one would take some time as the next two days, I would be on a fire drill.

Keep my hands busy with bugs folks! Let's play code!