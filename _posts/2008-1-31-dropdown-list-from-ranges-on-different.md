---
layout: default
title: Dropdown list from ranges on different sheets - Excel
permalink: /2008/01/dropdown-list-from-ranges-on-different.html
redirect_from: "/2008/01/dropdown-list-from-ranges-on-different.html"
date: Thu Jan 31 14:30:00 IST 2008
sharingURL: http://blog.sangupta.com/2008/01/dropdown-list-from-ranges-on-different.html
tags: coding-techniques
---
As the title indicates, the post is all about creating a drop down list in Excel from ranges on different sheets. How is this tricky? Well, first excel allows you to use a single list as a dropdown for cell validation. Second, UNION is not permitted between ranges. Third, a collection can not be used for data validation. Fourth, no custom function/method from VBA can be invoked in the cell validation formula. So this complicates the matter a bit.
<br>
<br>I recently had to achieve this, so as to self-audit the entries. This particularly comes in handy when one is trying to link entries across multiple sheets to a single ID. 
<br>
<br>Say we have two ranges called 
<i>One</i> and 
<i>Two</i> which occur in sheets 
<i>Sheet2</i> and 
<i>Sheet3</i>. We want to create a drop down in 
<i>Sheet1</i> with all values from the two ranges in cells 
<i>A1:A10</i>. You would need to create a formula in a surrogate cell (say 
<i>B2</i> of 
<i>Sheet1</i>) as 
<b>=createdropdown(A1:A10,One,Two)</b>. The following code is used to achieve the feat.
<p></p>
<pre class="brush: vb">Public Function mergeRange(ByVal range1 As Range, ByVal range2 As Range) As Collection<br>Dim resultSet As New Collection<br>For Each iCell In range1<br>If Not IsEmpty(iCell.Value) Then<br>resultSet.Add (iCell.Value)<br>End If<br>Next<br>For Each iCell In range2<br>If Not IsEmpty(iCell.Value) Then<br>resultSet.Add (iCell.Value)<br>End If<br>Next<br>Set mergeRange = resultSet<br>End Function<br><br>Public Function createDropDown(ByVal cells As Range, ByVal range1 As Range, ByVal range2 As Range) As Boolean<br>Dim intIndex As Long<br>Dim strContent As String<br>Dim items As Collection<br>Set items = mergeRange(range1, range2)<br>'build the string to pass to the dropdown<br>For Each Item In items<br>strContent = strContent &amp; "," &amp; Item<br>Next<br><br>'build dropdown<br>With cells.Validation<br>.Delete<br>.Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:=xlBetween, Formula1:=strContent<br>.IgnoreBlank = True<br>.InCellDropdown = True<br>.InputTitle = "Select a value"<br>.ErrorTitle = "You entered a wrong value!"<br>.InputMessage = "Please select an item from the list!"<br>.ErrorMessage = "Valid values are from the list only!"<br>.ShowInput = True<br>.ShowError = True<br>End With<br>createDropDown = True<br>End Function</pre>
<p>The code is pretty self-explanatory. We use a custom function mergeRange to build a collection of all non-NULL values from the two ranges, and then apply the data validation to cells required using VBA. <br><br>It took time to reach the solution with my minimal knowledge of Excel DOM - but it was worth a try.<br><br>Hope this helps.</p>
