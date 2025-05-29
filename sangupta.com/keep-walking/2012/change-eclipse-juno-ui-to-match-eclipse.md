---
title: Change Eclipse Juno UI to match Eclipse Indigo
date: 13 Aug 2012
tags: 
- java
- workarounds
alias:
- /tech/change-eclipse-juno-ui-to-match-eclipse.html
- /2012/08/change-eclipse-juno-ui-to-match-eclipse.html
---

Some of the Windows users, like me, who have switched to Eclipse Juno (Eclipse 4.2) might 
not have liked the theme that ships as default. Specially, the piece around the toolbar 
backgrounds, the code editing theme, the absence of left border along side line numbers, 
and the overtly flashy UI containers.

<!-- break here -->

To put in plain simple words: Eclipse Juno theme actually sucks. All the hype around CSS 
based styling might be very good technically, and a step forward, but per UX standards it 
sucks, and it sucks hard.

But we have a quick workaround: For those who wish to move to using the Eclipse Indigo looks, a 
version prior, simply, rename the folder,

```
plugins\org.eclipse.platform_4.2.0.v201206081400\css
```
to something like,

```
plugins\org.eclipse.platform_4.2.0.v201206081400\css.old
```

And you are done! Launch your eclipse and enjoy the old theme.

**Note:** Make sure Eclipse is not-running when making this change.

Hope this helps.