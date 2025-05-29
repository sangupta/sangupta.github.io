---
title: MTP error while connecting device to PC
date: 17 Jan 2011
tags: 
- workarounds
alias:
- /tech/mtp-error-while-connecting-device-to-pc.html
- /2011/01/mtp-error-while-connecting-device-to-pc.html
---

At times when connecting devices to PC one may face an MTP error. To give a little background, 
`MTP` stands for <a href="http://en.wikipedia.org/wiki/Media_Transfer_Protocol">Media Transfer Protocol</a>, 
which essentially has been designed to transfer media (other than photographs) from various 
devices on to the desktop computer. Windows Vista (onwards) directly supports MTP, whereas Windows 
XP needs some custom drivers.

<!-- break here -->

I faced the same today, while syncing my mobile, and found the following solution to work on Windows XP.

<ol>
    <li>Copy <tt>umdf.exe</tt> from <tt>wmp11-windowsxp-x86-enu.exe</tt> to your hard drive. You may use any of the two methods below:<br>
        <ol>
            <li>Download <tt>wmp11-windowsxp-x86-enu.exe</tt> and unpack the executable using <tt>Total Commander</tt></li>
            <li>Start the <tt>wmp11-windowsxp-x86-enu.exe</tt> installation. Once the files have been extracted, go to <tt>%TEMP%</tt> folder, and search for <tt>udmf.exe</tt>.</li>
        </ol></li>
    <li>Rename the folowing files below (just taking a backup of original files):<br>
        <ul>
            <li><tt>REN C:\WINDOWS\system32\drivers\wudfrd.sys wudfrd_backup.sys</tt></li>
            <li><tt>REN C:\WINDOWS\system32\drivers\wudfpf.sys wudfpf_backup.sys</tt></li>
            <li><tt>REN C:\WINDOWS\system32\wudfhost.exe wudfhost_backup.exe</tt></li>
            <li><tt>REN C:\WINDOWS\system32\wudfsvc.dll wudfsvc_backup.dll</tt></li>
            <li><tt>REN C:\WINDOWS\system32\wudfx.dll wudfx_backup.dll</tt></li>
            <li><tt>REN C:\WINDOWS\system32\wudfplatform.dll wudfplatform_backup.dll</tt></li>
            <li><tt>REN C:\WINDOWS\system32\wudfcoinstaller.dll wudfcoinstaller_backup.dll</tt></li>
        </ul></li>
    <li>Start the installation of <tt>umdf.exe</tt>. After it's finished, (just to be sure) restart your computer.</li>
    <li>Connect your phone and Enjoy!</li>
</ol>

As for the reason for the error cropping up, the installer CD released by the mobile had some corrupted files :)

Hope this helps.