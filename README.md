silentSelect
============

A QlikView document extension to pass in selections silently via URL #-hash fragments

When your QVW is included into another web application via IFRAME for instance, every change to the IFRAME's URL will cause a full reload of its content.
To avoid such a full load, this extension checks for changes to the URL fragment part and interpretes it as selection in a certain listbox object.


Example:
========

<code>
http://localhost/QvAJAXZfc/opendoc.htm?document=silentselect_demo.qvw&anonymous=true#LB01=B;C
</code>

will select the values B and C in LB01

See a live demo at http://www.dijit.de/qlikview-extensions/silent-select-extension-document-extension/
