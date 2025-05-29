---
title: Illegal override of FlexModuleFactory in mx.core.FlexModuleFactory.
date: 05 Aug 2010
tags: 
- adobe-air
- coding-techniques
alias:
- /tech/illegal-override-of-flexmodulefactory.html
- /2010/08/illegal-override-of-flexmodulefactory.html
---

Upon merging the recent branch of my current Flex/AIR project to the main line, I received 
the following runtime error:

> VerifyError: Error #1053: Illegal override of FlexModuleFactory in mx.core.FlexModuleFactory.

<!-- break here -->

I went back and double checked the compilation settings for the project, the Flex SDK, the AIR 
SDK, third-party libs that are being used. All the same. Clean building the project didn't help 
either. Not to waste time I put some debug points in my code and realized the origination of the 
error to the Flex 3 compiled CSS/SWF that the code was trying to load.

`StyleManager.loadStyleDeclarations` Loading a stylesheet compiled with Flex 3 (probably via Flex 
Builder) throws this error. Simply, recompile your CSS/SWF again, and you should be good to go.