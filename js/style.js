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
		min_cols: 17,
        resize: {
            enabled: false
        }
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

	var chartDivider = $('.gridster .gs-w.divider');
	var dividerLockBTN = $('a.div_unlock');
	var dividerIconToggle = $('a.div_unlock span');

	var chartSpanner = $('.gridster .blocking.gs-w:not(.divider)');
	var spannerLockBTN = $('a.spanner2_unlock');
	var spannerIconToggle = $('a.spanner2_unlock span');

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
			chartSpanner.addClass('spanner_create');
			spannerLockBTN.addClass('active');
			spannerIconToggle.removeClass('icon-edit').addClass('icon-working');

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
			chartSpanner.removeClass('spanner_create');
			spannerLockBTN.removeClass('active');
			spannerIconToggle.addClass('icon-edit').removeClass('icon-working');
		},
		function() {
			return (chartSpanner.is(':visible'));
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

	chartDivider.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

	chartSpanner.bind(
		'mousedown',
		function(event) {
			event.stopPropagation();
		}
	);

});

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

///////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////

// switch from blocking to reachLeft for the chart boxes
$(document).on('click', '.gridster .spanner_create.blocking.gs-w:not(.divider)', function(){
	$(this).addClass('doubled');
	$(this).removeClass('blocking');
	$(this).attr('data-sizex','2');
	$(this).next().addClass('trashed');
	// $('.trashed').remove();
	$(this).append('<div class="box"></div>');
});


