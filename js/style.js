function test(){
	setTimeout(test, 1);
}

$(document).ready(function(){
	test();
});


