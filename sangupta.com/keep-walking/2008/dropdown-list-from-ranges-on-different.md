---
title: Dropdown list from ranges on different sheets - Excel
date: 31 Jan 2008
tags: 
- coding-techniques
alias:
- /tech/dropdown-list-from-ranges-on-different.html
- /2008/01/dropdown-list-from-ranges-on-different.html
---

As the title indicates, the post is all about creating a drop down list in Excel 
from ranges on different sheets. How is this tricky? Well, first excel allows you 
to use a single list as a dropdown for cell validation. Second, UNION is not permitted 
between ranges. Third, a collection can not be used for data validation. Fourth, no 
custom function/method from VBA can be invoked in the cell validation formula. So 
this complicates the matter a bit.

<!-- break here -->

I recently had to achieve this, so as to self-audit the entries. This particularly 
comes in handy when one is trying to link entries across multiple sheets to a single ID. 

Say we have two ranges called `One` and `Two` which occur in sheets `Sheet2` and 
`Sheet3`. We want to create a drop down in `Sheet1` with all values from the two 
ranges in cells `A1:A10`. You would need to create a formula in a surrogate cell (say 
`B2` of `Sheet1`) as `=createdropdown(A1:A10,One,Two)`. The following code is used 
to achieve the feat.

```vb.net
Public Function mergeRange(ByVal range1 As Range, ByVal range2 As Range) As Collection

	Dim resultSet As New Collection

	For Each iCell In range1
		If Not IsEmpty(iCell.Value) Then
			resultSet.Add (iCell.Value)
		End If
	Next

	For Each iCell In range2
		If Not IsEmpty(iCell.Value) Then
			resultSet.Add (iCell.Value)
		End If
	Next

	Set mergeRange = resultSet

End Function
 
Public Function createDropDown(ByVal cells As Range, ByVal range1 As Range, ByVal range2 As Range) As Boolean

	Dim intIndex As Long
	Dim strContent As String
	Dim items As Collection

	Set items = mergeRange(range1, range2)

	'build the string to pass to the dropdown
	For Each Item In items
		strContent = strContent & "," & Item
	Next
 
	'build dropdown
	With cells.Validation
		.Delete
		.Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:=xlBetween, Formula1:=strContent
		.IgnoreBlank = True
		.InCellDropdown = True
		.InputTitle = "Select a value"
		.ErrorTitle = "You entered a wrong value!"
		.InputMessage = "Please select an item from the list!"
		.ErrorMessage = "Valid values are from the list only!"
		.ShowInput = True
		.ShowError = True
	End With

	createDropDown = True
	
End Function
```

The code is pretty self-explanatory. We use a custom function mergeRange to 
build a collection of all non-NULL values from the two ranges, and then apply 
the data validation to cells required using VBA.

It took time to reach the solution with my minimal knowledge of Excel DOM - but 
it was worth a try.

Hope this helps.