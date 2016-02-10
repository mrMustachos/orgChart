$(window).ready(function() {

	// clean up name list
	$(function(){
		$('#nameList').listnav();
		$('.ln-letters a.ln-disabled').each(function() {
			var classes = $(this).attr('class');
			$(this).replaceWith('<div class="empty '+ classes+'">' + $(this).text() + '</div>')
		});
	});

	// tabbed buttons
	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

			g.preventDefault();
		} );
	})(jQuery);


	var localData = JSON.parse(localStorage.getItem('positions'));

	if (localData != null) {
		$.each(localData, function(i, value) {

			var id_name;
			id_name = "#";
			id_name = id_name + value.id;

			// console.log(id_name);

			$(id_name).attr({
				"data-col": value.col,
				"data-row": value.row,
				"data-sizex": value.size_x,
				"data-sizey": value.size_y,
				"class": value.class,
				"htmlContent": value.htmlContent,
				"blockContent": value.blockContent
			});

		});
	} else {
		console.log('No data returned by the server');
	}

	$('.reserve').remove();
	$('.gridster .gs_w').empty();
	$('.gridster li.doubled, .gridster li.divider.tripled').attr('data-sizex','2');
	$('.gridster li.tripled').attr('data-sizex','3');

	$(function(){
		$('.gridster .gs_w').each(function() {
			var fillIn = $(this).attr('htmlcontent');
			var radioSilence = $(this).attr('blockcontent');

			$("input[value=" + radioSilence + "].radioBtnClass").attr("disabled", true);
			$("input[value=" + radioSilence + "].radioBtnClass").parent().addClass('used');

			$(this).html(fillIn);
			$(this).removeAttr('htmlcontent');

			if ($('.gridster ul').has('li')) {
				$('button').prop("disabled", false);
			}

		});
	});


	var grid_canvas = $(".gridster > ul").gridster({
		autogenerate_stylesheet: false,
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		min_cols: 17,
		shift_larger_widgets_down: false,
		
		serialize_params: function($w, wgd) {
			return {
				id: $($w).attr('id'),
				class: $($w).attr('class'),
				htmlContent: $($w).html(),
				blockContent: $($w).attr('blockContent'),
				col: wgd.col,
				row: wgd.row,
				size_x: wgd.size_x,
				size_y: wgd.size_y,
			};
		}/*,

		draggable: {
			stop: function(event, ui) {

				$(".gridster li").removeAttr('id');
				$(".gridster li").each(function(i) {
					i = i + 1;
					$(this).attr('id', 'li' + i);
				});

				var positions = JSON.stringify(grid_canvas.serialize());
				localStorage.setItem('positions', positions);
				$.post("process.php", {
					"positions": positions
				}, function(data) {
					console.log(data);
					if (data == 200) console.log("Data successfully sent to the server");
					else console.log
				});
			}
		}*/
	}).data('gridster');

	var blocks = [
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

	// sort Blocks
	blocks = grid_canvas.sort_by_row_and_col_asc(blocks);

	var dividers = [
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

	// sort Blocks
	dividers = grid_canvas.sort_by_row_and_col_asc(dividers);

	grid_canvas.generate_stylesheet({rows: 510, cols: 17});

	$('#add_block').on('click', function(e, i) {
		e.preventDefault();
		$.each(blocks, function(i, widget){
			grid_canvas.add_widget('<li class="blocking" blockcontent="holder"></li>', this.size_x, this.size_y, this.col, this.row);
		});

		$('#add_div, #edit_block, #seralize, #tidy, #deployr, #add_span2, #add_span3').prop("disabled", false);

		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});

	});

	$('#add_div').on('click', function(e, i) {
		e.preventDefault();
		$.each(dividers, function(i, widget){
			grid_canvas.add_widget('<li class="divider blocking"></li>', this.size_x, this.size_y, this.col, this.row);
		});

		$('#edit_div').prop("disabled", false);

		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});

	});

	$('#edit_block').on('click', function(e, i) {
		e.preventDefault();

		var chartBlock = $('.gridster .gs_w:not(.divider)');
		var blockLockBTN = $('.block_unlock');
		var blockIconToggle = $('.block_unlock span');

		$.each('.block_unlock', function(event) {
			chartBlock.addClass('box_unlocked');
			blockLockBTN.addClass('active');
			blockIconToggle.removeClass('icon-edit').addClass('icon-working');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			chartBlock.removeClass('box_unlocked');
			blockLockBTN.removeClass('active');
			blockIconToggle.addClass('icon-edit').removeClass('icon-working');
		}, function() {
			return (chartBlock.is(":visible"));
		});

		chartBlock.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$('#edit_div').on('click', function(e, i) {
		e.preventDefault();

		var chartDivider = $('.gridster .gs_w.divider');
		var dividerLockBTN = $('.div_unlock');
		var dividerIconToggle = $('.div_unlock span');

		$.each('.div_unlock', function(event) {
			chartDivider.addClass('div_unlocked');
			dividerLockBTN.addClass('active');
			dividerIconToggle.removeClass('icon-edit').addClass('icon-working');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			chartDivider.removeClass('div_unlocked');
			dividerLockBTN.removeClass('active');
			dividerIconToggle.addClass('icon-edit').removeClass('icon-working');
		}, function() {
			return (chartDivider.is(":visible"));
		});

		chartDivider.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$('#add_nope').on('click', function(e, i) {
		e.preventDefault();

		var chartNope = $('.gridster .gs_w');
		var nopingBTN = $('.div_noped');
		var nopingIconToggle = $('.div_noped span');

		$.each('.div_noped', function(event) {
			chartNope.addClass('noping');
			nopingBTN.addClass('active');
			nopingIconToggle.removeClass('icon-nope').addClass('icon-working');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			chartNope.removeClass('noping');
			nopingBTN.removeClass('active');
			nopingIconToggle.addClass('icon-nope').removeClass('icon-working');
		}, function() {
			return (chartNope.is(":visible"));
		});

		chartNope.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$('#add_span2').on('click', function(e, i) {
		e.preventDefault();

		var chartSpanner2 = $('.gridster .blocking.gs_w');
		var chartSpanner2Again = $('.gridster .doubled.gs_w');
		var spanner2LockBTN = $('.spanner2_unlock');
		var spanner2iconToggle = $('.spanner2_unlock span');

		$.each('.spanner2_unlock', function(event) {
			chartSpanner2.addClass('spanner2_create');
			chartSpanner2Again.addClass('spanner2_create');
			spanner2LockBTN.addClass('active');
			spanner2iconToggle.removeClass('icon-hop').addClass('icon-working');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("nope handled.");
			chartSpanner2.removeClass('spanner2_create');
			chartSpanner2Again.removeClass('spanner2_create');
			spanner2LockBTN.removeClass('active');
			spanner2iconToggle.addClass('icon-hop').removeClass('icon-working');
		}, function() {
			return (chartSpanner2.is(":visible"));
		});

		chartSpanner2.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$('#add_span3').on('click', function(e, i) {
		e.preventDefault();

		var chartSpanner3 = $('.gridster .blocking.gs_w');
		var chartSpanner3Baby = $('.gridster .tripled.gs_w');
		var chartSpanner3Child = $('.gridster .tripled.gs_w .spannerBlock.gs_w');
		var spanner3LockBTN = $('.spanner3_unlock');
		var spanner3iconToggle = $('.spanner3_unlock span');

		$.each('.spanner3_unlock', function(event) {
			chartSpanner3.addClass('spanner3_create');

			chartSpanner3Baby.addClass('spanner3_create');
			chartSpanner3Child.addClass('spanner3_create');

			spanner3LockBTN.addClass('active');
			spanner3iconToggle.removeClass('icon-hop').addClass('icon-working');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("nope handled.");
			chartSpanner3.removeClass('spanner3_create');

			chartSpanner3Baby.removeClass('spanner3_create');
			chartSpanner3Child.removeClass('spanner3_create');

			spanner3LockBTN.removeClass('active');
			spanner3iconToggle.addClass('icon-hop').removeClass('icon-working');
		}, function() {
			return (chartSpanner3.is(":visible"));
		});

		chartSpanner3.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$('#add_name').on('click', function(e, i) {
		e.preventDefault();

		var chartNamer = $('.gridster .box.gs_w');
		var chartNamed = $('.gridster .box.gs_w.name_placed');
		var remover = $('.gridster .box.gs_w .remover')
		var namerLockBTN = $('.namer_unlock');
		var namericonToggle = $('.namer_unlock span');
		var namerBox = $('#nameBank');

		$.each('.namer_unlock', function(event) {
			chartNamer.addClass('nameDROP');
			chartNamed.addClass('nameDROP');
			namerLockBTN.addClass('active');
			namericonToggle.removeClass('icon-name').addClass('icon-working');
			remover.show();
		});

		$(document).bindIf("mousedown", function(evt) {

			if(evt.target.id == "nameBank")
				return;

			if($(evt.target).closest('#nameBank').length)
				return; 
					chartNamer.removeClass('nameDROP name_holder');
					chartNamed.removeClass('nameDROP');
					namerLockBTN.removeClass('active');
					namericonToggle.addClass('icon-name').removeClass('icon-working');
					namerBox.addClass('hide');
					remover.hide();

		}, function() {
			return (chartNamer.is(":visible"));
		});

		chartNamer.bind("mousedown", function(event) {
			e.stopPropagation();

		});

	});
	
	$('#seralize').on('click', function(e, i) {
		e.preventDefault();

		$('li.trashed').remove();
		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});

		var positions = JSON.stringify(grid_canvas.serialize());
		localStorage.setItem('positions', positions);
		
		$.post("process.php", {
			"positions": positions
		}, function(data) {
			console.log(data);
			if (data == 200) console.log("Data successfully sent to the server");
			else console.log
		});

	});
});
