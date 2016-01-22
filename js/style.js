var gridster;

// same object than generated with gridster.serialize() method
var serialization = [

	{ col: 1, row: 1, size_x: 1, size_y: 5 },
	{ col: 2, row: 1, size_x: 1, size_y: 5 },
	{ col: 3, row: 1, size_x: 1, size_y: 5 },
	{ col: 4, row: 1, size_x: 1, size_y: 5 },
	{ col: 5, row: 1, size_x: 1, size_y: 5 },
	{ col: 6, row: 1, size_x: 1, size_y: 5 },
	{ col: 7, row: 1, size_x: 1, size_y: 5 },
	{ col: 8, row: 1, size_x: 1, size_y: 5 },
	{ col: 9, row: 1, size_x: 1, size_y: 5 },
	{ col: 10, row: 1, size_x: 1, size_y: 5 },
	{ col: 11, row: 1, size_x: 1, size_y: 5 },
	{ col: 12, row: 1, size_x: 1, size_y: 5 },
	{ col: 13, row: 1, size_x: 1, size_y: 5 },
	{ col: 14, row: 1, size_x: 1, size_y: 5 },
	{ col: 15, row: 1, size_x: 1, size_y: 5 },
	{ col: 16, row: 1, size_x: 1, size_y: 5 },
	{ col: 17, row: 1, size_x: 1, size_y: 5 }

];

var serializationDivider = [

	{ col: 1, row: 1, size_x: 1, size_y: 1 },
	{ col: 2, row: 1, size_x: 1, size_y: 1 },
	{ col: 3, row: 1, size_x: 1, size_y: 1 },
	{ col: 4, row: 1, size_x: 1, size_y: 1 },
	{ col: 5, row: 1, size_x: 1, size_y: 1 },
	{ col: 6, row: 1, size_x: 1, size_y: 1 },
	{ col: 7, row: 1, size_x: 1, size_y: 1 },
	{ col: 8, row: 1, size_x: 1, size_y: 1 },
	{ col: 9, row: 1, size_x: 1, size_y: 1 },
	{ col: 10, row: 1, size_x: 1, size_y: 1 },
	{ col: 11, row: 1, size_x: 1, size_y: 1 },
	{ col: 12, row: 1, size_x: 1, size_y: 1 },
	{ col: 13, row: 1, size_x: 1, size_y: 1 },
	{ col: 14, row: 1, size_x: 1, size_y: 1 },
	{ col: 15, row: 1, size_x: 1, size_y: 1 },
	{ col: 16, row: 1, size_x: 1, size_y: 1 },
	{ col: 17, row: 1, size_x: 1, size_y: 1 }

];

// sort serialization
serialization = Gridster.sort_by_row_and_col_asc(serialization);

$(function(){

	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [130, 5],
		widget_margins: [5, 5],
		min_cols: 17
	}).data('gridster');

	$('#add_block').on('click', function() {
		$.each(serialization, function() {
			gridster.add_widget('<li class="blocking"></li>', this.size_x, this.size_y, this.col, this.row);
		});
	});

	$('#add_div').on('click', function() {
		$.each(serializationDivider, function() {
			gridster.add_widget('<li class="divider blocking"></li>', this.size_x, this.size_y, this.col, this.row);
		});
	});

	$('#delete_top').on('click', function() {
		$('.gridster li[data-row=1]').addClass('undo');

		var killer = $('.gridster li.undo'), index;

		for (index = 0; index < killer.length; index++) {
			gridster.remove_widget(killer.eq(Math.min(index,16)));
		}
	});

	gridster.remove_all_widgets();
	$.each(serialization, function() {
		gridster.add_widget('<li class="blocking nope"></li>', this.size_x, this.size_y, this.col, this.row);
	});

});


(function($) {

  // This jQuery plugin creates proxied event handlers that
  // consult with an additional conditional callback to see if
  // the original event handler should be executed.
  $.fn.bindIf = function(
    eventType,
    eventHandler,
    ifCondition
  ) {

    // Create a new proxy function that wraps around the
    // given bind callback.
    var proxy = function(event) {

      // Execute the IF condition callback first to see if
      // the event handler should be executed.
      if (ifCondition()) {

        // Pass the event onto the original event
        // handler.
        eventHandler.apply(this, arguments);

      }

    };

    // Bind the proxy method to the target.
    this.bind(eventType, proxy);

    // Return this to keep jQuery method chaining.
    return (this);
  };

})(jQuery);


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

// remove 2x Spanner (block)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs-w:not(.divider)', function(){
	$('.tripled .spannerBlock').remove();
	$(this).addClass('blocking');
	$(this).removeClass('tripled');
	$(this).attr('data-sizex','1');
	$(this).next().removeClass('trashed');
	$(this).next().next().removeClass('trashed');
});

/*
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
*/


