// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

////// box state switcher /////////////////////////////////////////////////////////////////

// switch from blocking to box for the chart boxes
$(document).on('click', '.gridster .box_unlocked.blocking.gs_w:not(.divider)', function(){
	$(this).addClass('box').append('<div class="presenter"><span class="remover icon-remove based"></span></div>');
	$(this).removeClass('blocking');
	$('#add_nope, #add_name').prop("disabled", false);
});

// switch from box to thru for the chart boxes
$(document).on('click', '.gridster .box_unlocked.box.gs_w:not(.divider)', function(){
	$(this).addClass('thru');
	$(this).removeClass('box').empty();
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .box_unlocked.thru.gs_w:not(.divider)', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});


////// 2x spanner switching for boxes /////////////////////////////////////////////////////

// switch from box to thru for 2x spanner boxes
$(document).on('click', '.gridster .box_unlocked.doubled.gs_w:not(.divider) .box', function(){
	$(this).addClass('thru');
	$(this).removeClass('box');
});

// switch from thru to box for 2x spanner boxe
$(document).on('click', '.gridster .box_unlocked.doubled.gs_w:not(.divider) .thru', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});
// switch from thru to box for 2x spanner boxe
$(document).on('click', '.gridster .box_unlocked.doubled.gs_w:not(.divider) .blocking', function(){
	$(this).addClass('box');
	$(this).removeClass('blocking');
});


////// divider state switcher /////////////////////////////////////////////////////////////

// switch from blocking to reachLeft for the chart boxes
$(document).on('click', '.gridster .div_unlocked.blocking.divider.gs_w', function(){
	$(this).addClass('reachLeft');
	$(this).removeClass('blocking');
});

// switch from reachLeft to reachRight for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachLeft.divider.gs_w', function(){
	$(this).addClass('reachRight');
	$(this).removeClass('reachLeft');
});

// switch from reachRight to full for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachRight.divider.gs_w', function(){
	$(this).addClass('full');
	$(this).removeClass('reachRight');
});

// switch from full to thru for the chart boxes
$(document).on('click', '.gridster .div_unlocked.full.divider.gs_w', function(){
	$(this).addClass('thru');
	$(this).removeClass('full');
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .div_unlocked.thru.divider.gs_w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});


////// Nope Action ////////////////////////////////////////////////////////////////////////

// add a .nope to end the colomn
$(document).on('click', '.gridster .noping.gs_w', function(){
	$(this).toggleClass('nope');
});


////// 2x Spanner Action //////////////////////////////////////////////////////////////////

// double span for blocking (adds in new box)
$(document).on('click', '.gridster .spanner2_create.gs_w:not(.divider)', function(event){
	if ($(this).attr('id')){
		var x2blockID = $(this).attr('id');
		var x2theBlock = ('li#' + x2blockID + '');

		$(x2theBlock).addClass('doubled');
		$(x2theBlock).removeClass('blocking');
		$(x2theBlock).attr('data-sizex','2');
		$(x2theBlock).next().addClass('trashed');
		$(x2theBlock).append('<div class="spannerBlock gs_w box" blockcontent="holder"><div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div></div>');
	}
});

// remove 2x Spanner (block)
$(document).on('click', '.gridster .spanner2_create.doubled.gs_w:not(.divider)', function(event){
	if ($(this).attr('id')){
		var x2blockID2 = $(this).attr('id');
		var x2theBlock2 = ('li#' + x2blockID2 + '');

		$(x2theBlock2).empty();
		$(x2theBlock2).addClass('blocking');
		$(x2theBlock2).removeClass('doubled');
		$(x2theBlock2).attr('data-sizex','1');
		$(x2theBlock2).next().removeClass('trashed');
	}
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.gs_w', function(event){
	if ($(this).attr('id')){
		var x2dividerID = $(this).attr('id');
		var x2thedivider = ('li#' + x2dividerID + '');

		$(x2thedivider).addClass('blocking');
		$(x2thedivider).removeClass('doubled thru reachRight reachLeft full');
		$(x2thedivider).attr('data-sizex','1');
		$(x2thedivider).next().removeClass('trashed');
	}
});

