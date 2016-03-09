$(window).ready(function() {

	$('.chart').scrollTo(0);
	$.scrollTo(0);

	// $(".gridster li").removeAttr('id');
	// $(".gridster li .spannerBlock.blocking").remove();
	// $(".gridster li[blockcontent=holder, .gridster li .spannerBlock[blockcontent=holder").removeAttr('blockcontent');
	// $(".gridster li:empty:not(.divider .doubled .tripled .thru .connector), .gridster li .spannerBlock:not(.thru)").append('<h2 class="name">Holder Name</h2><p class="title">Holder Title</p>');


	// $('li.trashed, .remover.icon-remove, li.blocking').remove();
	// $('.presenter').remove();
	// $(".gridster li:not(.doubled)").removeAttr('id').removeClass('name_placed connectionBlocking stepped');
	// $(".gridster li div:not(.spannerBlock)").empty();
	// $('.spannerBlock').removeClass('name_placed');
	// $(".gridster li").removeAttr('style');

	// $('#deployr').on('click', function(e, i) {
	// 	e.preventDefault();

	// 	$('li.trashed').remove();
	// 	$('li.blocking').remove();
	// 	$('.gridster li').removeAttr('htmlcontent');
	// 	$(".gridster li").removeAttr('id');

	// });





function center() {
	$('.demo').scrollTo( '50%', {axis: 'x'} );
};
$(document).ready(center); // When the page first loads
$(window).resize(center); // When the browser changes size */


});


// <div>
//   The values stored were
//   <span></span>
//   and
//   <span></span>
// </div>
 
// <script>
// var daBox = $('.gridster li[blockcontent=Matt_Jones]');

// $(daBox).data( 'test', { first: 16, last: 'pizza!' } );
// $( "span:first" ).text( $(daBox).data( "test" ).first );
// $( "span:last" ).text( $(daBox).data( "test" ).last );
// </script>