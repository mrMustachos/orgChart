
// When the DOM is ready, intialize document.
$(document).on('click', 'body', function() {

	// Get a reference to the chartBlock window.
	var chartBlock = $('.gridster .gs-w:not(.divider)');
	var blockLockBTN = $('a.block_unlock');
	var blockIconToggle = $('a.block_unlock span');

	var chartNope = $('.gridster .gs-w');
	var nopingBTN = $('a.div_noped');
	var nopingIconToggle = $('a.div_noped span');

	var chartDivider = $('.gridster .gs-w.divider');
	var dividerLockBTN = $('a.div_unlock');
	var dividerIconToggle = $('a.div_unlock span');

	var chartSpanner2 = $('.gridster .blocking.gs-w');
	var spanner2LockBTN = $('a.spanner2_unlock');
	var spanner2iconToggle = $('a.spanner2_unlock span');

	var chartSpanner3 = $('.gridster .blocking.gs-w');
	var spanner3LockBTN = $('a.spanner3_unlock');
	var spanner3iconToggle = $('a.spanner3_unlock span');

	// Bind the trigger link to show the chartBlock window.
	$('a.block_unlock')
	.attr('href', 'javascript:void( 0 )')
	.click(
		function(event) {
			// Show chartBlock window.
			chartBlock.addClass('box_unlocked');
			blockLockBTN.addClass('active');
			blockIconToggle.removeClass('icon-edit').addClass('icon-working');

			// Prevent default.
			event.preventDefault();
		}
	);

	$('a.div_noped')
	.attr('href', 'javascript:void( 0 )')
	.click(
		function(event) {
			// Show chartBlock window.
			chartNope.addClass('noping');
			nopingBTN.addClass('active');
			nopingIconToggle.removeClass('icon-nope').addClass('icon-working');

			// Prevent default.
			event.preventDefault();
		}
	);

	$('a.div_unlock')
	.attr('href', 'javascript:void( 0 )')
	.click(
		function(event) {
			// Show chartBlock window.
			chartDivider.addClass('div_unlocked');
			dividerLockBTN.addClass('active');
			dividerIconToggle.removeClass('icon-edit').addClass('icon-working');

			// Prevent default.
			event.preventDefault();
		}
	);

	$('a.spanner2_unlock')
	.attr('href', 'javascript:void( 0 )')
	.click(
		function(event) {
			// Show chartBlock window.
			chartSpanner2.addClass('spanner2_create');
			spanner2LockBTN.addClass('active');
			spanner2iconToggle.removeClass('icon-edit').addClass('icon-working');

			// Prevent default.
			event.preventDefault();
		}
	);

	$('a.spanner3_unlock')
	.attr('href', 'javascript:void( 0 )')
	.click(
		function(event) {
			// Show chartBlock window.
			chartSpanner3.addClass('spanner3_create');
			spanner3LockBTN.addClass('active');
			spanner3iconToggle.removeClass('icon-edit').addClass('icon-working');

			// Prevent default.
			event.preventDefault();
		}
	);

	// Bind a mousedown event on the document so that we
	// can close the chartBlock window when it is open.
	$(document).bindIf(
		'mousedown',
		function() {
			// Log to console for debugging.
			console.log('Event handled.');

			// Close the chartBlock window.
			chartBlock.removeClass('box_unlocked');
			blockLockBTN.removeClass('active');
			blockIconToggle.addClass('icon-edit').removeClass('icon-working');
		},
		function() {
			return (chartBlock.is(':visible'));
		}
	);

	$(document).bindIf(
		'mousedown',
		function() {
			// Log to console for debugging.
			console.log('Event handled.');

			// Close the chartBlock window.
			chartNope.removeClass('noping');
			nopingBTN.removeClass('active');
			nopingIconToggle.addClass('icon-nope').removeClass('icon-working');
		},
		function() {
			return (chartBlock.is(':visible'));
		}
	);

	$(document).bindIf(
		'mousedown',
		function() {
			// Log to console for debugging.
			console.log('Event handled.');

			// Close the chartBlock window.
			chartDivider.removeClass('div_unlocked');
			dividerLockBTN.removeClass('active');
			dividerIconToggle.addClass('icon-edit').removeClass('icon-working');
		},
		function() {
			return (chartDivider.is(':visible'));
		}
	);

	$(document).bindIf(
		'mousedown',
		function() {
			// Log to console for debugging.
			console.log('Event handled.');

			// Close the chartBlock window.
			chartSpanner2.removeClass('spanner2_create');
			spanner2LockBTN.removeClass('active');
			spanner2iconToggle.addClass('icon-edit').removeClass('icon-working');
		},
		function() {
			return (chartSpanner2.is(':visible'));
		}
	);

	$(document).bindIf(
		'mousedown',
		function() {
			// Log to console for debugging.
			console.log('Event handled.');

			// Close the chartBlock window.
			chartSpanner3.removeClass('spanner3_create');
			spanner3LockBTN.removeClass('active');
			spanner3iconToggle.addClass('icon-edit').removeClass('icon-working');
		},
		function() {
			return (chartSpanner2.is(':visible'));
		}
	);

	// Bind the mousedown event the chartBlock window so we can
	// stop it from bubbling up to the document (ie. you
	// should be able to click IN the chartBlock window without
	// it closing.

	chartBlock.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

	chartNope.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

	chartDivider.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

	chartSpanner2.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

	chartSpanner3.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

});

