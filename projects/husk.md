---
layout: project
title: Husk
github: husk
---

Java-based implementations of a bare-bone shell that uses **consoles** to run in multiple
modes.

### Aim

* A bare-bone shell that provides basic infrastructure to build powerful command-line tools

### WARNING 

This library is in very nascent stage and should NOT be used.

### Usage

Using `husk` is as easy as,

```java
public static void main(String[] args) {
	HuskShell huskShell = new HuskShell();
	
	huskShell.initialize();
	huskShell.loadExternalCommands("com.example.mytool.commands");
	huskShell.start();

	// we are done running the husk shell
	// shut the shell down
	huskShell.stop();
}
```

where `com.example.mytool.commands` is the base package root where all your commands are stored. Implementing
a command will need the class to implement the **HuskShellCommand** interface.

Easy, yeah!

### License

The library is released under the terms of **Apache Public License Version 2**.
