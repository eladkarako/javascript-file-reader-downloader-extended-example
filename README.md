<a href="https://paypal.me/e1adkarak0/5">buy me a coffee ☕︎</a>.  

see live demo using https://eladkarako.github.io/javascript-file-reader-downloader-extended-example/index.html  

<h1>Reader1</h1>

A basic example,  
a user selects a file from his/hers operation-system,  
the client-side reads it in the same thread (big files will freeze the UI),  
the content is displayed on the page,  
a button is availble for saving the file back the the operation-system.

the project uses simple github-pages,  
and saves some GitHub's processing by disabling Jekyll with <code>.nojekyll</code>, and setting all text-files (html, js, css, md) to have Windows-End-Of-Line character (this allows safely using one line comments in javascript).


Note1: file is read as binary-string and "converted" to normal (UTF-8 no BOM) capable string with a small trick.  
Note2: CSS :before{..... content:attr(data-info);} is used for displaying other information, along with a trick to support multiline.  
Note3: the textual content is avoided from being displayed in textarea or ContentEditable element due to support displaying large data without making it trigger spell-check or other textarea related browser sub-procedure.
Note4: the saving of the textual-content back to the operation system is done efficiently, a reference to the text-content is created as "blob", modified into a File, and put as a reference of a temporary A-element, with 'download' attribute and explicit-type of 'octet/stream'. The HTML include an initial "HEADER" of "nosniff" (through meta X-Content-Type-Options tag) which improve forcing "types" of files. 
Note5: no actual manipulation was done to the textual-content. "Converting" it to UTF-8 shouldn't modify it.


How to improve this based:
improve1: handle reading in another thread (through worker).
improve2: pass just the reference of the data to the main thread (context) - this only applied to byte-arrays or buffers, so we need to avoid read-as-binary-string.
improve3: better support <kbd>CTRL</kbd>+<kbd>A</kbd>.
improve4: easy switch to editable mode and back by adding removing 'contentEditable="true"' attribute of the content-holder.
improve5: provide visual progress-bar.
improve6: provide simple manipulation of encoding through text-encoding/text-decoding, and end-of-line symbols.
improve7: save text as picture by writing it onto a canvas.
improve8: support print (a css for printing should be loaded and it will hide the controls and leave just the text).

Applications:
1-base64 encoder of any file (was done somewhat already).
2-multiple application can be created by parsing binary files in various formats into a displayable text, such as router-settings or android.manifest, or even doc/docx using unzip and reading the content.
3-support downloading zipped content.
4-encode/decode based on various algorithms.


