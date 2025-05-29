---
title: (a XOR b) using NAND gates
date: 12 Nov 2009
tags: 
- coding-techniques
- interview-questions
alias:
- /tech/xor-b-using-nand-gates.html
- /2009/11/xor-b-using-nand-gates.html
---

Recently, someone asked me to construct the expression (a XOR b) using NAND 
gate/operator only. The first thing I did was write down the expressions which I thought I would need during the expression,

<!-- break here -->

```
NOT (x OR y) = (NOT x) AND (NOT y)
NOT (x AND y) = (NOT x) OR (NOT y)
NOT (x AND y) = x NAND y
NOT x = x NAND x
x AND NOT x = 0 (ZERO)
```

and then I started expanding the expression like I knew everything.

```text
a XOR b
= ( a OR b) AND NOT (a AND b)
= (a OR b) AND (NOT a OR NOT b)
= (a OR b) AND (a NAND b)
= NOT(NOT(a OR b))  AND (a NAND b)
= NOT (NOT a AND NOT b) AND (a NAND b)
= (NOT a NAND NOT b) AND (a NAND b)
= NOT { (NOT a NAND NOT b) NAND (a NAND b) }
= NOT { (a NAND a) NAND (b NAND b) NAND (a NAND b) }
= { (a NAND a) NAND (b NAND b) NAND (a NAND b) } NAND { (a NAND a) NAND (b NAND b) NAND (a NAND b) }
```

And I was happy to have done this very easily. But then if you succeed in first attempt 
it indicates you did a blunder. And I did one too. The mistake was to write down the rules 
initially. This stopped my mind to think of other boolean algebra rules.

```text
(a XOR b) = (a OR b) - (a AND b)
= (a OR b) AND NOT (a AND b)
= (a OR b) AND [ (NOT a) OR (NOT b) ]
= [a AND (NOT a) ] OR [ b AND NOT b] OR [a AND NOT b] OR [b AND NOT a]
= [a AND NOT b] OR [b AND NOT a]
```

Also someone suggested me to use . (dot) for AND operator, ' (apos) for NOT operator, + (plus) for 
OR operator. Taking all this into my mind here is a simpler expansion,

```text
a XOR b = a.b' + a'b
= ((a.b' + a'b)')'
= ( (a.b')' . (a'.b)' )'
= (a NAND b') NAND  (a' NAND b)
= [a NAND (b NAND b) ] NAND [ (a NAND a) NAND b ]
```

If only I hadn't stopped using my mind :)