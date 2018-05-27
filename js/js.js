/* For sticky menu*/

$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('#sticky-header').addClass('sticky');
	} else {
		$('#sticky-header').removeClass('sticky');

	}

})




$(".active-owl-product").owlCarousel({
	autoPlay: false,
	slideSpeed: 2000,
	pagination: false,
	navigation: true,
	items: 4,
	/* transitionStyle : "fade", */
	/* [This code for animation ] */
	navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	itemsDesktop: [1199, 3],
	itemsDesktopSmall: [980, 3],
	itemsTablet: [768, 2],
	itemsMobile: [480, 1],
});

/* Featured Product*/
$(".active-featured-owl").owlCarousel({
	autoPlay: false,
	slideSpeed: 2000,
	pagination: false,
	navigation: true,
	items: 4,
	/* transitionStyle : "fade", */
	/* [This code for animation ] */
	navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	itemsDesktop: [1199, 3],
	itemsDesktopSmall: [980, 3],
	itemsTablet: [768, 2],
	itemsMobile: [480, 1],
});



/*Brand area */
$(".active-brand-owl").owlCarousel({
	autoPlay: true,
	slideSpeed: 2000,
	pagination: false,
	navigation: true,
	items: 5,
	/* transitionStyle : "fade", */
	/* [This code for animation ] */
	navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	itemsDesktop: [1199, 5],
	itemsDesktopSmall: [980, 5],
	itemsTablet: [768, 3],
	itemsMobile: [479, 2],
});

/*Scroll to top button start*/

$(".to-top").on("click", function () {
	$('html,body').animate({
		scrollTop: 0
	}, 1000);
});
$(window).scroll(function () {
	if ($(this).scrollTop() > 100) {
		$('.to-top').fadeIn(1000);
	} else {
		$('.to-top').fadeOut(1000);
	}
})


/*Scroll to top button end*/



/*----------------------------
	jQuery MeanMenu
   ------------------------------ */
jQuery('nav.active-mobile-menu').meanmenu();





var widthcount = $(window).width();
if (widthcount >= 320 && widthcount < 992) {
	$('.sfcr-close').hide();
}
else {
	$('.sfcr-close').show();
}

$(window).resize(function () {
	widthcount = $(window).width();
	if (widthcount >= 320 && widthcount < 992) {
		$('.sfcr-close').hide();
	}
	else {
		$('.sfcr-close').show();
	}
});

$(".jstest").on("click", function () {

	if (widthcount >= 320 && widthcount < 992) {

		$('.sfcr-close').slideToggle();
	}
});


$(".plus").on("click", function () {
	$(this).toggleClass('minus plus');

})


/*cart plus-minus*/

$('.minus-btn').on('click', function (e) {
	e.preventDefault();
	var $this = $(this);
	var $input = $this.closest('div').find('input');
	var value = parseInt($input.val());

	if (value > 1) {
		value = value - 1;
	} else {
		value = 0;
	}

	$input.val(value);

});

$('.plus-btn').on('click', function (e) {
	e.preventDefault();
	var $this = $(this);
	var $input = $this.closest('div').find('input');
	var value = parseInt($input.val());

	if (value < 100) {
		value = value + 1;
	} else {
		value = 100;
	}

	$input.val(value);
});

$('.like-btn').on('click', function () {
	$(this).toggleClass('is-active');
});








/*cart calculate*/
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
	updateQuantity(this);
});

$('.product-removal button').click(function () {
	removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
	var subtotal = 0;

	/* Sum up row totals */
	$('.product').each(function () {
		subtotal += parseFloat($(this).children('.product-line-price').text());
	});

	/* Calculate totals */
	var tax = subtotal * taxRate;
	var shipping = (subtotal > 0 ? shippingRate : 0);
	var total = subtotal + tax + shipping;

	/* Update totals display */
	$('.totals-value').fadeOut(fadeTime, function () {
		$('#cart-subtotal').html(subtotal.toFixed(2));
		$('#cart-tax').html(tax.toFixed(2));
		$('#cart-shipping').html(shipping.toFixed(2));
		$('#cart-total').html(total.toFixed(2));
		if (total == 0) {
			$('.checkout').fadeOut(fadeTime);
		} else {
			$('.checkout').fadeIn(fadeTime);
		}
		$('.totals-value').fadeIn(fadeTime);
	});
}


/* Update quantity */
function updateQuantity(quantityInput) {
	/* Calculate line price */
	var productRow = $(quantityInput).parent().parent();
	var price = parseFloat(productRow.children('.product-price').text());
	var quantity = $(quantityInput).val();
	var linePrice = price * quantity;

	/* Update line price display and recalc cart totals */
	productRow.children('.product-line-price').each(function () {
		$(this).fadeOut(fadeTime, function () {
			$(this).text(linePrice.toFixed(2));
			recalculateCart();
			$(this).fadeIn(fadeTime);
		});
	});
}


/* Remove item from cart */
function removeItem(removeButton) {
	/* Remove row from DOM and recalc cart total */
	var productRow = $(removeButton).parent().parent();
	productRow.slideUp(fadeTime, function () {
		productRow.remove();
		recalculateCart();
	});
}