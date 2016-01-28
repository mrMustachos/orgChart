
$(window).ready(function() {
	var localData = JSON.parse(localStorage.getItem('positions'));

	if (localData != null) {
		$.each(localData, function(i, value) {
			var id_name;

			id_name = "#";
			id_name = id_name + value.id;
			console.log(id_name);

			$(id_name).attr({
				"data-col": value.col,
				"data-row": value.row,
				"data-sizex": value.size_x,
				"data-sizey": value.size_y,
				"class": value.class
			});
		});
	} else {
		console.log('No data returned by the server');
	}

	var grid_canvas = $(".gridster > ul").gridster({
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		min_cols: 17,
		shift_larger_widgets_down: false,

		serialize_params: function($w, wgd) {
			return {
				id: $($w).attr('id'),
				class: $($w).attr('class'),
				col: wgd.col,
				row: wgd.row,
				size_x: wgd.size_x,
				size_y: wgd.size_y,
			};
		},

		// draggable.stop: function(event, ui){} -- A callback for when dragging stops.
		// You can also implement other draggable options based on your requirements
		// draggable.start: function(event, ui){} -- A callback for when dragging starts.
		// draggable.drag: function(event, ui){} -- A callback for when the mouse is moved during the dragging.	

		draggable: {
			stop: function(event, ui) {

				// .serialize( )
				// Creates an array of objects representing the current position of all widgets in the grid.
				// Returns an Array of Objects (ready to be encoded as a JSON string) with the data specified by the serialize_params option
				// JSON.stringify() converts a primitive value, object or array to a JSON-formatted string that can later be parsed with JSON.parse().

				var positions = JSON.stringify(this.serialize());
				localStorage.setItem('positions', positions);

			}
		}
	}).data('gridster');

	var blocks = [
		['<li class="blocking"></li>', 1, 5, 1, 1],
		['<li class="blocking"></li>', 1, 5, 2, 1],
		['<li class="blocking"></li>', 1, 5, 3, 1],
		['<li class="blocking"></li>', 1, 5, 4, 1],
		['<li class="blocking"></li>', 1, 5, 5, 1],
		['<li class="blocking"></li>', 1, 5, 6, 1],
		['<li class="blocking"></li>', 1, 5, 7, 1],
		['<li class="blocking"></li>', 1, 5, 8, 1],
		['<li class="blocking"></li>', 1, 5, 9, 1],
		['<li class="blocking"></li>', 1, 5, 10, 1],
		['<li class="blocking"></li>', 1, 5, 11, 1],
		['<li class="blocking"></li>', 1, 5, 12, 1],
		['<li class="blocking"></li>', 1, 5, 13, 1],
		['<li class="blocking"></li>', 1, 5, 14, 1],
		['<li class="blocking"></li>', 1, 5, 15, 1],
		['<li class="blocking"></li>', 1, 5, 16, 1],
		['<li class="blocking"></li>', 1, 5, 17, 1]
	];

	var dividers = [
		['<li class="divider blocking"></li>', 1, 1, 1, 1],
		['<li class="divider blocking"></li>', 1, 1, 2, 1],
		['<li class="divider blocking"></li>', 1, 1, 3, 1],
		['<li class="divider blocking"></li>', 1, 1, 4, 1],
		['<li class="divider blocking"></li>', 1, 1, 5, 1],
		['<li class="divider blocking"></li>', 1, 1, 6, 1],
		['<li class="divider blocking"></li>', 1, 1, 7, 1],
		['<li class="divider blocking"></li>', 1, 1, 8, 1],
		['<li class="divider blocking"></li>', 1, 1, 9, 1],
		['<li class="divider blocking"></li>', 1, 1, 10, 1],
		['<li class="divider blocking"></li>', 1, 1, 11, 1],
		['<li class="divider blocking"></li>', 1, 1, 12, 1],
		['<li class="divider blocking"></li>', 1, 1, 13, 1],
		['<li class="divider blocking"></li>', 1, 1, 14, 1],
		['<li class="divider blocking"></li>', 1, 1, 15, 1],
		['<li class="divider blocking"></li>', 1, 1, 16, 1],
		['<li class="divider blocking"></li>', 1, 1, 17, 1],
	];

	$('#add_block').on('click', function(e, i) {
		e.preventDefault();
		$.each(blocks, function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create noping div_unlocked nameDROP box_unlocked name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .spanner3_unlock, .div_noped, .div_unlock, .namer_unlock, .block_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			grid_canvas.add_widget.apply(grid_canvas, widget, positions)
			
			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('#add_div').on('click', function(e, i) {
		e.preventDefault();
		$.each(dividers, function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create noping div_unlocked nameDROP box_unlocked name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .spanner3_unlock, .div_noped, .div_unlock, .namer_unlock, .block_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			grid_canvas.add_widget.apply(grid_canvas, widget, positions)

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('#delete_top').on('click', function(e, i) {
		e.preventDefault();
		$('.gridster li[data-row=1]').addClass('undo');

		$.each(dividers, function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create noping div_unlocked nameDROP box_unlocked name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .spanner3_unlock, .div_noped, .div_unlock, .namer_unlock, .block_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			var killer = $('.gridster li.undo'), index;
			for (index = 0; index < killer.length; index++) {
				grid_canvas.remove_widget(killer.eq(Math.min(index,16)));
			}

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('#seralize').on('click', function(e, i) {
		e.preventDefault();
		var s = grid_canvas.serialize();
		$('#log').val(JSON.stringify(s));
	});

	$('.block_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w:not(.divider)', function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create noping div_unlocked nameDROP name_holder');
			$('.div_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .spanner3_unlock, .div_noped, .div_unlock, .namer_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			$('.block_unlock').toggleClass('active');
			$('.block_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w:not(.divider)').toggleClass('box_unlocked');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('.div_noped').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w', function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create div_unlocked box_unlocked nameDROP name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .spanner3_unlock, .block_unlock, .div_unlock, .namer_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			$('.div_noped').toggleClass('active');
			$('.div_noped span').toggleClass('icon-nope icon-working');
			$('.gridster .gs_w').toggleClass('noping');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('.div_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w.divider', function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create noping box_unlocked nameDROP name_holder');
			$('.block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .spanner3_unlock, .block_unlock, .div_noped, .namer_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			$('.div_unlock').toggleClass('active');
			$('.div_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w.divider').toggleClass('div_unlocked');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('.spanner2_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w', function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner3_create noping div_unlocked box_unlocked nameDROP name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner3_unlock, .block_unlock, .div_noped, .div_unlock, .namer_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			$('.spanner2_unlock').toggleClass('active');
			$('.spanner2_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w').toggleClass('spanner2_create');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('.spanner3_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w', function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create noping div_unlocked box_unlocked nameDROP name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.namer_unlock span').removeClass('icon-working').addClass('icon-name');
			$('.spanner2_unlock, .block_unlock, .div_noped, .div_unlock, .namer_unlock').removeClass('active');
			$('.nameBank').addClass('hide');

			// button action
			$('.spanner3_unlock').toggleClass('active');
			$('.spanner3_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w').toggleClass('spanner3_create');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});

	$('.namer_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .box.gs_w', function(i, widget){
			// clear others
			$('.gridster .gs_w').removeClass('spanner2_create spanner3_create noping div_unlocked box_unlocked name_holder');
			$('.div_unlock span, .block_unlock span').removeClass('icon-working').addClass('icon-edit');
			$('.spanner2_unlock span, .spanner3_unlock span').removeClass('icon-working').addClass('icon-hop');
			$('.div_noped span').removeClass('icon-working').addClass('icon-nope');
			$('.spanner2_unlock, .spanner3_unlock, .block_unlock, .div_noped, .div_unlock').removeClass('active');

			// button action
			$('.namer_unlock').toggleClass('active');
			$('.namer_unlock span').toggleClass('icon-name icon-working');
			$('.gridster .box.gs_w').toggleClass('nameDROP');
			$('.nameBank').addClass('hide');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
		});
	});
});
