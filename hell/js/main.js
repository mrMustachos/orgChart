$(window).ready(function() {

	// clean up name list
	$(function(){
		$('#nameList').listnav();
		$('.ln-letters a.ln-disabled').each(function() {
			var classes = $(this).attr('class');
			$(this).replaceWith('<div class="empty '+ classes+'">' + $(this).text() + '</div>')
		});
		
		var lis = $("#nameList li");
		for(var i = 0; i < lis.length; i+=6) {
			lis.slice(i, i+6).wrapAll("<li class='li_group'><ul></ul></li>");
		}

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
	// $('.gridster li.doubled, .gridster li.divider.tripled').attr('data-sizex','2');
	// $('.gridster li.tripled').attr('data-sizex','3');

	// $('.gridster li.stepped').each(function() {
	// 	var magicNumber = $(this).attr('data-row');
	// 	var pullUp = parseInt(magicNumber) - 3;

	// 	console.log(magicNumber);
	// 	console.log(pullUp);
	// 	$(this).attr('data-row', pullUp);	

	// });

	$(function(){
		$('.gridster .gs_w').each(function() {
			var fillIn = $(this).attr('htmlcontent');
			var radioSilence = $(this).attr('blockcontent');

			$("input[value=" + radioSilence + "].radioBtnClass").attr("disabled", true);
			$("input[value=" + radioSilence + "].radioBtnClass").parent().addClass('used');

			$(this).html(fillIn);
			// $(this).removeAttr('htmlcontent');

			if ($('.gridster ul').has('li')) {
				$('button:not(#deployr)').prop("disabled", false);
			}

		});

	});


	var grid_canvas = $(".gridster > ul").gridster({
		autogenerate_stylesheet: false,
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		avoid_overlapped_widgets: false,
		min_cols: 36,
		shift_larger_widgets_down: false,
		
		serialize_params: function($w, wgd) {
			return {
				id: $($w).attr('id'),
				class: $($w).attr('class'),
				htmlContent: $($w).html(),
				blockContent: $($w).attr('blockContent'),
				col: $($w).attr('data-col'),
				row: $($w).attr('data-row'),
				size_x: $($w).attr('data-sizex'),
				size_y: $($w).attr('data-sizey'),
				// col: wgd.col,
				// row: wgd.row,
				// size_x: wgd.size_x,
				// size_y: wgd.size_y,
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
		{ col: 17, row: 1, size_x: 1, size_y: 5 },
		{ col: 18, row: 1, size_x: 1, size_y: 5 },
		{ col: 19, row: 1, size_x: 1, size_y: 5 },
		{ col: 20, row: 1, size_x: 1, size_y: 5 },
		{ col: 21, row: 1, size_x: 1, size_y: 5 },
		{ col: 22, row: 1, size_x: 1, size_y: 5 },
		{ col: 23, row: 1, size_x: 1, size_y: 5 },
		{ col: 24, row: 1, size_x: 1, size_y: 5 },
		{ col: 25, row: 1, size_x: 1, size_y: 5 },
		{ col: 26, row: 1, size_x: 1, size_y: 5 },
		{ col: 27, row: 1, size_x: 1, size_y: 5 },
		{ col: 28, row: 1, size_x: 1, size_y: 5 },
		{ col: 29, row: 1, size_x: 1, size_y: 5 },
		{ col: 30, row: 1, size_x: 1, size_y: 5 },
		{ col: 31, row: 1, size_x: 1, size_y: 5 },
		{ col: 32, row: 1, size_x: 1, size_y: 5 },
		{ col: 33, row: 1, size_x: 1, size_y: 5 },
		{ col: 34, row: 1, size_x: 1, size_y: 5 },
		{ col: 35, row: 1, size_x: 1, size_y: 5 },
		{ col: 36, row: 1, size_x: 1, size_y: 5 }
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
		{ col: 17, row: 1, size_x: 1, size_y: 1 },
		{ col: 18, row: 1, size_x: 1, size_y: 1 },
		{ col: 19, row: 1, size_x: 1, size_y: 1 },
		{ col: 20, row: 1, size_x: 1, size_y: 1 },
		{ col: 21, row: 1, size_x: 1, size_y: 1 },
		{ col: 22, row: 1, size_x: 1, size_y: 1 },
		{ col: 23, row: 1, size_x: 1, size_y: 1 },
		{ col: 24, row: 1, size_x: 1, size_y: 1 },
		{ col: 25, row: 1, size_x: 1, size_y: 1 },
		{ col: 26, row: 1, size_x: 1, size_y: 1 },
		{ col: 27, row: 1, size_x: 1, size_y: 1 },
		{ col: 28, row: 1, size_x: 1, size_y: 1 },
		{ col: 29, row: 1, size_x: 1, size_y: 1 },
		{ col: 30, row: 1, size_x: 1, size_y: 1 },
		{ col: 31, row: 1, size_x: 1, size_y: 1 },
		{ col: 32, row: 1, size_x: 1, size_y: 1 },
		{ col: 33, row: 1, size_x: 1, size_y: 1 },
		{ col: 34, row: 1, size_x: 1, size_y: 1 },
		{ col: 35, row: 1, size_x: 1, size_y: 1 },
		{ col: 36, row: 1, size_x: 1, size_y: 1 }
	];

	// sort Blocks
	dividers = grid_canvas.sort_by_row_and_col_asc(dividers);

	grid_canvas.generate_stylesheet({rows: 620, cols: 36});

	$('#add_block').on('click', function(e, i) {
		e.preventDefault();
		$.each(blocks, function(i, widget){
			grid_canvas.add_widget('<li class="blocking" blockcontent="holder"></li>', this.size_x, this.size_y, this.col, this.row);
		});

		$('#add_div, #edit_block, #remove_div, #remove_block, #insert_div, #insert_block, #block_connectors, #half_step, #half_stepRemove, #seralize, #archive, #add_span2, #add_span3').prop("disabled", false);

		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});

	});

	////// add in a block row /////////////////////////////////////////////////////////////////

	
	$('#insert_block').on('click', function(e, i) {
		e.preventDefault();

		var insertBlock = $('.gridster .gs_w:not(.divider)');
		var insertBlockLockBTN = $('.insertion_time');

		$.each('.insertion_time', function(event) {
			insertBlock.addClass('insertionPoint');
			insertBlockLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			insertBlock.removeClass('insertionPoint');
			insertBlockLockBTN.removeClass('active');
		}, function() {
			return (insertBlock.is(":visible"));
		});

		insertBlock.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$(document).on('click', '.insertionPoint.gs_w:not(.divider)', function(event){
		event.preventDefault();

		if ($(this).attr('data-row')){

			var backCut = $(this).attr('data-row');
			var rightHereBlock = parseInt(backCut) + 5;

			console.log(backCut);
			console.log(rightHereBlock);

			$.each(blocks, function(i, widget){
				grid_canvas.add_widget('<li class="blocking" blockcontent="holder"></li>', this.size_x, this.size_y, this.col, rightHereBlock);
			});

			$(".gridster li").removeAttr('id');
			$(".gridster li").each(function(i) {
				i = i + 1;
				$(this).attr('id', 'li' + i);
			});
			
		}

	});

	////// remove a block row /////////////////////////////////////////////////////////////////

	$('#remove_block').on('click', function(e, i) {
		e.preventDefault();

		var removeBlock = $('.gridster .gs_w:not(.divider)');
		var removeBlockFirst = $('.gridster .gs_w[data-col=1]');
		var removeBlockLockBTN = $('.ejection_time');

		$.each('.ejection_time', function(event) {
			removeBlock.addClass('removalPoint');
			removeBlockFirst.addClass('first');
			removeBlockLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			removeBlock.removeClass('removalPoint');
			removeBlockFirst.removeClass('first');
			removeBlockLockBTN.removeClass('active');
		}, function() {
			return (removeBlock.is(":visible"));
		});

		removeBlock.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$(document).on('click', '.removalPoint.gs_w:not(.divider)', function(event){
		event.preventDefault();

		if ($(this).attr('data-row')){

			var goodBye = $(this).attr('data-row');
			var lineLeader = $('.gridster .removalPoint.first.gs_w[data-row='+goodBye+']').attr('id');
			$(this).prepend('<div class="newtext">'+lineLeader+'</div>');

			var first = $('.newtext').text().replace(/[^0-9]/gi, '');
			var firstIn = parseInt(first) - 1;
			var lastOut = parseInt(firstIn) + 35;

			var things = $('.gridster li'), index;
			for (index = firstIn; index < things.length; index++) {
				grid_canvas.remove_widget( $('.gridster li').eq( Math.min(index,lastOut) ));
			}
			
			$('.newtext').remove();

			console.log(goodBye);
			console.log(lineLeader);
			console.log(firstIn);
			console.log(lastOut);

			$(".gridster li").removeAttr('id');
			$(".gridster li").each(function(i) {
				i = i + 1;
				$(this).attr('id', 'li' + i);
			});

		}

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

	////// add in a div row /////////////////////////////////////////////////////////////////

	$('#insert_div').on('click', function(e, i) {
		e.preventDefault();

		var insertBlock_div = $('.gridster .gs_w:not(.divider)');
		var insertBlock_divLockBTN = $('.insertion_time_div');

		$.each('.insertion_time_div', function(event) {
			insertBlock_div.addClass('insertionPoint_div');
			insertBlock_divLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			insertBlock_div.removeClass('insertionPoint_div');
			insertBlock_divLockBTN.removeClass('active');
		}, function() {
			return (insertBlock_div.is(":visible"));
		});

		insertBlock_div.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$(document).on('click', '.insertionPoint_div.gs_w:not(.divider)', function(event){
		event.preventDefault();

		if ($(this).attr('data-row')){

			var backCutDiv = $(this).attr('data-row');
			var rightHereDiv = parseInt(backCutDiv);

			console.log(backCutDiv);
			console.log(rightHereDiv);

			$.each(dividers, function(i, widget){
				grid_canvas.add_widget('<li class="divider blocking"></li>', this.size_x, this.size_y, this.col, rightHereDiv);
			});

			$(".gridster li").removeAttr('id');
			$(".gridster li").each(function(i) {
				i = i + 1;
				$(this).attr('id', 'li' + i);
			});
			
		}

	});

	////// remove a div row /////////////////////////////////////////////////////////////////

	$('#remove_div').on('click', function(e, i) {
		e.preventDefault();

		var removeDiv = $('.gridster .gs_w.divider');
		var removeDivFirst = $('.gridster .gs_w[data-col=1]');
		var removeDivLockBTN = $('.ejection_time_div');

		$.each('.ejection_time_div', function(event) {
			removeDiv.addClass('removalPointDiv');
			removeDivFirst.addClass('first');
			removeDivLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			removeDiv.removeClass('removalPointDiv');
			removeDivFirst.removeClass('first');
			removeDivLockBTN.removeClass('active');
		}, function() {
			return (removeDiv.is(":visible"));
		});

		removeDiv.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$(document).on('click', '.removalPointDiv.gs_w.divider', function(event){
		event.preventDefault();

		if ($(this).attr('data-row')){

			var goodByeDiv = $(this).attr('data-row');
			var lineLeaderDiv = $('.gridster .removalPointDiv.first.gs_w[data-row='+goodByeDiv+']').attr('id');
			$(this).prepend('<div class="newtext">'+lineLeaderDiv+'</div>');

			var firstDiv = $('.newtext').text().replace(/[^0-9]/gi, '');
			var firstDivIn = parseInt(firstDiv) - 1;
			var lastOutDiv = parseInt(firstDivIn) + 35;

			var things = $('.gridster li'), index;
			for (index = firstDivIn; index < things.length; index++) {
				grid_canvas.remove_widget( $('.gridster li').eq( Math.min(index,lastOutDiv) ));
			}
			
			$('.newtext').remove();

			console.log(goodByeDiv);
			console.log(lineLeaderDiv);
			console.log(firstDivIn);
			console.log(lastOutDiv);

			$(".gridster li").removeAttr('id');
			$(".gridster li").each(function(i) {
				i = i + 1;
				$(this).attr('id', 'li' + i);
			});

		}

	});

	////// add in a half step to rows /////////////////////////////////////////////////////////////////

	
	$('#half_step').on('click', function(e, i) {
		e.preventDefault();

		var stepUpBlock = $('.gridster .gs_w');
		var stepUpIconBlock = $('.stepUpTime span');
		var stepUpBlockLockBTN = $('.stepUpTime');

		$.each('.stepUpTime', function(event) {
			stepUpBlock.addClass('stepUpPoint');
			stepUpIconBlock.toggleClass('icon-add icon-working');
			stepUpBlockLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			stepUpBlock.removeClass('stepUpPoint');
			stepUpIconBlock.toggleClass('icon-add icon-working');
			stepUpBlockLockBTN.removeClass('active');
		}, function() {
			return (stepUpBlock.is(":visible"));
		});

		stepUpBlock.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$(document).on('click', '.stepUpPoint.gs_w', function(event){
		event.preventDefault();

		var currentClick = $(this).attr('data-row');
		var minArray = parseInt(currentClick);

		console.log(currentClick);
		$('.stepUpPoint.gs_w[data-row='+currentClick+']').addClass('stepped');

		$(this).each(function() {

			var array = $('.gridster .gs_w').map(function() {
				return $(this).data('row');
			});

			function ArrNoDupe(a) {
				var temp = {};
				for (var i = 0; i < a.length; i++)
					temp[a[i]] = true;
				var r = [];
				for (var k in temp)
					r.push(parseInt(k));
				return r;
			}
			array = ArrNoDupe(array);

			console.log(array);

			var refinedArray = $.map(array, function(n) {
				return n > minArray ? n + 0 : null;
			});

			console.log(refinedArray);

			var valueToFind = refinedArray;

			$('.gridster .gs_w').each(function() {
				var infoData = $(this).data('row');

				
				for (i = 0; i < valueToFind.length; i++) {
					if (valueToFind[i] == infoData) {

						var addingValue = parseInt(infoData) - 3;
						$(this).removeAttr('data-row');
						$(this).attr('data-row', addingValue);
						$(this).removeData('row');
						// $(this).addClass('stepped');

					}
				}

			});
		});

	});

////// Remove half step to rows /////////////////////////////////////////////////////////////////

	
	$('#half_stepRemove').on('click', function(e, i) {
		e.preventDefault();

		var stepUpRemoveBlock = $('.gridster .gs_w');
		var stepUpRemoveIconBlock = $('.stepDownTime span');
		var stepUpRemoveBlockLockBTN = $('.stepDownTime');

		$.each('.stepDownTime', function(event) {
			stepUpRemoveBlock.addClass('stepUpRemovePoint');
			stepUpRemoveIconBlock.toggleClass('icon-clear icon-working');
			stepUpRemoveBlockLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			stepUpRemoveBlock.removeClass('stepUpRemovePoint');
			stepUpRemoveIconBlock.toggleClass('icon-clear icon-working');
			stepUpRemoveBlockLockBTN.removeClass('active');
		}, function() {
			return (stepUpRemoveBlock.is(":visible"));
		});

		stepUpRemoveBlock.bind("mousedown", function(event) {
			e.stopPropagation();
		});

	});

	$(document).on('click', '.stepUpRemovePoint.gs_w', function(event){
		event.preventDefault();

		var currentClickRemove = $(this).attr('data-row');
		var minArrayRemove = parseInt(currentClickRemove);

		console.log(currentClickRemove);
		$('.stepUpRemovePoint.gs_w[data-row='+currentClickRemove+']').removeClass('stepped');

		$(this).each(function() {

			var arrayRemove = $('.gridster .gs_w').map(function() {
				return $(this).data('row');
			});

			function ArrNoDupeRemove(a) {
				var temp = {};
				for (var i = 0; i < a.length; i++)
					temp[a[i]] = true;
				var r = [];
				for (var k in temp)
					r.push(parseInt(k));
				return r;
			}
			arrayRemove = ArrNoDupeRemove(arrayRemove);

			console.log(arrayRemove);

			var refinedArrayRemove = $.map(arrayRemove, function(n) {
				return n > minArrayRemove ? n + 0 : null;
			});

			console.log(refinedArrayRemove);

			var valueToFindRemove = refinedArrayRemove;

			$('.gridster .gs_w').each(function() {
				var infoDataRemove = $(this).data('row');

				
				for (i = 0; i < valueToFindRemove.length; i++) {
					if (valueToFindRemove[i] == infoDataRemove) {

						var removingRemove = parseInt(infoDataRemove) + 3;
						$(this).removeAttr('data-row');
						$(this).attr('data-row', removingRemove);
						$(this).removeData('row');
						// $(this).addClass('stepped');

					}
				}

			});
		});

	});

	////// add in a div connecters //////////////////////////////////////////////////////////

	$('#block_connectors').on('click', function(e, i) {
		e.preventDefault();

		var connectionBlock = $('.gridster .gs_w:not(.divider)');
		var connectionBlockLockBTN = $('.saftyLine');

		$.each('.saftyLine', function(event) {
			connectionBlock.addClass('connectionPoint');
			connectionBlockLockBTN.addClass('active');
			e.preventDefault();
		});

		$(document).bindIf("mousedown", function() {
			console.log("Event handled.");
			connectionBlock.removeClass('connectionPoint');
			connectionBlockLockBTN.removeClass('active');
		}, function() {
			return (connectionBlock.is(":visible"));
		});

		connectionBlock.bind("mousedown", function(event) {
			e.stopPropagation();
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

	$('#deployr').on('click', function(e, i) {
		e.preventDefault();

		$('li.trashed').remove();
		$('li.blocking').remove();
		$('.gridster li').removeAttr('htmlcontent');
		$(".gridster li").removeAttr('id');
		// $(".gridster li").each(function(i) {
		// 	i = i + 1;
		// 	$(this).attr('id', 'li' + i);
		// });

	});

	$('#archive').on('click', function(e, i) {
		e.preventDefault();

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

		$('#deployr').prop("disabled", false);

	});

});
