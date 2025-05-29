---
title: Lottery Ticket Winner Problem
date: 27 Jun 2011
tags: 
- interview-questions
alias:
- /tech/lottery-ticket-winner-problem.html
- /2011/06/lottery-ticket-winner-problem.html
---

Problem
-------

Consider a list of lottery tickets where the only information available is the ticket 
number, and the contact/verification details of the purchaser. The tickets are sold as 
per 4 regions, East/West/North/South, and have the same as the first letter of the ticket 
number. Given that one has to traverse through all ticket numbers only once, design a 
lottery system to pick a winner.

<!-- break here -->

Solution
--------

We are given that the list of all tickets has to be traversed and only once. Thus, our 
lottery winner cannot be based on a random selection amongst the list. Because, first we 
won't be traversing through the entire list and second that a person buying 1000 tickets 
will have a better chance at winning.

Given the constraint, we need to iterate over all tickets. Let's assume there are 100 
tickets and we have iterated over 10 tickets by now. We need a winner amongst these 10 
tickets, assuming these were the only ones. As we read 11th ticket, we need to choose a 
winner amongst the winner of 10 tickets, and the 11th ticket. This way we can define an 
approach where with every ticket processing we keep choosing between the current winner
(till the last ticket) and the ticket being processed.

Thus, the solution can be coded as under,

```java
/**
  * The method selects a winner amongst the given lottery tickets.
  * 
  * @param tickets
  * @return
  */
 public static Ticket selectWinner(List<ticket> tickets) {
  // Usual checks
  if(tickets == null || tickets.size() == 0) {
   System.out.println("No ticket sold, thus no winner.");
   return null;
  }
   
  if(tickets.size() == 1) {
   System.out.println("Only one ticket sold, the winner is the same.");
   return tickets.get(0);
  }
   
  // iterate over all ticket
  Ticket currentWinner = tickets.get(0);
  long currentWinnerHash = ticketToHash(currentWinner);
  for(int index = 1; index < tickets.size(); index++) {
   Ticket candidate = tickets.get(index);
    
   long hash =  ticketToHash(candidate);
   double random;
   do {
    random = Math.random();
   } while(random == 0.5);
    
   if((random < 0.5) && (hash < currentWinnerHash)) {
    currentWinner = candidate;
   } else if(hash > currentWinnerHash) {
    currentWinner = candidate;
   }
    
   if(currentWinner == candidate) {
    currentWinnerHash = hash;
   }
  }
   
  return currentWinner;
 }
  
 /**
  * Store ticket details.
  */
 public static class Ticket {
   
  String ticketNumber;
   
  String contactDetails;
   
  public Ticket(String number, String details) {
   this.ticketNumber = number;
   this.contactDetails = details;
  }
   
 }
 
}
```

Consider a buyer who buys 1000 tickets. As he will buy from the same region, all his tickets 
will land up in the same region code. Thus, we need to randomize the region within the ticket 
as well and this can be done inside our `ticketToHash` method, as under,

```java
/**
 * Convert the ticket number to a long hash value
 * 
 * @param currentWinner
 * @return
 */
private static long ticketToHash(Ticket currentWinner) {
 String number = currentWinner.ticketNumber;
 
 // replace the region of the ticket with a digit first
 int digit = (int) (Math.random() * 10);
 number = String.valueOf(digit) + number.substring(1);
  
 // randomize all digits
 number = shuffle(number.toCharArray());
  
 // return the hash of the number
 Long num = Long.parseLong(number);
 long randomHash = (long) ((double)num.hashCode() * new Random().nextInt(1000000));
 return randomHash;
}
```

Another randomization way is to randomize the obtained digits itself. This will make sure that 
large ticket numbers do not necessarily produce a larger hash.

```java
/**
 * Shuffle for array length * 5 times, picking any two positions and swapping them
 * 
 * @param charArray
 * @return
 */
private static String shuffle(char[] charArray) {
 if(charArray.length == 1) {
  return charArray.toString();
 }
 
 Random random = new Random(new Random().nextLong());
 int length = charArray.length;
 int limit = length * 5;
 for(int i = 0; i < limit; i++) {
  int position1 = random.nextInt(length);
  int position2;
  do {
   position2 = random.nextInt(length);
  } while(position1 == position2);
   
  // swap these two positions
  char temp = charArray[position1];
  charArray[position1] = charArray[position2];
  charArray[position2] = temp;
 }
  
 return String.valueOf(charArray);
}
```

The above solution holds good for all conditions as mentioned in the problem statement. 

`Improvement Areas:` The part where the ticket number is converted to hash, and the hash compared to other 
hashes can be modified to make sure that a very high value of hash does not keeps intact as the current 
winner. The part may again be randomized for the same.

Hope this helps!