// double span for divider (no box added)
$(document).on('click', '.gridster .spanner2_create.divider.blocking.gs_w', function(event){
	if ($(this).attr('id')){
		var x2dividerID2 = $(this).attr('id');
		var x2thedivider2 = ('li#' + x2dividerID2 + '');

		$(x2thedivider2).addClass('doubled thru');
		$(x2thedivider2).removeClass('blocking');
		$(x2thedivider2).attr('data-sizex','2');
		$(x2thedivider2).next().addClass('trashed');
	}
});


////// 3x Spanner Action //////////////////////////////////////////////////////////////////

// tripled span for blocking (adds 1 new box)
$(document).on('click', '.gridster .spanner3_create.blocking.gs_w:not(.divider)', function(event){
	if ($(this).attr('id')){
		var x3blockID = $(this).attr('id');
		var x3theBlock = ('li#' + x3blockID + '');

		$(x3theBlock).addClass('tripled more');
		$(x3theBlock).removeClass('blocking');
		$(x3theBlock).attr('data-sizex','3');
		$(x3theBlock).next().addClass('trashed');
		$(x3theBlock).next().next().addClass('trashed');
		$(x3theBlock).append('<div class="spannerBlock spanner3_create gs_w box" blockcontent="holder"><div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div></div>');
	}
});

// tripled span for blocking (adds a 2nd box)
$(document).on('click', '.gridster .spanner3_create.tripled.more.gs_w:not(.divider)', function(event){
	if ($(this).attr('id')){
		var x3blockID2 = $(this).attr('id');
		var x3theBlock2 = ('li#' + x3blockID2 + '');

		$(x3theBlock2).addClass('blocking');
		$(x3theBlock2).append('<div class="spannerBlock spanner3_create gs_w box" blockcontent="holder"><div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div></div>');
		$(x3theBlock2).removeClass('more');
	}
});

// remove 3x Spanner (block)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs_w:not(.divider)', function(event){
	if ($(this).attr('id')){
		var x3blockID3 = $(this).attr('id');
		var x3theBlock3 = ('li#' + x3blockID3 + '');

		$(x3theBlock3).empty();
		$(x3theBlock3).addClass('blocking');
		$(x3theBlock3).removeClass('tripled more');
		$(x3theBlock3).attr('data-sizex','1');
		$(x3theBlock3).next().removeClass('trashed');
		$(x3theBlock3).next().next().removeClass('trashed');
	}
});

// tripled span for divider (adds 1 new box)
$(document).on('click', '.gridster .spanner3_create.blocking.gs_w.divider', function(event){
	if ($(this).attr('id')){
		var x3dividerID = $(this).attr('id');
		var x3thedivider = ('li#' + x3dividerID + '');

		$(x3thedivider).addClass('tripled more');
		$(x3thedivider).removeClass('blocking');
		$(x3thedivider).attr('data-sizex','3');
		$(x3thedivider).next().addClass('trashed');
		$(x3thedivider).next().next().addClass('trashed');
		$(x3thedivider).append('<div class="spannerBlock gs_w blocking divider"></div>');
	}
});

// tripled span for divider (adds a 2nd box)
$(document).on('click', '.gridster .spanner3_create.tripled.more.gs_w.divider', function(event){
	if ($(this).attr('id')){
		var x3dividerID2 = $(this).attr('id');
		var x3thedivider2 = ('li#' + x3dividerID2 + '');

		$(x3thedivider2).append('<div class="spannerBlock gs_w blocking divider"></div>');
		$(x3thedivider2).removeClass('more');
	}
});

// remove 3x Spanner (divider)
$(document).on('click', '.gridster .spanner3_create.tripled:not(.more).gs_w.divider', function(event){
	if ($(this).attr('id')){
		var x3dividerID3 = $(this).attr('id');
		var x3thedivider3 = ('li#' + x3dividerID3 + '');

		$(x3thedivider3).empty();
		$(x3thedivider3).addClass('blocking');
		$(x3thedivider3).removeClass('tripled more');
		$(x3thedivider3).attr('data-sizex','1');
		$(x3thedivider3).next().removeClass('trashed');
		$(x3thedivider3).next().next().removeClass('trashed');
	}
});

////// 3x spanner switching for boxes /////////////////////////////////////////////////////

// switch from blocking to reachLeft for the chart boxes
$(document).on('click', '.gridster .div_unlocked.blocking.divider.gs_w', function(){
	$(this).addClass('reachLeft');
	$(this).removeClass('blocking');
});

// switch from reachLeft to reachRight for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachLeft.divider.gs_w', function(){
	$(this).addClass('reachRight');
	$(this).removeClass('reachLeft');
});

