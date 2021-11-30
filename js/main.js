
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
      const timeout = 300;
      const body = document.querySelector("body");
      const lockPadding = document.querySelectorAll(".lock-padding");
      
      function bodyLock() {
        const lockPaddingValue =
          window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        if (lockPadding.length > 0) {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
          }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock-scroll");
      
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
          body.classList.remove("lock-scroll");
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
      $(this).slideUp(0);
      allText.addClass('active');
    })
    /* === /SHOW TEXT === */

    /* === SUB MENU === */
    
    $('.header__link').click(function(event){
        event.preventDefault(); 
        let container = $(this).closest('.header__wrapper-submenu').find('.header__submenu');
        if(!container.hasClass('active')){
          $('.header__submenu').removeClass('active');
          container.addClass('active');
          if ($(window).width() <= 768 && container.hasClass('header__submenu-kabinet')) {
            $('body').addClass('lock');
            $('.fixed-header-top').addClass('active');
            $('.header').addClass('scroll');
          }
        }
        else {
          container.toggleClass('active');
          if ($(window).width() <= 768 && container.hasClass('header__submenu-kabinet')) {
            $('body').removeClass('lock');
            $('.fixed-header-top').removeClass('active');
            $('.header').removeClass('scroll');
          }
        }  
    });

    $(document).mouseup(function (e) {
      let container = $('.header__submenu');
      if (e.target!=container[0] && !container.has(e.target).length && e.target!=$('.header__link')[0] && $('.header__link').has(e.target).length === 0) {
        container.removeClass('active');
        if ($(window).width() <= 768 && container.hasClass('header__submenu-kabinet')) {
          $('body').removeClass('lock');
          $('.fixed-header-top').removeClass('active');
          $('.header').removeClass('scroll');
        }
      }
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
            if ($(this).parent().attr('data-value') == dataValueList) {
              $(this).removeClass('active');
            }
          
        }
      })
    });

    $('.js-time').click(function(){
      let elemType = $(this).find('.select__body');
      let jsSelectType = $('.js-select-type');
      elemType.each(function() {
        if($(this).attr('data-type') == jsSelectType.attr('data-type-select')) {
          $(this).removeClass('no-active');
        }
        else {
          $(this).addClass('no-active');
        }
      })
      
    })
    /* === /SUB MENU === */

    /* === HEADER === */
    let lastScrollTop = 0;


    let target = $('.income');
    let targetPos = 0;
    if(target.length > 0) {
      console.log(target.length)
      targetPos = target.offset().top;
      
    }
    
    let winHeight = $(window).height();
    let scrollToElem = targetPos - winHeight;
    let booleanItem = false;

    $(window).scroll(function(event){
      let thisScroll = $(this).scrollTop();
    
      
      if (thisScroll > 200) {
        if (thisScroll > lastScrollTop){
          $('.header').addClass('scroll');
        }
        else {
            $('.header').removeClass('scroll');
        }
      }
      else {
        $('.header').removeClass('scroll');
      }
  
      lastScrollTop = thisScroll;




      let winScrollTop = $(this).scrollTop();
      if(winScrollTop > scrollToElem && booleanItem === false){
        $('.message').show(400);
      }
    });
    /* === /HEADER === */

    /* === disabled links === */
    $('.category__link-absent').click( function (event) {
      event.preventDefault()
    })
    /* === /disabled links === */

moment.locale('ru');


    $('input[name="dates"]').daterangepicker({
      autoUpdateInput: false,
      minDate: moment(),
      
      buttonClasses: 'btn-date',
      
      locale: {
        "autoApply": 'true',
        "format": 'DD-MMMM',
          "cancelLabel": 'Сбросить даты',
          "applyLabel": 'Показать <span>105</span> вариантов',
          "monthNames" : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	        "daysOfWeek" : ['вс','пн','вт','ср','чт','пт','сб'],
          "firstDay": 1,  
      },  
      
  });

  $('#date-picker-2').daterangepicker({
    autoUpdateInput: true,
    minDate: moment(),
      maxDate: moment().add(365, 'days'),
      buttonClasses: 'btn-date',
      
      locale: {
        "autoApply": 'true',
        "format": 'DD-MMMM',
          "cancelLabel": 'Сбросить даты',
          "applyLabel": 'Показать <span>105</span> вариантов',
          "monthNames" : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	        "daysOfWeek" : ['вс','пн','вт','ср','чт','пт','сб'],
          "firstDay": 1,  
      },  
    
});

