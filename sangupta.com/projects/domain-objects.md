---
layout: default
title: Domain Objects
github: domain-objects
maven: true
---

Contract and implementations for common-useful domain objects

domain-objects provide a useful bundle of commonly used domain objects, and some interface contracts that domain 
objects can implement to allow for objects to be passed between different components and services. These contracts 
are also used to implement interceptors for say updating the timestamp whenever an object is persisted into a data 
store.

### Whats In There?

- Domain objects for Emails
  - 
- Domain objects regarding images
- Contract for a given timeline of events
  - `Timeline` : contr
- Generic contracts
  - `LastUpdateEntity` : contract for any domain object that stores the last updated time. This interface can then
  be used by various back-end services to autoupdate such domain objects whenever they are modified - such as data
  store interceptors
  - `LastUpdateUserEntity`: contract for any domain object that stores the last updated time as well as the user who
  last updated this domain object. This interface can then   be used by various back-end services to autoupdate such 
  domain objects whenever they are modified - such as data store interceptors

### License

The library is released under the terms of **Apache Public License Version 2**.
