
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

	$('.reserve').remove();

	// widget_selector: "> ul"
	// Define which elements are the widgets. Can be a CSS Selector string or a jQuery collection of HTMLElements.

	// widget_margins: [5, 5]
	// Horizontal and vertical margins respectively for widgets.

	// widget_base_dimensions: [110, 110]
	// Base widget dimensions in pixels. The first index is the width, the second is the height.

	var grid_canvas = $(".gridster > ul").gridster({
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		min_cols: 17,
		shift_larger_widgets_down: false,

		// serialize_params: function($w, wgd) { return { id: $($w).attr('id'),col: wgd.col, row: wgd.row,size_x: wgd.size_x,size_y: wgd.size_y }
		// A function to return serialized data for each each widget, used when calling the serialize method. Two arguments are passed: 
		// $w: the jQuery wrapped HTMLElement which is used to get the id, and wgd: the grid coords object with keys col, row, size_x and size_y.


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

				// With HTML5, web pages can store data locally within the user's browser.
				// Earlier, this was done with cookies. However, Web Storage is more secure and faster. 
				// The data is not included with every server request, but used ONLY when asked for. 
				// It is also possible to store large amounts of data, without affecting the website's performance.
				// The data is stored in key/value pairs, and a web page can only access data stored by itself.

				localStorage.setItem('positions', positions);


				$.post(
					/*
					"process.php", {
						"positions": positions
					},
					*/
					function(data) {

						// this is where you can check if your data is sent to the server or not.
						// A status of 200 implies success

						console.log(data);
						if (data == 200)
							console.log("Data successfully sent to the server");
						else
							console.log
					}
				);

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
			// i = i+1;

			// grid_canvas.add_widget.apply(grid_canvas, widget, positions).attr('id', 'li' + i)
			grid_canvas.add_widget.apply(grid_canvas, widget, positions)
			
			var positions = JSON.stringify(grid_canvas.serialize_changed());

			// With HTML5, web pages can store data locally within the user's browser.
			// Earlier, this was done with cookies. However, Web Storage is more secure and faster. 
			// The data is not included with every server request, but used ONLY when asked for. 
			// It is also possible to store large amounts of data, without affecting the website's performance.
			// The data is stored in key/value pairs, and a web page can only access data stored by itself.

			localStorage.setItem('positions', positions);


			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {

					// this is where you can check if your data is sent to the server or not.
					// A status of 200 implies success

					console.log(data);
					if (data == 200)
						console.log("Data successfully sent to the server");
					else
						console.log
				}
			);
		});
		
		$('.gs_w').each(function(i){
			i = i+1;
			$(this).attr('id', 'li');
			$(this).attr('id', 'li' + i);
		});

	});

	$('#add_div').on('click', function(e, i) {
		e.preventDefault();
		$.each(dividers, function(i, widget){
			grid_canvas.add_widget.apply(grid_canvas, widget, positions)
			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						console.log("Data successfully sent to the server");
					else
						console.log
				}
			);
		});
		$('.gs_w').each(function(i){
			i = i+1;
			$(this).attr('id', 'li');
			$(this).attr('id', 'li' + i);
		});
	});

	$('#delete_top').on('click', function(e, i) {
		e.preventDefault();

		$('.gridster li[data-row=1]').addClass('undo');

		$.each(dividers, function(i, widget){
			var killer = $('.gridster li.undo'), index;

			for (index = 0; index < killer.length; index++) {
				grid_canvas.remove_widget(killer.eq(Math.min(index,16)));
			}
			
			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						console.log("Data successfully sent to the server");
					else
						console.log
				}
			);
		});
		$('.gs_w').each(function(i){
			i = i+1;
			$(this).attr('id', 'li');
			$(this).attr('id', 'li' + i);
		});
	});

	$('#seralize').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gs_w', function(i, widget){
			var positions = JSON.stringify(grid_canvas.serialize());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						// console.log("Data successfully sent to the server");
						console.log
					else
						console.log
				}
			);
		});
	});



	$('.block_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w:not(.divider)', function(i, widget){
			$('.block_unlock').toggleClass('active');
			$('.block_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w:not(.divider)').toggleClass('box_unlocked');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						// console.log("Data successfully sent to the server");
						console.log
					else
						console.log
				}
			);
		});
	});

	$('.div_noped').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w', function(i, widget){
			$('.div_noped').toggleClass('active');
			$('.div_noped span').toggleClass('icon-nope icon-working');
			$('.gridster .gs_w').toggleClass('noping');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						// console.log("Data successfully sent to the server");
						console.log
					else
						console.log
				}
			);
		});
	});

	$('.div_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w.divider', function(i, widget){
			$('.div_unlock').toggleClass('active');
			$('.div_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w.divider').toggleClass('div_unlocked');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						// console.log("Data successfully sent to the server");
						console.log
					else
						console.log
				}
			);
		});
	});

	$('.spanner2_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w', function(i, widget){
			$('.spanner2_unlock').toggleClass('active');
			$('.spanner2_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w').toggleClass('spanner2_create');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						// console.log("Data successfully sent to the server");
						console.log
					else
						console.log
				}
			);
		});
	});

	$('.spanner3_unlock').on('click', function(e, i) {
		e.preventDefault();
		$.each('.gridster .gs_w', function(i, widget){
			$('.spanner3_unlock').toggleClass('active');
			$('.spanner3_unlock span').toggleClass('icon-edit icon-working');
			$('.gridster .gs_w').toggleClass('spanner3_create');

			var positions = JSON.stringify(grid_canvas.serialize_changed());
			localStorage.setItem('positions', positions);
			$.post(
				/*
				"process.php", {
					"positions": positions
				},
				*/
				function(data) {
					console.log(data);
					if (data == 200)
						// console.log("Data successfully sent to the server");
						console.log
					else
						console.log
				}
			);
		});
	});

});
