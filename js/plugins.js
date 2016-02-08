// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

////// box state switcher /////////////////////////////////////////////////////////////////

// switch from blocking to box for the chart boxes
$(document).on('click', '.gridster .box_unlocked.blocking.gs_w:not(.divider)', function(){
	$(this).addClass('box').append('<div class="presenter"><span class="remover icon-remove based"></span></div>');
	$(this).removeClass('blocking');
	$('#add_nope, #add_name').prop("disabled", false);
});

// switch from box to thru for the chart boxes
$(document).on('click', '.gridster .box_unlocked.box.gs_w:not(.divider)', function(){
	$(this).addClass('thru');
	$(this).removeClass('box').empty();
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .box_unlocked.thru.gs_w:not(.divider)', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});


////// 2x spanner switching for boxes /////////////////////////////////////////////////////

// switch from box to thru for 2x spanner boxes
$(document).on('click', '.gridster .box_unlocked.doubled.gs_w:not(.divider) .box', function(){
	$(this).addClass('thru');
	$(this).removeClass('box');
});

// switch from thru to box for 2x spanner boxe
$(document).on('click', '.gridster .box_unlocked.doubled.gs_w:not(.divider) .thru', function(){
	$(this).addClass('box');
	$(this).removeClass('thru blocking');
});


////// divider state switcher /////////////////////////////////////////////////////////////

// switch from blocking to reachLeft for the chart boxes
$(document).on('click', '.gridster .div_unlocked.blocking.divider.gs_w', function(){
	$(this).addClass('reachLeft');
	$(this).removeClass('blocking');
});

// switch from reachLeft to reachRight for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachLeft.divider.gs_w', function(){
	$(this).addClass('reachRight');
	$(this).removeClass('reachLeft');
});

// switch from reachRight to full for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachRight.divider.gs_w', function(){
	$(this).addClass('full');
	$(this).removeClass('reachRight');
});

// switch from full to thru for the chart boxes
$(document).on('click', '.gridster .div_unlocked.full.divider.gs_w', function(){
	$(this).addClass('thru');
	$(this).removeClass('full');
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .div_unlocked.thru.divider.gs_w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});


////// Nope Action ////////////////////////////////////////////////////////////////////////

// add a .nope to end the colomn
$(document).on('click', '.gridster .noping.gs_w', function(){
	$(this).toggleClass('nope');
});


////// 2x Spanner Action //////////////////////////////////////////////////////////////////

// double span for blocking (adds in new box)
$(document).on('click', '.gridster .spanner2_create.blocking.gs_w:not(.divider)', function(event){
	$(this).addClass('doubled');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
	$(this).append('<div class="spannerBlock gs_w box" blockcontent="holder"><div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div></div>');
});

// remove 2x Spanner (block)
$(document).on('click', '.gridster .spanner2_create.doubled.gs_w:not(.divider)', function(event){
	$('.doubled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('doubled');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.gs_w', function(event){
	$(this).addClass('blocking');
	$(this).removeClass('doubled thru reachRight reachLeft full');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.blocking.gs_w', function(event){
	$(this).addClass('doubled thru');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
});


////// 3x Spanner Action //////////////////////////////////////////////////////////////////

// tripled span for blocking (adds 1 new box)
$(document).on('click', '.gridster .spanner3_create.blocking.gs_w:not(.divider)', function(event){
	$(this).addClass('tripled more');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','3');
	$(this).next().addClass('trashed');
	$(this).next().next().addClass('trashed');
	$(this).append('<div class="spannerBlock spanner3_create gs_w box" blockcontent="holder"><div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div></div>');
});

// tripled span for blocking (adds a 2nd box)
$(document).on('click', '.gridster .spanner3_create.tripled.more.gs_w:not(.divider)', function(event){
	$(this).addClass('blocking');
	$(this).append('<div class="spannerBlock spanner3_create gs_w box" blockcontent="holder"><div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div></div>');
	$(this).removeClass('more');
});

// remove 3x Spanner (block)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs_w:not(.divider)', function(event){
	$('.tripled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('tripled more');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
	$(this).next().next().removeClass('trashed');
});

// tripled span for divider (adds 1 new box)
$(document).on('click', '.gridster .spanner3_create.blocking.gs_w.divider', function(event){
	$(this).addClass('tripled more');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','3');
	$(this).next().addClass('trashed');
	$(this).next().next().addClass('trashed');
	$(this).append('<div class="spannerBlock gs_w blocking divider"></div>');
});

// tripled span for divider (adds a 2nd box)
$(document).on('click', '.gridster .spanner3_create.tripled.more.gs_w.divider', function(event){
	$(this).append('<div class="spannerBlock gs_w blocking divider"></div>');
	$(this).removeClass('more');
});

// remove 3x Spanner (divider)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs_w.divider', function(event){
	$('.tripled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('tripled more');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
	$(this).next().next().removeClass('trashed');
});



