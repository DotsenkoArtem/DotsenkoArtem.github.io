"use strict";for(var tabsBoxes=document.querySelectorAll(".tabs-wrap"),_loop=function(e){for(var n=tabsBoxes[e].querySelectorAll(".tabs__item"),c=tabsBoxes[e].querySelector(".tabs-content"),l=c.querySelectorAll(".tabs-content__item"),t=0;t<n.length;t++){n[t].addEventListener("click",function(){for(var e=0;e<n.length;e++)n[e].classList.remove("active");var t="#"+this.dataset.target;this.classList.add("active");for(var o=0;o<l.length;o++)l[o].classList.remove("active");c.querySelector(t).classList.add("active")})}},i=0;i<tabsBoxes.length;i++)_loop(i);for(var copyBtns=document.getElementsByClassName("code-copy-btn"),_loop2=function(e){var n=copyBtns[e];n.addEventListener("click",function(e){var t=e.clientX,o=e.clientY;copyToClipboard(n,t,o)})},_i=0;_i<copyBtns.length;_i++)_loop2(_i);function copyToClipboard(e,t,o){var n=document.getElementById(e.dataset.target).innerText,c=document.createElement("textarea");c.value=n,c.setAttribute("readonly",""),c.style.position="absolute",c.style.left="-9999px",document.body.appendChild(c),c.select(),document.execCommand("copy"),document.body.removeChild(c);var l=document.querySelector(".info-iToolTip");l||((l=document.createElement("div")).className="info-iToolTip",l.innerText="Copied",document.body.appendChild(l),document.documentElement.clientWidth>=t+35+l.offsetWidth?l.style.left="".concat(t+35,"px"):(l.style.left="auto",l.style.right="15px"),l.style.top="".concat(o-40,"px"),setTimeout(function(){document.body.removeChild(l)},1500))}