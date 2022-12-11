$(function () {
  let fullPrice = 0;

  $(".menu-burger, .menu-close").on("click", function () {
    $(".header__menu").toggleClass("_active");
  });

  $(".catalog__slider").slick({
    arrows: true,
    infinite: false,
    prevArrow:
      '<button type="button" class="catalog-btn slick-catalog-prev"><svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 14.9304C8.00781 14.9304 8.42857 14.5096 8.42857 14.0018L8.42857 1.00181C8.42857 0.494001 8.00781 0.0732422 7.5 0.0732422C7.25335 0.0732422 7.02121 0.174805 6.8471 0.348912L0.347098 6.84891C0.172991 7.02302 0.0714285 7.25516 0.0714285 7.50181C0.0714285 7.74847 0.172991 7.98061 0.347098 8.15472L6.8471 14.6547C7.02121 14.8288 7.25335 14.9304 7.5 14.9304Z" fill="#4945FF"/></svg></button>',
    nextArrow:
      '<button type="button" class="catalog-btn slick-catalog-next"><svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.5 0.0696143C0.992188 0.0696143 0.571428 0.490373 0.571428 0.998185V13.9982C0.571428 14.506 0.992188 14.9268 1.5 14.9268C1.74665 14.9268 1.97879 14.8252 2.1529 14.6511L8.6529 8.15109C8.82701 7.97698 8.92857 7.74484 8.92857 7.49819C8.92857 7.25153 8.82701 7.01939 8.6529 6.84528L2.1529 0.345283C1.97879 0.171177 1.74665 0.0696143 1.5 0.0696143Z" fill="#4945FF"/></svg></button>',
    slidesToShow: 8,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: true,
          swipeToSlide: true,
          centerMode: true,
        },
      },
    ],
  });
  $(".about__video-slider, .gratitude__slider").slick({
    slidesToShow: 3,
    arrows: true,
    infinite: false,
    dots: true,

    dotsClass: "video-dots",
    prevArrow:
      '<button type="button" class="video-btn slick-video-prev"><svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 14.9304C8.00781 14.9304 8.42857 14.5096 8.42857 14.0018L8.42857 1.00181C8.42857 0.494001 8.00781 0.0732422 7.5 0.0732422C7.25335 0.0732422 7.02121 0.174805 6.8471 0.348912L0.347098 6.84891C0.172991 7.02302 0.0714285 7.25516 0.0714285 7.50181C0.0714285 7.74847 0.172991 7.98061 0.347098 8.15472L6.8471 14.6547C7.02121 14.8288 7.25335 14.9304 7.5 14.9304Z" fill="#4945FF"/></svg></button>',
    nextArrow:
      '<button type="button" class="video-btn slick-video-next"><svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.5 0.0696143C0.992188 0.0696143 0.571428 0.490373 0.571428 0.998185V13.9982C0.571428 14.506 0.992188 14.9268 1.5 14.9268C1.74665 14.9268 1.97879 14.8252 2.1529 14.6511L8.6529 8.15109C8.82701 7.97698 8.92857 7.74484 8.92857 7.49819C8.92857 7.25153 8.82701 7.01939 8.6529 6.84528L2.1529 0.345283C1.97879 0.171177 1.74665 0.0696143 1.5 0.0696143Z" fill="#4945FF"/></svg></button>',

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  });

  $(".catalog__slider").on("breakpoint", function (event, slick, currentSlide, nextSlide) {
    //табы не работают на слайдере при изменении разрешения
    tabClick();
  });

  $('[data-fancybox="gallery"]').fancybox({
    buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
    loop: false,
    protect: true,
  });

  //анимированный счётчик статистики на странице guard.html
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 2000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  //---------- Header Scroll ------------
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $(".header").outerHeight();
  $(window).on("scroll", function (e) {
    didScroll = true;
  });
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    let st = $(this).scrollTop();

    // Make scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If scrolled down and past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $(".header__scroll-wrapper").removeClass("nav-down").addClass("nav-up");
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $(".header__scroll-wrapper").removeClass("nav-up").addClass("nav-down");
      }
    }
    lastScrollTop = st;
  }

  $("#myForm").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
      address: {
        required: true,
      },
      textarea: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Заполните поле!",
        email: "Некорректный e-mail адрес!",
      },
      name: {
        required: "Заполните поле!",
      },
      phone: {
        required: "Заполните поле!",
      },
      address: {
        required: "Заполните поле!",
      },
      textarea: {
        required: "Заполните поле!",
      },
    },

    submitHandler: function () {
      alert("Спасибо, форма успешно отправлена!");
      form.submit();
    },
  });

  $("#phone-form").validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Заполните поле!",
      },
      phone: {
        required: "Заполните поле!",
      },
    },
    submitHandler: function () {
      alert("Спасибо, форма успешно отправлена!");
      form.submit();
    },
  });

  $("#phone-form-map").validate({
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Заполните поле!",
      },
      phone: {
        required: "Заполните поле!",
      },
    },
    submitHandler: function () {
      alert("Спасибо, форма успешно отправлена!");
      form.submit();
    },
  });

  $(".input-phone").mask("+7 (999) 999 99 99");

  const tabClick = function () {
    $(".catalog__tab").on("click", function (e) {
      e.preventDefault();
      $(".catalog__tab").not($(this)).removeClass("_active");
      $(this).addClass("_active");
      $(this).parents(".catalog__slider").next().find(".catalog__products-inner").removeClass("_active");
      $($(this).attr("href")).addClass("_active");
    });
  };
  tabClick();

  $(".catalog__product label input").on("click", function () {
    $(this).closest(".catalog__button-radio-inner").find("input").not($(this)).removeAttr("checked");
    $(this).attr("checked", true);
  });

  $(".product-form label input").on("click", function () {
    $(this).closest(".catalog__button-radio-inner").find("input").not($(this)).removeAttr("checked");
    $(this).attr("checked", true);
  });

  //--плохой код--|--оптимизировать--
  let cartQT = parseInt($(".cart__qty").html());
  function checkcart() {
    if ($(".header__cart-list").children().length == 0) {
      $(".header__cart-title").show();
      $(".header__cart-title").text("Корзина пуста! Добавьте что-нибудь в корзину");
    } else {
      $(".header__cart-title").hide();
    }
  }

  //--плохой код--|--оптимизировать--
  $(".cart__guard-button").on("click", function (e) {
    e.preventDefault();

    const img = $(this).parent().prev().children().attr("src");
    const title = $(this).parent().find(".mask__card-title").html();
    const input = $(this).parent().find('input[checked="checked"]').nextAll("p").html();

    const productPrice = parseInt($(this).parent().find('input[checked="checked"]').nextAll("p").children().html().replace(/[^\d]/g, ""));

    const productHTML = `<li class="header__cart-item">
    <img class="header__cart-item-img" src="${img}" alt="" />
    <div class="header__cart-item-info">
      <div class="header__cart-item-title">${title}</div>
      <div class="header__cart-item-price">${input}</div>
    </div>
    <a href="#" class="header__cart-item-remove">X</a>
  </li>`;

    fullPrice += productPrice;
    $(".header__cart-totalprice").children().text(fullPrice);
    $(".cart__total").children().text(fullPrice);
    $("#products-container").append(productHTML);
    cartQT++;
    $(".cart__qty").text(cartQT);
    checkcart();
    $(".header__scroll-wrapper").removeClass("nav-up").addClass("nav-down");
    alert("Спасибо! Товар добавлен в корзину");
  });

  //--плохой код--|--оптимизировать--
  $(".cart__button").on("click", function (e) {
    e.preventDefault();

    const product = $(this).closest(".catalog__product").attr("data-id");
    const input = $(this).parent().find('input[checked="checked"]').nextAll("p").html();
    const title = $(this).closest(".catalog__product").find(".catalog__product-title").html();
    const img = $(this).closest(".catalog__product").find(".catalog__product-image").children().attr("src");

    const productPrice = parseInt($(this).parent().find('input[checked="checked"]').nextAll("p").children().html().replace(/[^\d]/g, ""));

    const productHTML = `
      <li class="header__cart-item" data-id="${product}">
        <img class="header__cart-item-img" src="${img}" alt="" />
        <div class="header__cart-item-info">
          <div class="header__cart-item-title">${title}</div>
          <div class="header__cart-item-price">${input}</div>
        </div>
        <a href="#" class="header__cart-item-remove">X</a>
      </li>`;

    fullPrice += productPrice;
    $(".header__cart-totalprice").children().text(fullPrice);
    $(".cart__total").children().text(fullPrice);
    $("#products-container").append(productHTML);
    cartQT++;
    $(".cart__qty").text(cartQT);
    checkcart();
    $(".header__scroll-wrapper").removeClass("nav-up").addClass("nav-down");
    alert("Спасибо! Товар добавлен в корзину");
  });

  //--плохой код--|--оптимизировать--
  $("#products-container").on("click", ".header__cart-item-remove", function (e) {
    e.preventDefault();
    const productPrice = parseInt($(this).closest(".header__cart-item").find(".header__cart-item-price").children().html().replace(/[^\d]/g, ""));
    fullPrice -= productPrice;
    $(this).closest(".header__cart-item").remove();
    cartQT--;
    $(".cart__qty").text(cartQT);
    checkcart();
    $(".cart__total").children().text(fullPrice);
    $(".header__cart-totalprice").children().text(fullPrice);
  });
});
