function test(){

    // changes the divider to rise
	$('.gs-w.divider.reach-xxx.change').click(function () {
		$(this).removeClass('reach-xxx');
		$(this).addClass('reachLeft');
	});
	// changes the divider to right
	$('.gs-w.divider.reachLeft.change').click(function () {
		$(this).removeClass('reachLeft');
		$(this).addClass('reachRight');
	});
	// changes the divider to full
	$('.gs-w.divider.reachRight.change').click(function () {
		$(this).removeClass('reachRight');
		$(this).addClass('full');
	});
	// changes the divider to nope
	$('.gs-w.divider.full.change').click(function () {
		$(this).removeClass('full');
		$(this).addClass('nope');
	});
	// changes the divider to xxx
	$('.gs-w.divider.nope.change').click(function () {
		$(this).removeClass('nope');
		$(this).addClass('reach-xxx');
	});



	// changes the divider to xxx
	$('.gs-w.blocking.shuffle').click(function () {
		$(this).addClass('box');
		$(this).removeClass('blocking');
	});

	// changes the divider to xxx
	$('.gs-w.box.shuffle').click(function () {
		$(this).addClass('thru');
		$(this).removeClass('box');
	});

	// changes the divider to xxx
	$('.gs-w.thru.shuffle').click(function () {
		$(this).addClass('blocking');
		$(this).removeClass('thru');
	});



	// changes the divider to xxx
	$('.gs-w.thru.jumper').click(function () {
		$(this).attr('data-sizex', '2');;
	});
	// changes the divider to xxx
	$('.gs-w.box.jumper').click(function () {
		$(this).attr('data-sizex', '2');;
	});
	// changes the divider to xxx
	$('.gs-w.blocking.jumper').click(function () {
		$(this).attr('data-sizex', '2');;
	});


	/*
	// changes the divider to xxx
	$('.gs-w.grabage').click(function () {
		$(this).addClass('gone');
	});
	// changes the divider to xxx
	$('.gs-w.gone.grabage').click(function () {
		$(this).addClass('nope');
		$(this).removeClass('gone');
	});
	// changes the divider to xxx
	$('.gs-w.nope.grabage').click(function () {
		$(this).removeClass('nope');
	});
	*/


    setTimeout(test, 1);
}

$(document).ready(function(){

	// hides seralize btn after build
	$('.js-seralize').click(function () {
		$(this).hide();
		$('.build').show();
	});



	$('.div_unlock').click(function () {
		$(this).toggleClass('active');
		$('.div_unlock span').toggleClass('icon-wrench').toggleClass('icon-cog');
		$('.div').toggleClass('hide');
		$('.gs-w.divider').toggleClass('change');
	});
	$('.div').click(function () {
		$('.gs-w.divider').removeClass('reach-xxx');
		$('.gs-w.divider').toggleClass('change');
		$('.div_unlock').toggleClass('active');
		$('.div_unlock span').removeClass('icon-wrench').removeClass('icon-cog');
		$('.div_unlock span').addClass('icon-wrench');
		$(this).toggleClass('hide');
		$('.div, .div_unlock').addClass('locked');
		$('.div_unlock').removeClass('div_unlock');
		$(this).removeClass('div');
	});
	


	$('.block_unlock').click(function () {
		$(this).toggleClass('active');
		$('.block_unlock span').toggleClass('icon-wrench').toggleClass('icon-cog');
		$('.card').toggleClass('hide');
		$('.gs-w:not(.divider)').toggleClass('shuffle');
	});
	$('.card').click(function () {
		$('.gs-w:not(.divider)').remove('blocking');
		$('.gs-w:not(.divider)').toggleClass('shuffle');
		$('.block_unlock').toggleClass('active');
		$('.block_unlock span').removeClass('icon-wrench').removeClass('icon-cog');
		$('.block_unlock span').addClass('icon-lock');
		$(this).toggleClass('hide');
		$('.card, .block_unlock').addClass('locked');
		$('.block_unlock').removeClass('block_unlock');
		$(this).removeClass('card');
	});




	$('.spanner_unlock').click(function () {
		$(this).toggleClass('active');
		$('.spanner_unlock span').toggleClass('icon-wrench').toggleClass('icon-cog');
		$('.span').toggleClass('hide');
		$('.gs-w:not(.divider)').toggleClass('jumper');
	});
	$('.span').click(function () {
		$('.gs-w:not(.divider)').removeClass('blocking');
		$('.gs-w:not(.divider)').toggleClass('shuffle');
		$('.spanner_unlock').toggleClass('active');
		$('.spanner_unlock span').removeClass('icon-wrench').removeClass('icon-cog');
		$('.spanner_unlock span').addClass('icon-lock');
		$(this).toggleClass('hide');
		$('.span .spanner_unlock').addClass('locked');
		$('.spanner_unlock').removeClass('spanner_unlock');
		$(this).removeClass('span');
	});



	/*
	$('.trash_unlock').click(function () {
		$(this).toggleClass('active');
		$('.chuck').toggleClass('hide');
		$('.gs-w').toggleClass('grabage');
	});
	$('.chuck').click(function () {
		$('.gs-w').remove('.gone');
		$('.gs-w').toggleClass('grabage');
		$('.trash_unlock').toggleClass('active');
		$('.trash_unlock span').removeClass('icon-remove');
		$('.trash_unlock span').addClass('icon-lock');
		$(this).toggleClass('hide');
		$('.chuck .trash_unlock').addClass('locked');
		$('.trash_unlock').removeClass('trash_unlock');
		$(this).removeClass('chuck');
	});
	*/
	


	test();
});
