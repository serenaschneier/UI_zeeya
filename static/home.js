

$(document).ready(function(){
	//make buyer and seller images clickable
	$("#submit-buyer").click(function(){
		//alert("user is a buyer, bring us to a new page");
		window.location.assign("/buyerform");
	})

	$("#submit-seller").click(function(){
		//alert("user is a seller, bring us to a new page");
		window.location.assign("/sellerform");
	})
	//hover over buyer + seller images triggers background color change to signify click functionality
	// addHover("#buyer");
	// addHover("#seller");

	//return to home page
	$(".jumbotron").click(function(event){
		window.location.assign("/");
	});

});

// function addHover(id){
// 	var colorOrig=$(id).css('background');
//     $(id).hover(
//     function() {
//         //mouse over
//         $(this).css('background', '#8BC3A3')
//     }, function() {
//         //mouse out
//         $(this).css('background', colorOrig)
//     });
// }
