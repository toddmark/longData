$(function (){
		// headerNav function 
		if($('.secondList')[0]){
			navInteract();
		};
		if($('.rollBanner')[0]){
			playRoll();
		}
		if($('.occupation').length){
			// control class 'fold' or not
			switchResume();
		}
		if($('.aboutMain .sideBar').length){
			scrollSideBar();
		}
});
function playRoll(){
	var arrImg = $('.rollBanner .wrap img');
	var arrBtn = $('.rollBanner .btnGroup a');
	$.tod.playRoll({wrapped: arrImg, btn: arrBtn, activeBtn: 'active'});
}


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
					$(arrOccuSpec[i]).stop().animate({top: -50}, playTime);
				}else{
					unfoldBox.addClass('fold');
					unfoldBox.stop().animate({height: 50}, playTime);
					unfoldTex.html('查看');
					unfoldBox.find('.occuSpec').stop().animate({top: -50}, playTime);
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
	var navList = $('.nav li:gt(0)');
	var secList = $('.secondList ul');
	// First list show
	navList.each(function (i){
		navList[i].index = i;
		secList[i].index = i;
		$(this).hover(function(e) {
			$(secList[this.index]).stop().slideDown('fast');
		}, function(e) {
			$(secList[this.index]).stop().slideUp('fast');
		});
	});
	// Second list show
	secList.each(function (i){
		$(this).hover(function (){
			$(secList[this.index]).stop().slideDown('fast');
		}, function (){
			$(secList[this.index]).stop().slideUp('fast');
		})
	})
}

//2014.03.20
jQuery.tod = {
	/*
	options: {
		time: int,
		TimeValue: str,
		title: str,
		titText: str,
		user: {
			obj: childBg,
			css: css
		}
		btnClose: jQuery obj
	}
	*/
	popMask: function(child, options) {
		if(!child){
			alert('弹出层获取失败！');
			return false;
		}
		var defaults = options;
		var mask = $('.pop-mask');
		if (mask[0]) {
			var display = mask.css('display');
			if (display == 'block') {
				return false;
			}
			cssStyle();
			popup();
		} else {
			mask = document.createElement('div');
			var body = $('body');
			mask = $(mask);
			mask.attr('class', 'pop-mask');
			cssStyle();
			popup();
			body.append(mask[0]);
		}

		$(window).resize(function() {
			cssStyle();
		})
		$(window).scroll(function() {
			cssStyle();
		});
		$(window).keydown(function(e) {
			switch(e.keyCode){
				case 27:
				closePop();
				break;
			}
		});
		//2014.03.30 add close click 
		if (defaults.btnClose) {
			// console.log('存在关闭按钮！');
			var btnClose = defaults.btnClose;
			btnClose.click(function() {
				closePop();
			});
		}
		// response keyboard event
		function popup() {
			child.css({
				'z-index': 10
			});
			mask.fadeIn(100, function() {
				handleDefaults();
				child.slideDown();
			});
		}

		function closePop() {
			child.slideUp(function() {
				mask.fadeOut('fast');
			});
		}

		function handleDefaults() {
			if (!defaults) {
				return false;
			};
			if (defaults.time) {
				var time = defaults.time;
				var eleVar = defaults.TimeValue;
				eleVar.html(time);
				var objTimer = setInterval(function() {
					time -= 1;
					eleVar.html(time);
					if (time == 0) {
						clearInterval(objTimer);
						closePop();
					}
				}, 1000)
			}
			if (defaults.title) {
				var obj = defaults.title;
				var text = defaults.titText;
				obj.html(text);
			}
			if (defaults.user) {
				defaults.user.obj.css({
					'background-position': defaults.user.css
				})
			}
		}

		function cssStyle() {
			var width = $(window).width();
			var height = $(document).height();
			var scrollTop = $(window).scrollTop();
			var childWidth = child.width();
			mask.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 9,
				'width': width,
				'height': height,
				'background': '#333',
				'opacity': 0.9
			});
			child.css({
				'left': (width - childWidth) / 2 + 'px',
				'top': 50 + scrollTop
			})
		}
	},
//2014.4.23
	playRoll: function (options){
		// all element
		var wrap = options.wrapped;
		//all btn
		var btn = options.btn;
		//active className of all btn
		var activeClass = options.activeBtn;
		// identify
		var index = 0;
		var timer = null;
		var timeInterval = 3000;
		reset();
		// click event
		btn.each(function (i){
			$(this).click(function (){
				if( index == i){
					return false;
				}
				index = i;
				// console.log(i);
				wrap.fadeOut();
				$(wrap[i]).fadeIn();
			})
		});
		// hover event
		btn.hover(function() {
			btn.removeClass(activeClass);
			clearInterval(timer);
		}, function() {
			play();
		});
		play();
		//  auto play
		function play(){
			timer = setInterval(function (){
				index ++;
				wrap.fadeOut();
				if(index == wrap.length){
					index = 0;
				}
				$(wrap[index]).fadeIn();
				btn.removeClass(activeClass);
				$(btn[index]).addClass(activeClass);
			}, timeInterval)
		};
		function reset(){
			wrap.hide();
			$(wrap[0]).show();
		}
	}
}
