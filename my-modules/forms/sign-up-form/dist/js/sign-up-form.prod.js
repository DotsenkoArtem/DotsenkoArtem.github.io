"use strict";for(var formGroupPasses=document.querySelectorAll(".form__group_pass"),_loop=function(e){var s=formGroupPasses[e].querySelector(".show-pass"),t=formGroupPasses[e].querySelector('input[type="password"]');s.addEventListener("click",function(){"password"==t.type?(t.type="text",s.classList.add("shown")):(t.type="password",s.classList.remove("shown"))})},i=0;i<formGroupPasses.length;i++)_loop(i);for(var forms=document.forms,_loop2=function(e){for(var a=forms[e],s=a.querySelector('[type="submit"]'),n=a.userPass,o=a.userPassReplay,l=o.parentElement.querySelector(".show-pass"),t=0;t<a.elements.length;t++)a.elements[t].classList.contains("form__control")&&function(){var e=a.elements[t];e.addEventListener("focus",r),e.addEventListener("input",function(){o.value&&(o.parentElement.classList.remove("error"),o.parentElement.classList.add("valid")),e.value?(e.parentElement.classList.remove("focused"),e.parentElement.classList.add("valid")):e.parentElement.classList.remove("valid")}),e.addEventListener("blur",i)}();function r(){this.parentElement.classList.contains("error")||this.parentElement.classList.add("focused")}function i(){this.parentElement.classList.remove("focused")}s.addEventListener("click",function(e){for(var s=a.querySelectorAll("[required]"),t=0,r=0;r<s.length;r++){if(s[r].validity.valid&&t++,t==s.length){if(e.preventDefault(),!n.value||!o.value)return void alert("Поля формы не заполнены!");n.value!==o.value?setTimeout(function(){o.parentElement.classList.remove("valid"),o.parentElement.classList.add("error"),o.type="text",l.classList.add("shown"),alert("Демонстрация ошибки. Форма не отправляется.")},1e3):(alert("Успешно! Форма не отправляется."),window.location="#")}}})},_i=0;_i<forms.length;_i++)_loop2(_i);