// switch from reachRight to full for the chart boxes
$(document).on('click', '.gridster .div_unlocked.reachRight.divider.gs_w', function(){
	$(this).addClass('full');
	$(this).removeClass('reachRight');
});

// switch from full to thru for the chart boxes
$(document).on('click', '.gridster .div_unlocked.full.divider.gs_w', function(){
	$(this).addClass('thru');
	$(this).removeClass('full');
});

// switch from thru to blocking for the chart boxes
$(document).on('click', '.gridster .div_unlocked.thru.divider.gs_w', function(){
	$(this).addClass('blocking');
	$(this).removeClass('thru');
});

////// Let's Play The Name Game ///////////////////////////////////////////////////////////

// selecting the box
$(document).on('click', '.gridster .gs_w.box.nameDROP', function(){
	var colShield = $(this).attr('data-col');
	var rowShield = $(this).attr('data-row');

	$('.gridster .gs_w.box').removeClass('name_holder');
	$(this).toggleClass('name_holder');
	$('.gs_w.box.name_placed.nameDROP').removeClass('name_holder');
	$('#nameBank').removeClass('hide');
	$('.shield').hide();

});

// stopping duplicate names when alread placed
$(document).on('click', '.gridster .gs_w.box.name_placed.nameDROP', function(){
	$('#nameBank').addClass('hide');
	$('.shield').show();

});

// Add in name
$(document).on('click', 'input[type=\'radio\'].radioBtnClass', function(){
	var lablr = $(this).attr('value');
	var named = $(this).attr('name');

	$('.gridster .gs_w.box.nameDROP.name_holder .presenter').append(named);
	$('.gridster .gs_w.box.nameDROP.name_holder .presenter .remover').removeClass('based').attr('blockcontent', lablr);
	$('.gridster .gs_w.box.nameDROP.name_holder').addClass('name_placed').attr('blockcontent', lablr).removeClass('name_holder nameDROP');

	if( $('.gridster .gs_w.box.nameDROP.name_holder') ) {

		$(this).attr("disabled", true);
		$(this).parent().addClass('used');
	}
	if( $('.gridster .gs_w.box.nameDROP') ) {
		$('.shield').show();
	}

});

// remove name
$(document).on('click', '.gs_w.box.name_placed .presenter .remover', function(event){
	
	if ($(this).parent().parent().attr('blockcontent')){

		var findval = $(this).parent().parent().attr('blockcontent');

		var theInput = ("input[value=" + findval + "].radioBtnClass");
		var theBlock = ("li[blockcontent=" + findval + "].gs_w.box.name_placed");
		var theSpanBlock = ("div[blockcontent=" + findval + "].gs_w.box.name_placed");

		var theListVal = $(theInput).parent().parent().parent().attr('id');
		var theList = $('#'+theListVal+'');

		console.log(theListVal);

		$(theList).attr('class', 'opposite');
		$(theInput).prop('checked', false).removeAttr('disabled');
		$(theInput).parent().removeClass('used');
		$(theBlock).empty().append('<div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div>');
		$(theSpanBlock).empty().append('<div class="presenter"><span class="remover icon-remove based" style="display: none;"></span></div>');
		$(theBlock).removeClass('name_placed').removeClass('name_holder').attr('blockcontent', 'holder').addClass('nameDROP');
		$(theSpanBlock).removeClass('name_placed').removeClass('name_holder').attr('blockcontent', 'holder').addClass('nameDROP');

	}

});


////// Connector Box switching ///////////////////////////////////////////////////////////

// add to blocking
$(document).on('click', '.blocking.connectionPoint.gs_w:not(.divider)', function(event){

	if ($(this).attr('id')){

		var connectorBlockingID = $(this).attr('id');
		var connectorBlocking = ('li#' + connectorBlockingID + '');

		console.log(connectorBlockingID);
		console.log(connectorBlocking);

		$(connectorBlocking).addClass('connector connectionBlocking');
		$(connectorBlocking).removeClass('blocking');
	}

});

// remove from blocking
$(document).on('click', '.connector.connectionBlocking.connectionPoint.gs_w:not(.divider)', function(event){

	if ($(this).attr('id')){

		var connectorBlockingRemoveID = $(this).attr('id');
		var connectorBlockingRemove = ('li#' + connectorBlockingRemoveID + '');

		console.log(connectorBlockingRemoveID);
		console.log(connectorBlockingRemove);

		$(connectorBlockingRemove).addClass('blocking');
		$(connectorBlockingRemove).removeClass('connector connectionBlocking');
	}

});


