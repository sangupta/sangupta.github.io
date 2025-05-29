---
title: Excel - NetWorkDays custom function
date: 06 Feb 2008
tags: 
- coding-techniques
alias:
- /tech/excel-networkdays-custom-function.html
- /2008/02/excel-networkdays-custom-function.html
---

Business computations always involve the computation of Net-Work days, and if 
you are using Excel, you immediately find a solution in `NetworkDays` function. 
I have myself used it extensively in my computational work. But, for reasons 
best known to Microsoft, they have kept this function as part of Analysis Toolpack 
add-in. Well, to makes obviously no difference as the addin is a part of standard 
Office shipment. But, when you are developing a spreadsheet to be used by many, 
you are not very sure whether they have the addin installed/active.

<!-- break here -->

Adding a check for its presence is definitely a good idea, but depending on the 
`Analysis ToolPack` just for `NetworkDays` functionality is not worth it, atleast 
in my purview. Here is the code of a custom function that does the same for you, 
and in cases, can remove your dependency on ATP.

```vb.net
Public Function MyNetWorkDays(ByVal startDate As Date, ByVal endDate As Date, Optional ByVal holidays As range = Nothing) As Integer
	
	Dim diff As Integer, weeks As Integer, ed As Integer, sd As Integer, delta As Integer
	
	Dim swap As Boolean
	
	swap = False
	
	MyNetWorkDays = 0: delta = 0
	 
	If endDate < startDate Then
		'swap the dates
		Dim temp As Date
		temp = endDate
		endDate = startDate
		startDate = temp
		swap = True
	End If
	 
	diff = endDate - startDate
	ed = Weekday(endDate)
	sd = Weekday(startDate)
	weeks = diff \ 7
	 
	If ed = sd Then
		If Not (ed = 1 Or ed = 7) Then
			delta = 1
		End If
	ElseIf ed > sd Then
		If ed = 7 Then ed = 6
		If sd = 1 Then sd = 2
		delta = ed - sd + 1
	Else
		delta = 7 - (sd - ed) - 1
	End If
	
	MyNetWorkDays = (weeks * 5) + delta
	 
	' check for holidays
	If Not holidays Is Nothing Then
		For Each holiday In holidays
			wh = Weekday(holiday)
			If wh = 1 Or wh = 7 Then
	 
			Else
				If startDate <= holiday And holiday <= endDate Then
					MyNetWorkDays = MyNetWorkDays - 1
				End If
			End If
		Next
	End If
	 
	If swap Then
		MyNetWorkDays = 0 - MyNetWorkDays
	End If
	
End Function
```

Hope this helps!