---
title: C++ Interview Question Bank
date: 8- Feb 2010
tags: 
- interview-questions
alias:
- /tech/c-interview-question-bank.html
- /2010/02/c-interview-question-bank.html
---

<div align="justify">
    For some reason I happened to be searching for a good question bank on C++ questions that may aid one in brushing up concepts just before the call of an interview. My search did lead to some very useful stuff (though a bit stale and old) which I happen to share in now.
    <br>
    <br>The following questions are part of this bank. All credit goes to 
    <b>Marshall Cline</b> from 
    <i>Paradigm Shift, Inc</i>. Somehow the contact information mentioned in the document doesn't work, but when do the concepts change, right?
    <br>
    <br>Download the 
    <a href="http://sites.google.com/site/sandypec/Home/CPPQuestionBank.txt?attredirects=0&amp;d=1">question bank from here</a>.
    <br>
    <blockquote>
        Q1: What is C++? What is OOP?
        <br>Q2: What are some advantages of C++?
        <br>Q3: Who uses C++?
        <br>Q4: Does C++ run on machine `X' running operating system `Y'?
        <br>Q5: What C++ compilers are available?
        <br>Q6: Is there a translator that turns C++ code into C code?
        <br>Q7: Are there any C++ standardization efforts underway?
        <br>Q8: Where can I ftp a copy of the latest ANSI-C++ draft standard?
        <br>Q9: Is C++ backward compatible with ANSI-C?
        <br>Q10: What books are available for C++?
        <br>Q11: How long does it take to learn C++?
        <br>
        <br>PART03 -- Basics of the paradigm
        <br>Q12: What is a class?
        <br>Q13: What is an object?
        <br>Q14: What is a reference?
        <br>Q15: What happens if you assign to a reference?
        <br>Q16: How can you reseat a reference to make it refer to a different object?
        <br>Q17: When should I use references, and when should I use pointers?
        <br>Q18: What are inline fns? What are their advantages? How are they declared?
        <br>
        <br>PART04 -- Constructors and destructors
        <br>Q19: What is a constructor? Why would I ever use one?
        <br>Q20: What are destructors really for? Why would I ever use them?
        <br>
        <br>PART05 -- Operator overloading
        <br>Q21: What is operator overloading?
        <br>Q22: What operators can/cannot be overloaded?
        <br>Q23: Can I create a `**' operator for `to-the-power-of' operations?
        <br>
        <br>PART06 -- Friends
        <br>Q24: What is a `friend'?
        <br>Q25: Do `friends' violate encapsulation?
        <br>Q26: What are some advantages/disadvantages of using friends?
        <br>Q27: What does it mean that `friendship is neither inherited nor transitive'?
        <br>Q28: When would I use a member function as opposed to a friend function?
        <br>
        <br>PART07 -- Input/output via and 
        <br>Q29: How can I provide printing for a `class X'?
        <br>Q30: Why should I use instead of the traditional ?
        <br>Q31: Printf/scanf weren't broken; why `fix' them with ugly shift operators?
        <br>
        <br>PART08 -- Freestore management
        <br>Q32: Does `delete ptr' delete the ptr or the pointed-to-data?
        <br>Q33: Can I free() ptrs alloc'd with `new' or `delete' ptrs alloc'd w/ malloc()?
        <br>Q34: Why should I use `new' instead of trustworthy old malloc()?
        <br>Q35: Why doesn't C++ have a `realloc()' along with `new' and `delete'?
        <br>Q36: How do I allocate / unallocate an array of things?
        <br>Q37: What if I forget the `[]' when `delete'ing array allocated via `new X[n]'?
        <br>Q38: What's the best way to create a `#define macro' for `NULL' in C++?
        <br>
        <br>PART09 -- Debugging and error handling
        <br>Q39: How can I handle a constructor that fails?
        <br>Q40: How can I compile-out my debugging print statements?
        <br>
        <br>PART10 -- Const correctness
        <br>Q41: What is `const correctness'?
        <br>Q42: Is `const correctness' a good goal?
        <br>Q43: Is `const correctness' tedious?
        <br>Q44: Should I try to get things const correct `sooner' or `later'?
        <br>Q45: What is a `const member function'?
        <br>Q46: What is an `inspector'? What is a `mutator'?
        <br>Q47: What is `casting away const in an inspector' and why is it legal?
        <br>Q48: But doesn't `cast away const' mean lost optimization opportunities?
        <br>
        <br>PART11 -- Inheritance
        <br>Q49: What is inheritance?
        <br>Q50: Ok, ok, but what is inheritance?
        <br>Q51: How do you express inheritance in C++?
        <br>Q52: What is `incremental programming'?
        <br>Q53: Should I pointer-cast from a derived class to its base class?
        <br>Q54: Derived* --&gt; Base* works ok; why doesn't Derived** --&gt; Base** work?
        <br>Q55: Does array-of-Derived is-NOT-a-kind-of array-of-Base mean arrays are bad?
        <br>Inheritance -- virtual functions
        <br>Q56: What is a `virtual member function'?
        <br>Q57: What is dynamic dispatch? Static dispatch?
        <br>Q58: Can I override a non-virtual fn?
        <br>Q59: Why do I get the warning "Derived::foo(int) hides Base::foo(double)" ?
        <br>Inheritance -- conformance
        <br>Q60: Can I `revoke' or `hide' public member fns inherited from my base class?
        <br>Q61: Is a `Circle' a kind-of an `Ellipse'?
        <br>Q62: Are there other options to the `Circle is/isnot kind-of Ellipse' dilemma?
        <br>Inheritance -- access rules
        <br>Q63: Why can't I access `private' things in a base class from a derived class?
        <br>Q64: What's the difference between `public:', `private:', and `protected:'?
        <br>Q65: How can I protect subclasses from breaking when I change internal parts?
        <br>Inheritance -- constructors and destructors
        <br>Q66: Why does base ctor get *base*'s virtual fn instead of the derived version?
        <br>Q67: Does a derived class dtor need to explicitly call the base destructor?
        <br>Inheritance -- private and protected inheritance
        <br>Q68: How do you express `private inheritance'?
        <br>Q69: How are `private derivation' and `containment' similar? dissimilar?
        <br>Q70: Should I pointer-cast from a `privately' derived class to its base class?
        <br>Q71: Should I pointer-cast from a `protected' derived class to its base class?
        <br>Q72: What are the access rules with `private' and `protected' inheritance?
        <br>Q73: Do most C++ programmers use containment or private inheritance?
        <br>
        <br>PART12 -- Abstraction
        <br>Q74: What's the big deal of separating interface from implementation?
        <br>Q75: How do I separate interface from implementation in C++ (like Modula-2)?
        <br>Q76: What is an ABC (`abstract base class')?
        <br>Q77: What is a `pure virtual' member function?
        <br>Q78: How can I provide printing for an entire hierarchy rooted at `class X'?
        <br>Q79: What is a `virtual destructor'?
        <br>Q80: What is a `virtual constructor'?
        <br>
        <br>PART13 -- Style guidelines
        <br>Q81: What are some good C++ coding standards?
        <br>Q82: Are coding standards necessary? sufficient?
        <br>Q83: Should our organization determine coding standards from our C experience?
        <br>Q84: Should I declare locals in the middle of a fn or at the top?
        <br>Q85: What source-file-name convention is best? `foo.C'? `foo.cc'? `foo.cpp'?
        <br>Q86: What header-file-name convention is best? `foo.H'? `foo.hh'? `foo.hpp'?
        <br>Q87: Are there any lint-like guidelines for C++?
        <br>
        <br>PART14 -- C++/Smalltalk differences and keys to learning C++
        <br>Q88: Why does C++'s FAQ have a section on Smalltalk? Is this Smalltalk-bashing?
        <br>Q89: What's the difference between C++ and Smalltalk?
        <br>Q90: What is `static typing', and how is it similar/dissimilar to Smalltalk?
        <br>Q91: Which is a better fit for C++: `static typing' or `dynamic typing'?
        <br>Q92: How can you tell if you have a dynamically typed C++ class library?
        <br>Q93: Will `standard C++' include any dynamic typing primitives?
        <br>Q94: How do you use inheritance in C++, and is that different from Smalltalk?
        <br>Q95: What are the practical consequences of diffs in Smalltalk/C++ inheritance?
        <br>Q96: Do you need to learn a `pure' OOPL before you learn C++?
        <br>Q97: What is the NIHCL? Where can I get it?
        <br>
        <br>PART15 -- Reference and value semantics
        <br>Q98: What is value and/or reference semantics, and which is best in C++?
        <br>Q99: What is `virtual data', and how-can / why-would I use it in C++?
        <br>Q100: What's the difference between virtual data and dynamic data?
        <br>Q101: Should class subobjects be ptrs to freestore allocated objs, or contained?
        <br>Q102: What are relative costs of the 3 performance hits of allocated subobjects?
        <br>Q103: What is an `inline virtual member fn'? Are they ever actually `inlined'?
        <br>Q104: Sounds like I should never use reference semantics, right?
        <br>Q105: Does the poor performance of ref semantics mean I should pass-by-value?
        <br>
        <br>PART16 -- Linkage-to/relationship-with C
        <br>Q106: How can I call a C function `f()' from C++ code?
        <br>Q107: How can I create a C++ function `f()' that is callable by my C code?
        <br>Q108: Why's the linker giving errors for C/C++ fns being called from C++/C fns?
        <br>Q109: How can I pass an object of a C++ class to/from a C function?
        <br>Q110: Can my C function access data in an object of a C++ class?
        <br>Q111: Why do I feel like I'm `further from the machine' in C++ as opposed to C?
        <br>
        <br>PART17 -- Pointers to member functions
        <br>Q112: What is the type of `ptr-to-member-fn'? Is it diffn't from `ptr-to-fn'?
        <br>Q113: How can I ensure `X's objects are only created with new, not on the stack?
        <br>Q114: How do I pass a ptr to member fn to a signal handler,X event callback,etc?
        <br>Q115: Why am I having trouble taking the address of a C++ function?
        <br>Q116: How do I declare an array of pointers to member functions?
        <br>
        <br>PART18 -- Container classes and templates
        <br>Q117: How can I insert/access/change elements from a linked list/hashtable/etc?
        <br>Q118: What's the idea behind `templates'?
        <br>Q119: What's the syntax / semantics for a `function template'?
        <br>Q120: What's the syntax / semantics for a `class template'?
        <br>Q121: What is a `parameterized type'?
        <br>Q122: What is `genericity'?
        <br>Q123: How can I fake templates if I don't have a compiler that supports them?
        <br>
        <br>PART19 -- Nuances of particular implementations
        <br>Q124: Why don't variable arg lists work for C++ on a Sun SPARCstation?
        <br>Q125: GNU C++ (g++) produces big executables for tiny programs; Why?
        <br>Q126: Is there a yacc-able C++ grammar?
        <br>Q127: What is C++ 1.2? 2.0? 2.1? 3.0?
        <br>Q128: How does the lang accepted by cfront 3.0 differ from that accepted by 2.1?
        <br>Q129: Why are exceptions going to be implemented after templates? Why not both?
        <br>Q130: What was C++ 1.xx, and how is it different from the current C++ language?
        <br>
        <br>PART20 -- Miscellaneous technical and environmental issues
        <br>Miscellaneous technical issues:
        <br>Q131: Why are classes with static data members getting linker errors?
        <br>Q132: What's the difference between the keywords struct and class?
        <br>Q133: Why can't I overload a function by its return type?
        <br>Q134: What is `persistence'? What is a `persistent object'?
        <br>Miscellaneous environmental issues:
        <br>Q135: Is there a TeX or LaTeX macro that fixes the spacing on `C++'?
        <br>Q136: Where can I access C++2LaTeX, a LaTeX pretty printer for C++ source?
        <br>Q137: Where can I access `tgrind', a pretty printer for C++/C/etc source?
        <br>Q138: Is there a C++-mode for GNU emacs? If so, where can I get it?
        <br>Q139: What is `InterViews'?
        <br>Q140: Where can I get OS-specific questions answered (ex:BC++,DOS,Windows,etc)?
        <br>Q141: Why does my DOS C++ program says `Sorry: floating point code not linked'?
        <br>
    </blockquote>
    <br>Hope this helps.
    <br>
</div>