
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
        }
        else {
          container.toggleClass('active');
        }  
    });

    $(document).mouseup(function (e) {
      let container = $('.header__submenu');
      if (e.target!=container[0] && !container.has(e.target).length && e.target!=$('.header__link')[0] && $('.header__link').has(e.target).length === 0) {
        container.removeClass('active');
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
            console.log($(this).parent().attr('data-value'))
            if ($(this).parent().attr('data-value') == dataValueList) {
              $(this).removeClass('active');
            }
          
        }
      })
    });
    /* === /SUB MENU === */
    
moment.locale('ru');
    $('input[name="dates"]').daterangepicker({
      autoUpdateInput: false,
      minDate: moment(),
      maxDate: moment().add(365, 'days'),
      buttonClasses: 'btn-date',
      locale: {
        "autoApply": 'true',
        "format": 'DD-MMMM',
          "cancelLabel": 'Очистить',
          "applyLabel": 'Показать <span>105</span> вариантов',
          "monthNames" : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	        "daysOfWeek" : ['вс','пн','вт','ср','чт','пт','сб'],
          "firstDay": 1,
      },  
      
  });

  /* === SLIDERS === */
  $('.catalog__filter-slider').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    variableWidth: true,
    responsive: [{
        breakpoint: 1124,
        settings: {
            slidesToShow: 3,
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
        selectBlock.removeClass('is-active');
        this.parentElement.classList.add('is-active');
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.current-text');
        $(this).closest('.select').find($('.current-text')).addClass('active');
        currentText.innerText = text;
        select.classList.remove('is-active');
        console.log(container.length)

    }

  };


  let container = $(".select__body");
  let header = $(".select__header");

  $(document).mouseup(function (e) {
    
    if (container.has(e.target).length === 0 &&  header.has(e.target).length === 0){
      selectBlock.removeClass('is-active');
    }       
  });

  select();

  $('.js-region').click(function(event) {
    event.preventDefault();
    $('.select-region').toggleClass('active');
  })
  $('.select__item').click(function(event) {
    event.preventDefault();
    $('.select__item').removeClass('active');
    $(this).toggleClass('active');
  })
  $(document).mouseup(function (e) {
    let container = $('.select-region');
    if (e.target!=container[0] && !container.has(e.target).length && e.target!=$('.js-region')[0] && $('.js-region').has(e.target).length === 0) {
        container.removeClass('active');
    }
});
  /* === /SELECT === */  

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