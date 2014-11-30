---
layout: default
title: (a XOR b) using NAND gates
permalink: /2009/11/xor-b-using-nand-gates.html
redirect_from: "/2009/11/xor-b-using-nand-gates.html"
date: Thu Nov 12 22:11:00 IST 2009
sharingURL: http://blog.sangupta.com/2009/11/xor-b-using-nand-gates.html
tags: coding-techniques interview-questions
---
Recently, someone asked me to construct the expression (a XOR b) using NAND gate/operator only. The first thing I did was write down the expressions which I thought I would need during the expression,
<br>
<br>
<blockquote>
    <pre>NOT (x OR y) = (NOT x) AND (NOT y)<br>NOT (x AND y) = (NOT x) OR (NOT y)<br>NOT (x AND y) = x NAND y<br>NOT x = x NAND x<br>x AND NOT x = 0 (ZERO)<br></pre>
</blockquote>and then I started expanding the expression like I knew everything.
<br>
<blockquote>
    <pre>a XOR b<br>= ( a OR b) AND NOT (a AND b)<br>= (a OR b) AND (NOT a OR NOT b)<br>= (a OR b) AND (a NAND b)<br>= NOT(NOT(a OR b))  AND (a NAND b)<br>= NOT (NOT a AND NOT b) AND (a NAND b)<br>= (NOT a NAND NOT b) AND (a NAND b)<br>= NOT { (NOT a NAND NOT b) NAND (a NAND b) }<br>= NOT { (a NAND a) NAND (b NAND b) NAND (a NAND b) }<br>= { (a NAND a) NAND (b NAND b) NAND (a NAND b) } NAND { (a NAND a) NAND (b NAND b) NAND (a NAND b) }<br></pre>
</blockquote>And I was happy to have done this very easily. But then if you succeed in first attempt it indicates you did a blunder. And I did one too. The mistake was to write down the rules initially. This stopped my mind to think of other boolean algebra rules.
<br>
<blockquote>
    <pre>(a XOR b) = (a OR b) - (a AND b)<br>= (a OR b) AND NOT (a AND b)<br>= (a OR b) AND [ (NOT a) OR (NOT b) ]<br>= [a AND (NOT a) ] OR [ b AND NOT b] OR [a AND NOT b] OR [b AND NOT a]<br>= [a AND NOT b] OR [b AND NOT a]<br></pre>
</blockquote>Also someone suggested me to use . (dot) for AND operator, ' (apos) for NOT operator, + (plus) for OR operator. Taking all this into my mind here is a simpler expansion,
<br>
<blockquote>
    <pre>a XOR b = a.b' + a'b<br>= ((a.b' + a'b)')'<br>= ( (a.b')' . (a'.b)' )'<br>= (a NAND b') NAND  (a' NAND b)<br>= [a NAND (b NAND b) ] NAND [ (a NAND a) NAND b ]<br></pre>
</blockquote>If only I hadn't stopped using my mind :)
