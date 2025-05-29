---
title: Authorization header in Google Buzz OAuth
date: 26 May 2010
alias:
- /tech/authorization-header-in-google-buzz.html
- /2010/05/authorization-header-in-google-buzz.html
---

While working on an Actionscript wrapper for 
<a href="http://code.google.com/apis/buzz">Google Buzz APIs</a>, I hit a road block 
while authenticating via OAuth. It seems the OAuth header used when making authenticating 
requests to other Google APIs does not work when sending to Google Buzz API. Here is a 
sample of the Authorization header that I used to make it work.

<!-- break here -->

```
Authorization: OAuth oauth_consumer_key=anonymous,oauth_version=1.0,oauth_signature_method=HMAC- SHA1,oauth_token=MY_TOKEN,oauth_nonce=D8CE99A1-B346-9474-1469-D4F370F76F37,oauth_signature=MY_SIGNATURE,oauth_timestamp=1274883043,oauth_ callback=oob
```

Just wrap all request parameters with the word "OAuth " (note the leading space, without the quotes) 
as comma separated values. In your Flex/AIR code just use it as, 

```actionscript
request.requestHeaders.push(new URLRequestHeader('Authorization', constructedHeader));
```

I will soon be making the code to the library public.

Keep Watching!