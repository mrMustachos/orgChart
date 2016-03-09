$(window).ready(function() {

	var localData = JSON.parse(localStorage.getItem('positions'));

	if (localData != null) {
		$.each(localData, function(i, value) {



		var json = [
            { "id":"li1","class":"gs_w doubled","htmlContent":"<div class=\'spannerBlock gs_w box\' blockcontent=\'holder\'><div class=\'presenter\'><span class=\'remover icon-remove based\' style=\'display: none;\'></span></div></div>","blockContent":"holder","col":"1","row":"17","size_x":"2","size_y":"5" },
            { "id":"li2","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"2","row":"17","size_x":"1","size_y":"5" },
            { "id":"li3","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"17","size_x":"1","size_y":"5" },
            { "id":"li4","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"17","size_x":"1","size_y":"5" },
            { "id":"li5","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"17","size_x":"1","size_y":"5" },
            { "id":"li6","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"17","size_x":"1","size_y":"5" },
            { "id":"li7","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"17","size_x":"1","size_y":"5" },
            { "id":"li8","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"17","size_x":"1","size_y":"5" },
            { "id":"li9","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"17","size_x":"1","size_y":"5" },
            { "id":"li10","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"17","size_x":"1","size_y":"5" },
            { "id":"li11","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"17","size_x":"1","size_y":"5" },
            { "id":"li12","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"17","size_x":"1","size_y":"5" },
            { "id":"li13","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"17","size_x":"1","size_y":"5" },
            { "id":"li14","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"17","size_x":"1","size_y":"5" },
            { "id":"li15","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"17","size_x":"1","size_y":"5" },
            { "id":"li16","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"17","size_x":"1","size_y":"5" },
            { "id":"li17","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"17","size_x":"1","size_y":"5" },
            { "id":"li18","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"17","size_x":"1","size_y":"5" },
            { "id":"li19","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"17","size_x":"1","size_y":"5" },
            { "id":"li20","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"17","size_x":"1","size_y":"5" },
            { "id":"li21","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"17","size_x":"1","size_y":"5" },
            { "id":"li22","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"17","size_x":"1","size_y":"5" },
            { "id":"li23","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"17","size_x":"1","size_y":"5" },
            { "id":"li24","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"17","size_x":"1","size_y":"5" },
            { "id":"li25","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"17","size_x":"1","size_y":"5" },
            { "id":"li26","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"17","size_x":"1","size_y":"5" },
            { "id":"li27","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"17","size_x":"1","size_y":"5" },
            { "id":"li28","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"17","size_x":"1","size_y":"5" },
            { "id":"li29","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"17","size_x":"1","size_y":"5" },
            { "id":"li30","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"17","size_x":"1","size_y":"5" },
            { "id":"li31","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"17","size_x":"1","size_y":"5" },
            { "id":"li32","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"17","size_x":"1","size_y":"5" },
            { "id":"li33","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"17","size_x":"1","size_y":"5" },
            { "id":"li34","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"17","size_x":"1","size_y":"5" },
            { "id":"li35","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"17","size_x":"1","size_y":"5" },
            { "id":"li36","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"12","size_x":"1","size_y":"5" },
            { "id":"li37","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"12","size_x":"1","size_y":"5" },
            { "id":"li38","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"12","size_x":"1","size_y":"5" },
            { "id":"li39","class":"gs_w blocking","htmlContent":"","blockContent":"holder","col":"4","row":"12","size_x":"1","size_y":"5" },
            { "id":"li40","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"12","size_x":"1","size_y":"5" },
            { "id":"li41","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"12","size_x":"1","size_y":"5" },
            { "id":"li42","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"12","size_x":"1","size_y":"5" },
            { "id":"li43","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"12","size_x":"1","size_y":"5" },
            { "id":"li44","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"12","size_x":"1","size_y":"5" },
            { "id":"li45","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"12","size_x":"1","size_y":"5" },
            { "id":"li46","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"12","size_x":"1","size_y":"5" },
            { "id":"li47","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"12","size_x":"1","size_y":"5" },
            { "id":"li48","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"12","size_x":"1","size_y":"5" },
            { "id":"li49","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"12","size_x":"1","size_y":"5" },
            { "id":"li50","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"12","size_x":"1","size_y":"5" },
            { "id":"li51","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"12","size_x":"1","size_y":"5" },
            { "id":"li52","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"12","size_x":"1","size_y":"5" },
            { "id":"li53","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"12","size_x":"1","size_y":"5" },
            { "id":"li54","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"12","size_x":"1","size_y":"5" },
            { "id":"li55","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"12","size_x":"1","size_y":"5" },
            { "id":"li56","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"12","size_x":"1","size_y":"5" },
            { "id":"li57","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"12","size_x":"1","size_y":"5" },
            { "id":"li58","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"12","size_x":"1","size_y":"5" },
            { "id":"li59","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"12","size_x":"1","size_y":"5" },
            { "id":"li60","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"12","size_x":"1","size_y":"5" },
            { "id":"li61","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"12","size_x":"1","size_y":"5" },
            { "id":"li62","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"12","size_x":"1","size_y":"5" },
            { "id":"li63","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"12","size_x":"1","size_y":"5" },
            { "id":"li64","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"12","size_x":"1","size_y":"5" },
            { "id":"li65","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"12","size_x":"1","size_y":"5" },
            { "id":"li66","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"12","size_x":"1","size_y":"5" },
            { "id":"li67","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"12","size_x":"1","size_y":"5" },
            { "id":"li68","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"12","size_x":"1","size_y":"5" },
            { "id":"li69","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"12","size_x":"1","size_y":"5" },
            { "id":"li70","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"12","size_x":"1","size_y":"5" },
            { "id":"li71","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"7","size_x":"1","size_y":"5" },
            { "id":"li72","class":"gs_w doubled","htmlContent":"<div class=\'spannerBlock gs_w box\' blockcontent=\'holder\'><div class=\'presenter\'><span class=\'remover icon-remove based\' style=\'display: none;\'></span></div></div>","blockContent":"holder","col":"2","row":"7","size_x":"2","size_y":"5" },
            { "id":"li73","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"3","row":"7","size_x":"1","size_y":"5" },
            { "id":"li74","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"7","size_x":"1","size_y":"5" },
            { "id":"li75","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"7","size_x":"1","size_y":"5" },
            { "id":"li76","class":"gs_w tripled more","htmlContent":"<div class=\'spannerBlock gs_w box first\' blockcontent=\'holder\'><div class=\'presenter\'><span class=\'remover icon-remove based\' style=\'display: none;\'></span></div></div>","blockContent":"holder","col":"6","row":"7","size_x":"3","size_y":"5" },
            { "id":"li77","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"7","row":"7","size_x":"1","size_y":"5" },
            { "id":"li78","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"8","row":"7","size_x":"1","size_y":"5" },
            { "id":"li79","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"7","size_x":"1","size_y":"5" },
            { "id":"li80","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"7","size_x":"1","size_y":"5" },
            { "id":"li81","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"7","size_x":"1","size_y":"5" },
            { "id":"li82","class":"gs_w tripled blocking","htmlContent":"<div class=\'spannerBlock gs_w box first\' blockcontent=\'holder\'><div class=\'presenter\'><span class=\'remover icon-remove based\' style=\'display: none;\'></span></div></div><div class=\'spannerBlock gs_w box second\' blockcontent=\'holder\'><div class=\'presenter\'><span class=\'remover icon-remove based\' style=\'display: none;\'></span></div></div>","blockContent":"holder","col":"12","row":"7","size_x":"3","size_y":"5" },
            { "id":"li83","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"13","row":"7","size_x":"1","size_y":"5" },
            { "id":"li84","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"14","row":"7","size_x":"1","size_y":"5" },
            { "id":"li85","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"7","size_x":"1","size_y":"5" },
            { "id":"li86","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"7","size_x":"1","size_y":"5" },
            { "id":"li87","class":"gs_w tripled blocking","htmlContent":"<div class=\'spannerBlock gs_w box first\' blockcontent=\'holder\'><div class=\'presenter\'><span class=\'remover icon-remove based\' style=\'display: none;\'></span></div></div><div class=\'spannerBlock gs_w second thru\' blockcontent=\'holder\'></div>","blockContent":"holder","col":"17","row":"7","size_x":"3","size_y":"5" },
            { "id":"li88","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"18","row":"7","size_x":"1","size_y":"5" },
            { "id":"li89","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"19","row":"7","size_x":"1","size_y":"5" },
            { "id":"li90","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"7","size_x":"1","size_y":"5" },
            { "id":"li91","class":"gs_w doubled","htmlContent":"<div class=\'spannerBlock gs_w thru\' blockcontent=\'holder\'></div>","blockContent":"holder","col":"21","row":"7","size_x":"2","size_y":"5" },
            { "id":"li92","class":"blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"22","row":"7","size_x":"1","size_y":"5" },
            { "id":"li93","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"7","size_x":"1","size_y":"5" },
            { "id":"li94","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"7","size_x":"1","size_y":"5" },
            { "id":"li95","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"7","size_x":"1","size_y":"5" },
            { "id":"li96","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"7","size_x":"1","size_y":"5" },
            { "id":"li97","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"7","size_x":"1","size_y":"5" },
            { "id":"li98","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"7","size_x":"1","size_y":"5" },
            { "id":"li99","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"7","size_x":"1","size_y":"5" },
            { "id":"li100","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"7","size_x":"1","size_y":"5" },
            { "id":"li101","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"7","size_x":"1","size_y":"5" },
            { "id":"li102","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"7","size_x":"1","size_y":"5" },
            { "id":"li103","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"7","size_x":"1","size_y":"5" },
            { "id":"li104","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"7","size_x":"1","size_y":"5" },
            { "id":"li105","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"7","size_x":"1","size_y":"5" },
            { "id":"li106","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"6","size_x":"1","size_y":"1" },
            { "id":"li107","class":"divider gs_w doubled full","htmlContent":"","blockContent":"holder","col":"2","row":"6","size_x":"2","size_y":"1" },
            { "id":"li108","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"3","row":"6","size_x":"1","size_y":"1" },
            { "id":"li109","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"6","size_x":"1","size_y":"1" },
            { "id":"li110","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"6","size_x":"1","size_y":"1" },
            { "id":"li111","class":"divider gs_w tripled more","htmlContent":"<div class=\'spannerBlock gs_w divider reachRight\'></div>","blockContent":"holder","col":"6","row":"6","size_x":"3","size_y":"1" },
            { "id":"li112","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"7","row":"6","size_x":"1","size_y":"1" },
            { "id":"li113","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"8","row":"6","size_x":"1","size_y":"1" },
            { "id":"li114","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"6","size_x":"1","size_y":"1" },
            { "id":"li115","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"6","size_x":"1","size_y":"1" },
            { "id":"li116","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"6","size_x":"1","size_y":"1" },
            { "id":"li117","class":"divider gs_w tripled","htmlContent":"<div class=\'spannerBlock gs_w divider full\'></div><div class=\'spannerBlock gs_w divider full\'></div>","blockContent":"holder","col":"12","row":"6","size_x":"3","size_y":"1" },
            { "id":"li118","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"13","row":"6","size_x":"1","size_y":"1" },
            { "id":"li119","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"14","row":"6","size_x":"1","size_y":"1" },
            { "id":"li120","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"6","size_x":"1","size_y":"1" },
            { "id":"li121","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"6","size_x":"1","size_y":"1" },
            { "id":"li122","class":"divider gs_w tripled","htmlContent":"<div class=\'spannerBlock gs_w divider reachRight\'></div><div class=\'spannerBlock gs_w divider reachLeft\'></div>","blockContent":"holder","col":"17","row":"6","size_x":"3","size_y":"1" },
            { "id":"li123","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"18","row":"6","size_x":"1","size_y":"1" },
            { "id":"li124","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"19","row":"6","size_x":"1","size_y":"1" },
            { "id":"li125","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"6","size_x":"1","size_y":"1" },
            { "id":"li126","class":"divider gs_w doubled thru","htmlContent":"","blockContent":"holder","col":"21","row":"6","size_x":"2","size_y":"1" },
            { "id":"li127","class":"divider blocking gs_w trashed","htmlContent":"","blockContent":"holder","col":"22","row":"6","size_x":"1","size_y":"1" },
            { "id":"li128","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"6","size_x":"1","size_y":"1" },
            { "id":"li129","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"6","size_x":"1","size_y":"1" },
            { "id":"li130","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"6","size_x":"1","size_y":"1" },
            { "id":"li131","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"6","size_x":"1","size_y":"1" },
            { "id":"li132","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"6","size_x":"1","size_y":"1" },
            { "id":"li133","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"6","size_x":"1","size_y":"1" },
            { "id":"li134","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"6","size_x":"1","size_y":"1" },
            { "id":"li135","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"6","size_x":"1","size_y":"1" },
            { "id":"li136","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"6","size_x":"1","size_y":"1" },
            { "id":"li137","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"6","size_x":"1","size_y":"1" },
            { "id":"li138","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"6","size_x":"1","size_y":"1" },
            { "id":"li139","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"6","size_x":"1","size_y":"1" },
            { "id":"li140","class":"divider blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"6","size_x":"1","size_y":"1" },
            { "id":"li141","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"1","row":"1","size_x":"1","size_y":"5" },
            { "id":"li142","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"2","row":"1","size_x":"1","size_y":"5" },
            { "id":"li143","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"3","row":"1","size_x":"1","size_y":"5" },
            { "id":"li144","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"4","row":"1","size_x":"1","size_y":"5" },
            { "id":"li145","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"5","row":"1","size_x":"1","size_y":"5" },
            { "id":"li146","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"6","row":"1","size_x":"1","size_y":"5" },
            { "id":"li147","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"7","row":"1","size_x":"1","size_y":"5" },
            { "id":"li148","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"8","row":"1","size_x":"1","size_y":"5" },
            { "id":"li149","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"9","row":"1","size_x":"1","size_y":"5" },
            { "id":"li150","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"10","row":"1","size_x":"1","size_y":"5" },
            { "id":"li151","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"11","row":"1","size_x":"1","size_y":"5" },
            { "id":"li152","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"12","row":"1","size_x":"1","size_y":"5" },
            { "id":"li153","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"13","row":"1","size_x":"1","size_y":"5" },
            { "id":"li154","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"14","row":"1","size_x":"1","size_y":"5" },
            { "id":"li155","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"15","row":"1","size_x":"1","size_y":"5" },
            { "id":"li156","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"16","row":"1","size_x":"1","size_y":"5" },
            { "id":"li157","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"17","row":"1","size_x":"1","size_y":"5" },
            { "id":"li158","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"18","row":"1","size_x":"1","size_y":"5" },
            { "id":"li159","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"19","row":"1","size_x":"1","size_y":"5" },
            { "id":"li160","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"20","row":"1","size_x":"1","size_y":"5" },
            { "id":"li161","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"21","row":"1","size_x":"1","size_y":"5" },
            { "id":"li162","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"22","row":"1","size_x":"1","size_y":"5" },
            { "id":"li163","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"23","row":"1","size_x":"1","size_y":"5" },
            { "id":"li164","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"24","row":"1","size_x":"1","size_y":"5" },
            { "id":"li165","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"25","row":"1","size_x":"1","size_y":"5" },
            { "id":"li166","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"26","row":"1","size_x":"1","size_y":"5" },
            { "id":"li167","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"27","row":"1","size_x":"1","size_y":"5" },
            { "id":"li168","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"28","row":"1","size_x":"1","size_y":"5" },
            { "id":"li169","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"29","row":"1","size_x":"1","size_y":"5" },
            { "id":"li170","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"30","row":"1","size_x":"1","size_y":"5" },
            { "id":"li171","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"31","row":"1","size_x":"1","size_y":"5" },
            { "id":"li172","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"32","row":"1","size_x":"1","size_y":"5" },
            { "id":"li173","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"33","row":"1","size_x":"1","size_y":"5" },
            { "id":"li174","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"34","row":"1","size_x":"1","size_y":"5" },
            { "id":"li175","class":"blocking gs_w","htmlContent":"","blockContent":"holder","col":"35","row":"1","size_x":"1","size_y":"5" }
        ];

        // json = grid_canvas.sort_by_row_and_col_asc(json);



		// 	var id_name;
		// 	id_name = "#";
		// 	id_name = id_name + value.id;

		// 	// console.log(id_name);

		// 	$(id_name).attr({
		// 		"data-col": value.col,
		// 		"data-row": value.row,
		// 		"data-sizex": value.size_x,
		// 		"data-sizey": value.size_y,
		// 		"class": value.class,
		// 		"htmlContent": value.htmlContent,
		// 		"blockContent": value.blockContent
		// 	});


		});
	} else {
		console.log('No data returned by the server');
	}

	var grid_canvas = $(".gridster > ul").gridster({
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
		},

		draggable: {
			stop: function(event, ui) {
				var positions = JSON.stringify(grid_canvas.serialize());
				localStorage.setItem('positions', positions);
				$.post("processTest.php", {
					"positions": positions
				}, function(data) {
					console.log(data);
					if (data == 200) console.log("Data successfully sent to the server");
					else console.log
				});
			}
		}
	}).data('gridster');

	for(i=0; i<json.length; i++) {
		grid_canvas.add_widget('<li id="'+json[i]['id']+'" blockcontent="'+json[i]['blockContent']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i]['size_x'], json[i]['size_y'], json[i]['col'], json[i]['row']);
	}

});
