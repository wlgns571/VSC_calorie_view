$(function(){
	gnb_sub();
});

function gnb_sub(){
	if ($('body').hasClass('main')){
		// 메인 gnb_sub
		var documentHeight= $(document).height();

		$('.gnb_sub>li').mouseover(function(){
			$('header .dimmed').css('height',(documentHeight-68)+'px')
			$('.gnb_sub-wrap').stop().animate({'height':'270px'},100);
			$('.gnb_sub>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
		});
		$('.gnb_sub-wrap').mouseleave(function(){
			$('.gnb_sub>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$('gnb_sub-wrap').stop().animate({'height':'55px'},100);
			$('header .dimmed').css('height','0px')
		});
	}else if ($('.contents').hasClass('training') || $('.contents').hasClass('calorieDc') || $('.contents').hasClass('community') || $('.contents').hasClass('column') || $('.contents').hasClass('challenge')){
		$('.gnb_sub li a.active+ul').show();

		$('.gnb_sub>li').hover(function(){
			if ($(this).find('>a').hasClass('active')){
			}else{
				$('.gnb_sub>li>a.active').css('background-image','none')
				$('.gnb_sub>li').each(function(){
					$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
				});
				$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
			}
			$('.gnb_sub li a.active+ul').hide();
			$('.gnb_sub li').removeClass('current')
			$(this).addClass('current')
			$(this).find('>ul').show()
			$('.contents .path').hide();
		},function(){
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_on.','_off.'));

			$('.gnb_sub>li>a.active').css('background-image','url(../img/common/bg_gnb_on.gif)');
			if($('.gnb_sub>li>a.active').find('img').length > 0) {
				$('.gnb_sub>li>a.active').find('img').attr('src', $('.gnb_sub>li>a.active').find('img').attr('src').replace('_off.', '_on.'));
			}
			$('.gnb_sub li').removeClass('current ')
			$(this).find('>ul').hide()
			$('.gnb_sub li a.active+ul').show();
			$('.contents .path').show();
		});
	}else{
		$('.gnb_sub>li').hover(function(){
			$('.gnb_sub>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
			$('.gnb_sub li').removeClass('current')
			$(this).addClass('current')
			$(this).find('>ul').show();
			$('.contents .path').hide();
		},function(){
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_on.','_off.'));
			$('.gnb_sub li').removeClass('current ')
			$(this).find('>ul').hide()
			$('.gnb_sub li a.active+ul').show();
			$('.contents .path').show();
		});
	}
}