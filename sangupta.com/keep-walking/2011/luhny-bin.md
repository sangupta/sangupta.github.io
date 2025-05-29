---
title: The Luhny Bin
date: 17 Nov 2011
tags: 
- code-challenge
- coding-techniques
- my-projects
alias:
- /tech/luhny-bin.html
- /2011/11/luhny-bin.html
---

Two days ago, <a href="http://blog.crazybob.org/">Bob Lee</a> posted a fun challenge on the 
<a href="http://blog.crazybob.org/2011/11/coding-challenge-luhny-bin.html">Luhny Bin</a>. It 
was not before a day has passed that I could get to know of the problem and try my hands at 
it. The delay being attributed to absence of `Cygwin` on my Windows machine which was needed 
to run the test harness (refer original post on details).

<!-- break here -->

Yesterday, I spent most of my time first trying to get the harness running without using `Cygwin`. The 
solution was a bit tricky as I had to figure out how the test harness was actually running. Anyhow, 
my solution is available at 
<a href="https://github.com/sangupta/luhnybin/blob/master/src/com/squareup/luhnybin/Main.java">here</a> wherein 
I modified the original `Main.java` file. The change was simple: first, change `mask.sh` on line `41` to say 
`mask.bat` and second, modify line `81` to correctly build the process.

Once, I had it setup and after loosing all day, I was ready to start coding the actual solution. Before 
I dozed off to my bed, I had made sure that my code passed `18` of the `20` tests. The **19th test** was 
tricky. It had many over-lapping `luhn` numbers, and hence I had some leftover in the end which was not 
being cleaned up. This single test made me completely rewrite the piece introducing a third buffer (which 
came down to two, as I directly now wrote to `System.out`.

Anyways, the solution is now complete and posted on my fork of the 
<a href="https://github.com/sangupta/luhnybin">LuhnyBin Github</a> repository.