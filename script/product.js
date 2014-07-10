$(function (){
		// headerNav function 
		if($('.secondList')[0]){
			navInteract();
		};
		if($('.occupation').length){
			// control class 'fold' or not
			switchResume();
		}
		if($('.aboutMain .sideBar').length){
			scrollSideBar();
		}
});

function scrollSideBar(){
	var objEle = $('.sideBar');
	var timePlay = 400;
	$(window).scroll(function (){
		var top = $(window).scrollTop();
		if(top > 400){
			var posY = top - 400;
			console.log(posY);
			objEle.stop().animate({
				'top': posY
			}, timePlay)
		}else{
			objEle.stop().animate({
				'top': 0
			}, timePlay)
		}
	})
}

function switchResume(){
	var arrBtn = $('.occupation .slideBtn');
	// get all of the 'li' 
	var arrFold = $('.occupation .fold');
	// class '.occuSpec' styles the unfold content
	var arrOccuSpec = $('.occuSpec');
	// '+20' apply to the bottom padding
	var heightBox = $('.occuSpec').height() + 20;
	var topBox = $('.occuSpec').css('top');
	var playTime = 400;
	var unfoldBox = {};
	var unfoldTex = {};
	arrBtn.each(function (i){
		arrBtn[i].index = i;
		arrFold[i].index = i;
		arrOccuSpec[i].index = i;
		$(this).click(function (){
			// observe if the first time to click 
			if(unfoldBox.length){
				// observe if the same button to click
				if($(this).html() == '关闭'){
					unfoldBox.addClass('fold');
					unfoldBox.stop().animate({height: 50}, playTime);
					unfoldTex.html('查看');
					$(arrOccuSpec[i]).stop().animate({top: -52}, playTime);
				}else{
					unfoldBox.addClass('fold');
					unfoldBox.stop().animate({height: 50}, playTime);
					unfoldTex.html('查看');
					unfoldBox.find('.occuSpec').stop().animate({top: -52}, playTime);
					$(arrBtn[i]).html('关闭');
					$(arrFold[i]).stop().animate({height: heightBox},playTime, function (){
						$(this).removeClass('fold');
						unfoldBox = $(this);
						unfoldTex = $(arrBtn[i]);
					});
					$(arrOccuSpec[i]).stop().animate({top: 0}, playTime);
				}
			}else{
				$(arrBtn[i]).html('关闭');
				$(arrFold[i]).stop().animate({height: heightBox},playTime, function (){
					$(this).removeClass('fold');
					unfoldBox = $(this);
					unfoldTex = $(arrBtn[i]);
				})
				$(arrOccuSpec[i]).stop().animate({top: 0}, playTime);
			}
		})
	})
}

function navInteract(){
	var navList = $('.nav li');
	var secList = $('.secondList ul');
	// First list show
	navList.each(function (i){
		navList[i].index = i;
		secList[i].index = i;
		$(this).hover(function(e) {
			$(secList[this.index]).stop().slideDown();
		}, function(e) {
			$(secList[this.index]).stop().slideUp();
		});
	});
	// Second list show
	secList.each(function (i){
		$(this).hover(function (){
			$(secList[this.index]).stop().slideDown();
		}, function (){
			$(secList[this.index]).stop().slideUp();
		})
	})
}