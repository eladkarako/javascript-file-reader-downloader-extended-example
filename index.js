"use strict";
var human_readable_bytes_size = function(bytes){var description=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],factor=Math.floor((String(bytes).length-1)/3);bytes=bytes/Math.pow(1024,factor);bytes=Math.floor(bytes*100)/100;return(String(bytes)+description[factor]);}
   ,input_file
   ,content_holder
   ,save_button
   ,read_done_date
   ,save_filename
   ;


function click_handler(){
  var text, blob, file, url, a;
  //convert a text to blob (memory reference) - to file (a fancier blob with filename and mod.date) - to "object url", compatible with <A>-HREF.
  text = content_holder.innerText;
  blob = new Blob([text],{type:"text/plain"});                          
  file = new File([blob], save_filename, {"LastModified": read_done_date});  //alternative to:   blob.lastModifiedDate=new Date(); blob.name="file.txt";
  url = self.URL.createObjectURL(file); //blob
  
  a = document.createElement("a");
  a.style.cssText = "display:none;";
  a.setAttribute("download", save_filename);
  a.setAttribute("type", "octet/stream"); //trick to force download instead of opening in new-tab.
  a.href = url;
  document.querySelector("body").appendChild(a);
  a.click();

  //cleanup
  document.querySelector("body").removeChild(a);
  self.URL.revokeObjectURL(url);
  file = undefined;
  blob = undefined;
}


function change_handler(){
  var file, info, file_reader;
  if(0 === input_file.files.length) return;

  input_file.disabled = true;
  input_file.onchange = undefined;

  file = input_file.files[0];
  info = "reading:  "
       + "\r\n  File-Name:     " + file.name
       + "\r\n  File-Size:     " + human_readable_bytes_size(file.size)
       + "\r\n  Last-Modified: " + file.lastModifiedDate.toLocaleString()
       + "\r\n"
       ;

  content_holder.setAttribute("data-info", info + "\r\nProgress: 0%");
  file_reader = new FileReader();
  file_reader.onprogress = function(data){
                             if(false === data.lengthComputable) return;
                             content_holder.innerText = "";
                             content_holder.setAttribute("data-info", info + "\r\nProgress: " + ((data.loaded / data.total) * 100).toFixed(0) + "%");
                           };
  file_reader.onerror    = function(){
                             content_holder.innerText = "";
                             content_holder.setAttribute("data-info", info + "\r\n[READ ERROR]");
                           };
  file_reader.onload     = function(){
                             content_holder.setAttribute("data-info", "");
                             content_holder.innerText = decodeURIComponent(escape(  file_reader.result ));
                             read_done_date = new Date();
                             save_filename  = "file_" + String(read_done_date.getFullYear()) + ("00"+String(read_done_date.getMonth()+1)).substr(-2) + ("00"+String(read_done_date.getDate())).substr(-2) + ".txt"
                             save_button.setAttribute("data-info", "Save [" + save_filename + "]");
                             save_button.disabled = false;
                           };
  file_reader.readAsBinaryString(file);
}


function load_handler(){
  input_file     = self.document.querySelector('input[type="file"]');
  content_holder = self.document.querySelector("div");
  save_button    = self.document.querySelector("button");

  content_holder.setAttribute("data-info", "(Click The Button Above - Content Will Be In-Here...)");
  input_file.disabled = false;
    
  input_file.onchange = change_handler;
  save_button.onclick = click_handler;
  
  self.onload = undefined;
}


self.onload = load_handler;
