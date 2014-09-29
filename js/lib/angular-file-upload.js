(function(){var a=angular.module("angularFileUpload",[]);a.service("$upload",["$http","$q","$timeout",function(b,d,e){function c(f){f.method=f.method||"POST";f.headers=f.headers||{};f.transformRequest=f.transformRequest||function(j,i){if(window.ArrayBuffer&&j instanceof window.ArrayBuffer){return j}return b.defaults.transformRequest[0](j,i)};var h=d.defer();if(window.XMLHttpRequest.__isShim){f.headers.__setXHR_=function(){return function(i){if(!i){return}f.__XHR=i;f.xhrFn&&f.xhrFn(i);i.upload.addEventListener("progress",function(j){h.notify(j)},false);i.upload.addEventListener("load",function(j){if(j.lengthComputable){h.notify(j)}},false)}}}b(f).then(function(i){h.resolve(i)},function(i){h.reject(i)},function(i){h.notify(i)});var g=h.promise;g.success=function(i){g.then(function(j){i(j.data,j.status,j.headers,f)});return g};g.error=function(i){g.then(null,function(j){i(j.data,j.status,j.headers,f)});return g};g.progress=function(i){g.then(null,null,function(j){i(j)});return g};g.abort=function(){if(f.__XHR){e(function(){f.__XHR.abort()})}return g};g.xhr=function(i){f.xhrFn=(function(j){return function(){j&&j.apply(g,arguments);i.apply(g,arguments)}})(f.xhrFn);return g};return g}this.upload=function(f){f.headers=f.headers||{};f.headers["Content-Type"]=undefined;f.transformRequest=f.transformRequest||b.defaults.transformRequest;var g=new FormData();var i=f.transformRequest;var h=f.data;f.transformRequest=function(q,k){if(h){if(f.formDataAppender){for(var p in h){var j=h[p];f.formDataAppender(q,p,j)}}else{for(var p in h){var j=h[p];if(typeof i=="function"){j=i(j,k)}else{for(var m=0;m<i.length;m++){var n=i[m];if(typeof n=="function"){j=n(j,k)}}}q.append(p,j)}}}if(f.file!=null){var o=f.fileFormDataName||"file";if(Object.prototype.toString.call(f.file)==="[object Array]"){var l=Object.prototype.toString.call(o)==="[object String]";for(var m=0;m<f.file.length;m++){q.append(l?o:o[m],f.file[m],(f.fileName&&f.fileName[m])||f.file[m].name)}}else{q.append(o,f.file,f.fileName||f.file.name)}}return q};f.data=g;return c(f)};this.http=function(f){return c(f)}}]);a.directive("ngFileSelect",["$parse","$timeout",function(c,b){return function(d,e,f){var g=c(f.ngFileSelect);if(e[0].tagName.toLowerCase()!=="input"||(e.attr("type")&&e.attr("type").toLowerCase())!=="file"){var j=angular.element('<input type="file">');for(var h=0;h<e[0].attributes.length;h++){j.attr(e[0].attributes[h].name,e[0].attributes[h].value)}if(f.multiple){j.attr("multiple","true")}j.css("top",0).css("bottom",0).css("left",0).css("right",0).css("width","100%").css("opacity",0).css("position","absolute").css("filter","alpha(opacity=0)");e.append(j);if(j.parent()[0]!=e[0]){e.wrap("<span>");e.css("z-index","-1000");e.parent().append(j);e=e.parent()}if(e.css("position")===""||e.css("position")==="static"){e.css("position","relative")}e=j}e.bind("change",function(k){var m=[],l,n;l=k.__files_||k.target.files;if(l!=null){for(n=0;n<l.length;n++){m.push(l.item(n))}}b(function(){g(d,{$files:m,$event:k})})})}}]);a.directive("ngFileDropAvailable",["$parse","$timeout",function(c,b){return function(e,d,f){if("draggable" in document.createElement("span")){var g=c(f.ngFileDropAvailable);b(function(){g(e)})}}}]);a.directive("ngFileDrop",["$parse","$timeout","$location",function(b,d,c){return function(e,f,i){if("draggable" in document.createElement("span")){var m=null;f[0].addEventListener("dragover",function(o){o.preventDefault();d.cancel(m);if(!f[0].__drag_over_class_){if(i.ngFileDragOverClass&&i.ngFileDragOverClass.search(/\) *$/)>-1){var n=b(i.ngFileDragOverClass)(e,{$event:o});f[0].__drag_over_class_=n}else{f[0].__drag_over_class_=i.ngFileDragOverClass||"dragover"}}f.addClass(f[0].__drag_over_class_)},false);f[0].addEventListener("dragenter",function(n){n.preventDefault()},false);f[0].addEventListener("dragleave",function(n){m=d(function(){f.removeClass(f[0].__drag_over_class_);f[0].__drag_over_class_=null},i.ngFileDragOverDelay||1)},false);var j=b(i.ngFileDrop);f[0].addEventListener("drop",function(n){n.preventDefault();f.removeClass(f[0].__drag_over_class_);f[0].__drag_over_class_=null;l(n,function(o){j(e,{$files:o,$event:n})})},false);function k(n){return/^[\000-\177]*$/.test(n)}function l(s,q){var t=[],p=s.dataTransfer.items;if(p&&p.length>0&&p[0].webkitGetAsEntry&&c.protocol()!="file"&&p[0].webkitGetAsEntry().isDirectory){for(var r=0;r<p.length;r++){var n=p[r].webkitGetAsEntry();if(n!=null){if(k(n.name)){h(t,n)}else{if(!p[r].webkitGetAsEntry().isDirectory){t.push(p[r].getAsFile())}}}}}else{var o=s.dataTransfer.files;if(o!=null){for(var r=0;r<o.length;r++){t.push(o.item(r))}}}(function u(v){d(function(){if(!g){q(t)}else{u(10)}},v||0)})()}var g=0;function h(p,o,q){if(o!=null){if(o.isDirectory){var n=o.createReader();g++;n.readEntries(function(s){for(var r=0;r<s.length;r++){h(p,s[r],(q?q:"")+o.name+"/")}g--})}else{g++;o.file(function(r){g--;r._relativePath=(q?q:"")+r.name;p.push(r)})}}}}}}])})();