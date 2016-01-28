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
	$(this).addClass('box');
	$(this).removeClass('blocking');
});

// switch from box to thru for the chart boxes
$(document).on('click', '.gridster .box_unlocked.box.gs_w:not(.divider)', function(){
	$(this).addClass('thru');
	$(this).removeClass('box');
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
$(document).on('click', '.gridster .spanner2_create.blocking.gs_w:not(.divider)', function(){
	$(this).addClass('doubled');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
	$(this).append('<div class="spannerBlock gs_w box"></div>');
});

// remove 2x Spanner (block)
$(document).on('click', '.gridster .spanner2_create.doubled.gs_w:not(.divider)', function(){
	$('.doubled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('doubled');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.gs_w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('doubled thru reachRight reachLeft full');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.blocking.gs_w', function(){
	$(this).addClass('doubled thru');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
});


////// 3x Spanner Action //////////////////////////////////////////////////////////////////

// tripled span for blocking (adds 1 new box)
$(document).on('click', '.gridster .spanner3_create.blocking.gs_w:not(.divider)', function(){
	$(this).addClass('tripled more');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','3');
	$(this).next().addClass('trashed');
	$(this).next().next().addClass('trashed');
	$(this).append('<div class="spannerBlock gs_w box"></div>');
});

// tripled span for blocking (adds a 2nd box)
$(document).on('click', '.gridster .spanner3_create.tripled.more.gs_w:not(.divider)', function(){
	$(this).append('<div class="spannerBlock gs_w box"></div>');
	$(this).removeClass('more');
});

// remove 3x Spanner (block)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs_w:not(.divider)', function(){
	$('.tripled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('tripled');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
	$(this).next().next().removeClass('trashed');
});


////// Let's Play The Name Game ///////////////////////////////////////////////////////////

// selecting the box
$(document).on('click', '.gridster .gs_w.box.nameDROP', function(){
	$('.gridster .gs_w.box').removeClass('name_holder');
	$(this).toggleClass('name_holder');
	$('.nameBank').removeClass('hide');
	$('.shield').hide();

});

// unselecting the box
$(document).on('click', '.gridster .gs_w.box.nameDROP.name_holder', function(){
	$('.gridster .gs_w.box').removeClass('name_holder');
	$('.shield').show();

});

// Add in name
$(document).on('click', 'input[type=\'radio\'].radioBtnClass', function(){

	if($("input[type='radio'].radioBtnClass").is(':checked')) {
		var lablr = $("input[type='radio'].radioBtnClass:checked").attr('value');
		var named = $("input[type='radio'].radioBtnClass:checked").attr('name');

		$('.gridster .gs_w.box.nameDROP.name_holder').attr('id', lablr);
		$(this).parent().parent().toggleClass('used');
		$(this).attr("disabled", true);
		$('.gridster .gs_w.box.nameDROP.name_holder').append('<div class="presenter"></div>');
		$('.name_holder .presenter').html(named);
		$('.name_holder .presenter').prepend('<div class="remover icon-remove"></div>');
		$('.gridster .gs_w.box.nameDROP.name_holder').addClass('namePlaced').removeClass('name_holder');
		$('.shield').show();
	}

});

// remove name
$(document).on('click', '.gs_w.box.nameDROP.namePlaced .remover', function(){

	$(this).each(function() {
		var namedChecked = $(this).parent().parent().attr('id');
		
		$("input[value=" + namedChecked + "].radioBtnClass").prop('checked', false).removeAttr('disabled');
		$("input[value=" + namedChecked + "].radioBtnClass").parent().parent().removeClass('used');
		$('#' + namedChecked + ' .presenter').remove();
		$('#' + namedChecked +':not(.radioBtnClass)').removeClass('namePlaced').removeAttr('id');

	});

});
