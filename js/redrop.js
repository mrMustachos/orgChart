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

	// $("#nameBank").hide();

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
		avoid_overlapped_widgets: false,
		min_cols: 35,
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
			};
		}
	}).data('gridster');

	var resetIDs = function () {
		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});
	}

	////// Save Progress //////////////////////////////////////////////////////////////////////

	var saveGrid = function () {
		resetIDs();
		localforage.setItem('griddata', grid_canvas.serialize(), function(err, result) { 
			console.log(err);
			console.log(result);
			console.log(result.value);
		});
	}

	$('#seralize').on('click', function(e, i) {
		e.preventDefault();
		saveGrid();
	});

	////// Clear Back to Default //////////////////////////////////////////////////////////////

	var clearGrid = function () {
		localforage.clear();
		window.location.reload();
	}

	$('#def_button').on('click', function(e, i) {
		e.preventDefault();
		clearGrid();
	});

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
			json = grid_canvas.sort_by_row_and_col_asc(json);

			for(i=0; i<json.length; i++) {
				grid_canvas.sort_by_row_and_col_asc(json);
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" blockcontent="'+json[i]['blockContent']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i]['size_x'], json[i]['size_y'], json[i]['col'], json[i]['row']);
			}
			resetIDs();

		} else {

			var json = value;
			json = grid_canvas.sort_by_row_and_col_asc(json);

			for(i=0; i<json.length; i++) {
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" blockcontent="'+json[i]['blockContent']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i]['size_x'], json[i]['size_y'], json[i]['col'], json[i]['row']);
				json = grid_canvas.sort_by_row_and_col_asc(json);
			}
			resetIDs();
		
		}

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

	var saftyZones = $(".gridster, #nameBank").not('activeChart');
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

	////// Name That Block ////////////////////////////////////////////////////////////////////

	$("#add_name").click(function(event) {

		var nameTileGrabber = $('.gridster .gs_w.tile.box');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		nameTileGrabber.addClass('name_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-name').addClass('icon-working');
	
		isHandlerActive = true;

		event.preventDefault();

	});

	////// Put a Name On It ///////////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster .tile.gs_w.box', function(event) {

		if ($('.gridster .tile.gs_w.box').hasClass('name_unlocked')) {
			
			var chartID = $('.gridster');

			level2.show();
			$(this).addClass('name_holder');
			chartID.addClass('activeChart').removeClass('passiveChart');

			isHandlerActive = true;

			event.preventDefault();
		}

	});

	////// Step Out of Line ///////////////////////////////////////////////////////////////////

	// Bind a mouseUp event on the document so that we can close the modal window when it is open.
	$(document).on("mousedown", function() {

		// Check to see if this event handler is "active". If it is not, then exit.
		if (!isHandlerActive) {
			return;
		}

		var tileGrabber = $('.gridster .gs_w.tile');
		var dividerGrabber = $('.gridster .gs_w.divider');
		var nameTileGrabber = $('.gridster .gs_w.tile.box');
		// var nameBin = $('#nameBank');

		var activeID = $(this).find("button.active").attr('id');
			activeID = '#'+ activeID;
		var navActiveBTN = $(activeID);
		var navActiveBTNicon = $(activeID+' span');

		var chartID = $('.gridster');

		// remove edit tile
		if (activeID == '#edit_tile') {
			tileGrabber.removeClass('tile_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("tiles locked.");

			// Now that the modal window is hidden, we need to disable its event handler.
			isHandlerActive = false;
		}

		// remove edit divider
		if (activeID == '#edit_divider') {
			dividerGrabber.removeClass('divider_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("dividers locked.");

			isHandlerActive = false;
		}

		// remove add name
		if (activeID == '#add_name') {
			nameTileGrabber.removeClass('name_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-name');
			navActiveBTN.removeClass('active');

			console.log("names locked.");

			isHandlerActive = false;
		}

		// remove name card
		if (level2.is(':visible')) {
			nameTileGrabber.removeClass('name_holder');
			level2.hide();
			chartID.addClass('passiveChart').removeClass('activeChart');

			console.log("name place locked.");

			isHandlerActive = true;
		}

		// navActiveBTN.removeClass('active');

		// Now that the modal window is hidden, we need to disable its event handler.
		// isHandlerActive = false;

	});

	////// Safty Zones ////////////////////////////////////////////////////////////////////////

	// var myFunction = function() {
	// 	var zoneGrapper = $('.gridster').attr('id');
	// 		zoneGrapper = '#'+ zoneGrapper;
	// 	console.log(zoneGrapper);

	// var mainException = $(".gridster");


	// 	if (zoneGrapper == '#zone2') {
			
	// 		level2.on("mousedown", function(event) {
	// 			console.log("zone 2");
	// 			event.stopPropagation();
	// 		});
	// 	} else {
	// 		mainException.on("mousedown", function(event) {
	// 			console.log("zone 1");
	// 			event.stopPropagation();
	// 		});
	// 	}

	// };
	// setInterval(myFunction, 1000);

	// mainException.on("mousedown", function(event) {
	// 	console.log("zone 1");
	// 	event.stopPropagation();
	// });


	saftyZones.on("mousedown", function(event) {
		event.stopPropagation();
	});

});

function center() {
	$('body').scrollTo( '50%', {axis: 'x'} );
};

// Center chart in window
$(document).ready(center); // When the page first loads
$(window).resize(center); // When the browser changes size

