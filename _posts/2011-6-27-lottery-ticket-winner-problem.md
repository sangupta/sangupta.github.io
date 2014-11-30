---
layout: default
title: Lottery Ticket Winner Problem
permalink: /2011/06/lottery-ticket-winner-problem.html
redirect_from: "/2011/06/lottery-ticket-winner-problem.html"
date: Mon Jun 27 15:33:00 IST 2011
sharingURL: http://blog.sangupta.com/2011/06/lottery-ticket-winner-problem.html
tags: interview-questions
---
<tt>Problem:</tt>
<br>Consider a list of lottery tickets where the only information available is the ticket number, and the contact/verification details of the purchaser. The tickets are sold as per 4 regions, East/West/North/South, and have the same as the first letter of the ticket number. Given that one has to traverse through all ticket numbers only once, design a lottery system to pick a winner.
<br>
<br>
<tt>Solution:</tt>
<br>We are given that the list of all tickets has to be traversed and only once. Thus, our lottery winner cannot be based on a random selection amongst the list. Because, first we won't be traversing through the entire list and second that a person buying 1000 tickets will have a better chance at winning.
<br>
<br>Given the constraint, we need to iterate over all tickets. Let's assume there are 100 tickets and we have iterated over 10 tickets by now. We need a winner amongst these 10 tickets, assuming these were the only ones. As we read 11th ticket, we need to choose a winner amongst the winner of 10 tickets, and the 11th ticket. This way we can define an approach where with every ticket processing we keep choosing between the current winner (till the last ticket) and the ticket being processed.
<br>
<br>Thus, the solution can be coded as under,
<br>
<pre class="brush: java">/**<br> * Copyright (C) 2011, Sandeep Gupta<br> * http://www.sangupta.com<br> * <br> * The file is licensed under the the Apache License, Version 2.0<br> * (the "License"); you may not use this file except in compliance with<br> * the License.  You may obtain a copy of the License at<br> * <br> * http://www.apache.org/licenses/LICENSE-2.0<br> * <br> * Unless required by applicable law or agreed to in writing, software<br> * distributed under the License is distributed on an "AS IS" BASIS,<br> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<br> * <br> * See the License for the specific language governing permissions and<br> * limitations under the License.<br> * <br> */<br><br>/**<br>* A simple solution to the lottery problem.<br>* <br>* @author sangupta<br>* @since 27 Jun 2011<br>*/<br>public class Lottery {<br> <br> public static void main(String[] args) {<br>  List
    <ticket>
         tickets = new ArrayList
        <lottery.ticket>
            ();
            <br> tickets.add(new Ticket("E123", "A"));
            <br> tickets.add(new Ticket("E345", "B"));
            <br> tickets.add(new Ticket("N672", "C"));
            <br> tickets.add(new Ticket("S642", "D"));
            <br> tickets.add(new Ticket("W945", "E"));
            <br> 
            <br> Ticket winner = selectWinner(tickets);
            <br> System.out.println("Winner: " + winner.contactDetails);
            <br> }
            <br> 
            <br> /**
            <br> * The method selects a winner amongst the given lottery tickets.
            <br> * 
            <br> * @param tickets
            <br> * @return
            <br> */
            <br> public static Ticket selectWinner(List
            <ticket>
                 tickets) {
                <br> // Usual checks
                <br> if(tickets == null || tickets.size() == 0) {
                <br> System.out.println("No ticket sold, thus no winner.");
                <br> return null;
                <br> }
                <br> 
                <br> if(tickets.size() == 1) {
                <br> System.out.println("Only one ticket sold, the winner is the same.");
                <br> return tickets.get(0);
                <br> }
                <br> 
                <br> // iterate over all ticket
                <br> Ticket currentWinner = tickets.get(0);
                <br> long currentWinnerHash = ticketToHash(currentWinner);
                <br> for(int index = 1; index &lt; tickets.size(); index++) {
                <br> Ticket candidate = tickets.get(index);
                <br> 
                <br> long hash = ticketToHash(candidate);
                <br> double random;
                <br> do {
                <br> random = Math.random();
                <br> } while(random == 0.5);
                <br> 
                <br> if((random &lt; 0.5) &amp;&amp; (hash &lt; currentWinnerHash)) {
                <br> currentWinner = candidate;
                <br> } else if(hash &gt; currentWinnerHash) {
                <br> currentWinner = candidate;
                <br> }
                <br> 
                <br> if(currentWinner == candidate) {
                <br> currentWinnerHash = hash;
                <br> }
                <br> }
                <br> 
                <br> return currentWinner;
                <br> }
                <br> 
                <br> /**
                <br> * Store ticket details.
                <br> */
                <br> public static class Ticket {
                <br> 
                <br> String ticketNumber;
                <br> 
                <br> String contactDetails;
                <br> 
                <br> public Ticket(String number, String details) {
                <br> this.ticketNumber = number;
                <br> this.contactDetails = details;
                <br> }
                <br> 
                <br> }
                <br>
                <br>}
                <br>
            </ticket>
        </lottery.ticket>
    </ticket></pre>
<br>Consider a buyer who buys 1000 tickets. As he will buy from the same region, all his tickets will land up in the same region code. Thus, we need to randomize the region within the ticket as well and this can be done inside our 
<tt>ticketToHash</tt> method, as under,
<br>
<br>
<pre class="brush: java">  /**<br>  * Convert the ticket number to a long hash value<br>  * <br>  * @param currentWinner<br>  * @return<br>  */<br> private static long ticketToHash(Ticket currentWinner) {<br>  String number = currentWinner.ticketNumber;<br><br>  // replace the region of the ticket with a digit first<br>  int digit = (int) (Math.random() * 10);<br>  number = String.valueOf(digit) + number.substring(1);<br>  <br>  // randomize all digits<br>  number = shuffle(number.toCharArray());<br>  <br>  // return the hash of the number<br>  Long num = Long.parseLong(number);<br>  long randomHash = (long) ((double)num.hashCode() * new Random().nextInt(1000000));<br>  return randomHash;<br> }<br></pre>
<br>Another randomization way is to randomize the obtained digits itself. This will make sure that large ticket numbers do not necessarily produce a larger hash.
<br>
<br>
<pre class="brush: java">  /**<br>  * Shuffle for array length * 5 times, picking any two positions and swapping them<br>  * <br>  * @param charArray<br>  * @return<br>  */<br> private static String shuffle(char[] charArray) {<br>  if(charArray.length == 1) {<br>   return charArray.toString();<br>  }<br><br>  Random random = new Random(new Random().nextLong());<br>  int length = charArray.length;<br>  int limit = length * 5;<br>  for(int i = 0; i &lt; limit; i++) {<br>   int position1 = random.nextInt(length);<br>   int position2;<br>   do {<br>    position2 = random.nextInt(length);<br>   } while(position1 == position2);<br>   <br>   // swap these two positions<br>   char temp = charArray[position1];<br>   charArray[position1] = charArray[position2];<br>   charArray[position2] = temp;<br>  }<br>  <br>  return String.valueOf(charArray);<br> }<br></pre> The above solution holds good for all conditions as mentioned in the problem statement. 
<tt>Improvement Areas:</tt>The part where the ticket number is converted to hash, and the hash compared to other hashes can be modified to make sure that a very high value of hash does not keeps intact as the current winner. The part may again be randomized for the same.
<br>
<br>Hope this helps.