// switch from blocking to reachLeft for the chart boxes
$(document).on('click', '.gridster .div_unlocked.blocking.divider.gs_w', function(){
	$(this).addClass('reachLeft');
	$(this).removeClass('blocking');
});

// switch from reachLeft to reachRight for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachLeft.divider.gs_w', function(){
	$(this).addClass('reachRight');
	$(this).removeClass('reachLeft');
});

// switch from reachRight to full for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachRight.divider.gs_w', function(){
	$(this).addClass('full');
	$(this).removeClass('reachRight');
});

// switch from full to thru for the chart boxes
$(document).on('click', '.gridster .div_unlocked.full.divider.gs_w', function(){
	$(this).addClass('thru');
	$(this).removeClass('full');
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .div_unlocked.thru.divider.gs_w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});

////// Let's Play The Name Game ///////////////////////////////////////////////////////////

// selecting the box
$(document).on('click', '.gridster .gs_w.box.nameDROP', function(){
	var colShield = $(this).attr('data-col');
	var rowShield = $(this).attr('data-row');

	$('.gridster .gs_w.box').removeClass('name_holder');
	$(this).toggleClass('name_holder');
	$('.gs_w.box.name_placed.nameDROP').removeClass('name_holder');
	$('#nameBank').removeClass('hide');
	$('.shield').hide();

});

// stopping duplicate names when alread placed
$(document).on('click', '.gridster .gs_w.box.name_placed.nameDROP', function(){
	$('#nameBank').addClass('hide');
	$('.shield').show();

});

// Add in name
$(document).on('click', 'input[type=\'radio\'].radioBtnClass', function(){
	var lablr = $(this).attr('value');
	var named = $(this).attr('name');

	$('.gridster .gs_w.box.nameDROP.name_holder .presenter').append(named);
	$('.gridster .gs_w.box.nameDROP.name_holder .presenter .remover').removeClass('based').attr('blockcontent', lablr);
	$('.gridster .gs_w.box.nameDROP.name_holder').addClass('name_placed').attr('blockcontent', lablr).removeClass('name_holder nameDROP');

	if( $('.gridster .gs_w.box.nameDROP.name_holder') ) {

		$(this).attr("disabled", true);
		$(this).parent().addClass('used');
	}
	if( $('.gridster .gs_w.box.nameDROP') ) {
		$('.shield').show();
	}

});

// remove name
$(document).on('click', '.gs_w.box.name_placed .presenter .remover', function(event){
	
	if ($(this).parent().parent().attr('blockcontent')){

		var findval = $(this).parent().parent().attr('blockcontent');

		var theInput = ("input[value=" + findval + "].radioBtnClass");
		var theBlock = ("li[blockcontent=" + findval + "].gs_w.box.name_placed");
		var theSpanBlock = ("div[blockcontent=" + findval + "].gs_w.box.name_placed");

		var theListVal = $(theInput).parent().parent().parent().attr('id');
		var theList = $('#'+theListVal+'');

		console.log(theListVal);

		$(theList).attr('class', 'opposite');
		$(theInput).prop('checked', false).removeAttr('disabled');
		$(theInput).parent().removeClass('used');
		$(theBlock).empty().append('<div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div>');
		$(theSpanBlock).empty().append('<div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div>');
		$(theBlock).removeClass('name_placed').removeClass('name_holder').attr('blockcontent', 'holder').addClass('nameDROP');
		$(theSpanBlock).removeClass('name_placed').removeClass('name_holder').attr('blockcontent', 'holder').addClass('nameDROP');

	}

});

