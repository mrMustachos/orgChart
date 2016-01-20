function test(){

	// changes the blocking
	$('.blocking.blocking_change').click(function () {
		$(this).addClass('box');
		$(this).removeClass('blocking');
	});
	// changes the blocking
	$('.box.blocking_change').click(function () {
		$(this).addClass('thru');
		$(this).removeClass('box');
	});
	// changes the blocking
	$('.thru.blocking_change').click(function () {
		$(this).addClass('blocking');
		$(this).removeClass('thru');
	});



	// changes the divider
	$('ul.divider_change:not(.locked) .gs-w.divider.blocking').click(function () {
		$(this).addClass('reachRight');
		$(this).removeClass('blocking');
	});
	// changes the divider
	$('ul.divider_change:not(.locked) .gs-w.divider.reachRight').click(function () {
		$(this).addClass('reachLeft');
		$(this).removeClass('reachRight');
	});
	// changes the divider
	$('ul.divider_change:not(.locked) .gs-w.divider.reachLeft').click(function () {
		$(this).addClass('full');
		$(this).removeClass('reachLeft');
	});
	// changes the divider
	$('ul.divider_change:not(.locked) .gs-w.divider.full').click(function () {
		$(this).addClass('thru');
		$(this).removeClass('full');
	});
	// changes the divider
	$('ul.divider_change:not(.locked) .gs-w.divider.thru').click(function () {
		$(this).addClass('blocking');
		$(this).removeClass('thru');
	});



	// changes the divider
	$('.gs-w.blocking.spanner2_change').click(function () {
		$(this).addClass('doubled');
		$(this).removeClass('blocking');
		$(this).attr('data-sizex','2');
		$(this).next().addClass('trashed');
		$(this).append('<div class="box"></div>');
		$('.gs-w.spanner2_change.doubled .box:not(:first-child)').remove();
	});

    setTimeout(test, 1);
}

$(document).ready(function(){

	// hides seralize btn after build
	$('.js-seralize').click(function () {
		$(this).hide();
		$('.build').show();
		// $('.lockDown').show();
	});



	$('.block_unlock').click(function () {
		$(this).toggleClass('active');
		$('.block_unlock span').toggleClass('icon-working').toggleClass('icon-edit');
		$('.gs-w:not(.divider)').toggleClass('blocking_change');
	});
	$('.div_unlock').click(function () {
		$(this).toggleClass('active');
		$('.div_unlock span').toggleClass('icon-working').toggleClass('icon-edit');
		$('.gridster ul').toggleClass('divider_change').toggleClass('locked');
	});
	$('.spanner2_unlock').click(function () {
		$(this).toggleClass('active');
		$('.spanner2_unlock span').toggleClass('icon-working').toggleClass('icon-edit');
		$('.gs-w:not(.divider)').toggleClass('spanner2_change');
	});

	test();
});
