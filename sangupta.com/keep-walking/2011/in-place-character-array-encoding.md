---
title: In-Place Character Array Encoding
date: 13 Jul 2011
tags: 
- interview-questions
- java
alias:
- /tech/in-place-character-array-encoding.html
- /2011/07/in-place-character-array-encoding.html
---

Problem
-------

Given a character stream as an array, encode the characters in place replacing given set of 
characters by their 3-character equivalent. The array is terminated by a `0x00` character. 
If the array cannot be fully encoded, the array should not be modified.

Solution
--------

This is a classic interview problem. There are two aspects to this problem,

* Calculating whether the array would be able to contain the entirely encoded string. This 
can be easily achieved by calculating the length of the string, the number of encod<i>able</i> 
characters and the size of the array. If the free space in the array is equal to the additional 
capacity that would be needed by the encod<i>able</i> characters </li>

* Encode the string from tail than from head. This is a must so that one does not override the 
characters ahead, when an encod<i>able</i> character is written encoded in the string.

A simple JAVA implementation is shown below:

```java
/**
 * Class to encode a given character stream (defined as char[] array). The character array is the only
 * memory space one has. In case encoding is not possible, the array should be left untouched. The array
 * will be terminated by a <code>null</code> to indicate string termination.
 * 
 * Each encodable character is 3 characters in length. Thus, additional space required would be 2 characters
 * per each encodable character.
 * 
 * @author sangupta
 * @since 12 July 2011
 */
public class CharacterStreamEncoder {
 
    /**
     * @param args
     */
    public static void main(String[] args) {
        char[] stream = new char[12];
        Arrays.fill(stream, '\0');
        stream[0] = 's';
        stream[1] = 'a';
        stream[2] = 'n';
        stream[3] = 'd';
        stream[4] = ' ';
        stream[5] = ' ';
        stream[6] = 'p';
         
        boolean result = encode(stream);
        if(result) {
            System.out.println(stream);
        } else {
            System.out.println("String was not modified.");
        }
    }
     
    public static boolean encode(char[] stream) {
        final int streamLength = stream.length;
        System.out.println("Total length: " + streamLength);
         
        // first we need to check if we can encode the string or not
        // in the given only space
        // so we read each character and count the total number of encodable
        // characters and also the length of the string.
        int encodable = 0;
        int length = 0;
        for(int index = 0; index < stream.length; index++) {
            char temp = stream[index];
            if(temp == '\0') {
                break;
            } else {
                length++;
                if(isEncodable(temp)) {
                    encodable++;
                }
            }
        }
         
        System.out.println("Length of string: " + length);
        System.out.println("Encodable: " + encodable);
         
        if(encodable == 0) {
            return true;
        }
             
        // now check for the balance length
        int balance = streamLength - length;
        if(encodable *2 >= balance) {
            // not sufficient space in stream to encode
            return false;
        }
         
        // now we start from the end of the stream to encode
        // so that we do not override the characters before
        // as we already know the number of encodable characters
        // we know where the last character would be written
        int destination = length + encodable * 2 - 1;
        int source = length;
         
        for(int index = source; index > 0; index--) {
            char character = stream[index - 1];
            char[] encoded = encode(character);
            if(encoded.length == 1) {
                stream[destination--] = encoded[0];
            } else {
                // we need to set the 3 character bytes properly
                stream[destination--] = encoded[2];
                stream[destination--] = encoded[1];
                stream[destination--] = encoded[0];
            }
        }
         
        return true;
    }
 
    private static boolean isEncodable(char character) {
        switch(character) {
            case ' ':
                return true;
                 
        }
         
        return false;
    }
     
    private static char[] encode(char character) {
        switch(character) {
            case ' ':
                return new char[] { '%', '2', '0' };
        }
         
        return new char[] { character };
    }
 
}
```