// reset date and region
  $('.btn-date.cancelBtn').click(function(){
    $('.drp-selected').text('Выберите дату');
  })

  $('.js-reset-region').click(function(){
    let currentRegion = $('.select-region.active').find($('.select-wrapper .select__header-left .current-text'));
    let currentCity = $('.select-region.active').find($('.select-wrapper .select__header-right .current-text'));

    currentRegion.text('Выберите регион');
    currentCity.text('Выберите город');
  })



  /* === SLIDERS === */
  
  $('.catalog__filter-slider').slick({
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows: true,
    infinite: false,
    variableWidth: true,
    
    responsive: [{
        breakpoint: 1124,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
        }
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
        }
    }
    ]
})

$('.catalog-content__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  lazyLoad: 'ondemand',
})

$('.catalog__filter-link').click(function(event) {
  event.preventDefault();
  $('.catalog__filter-link').removeClass('active');
  $(this).addClass('active');
});

$(".js-range-slider").ionRangeSlider({
  type: "double", // два инпута
  min: 300,  // минимальное значение
  max: 2000, // максимальное значение
  from: 500, // начальное значение первого 
  to: 1500, // начальное значение второго
  hide_min_max: true, // скрыть минимальные и максимальные значения по бокам
  skin: "none", // скрыть стандартное оформление
  extra_classes: "my-skin", // класс для своих стилей
  force_edges: true, // слайдер внутри контейнера
  drag_interval: true,
});

$(".js-range-slider-2").ionRangeSlider({
  type: "double", // два инпута
  min: 2,  // минимальное значение
  max: 36, // максимальное значение
  from: 5, // начальное значение первого 
  to: 20, // начальное значение второго
  hide_min_max: true, // скрыть минимальные и максимальные значения по бокам
  skin: "none", // скрыть стандартное оформление
  extra_classes: "my-skin", // класс для своих стилей
  force_edges: true, // слайдер внутри контейнера
  drag_interval: true,
});

$('.catalog-hearth').click(function(event) {
  event.preventDefault();
  $(this).toggleClass('active');
})


$(".income-js").slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  responsive: [{
    breakpoint: 769,
    settings: {
        slidesToShow: 1,
    }
}]
});


$(window).on('load resize', function() {
  if ($(window).width() <= 768) {
    $('.rent__body-wrapper:not(.slick-initialized)').slick({
      slidesToShow: 1,
      arrows: false,
      dots: false,
    });
  } else {
    $(".rent__body-wrapper.slick-initialized").slick("unslick");
  }
});

/* === /SLIDERS === */

