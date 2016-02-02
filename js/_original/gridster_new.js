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
		widget_margins: [3, 3],
		widget_base_dimensions: [110, 110],
		
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

		draggable: {
			stop: function(event, ui) {
				var positions = JSON.stringify(this.serialize());
				localStorage.setItem('positions', positions);
				$.post("process.php", {
					"positions": positions
				}, function(data) {
					console.log(data);
					if (data == 200) console.log("Data successfully sent to the server");
					else console.log
				});
			}
		}
	}).data('gridster');
});
