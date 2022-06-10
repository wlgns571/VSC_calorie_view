$(function(){
	gnb();
	imgOver(); // img change
	layer() // layer
	formPlaceholder() // form placeholder
	fileAttach() // 첨부파일 design
	commentWrite(); // 코멘트달기 open/close
	commentUpdate(); // 코멘트수정 open/close
});

function gnb(){
	if ($('body').hasClass('main')){
		// 메인 gnb
		var documentHeight= $(document).height();

		$('.gnb>li').mouseover(function(){
			$('header .dimmed').css('height',(documentHeight-68)+'px')
			$('.gnb-wrap').stop().animate({'height':'410px'},100);
			$('.gnb>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
		});
		$('.gnb-wrap').mouseleave(function(){
			$('.gnb>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$('.gnb-wrap').stop().animate({'height':'66px'},100);
			$('header .dimmed').css('height','0px')
		});
	}else if ($('.contents').hasClass('training') || $('.contents').hasClass('calorieDc') || $('.contents').hasClass('community') || $('.contents').hasClass('column') || $('.contents').hasClass('challenge')){
		$('.gnb li a.active+ul').show();

		$('.gnb>li').hover(function(){
			if ($(this).find('>a').hasClass('active')){
			}else{
				$('.gnb>li>a.active').css('background-image','none')
				$('.gnb>li').each(function(){
					$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
				});
				$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
			}
			$('.gnb li a.active+ul').hide();
			$('.gnb li').removeClass('current')
			$(this).addClass('current')
			$(this).find('>ul').show()
			$('.contents .path').hide();
		},function(){
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_on.','_off.'));

			$('.gnb>li>a.active').css('background-image','url(../img/common/bg_gnb_on.gif)')
			$('.gnb>li>a.active').find('img').attr('src', $('.gnb>li>a.active').find('img').attr('src').replace('_off.', '_on.'));

			$('.gnb li').removeClass('current ')
			$(this).find('>ul').hide()
			$('.gnb li a.active+ul').show();
			$('.contents .path').show();
		});
	}else{
		$('.gnb>li').hover(function(){
			$('.gnb>li').each(function(){
				$(this).find('>a>img').attr('src', $(this).find('>a>img').attr('src').replace('_on.','_off.'));
			});
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_off.','_on.'));
			$('.gnb li').removeClass('current')
			$(this).addClass('current')
			$(this).find('>ul').show();
			$('.contents .path').hide();
		},function(){
			$(this).find('a>img').attr('src',$(this).find('a>img').attr('src').replace('_on.','_off.'));
			$('.gnb li').removeClass('current ')
			$(this).find('>ul').hide()
			$('.gnb li a.active+ul').show();
			$('.contents .path').show();
		});
	}
}

function imgOver(){
	$('.sidemenu>li>a').addClass('imgOver');

	$('.imgOver').hover(function(){
		$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off.', '_on.'));
	},function(){
		if ($(this).hasClass('active'))
		{
		}else {
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on.', '_off.'));
		}
	});
}


function tab(tabNum) {
	$('.tabCont'+tabNum).css('visibility','hidden')
	$(window).load(function(){
		$('.tabCont'+tabNum).css('visibility','visible').hide();
		$('.tabCont'+tabNum+'.active').show();
		$('#tab'+tabNum+ '>li>a').click(function(){
			$('.tabCont'+tabNum).hide().removeClass('active');
			$('#tab'+tabNum+'>li>a').removeClass('active');

			var tabCont = $(this).attr('href');
			$(tabCont).show().addClass('active');
			$(this).addClass('active');
			return false;
		});
	});
}
function layer(){
	$('.btn-layer-open').click(function(){
		var layerId = $(this).attr('href');
		$('.dimmed').show();
		$(layerId).show();
		var layerHeight = $(layerId).outerHeight();
		var layerWidth = $(layerId).width();
		$(layerId).css('margin-top', '-'+layerHeight/2+ 'px').css('margin-left', '-'+layerWidth/2+ 'px');
		return false;
	});

	$('.layer .btn-close').click(function(){
		$('.dimmed').hide();
		$(this).parent().hide();
		return false;
	});

	$('.layer #btn-close').click(function(){
		$('.dimmed').hide();
		$(this).parent().parent().parent().parent().hide();
		return false;
	});

	$('.layer #btn-close1').click(function(){
		$('.dimmed').hide();
		$(this).parent().parent().parent().hide();
		return false;
	});
}

function formPlaceholder(){
	$('input').focusin(function(){
		$(this).attr('placeholder','')
	});
}

function fileAttach(){
	$('input.file').on('change',function(){
		$('.file-wrap .txt-file').text(this.value);
	});
}

function commentWrite(){
	//$('.comment-list>ul>li>.re .btn-re').toggle(function(){
	//	$(this).addClass('open');
	//	$(this).next('div').show();
	//},function(){
	//	$(this).removeClass('open');
	//	$(this).next('div').hide();
	//});
	$('.comment-list>ul>li>.re .btn-re').click(function(){
		$("#flag").val("i");
		$("#cidx").val("");
		if ($(this).next('div').css('display') == "none"){
			$(this).addClass('open');
			$(this).next('div').attr('style', 'display:block');
			$(this).next('div').find('textarea').val('');
			//$(this).next('div').find('.re-write textarea').val('');
		} else {
			$(this).removeClass('open');
			$(this).next('div').attr('style', 'display:none');
			$(this).next('div').find('textarea').val('');
			//$(this).next('div').find('.re-write textarea').val('');
		}

		return false;
	});
}

function commentUpdate(){
	//$('.comment-list>ul>li>.btns').toggle(function(){
	//	$(this).prev('div').find('.btn-re').addClass('open');
	//	$(this).prev('div').find('.re-write').show();
	//},function(){
	//	$(this).prev('div').find('.btn-re').removeClass('open');
	//	$(this).prev('div').find('.re-write').hide();
	//});

	$('.comment-list>ul>li>#CommeditDel>#update').click(function(){
		$("#flag").val("u");
		$("#cidx").val($(this).parent().prev('div').prev('div').find('#ctxt').text());
		if ($(this).parent().prev('div').css('display') == "none"){
			$(this).parent().prev('div').attr('style', 'display:block')
			//$(this).parent().prev('div').find('.btn-re').attr('style', 'display:none');
			$(this).parent().prev('div').find('.re-write').attr('style', 'display:block');
			if ($(this).parent().prev('div').prev('div').find('#ptxt').html().replace(/<br>/gi,"\n") == ''){
				$(this).parent().prev('div').find('.re-write textarea').val($(this).parent().prev('div').prev('div').find('.txt-secret').html().replace(/<br>/gi,"\n"));
			} else {
				$(this).parent().prev('div').find('.re-write textarea').val($(this).parent().prev('div').prev('div').find('#ptxt').html().replace(/<br>/gi,"\n"));
			}
		} else {
			if ($(this).parent().prev('div').find('.re-write').css('display') == "none"){
				//$(this).parent().prev('div').find('.btn-re').attr('style', 'display:none');
				$(this).parent().prev('div').find('.re-write').attr('style', 'display:block');
				if ($(this).parent().prev('div').prev('div').find('#ptxt').html().replace(/<br>/gi,"\n") == ''){
					$(this).parent().prev('div').find('.re-write textarea').val($(this).parent().prev('div').prev('div').find('.txt-secret').html().replace(/<br>/gi,"\n"));
				} else {
					$(this).parent().prev('div').find('.re-write textarea').val($(this).parent().prev('div').prev('div').find('#ptxt').html().replace(/<br>/gi,"\n"));
				}
			} else {
				//$(this).parent().prev('div').find('.btn-re').attr('style', 'display:none');
				$(this).parent().prev('div').find('.re-write').attr('style', 'display:none');
				$(this).parent().prev('div').find('.re-write textarea').val('');
			}
		}
		return false;
	});
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function hitRecentLog(goods_idx){
	recordGoods(goods_idx);
	$.ajax({
		type	: "post",
		url		: "/API/recent_view_hit.asp",
		data	: {"goods_idx":goods_idx},
		dataType	: "text",
		success : function(){
		}
	});	
}

var recentViewGoodsName = "WebRecentView";
var RecentViewGoods = {
	Set: function(value){
		var	exdays = 30;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value) + ((exdays==null) ? "" : ";domain=dietshin.com;path=/; expires=" + exdate.toGMTString());
		document.cookie = recentViewGoodsName +"="+ cookieValue;
	},
	Get: function(){ 
		var cookieData = document.cookie;
		var start = cookieData.indexOf(recentViewGoodsName);
		var cookieValue = '';
		if(start != -1){
			start += recentViewGoodsName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cookieValue = cookieData.substring(start+1, end);
		}
		return unescape(cookieValue);
	},
	Del: function(){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		document.cookie = recentViewGoodsName + "= " + ";domain=dietshin.com;path=/; expires=" + expireDate.toGMTString();
	}
}

function recordGoods(goods_idx){
	//최근 본 상품 넣을 시간정의
	var nowtime=new Date().getTime();
	var nowday=Math.round(nowtime / (1000*60*60*24));
	var Maxkeywords = 100;

	if (goods_idx != ""){
		var input_goods_idx = "@"+goods_idx+"@";
		//최근검색어 추가
		//값이 없으면 하나 넣는다.
		if (RecentViewGoods.Get() == ""){
			RecentViewGoods.Set(input_goods_idx); 
		}else{
			if (RecentViewGoods.Get().indexOf("@") < 0 ){
				RecentViewGoods.Del();
			}
			var scharray = RecentViewGoods.Get().split(",");
			var dupl_flg_= scharray.indexOf(input_goods_idx);
			if (dupl_flg_ > -1){
				scharray.splice(dupl_flg_, 1);
			}
			scharray.unshift(input_goods_idx);
			RecentViewGoods.Set(scharray); 

			//최대 검색어 갯수 보다 많을때는 뒤에서 끊어버린다.
			if (scharray.length > Maxkeywords){ scharray.splice(Maxkeywords, scharray.length - Maxkeywords);}
		}
	}
}

function hitRecentLog(goods_idx){
	recordGoods(goods_idx);
	$.ajax({
		type	: "post",
		url		: "/API/recent_view_hit.asp",
		data	: {"goods_idx":goods_idx},
		dataType	: "text",
		success : function(){
		}
	});	
}

function report_ins(idx){
	if (confirm("해당 게시물을 신고하시겠습니까?\n\n(관리자 확인 후 처리 됩니다.)")){
		$.ajax({
			type	: "post",
			url		: "/API/report_ins.asp",
			data	: {"idx":idx},
			dataType	: "json",
			success : function(oResult){
				if (oResult.RESULT =="Y" || oResult.RESULT =="N"){
					alert(oResult.MSG);
				}else{
					alert('로그인 후 이용해주세요.');
					parent.location.href = "/member/mem_login.asp";
				}
			}
		});
	}
}

function choice_report_ins(idx,reason){
	$("input:radio[name='reason']:radio[value='"+reason+"']").prop("checked",true);
	if (confirm("해당 게시물을 신고하시겠습니까?\n\n*신고하신 내용은 운영정책에 의해 처리 되며, 허위 및 부정 신고 시 영구적으로 이용이 제한 될 수 있습니다.")){
		$.ajax({
			type	: "post",
			url		: "/API/report_ins.asp",
			data	: {"idx":idx,"reason":reason},
			dataType	: "json",
			success : function(oResult){
				$("#popup_report").hide();
				if (oResult.RESULT =="Y" || oResult.RESULT =="N"){
					alert(oResult.MSG);					
				}else{
					alert('로그인 후 이용해주세요.');
					parent.location.href = "/member/mem_login.asp";
				}
			}
		});
	}
}

function view_report_ins(){
	$("#popup_report").show();
	$("input:radio[name='reason']").removeAttr("checked");
	blockWheel();
}

function hide_reason(){
	$("#popup_report").hide();
	playWheel();
}

function reply_report_ins(reason){
	$("input:radio[name='reply_reason']:radio[value='"+reason+"']").prop("checked",true);
	if (confirm("해당 댓글을 신고하시겠습니까?\n\n*신고하신 내용은 운영정책에 의해 처리 되며, 허위 및 부정 신고 시 영구적으로 이용이 제한 될 수 있습니다.")){
		var idx = $("input[name=reply_idx]").val();
		$.ajax({
			type	: "post",
			url		: "/API/reply_report_ins.asp",
			data	: {"idx":idx,"reason":reason},
			dataType	: "json",
			success : function(oResult){
				hide_reply_reason();
				if (oResult.RESULT =="Y"){
					alert(oResult.MSG);					
					location.reload();
				}else if(oResult.RESULT =="N"){
					alert(oResult.MSG);					
				}else{
					loginChk();
				}	
			},error:function(res){alert(res.responseText);}
		});
	}
}

function view_reply_report_ins(idx){
	loginChk();
	$("#reply_popup_report").show();
	$("input:radio[name='reply_reason']").removeAttr("checked");
	$("input[name=reply_idx]").val(idx);
	blockWheel();
}
function hide_reply_reason(){
	$("#reply_popup_report").hide();
	playWheel();
}


//막기
function blockWheel(){
	$(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
		e.preventDefault();
		return;
	});


	$(window).on("keydown.disableScroll", function(e) {
		var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
		for (var i = 0; i < eventKeyArray.length; i++) {
			if (e.keyCode === eventKeyArray [i]) {
				e.preventDefault();
				return;
			}
		}
	});
}

//해제
function playWheel(){
	$(window).off(".disableScroll");
}

function columnView(idx){
	location.href="/community/column_view.asp?idx="+idx;
}

function boardView(idx){
	location.href="/community/bbs_view.asp?idx="+idx;
}

//이벤트 로그 쌓기
function board_Event_Log(idx){
	$.ajax({
		type	: "post",
		url		: "/API/board_event_ip_device_log.asp",
		data	: {"idx":idx},
		dataType	: "json",
		success : function(oResult){}
	});
}

/**챌린지상품때문에 추가 2019.01.31 **/
function viewChallenge(ch_user_idx){
	window.open("https://www.dietshin.com/member/pop_challenge_allview_user.asp?ch_user_idx="+ch_user_idx, "chall", "toolbars=no,menubars=no,scrollbars=yes,status=no,titlebars=no,location=no,height=600,width=600");
}
/**챌린지상품때문에 추가 2019.01.31 **/

function snsPwUpdatecheckEmail(){
	temp_email = $("#sns_email").val();
	if (temp_email == ""){
		alert("이메일 계정을 입력해 주세요.");
		$("#sns_email").focus();
		return false;
	}

	if (temp_email != ""){
		let snsRegMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!snsRegMail.test(temp_email)){
			alert("잘못된 이메일 형식입니다.");
			return false;
		}else  {
			$.ajax({
				type	: "post",
				url		: "/api/newemail_nickname_check.asp",
				async	: false,
				data	: {"email_id":temp_email,"GUBUN":"EMAIL","snschk":"Y"},
				dataType	: "json",
				success : function(oResult){
					if (oResult.RESULT == "Y"){
						if(confirm("등록된 이메일 주소가 아닙니다.\n다시 확인 후 입력해주세요.")){
							//location.href="/member/mem_reg.asp"
						} else {
							return;
						}
					} else if (oResult.RESULT == "D"){
						alert(oResult.MSG)
						return;
					} else {
						$.ajax({
							type	: "post",
							url		: "/api/newtemp_pwd_send.asp",
							data	: {"temp_email":temp_email},
							dataType	: "json",
							success : function(oResult){
								if (oResult.RESULT == "Y"){
									alert(oResult.MSG);
									//location.replace("/member/mem_login.asp");
								}else{
									alert("메일 발송에 실패하였습니다.");
								}
							}
						});
					}
				}
			});
		}
	}
}