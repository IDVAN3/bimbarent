/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};

// function setcookie(a, b, c) {
//   if (c) {
//     let d = new Date();
//     d.setDate(d.getDate() + c);
//   }
//   if (a && b) {
//     document.cookie = a + '=' + b + (c ? '; expires=' + d.toUTCString() : '');
//   }
//   else {
//     return false;
//   }
// }

// function getcookie(a) {
//   let b = new RegExp(a + '=([^;]){1,}');
//   let c = b.exec(document.cookie);
//   if (c) c = c[0].split('=');
//   else {
//     return false; return c[1] ? c[1] : false;
//   }
// }

// setcookie("block", "yes", 10) //Cтавим кук (10 - число действующих дней

// let block = getcookie("user");
// if (block != "yes") {
  
// }
// else {
//   $("#errorbody").show("fast");
// }


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let block = getCookie("user");

if (block == "yes") {
  $('.cookie').hide();
}
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}


function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

$('.cookie-btn').click(function(event) {
  event.preventDefault();
  setCookie("user", "yes", 10)
  
  $('.cookie').hide();
})
/******/ })()
;