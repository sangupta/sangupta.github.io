---
title: Paraphrasing | Detecting Similar Strings
date: 28 Nov 2010
tags: 
- coding-techniques
alias:
- /tech/paraphrasing-detecting-similar-strings.html
- /2010/11/paraphrasing-detecting-similar-strings.html
---

In the past couple of months I have developed interest in understanding how search 
algorithms work. This has led me to experimenting with 
<a href="http://lucene.apache.org">Apache Lucene</a> project a lot. For those who 
do not know, Lucene is an open source implementation of a high-performing full-text 
search engine. As of today I understand (some bits and pieces of) how the content is 
crawled, text extracted, how are indexes stored and how can results be obtained from 
an index. The last being something which I have delved in deep in the past couple of 
months. This has been quite a learning experience and as I dwell more, the deeper the 
mystery it becomes.

<!-- break here -->

But just retrieving results is not that encompasses a search engine. Providing search 
suggestions for misspelled words, and finding documents containing similar text for 
the search query is another problem that the search engines need to tackle. For example, 
when you search for 

`reading files in java` it can also match documents titled, `reading files with java`. 
Noticed how Google suggests you queries when you make a typo, or just rephrases the 
terms a little bit to yield better results. The problem is termed as `Detection of 
similar strings`, or `paraphrasing`, or checking for query reformulations. Though 
paraphrasing and reformulations are not the same, but both depend on detection of 
similar strings. Today, I will try and explore the problem of paraphrasing more, and 
leave reformulations for some other time.

There are two main categories of algorithms for matching string similarity: 
`equivalence methods` and `similarity ranking methods`.

**Equivalence methods** compare two strings and return a value of 
`true` or `false` depending on whether the two strings look equivalent. For example, 
`general-purpose` is equivalent to `general purpose`.

**Word Stemming**: It is a technique to reduce closely related words to a basic canonical form or 
`stem`. For example `runs`, and `running` can be reduced to `run` – the basic stem for these words, 
before the algorithm begins performing an exact match. Similarly, `familiarise` and `familiarize` 
are the same words in different dialects. Read more on stemming on 
<a href="http://en.wikipedia.org/wiki/Stemming">Wikipedia</a>; and you can download open-source 
porter-stemmers for many of the languages from 
<a href="http://snowball.tartarus.org/">Snowball</a>.

**Synonyms/Abbreviations:** A technique to reduce/expand common abbreviations and replacing
words that may be common synonyms of others. For example, `ads` is very easily interchangeably 
used for `advertisements`. Doing so close to the user interface allows the back-end 
implementations to work on a smaller-controlled vocabulary, resulting in faster retrieval 
systems.

**Wildcards & Regular Expressions:** The popularity of wildcards and regular expressions 
(sounds a little geeky), has gained entrance in the field of string similarity. For 
example, `go run` can match `gone running` as well as `go running`.

**Soundex Algorithm:** A phonetic algorithm for indexing names by sound, as pronounced in English. For example, `tame`
, `fame`, and `name` all sound the same; but are not the same words. On the other hand, 
`licence` and `license` are. It is one of the most widely known phonetic algorithms, being a standard part of MySQL and ORACLE.

**Similarity ranking methods** compare a given string to a given set of other strings and
then rank the given set in the order of their similarity with the original string. Ranking 
is based on how one string matches better than the other string.

**Longest Common Substring:** To find the longest string that is a substring of both the strings. For 
example, in `water` and `watermelon` the longest string is `water`. This is not the best of the methods 
because both the words mean quite different. Similarly, a small typing error, such as 
`witermelon` has a higher match with `with` than `watermelon`.

**Edit Distance:** The idea is to account for common character omissions, insertions, substitutions 
and reversals. The algorithms compute the number of string operations that are needed to convert one 
string in to another. For example, to convert `writer` to `water` two operations are needed (one 
replacement and one deletion) and hence, the edit distance will be 2.

**Hamming Distance:** It is the number of character positions in which the characters of two given 
strings are different. For example, in `mind` and `wind` the hamming distance would be 1. In theory, 
the hamming distance of unequal length strings is infinite, thus, usually shorter strings are padded 
with spaces before computing the distance.

**Simon White’s Algorithm:** Simon White, in one of his 
<a href="http://www.catalysoft.com/articles/StrikeAMatch.html">articles</a> has demonstrated an algorithm 
to compute the similarity of strings and rank results based on it. The algorithm fares better than 
algorithms mentioned above in individuality. To quote from the article,

>    The algorithm was driven by the following requirements:
>    
>    * **A true reflection of lexical similarity** - strings with small differences should be recognised as being similar. In particular, a significant substring overlap should point to a high level of similarity between the strings.
>	 * **A robustness to changes of word order** - two strings which contain the same words, but in a different order, should be recognised as being similar. On the other hand, if one string is just a random anagram of the characters contained in the other, then it should (usually) be recognised as dissimilar.
>    * **Language Independence** - the algorithm should work not only in English, but in many different languages.

As detailed in the project, 
<a href="http://staffwww.dcs.shef.ac.uk/people/S.Chapman/simmetrics.html">SimMetrics</a>, there 
are way too many algorithms to determine distance metrics between two strings. SimMetrics is an 
open-source implementation (in Java) of some of the most popular similarity or distance metrics 
algorithms. This area has so well been explored that the best algorithms have already been 
developed, and I embark on the journey in discovering them ;)