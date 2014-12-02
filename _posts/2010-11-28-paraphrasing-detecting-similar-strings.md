---
layout: post
title: Paraphrasing | Detecting Similar Strings
permalink: /tech/paraphrasing-detecting-similar-strings.html
redirect_from: "/2010/11/paraphrasing-detecting-similar-strings.html"
date: Sun Nov 28 18:49:00 IST 2010
sharingURL: http://blog.sangupta.com/2010/11/paraphrasing-detecting-similar-strings.html
tags: coding-techniques
---

In the past couple of months I have developed interest in understanding how search algorithms work. This has led me to experimenting with 
<a href="http://lucene.apache.org">Apache Lucene</a> project a lot. For those who do not know, Lucene is an open source implementation of a high-performing full-text search engine. As of today I understand (some bits and pieces of) how the content is crawled, text extracted, how are indexes stored and how can results be obtained from an index. The last being something which I have delved in deep in the past couple of months. This has been quite a learning experience and as I dwell more, the deeper the mystery it becomes.
<br>
<br>But just retrieving results is not that encompasses a search engine. Providing search suggestions for misspelled words, and finding documents containing similar text for the search query is another problem that the search engines need to tackle. For example, when you search for 
<em>‘reading files in java’</em> it can also match documents titled, 
<em>‘reading files with java’</em>. Noticed how Google suggests you queries when you make a typo, or just rephrases the terms a little bit to yield better results. The problem is termed as ‘Detection of similar strings’, or paraphrasing, or checking for query reformulations. Though paraphrasing and reformulations are not the same, but both depend on detection of similar strings. Today, I will try and explore the problem of paraphrasing more, and leave reformulations for some other time.
<br>
<br>There are two main categories of algorithms for matching string similarity: 
<strong>equivalence methods</strong> and 
<strong>similarity ranking methods</strong>.
<br>
<br>
<strong>Equivalence methods</strong> compare two strings and return a value of 
<tt>true</tt> or 
<tt>false</tt> depending on whether the two strings look equivalent. For example, ‘
<em>general-purpose’</em> is equivalent to ‘
<em>general purpose’</em>.
<br>
<br>
<strong>Word Stemming: </strong>It is a technique to reduce closely related words to a basic canonical form or 
<em>stem.</em> For example ‘
<em>runs’, </em>and 
<em>‘running’</em> can be reduced to 
<em>‘run’</em> – the basic stem for these words, before the algorithm begins performing an exact match. Similarly, '’
<em>familiarise’</em> and ‘
<em>familiarize’</em> are the same words in different dialects. Read more on stemming on 
<a href="http://en.wikipedia.org/wiki/Stemming">Wikipedia</a>; and you can download open-source porter-stemmers for many of the languages from 
<a href="http://snowball.tartarus.org/">Snowball</a>.
<br>
<br>
<strong>Synonyms/Abbreviations:</strong> A technique to reduce/expand common abbreviations and replacing words that may be common synonyms of others. For example, ‘
<em>ads</em> is very easily interchangeably used for ‘
<em>advertisements’. </em>Doing so close to the user interface allows the back-end implementations to work on a smaller-controlled vocabulary, resulting in faster retrieval systems.
<br>
<br>
<strong>Wildcards &amp; Regular Expressions:</strong> The popularity of wildcards and regular expressions (sounds a little geeky), has gained entrance in the field of string similarity. For example, ‘
<em>go run’</em> can match ‘
<em>gone running’</em> as well as ‘
<em>go running’</em>.
<br>
<br>
<strong>Soundex Algorithm:</strong> A phonetic algorithm for indexing names by sound, as pronounced in English. For example, ‘
<em>tame’</em>, ‘
<em>fame’, </em>and '’
<em>name’ </em>all sound the same; but are not the same words. On the other hand, 
<em>‘licence’</em> and 
<em>‘license’</em> are. It is one of the most widely known phonetic algorithms, being a standard part of MySQL and ORACLE.
<br>
<br>
<strong>Similarity ranking methods</strong> compare a given string to a given set of other strings and then rank the given set in the order of their similarity with the original string. Ranking is based on how one string matches better than the other string.
<br>
<br>
<strong>Longest Common Substring:</strong> To find the longest string that is a substring of both the strings. For example, in ‘
<em>water’</em> and '’
<em>watermelon’,</em> the longest string is ‘
<em>water’</em>. This is not the best of the methods because both the words mean quite different. Similarly, a small typing error, such as 
<em>‘witermelon’</em> has a higher match with 
<em>‘with’</em> than 
<em>‘watermelon’</em>.
<br>
<br>
<strong>Edit Distance:</strong> The idea is to account for common character omissions, insertions, substitutions and reversals. The algorithms compute the number of string operations that are needed to convert one string in to another. For example, to convert 
<em>‘writer’</em> to 
<em>‘water’</em> two operations are needed (one replacement and one deletion) and hence, the edit distance will be 2.
<br>
<br>
<strong>Hamming Distance:</strong> It is the number of character positions in which the characters of two given strings are different. For example, in 
<em>‘mind’</em> and 
<em>‘wind’</em> the hamming distance would be 1. In theory, the hamming distance of unequal length strings is infinite, thus, usually shorter strings are padded with spaces before computing the distance.
<br>
<br>
<strong>Simon White’s Algorithm:</strong> Simon White, in one of his 
<a href="http://www.catalysoft.com/articles/StrikeAMatch.html">articles</a> has demonstrated an algorithm to compute the similarity of strings and rank results based on it. The algorithm fares better than algorithms mentioned above in individuality. To quote from the article,
<br>
<blockquote>
    The algorithm was driven by the following requirements:
    <br>
    <ul>
        <li><b>A true reflection of lexical similarity</b> - strings with small differences should be recognised as being similar. In particular, a significant substring overlap should point to a high level of similarity between the strings.</li>
        <li><b>A robustness to changes of word order</b> - two strings which contain the same words, but in a different order, should be recognised as being similar. On the other hand, if one string is just a random anagram of the characters contained in the other, then it should (usually) be recognised as dissimilar.</li>
        <li><b>Language Independence</b> - the algorithm should work not only in English, but in many different languages.</li>
    </ul>
</blockquote>
<br>As detailed in the project, 
<a href="http://staffwww.dcs.shef.ac.uk/people/S.Chapman/simmetrics.html">SimMetrics</a>, there are way too many algorithms to determine distance metrics between two strings. SimMetrics is an open-source implementation (in Java) of some of the most popular similarity or distance metrics algorithms. This area has so well been explored that the best algorithms have already been developed, and I embark on the journey in discovering them ;)