////// box state switcher /////////////////////////////////////////////////////////////////

// switch from blocking to box for the chart boxes
$(document).on('click', '.gridster .box_unlocked.blocking.gs-w:not(.divider)', function(){
	$(this).addClass('box');
	$(this).removeClass('blocking');
});

// switch from box to thru for the chart boxes
$(document).on('click', '.gridster .box_unlocked.box.gs-w:not(.divider)', function(){
	$(this).addClass('thru');
	$(this).removeClass('box');
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .box_unlocked.thru.gs-w:not(.divider)', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});


////// 2x spanner switching for boxes /////////////////////////////////////////////////////

// switch from box to thru for 2x spanner boxes
$(document).on('click', '.gridster .box_unlocked.doubled.gs-w:not(.divider) .box', function(){
	$(this).addClass('thru');
	$(this).removeClass('box');
});

// switch from thru to box for 2x spanner boxe
$(document).on('click', '.gridster .box_unlocked.doubled.gs-w:not(.divider) .thru', function(){
	$(this).addClass('box');
	$(this).removeClass('thru blocking');
});


////// divider state switcher /////////////////////////////////////////////////////////////

// switch from blocking to reachLeft for the chart boxes
$(document).on('click', '.gridster .div_unlocked.blocking.divider.gs-w', function(){
	$(this).addClass('reachLeft');
	$(this).removeClass('blocking');
});

// switch from reachLeft to reachRight for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachLeft.divider.gs-w', function(){
	$(this).addClass('reachRight');
	$(this).removeClass('reachLeft');
});

// switch from reachRight to full for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachRight.divider.gs-w', function(){
	$(this).addClass('full');
	$(this).removeClass('reachRight');
});

// switch from full to thru for the chart boxes
$(document).on('click', '.gridster .div_unlocked.full.divider.gs-w', function(){
	$(this).addClass('thru');
	$(this).removeClass('full');
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .div_unlocked.thru.divider.gs-w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});


////// Nope Action ////////////////////////////////////////////////////////////////////////

// add a .nope to end the colomn
$(document).on('click', '.gridster .noping.gs-w', function(){
	$(this).toggleClass('nope');
});


////// 2x Spanner Action //////////////////////////////////////////////////////////////////

// double span for blocking (adds in new box)
$(document).on('click', '.gridster .spanner2_create.blocking.gs-w:not(.divider)', function(){
	$(this).addClass('doubled');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
	$(this).append('<div class="spannerBlock gs-w box"></div>');
});

// remove 2x Spanner (block)
$(document).on('click', '.gridster .spanner2_create.doubled.gs-w:not(.divider)', function(){
	$('.doubled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('doubled');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.gs-w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('doubled thru reachRight reachLeft full');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.blocking.gs-w', function(){
	$(this).addClass('doubled thru');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
});

////// 3x Spanner Action //////////////////////////////////////////////////////////////////

// tripled span for blocking (adds 1 new box)
$(document).on('click', '.gridster .spanner3_create.blocking.gs-w:not(.divider)', function(){
	$(this).addClass('tripled more');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','3');
	$(this).next().addClass('trashed');
	$(this).next().next().addClass('trashed');
	$(this).append('<div class="spannerBlock gs-w box"></div>');
});

// tripled span for blocking (adds a 2nd box)
$(document).on('click', '.gridster .spanner3_create.tripled.more.gs-w:not(.divider)', function(){
	$(this).append('<div class="spannerBlock gs-w box"></div>');
	$(this).removeClass('more');
});

// remove 3x Spanner (block)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs-w:not(.divider)', function(){
	$('.tripled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('tripled');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
	$(this).next().next().removeClass('trashed');
});