// add to top level thru (Right)
$(document).on('click', '.thru.connectionPoint.gs_w:not(.divider)', function(event){

	if ($(this).attr('id')){

		var connectorThruID = $(this).attr('id');
		var connectorThru = ('li#' + connectorThruID + '');

		$(connectorThru).addClass('connectorRight');
	}

});

// add to top level thru (Left)
$(document).on('click', '.connectorRight.thru.connectionPoint.gs_w:not(.divider)', function(event){

	if ($(this).attr('id')){

		var connectorThru2ID = $(this).attr('id');
		var connectorThru2 = ('li#' + connectorThru2ID + '');

		$(connectorThru2).addClass('connectorLeft');
		$(connectorThru2).removeClass('connectorRight');
	}

});

// remove to top level thru
$(document).on('click', '.connectorLeft.thru.connectionPoint.gs_w:not(.divider)', function(event){

	if ($(this).attr('id')){

		var connectorThruRemoveID = $(this).attr('id');
		var connectorThruRemove = ('li#' + connectorThruRemoveID + '');

		$(connectorThruRemove).removeClass('connectorLeft connectorRight');
	}

});


// add to 2nd level thru (right)
$(document).on('click', '.gridster .spannerBlock.spanner3_create.gs_w.thru.connectionPoint', function(event){

	if ($(this).parent().attr('id')){

		var connectorThruSpannerID = $(this).parent().attr('id');
		var connectorThruSpanner = ('li#' + connectorThruSpannerID + ' .spannerBlock.thru.connectionPoint');

		$(connectorThruSpanner).addClass('connectorRight');
	}

});

// add to 2nd level thru (left)
$(document).on('click', '.gridster .connectorRight.spannerBlock.spanner3_create.gs_w.thru.connectionPoint', function(event){

	if ($(this).parent().attr('id')){

		var connectorThruSpanner2ID = $(this).parent().attr('id');
		var connectorThruSpanner2 = ('li#' + connectorThruSpanner2ID + ' .spannerBlock.thru.connectionPoint');

		$(connectorThruSpanner2).addClass('connectorLeft');
		$(connectorThruSpanner2).removeClass('connectorRight');
	}

});

// Remove 2nd level thru
$(document).on('click', '.gridster .connectorLeft.spannerBlock.spanner3_create.gs_w.thru.connectionPoint', function(event){

	if ($(this).parent().attr('id')){

		var connectorThruSpannerRemoveID = $(this).parent().attr('id');
		var connectorThruSpannerRemove = ('li#' + connectorThruSpannerRemoveID + ' .spannerBlock.thru.connectionPoint');

		$(connectorThruSpannerRemove).removeClass('connectorRight connectorLeft');
	}

});


// Add 2nd level box (right)
$(document).on('click', '.gridster .spannerBlock.gs_w.box.connectionPoint', function(event){

	if ($(this).parent().attr('id')){

		var connectorBoxSpannerID = $(this).parent().attr('id');
		var connectorBoxSpanner = ('li#' + connectorBoxSpannerID + ' .spannerBlock.box.connectionPoint');

		$(connectorBoxSpanner).addClass('connectorRight');
	}

});

// Add 2nd level box (left)
$(document).on('click', '.gridster .connectorRight.spannerBlock.gs_w.box.connectionPoint', function(event){

	if ($(this).parent().attr('id')){

		var connectorBoxSpanner2ID = $(this).parent().attr('id');
		var connectorBoxSpanner2 = ('li#' + connectorBoxSpanner2ID + ' .spannerBlock.box.connectionPoint');

		$(connectorBoxSpanner2).addClass('connectorLeft');
		$(connectorBoxSpanner2).removeClass('connectorRight');
	}

});

// Remove 2nd level box
$(document).on('click', '.gridster .connectorLeft.spannerBlock.gs_w.box.connectionPoint', function(event){

	if ($(this).parent().attr('id')){

		var connectorBoxSpannerRemoveID = $(this).parent().attr('id');
		var connectorBoxSpannerRemove = ('li#' + connectorBoxSpannerRemoveID + ' .spannerBlock.box.connectionPoint');

		$(connectorBoxSpannerRemove).removeClass('connectorRight connectorLeft');
	}

});
