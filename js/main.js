
'use strict'
$(document).ready(function () {

    /* === IBG === */

    function ibg() {
        $.each($('.ibg'), function (index, val) {
            if ($(this).find('img').length > 0) {
                let src_img = $(this).find('img').attr('src');
                $(this).css('backgroundImage', 'url("' + src_img + '")');
            }
        });
    }

    ibg();

    /* === /IBG === */

    /* === POPUP === */

    let unlock = true;
      const timeout = 200;
      const body = document.querySelector("body");
      const lockPadding = document.querySelectorAll(".lock-padding");
      
      function bodyLock() {
        const lockPaddingValue =
          window.innerWidth - document.querySelector("body").offsetWidth + "px";
        if (lockPadding.length > 0) {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
          }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock");
      
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }
      
      function bodyUnlock() {
        setTimeout(function () {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = "0px";
          }
          body.style.paddingRight = "0px";
          body.classList.remove("lock");
        }, timeout);
      
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }

    function openPopup(id) {
        bodyLock(); 
        $(`.js-popup[data-id-popup='${id}']`).fadeIn(300);
      }
      
      function closePopup() {
        bodyUnlock();
        $(".js-popup").fadeOut(300);
      }
      
      $(".js-popup__close").click(closePopup);
      
      $(".js-btn-popup").click(function (e) {
        e.preventDefault();
        let indexBtnPopup = $(this).attr("href");

        openPopup(indexBtnPopup);
      });
      
      $(".js-popup").click(function (e) {
        let popup = $(".js-popup__wrapp");
        
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
          closePopup();
        }
      });

      /* === /POPUP === */


      /* === ACCORDION === */

      $(".faq__body-link").click(function(e) {
        e.preventDefault(); 
 
      let ths = $(this);
      let clos = ths.next('.submenu');
      let currentArrow = ths.find($(".icon-arrow"));

          if(clos.is(":visible")) {
              clos.slideUp(400);
              currentArrow.removeClass('active');
          }
          else {
              $(".icon-arrow").removeClass('active');
              $('.submenu').slideUp(400);
              clos.slideDown(400);
              currentArrow.addClass('active');
          }
      });

    /* === /ACCORDION === */

    /* === SHOW TEXT === */
    $('.link-show-text').click(function(e) {
      e.preventDefault();
      let allText = $(this).closest('.faq__body-show').find('p');
      $(this).slideUp(300);
      allText.addClass('active');
    })
    /* === /SHOW TEXT === */

    /* === SUB MENU === */
    
    $('.header__link').click(function(event){
        event.preventDefault(); 
        $(this).closest('.header__wrapper-submenu').find('.header__submenu').toggleClass('active');
    });

    $('.header__submenu-link').click(function(event){ 
      event.preventDefault();
      $(this).closest('ul').find('.header__submenu-link').removeClass('active');
      $(this).addClass('active');

      let elemLanguage = $(this).attr('data-language-word');
      let headerValueItem = $('.header__value span');
      let dataValueList =  $(this).closest('.header__submenu-list').attr('data-value-list');

      headerValueItem.each(function() {
        if($(this).attr('data-language') == elemLanguage) {
          $(this).addClass('active');
        }
        else {
            console.log($(this).parent().attr('data-value'))
            if ($(this).parent().attr('data-value') == dataValueList) {
              $(this).removeClass('active');
            }
          
        }
      })
    });
    /* === /SUB MENU === */

});
/*кнопка прокрутки вверх*/

const offset = 100;
const scrollUp = document.querySelector('.js-scroll-up');
const scrollUpSvgPath = document.querySelector('.js-scroll-up__path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = '\'' + pathLength + pathLength + '\'';
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

// getTop
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

//updateDashoffset

const updateDashoffset = () => {
    const heigth = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / heigth);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
}

// onScroll
window.addEventListener('scroll', () => {
    updateDashoffset();
    getTop() > offset ? scrollUp.classList.add('scroll-up_active') : scrollUp.classList.remove('scroll-up_active');
});

// click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

/*скрол по якорю*/