/* === SELECT === */  
  let selectBlock = $('.select');
  let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle);
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose);
    });

    function selectToggle() {
      if(!$(this).parent().hasClass('is-active')){
        selectBlock.removeClass('is-active');
        this.parentElement.classList.toggle('is-active');
      }
      else {
        selectBlock.removeClass('is-active');
      }
      
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.current-text'),
            currentJq = $(this).closest('.select').find($('.current-text'));
            currentJq.addClass('active');
        currentText.innerText = text;
        select.classList.remove('is-active');
        if(currentJq.hasClass('js-select-type')) {
          currentJq.attr('data-type-select', $(this).closest('.select').find($('.select__item.active')).attr('data-type-select'))
        }
    }

  };


  let container = $(".select__body");
  let header = $(".select__header");

  $(document).mouseup(function (e) {
    
    if (container.has(e.target).length === 0 &&  header.has(e.target).length === 0){
      selectBlock.removeClass('is-active');
    }       
  });

  $('.js-region').click(function(event) {
    event.preventDefault();
    $('.select-region').toggleClass('active');
  })
  $('.select__item').click(function(event) {
    event.preventDefault();
    $('.select__item').removeClass('active');
    $(this).toggleClass('active');
  })
  select();

  
  $(document).mouseup(function (e) {
    let container = $('.select-region');
    if (e.target!=container[0] && !container.has(e.target).length && e.target!=$('.js-region')[0] && $('.js-region').has(e.target).length === 0) {
        container.removeClass('active');
    }
});
  /* === /SELECT === */  
  
  /* === INPUT NUMBER === */  
  $(".wrapper-input-number").each( function() {
    let $quantityArrowMinus = $(this).find(".quantity-arrow-minus");
    let $quantityArrowPlus = $(this).find(".quantity-arrow-plus");
    let $quantityNum = $(this).find('.input-number')

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);
  
    function quantityMinus() {
      if ($quantityNum.val() > 0) {
          $quantityNum.val(+$quantityNum.val() - 1);
          $quantityArrowPlus.removeClass('stop');
      }
      if ($quantityNum.val() == 0) {
        $quantityArrowMinus.addClass('stop');
      }
    }
  
    function quantityPlus() {
      if ($quantityNum.val() < 100) {
          $quantityNum.val(+$quantityNum.val() + 1);
          $quantityArrowMinus.removeClass('stop');
      }
      if ($quantityNum.val() == 100) {
        $quantityArrowPlus.addClass('stop');
      }
    }

    $quantityNum.change(function(){
      if (+$(this).attr('max') < $(this).val()) {
        $(this).val($(this).attr('max'));
        $quantityArrowPlus.addClass('stop');
        $quantityArrowMinus.removeClass('stop');
        
      }
      if (+$(this).attr('min') > $(this).val()) {
        $(this).val($(this).attr('min'));
        $quantityArrowMinus.addClass('stop');
        $quantityArrowPlus.removeClass('stop');
      }
    });
  });
  /* === /INPUT NUMBER === */  
  
  /* === PERSONAL INFORMATION === */

  
 
  let personalName = $('.personal-info .js-personal-name');
  let personalTelephone = $('.personal-info .js-personal-telephone');
  let personalMail = $('.personal-info .js-personal-mail');
  let personalFacebook = $('.personal-facebook .js-personal-social');
  let personalGoogle = $('.personal-google .js-personal-social');
  let personalApple = $('.personal-apple .js-personal-social');
  let personalSocial = $('.js-personal-social.active');
  let personalItem = $('.personal-info__item');

  let btnFacebook = $('.js-btn-facebook');
  let btnGoogle = $('.js-btn-google');
  let btnApple = $('.js-btn-apple');
  let btnSocial = $('.js-btn-social');

  let validFacebook = $('#personal-valid-facebook');
  let validGoogle = $('#personal-valid-google');
  let validApple = $('#personal-valid-apple');
  let socialValid = $('.social-valid');

  let textFacebook = 'Мы не можем отключить вас от аккаунта Facebook, так как он связан с входом в личный кабинет. Если хотите отключиться, сначала подключите другой социальный аккаунт.';
  let textGoogle = 'Мы не можем отключить вас от аккаунта Google, так как он связан с входом в личный кабинет. Если хотите отключиться, сначала подключите другой социальный аккаунт.';
  let textApple = 'Мы не можем отключить вас от аккаунта Apple, так как он связан с входом в личный кабинет. Если хотите отключиться, сначала подключите другой социальный аккаунт.';


  function ClickBtnSocial(btnThis, personalThis, validThis, textThis) {
    btnThis.click(function(e) {
      e.preventDefault();
      if (personalThis.text() === 'Подключено' && personalSocial.length <= 1) {
        validThis.show();
        validThis.text(textThis);
        btnThis.attr('disabled', true);
      }
      else {
        if(personalThis.text() === 'Подключено' && personalSocial.length > 1) {
          personalThis.text('Связать');
          personalThis.removeClass('active');
          btnThis.text('Подключить аккаунт');
          socialValid.hide();
          btnSocial.attr('disabled', false);
        } 
        else {
          personalThis.text('Подключено');
          personalThis.addClass('active');
          btnThis.text('Отключить');
          socialValid.hide();
          btnSocial.attr('disabled', false);
        }
      } 
  
      personalSocial = $('.js-personal-social.active');
    })
  }

  ClickBtnSocial(btnFacebook, personalFacebook, validFacebook, textFacebook);
  ClickBtnSocial(btnGoogle, personalGoogle, validGoogle, textGoogle);
  ClickBtnSocial(btnApple, personalApple, validApple, textApple);

  $('.js-btn-name').click(function(e) {
    e.preventDefault();
    let inputName = $('#js-name-input').val();
    personalName.text(inputName);
  })

  $('.js-btn-telephone').click(function(e) {
    e.preventDefault();
    let inputTelephone = $('#js-telephone-input').val();
    personalTelephone.text(inputTelephone);
  })

   
   let emailId = $('#js-mail-input');
   let validEmail = $('#personal-valid-email');
   let btnEmail = $('.js-btn-mail');

   emailId.blur(function(){

    if(emailId.val() != ''){
      if(emailId.val().includes('@') ){
        validEmail.hide();
        btnEmail.attr('disabled', false);
        emailId.removeClass('error');
      }

      else{
        validEmail.show();
        validEmail.text('Введите правильный Email адрес.');
        btnEmail.attr('disabled', true);
        emailId.addClass('error');
      }
    }
    else{
      validEmail.show();
      validEmail.text('Поле Email не должно быть пустым!');
      emailId.addClass('error');
      btnEmail.attr('disabled', true);
    }
  });

  btnEmail.click(function(e) {
    e.preventDefault();
    let inputMail = emailId.val();
    personalMail.text(inputMail);
  })

  personalItem.click(function(e) {
    e.preventDefault();

    personalItem.removeClass('active');
    $('.personal-update__item').removeClass('active');

    $(this).addClass('active');
    $($(this).attr('href')).addClass('active');
  })
  /* === /PERSONAL INFORMATION === */

  /* === NOTIFICATIONS === */
  let telephoneActication = $('.js-telephone-activation');
  telephoneActication.click(function(e) {
    e.preventDefault();
    telephoneActication.text('Активно');
    telephoneActication.addClass('active');
  })

  $('#checkTelephone').click(function(){
    if ($(this).is(':checked')){
      $('.notifications-sort-none').show(400);
    } else {
      $('.notifications-sort-none').hide(400);
    }
  });  
  /* === /NOTIFICATIONS === */

  /* === BOOKING === */
  $('.booking-copy__btn').click(function(e) {
    e.preventDefault();
    let copyText = $(this).parent().find('.booking-value').text();
    let tooltip = $(this).find('.tooltiptext');

    tooltip.text("Скопировано");
    navigator.clipboard.writeText(copyText);
  })

  

  function copyElement(id) {
    id.mouseover(function() {
      let tooltip = $(this).find('.tooltiptext');
      tooltip.text("Копировать");
    })
  }
  copyElement($('.booking-copy__btn'));
  

  function tabsClick(tabsItemFirst, tabsItemSecond) {
    tabsItemFirst.click(function(e) {
      e.preventDefault();

      tabsItemFirst.removeClass('active');
      tabsItemSecond.removeClass('active');

      $(this).addClass('active');
      $($(this).attr('href')).addClass('active');
    })
  }

  tabsClick($('.booking-aside__item'), $('.booking-wrapper'));
  tabsClick($('.booking__link'), $('.booking-all'));




 

  /* === /BOOKING === */
  
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