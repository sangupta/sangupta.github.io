---
layout: post
title: Excel - NetWorkDays custom function
permalink: /tech/excel-networkdays-custom-function.html
redirect_from: "/2008/02/excel-networkdays-custom-function.html"
date: Wed Feb 06 13:30:00 IST 2008
sharingURL: http://blog.sangupta.com/2008/02/excel-networkdays-custom-function.html
tags: coding-techniques
---

Business computations always involve the computation of Net-Work days, and if you are using Excel, you immediately find a solution in 
<i>NetworkDays</i> function. I have myself used it extensively in my computational work. But, for reasons best known to Microsoft, they have kept this function as part of Analysis Toolpack add-in. Well, to makes obviously no difference as the addin is a part of standard Office shipment. But, when you are developing a spreadsheet to be used by many, you are not very sure whether they have the addin installed/active.
<br>
<br>Adding a check for its presence is definitely a good idea, but depending on the 
<i>Analysis ToolPack</i> just for 
<i>NetworkDays</i> functionality is not worth it, atleast in my purview. Here is the code of a custom function that does the same for you, and in cases, can remove your dependency on ATP.
<p></p>
<pre class="brush: vb">Public Function MyNetWorkDays(ByVal startDate As Date, ByVal endDate As Date, Optional ByVal holidays As range = Nothing) As Integer<br>Dim diff As Integer, weeks As Integer, ed As Integer, sd As Integer, delta As Integer<br>Dim swap As Boolean<br>swap = False<br>MyNetWorkDays = 0: delta = 0<br><br>If endDate &lt; startDate Then<br>'swap the dates<br>Dim temp As Date<br>temp = endDate<br>endDate = startDate<br>startDate = temp<br>swap = True<br>End If<br><br>diff = endDate - startDate<br>ed = Weekday(endDate)<br>sd = Weekday(startDate)<br>weeks = diff \ 7<br><br>If ed = sd Then<br>If Not (ed = 1 Or ed = 7) Then<br>delta = 1<br>End If<br>ElseIf ed &gt; sd Then<br>If ed = 7 Then ed = 6<br>If sd = 1 Then sd = 2<br>delta = ed - sd + 1<br>Else<br>delta = 7 - (sd - ed) - 1<br>End If<br>MyNetWorkDays = (weeks * 5) + delta<br><br>' check for holidays<br>If Not holidays Is Nothing Then<br>For Each holiday In holidays<br>wh = Weekday(holiday)<br>If wh = 1 Or wh = 7 Then<br><br>Else<br>If startDate &lt;= holiday And holiday &lt;= endDate Then<br>MyNetWorkDays = MyNetWorkDays - 1<br>End If<br>End If<br>Next<br>End If<br><br>If swap Then<br>MyNetWorkDays = 0 - MyNetWorkDays<br>End If<br>End Function<br></pre>
<p>Hope this helps.</p>
