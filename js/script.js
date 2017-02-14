// Resize function
onResize = function (){
	// Draw lines
	lineAttach();

	// Set 'item-container' height
	if ($(window).width() <= 768) {
		var item_heights =[];
		$('.item').each(function() {
			item_heights.push($(this).outerHeight());
		});

		// Get the larget heigth
		var max_value = Math.max.apply(this,item_heights);

		$('.item-container').height(max_value);

	} else {
		$('.item-container').height('auto');
		
	}

}

// Line attachment function
lineAttach = function(target){
	
	//V2.0 FROM MAIN IMAGE
	// Main image
	var main = $('.main-image').offset();
	var main_x = main.left;
	var main_y = main.top;
	// Bumper
	var bumper_origin = $('.line--bumper').offset();
	var bumper_origin_x = bumper_origin.left;
	var bumper_origin_y = bumper_origin.top;

	var bumper_att_y = main_y + $('.main-image').outerHeight()*.75 - bumper_origin_y;
	
	var bumper_origin_x = $('.item--bumper').outerWidth()*.5;

	$('.line--bumper').find('polyline').attr('points', bumper_origin_x + ',0 ' +
		bumper_origin_x + ',' + bumper_att_y + ' ' + $('.main-image').width() + ',' + bumper_att_y
	);
	$('.line--bumper').height(bumper_att_y + 2);

	// Mirror
	let mirror_offset = 30;
	var mirror_origin = $('.line--mirror').offset();
	var mirror_origin_x = mirror_origin.left;
	var mirror_origin_y = mirror_origin.top;
	var mirror_pt = [
		[$('.line--mirror').outerWidth()*.5,0],
		[Math.abs(main_x - mirror_origin_x)+$('.line--mirror').outerWidth()*.5,0],
		[0,0]
	];

	$('.line--mirror').find('polyline').attr('points', 
		mirror_pt[0][0] + ',' + mirror_pt[0][1] + ' ' +
		mirror_pt[0][0] + ',' + mirror_offset + ' ' +
		mirror_pt[1][0]	+ ',' + mirror_offset + ' ' +
		mirror_pt[1][0]	+ ',' + (main_y - mirror_origin_y)
	);
	$('.line--mirror').height($('.main-image').outerHeight());

	// Wheel
	var wheel_origin = $('.line--wheel').offset();
	var wheel_origin_x = wheel_origin.left;
	var wheel_origin_y = wheel_origin.top;

	var wheel_att_y = main_y + $('.main-image').outerHeight()*.65 - wheel_origin_y;
	
	var wheel_origin_x = $('.item--wheel').outerWidth()*.5;

	$('.line--wheel').find('polyline').attr('points', 
		wheel_origin_x + ',0 ' +
		wheel_origin_x + ',' + wheel_att_y + ' ' +
		'0,' + wheel_att_y
	);
	$('.line--wheel').height(wheel_att_y + 2);

}

$(document).ready(function (){
	
	// Main image hover
	$('.main-image a').hover(function (){
		var target = '.item--' + $(this).data('target');
		var bgr = '#main-'+ $(this).data('target');
		$(target).addClass('show');
		$(bgr).addClass('show')
	}, function (){
		$('.item').removeClass('show');
		$('.main-image__state').removeClass('show');
	});

	// Main image click
	$('.main-image a').click(function() {
		$('.item').removeClass('lock'); // reset all 
		$('.main-image__state').removeClass('lock'); // reset all
		var target = '.item--' + $(this).data('target');
		var bgr = '#main-'+ $(this).data('target');
		$(target).addClass('lock');
		$(bgr).addClass('lock')		
	});

	// Resize function
	onResize();

});

$(window).resize(function() {
	// Resize function
	onResize();
});



