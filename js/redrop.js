$(window).ready(function() {

	////// Center Chart in Window /////////////////////////////////////////////////////////////

	$('.chart').scrollTo(0);
	$.scrollTo(0);

	////// Svgeezy Fallback Code //////////////////////////////////////////////////////////////

	svgeezy.init(false, 'png');

	////// Clean Up Name List /////////////////////////////////////////////////////////////////

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
	$("#nameBank").hide().removeAttr('class');

	////// Tabbed Buttons /////////////////////////////////////////////////////////////////////

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

	////// Initiate Gridster //////////////////////////////////////////////////////////////////

	var grid_canvas = $(".gridster > ul").gridster({
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		avoid_overlapped_widgets: false,
		// autogenerate_stylesheet: false,
		min_cols: 35,
		shift_larger_widgets_down: false,
		
		serialize_params: function($w, wgd) {
			return {
				id: $($w).attr('id'),
				class: $($w).attr('class'),
				htmlContent: $($w).html(),
				tile_name: $($w).attr('data-tilename'),
				true_row: $($w).attr('data-truerow'),
				span_row: $($w).attr('data-spanpush'),
				col: $($w).attr('data-col'),
				row: $($w).attr('data-row'),
				size_x: $($w).attr('data-sizex'),
				size_y: $($w).attr('data-sizey'),
			};
		}
	}).data('gridster');

	////// Set Quick Calls ////////////////////////////////////////////////////////////////////

	var resetIDs = function () {
		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});
	}
	var fixOrder = function () {
		$('li.gs_w[data-col="01"]').attr('data-col','1');
		$('li.gs_w[data-col="02"]').attr('data-col','2');
		$('li.gs_w[data-col="03"]').attr('data-col','3');
		$('li.gs_w[data-col="04"]').attr('data-col','4');
		$('li.gs_w[data-col="05"]').attr('data-col','5');
		$('li.gs_w[data-col="06"]').attr('data-col','6');
		$('li.gs_w[data-col="07"]').attr('data-col','7');
		$('li.gs_w[data-col="08"]').attr('data-col','8');
		$('li.gs_w[data-col="09"]').attr('data-col','9');
	}
	var fixColumns = function () {

		var saftyValueGet = $('.gridster li[data-col="1"]');
		
		saftyValueGet.each(function() {
			var colValueNew = $(this).map(function() {
				return $(this).data('truerow');
			});

			$('.gridster .gs_w').each(function() {
				var rowDataNew = $(this).data('truerow');

				for (i = 0; i < colValueNew.length; i++) {
					if (colValueNew[i] == rowDataNew) {
						var trueRowNew = parseInt(rowDataNew);

						// $(this).removeAttr('data-truerow');
						$(this).removeAttr('data-row');
						$(this).attr('data-row', trueRowNew);
						$(this).removeData('truerow');
					}
				}
			});
		});
	}
	var setColumns = function () {

		var saftyRowValue = $('.gridster li[data-col="1"]');
		
		saftyRowValue.each(function() {
			$(this).removeAttr('data-truerow');
			var colValueGet = $(this).map(function() {
				return $(this).data('row');
			});

			$('.gridster .gs_w').each(function() {
				var rowDataGet = $(this).data('row');

				for (i = 0; i < colValueGet.length; i++) {
					if (colValueGet[i] == rowDataGet) {
						var trueRowGet = parseInt(rowDataGet);

						$(this).attr('data-truerow', trueRowGet);
						$(this).removeData('row');
					}
				}
			});
		});
	}
	var setSpans = function () {

		var spannerFix = $('.gridster .gs_w');
		
		spannerFix.each(function() {
			var spanValueGet = $(this).map(function() {
				return $(this).data('spanpush');
			});

			$('.gridster .gs_w').each(function() {
				var spanDataGet = $(this).data('spanpush');

				for (i = 0; i < spanValueGet.length; i++) {
					if (spanValueGet[i] == spanDataGet) {
						var spannerGet = parseInt(spanDataGet);

						// $(this).removeAttr('data-spanpush');
						$(this).removeAttr('style').css({'display': 'list-item', 'left': spannerGet+'px'});
						$(this).removeData('spanpush');
					}
				}
			});
		});
	}
	var resetChartHeight = function () {
		var chartHeight = $('.gridster ul').height();
			chartHeight = chartHeight+'px';

		$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': chartHeight});
	}
	function maxRow(selector) {
		// var min=null, max=null;
		var max=null;

		$(selector).each(function() {
			var row = parseInt($(this).attr('data-row'), 10);
			if (isNaN(row)) { return; }
			// if ((min===null) || (row < min)) { min = row; }
			if ((max===null) || (row > max)) { max = row; }
		});

		// return [min, max];
		return [max];
	}
	var chartBottom = function () {
		var bottomRow = maxRow('.gridster li');
			bottomRow = 'li.gs_w[data-row="'+ bottomRow +'"]';
			bottomRow = $(bottomRow);

		bottomRow.addClass('nope');
	}
	function maxCol(selector) {
		// var min=null, max=null;
		var max=null;

		$(selector).each(function() {
			var col = parseInt($(this).attr('data-col'), 10);
			if (isNaN(col)) { return; }
			// if ((min===null) || (col < min)) { min = col; }
			if ((max===null) || (col > max)) { max = col; }
		});

		// return [min, max];
		return [max];
	}
	function minCol(selector) {
		var min=null;

		$(selector).each(function() {
			var col = parseInt($(this).attr('data-col'), 10);
			if (isNaN(col)) { return; }
			if ((min===null) || (col < min)) { min = col; }
		});

		return [min];
	}
	var addChartPadding = function () {
		var lastCol = maxCol('.gridster li');
		var tileWidth = $('.gridster li').width();
			tileWidth = tileWidth + 10;
		var totalChartWidth = tileWidth * lastCol;
			totalChartWidth = totalChartWidth + 50;
			totalChartWidth = totalChartWidth+'px';

		$('.gridster').css('width', totalChartWidth);
	}
	var dataClass = function () {
		$('.gridster .gs_w').each(function() {

			if ($(this).attr('data-sizey') == '1') {
			}
			else {
				var dataClassMake = $(this).attr('class');
				$(this).removeAttr('data-class')
				$(this).attr('data-class', dataClassMake);
			}

		});
	}
	var dataID = function () {
		$('.gridster .gs_w').each(function() {
			var dataMakeID = $(this).attr('id');
				dataMakeID = dataMakeID.replace('li', '');

			$(this).removeAttr('data-id');
			$(this).attr('data-id', dataMakeID);
		});
	}
	var saveGrid = function () {
		// resetIDs();
		localforage.setItem('griddata', grid_canvas.serialize(), function(err, result) { 
			console.log(err);
			console.log(result);
			console.log(result.value);
		});
	}
	var clearGrid = function () {
		localforage.clear();
		window.location.reload();
	}

	////// Gridster Build /////////////////////////////////////////////////////////////////////

	localforage.getItem('griddata', function(err, value) {

		if (value == null) {

			// Build New Chart
			var json = [
				{"id":"li1","class":"tile blocking gs_w nope","col":"1","row":"1","size_x":"1","size_y":"5"},
				{"id":"li2","class":"tile blocking gs_w nope","col":"2","row":"1","size_x":"1","size_y":"5"},
				{"id":"li3","class":"tile blocking gs_w nope","col":"3","row":"1","size_x":"1","size_y":"5"},
				{"id":"li4","class":"tile blocking gs_w nope","col":"4","row":"1","size_x":"1","size_y":"5"},
				{"id":"li5","class":"tile blocking gs_w nope","col":"5","row":"1","size_x":"1","size_y":"5"},
				{"id":"li6","class":"tile blocking gs_w nope","col":"6","row":"1","size_x":"1","size_y":"5"},
				{"id":"li7","class":"tile blocking gs_w nope","col":"7","row":"1","size_x":"1","size_y":"5"},
				{"id":"li8","class":"tile blocking gs_w nope","col":"8","row":"1","size_x":"1","size_y":"5"},
				{"id":"li9","class":"tile blocking gs_w nope","col":"9","row":"1","size_x":"1","size_y":"5"},
				{"id":"li10","class":"tile blocking gs_w nope","col":"10","row":"1","size_x":"1","size_y":"5"},
				{"id":"li11","class":"tile blocking gs_w nope","col":"11","row":"1","size_x":"1","size_y":"5"},
				{"id":"li12","class":"tile blocking gs_w nope","col":"12","row":"1","size_x":"1","size_y":"5"},
				{"id":"li13","class":"tile blocking gs_w nope","col":"13","row":"1","size_x":"1","size_y":"5"},
				{"id":"li14","class":"tile blocking gs_w nope","col":"14","row":"1","size_x":"1","size_y":"5"},
				{"id":"li15","class":"tile blocking gs_w nope","col":"15","row":"1","size_x":"1","size_y":"5"},
				{"id":"li16","class":"tile blocking gs_w nope","col":"16","row":"1","size_x":"1","size_y":"5"},
				{"id":"li17","class":"tile blocking gs_w nope","col":"17","row":"1","size_x":"1","size_y":"5"},
				{"id":"li18","class":"tile blocking gs_w nope","col":"18","row":"1","size_x":"1","size_y":"5"},
				{"id":"li19","class":"tile blocking gs_w nope","col":"19","row":"1","size_x":"1","size_y":"5"},
				{"id":"li20","class":"tile blocking gs_w nope","col":"20","row":"1","size_x":"1","size_y":"5"},
				{"id":"li21","class":"tile blocking gs_w nope","col":"21","row":"1","size_x":"1","size_y":"5"},
				{"id":"li22","class":"tile blocking gs_w nope","col":"22","row":"1","size_x":"1","size_y":"5"},
				{"id":"li23","class":"tile blocking gs_w nope","col":"23","row":"1","size_x":"1","size_y":"5"},
				{"id":"li24","class":"tile blocking gs_w nope","col":"24","row":"1","size_x":"1","size_y":"5"},
				{"id":"li25","class":"tile blocking gs_w nope","col":"25","row":"1","size_x":"1","size_y":"5"},
				{"id":"li26","class":"tile blocking gs_w nope","col":"26","row":"1","size_x":"1","size_y":"5"},
				{"id":"li27","class":"tile blocking gs_w nope","col":"27","row":"1","size_x":"1","size_y":"5"},
				{"id":"li28","class":"tile blocking gs_w nope","col":"28","row":"1","size_x":"1","size_y":"5"},
				{"id":"li29","class":"tile blocking gs_w nope","col":"29","row":"1","size_x":"1","size_y":"5"},
				{"id":"li30","class":"tile blocking gs_w nope","col":"30","row":"1","size_x":"1","size_y":"5"},
				{"id":"li31","class":"tile blocking gs_w nope","col":"31","row":"1","size_x":"1","size_y":"5"},
				{"id":"li32","class":"tile blocking gs_w nope","col":"32","row":"1","size_x":"1","size_y":"5"},
				{"id":"li33","class":"tile blocking gs_w nope","col":"33","row":"1","size_x":"1","size_y":"5"},
				{"id":"li34","class":"tile blocking gs_w nope","col":"34","row":"1","size_x":"1","size_y":"5"},
				{"id":"li35","class":"tile blocking gs_w nope","col":"35","row":"1","size_x":"1","size_y":"5"}
			];

			// // Built Out Complete
			// var json = [
			// 	{"id":"li1","class":"tile blocking gs_w nope","tile_name":"dead","true_row":"61","span_row":"dead","col":"1","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li2","class":"tile blocking gs_w nope","tile_name":"dead","true_row":"61","span_row":"dead","col":"2","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li3","class":"tile blocking gs_w nope","tile_name":"dead","true_row":"61","span_row":"dead","col":"3","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li4","class":"tile gs_w nope box name_placed contractor","htmlContent":"Leandro Maione","tile_name":"Leandro_Maione","true_row":"61","span_row":"dead","col":"4","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li5","class":"tile blocking gs_w nope","tile_name":"dead","true_row":"61","span_row":"dead","col":"5","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li6","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"6","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li7","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"7","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li8","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"8","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li9","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"9","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li10","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"10","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li11","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"11","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li12","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"12","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li13","class":"tile gs_w nope box name_placed","htmlContent":"Sean O'Keeffe","tile_name":"Sean_OKeeffe","true_row":"61","span_row":"dead","col":"13","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li14","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"14","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li15","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"15","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li16","class":"tile gs_w nope box name_placed","htmlContent":"Ikhsan Assaat","tile_name":"Ikhsan_Assaat","true_row":"61","span_row":"dead","col":"16","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li17","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"17","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li18","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"18","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li19","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"19","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li20","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"20","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li21","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"21","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li22","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"22","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li23","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"23","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li24","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"24","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li25","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"25","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li26","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"26","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li27","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"27","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li28","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"28","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li29","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"29","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li30","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"30","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li31","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"31","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li32","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"32","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li33","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"33","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li34","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"34","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li35","class":"tile blocking gs_w nope","htmlContent":"dead","tile_name":"dead","true_row":"61","span_row":"dead","col":"35","row":"61","size_x":"1","size_y":"5"},
			// 	{"id":"li36","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"1","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li37","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"2","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li38","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"3","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li39","class":"tile gs_w box name_placed","htmlContent":"Alex Shellim","tile_name":"Alex_Shellim","true_row":"56","span_row":"dead","col":"4","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li40","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"5","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li41","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"6","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li42","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"7","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li43","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"8","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li44","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"9","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li45","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"10","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li46","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"11","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li47","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"12","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li48","class":"tile gs_w box name_placed","htmlContent":"Kyle Bolt","tile_name":"Kyle_Bolt","true_row":"56","span_row":"dead","col":"13","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li49","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"14","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li50","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"15","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li51","class":"tile gs_w box name_placed","htmlContent":"Romain Piel","tile_name":"Romain_Piel","true_row":"56","span_row":"dead","col":"16","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li52","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"17","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li53","class":"tile gs_w box nope name_placed","htmlContent":"Jiv Dhaliwal","tile_name":"Jiv_Dhaliwal","true_row":"56","span_row":"dead","col":"18","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li54","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"19","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li55","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"20","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li56","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"21","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li57","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"22","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li58","class":"tile gs_w box nope name_placed","htmlContent":"Jamie Wright","tile_name":"Jamie_Wright","true_row":"56","span_row":"dead","col":"23","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li59","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"24","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li60","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"25","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li61","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"26","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li62","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"27","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li63","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"28","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li64","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"29","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li65","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"30","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li66","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"31","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li67","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"32","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li68","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"33","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li69","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"34","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li70","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"56","span_row":"dead","col":"35","row":"56","size_x":"1","size_y":"5"},
			// 	{"id":"li71","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"1","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li72","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"2","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li73","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"3","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li74","class":"tile gs_w box name_placed","htmlContent":"Mitch Clark","tile_name":"Mitch_Clark","true_row":"51","span_row":"dead","col":"4","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li75","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"5","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li76","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"6","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li77","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"7","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li78","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"8","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li79","class":"tile gs_w box nope name_placed","htmlContent":"Bel Aztiria","tile_name":"Bel_Aztiria","true_row":"51","span_row":"dead","col":"9","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li80","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"10","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li81","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"11","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li82","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"12","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li83","class":"tile gs_w box name_placed","htmlContent":"Lydia Hecomovich","tile_name":"Lydia_Hecomovich","true_row":"51","span_row":"dead","col":"13","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li84","class":"tile gs_w box nope name_placed","htmlContent":"Nina Thistlethwaite","tile_name":"Nina_Thistlethwaite","true_row":"51","span_row":"dead","col":"14","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li85","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"15","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li86","class":"tile gs_w box name_placed","htmlContent":"Anastasia Lopez","tile_name":"Anastasia_Lopez","true_row":"51","span_row":"dead","col":"16","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li87","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"17","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li88","class":"tile gs_w box name_placed","htmlContent":"Arnaud Rinquin","tile_name":"Arnaud_Rinquin","true_row":"51","span_row":"dead","col":"18","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li89","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"19","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li90","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"20","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li91","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"21","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li92","class":"tile gs_w box nope name_placed contractor","htmlContent":"Naadir Jeewa","tile_name":"Naadir_Jeewa","true_row":"51","span_row":"dead","col":"22","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li93","class":"tile gs_w box name_placed","htmlContent":"Dean Elbaz","tile_name":"Dean_Elbaz","true_row":"51","span_row":"dead","col":"23","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li94","class":"tile gs_w player-revert box nope name_placed","htmlContent":"Jason Dierkes","tile_name":"Jason_Dierkes","true_row":"51","span_row":"dead","col":"24","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li95","class":"tile gs_w box nope name_placed","htmlContent":"Loren Hinkson","tile_name":"Loren_Hinkson","true_row":"51","span_row":"dead","col":"25","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li96","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"26","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li97","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"27","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li98","class":"tile gs_w box nope name_placed","htmlContent":"Sarah Dear","tile_name":"Sarah_Dear","true_row":"51","span_row":"dead","col":"28","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li99","class":"tile gs_w box nope name_placed","htmlContent":"Alesha Gooden","tile_name":"Alesha_Gooden","true_row":"51","span_row":"dead","col":"29","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li100","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"30","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li101","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"31","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li102","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"32","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li103","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"51","span_row":"dead","col":"33","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li104","class":"tile gs_w box nope name_placed","htmlContent":"Joey Isaacson","tile_name":"Joey_Isaacson","true_row":"51","span_row":"dead","col":"34","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li105","class":"tile gs_w box nope name_placed","htmlContent":"Stephen Field","tile_name":"Stephen_Field","true_row":"51","span_row":"dead","col":"35","row":"51","size_x":"1","size_y":"5"},
			// 	{"id":"li106","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"1","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li107","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"2","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li108","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"3","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li109","class":"tile gs_w box name_placed","htmlContent":"Bill Domanick","tile_name":"Bill_Domanick","true_row":"46","span_row":"dead","col":"4","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li110","class":"tile gs_w box nope name_placed","htmlContent":"Ryan Herrmann","tile_name":"Ryan_Herrmann","true_row":"46","span_row":"dead","col":"5","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li111","class":"tile gs_w box nope name_placed","htmlContent":"Adam Raza","tile_name":"Adam_Raza","true_row":"46","span_row":"dead","col":"6","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li112","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"7","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li113","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"8","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li114","class":"tile gs_w box name_placed","htmlContent":"Freya Houlding","tile_name":"Freya_Houlding","true_row":"46","span_row":"dead","col":"9","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li115","class":"tile gs_w box nope name_placed","htmlContent":"Mac Donoghue","tile_name":"Mac_Donoghue","true_row":"46","span_row":"dead","col":"10","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li116","class":"tile gs_w box nope name_placed","htmlContent":"Megan Rondeau","tile_name":"Megan_Rondeau","true_row":"46","span_row":"dead","col":"11","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li117","class":"tile gs_w box nope name_placed","htmlContent":"Jenny Verdon","tile_name":"Jenny_Verdon","true_row":"46","span_row":"dead","col":"12","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li118","class":"tile gs_w box name_placed","htmlContent":"Jake Williams","tile_name":"Jake_Williams","true_row":"46","span_row":"dead","col":"13","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li119","class":"tile gs_w box name_placed","htmlContent":"James Gibb","tile_name":"James_Gibb","true_row":"46","span_row":"dead","col":"14","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li120","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"15","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li121","class":"tile gs_w box name_placed","htmlContent":"Alexey Blinov","tile_name":"Alexey_Blinov","true_row":"46","span_row":"dead","col":"16","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li122","class":"tile gs_w box nope name_placed","htmlContent":"Paula Lopez Pozuelo","tile_name":"Paula_Lopez-Pozuelo","true_row":"46","span_row":"dead","col":"17","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li123","class":"tile gs_w box name_placed","htmlContent":"Ben Hodgson","tile_name":"Ben_Hodgson","true_row":"46","span_row":"dead","col":"18","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li124","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"19","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li125","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"20","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li126","class":"tile gs_w box nope name_placed","htmlContent":"James White","tile_name":"James_White","true_row":"46","span_row":"dead","col":"21","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li127","class":"tile gs_w box name_placed","htmlContent":"Sam Rudge","tile_name":"Sam_Rudge","true_row":"46","span_row":"dead","col":"22","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li128","class":"tile gs_w box name_placed","htmlContent":"Paul Lawson","tile_name":"Paul_Lawson","true_row":"46","span_row":"dead","col":"23","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li129","class":"tile gs_w box name_placed","htmlContent":"Christian Marchand","tile_name":"Christian_Marchand","true_row":"46","span_row":"dead","col":"24","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li130","class":"tile gs_w box name_placed","htmlContent":"Alyea Afzal","tile_name":"Alyea_Afzal","true_row":"46","span_row":"dead","col":"25","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li131","class":"tile gs_w box nope name_placed","htmlContent":"Taylor McDermott","tile_name":"Taylor_McDermott","true_row":"46","span_row":"dead","col":"26","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li132","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"27","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li133","class":"tile gs_w box name_placed","htmlContent":"Kalyn Dobbs","tile_name":"Kalyn_Dobbs","true_row":"46","span_row":"dead","col":"28","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li134","class":"tile gs_w box name_placed","htmlContent":"Tom Weir","tile_name":"Tom_Weir","true_row":"46","span_row":"dead","col":"29","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li135","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"30","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li136","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"31","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li137","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"32","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li138","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"46","span_row":"dead","col":"33","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li139","class":"tile gs_w box name_placed","htmlContent":"Aaron Rodgers","tile_name":"Aaron_Rodgers","true_row":"46","span_row":"dead","col":"34","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li140","class":"tile gs_w box name_placed","htmlContent":"Tom Ralston","tile_name":"Tom_Ralston","true_row":"46","span_row":"dead","col":"35","row":"46","size_x":"1","size_y":"5"},
			// 	{"id":"li141","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"41","span_row":"dead","col":"1","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li142","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"41","span_row":"dead","col":"2","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li143","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"41","span_row":"dead","col":"3","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li144","class":"tile gs_w box name_placed","htmlContent":"Yi Lin","tile_name":"Yi_Lin","true_row":"41","span_row":"dead","col":"4","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li145","class":"tile gs_w box name_placed","htmlContent":"Josh Baron","tile_name":"Josh_Baron","true_row":"41","span_row":"dead","col":"5","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li146","class":"tile gs_w box name_placed","htmlContent":"Stephen Vallimarescu","tile_name":"Stephen_Vallimarescu","true_row":"41","span_row":"dead","col":"6","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li147","class":"tile gs_w box nope name_placed","htmlContent":"Jack Stephens","tile_name":"Jack_Stephens","true_row":"41","span_row":"dead","col":"7","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li148","class":"tile gs_w box nope name_placed","htmlContent":"Steve Cielinski","tile_name":"Steve_Cielinski","true_row":"41","span_row":"dead","col":"8","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li149","class":"tile gs_w box name_placed","htmlContent":"Leonie Wakeman","tile_name":"Leonie_Wakeman","true_row":"41","span_row":"dead","col":"9","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li150","class":"tile gs_w box name_placed","htmlContent":"Gonzalo Castro","tile_name":"Gonzalo_Castro","true_row":"41","span_row":"dead","col":"10","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li151","class":"tile gs_w box name_placed","htmlContent":"Dan Bagnall","tile_name":"Dan_Bagnall","true_row":"41","span_row":"dead","col":"11","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li152","class":"tile gs_w box name_placed","htmlContent":"Caitlin Came","tile_name":"Caitlin_Came","true_row":"41","span_row":"dead","col":"12","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li153","class":"tile gs_w box name_placed","htmlContent":"Christine Dombrowski","tile_name":"Christine_Dombrowski","true_row":"41","span_row":"dead","col":"13","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li154","class":"tile gs_w box name_placed","htmlContent":"Ewan Eyre","tile_name":"Ewan_Eyre","true_row":"41","span_row":"dead","col":"14","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li155","class":"tile gs_w box nope department name_placed","htmlContent":"Global Assistants Program","tile_name":"Global_Assistants_Program","true_row":"41","span_row":"dead","col":"15","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li156","class":"tile gs_w box name_placed","htmlContent":"Michael May","tile_name":"Michael_May","true_row":"41","span_row":"dead","col":"16","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li157","class":"tile gs_w box name_placed","htmlContent":"Sabina Bejasa-Dimmock","tile_name":"Sabina_Bejasa-Dimmock","true_row":"41","span_row":"dead","col":"17","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li158","class":"tile gs_w box name_placed","htmlContent":"Andy Mitchell","tile_name":"Andy_Mitchell","true_row":"41","span_row":"dead","col":"18","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li159","class":"tile gs_w box nope name_placed","htmlContent":"Ryan Simms","tile_name":"Ryan_Simms","true_row":"41","span_row":"dead","col":"19","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li160","class":"tile gs_w box nope name_placed","htmlContent":"Kim Knup","tile_name":"Kim_Knup","true_row":"41","span_row":"dead","col":"20","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li161","class":"tile gs_w box name_placed","htmlContent":"Paul Springett","tile_name":"Paul_Springett","true_row":"41","span_row":"dead","col":"21","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li162","class":"tile gs_w box name_placed","htmlContent":"Igor Shpakov","tile_name":"Igor_Shpakov","true_row":"41","span_row":"dead","col":"22","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li163","class":"tile gs_w box name_placed","htmlContent":"Marc Pacheco","tile_name":"Marc_Pacheco","true_row":"41","span_row":"dead","col":"23","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li164","class":"tile gs_w box name_placed","htmlContent":"Mizanur Rahman","tile_name":"Mizanur_Rahman","true_row":"41","span_row":"dead","col":"24","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li165","class":"tile gs_w box name_placed","htmlContent":"Wilson Palmer","tile_name":"Wilson_Palmer","true_row":"41","span_row":"dead","col":"25","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li166","class":"tile gs_w box name_placed","htmlContent":"Matthew Nelson","tile_name":"Matthew_Nelson","true_row":"41","span_row":"dead","col":"26","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li167","class":"tile gs_w box nope name_placed","htmlContent":"Ian Petts","tile_name":"Ian_Petts","true_row":"41","span_row":"dead","col":"27","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li168","class":"tile gs_w box name_placed","htmlContent":"Elena Sansigre Silva","tile_name":"Elena_Sansigre-Silva","true_row":"41","span_row":"dead","col":"28","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li169","class":"tile gs_w box name_placed","htmlContent":"Brigitte Gomez","tile_name":"Brigitte_Gomez","true_row":"41","span_row":"dead","col":"29","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li170","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"41","span_row":"dead","col":"30","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li171","class":"tile gs_w box nope name_placed","htmlContent":"Alexsis Bass","tile_name":"Alexsis_Bass","true_row":"41","span_row":"dead","col":"31","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li172","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"41","span_row":"dead","col":"32","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li173","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"41","span_row":"dead","col":"33","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li174","class":"tile gs_w box name_placed","htmlContent":"Karim Dia Toubajie","tile_name":"Karim-Dia_Toubajie","true_row":"41","span_row":"dead","col":"34","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li175","class":"tile gs_w box name_placed","htmlContent":"Callum Merriman","tile_name":"Callum_Merriman","true_row":"41","span_row":"dead","col":"35","row":"41","size_x":"1","size_y":"5"},
			// 	{"id":"li176","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"1","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li177","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"2","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li178","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"3","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li179","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"4","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li180","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"5","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li181","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"6","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li182","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"7","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li183","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"8","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li184","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"9","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li185","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"10","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li186","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"11","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li187","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"12","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li188","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"13","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li189","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"14","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li190","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"15","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li191","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"16","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li192","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"17","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li193","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"18","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li194","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"19","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li195","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"20","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li196","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"21","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li197","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"22","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li198","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"23","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li199","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"24","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li200","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"25","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li201","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"26","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li202","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"27","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li203","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"28","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li204","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"29","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li205","class":"divider gs_w blocking","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"30","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li206","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"31","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li207","class":"divider gs_w blocking","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"32","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li208","class":"divider gs_w blocking","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"33","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li209","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"34","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li210","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"40","span_row":"dead","col":"35","row":"40","size_x":"1","size_y":"1"},
			// 	{"id":"li211","class":"tile gs_w box nope name_placed","htmlContent":"Sam Saunders","tile_name":"Sam_Saunders","true_row":"35","span_row":"dead","col":"1","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li212","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"2","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li213","class":"tile gs_w box nope name_placed","htmlContent":"Tom May","tile_name":"Tom_May","true_row":"35","span_row":"dead","col":"3","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li214","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"4","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li215","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"5","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li216","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"6","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li217","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"7","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li218","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"8","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li219","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"9","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li220","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"1335","col":"10","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li221","class":"tile gs_w box name_placed","htmlContent":"Michelle Wood","tile_name":"Michelle_Wood","true_row":"35","span_row":"dead","col":"12","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li222","class":"tile gs_w box name_placed","htmlContent":"Amy Polacsek","tile_name":"Amy_Polacsek","true_row":"35","span_row":"dead","col":"13","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li223","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"14","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li224","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"15","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li225","class":"tile gs_w box name_placed","htmlContent":"Aaron Randall","tile_name":"Aaron_Randall","true_row":"35","span_row":"dead","col":"16","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li226","class":"tile gs_w box name_placed","htmlContent":"Vivien Barousse","tile_name":"Vivien_Barousse","true_row":"35","span_row":"dead","col":"17","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li227","class":"tile gs_w box name_placed","htmlContent":"David MacGladrie","tile_name":"David_MacGladrie","true_row":"35","span_row":"dead","col":"18","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li228","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"19","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li229","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"20","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li230","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"2875","col":"21","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li231","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"23","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li232","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"24","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li233","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"25","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li234","class":"tile gs_w doubled box name_placed","htmlContent":"Alex Reade","tile_name":"Alex_Reade","true_row":"35","span_row":"3575","col":"26","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li235","class":"tile gs_w box name_placed","htmlContent":"Elliot Hancock","tile_name":"Elliot_Hancock","true_row":"35","span_row":"dead","col":"28","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li236","class":"tile gs_w box name_placed","htmlContent":"Merry Webster","tile_name":"Merry_Webster","true_row":"35","span_row":"dead","col":"29","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li237","class":"tile gs_w box nope name_placed","htmlContent":"Charlie Morrison","tile_name":"Charlie_Morrison","true_row":"35","span_row":"dead","col":"30","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li238","class":"tile gs_w box name_placed","htmlContent":"Lauren Gottlieb","tile_name":"Lauren_Gottlieb","true_row":"35","span_row":"dead","col":"31","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li239","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"32","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li240","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"35","span_row":"dead","col":"33","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li241","class":"tile gs_w box name_placed","htmlContent":"Tracey Lee-Joe","tile_name":"Tracey_Lee-Joe","true_row":"35","span_row":"dead","col":"34","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li242","class":"tile gs_w box name_placed","htmlContent":"Tom Clarke","tile_name":"Tom_Clarke","true_row":"35","span_row":"dead","col":"35","row":"35","size_x":"1","size_y":"5"},
			// 	{"id":"li243","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"1","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li244","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"2","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li245","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"3","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li246","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"4","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li247","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"5","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li248","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"6","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li249","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"7","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li250","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"8","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li251","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"9","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li252","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"1335","col":"10","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li253","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"12","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li254","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"13","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li255","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"14","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li256","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"15","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li257","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"16","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li258","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"17","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li259","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"18","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li260","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"19","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li261","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"20","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li262","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"2875","col":"21","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li263","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"23","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li264","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"24","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li265","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"25","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li266","class":"divider gs_w doubled reachRight","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"3575","col":"26","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li267","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"28","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li268","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"29","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li269","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"30","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li270","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"31","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li271","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"32","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li272","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"33","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li273","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"34","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li274","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"34","span_row":"dead","col":"35","row":"34","size_x":"1","size_y":"1"},
			// 	{"id":"li275","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"1","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li276","class":"tile gs_w box nope name_placed","htmlContent":"Jamie Hughes","tile_name":"Jamie_Hughes","true_row":"29","span_row":"dead","col":"2","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li277","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"3","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li278","class":"tile gs_w box name_placed","htmlContent":"Jon Attfield","tile_name":"Jon_Attfield","true_row":"29","span_row":"dead","col":"4","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li279","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"5","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li280","class":"tile gs_w box name_placed","htmlContent":"Ian Schiffer","tile_name":"Ian_Schiffer","true_row":"29","span_row":"dead","col":"6","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li281","class":"tile gs_w box name_placed","htmlContent":"Sam Briggs","tile_name":"Sam_Briggs","true_row":"29","span_row":"dead","col":"7","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li282","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"8","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li283","class":"tile gs_w box name_placed","htmlContent":"Gareth Jones","tile_name":"Gareth_Jones","true_row":"29","span_row":"dead","col":"9","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li284","class":"tile gs_w doubled box name_placed","htmlContent":"Meredith Croy","tile_name":"Meredith_Croy","true_row":"29","span_row":"1335","col":"10","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li285","class":"tile gs_w box name_placed","htmlContent":"Aaron Neigher","tile_name":"Aaron_Neigher","true_row":"29","span_row":"dead","col":"12","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li286","class":"tile gs_w box name_placed","htmlContent":"Ricky Faillace","tile_name":"Ricky_Faillace","true_row":"29","span_row":"dead","col":"13","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li287","class":"tile gs_w box name_placed","htmlContent":"Noel Edwards","tile_name":"Noel_Edwards","true_row":"29","span_row":"dead","col":"14","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li288","class":"tile gs_w box name_placed","htmlContent":"Shaun Burke","tile_name":"Shaun_Burke","true_row":"29","span_row":"dead","col":"15","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li289","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"16","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li290","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"17","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li291","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"18","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li292","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"19","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li293","class":"tile gs_w box name_placed","htmlContent":"Amy Phillips","tile_name":"Amy_Phillips","true_row":"29","span_row":"dead","col":"20","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li294","class":"tile gs_w doubled box name_placed","htmlContent":"Dan Lucraft","tile_name":"Dan_Lucraft","true_row":"29","span_row":"2875","col":"21","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li295","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"23","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li296","class":"tile gs_w box name_placed","htmlContent":"Andy Deeley","tile_name":"Andy_Deeley","true_row":"29","span_row":"dead","col":"24","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li297","class":"tile gs_w box name_placed","htmlContent":"Eddie Herdemian","tile_name":"Eddie_Herdemian","true_row":"29","span_row":"dead","col":"25","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li298","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"26","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li299","class":"tile gs_w doubled box name_placed","htmlContent":"Emily Sergent","tile_name":"Emily_Sergent","true_row":"29","span_row":"3715","col":"27","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li300","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"29","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li301","class":"tile gs_w doubled box name_placed","htmlContent":"Andrea Frey","tile_name":"Andrea_Frey","true_row":"29","span_row":"4135","col":"30","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li302","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"32","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li303","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"33","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li304","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"34","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li305","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"29","span_row":"dead","col":"35","row":"29","size_x":"1","size_y":"5"},
			// 	{"id":"li306","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"1","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li307","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"2","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li308","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"3","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li309","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"4","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li310","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"5","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li311","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"6","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li312","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"7","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li313","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"8","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li314","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"9","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li315","class":"divider gs_w doubled full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"1335","col":"10","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li316","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"12","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li317","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"13","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li318","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"14","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li319","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"15","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li320","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"16","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li321","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"17","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li322","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"18","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li323","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"19","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li324","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"20","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li325","class":"divider gs_w doubled reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"2875","col":"21","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li326","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"23","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li327","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"24","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li328","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"25","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li329","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"26","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li330","class":"divider gs_w doubled reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"3715","col":"27","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li331","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"29","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li332","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"4135","col":"30","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li333","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"32","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li334","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"33","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li335","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"34","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li336","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"28","span_row":"dead","col":"35","row":"28","size_x":"1","size_y":"1"},
			// 	{"id":"li337","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"1","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li338","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"2","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li339","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"3","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li340","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"4","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li341","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"5","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li342","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"6","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li343","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"7","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li344","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"8","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li345","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"9","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li346","class":"tile gs_w box nope name_placed","htmlContent":"Kendyl Dunn","tile_name":"Kendyl_Dunn","true_row":"23","span_row":"dead","col":"10","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li347","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"11","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li348","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"12","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li349","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"13","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li350","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"14","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li351","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"15","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li352","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"16","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li353","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"17","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li354","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"2455","col":"18","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li355","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"20","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li356","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"21","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li357","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"22","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li358","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"23","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li359","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"24","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li360","class":"tile gs_w tripled left thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"3435","col":"26","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li361","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"28","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li362","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"29","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li363","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"4135","col":"30","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li364","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"32","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li365","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"33","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li366","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"34","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li367","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"23","span_row":"dead","col":"35","row":"23","size_x":"1","size_y":"5"},
			// 	{"id":"li368","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"1","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li369","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"2","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li370","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"3","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li371","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"4","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li372","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"5","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li373","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"6","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li374","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"7","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li375","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"8","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li376","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"9","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li377","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"10","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li378","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"11","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li379","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"12","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li380","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"13","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li381","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"14","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li382","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"15","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li383","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"16","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li384","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"17","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li385","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"2455","col":"18","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li386","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"20","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li387","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"21","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li388","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"22","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li389","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"23","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li390","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"24","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li391","class":"divider gs_w tripled left thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"3435","col":"26","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li392","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"28","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li393","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"29","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li394","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"4135","col":"30","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li395","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"32","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li396","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"33","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li397","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"34","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li398","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"22","span_row":"dead","col":"35","row":"22","size_x":"1","size_y":"1"},
			// 	{"id":"li399","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"1","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li400","class":"tile gs_w box name_placed","htmlContent":"Michael Orland","tile_name":"Michael_Orland","true_row":"17","span_row":"dead","col":"2","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li401","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"3","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li402","class":"tile gs_w box name_placed","htmlContent":"Lee Martin","tile_name":"Lee_Martin","true_row":"17","span_row":"dead","col":"4","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li403","class":"tile gs_w box name_placed","htmlContent":"Stephen Glicken","tile_name":"Stephen_Glicken","true_row":"17","span_row":"dead","col":"5","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li404","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"6","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li405","class":"tile gs_w box name_placed","htmlContent":"JD May","tile_name":"JD_May","true_row":"17","span_row":"dead","col":"7","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li406","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"8","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li407","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"9","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li408","class":"tile gs_w doubled box name_placed","htmlContent":"Jesse Bellin","tile_name":"Jesse_Bellin","true_row":"17","span_row":"1335","col":"10","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li409","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"12","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li410","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"13","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li411","class":"tile gs_w box name_placed","htmlContent":"Laura Becker","tile_name":"Laura_Becker","true_row":"17","span_row":"dead","col":"14","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li412","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"15","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li413","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"16","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li414","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"17","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li415","class":"tile gs_w doubled box name_placed","htmlContent":"Mark McIntyre","tile_name":"Mark_McIntyre","true_row":"17","span_row":"2455","col":"18","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li416","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"20","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li417","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"21","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li418","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"22","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li419","class":"tile gs_w box name_placed","htmlContent":"Sabrina Leandro","tile_name":"Sabrina_Leandro","true_row":"17","span_row":"dead","col":"23","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li420","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"24","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li421","class":"tile gs_w tripled left box name_placed","htmlContent":"Paul Herdemian","tile_name":"Paul_Herdemian","true_row":"17","span_row":"3435","col":"26","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li422","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"28","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li423","class":"tile gs_w box nope name_placed","htmlContent":"Matt Vail","tile_name":"Matt_Vail","true_row":"17","span_row":"dead","col":"29","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li424","class":"tile gs_w doubled box name_placed","htmlContent":"Adam Schuster","tile_name":"Adam_Schuster","true_row":"17","span_row":"4135","col":"30","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li425","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"32","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li426","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"33","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li427","class":"tile gs_w box name_placed","htmlContent":"Gideon Bullock","tile_name":"Gideon_Bullock","true_row":"17","span_row":"dead","col":"34","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li428","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"17","span_row":"dead","col":"35","row":"17","size_x":"1","size_y":"5"},
			// 	{"id":"li429","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"1","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li430","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"2","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li431","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"3","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li432","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"4","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li433","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"5","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li434","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"6","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li435","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"7","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li436","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"8","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li437","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"9","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li438","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"1335","col":"10","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li439","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"12","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li440","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"13","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li441","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"14","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li442","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"15","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li443","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"16","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li444","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"17","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li445","class":"divider gs_w doubled reachRight","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"2455","col":"18","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li446","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"20","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li447","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"21","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li448","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"22","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li449","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"23","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li450","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"24","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li451","class":"divider gs_w tripled left thru","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"3435","col":"26","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li452","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"28","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li453","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"29","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li454","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"4135","col":"30","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li455","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"32","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li456","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"33","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li457","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"34","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li458","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"16","span_row":"dead","col":"35","row":"16","size_x":"1","size_y":"1"},
			// 	{"id":"li459","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"1","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li460","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"2","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li461","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"3","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li462","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"4","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li463","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"5","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li464","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"6","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li465","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"7","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li466","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"8","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li467","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"9","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li468","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"1335","col":"10","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li469","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"12","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li470","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"13","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li471","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"14","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li472","class":"tile gs_w box nope name_placed","htmlContent":"Francesca Stabile","tile_name":"Francesca_Stabile","true_row":"11","span_row":"dead","col":"15","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li473","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"16","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li474","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"17","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li475","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"18","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li476","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"19","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li477","class":"tile gs_w tripled left thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"2735","col":"21","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li478","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"23","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li479","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"24","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li480","class":"tile gs_w tripled left thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"3435","col":"26","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li481","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"28","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li482","class":"tile gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"dead","col":"29","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li483","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"4135","col":"30","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li484","class":"tile gs_w box nope name_placed","htmlContent":"Glenn Ray","tile_name":"Glenn_Ray","true_row":"11","span_row":"dead","col":"32","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li485","class":"tile gs_w box nope name_placed","htmlContent":"Cassie Waduge","tile_name":"Cassie_Waduge","true_row":"11","span_row":"dead","col":"33","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li486","class":"tile gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"11","span_row":"4695","col":"34","row":"11","size_x":"1","size_y":"5"},
			// 	{"id":"li487","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"1","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li488","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"2","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li489","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"3","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li490","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"4","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li491","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"5","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li492","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"6","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li493","class":"divider gs_w reachRight","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"7","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li494","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"8","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li495","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"9","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li496","class":"divider gs_w doubled full","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"1335","col":"10","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li497","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"12","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li498","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"13","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li499","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"14","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li500","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"15","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li501","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"16","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li502","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"17","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li503","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"18","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li504","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"19","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li505","class":"divider gs_w tripled left thru","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"2735","col":"21","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li506","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"23","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li507","class":"divider blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"24","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li508","class":"divider gs_w tripled left reachRight","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"3435","col":"26","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li509","class":"divider gs_w full nope","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"28","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li510","class":"divider gs_w full","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"29","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li511","class":"divider gs_w doubled full","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"4135","col":"30","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li512","class":"divider gs_w reachLeft","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"32","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li513","class":"divider gs_w thru","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"dead","col":"33","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li514","class":"divider gs_w doubled thru","htmlContent":"dead","tile_name":"dead","true_row":"10","span_row":"4695","col":"34","row":"10","size_x":"1","size_y":"1"},
			// 	{"id":"li515","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"1","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li516","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"2","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li517","class":"tile gs_w thru stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"3","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li518","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"4","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li519","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"5","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li520","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"6","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li521","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"7","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li522","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"8","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li523","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"9","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li524","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"10","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li525","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"11","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li526","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"12","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li527","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"13","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li528","class":"tile gs_w thru stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"14","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li529","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"15","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li530","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"16","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li531","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"17","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li532","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"18","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li533","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"19","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li534","class":"tile gs_w doubled thru stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"2735","col":"20","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li535","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"22","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li536","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"23","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li537","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"24","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li538","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"25","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li539","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"26","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li540","class":"tile gs_w tripled right reachRight connector stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"3855","col":"28","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li541","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"30","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li542","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"31","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li543","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"5","span_row":"dead","col":"32","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li544","class":"tile gs_w box stepped name_placed","htmlContent":"Adam Ray","tile_name":"Adam_Ray","true_row":"5","span_row":"dead","col":"33","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li545","class":"tile gs_w doubled box stepped name_placed","htmlContent":"Michelle You","tile_name":"Michelle_You","true_row":"5","span_row":"4695","col":"34","row":"5","size_x":"1","size_y":"5"},
			// 	{"id":"li546","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"1","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li547","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"2","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li548","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"3","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li549","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"4","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li550","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"5","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li551","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"6","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li552","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"7","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li553","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"8","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li554","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"9","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li555","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"10","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li556","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"11","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li557","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"12","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li558","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"13","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li559","class":"tile gs_w reachRight connector stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"14","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li560","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"15","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li561","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"16","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li562","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"17","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li563","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"18","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li564","class":"tile gs_w connector full stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"19","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li565","class":"tile gs_w doubled box stepped name_placed connector reachLeft","htmlContent":"Dan Crow","tile_name":"Dan_Crow","true_row":"3","span_row":"2735","col":"20","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li566","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"22","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li567","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"23","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li568","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"24","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li569","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"25","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li570","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"26","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li571","class":"tile gs_w tripled right box stepped name_placed","htmlContent":"Adam Schiffer","tile_name":"Adam_Schiffer","true_row":"3","span_row":"3855","col":"28","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li572","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"30","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li573","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"31","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li574","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"32","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li575","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"33","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li576","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"34","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li577","class":"tile blocking gs_w stepped","htmlContent":"dead","tile_name":"dead","true_row":"3","span_row":"dead","col":"35","row":"3","size_x":"1","size_y":"5"},
			// 	{"id":"li578","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"1","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li579","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"2","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li580","class":"tile gs_w box name_placed","htmlContent":"Josh Block","tile_name":"Josh_Block","true_row":"1","span_row":"dead","col":"3","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li581","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"4","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li582","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"5","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li583","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"6","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li584","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"7","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li585","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"8","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li586","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"9","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li587","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"10","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li588","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"11","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li589","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"12","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li590","class":"tile gs_w connector full","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"13","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li591","class":"tile gs_w box name_placed","htmlContent":"Matt Jones","tile_name":"Matt_Jones","true_row":"1","span_row":"dead","col":"14","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li592","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"15","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li593","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"16","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li594","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"17","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li595","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"18","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li596","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"19","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li597","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"20","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li598","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"21","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li599","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"22","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li600","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"23","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li601","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"24","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li602","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"25","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li603","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"26","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li604","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"27","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li605","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"28","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li606","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"29","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li607","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"30","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li608","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"31","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li609","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"32","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li610","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"33","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li611","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"34","row":"1","size_x":"1","size_y":"5"},
			// 	{"id":"li612","class":"tile blocking gs_w","htmlContent":"dead","tile_name":"dead","true_row":"1","span_row":"dead","col":"35","row":"1","size_x":"1","size_y":"5"}
			// ];

			for(i=0; i<json.length; i++) {

				// add a leading zero to fix the build out
				if(json[i].col < 10) {
					colID = '0'+json[i].col;
				} else {
					colID = json[i].col;
				}

				// // Built Out Complete
				// grid_canvas.add_widget('<li id="'+json[i]['id']+'" data-spanpush="'+json[i]['span_row']+'" data-truerow="'+json[i]['true_row']+'" data-tilename="'+json[i]['tile_name']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i].size_x, json[i].size_y, colID, json[i].row);

				// Build New Chart
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" class="'+json[i]['class']+'"></li>', json[i].size_x, json[i].size_y, colID, json[i].row);

			}
			fixOrder();
			addChartPadding();
			
			setColumns();
			dataClass();
			dataID();

		} else {

			var json = value;
			for(i=0; i<json.length; i++) {

				// add a leading zero to fix the build out
				if(json[i].col < 10) {
					colID = '0'+json[i].col;
				} else {
					colID = json[i].col;
				}
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" data-spanpush="'+json[i]['span_row']+'" data-truerow="'+json[i]['true_row']+'" data-tilename="'+json[i]['tile_name']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i].size_x, json[i].size_y, colID, json[i].row);
			}
			fixOrder();
			fixColumns();
			resetChartHeight();
			setSpans();
			addChartPadding();

			dataClass();
			dataID();
		}

		$('.gridster li').each(function() {
			var namePull = $(this).attr('data-tilename');
			$("input[value="+namePull+"].radioBtnClass").attr("disabled", true);
			$("input[value="+namePull+"].radioBtnClass").parent().addClass('used');

		});

	});
	
	////// Save Progress //////////////////////////////////////////////////////////////////////

	$('#seralize').on('click', function(e, i) {
		e.preventDefault();
		saveGrid();
	});

	////// Clear Back to Default //////////////////////////////////////////////////////////////

	$('#def_button').on('click', function(e, i) {
		e.preventDefault();
		clearGrid();
	});
	
	////// Create a Tile Row //////////////////////////////////////////////////////////////////

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
		{ col: 35, row: 1, size_x: 1, size_y: 5 }
	];
	$('#add_tile').on('click', function(e, i) {
		e.preventDefault();

		var firstRowTile = maxCol('.gridster li[data-row="1"]');
			firstRowTile = $('.gridster li[data-row="1"][data-col="'+firstRowTile+'"]').attr('id');
			firstRowTile = firstRowTile.replace('li', '');


		$('.gridster li').each(function() {

			var addTileGetDataID = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var addTileRefineArray = $.map(addTileGetDataID, function(n) {
				return n <= firstRowTile ? n + 0 : null;
			});

			// moves chart down before adding in new row
			$('.gridster li').each(function() {
				var rowTileGetDataID = $(this).data('id');
				for (i = 0; i < addTileRefineArray.length; i++) {
					if (addTileRefineArray[i] == rowTileGetDataID) {
						var addTileGetUpdateID = '#li'+rowTileGetDataID;
						grid_canvas.move_widget_down($(addTileGetUpdateID), 5);
						$(this).removeData('id');
					}
				}
			});
		});

		$.each(blocks, function(i, widget){
			grid_canvas.add_widget('<li class="tile blocking"></li>', this.size_x, this.size_y, this.col, this.row);

			resetIDs();
			setColumns();
			dataClass();
			dataID();
		});

		// $('#add_div, #edit_block, #remove_div, #remove_block, #insert_div, #insert_block, #block_connectors, #half_step, #half_stepRemove, #seralize, #archive, #add_span2, #add_span3').prop("disabled", false);
	});

	////// Create a Divider Row ///////////////////////////////////////////////////////////////

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
		{ col: 35, row: 1, size_x: 1, size_y: 1 }
	];
	$('#add_div').on('click', function(e, i) {
		e.preventDefault();

		if ($('.gs_w[data-row="1"]').attr('data-sizey') == '1') {
			console.log("cant do it");
		}
		else {
			var firstRowDivider = maxCol('.gridster li[data-row="1"]');
				firstRowDivider = $('.gridster li[data-row="1"][data-col="'+firstRowDivider+'"]').attr('id');
				firstRowDivider = firstRowDivider.replace('li', '');

			$('.gridster li').each(function() {
				var addDividerGetDataID = $(this).map(function() {
					return $(this).data('id');
				}).get();
				var addDividerRefineArray = $.map(addDividerGetDataID, function(n) {
					return n <= firstRowDivider ? n + 0 : null;
				});

				// moves chart down before adding in new row
				$('.gridster li').each(function() {
					var rowDividerGetDataID = $(this).data('id');
					for (i = 0; i < addDividerRefineArray.length; i++) {
						if (addDividerRefineArray[i] == rowDividerGetDataID) {
							var addDividerGetUpdateID = '#li'+rowDividerGetDataID;
							grid_canvas.move_widget_down($(addDividerGetUpdateID), 1);
							$(this).removeData('id');
						}
					}
				});
			});

			$.each(dividers, function(i, widget){
				grid_canvas.add_widget('<li class="divider blocking"></li>', this.size_x, this.size_y, this.col, this.row);

				resetIDs();
				setColumns();
				dataClass();
				dataID();
			});

		}
	});

	////// Nav BTN Unlock State Variables /////////////////////////////////////////////////////

	var saftyZones = $(".gridster ul, #nameBank");
	var level2 = $("#nameBank");

	// This is a variable to determine if the given event handler is active or
	// disabled. This will be used by the event handler for conditional execution.
	var isHandlerActive = false;

	////// Changing Tile States ///////////////////////////////////////////////////////////////

	// Bind the trigger link to show the modal window.
	$("#edit_tile").click(function(event) {

		var tileGrabber = $('.gridster .gs_w.tile');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		tileGrabber.addClass('tile_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-edit').addClass('icon-working');

		// Now that modal window is shown, we need to activate its event handler.
		isHandlerActive = true;
		// Prevent default.
		event.preventDefault();
	});

	////// Cycle Through Tile Types ///////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.tile.tile_unlocked', function(){
		// switch from blocking to box for the chart tiles
		if ($(this).hasClass('blocking')) {
			$(this).addClass('box').append('<div class="nameBox"></div>');
			$(this).removeClass('blocking');
		}
		// switch from box to thru for the chart tiles
		else if ($(this).hasClass('box')) {
			$(this).addClass('thru');
			$(this).removeClass('box').empty();
		}
		// switch from thru to blocking for the chart tiles
		else {
			$(this).addClass('blocking');
			$(this).removeClass('thru');
		}
	});

	////// Changing Tile Type /////////////////////////////////////////////////////////////////

	// Bind the trigger link to show the modal window.
	$("#type_switch").click(function(event) {

		var tileGrabber = $('.gridster .gs_w.tile');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		tileGrabber.addClass('type_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-edit').addClass('icon-working');

		// Now that modal window is shown, we need to activate its event handler.
		isHandlerActive = true;
		// Prevent default.
		event.preventDefault();
	});

	////// Cycle Through Types Varieties //////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.tile.type_unlocked', function(){
		// switch from box to thru for the chart tiles
		if ($(this).hasClass('department')) {
			$(this).addClass('contractor');
			$(this).removeClass('department');
		}
		// switch from thru to blocking for the chart tiles
		else if ($(this).hasClass('contractor')) {
			$(this).removeClass('contractor');
		}
		// switch from blocking to box for the chart tiles
		else {
			$(this).addClass('department');
		}
	});

	////// Changing Divider States ////////////////////////////////////////////////////////////

	$("#edit_divider").click(function(event) {

		var dividerGrabber = $('.gridster .gs_w.divider');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		dividerGrabber.addClass('divider_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-edit').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Cycle Through Divider Types ////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.divider.divider_unlocked', function(){
		// switch from blocking to thru for the chart dividers
		if ($(this).hasClass('blocking')) {
			$(this).addClass('thru');
			$(this).removeClass('blocking');
		}
		// switch from thru to reachRight for the chart dividers
		else if ($(this).hasClass('thru')) {
			$(this).addClass('reachRight');
			$(this).removeClass('thru');
		}
		// switch from reachRight to full for the chart dividers
		else if ($(this).hasClass('reachRight')) {
			$(this).addClass('full');
			$(this).removeClass('reachRight');
		}
		// switch from full to reachLeft for the chart dividers
		else if ($(this).hasClass('full')) {
			$(this).addClass('reachLeft');
			$(this).removeClass('full');
		}
		// switch from reachLeft to blocking for the chart dividers
		else {
			$(this).addClass('blocking');
			$(this).removeClass('reachLeft');
		}
	});

	////// Remove the Down Connector //////////////////////////////////////////////////////////

	$("#add_nope").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('nope_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-nope').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Nope Action ////////////////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster .nope_unlocked.gs_w', function(){
		$(this).toggleClass('nope');
	});

	////// Name That Block ////////////////////////////////////////////////////////////////////

	$("#add_name").click(function(event) {

		var nameTileGrabber = $('.gridster .gs_w.tile.box:not(.name_placed)');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		nameTileGrabber.addClass('name_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-name').addClass('icon-working');
		$('.remover').show();
	
		isHandlerActive = true;

		event.preventDefault();
	});

	////// Put a Name On It ///////////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster .tile.gs_w.box', function(event) {

		if ($('.gridster .tile.gs_w.box').hasClass('name_unlocked')) {
			
			var chartID = $('.gridster');
			var namerHider = $('.headerHider .nameShield');

			level2.show();
			$(this).addClass('name_holder');
			chartID.addClass('activeChart').removeClass('passiveChart');
			chartID.prepend('<div class="gridShield"></div>');
			namerHider.remove();

			isHandlerActive = true;
			event.preventDefault();
		}
	});

	// Add in name
	$(document).on('click', 'input[type=\'radio\'].radioBtnClass', function(){
		var lablr = $(this).attr('value');
		var named = $(this).attr('name');

		$('.gridster .gs_w.tile.box.name_unlocked.name_holder .nameBox').append('<span class="remover icon-remove" data-tilename="'+lablr+'"></span><span>'+named+'</span>');
		$('.gridster .gs_w.tile.box.name_unlocked.name_holder').addClass('name_placed').attr('data-tilename', lablr).removeClass('name_holder');

		if($('.gridster .gs_w.tile.box.name_unlocked.name_holder')) {

			$(this).attr("disabled", true);
			$(this).parent().addClass('used');
		}

		$('.gridster .gridShield').remove();
		$('.headerHider').prepend('<div class="nameShield"></div>');
	});

	// remove name
	$(document).on('click', '.gs_w.tile.box.name_placed .nameBox .remover', function(event){
		
		if ($(this).attr('data-tilename')){

			var findval = $(this).attr('data-tilename');

			var theInput = ("input[value=" + findval + "].radioBtnClass");
			var theBlock = ("li[data-tilename=" + findval + "].gs_w.box.name_placed");

			$(theInput).prop('checked', false).removeAttr('disabled');
			$(theInput).parent().removeClass('used');
			$(theBlock).empty().append('<div class="nameBox"></div>');
			$(theBlock).removeClass('name_placed').addClass('name_unlocked').removeAttr('data-tilename');

		}
	});

	////// Add in a Double Block Spanner //////////////////////////////////////////////////////

	$("#add_span2").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('span2_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-hop').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Cycle Through 2x Spanner States ////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.span2_unlocked', function(){
		event.preventDefault();

		var spannerBuildID = $(this).attr('id');
			spannerBuildID = spannerBuildID.replace('li', '');
			spannerBuildID = parseInt(spannerBuildID);
		
		var spannerBuildClick = '#li' +spannerBuildID;

		var toBeRemoved = spannerBuildID + 1;
			toBeRemoved = '#li' +toBeRemoved;
		
		var toBeAdded = spannerBuildID + 1;
			toBeAdded = 'li' +toBeAdded;

		var doubledPush = $(spannerBuildClick).css('left');
			doubledPush = doubledPush.replace('px', '');
			doubledPush = parseInt(doubledPush) + 70;
		var inlinePush = doubledPush+ 'px';

		var clickClass = $(spannerBuildClick).attr('class');
			clickClass = clickClass.replace(' gs_w', '');
			clickClass = clickClass.replace(' doubled', '');

		var clickCol = $(spannerBuildClick).attr('data-col');
			clickCol = parseInt(clickCol) + 1;

		var clickRow = $(spannerBuildClick).attr('data-row');
			clickRow = parseInt(clickRow);

		var clickXsize = $(spannerBuildClick).attr('data-sizex');
			clickXsize = parseInt(clickXsize);

		var clickYsize = $(spannerBuildClick).attr('data-sizey');
			clickYsize = parseInt(clickYsize);

		// Remove Spanner
		if ($(this).hasClass('doubled')) {

			$(this).removeAttr('style').css('display', 'list-item').removeAttr('data-spanpush');

			var addedTileDataClass = $(spannerBuildClick).attr('class');
				addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
				addedTileDataClass = addedTileDataClass.replace(' doubled', '');
			$(spannerBuildClick).attr('data-class', addedTileDataClass);

			if ($(this).hasClass('tile')) {

				var widgetsTile = [
					['<li class="'+clickClass+'" id="'+toBeAdded+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsTile, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $("#"+toBeAdded).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
						addedTileDataClass = addedTileDataClass.replace(' doubled', '');
					$("#"+toBeAdded).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}
			else {
				var widgetsDivider = [
					['<li class="'+clickClass+'" id="'+toBeAdded+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsDivider, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $("#"+toBeAdded).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
						addedTileDataClass = addedTileDataClass.replace(' doubled', '');
					$("#"+toBeAdded).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}

			$('.gridster ul').each(function () {
				$(this).find("#"+toBeAdded).insertAfter($(this).find(spannerBuildClick));
			});
			$(spannerBuildClick).removeClass('doubled');

		}

		// Create Spanner
		else {

			grid_canvas.remove_widget($(toBeRemoved), true, function(){
				$(spannerBuildClick).addClass('doubled').css({'display': 'list-item', 'left': inlinePush}).attr('data-spanpush', doubledPush);

				var addedTileDataClass = $(spannerBuildClick).attr('class');
					addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
				$(spannerBuildClick).attr('data-class', addedTileDataClass);

				if ($(spannerBuildClick).hasClass('tile')) {
					$(this).addClass('box').removeClass('blocking');

					var addedTileDataClass = $(spannerBuildClick).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
					$(spannerBuildClick).attr('data-class', addedTileDataClass);
				}
			});

		}
	});

	////// Add in a Tripled Block Spanner //////////////////////////////////////////////////////

	$("#add_span3").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('span3_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-hop').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Cycle Through 3x Spanner States ////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.span3_unlocked', function(){
		event.preventDefault();

		var spannerBuildID = $(this).attr('id');
			spannerBuildID = spannerBuildID.replace('li', '');
			spannerBuildID = parseInt(spannerBuildID);
		
		var spannerBuildClick = '#li' +spannerBuildID;

		var toBeRemovedRight = spannerBuildID + 1;
			toBeRemovedRight = '#li' +toBeRemovedRight;

		var toBeRemovedLeft = spannerBuildID - 1;
			toBeRemovedLeft = '#li' +toBeRemovedLeft;
		
		var toBeAddedRight = spannerBuildID + 1;
			toBeAddedRight = 'li' +toBeAddedRight;

		var toBeAddedLeft = spannerBuildID - 1;
			toBeAddedLeft = 'li' +toBeAddedLeft;

		var tripledPush = $(spannerBuildClick).css('left');
			tripledPush = tripledPush.replace('px', '');
			tripledPush = parseInt(tripledPush);

		var clickClass = $(spannerBuildClick).attr('class');
			clickClass = clickClass.replace(' gs_w', '');

		var clickCol = $(spannerBuildClick).attr('data-col');
			clickCol = parseInt(clickCol);

		var clickColRight = parseInt(clickCol) + 1;
		var clickColLeft = parseInt(clickCol) - 1;

		var clickRow = $(spannerBuildClick).attr('data-row');
			clickRow = parseInt(clickRow);

		var clickXsize = $(spannerBuildClick).attr('data-sizex');
			clickXsize = parseInt(clickXsize);

		var clickYsize = $(spannerBuildClick).attr('data-sizey');
			clickYsize = parseInt(clickYsize);

		// change to single right
		if ($(this).hasClass('tripled') && $(this).hasClass('center')) {
			var TpushRight = tripledPush + 70;
			var inlineTpushRight = TpushRight+ 'px';

			$(spannerBuildClick).addClass('right').removeClass('center').css({'display': 'list-item', 'left': inlineTpushRight}).attr('data-spanpush', TpushRight);
			
			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
		}

		// change to single Left
		else if ($(this).hasClass('tripled') && $(this).hasClass('right')) {
			var TpushLeft = tripledPush - 140;
			var inlineTpushLeft = TpushLeft+ 'px';

			$(spannerBuildClick).removeAttr('style').addClass('left').removeClass('right').css({'display': 'list-item', 'left': inlineTpushLeft}).attr('data-spanpush', TpushLeft);

			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
		}

		// change to doubled
		else if ($(this).hasClass('tripled') && $(this).hasClass('left')) {
			var TpushLeft1st = tripledPush;
			var inlineTpushLeft1st = TpushLeft1st+ 'px';

			var TpushLeft2nd = tripledPush + 140;
			var inlineTpushLeft2nd = TpushLeft2nd+ 'px';

			$(spannerBuildClick).removeAttr('style').addClass('first').removeClass('left').css({'display': 'list-item', 'left': inlineTpushLeft1st}).attr('data-spanpush', TpushLeft1st);
			
			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);

			if ($(this).hasClass('tile')) {

				var widgetsTile3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedRight+'"></li>', clickXsize, clickYsize, clickColRight, clickRow]
				];
				$.each(widgetsTile3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeAttr('style').addClass('second').removeClass('left first').css({'display': 'list-item', 'left': inlineTpushLeft2nd}).attr('data-spanpush', TpushLeft2nd);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $(toBeRemovedRight).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedRight).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);

				});
			}

			else {
				var widgetsDivider3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedRight+'"></li>', clickXsize, clickYsize, clickColRight, clickRow]
				];
				$.each(widgetsDivider3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeAttr('style').addClass('second').removeClass('left first').css({'display': 'list-item', 'left': inlineTpushLeft2nd}).attr('data-spanpush', TpushLeft2nd);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $(toBeRemovedRight).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedRight).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);

				});
			}
			
			$('.gridster ul').each(function () {
				$(this).find("#"+toBeAddedRight).insertAfter($(this).find(spannerBuildClick));
			});
		}

		// back to default
		else if ($(this).hasClass('tripled') && $(this).hasClass('first')) {
			$(spannerBuildClick).removeAttr('style').removeAttr('data-spanpush').removeClass('tripled first').css('display', 'list-item');
			$(toBeRemovedRight).removeAttr('style').removeAttr('data-spanpush').removeClass('tripled second').css('display', 'list-item');

			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			var dataClassUpdate2nd = $(toBeRemovedRight).attr('class');
				dataClassUpdate2nd = dataClassUpdate2nd.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
			$(toBeRemovedRight).attr('data-class', dataClassUpdate2nd);

			if ($(this).hasClass('tile')) {

				var widgetsTile3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedLeft+'"></li>', clickXsize, clickYsize, clickColLeft, clickRow]
				];
				$.each(widgetsTile3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeClass('tripled first');

					var addedTileDataID = spannerBuildID - 1;
					var addedTileDataClass = $(toBeRemovedLeft).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedLeft).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}

			else {
				var widgetsDivider3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedLeft+'"></li>', clickXsize, clickYsize, clickColLeft, clickRow]
				];
				$.each(widgetsDivider3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeClass('tripled first');

					var addedTileDataID = spannerBuildID - 1;
					var addedTileDataClass = $(toBeRemovedLeft).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedLeft).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}

			$('.gridster ul').each(function () {
				$(this).find("#"+toBeAddedLeft).insertBefore($(this).find(spannerBuildClick));
			});
			
		}

		// Add single centered
		else {
			grid_canvas.remove_widget($(toBeRemovedRight), true);
			grid_canvas.remove_widget($(toBeRemovedLeft), true);
			$(spannerBuildClick).addClass('tripled center');
			
			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
		}
	});

	////// Add in Chart Half Step //////////////////////////////////////////////////////////////

	$("#half_step").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('halfStep_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-add').addClass('icon-working');

		isHandlerActive = true;
		
		event.preventDefault();
	});

	////// Half Step Add Action ///////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.halfStep_unlocked', function() {

		var currentClick = $(this).attr('data-row');
			currentClick = parseInt(currentClick);
		var currentFirstRow = maxCol('.gridster li[data-row="'+currentClick+'"]');
			currentFirstRow = $('.gridster li[data-row="'+currentClick+'"][data-col="'+currentFirstRow+'"]').attr('id');
			currentFirstRow = currentFirstRow.replace('li', '');

		$('.gridster li[data-row="'+currentClick+'"]').addClass('stepped');
		var connectorUpdate = $('.stepped').attr('class');
			connectorUpdate = $('.stepped').attr('data-class', connectorUpdate);

		$('.gridster').prepend('<div class="gridShield"></div>');
					
		// moves chart down before adding in new row
		$('.gridster li').each(function() {
			var insertTileValueGet = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var refinedArray = $.map(insertTileValueGet, function(n) {
				return n <= currentFirstRow ? n + 0 : null;
			});

			$('.gridster li').each(function() {
				var rowDataGet = $(this).data('id');
				for (i = 0; i < refinedArray.length; i++) {
					if (refinedArray[i] == rowDataGet) {
						var insertRowUpdate = '#li'+rowDataGet;
						var insertRowGrabber = $(insertRowUpdate).attr('data-row');
							insertRowGrabber = parseInt(insertRowGrabber, 10) - 3;

						console.log(insertRowUpdate);
						console.log(insertRowGrabber);

						$(this).attr('data-row', insertRowGrabber);
						$(this).attr('data-truerow', insertRowGrabber);
						grid_canvas.register_widget($(insertRowUpdate));

						$(this).removeData('id');
					}
				}
			});
		});

		var chartHeightUpdate = $('.gridster ul').height();
			chartHeightUpdate = parseInt(chartHeightUpdate, 10) - 45;
			chartHeightUpdate = chartHeightUpdate+'px';
		$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': chartHeightUpdate});
		setSpans();
	});

	////// Add in Chart Half Step //////////////////////////////////////////////////////////////

	$("#half_stepRemove").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('halfStepRemove_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-clear').addClass('icon-working');

		isHandlerActive = true;
		
		event.preventDefault();
	});

	////// Half Step Remove Action ////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.halfStepRemove_unlocked', function() {

		var currentClick = $(this).attr('data-row');
			currentClick = parseInt(currentClick);
		var currentFirstRow = maxCol('.gridster li[data-row="'+currentClick+'"]');
			currentFirstRow = $('.gridster li[data-row="'+currentClick+'"][data-col="'+currentFirstRow+'"]').attr('id');
			currentFirstRow = currentFirstRow.replace('li', '');

		$('.stepped').removeClass('stepped');
		var connectorRemove = $('.gridster li[data-row="'+currentClick+'"]').attr('class');
			connectorRemove = $('.gridster li[data-row="'+currentClick+'"]').attr('data-class', connectorRemove);

		$('.gridster').prepend('<div class="gridShield"></div>');
					
		// moves chart down before adding in new row
		$('.gridster li').each(function() {
			var insertTileValueGet = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var refinedArray = $.map(insertTileValueGet, function(n) {
				return n <= currentFirstRow ? n + 0 : null;
			});

			$('.gridster li').each(function() {
				var rowDataGet = $(this).data('id');
				for (i = 0; i < refinedArray.length; i++) {
					if (refinedArray[i] == rowDataGet) {
						var insertRowUpdate = '#li'+rowDataGet;
						var insertRowGrabber = $(insertRowUpdate).attr('data-row');
							insertRowGrabber = parseInt(insertRowGrabber, 10) + 3;

						console.log(insertRowUpdate);
						console.log(insertRowGrabber);

						$(this).attr('data-row', insertRowGrabber);
						$(this).attr('data-truerow', insertRowGrabber);

						$(this).removeData('id');
					}
				}
			});
		});
		setSpans();

		var chartHeightUpdate = $('.gridster ul').height();
			chartHeightUpdate = parseInt(chartHeightUpdate, 10) + 45;
			chartHeightUpdate = chartHeightUpdate+'px';
		$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': chartHeightUpdate});
	});
	
	////// Add in Connector ////////////////////////////////////////////////////////////////////

	$("#tile_connectors").click(function(event) {

		var dividerGrabber = $('.gridster .gs_w.tile');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		dividerGrabber.addClass('connectors_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-connector').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Changing Connector States //////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.connectors_unlocked', function(){
		// switch from thru to reachRight for the chart tile
		if ($(this).hasClass('box')) {

			
			// switch from reachRight to full for the chart tile
			if ($(this).hasClass('reachRight')) {
				$(this).addClass('reachLeft');
				$(this).removeClass('reachRight');
			}
			// switch from full to reachLeft for the chart tile
			else if ($(this).hasClass('reachLeft')) {
				$(this).removeClass('reachLeft connector');
			}
			else {
				$(this).addClass('reachRight connector');
			}
		}
		else {
			if ($(this).hasClass('blocking')) {
				$(this).addClass('reachRight connector');
				$(this).removeClass('blocking');
			}
			// switch from reachRight to full for the chart tile
			else if ($(this).hasClass('reachRight')) {
				$(this).addClass('full');
				$(this).removeClass('reachRight');
			}
			// switch from full to reachLeft for the chart tile
			else if ($(this).hasClass('full')) {
				$(this).addClass('reachLeft');
				$(this).removeClass('full');
			}
			// switch from reachLeft to blocking for the chart tile
			else {
				$(this).addClass('blocking');
				$(this).removeClass('reachLeft connector');
			}
		}
	});

	////// Step Out of Line ///////////////////////////////////////////////////////////////////

	// Bind a mouseUp event on the document so that we can close the modal window when it is open.
	$(document).on("mousedown", function() {
		// Check to see if this event handler is "active". If it is not, then exit.
		if (!isHandlerActive) {
			return;
		}

		var grabber = $('.gridster .gs_w');
		var tileGrabber = $('.gridster .gs_w.tile');
		var dividerGrabber = $('.gridster .gs_w.divider');
		var nameTileGrabber = $('.gridster .gs_w.tile.box');

		var activeID = $(this).find("button.active").attr('id');
			activeID = '#'+ activeID;
		var navActiveBTN = $(activeID);
		var navActiveBTNicon = $(activeID+' span');

		var chartID = $('.gridster');
		var gridShield = $('.gridster .gridShield');
		var namerShield = $('.headerHider');

		// remove edit tile
		if (activeID == '#edit_tile') {
			tileGrabber.removeClass('tile_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("tiles locked.");
		}

		// remove edit divider
		if (activeID == '#edit_divider') {
			dividerGrabber.removeClass('divider_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("dividers locked.");
		}

		// remove edit tile type
		if (activeID == '#type_switch') {
			tileGrabber.removeClass('type_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("tile type locked.");
		}

		// remove add nope
		if (activeID == '#add_nope') {
			grabber.removeClass('nope_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-nope');
			navActiveBTN.removeClass('active');

			console.log("nope locked.");
		}

		// remove add name
		if (activeID == '#add_name') {
			nameTileGrabber.removeClass('name_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-name');
			navActiveBTN.removeClass('active');
			$('.remover').hide();

			console.log("names locked.");
		}

		// remove name card
		if (chartID.hasClass('activeChart')) {
			nameTileGrabber.removeClass('name_holder');
			level2.hide();
			chartID.addClass('passiveChart').removeClass('activeChart');
			gridShield.remove();
			namerShield.prepend('<div class="nameShield"></div>');

			console.log("name place locked.");
		}

		// remove 2x spanner
		if (activeID == '#add_span2') {
			grabber.removeClass('span2_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-hop');
			navActiveBTN.removeClass('active');

			console.log("double locked.");
		}

		// remove 3x spanner
		if (activeID == '#add_span3') {
			grabber.removeClass('span3_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-hop');
			navActiveBTN.removeClass('active');

			console.log("tripled locked.");
		}

		// remove add half step row
		if (activeID == '#half_step') {
			$('.gridShield').remove();
			grabber.removeClass('halfStep_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-add');
			navActiveBTN.removeClass('active');

			console.log("add half step locked.");
		}

		/// remove remove half step row
		if (activeID == '#half_stepRemove') {
			$('.gridShield').remove();
			grabber.removeClass('halfStepRemove_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-clear');
			navActiveBTN.removeClass('active');

			console.log("remove half step locked.");
		}

		/// remove remove half step row
		if (activeID == '#tile_connectors') {
			$('.gridShield').remove();
			grabber.removeClass('connectors_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-connector');
			navActiveBTN.removeClass('active');

			console.log("remove connector locked.");
		}

		// remove insert row
		if (activeID == '#insert_tile') {
			$('.gridShield').remove();
			grabber.removeClass('insertTile_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-insert_block');
			navActiveBTN.removeClass('active');

			console.log("insert a tile row locked.");
		}

		// Now that the modal window is hidden, we need to disable its event handler.
		isHandlerActive = false;
	});

	////// Safty Zones ////////////////////////////////////////////////////////////////////////

	saftyZones.on("mousedown", function(event) {
		return false;
	});

	////// Save Out Progress For Later Use ////////////////////////////////////////////////////

	$('#archive').on('click', function(e, i) {
		e.preventDefault();

		var positions = JSON.stringify(grid_canvas.serialize());
		var blockPositions = $($("style")[1]).html();

		$('.jsonCopy, .cssPos').remove();
		$('.demo').after('<div class="cssPos"></div>');
		$('.cssPos').after('<div class="jsonCopy" /div>');
		$('.cssPos').html(blockPositions).before('<h2 class="printoutHeader">CSS Placement For Maintenance</h2>');
		$('.jsonCopy').html(positions).before('<h2 class="printoutHeader">JSON Output For Maintenance</h2>');

		$('.jsonCopy').contents().filter(function() {
			return this.nodeType == Node.TEXT_NODE && this.nodeValue.indexOf('undefined') >= 0;
		}).each(function() {
			this.nodeValue = this.nodeValue.replace(/\undefined\b/g, "dead");
		});

		$(".jsonCopy").text(function () {
			return $(this).text().replace("[", "var json = [");
		});
		$(".jsonCopy").text(function () {
			return $(this).text().replace("}]", "}];");
		});

		$('#tidy').prop("disabled", false);
	});

	////// Tidy Up For Deployment /////////////////////////////////////////////////////////////

	$('#tidy').on('click', function(e, i) {
		e.preventDefault();
		$('.printoutHeader, .cssPos, .jsonCopy').remove();

		$("head").append('<style type="text/css" id="spannerOffset"></style>');
		$("head").append('<style type="text/css" id="refinedPositioning"></style>');

		grid_canvas.remove_widget($('.gridster li.blocking'), true, function(){
			resetIDs();
			dataID();

			var reHeight = $('.gridster ul').height();
				reHeight = reHeight+'px';
			$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': reHeight});
			$('#deployr').prop("disabled", false);
		});

		$('.gridster li').removeClass('name_placed');
	});

	////// Deploy That shit Son ///////////////////////////////////////////////////////////////

	$('#deployr').on('click', function(e, i) {
		e.preventDefault();

		$(".gridster li").each(function(i) {
			var titlePuller = $(this).attr('data-tilename');
			if (titlePuller == 'dead') {}
			else {
				$('.gridster li[data-tilename="'+titlePuller+'"]').removeAttr('id').attr('id', titlePuller);
			}
			$(this).removeAttr('data-tilename');

		});

		$('.gridster li[id^="li"]').each(function(i) {
			var idChecker = $(this).attr('id');
			$('#'+idChecker).addClass('tweakIDs');
			
			$('.gridster li.tweakIDs').each(function(i) {
				i = i + 1;
				$(this).attr('id', 'gs_w' + i);
			});
		});

		$('.gridster li').removeClass('tweakIDs');

		$(".gridster li").each(function(i) {
			var spannerPuller = $(this).attr('data-spanpush');
			if (spannerPuller == 'dead') {

			}
			else {
				$('.gridster li[data-spanpush="'+spannerPuller+'"]').each(function(i) {
					var collectedIDs = $(this).attr('id');
					$('#spannerOffset').append('#'+collectedIDs+' { left: '+spannerPuller+'px; }');
				});
			}
			$(this).removeAttr('data-spanpush').css('display', 'list-item');
		});

		$('.gridster li').each(function() {
			var item = $(this);
			var ID = item.attr('id');
			var position = item.position();
			var height = item.height();
			var width = item.width();

			$('#refinedPositioning').append('#'+ID+' { height: '+height+'px; width: '+width+'px; left: '+position.left+'px; top: '+position.top+'px; }');
		});

		$('#_gridster_auto_css, #spannerOffset').remove();
		$('.gridster li').removeAttr('data-truerow').removeAttr('data-class').removeAttr('data-col').removeAttr('data-sizex').removeAttr('data-sizey').removeAttr('data-row').empty();

		var positions = $('.gridster').html();
		var blockPositions = $('#refinedPositioning').html();
		var gridsterWidthGrab = $('.gridster').width();

		$('.demo').after('<textarea class="cssRePos"></textarea>');
		$('.cssRePos').after('<textarea class="chartHTML" /textarea>');
		$('.cssRePos').html(blockPositions).before('<h2 class="printoutHeader">CSS Placement For Live</h2>');
		$('.chartHTML').html(positions).before('<h2 class="printoutHeader">JSON Output For Live</h2>').prepend('chart width: '+gridsterWidthGrab+'px');
	});

});

function center() {
	$('body').scrollTo( '50%', {axis: 'x'} );
};

// Center chart in window
$(document).ready(center); // When the page first loads
$(window).resize(center); // When the browser changes size

