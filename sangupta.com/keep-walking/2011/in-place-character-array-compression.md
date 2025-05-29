---
title: In-Place Character Array Compression
date: 14 Jul 2011
tags: 
- interview-questions
- java
alias:
- /tech/in-place-character-array-compression.html
- /2011/07/in-place-character-array-compression.html
---

Problem
-------

Given a character stream as an array, compress the characters in place appending 
the number of continuous characters by the numerical value and then the character. 
The array is terminated by a `0x00` character.


Solution
--------

Another classic interview problem which tests multiple skills in a single problem, namely,

* Conversion from integer to ascii - the number returned is a integral value which needs to be converted to ascii and then put in place in stream
* Skills with pointers (not the <tt>real</tt> pointers) when operating on an array


The following JAVA code illustrates how to work up the given problem. It makes use of an 
`itoa()` method that was explained before <a href="">here</a>.

```java
package com.sangupta.keepwalking;
 
public class CharacterArrayCompression {
 
    public static void main(String[] args) {
        String stream = "aaaaaaaaaaaaaaaaaaaaabbbbbbssssskkkkjkkdkksdkkkdeeeekkllsssiii";
        char[] characters = stream.toCharArray();
        compress(characters);
        System.out.println(characters);
    }
 
    private static void compress(char[] characters) {
        if(characters == null || characters.length <= 1) {
            // do nothing if we are not provided with any data
            // or if we have a single character
            return;
        }
         
        char current = characters[0];
        int count = 1;
        int destination = 0;
        for(int index = 1; index < characters.length; index++) {
            char found = characters[index];
            if(current == found) {
                count++;
            } else {
                // compress and store the value
                if(count > 1) {
                    char[] value = IntegerToAscii.itoa(count);
                    for(int j = 0; j < value.length; j++) {
                        char temp = value[j];
                        if(temp != '\0') {
                            characters[destination++] = temp;
                        }
                    }
                }
                characters[destination++] = current;
                 
                // reset to the new occurence of character
                current = found;
                count = 1;
            }
        }
         
        for(int index = destination; index < characters.length; index++) {
            characters[index] = '\0';
        }
    }
 
}
```

Hope this helps!