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

// sort serialization
serialization = Gridster.sort_by_row_and_col_asc(serialization);

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
serializationDivider = Gridster.sort_by_row_and_col_asc(serializationDivider);

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