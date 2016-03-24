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
		// draggable: {
		// 	stop: function(event, ui) {
		// 		saveGrid();
		// 	}
		// },
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		// avoid_overlapped_widgets: false,
		// autogenerate_stylesheet: false,
		min_cols: 35,
		shift_larger_widgets_down: false,
		
		serialize_params: function($w, wgd) {
			return {
				id: $($w).attr('id'),
				class: $($w).attr('class'),
				htmlContent: $($w).html(),
				blockContent: $($w).attr('blockContent'),
				true_row: $($w).attr('data-truerow'),
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

						$(this).removeAttr('data-truerow');
						$(this).removeAttr('data-row');
						result = $(this).attr('data-row', trueRowNew);
						$(this).removeData('truerow');
					}
				}
			});
		});
	}
	var setColumns = function () {

		var saftyRowValue = $('.gridster li[data-col="1"]');
		
		saftyRowValue.each(function() {
			var colValueGet = $(this).map(function() {
				return $(this).data('row');
			});

			$('.gridster .gs_w').each(function() {
				var rowDataGet = $(this).data('row');

				for (i = 0; i < colValueGet.length; i++) {
					if (colValueGet[i] == rowDataGet) {
						var trueRowGet = parseInt(rowDataGet);

						$(this).removeAttr('data-truerow');
						result = $(this).attr('data-truerow', trueRowGet);
						$(this).removeData('row');
					}
				}
			});
		});
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
		maxRow('.gridster li');
		var bottomRow = maxRow('.gridster li');
			bottomRow = 'li.gs_w[data-row="'+ bottomRow +'"]';
			bottomRow = $(bottomRow);

		bottomRow.addClass('nope');
	}
	var saveGrid = function () {
		resetIDs();
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

			var json = [
				{"id":"li1","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"28","size_x":"1","size_y":"5"},
				{"id":"li2","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"28","size_x":"1","size_y":"5"},
				{"id":"li3","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"28","size_x":"1","size_y":"5"},
				{"id":"li4","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"28","size_x":"1","size_y":"5"},
				{"id":"li5","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"28","size_x":"1","size_y":"5"},
				{"id":"li6","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"28","size_x":"1","size_y":"5"},
				{"id":"li7","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"28","size_x":"1","size_y":"5"},
				{"id":"li8","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"28","size_x":"1","size_y":"5"},
				{"id":"li9","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"28","size_x":"1","size_y":"5"},
				{"id":"li10","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"28","size_x":"1","size_y":"5"},
				{"id":"li11","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"28","size_x":"1","size_y":"5"},
				{"id":"li12","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"28","size_x":"1","size_y":"5"},
				{"id":"li13","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"28","size_x":"1","size_y":"5"},
				{"id":"li14","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"28","size_x":"1","size_y":"5"},
				{"id":"li15","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"28","size_x":"1","size_y":"5"},
				{"id":"li16","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"28","size_x":"1","size_y":"5"},
				{"id":"li17","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"28","size_x":"1","size_y":"5"},
				{"id":"li18","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"28","size_x":"1","size_y":"5"},
				{"id":"li19","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"28","size_x":"1","size_y":"5"},
				{"id":"li20","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"28","size_x":"1","size_y":"5"},
				{"id":"li21","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"28","size_x":"1","size_y":"5"},
				{"id":"li22","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"28","size_x":"1","size_y":"5"},
				{"id":"li23","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"28","size_x":"1","size_y":"5"},
				{"id":"li24","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"28","size_x":"1","size_y":"5"},
				{"id":"li25","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"28","size_x":"1","size_y":"5"},
				{"id":"li26","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"28","size_x":"1","size_y":"5"},
				{"id":"li27","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"28","size_x":"1","size_y":"5"},
				{"id":"li28","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"28","size_x":"1","size_y":"5"},
				{"id":"li29","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"28","size_x":"1","size_y":"5"},
				{"id":"li30","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"28","size_x":"1","size_y":"5"},
				{"id":"li31","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"28","size_x":"1","size_y":"5"},
				{"id":"li32","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"28","size_x":"1","size_y":"5"},
				{"id":"li33","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"28","size_x":"1","size_y":"5"},
				{"id":"li34","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"28","size_x":"1","size_y":"5"},
				{"id":"li35","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"28","size_x":"1","size_y":"5"},
				{"id":"li36","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"23","size_x":"1","size_y":"5"},
				{"id":"li37","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"23","size_x":"1","size_y":"5"},
				{"id":"li38","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"23","size_x":"1","size_y":"5"},
				{"id":"li39","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"23","size_x":"1","size_y":"5"},
				{"id":"li40","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"23","size_x":"1","size_y":"5"},
				{"id":"li41","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"23","size_x":"1","size_y":"5"},
				{"id":"li42","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"23","size_x":"1","size_y":"5"},
				{"id":"li43","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"23","size_x":"1","size_y":"5"},
				{"id":"li44","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"23","size_x":"1","size_y":"5"},
				{"id":"li45","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"23","size_x":"1","size_y":"5"},
				{"id":"li46","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"23","size_x":"1","size_y":"5"},
				{"id":"li47","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"23","size_x":"1","size_y":"5"},
				{"id":"li48","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"23","size_x":"1","size_y":"5"},
				{"id":"li49","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"23","size_x":"1","size_y":"5"},
				{"id":"li50","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"23","size_x":"1","size_y":"5"},
				{"id":"li51","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"23","size_x":"1","size_y":"5"},
				{"id":"li52","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"23","size_x":"1","size_y":"5"},
				{"id":"li53","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"23","size_x":"1","size_y":"5"},
				{"id":"li54","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"23","size_x":"1","size_y":"5"},
				{"id":"li55","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"23","size_x":"1","size_y":"5"},
				{"id":"li56","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"23","size_x":"1","size_y":"5"},
				{"id":"li57","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"23","size_x":"1","size_y":"5"},
				{"id":"li58","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"23","size_x":"1","size_y":"5"},
				{"id":"li59","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"23","size_x":"1","size_y":"5"},
				{"id":"li60","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"23","size_x":"1","size_y":"5"},
				{"id":"li61","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"23","size_x":"1","size_y":"5"},
				{"id":"li62","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"23","size_x":"1","size_y":"5"},
				{"id":"li63","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"23","size_x":"1","size_y":"5"},
				{"id":"li64","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"23","size_x":"1","size_y":"5"},
				{"id":"li65","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"23","size_x":"1","size_y":"5"},
				{"id":"li66","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"23","size_x":"1","size_y":"5"},
				{"id":"li67","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"23","size_x":"1","size_y":"5"},
				{"id":"li68","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"23","size_x":"1","size_y":"5"},
				{"id":"li69","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"23","size_x":"1","size_y":"5"},
				{"id":"li70","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"23","size_x":"1","size_y":"5"},
				{"id":"li71","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"18","size_x":"1","size_y":"5"},
				{"id":"li72","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"18","size_x":"1","size_y":"5"},
				{"id":"li73","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"18","size_x":"1","size_y":"5"},
				{"id":"li74","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"18","size_x":"1","size_y":"5"},
				{"id":"li75","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"18","size_x":"1","size_y":"5"},
				{"id":"li76","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"18","size_x":"1","size_y":"5"},
				{"id":"li77","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"18","size_x":"1","size_y":"5"},
				{"id":"li78","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"18","size_x":"1","size_y":"5"},
				{"id":"li79","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"18","size_x":"1","size_y":"5"},
				{"id":"li80","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"18","size_x":"1","size_y":"5"},
				{"id":"li81","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"18","size_x":"1","size_y":"5"},
				{"id":"li82","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"18","size_x":"1","size_y":"5"},
				{"id":"li83","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"18","size_x":"1","size_y":"5"},
				{"id":"li84","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"18","size_x":"1","size_y":"5"},
				{"id":"li85","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"18","size_x":"1","size_y":"5"},
				{"id":"li86","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"18","size_x":"1","size_y":"5"},
				{"id":"li87","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"18","size_x":"1","size_y":"5"},
				{"id":"li88","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"18","size_x":"1","size_y":"5"},
				{"id":"li89","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"18","size_x":"1","size_y":"5"},
				{"id":"li90","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"18","size_x":"1","size_y":"5"},
				{"id":"li91","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"18","size_x":"1","size_y":"5"},
				{"id":"li92","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"18","size_x":"1","size_y":"5"},
				{"id":"li93","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"18","size_x":"1","size_y":"5"},
				{"id":"li94","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"18","size_x":"1","size_y":"5"},
				{"id":"li95","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"18","size_x":"1","size_y":"5"},
				{"id":"li96","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"18","size_x":"1","size_y":"5"},
				{"id":"li97","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"18","size_x":"1","size_y":"5"},
				{"id":"li98","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"18","size_x":"1","size_y":"5"},
				{"id":"li99","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"18","size_x":"1","size_y":"5"},
				{"id":"li100","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"18","size_x":"1","size_y":"5"},
				{"id":"li101","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"18","size_x":"1","size_y":"5"},
				{"id":"li102","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"18","size_x":"1","size_y":"5"},
				{"id":"li103","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"18","size_x":"1","size_y":"5"},
				{"id":"li104","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"18","size_x":"1","size_y":"5"},
				{"id":"li105","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"18","size_x":"1","size_y":"5"},
				{"id":"li106","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"13","size_x":"1","size_y":"5"},
				{"id":"li107","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"13","size_x":"1","size_y":"5"},
				{"id":"li108","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"13","size_x":"1","size_y":"5"},
				{"id":"li109","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"13","size_x":"1","size_y":"5"},
				{"id":"li110","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"13","size_x":"1","size_y":"5"},
				{"id":"li111","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"13","size_x":"1","size_y":"5"},
				{"id":"li112","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"13","size_x":"1","size_y":"5"},
				{"id":"li113","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"13","size_x":"1","size_y":"5"},
				{"id":"li114","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"13","size_x":"1","size_y":"5"},
				{"id":"li115","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"13","size_x":"1","size_y":"5"},
				{"id":"li116","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"13","size_x":"1","size_y":"5"},
				{"id":"li117","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"13","size_x":"1","size_y":"5"},
				{"id":"li118","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"13","size_x":"1","size_y":"5"},
				{"id":"li119","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"13","size_x":"1","size_y":"5"},
				{"id":"li120","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"13","size_x":"1","size_y":"5"},
				{"id":"li121","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"13","size_x":"1","size_y":"5"},
				{"id":"li122","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"13","size_x":"1","size_y":"5"},
				{"id":"li123","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"13","size_x":"1","size_y":"5"},
				{"id":"li124","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"13","size_x":"1","size_y":"5"},
				{"id":"li125","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"13","size_x":"1","size_y":"5"},
				{"id":"li126","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"13","size_x":"1","size_y":"5"},
				{"id":"li127","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"13","size_x":"1","size_y":"5"},
				{"id":"li128","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"13","size_x":"1","size_y":"5"},
				{"id":"li129","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"13","size_x":"1","size_y":"5"},
				{"id":"li130","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"13","size_x":"1","size_y":"5"},
				{"id":"li131","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"13","size_x":"1","size_y":"5"},
				{"id":"li132","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"13","size_x":"1","size_y":"5"},
				{"id":"li133","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"13","size_x":"1","size_y":"5"},
				{"id":"li134","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"13","size_x":"1","size_y":"5"},
				{"id":"li135","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"13","size_x":"1","size_y":"5"},
				{"id":"li136","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"13","size_x":"1","size_y":"5"},
				{"id":"li137","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"13","size_x":"1","size_y":"5"},
				{"id":"li138","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"13","size_x":"1","size_y":"5"},
				{"id":"li139","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"13","size_x":"1","size_y":"5"},
				{"id":"li140","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"13","size_x":"1","size_y":"5"},
				{"id":"li141","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"12","size_x":"1","size_y":"1"},
				{"id":"li142","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"12","size_x":"1","size_y":"1"},
				{"id":"li143","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"12","size_x":"1","size_y":"1"},
				{"id":"li144","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"12","size_x":"1","size_y":"1"},
				{"id":"li145","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"12","size_x":"1","size_y":"1"},
				{"id":"li146","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"12","size_x":"1","size_y":"1"},
				{"id":"li147","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"12","size_x":"1","size_y":"1"},
				{"id":"li148","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"12","size_x":"1","size_y":"1"},
				{"id":"li149","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"12","size_x":"1","size_y":"1"},
				{"id":"li150","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"12","size_x":"1","size_y":"1"},
				{"id":"li151","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"12","size_x":"1","size_y":"1"},
				{"id":"li152","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"12","size_x":"1","size_y":"1"},
				{"id":"li153","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"12","size_x":"1","size_y":"1"},
				{"id":"li154","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"12","size_x":"1","size_y":"1"},
				{"id":"li155","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"12","size_x":"1","size_y":"1"},
				{"id":"li156","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"12","size_x":"1","size_y":"1"},
				{"id":"li157","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"12","size_x":"1","size_y":"1"},
				{"id":"li158","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"12","size_x":"1","size_y":"1"},
				{"id":"li159","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"12","size_x":"1","size_y":"1"},
				{"id":"li160","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"12","size_x":"1","size_y":"1"},
				{"id":"li161","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"12","size_x":"1","size_y":"1"},
				{"id":"li162","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"12","size_x":"1","size_y":"1"},
				{"id":"li163","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"12","size_x":"1","size_y":"1"},
				{"id":"li164","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"12","size_x":"1","size_y":"1"},
				{"id":"li165","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"12","size_x":"1","size_y":"1"},
				{"id":"li166","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"12","size_x":"1","size_y":"1"},
				{"id":"li167","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"12","size_x":"1","size_y":"1"},
				{"id":"li168","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"12","size_x":"1","size_y":"1"},
				{"id":"li169","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"12","size_x":"1","size_y":"1"},
				{"id":"li170","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"12","size_x":"1","size_y":"1"},
				{"id":"li171","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"12","size_x":"1","size_y":"1"},
				{"id":"li172","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"12","size_x":"1","size_y":"1"},
				{"id":"li173","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"12","size_x":"1","size_y":"1"},
				{"id":"li174","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"12","size_x":"1","size_y":"1"},
				{"id":"li175","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"12","size_x":"1","size_y":"1"},
				{"id":"li176","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"7","size_x":"1","size_y":"5"},
				{"id":"li177","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"7","size_x":"1","size_y":"5"},
				{"id":"li178","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"7","size_x":"1","size_y":"5"},
				{"id":"li179","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"7","size_x":"1","size_y":"5"},
				{"id":"li180","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"7","size_x":"1","size_y":"5"},
				{"id":"li181","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"7","size_x":"1","size_y":"5"},
				{"id":"li182","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"7","size_x":"1","size_y":"5"},
				{"id":"li183","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"7","size_x":"1","size_y":"5"},
				{"id":"li184","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"7","size_x":"1","size_y":"5"},
				{"id":"li185","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"7","size_x":"1","size_y":"5"},
				{"id":"li186","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"7","size_x":"1","size_y":"5"},
				{"id":"li187","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"7","size_x":"1","size_y":"5"},
				{"id":"li188","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"7","size_x":"1","size_y":"5"},
				{"id":"li189","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"7","size_x":"1","size_y":"5"},
				{"id":"li190","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"7","size_x":"1","size_y":"5"},
				{"id":"li191","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"7","size_x":"1","size_y":"5"},
				{"id":"li192","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"7","size_x":"1","size_y":"5"},
				{"id":"li193","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"7","size_x":"1","size_y":"5"},
				{"id":"li194","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"7","size_x":"1","size_y":"5"},
				{"id":"li195","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"7","size_x":"1","size_y":"5"},
				{"id":"li196","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"7","size_x":"1","size_y":"5"},
				{"id":"li197","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"7","size_x":"1","size_y":"5"},
				{"id":"li198","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"7","size_x":"1","size_y":"5"},
				{"id":"li199","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"7","size_x":"1","size_y":"5"},
				{"id":"li200","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"7","size_x":"1","size_y":"5"},
				{"id":"li201","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"7","size_x":"1","size_y":"5"},
				{"id":"li202","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"7","size_x":"1","size_y":"5"},
				{"id":"li203","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"7","size_x":"1","size_y":"5"},
				{"id":"li204","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"7","size_x":"1","size_y":"5"},
				{"id":"li205","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"7","size_x":"1","size_y":"5"},
				{"id":"li206","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"7","size_x":"1","size_y":"5"},
				{"id":"li207","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"7","size_x":"1","size_y":"5"},
				{"id":"li208","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"7","size_x":"1","size_y":"5"},
				{"id":"li209","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"7","size_x":"1","size_y":"5"},
				{"id":"li210","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"7","size_x":"1","size_y":"5"},
				{"id":"li211","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"6","size_x":"1","size_y":"1"},
				{"id":"li212","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"6","size_x":"1","size_y":"1"},
				{"id":"li213","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"6","size_x":"1","size_y":"1"},
				{"id":"li214","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"6","size_x":"1","size_y":"1"},
				{"id":"li215","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"6","size_x":"1","size_y":"1"},
				{"id":"li216","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"6","size_x":"1","size_y":"1"},
				{"id":"li217","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"6","size_x":"1","size_y":"1"},
				{"id":"li218","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"6","size_x":"1","size_y":"1"},
				{"id":"li219","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"6","size_x":"1","size_y":"1"},
				{"id":"li220","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"6","size_x":"1","size_y":"1"},
				{"id":"li221","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"6","size_x":"1","size_y":"1"},
				{"id":"li222","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"6","size_x":"1","size_y":"1"},
				{"id":"li223","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"6","size_x":"1","size_y":"1"},
				{"id":"li224","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"6","size_x":"1","size_y":"1"},
				{"id":"li225","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"6","size_x":"1","size_y":"1"},
				{"id":"li226","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"6","size_x":"1","size_y":"1"},
				{"id":"li227","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"6","size_x":"1","size_y":"1"},
				{"id":"li228","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"6","size_x":"1","size_y":"1"},
				{"id":"li229","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"6","size_x":"1","size_y":"1"},
				{"id":"li230","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"6","size_x":"1","size_y":"1"},
				{"id":"li231","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"6","size_x":"1","size_y":"1"},
				{"id":"li232","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"6","size_x":"1","size_y":"1"},
				{"id":"li233","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"6","size_x":"1","size_y":"1"},
				{"id":"li234","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"6","size_x":"1","size_y":"1"},
				{"id":"li235","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"6","size_x":"1","size_y":"1"},
				{"id":"li236","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"6","size_x":"1","size_y":"1"},
				{"id":"li237","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"6","size_x":"1","size_y":"1"},
				{"id":"li238","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"6","size_x":"1","size_y":"1"},
				{"id":"li239","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"6","size_x":"1","size_y":"1"},
				{"id":"li240","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"6","size_x":"1","size_y":"1"},
				{"id":"li241","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"6","size_x":"1","size_y":"1"},
				{"id":"li242","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"6","size_x":"1","size_y":"1"},
				{"id":"li243","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"6","size_x":"1","size_y":"1"},
				{"id":"li244","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"6","size_x":"1","size_y":"1"},
				{"id":"li245","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"6","size_x":"1","size_y":"1"},
				{"id":"li246","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"1","size_x":"1","size_y":"5"},
				{"id":"li247","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"1","size_x":"1","size_y":"5"},
				{"id":"li248","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"1","size_x":"1","size_y":"5"},
				{"id":"li249","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"1","size_x":"1","size_y":"5"},
				{"id":"li250","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"1","size_x":"1","size_y":"5"},
				{"id":"li251","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"1","size_x":"1","size_y":"5"},
				{"id":"li252","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"1","size_x":"1","size_y":"5"},
				{"id":"li253","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"1","size_x":"1","size_y":"5"},
				{"id":"li254","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"1","size_x":"1","size_y":"5"},
				{"id":"li255","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"1","size_x":"1","size_y":"5"},
				{"id":"li256","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"1","size_x":"1","size_y":"5"},
				{"id":"li257","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"1","size_x":"1","size_y":"5"},
				{"id":"li258","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"1","size_x":"1","size_y":"5"},
				{"id":"li259","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"1","size_x":"1","size_y":"5"},
				{"id":"li260","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"1","size_x":"1","size_y":"5"},
				{"id":"li261","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"1","size_x":"1","size_y":"5"},
				{"id":"li262","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"1","size_x":"1","size_y":"5"},
				{"id":"li263","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"1","size_x":"1","size_y":"5"},
				{"id":"li264","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"1","size_x":"1","size_y":"5"},
				{"id":"li265","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"1","size_x":"1","size_y":"5"},
				{"id":"li266","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"1","size_x":"1","size_y":"5"},
				{"id":"li267","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"1","size_x":"1","size_y":"5"},
				{"id":"li268","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"1","size_x":"1","size_y":"5"},
				{"id":"li269","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"1","size_x":"1","size_y":"5"},
				{"id":"li270","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"1","size_x":"1","size_y":"5"},
				{"id":"li271","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"1","size_x":"1","size_y":"5"},
				{"id":"li272","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"1","size_x":"1","size_y":"5"},
				{"id":"li273","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"1","size_x":"1","size_y":"5"},
				{"id":"li274","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"1","size_x":"1","size_y":"5"},
				{"id":"li275","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"1","size_x":"1","size_y":"5"},
				{"id":"li276","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"1","size_x":"1","size_y":"5"},
				{"id":"li277","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"1","size_x":"1","size_y":"5"},
				{"id":"li278","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"1","size_x":"1","size_y":"5"},
				{"id":"li279","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"1","size_x":"1","size_y":"5"},
				{"id":"li280","class":"tile blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"1","size_x":"1","size_y":"5"}
			];
			for(i=0; i<json.length; i++) {

				// add a leading zero to fix the build out
				if(json[i].col < 10) {
					colID = '0'+json[i].col;
				} else {
					colID = json[i].col;
				}
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" blockcontent="'+json[i]['blockContent']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i].size_x, json[i].size_y, colID, json[i].row);

			}
			fixOrder();
			
			// for now
			resetIDs();
			chartBottom();
			setColumns();

		} else {

			var json = value;
			for(i=0; i<json.length; i++) {

				// add a leading zero to fix the build out
				if(json[i].col < 10) {
					colID = '0'+json[i].col;
				} else {
					colID = json[i].col;
				}
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" data-truerow="'+json[i]['true_row']+'" blockcontent="'+json[i]['blockContent']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i].size_x, json[i].size_y, json[i].col, json[i].row);
			}
			fixOrder();
			// resetIDs();
			// chartBottom();
			fixColumns();

		}

	});

	////// Save Progress //////////////////////////////////////////////////////////////////////

	$('#seralize').on('click', function(e, i) {
		e.preventDefault();
		chartBottom();
		setColumns();
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
	$('#add_block').on('click', function(e, i) {
		e.preventDefault();
		$.each(blocks, function(i, widget){
			blocks = grid_canvas.sort_by_row_and_col_asc(blocks);
			grid_canvas.add_widget('<li class="tile blocking"></li>', this.size_x, this.size_y, this.col, this.row);
		});

		resetIDs();

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
		$.each(dividers, function(i, widget){
			dividers = grid_canvas.sort_by_row_and_col_asc(dividers);
			grid_canvas.add_widget('<li class="divider blocking"></li>', this.size_x, this.size_y, this.col, this.row);
		});

		resetIDs();
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

	// switch from blocking to box for the chart boxes
	$(document).on('click', '.gridster .tile.blocking.tile_unlocked', function(){
		$(this).addClass('box').append('<div class="nameBox"></div>');
		$(this).removeClass('blocking');
	});

	// switch from box to thru for the chart boxes
	$(document).on('click', '.gridster .tile.box.tile_unlocked', function(){
		$(this).addClass('thru');
		$(this).removeClass('box').empty();
	});

	// switch from thru to blocking for the chart boxes
	$(document).on('click', '.gridster .tile.thru.tile_unlocked', function(){
		$(this).addClass('blocking');
		$(this).removeClass('thru');
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

	// switch from blocking to thru for the chart boxes
	$(document).on('click', '.gridster .divider.blocking.divider_unlocked', function(){
		$(this).addClass('thru');
		$(this).removeClass('blocking');
	});

	// switch from thru to reachRight for the chart boxes
	$(document).on('click', '.gridster .divider.thru.divider_unlocked', function(){
		$(this).addClass('reachRight');
		$(this).removeClass('thru');
	});

	// switch from reachRight to full for the chart boxes
	$(document).on('click', '.gridster .divider.reachRight.divider_unlocked', function(){
		$(this).addClass('full');
		$(this).removeClass('reachRight');
	});

	// switch from full to reachLeft for the chart boxes
	$(document).on('click', '.divider.full.divider_unlocked', function(){
		$(this).addClass('reachLeft');
		$(this).removeClass('full');
	});

	// switch from reachLeft to blocking for the chart boxes
	$(document).on('click', '.gridster .divider.reachLeft.divider_unlocked', function(){
		$(this).addClass('blocking');
		$(this).removeClass('reachLeft');
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

		$('.gridster .gs_w.tile.box.name_unlocked.name_holder .nameBox').append('<span class="remover icon-remove" blockcontent="'+lablr+'"></span><span>'+named+'</span>');
		$('.gridster .gs_w.tile.box.name_unlocked.name_holder').addClass('name_placed').attr('blockcontent', lablr).removeClass('name_holder');

		if($('.gridster .gs_w.tile.box.name_unlocked.name_holder')) {

			$(this).attr("disabled", true);
			$(this).parent().addClass('used');
		}

		$('.gridster .gridShield').remove();
		$('.headerHider').prepend('<div class="nameShield"></div>');
	});

	// remove name
	$(document).on('click', '.gs_w.tile.box.name_placed .nameBox .remover', function(event){
		
		if ($(this).attr('blockcontent')){

			var findval = $(this).attr('blockcontent');

			var theInput = ("input[value=" + findval + "].radioBtnClass");
			var theBlock = ("li[blockcontent=" + findval + "].gs_w.box.name_placed");

			$(theInput).prop('checked', false).removeAttr('disabled');
			$(theInput).parent().removeClass('used');
			$(theBlock).empty().append('<div class="nameBox"></div>');
			$(theBlock).removeClass('name_placed').addClass('name_unlocked').attr('blockcontent', 'holder');

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

		// Remove
		if ($(this).hasClass('doubled')) {
			event.preventDefault();

			$(this).removeAttr('style').css('display', 'list-item');

			var currentClick = $(this).attr('data-col');
				currentClick = parseInt(currentClick);
				currentClick = '.gs_w.span2_unlocked[data-col="' +currentClick+'"]';

			var clickID = $(this).addClass('bookmark');
				clickID = $(clickID).attr('id');
				clickID = clickID.replace('li', '');

			var clickThisID = parseInt(clickID);
				clickThisID = '#li' +clickThisID;
				
			var clickNextID = parseInt(clickID) + 1;
				clickNextID = 'li' +clickNextID;

			var clickClass = $(clickThisID).attr('class');
				clickClass = clickClass.replace(' gs_w', '');
				clickClass = clickClass.replace(' doubled', '');
				clickClass = clickClass.replace(' bookmark', '');

			var clickCol = $(clickThisID).attr('data-col');
				clickCol = parseInt(clickCol) + 1;

			var clickRow = $(clickThisID).attr('data-row');
				clickRow = parseInt(clickRow);

			var clickXsize = $(clickThisID).attr('data-sizex');
				clickXsize = parseInt(clickXsize);

			var clickYsize = $(clickThisID).attr('data-sizey');
				clickYsize = parseInt(clickYsize);

			if ($(this).hasClass('tile')) {

				$(this).addClass('blocking').removeClass('box');
				var clickClassTile = clickClass.replace('box', 'blocking');
				var widgetsTile = [
					['<li class="'+clickClassTile+'" blockcontent="holder" id="'+clickNextID+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsTile, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);
				});

				var cutter2x = $(clickThisID).attr('id');
					cutter2x = cutter2x.replace('li', '');
					cutter2x = parseInt(cutter2x) + 1;
					cutter2x = '#li' +cutter2x;

				$('.gridster ul').each(function () {
					$(this).find(cutter2x).insertAfter($(this).find(clickThisID));
				});

			}
			else {
				var widgetsDivider = [
					['<li class="'+clickClass+'" id="'+clickNextID+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsDivider, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);
				});

				var cutter2x = $(clickThisID).attr('id');
					cutter2x = cutter2x.replace('li', '');
					cutter2x = parseInt(cutter2x) + 1;
					cutter2x = '#li' +cutter2x;

				$('.gridster ul').each(function () {
					$(this).find(cutter2x).insertAfter($(this).find(clickThisID));
				});
			}

			$(clickThisID).removeClass('doubled bookmark');
		}
		// Add
		else {

			event.preventDefault();
			var oneOver = $(this).attr('id');
				oneOver = oneOver.replace('li', '');
				oneOver = parseInt(oneOver);
			var originalOne = '#li' +oneOver;
			var toBeRemoved = oneOver + 1;
				toBeRemoved = '#li' +toBeRemoved;
			var doubledPush = $(this).css('left');
				doubledPush = doubledPush.replace('px', '');
				doubledPush = parseInt(doubledPush) + 70;
				doubledPush = doubledPush+ 'px';

			grid_canvas.remove_widget($(toBeRemoved), true, function(){
				$(originalOne).addClass('doubled').css({'display': 'list-item', 'left': doubledPush});
				if ($(originalOne).hasClass('tile')) {
					$(originalOne).addClass('box').removeClass('blocking');
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

		var origin = $(this).attr('id');
			origin = origin.replace('li', '');
			origin = parseInt(origin);

		var originalOne = '#li' +origin;

		var oneOver = origin + 1;
			oneOver = '#li' +oneOver;

		var oneBack = origin - 1;
			oneBack = '#li' +oneBack;

		var baseCSS = $(originalOne).css('left');
			baseCSS = baseCSS.replace('px', '');

		var currentClick = $(originalOne).attr('data-col');
			currentClick = parseInt(currentClick);
			currentClick = '.gs_w.span2_unlocked[data-col="' +currentClick+'"]';

		var clickID = $(originalOne).addClass('bookmark');
			clickID = $(clickID).attr('id');
			clickID = clickID.replace('li', '');

		var clickThisID = parseInt(clickID);
			clickThisID = '#li' +clickThisID;
			
		var clickNextID = parseInt(clickID) + 1;
			clickNextID = 'li' +clickNextID;

		var clickClass = $(clickThisID).attr('class');
			clickClass = clickClass.replace(' gs_w', '');
			clickClass = clickClass.replace(' doubled', '');
			clickClass = clickClass.replace(' bookmark', '');

		var clickCol = $(clickThisID).attr('data-col');
			clickCol = parseInt(clickCol) + 1;

		var clickRow = $(clickThisID).attr('data-row');
			clickRow = parseInt(clickRow);

		var clickXsize = $(clickThisID).attr('data-sizex');
			clickXsize = parseInt(clickXsize);
		var clickYsize = $(clickThisID).attr('data-sizey');
			clickYsize = parseInt(clickYsize);

		// change to single right
		if ($(this).hasClass('tripled') && $(this).hasClass('center')) {

			event.preventDefault();
			var tripledPushRight = parseInt(baseCSS) + 70;
				tripledPushRight = tripledPushRight+ 'px';
			$(originalOne).addClass('right').removeClass('center bookmark').css({'display': 'list-item', 'left': tripledPushRight});

		}
		// change to single Left
		else if ($(this).hasClass('tripled') && $(this).hasClass('right')) {

			event.preventDefault();
			$(originalOne).addClass('left').removeClass('right bookmark').removeAttr('style').css('display', 'list-item');
			var tripledPushLeft = parseInt(baseCSS) - 140;
				tripledPushLeft = tripledPushLeft+ 'px';
			$(originalOne).removeAttr('style').css({'display': 'list-item', 'left': tripledPushLeft});

		}
		// change to doubled
		else if ($(this).hasClass('tripled') && $(this).hasClass('left')) {

			event.preventDefault();
			var tripledPushLeft = baseCSS+ 'px';
			$(originalOne).addClass('first').removeClass('left bookmark').removeAttr('style').css({'display': 'list-item', 'left': tripledPushLeft});

			if ($(this).hasClass('tile')) {
				var clickClassTile = clickClass.replace('left', 'second');
				var tripledSecondPushLeft = parseInt(baseCSS) + 140;
					tripledSecondPushLeft = tripledSecondPushLeft+ 'px';
				
				var widgetsTile = [
					['<li class="'+clickClassTile+'" blockcontent="holder" id="'+clickNextID+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsTile, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).css('left', tripledSecondPushLeft);
				});

				var cutter2x = $(clickThisID).attr('id');
					cutter2x = cutter2x.replace('li', '');
					cutter2x = parseInt(cutter2x) + 1;
					cutter2x = '#li' +cutter2x;

				$('.gridster ul').each(function () {
					$(this).find(cutter2x).insertAfter($(this).find(clickThisID));
				});
			}
			else {
				var clickClassDivider = clickClass.replace('left', 'second');
				var tripledSecondPushLeft = parseInt(baseCSS) + 140;
					tripledSecondPushLeft = tripledSecondPushLeft+ 'px';
				var widgetsDivider = [
					['<li class="'+clickClassDivider+'" id="'+clickNextID+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsDivider, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).css('left', tripledSecondPushLeft);
				});

				var cutter2x = $(clickThisID).attr('id');
					cutter2x = cutter2x.replace('li', '');
					cutter2x = parseInt(cutter2x) + 1;
					cutter2x = '#li' +cutter2x;

				$('.gridster ul').each(function () {
					$(this).find(cutter2x).insertAfter($(this).find(clickThisID));
				});
			}

		}
		// back to default
		else if ($(this).hasClass('tripled') && $(this).hasClass('first')) {

			event.preventDefault();
			var tripledPushLeft = baseCSS+ 'px';

			$(originalOne).removeClass('bookmark tripled first').removeAttr('style').css('display', 'list-item');

			var mainColGrabber = $(originalOne).attr('data-col');
			var afterColGrabber = parseInt(mainColGrabber) + 1;
			var beforeColGrabber = parseInt(mainColGrabber) - 1;
			var mainRowGrabber = $(originalOne).attr('data-row');
			var addedEditer = 'li.gs_w[data-col="'+afterColGrabber+'"][data-row="'+mainRowGrabber+'"]';
			var addedClassRemover = $(addedEditer).attr('class');
				addedClassRemover = addedClassRemover.replace(' tripled', '');
				addedClassRemover = addedClassRemover.replace(' second', '');
			
			$(addedEditer).removeAttr('style').css('display', 'list-item').attr('class', addedClassRemover);

			if ($(this).hasClass('tile')) {

				var beforeAdderID = 'li.gs_w[data-col="'+mainColGrabber+'"][data-row="'+mainRowGrabber+'"]'; 
					beforeAdderID = $(beforeAdderID).attr('id');
					beforeAdderID = beforeAdderID.replace('li', '');
					beforeAdderID = parseInt(beforeAdderID) - 1;
					beforeAdderID = 'li'+beforeAdderID;
				var beforeAdderSizeGrabber = 'li.gs_w[data-col="'+mainColGrabber+'"][data-row="'+mainRowGrabber+'"]';
				var beforeAdderSizeX = $(beforeAdderSizeGrabber).attr('data-sizex');
				var beforeAdderSizeY = $(beforeAdderSizeGrabber).attr('data-sizey');

				var widgetsTile = [
					['<li class="'+addedClassRemover+'" blockcontent="holder" id="'+beforeAdderID+'"></li>', beforeAdderSizeX, beforeAdderSizeY, beforeColGrabber, mainRowGrabber]
				];
				$.each(widgetsTile, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);
				});

				var cutter2xBack = $(clickThisID).attr('id');
					cutter2xBack = cutter2xBack.replace('li', '');
					cutter2xBack = parseInt(cutter2xBack) - 1;
					cutter2xBack = '#li' +cutter2xBack;

				$('.gridster ul').each(function () {
					$(this).find(cutter2xBack).insertBefore($(this).find(clickThisID));
				});

			}
			else {

				var beforeAdderID = 'li.gs_w[data-col="'+mainColGrabber+'"][data-row="'+mainRowGrabber+'"]'; 
					beforeAdderID = $(beforeAdderID).attr('id');
					beforeAdderID = beforeAdderID.replace('li', '');
					beforeAdderID = parseInt(beforeAdderID) - 1;
					beforeAdderID = 'li'+beforeAdderID;
				var beforeAdderSizeGrabber = 'li.gs_w[data-col="'+mainColGrabber+'"][data-row="'+mainRowGrabber+'"]';
				var beforeAdderSizeX = $(beforeAdderSizeGrabber).attr('data-sizex');
				var beforeAdderSizeY = $(beforeAdderSizeGrabber).attr('data-sizey');

				var widgetsDivider = [
					['<li class="'+addedClassRemover+'" id="'+beforeAdderID+'"></li>', beforeAdderSizeX, beforeAdderSizeY, beforeColGrabber, mainRowGrabber]
				];
				$.each(widgetsDivider, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);
				});

				var cutter2xBack = $(clickThisID).attr('id');
					cutter2xBack = cutter2xBack.replace('li', '');
					cutter2xBack = parseInt(cutter2xBack) - 1;
					cutter2xBack = '#li' +cutter2xBack;

				$('.gridster ul').each(function () {
					$(this).find(cutter2xBack).insertBefore($(this).find(clickThisID));
				});

			}
		}
		// Add single centered
		else {
			event.preventDefault();

			grid_canvas.remove_widget($(oneOver), true);
			grid_canvas.remove_widget($(oneBack), true);

			$(originalOne).addClass('tripled center').removeClass('bookmark');
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

		// Now that the modal window is hidden, we need to disable its event handler.
		isHandlerActive = false;

	});

	////// Safty Zones ////////////////////////////////////////////////////////////////////////

	saftyZones.on("mousedown", function(event) {
		return false;
	});

});

function center() {
	$('body').scrollTo( '50%', {axis: 'x'} );
};

// Center chart in window
$(document).ready(center); // When the page first loads
$(window).resize(center); // When the browser changes size

