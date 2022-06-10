$(function(){
	//top_gnb();
});

function top_gnb(){
	if ($('body').hasClass('main')){
		// 메인 top_gnb
		var documentHeight= $(document).height();

		$('.top_gnb>li').mouseover(function(){
			$('header .dimmed').css('height',(documentHeight-68)+'px')
			$('.top_gnb-wrap').stop().animate({'height':'270px'},100);
			$('.top_gnb>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
		});
		$('.top_gnb-wrap').mouseleave(function(){
			$('.top_gnb>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$('top_gnb-wrap').stop().animate({'height':'55px'},100);
			$('header .dimmed').css('height','0px')
		});
	}else if ($('.contents').hasClass('training') || $('.contents').hasClass('calorieDc') || $('.contents').hasClass('community') || $('.contents').hasClass('column') || $('.contents').hasClass('challenge')){
		$('.top_gnb li a.active+ul').show();

		$('.top_gnb>li').hover(function(){
			if ($(this).find('>a').hasClass('active')){
			}else{
				$('.top_gnb>li>a.active').css('background-image','none')
				$('.top_gnb>li').each(function(){
					$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
				});
				$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
			}
			$('.top_gnb li a.active+ul').hide();
			$('.top_gnb li').removeClass('current')
			$(this).addClass('current')
			$(this).find('>ul').show()
			$('.contents .path').hide();
		},function(){
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_on.','_off.'));

			$('.top_gnb>li>a.active').css('background-image','url(../img/common/top_gnb_on.gif)')
			$('.top_gnb>li>a.active').find('img').attr('src', $('.top_gnb>li>a.active').find('img').attr('src').replace('_off.', '_on.'));

			$('.top_gnb li').removeClass('current ')
			$(this).find('>ul').hide()
			$('.top_gnb li a.active+ul').show();
			$('.contents .path').show();
		});
	}else{
		$('.top_gnb>li').hover(function(){
			$('.top_gnb>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
			$('.top_gnb li').removeClass('current')
			$(this).addClass('current')
			$(this).find('>ul').show();
			$('.contents .path').hide();
		},function(){
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_on.','_off.'));
			$('.top_gnb li').removeClass('current ')
			$(this).find('>ul').hide()
			$('.top_gnb li a.active+ul').show();
			$('.contents .path').show();
		});
	}
}