---
title: Test Hogan.JS template online
layout: default
---

### Hogan.JS Test-Bed

This tool helps you to test `hogan.js` templates online by merging the JSON data with your template
and shows the preview.

<textarea placeholder="Template code" rows="10" cols="50" id="hoganTemplate" style="margin-right: 20px;"></textarea>
<textarea placeholder="JSON data" rows="10" cols="50" id="jsonData"></textarea>

<a class="btn btn-info" href="#" onclick="formatJSON(); return false;">Format JSON</a>
<a class="btn btn-success" href="#" onclick="mergeHoganTemplate(); return false;">Merge via Hogan.JS</a>

<iframe id="hoganFrame" style="width: 100%; height: 100%; border: 1px solid;"></iframe>
