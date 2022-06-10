var gn_nick_idx="";
var gn_nickname="";
var gn_sex="";
var gn_byear="";
var gn_bmonth="";
var gn_bday="";
var gn_stature="";
var gn_weight="";
var gn_goal_weight="";
var gn_goal_term="";
var gn_goal_term_type="";
var gn_active_mass="";
var gn_nick_mail="";

if  (typeof(window.DietBridge) == "object"){
	var jsonArr = window.DietBridge.getProfileJsonData();
	var nick=JSON.parse(jsonArr);
	gn_nick_idx=nick.nick_idx;
	gn_nickname=nick.nickname;
	gn_sex=nick.sex;
	gn_byear=nick.byear;
	gn_bmonth=nick.bmonth;
	gn_bday=nick.bday;
	gn_stature=nick.stature;
	gn_weight=nick.weight;
	gn_goal_weight=nick.goal_weight;
	gn_goal_term=nick.goal_term;
	gn_goal_term_type=nick.goal_term_type;
	gn_active_mass=nick.active_mass;
	gn_nick_mail =nick.email;
}else{
	/**
	alert("어플 설치 후 이용하세요");
	location.replace("http://m.bell365.com");
	return false;
	**/
}

function trim(vals){
	return vals.replace(/(^\s*)|(\s*$)/gi, "").replace(/\"/gi,"").replace(/\'/gi,"");
}

function getStrLength(str) {
    var l = 0;
    for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
    return l;
}

function youtubeplay(youtube_id){
	if(typeof(window.DietBridge) == "object"){
		if (youtube_id.length !=11){
			if (youtube_id.substring(0,7) =="http://"){
				location.href=youtube_id;
			}else{
				window.DietBridge.launchMarket(youtube_id);
			}
		}else{
			window.DietBridge.playYouTube(youtube_id);
		}
	}
}

function IsEmpty(data) {
	for (var i=0;i<data.length;i++) 
	{ 
			if (data.substring(i,i+1) != " ") 
				return false;  
	}   
	return true; 
}

function CommunityLink(title,ment_title,kt_url,menu_id,idx){
	if(typeof(window.DietBridge) == "object"){
		/**
		if (parseInt(menu_id) >= 4){
			var menu_idx=parseInt(menu_id)+1;
		}else{
			var menu_idx=parseInt(menu_id);
		}
		**/
		var menu_idx=parseInt(menu_id);
		$.ajax({
			type	: "post",
			url		: "/V25/API/CommunityKakao.asp",
			data	: {"menu_id":menu_idx},
			dataType	: "json",
			success : function(oResult){
			}
		});
		window.DietBridge.setCommunityKakaoLink(title,ment_title,kt_url,menu_id,idx);
	}
}

function htCommunityLink(title,ment_title,kt_url,youtubeIdx,idx){
	$.ajax({
		type	: "post",
		url		: "/V25/API/CommunityKakao.asp",
		data	: {"menu_id":"4"},
		dataType	: "json",
		success : function(oResult){
		}
	});
	window.DietBridge.setHomeTrainingKakaoLink(title,ment_title,kt_url,idx,youtubeIdx)
}
function ImageDownload(url1,url2,url3,url4,url5,url6,url7,url8,url9,url10){
	if(typeof(window.DietBridge) == "object"){
		var url=[url1,url2,url3,url4,url5,url6,url7,url8,url9,url10];
		window.DietBridge.setCommunityImageDownload(url);
	}
}

function CommunityLike(idx){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityLike(idx);
		$.ajax({
			type	: "post",
			url		: "/V25/API/CommunityLike.asp",
			data	: {"idx":idx,"PM":"P"},
			dataType	: "json",
			success : function(oResult){
			}
		});
		$("#btn_like").html("<a class=\"cmt_sst\" onclick=\"deleteCommunityLike('"+idx+"');\"><img class=\"btn_btn\" id=\"btn_like\" src=\"/img/btn_good_on.png\" height=\"25px\" alt=\"좋아요_on\"></a>");
	}
}

function isCommunityLike(idx,PM){
	if(typeof(window.DietBridge) == "object"){
		try{
			var tf=window.DietBridge.isCommunityLike(idx);
			if (tf){
				$("#btn_like").html("<a class=\"cmt_sst\" onclick=\"deleteCommunityLike('"+idx+"');\"><img class=\"btn_btn\" id=\"btn_like\" src=\"/img/btn_good_on.png\" height=\"25px\" alt=\"좋아요_on\"></a>");
			}else{
				$("#btn_like").html("<a class=\"cmt_sst\" onclick=\"CommunityLike('"+idx+"');\"><img class=\"btn_btn\" id=\"btn_like\" src=\"/img/btn_good_off.png\" height=\"25px\" alt=\"좋아요_off\"></a>");
			}
		}catch (e){
			$("#btn_like").html("<a class=\"cmt_sst\" onclick=\"CommunityLike('"+idx+"');\"><img class=\"btn_btn\" id=\"btn_like\" src=\"/img/btn_good_off.png\" height=\"25px\" alt=\"좋아요_off\"></a>");
		}
	}else{
		$("#btn_like").html("<a class=\"cmt_sst\"><img class=\"btn_btn\" id=\"btn_like\" src=\"/img/btn_good_off.png\" height=\"25px\" alt=\"좋아요_off\"></a>");
	}
}

function deleteCommunityLike(idx){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.deleteCommunityLike(idx);
		$.ajax({
			type	: "post",
			url		: "/V25/API/CommunityLike.asp",
			data	: {"idx":idx,"PM":"M"},
			dataType	: "json",
			success : function(oResult){
			}
		});
		$("#btn_like").html("<a class=\"cmt_sst\" onclick=\"CommunityLike('"+idx+"');\"><img class=\"btn_btn\" id=\"btn_like\" src=\"/img/btn_good_off.png\" height=\"25px\" alt=\"좋아요_off\"></a>");
	}
}

function board_del(idx,board){
	if(confirm("해당 게시물을 삭제하시겠습니까?")){
		$.ajax({
			type	: "post",
			url		: "/API/conts_delete.asp",
			data	: {"idx":idx},
			dataType	: "json",
			success : function(oResult){
				if (oResult.RESULT == "Y"){
					location.replace("/community/bbs_list.asp?menu_id="+board);
				}else{
					alert("삭제에 실패하였습니다.");
				}
			}
		});
	}
}

function board_del2(idx,board){
	if(confirm("해당 게시물을 삭제하시겠습니까?")){
		$.ajax({
			type	: "post",
			url		: "/API/conts_delete.asp",
			data	: {"idx":idx},
			dataType	: "json",
			success : function(oResult){
				if (oResult.RESULT == "Y"){
					viewMemberInfo('');
				}else{
					alert("삭제에 실패하였습니다.");
				}
			}
		});
	}
}

function setCommunityContentsModify(idx){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityContentsModify(idx);
	}
}

function pbback(){
	if(confirm("작성중인 글을 취소 하시겠습니까?")){
		history.go(-1);
	}
}

function setfinish(){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.activityFinish();
	}
}

function addTalkZoneListNickName(strNick,strNickIdx){
	if (gn_nick_idx=""){

	}
	if (typeof(window.DietBridge) == "object")	{
		if(parseInt(window.DietBridge.getAppVersionCode()) >= 27){
			if (strNickIdx != ""){
				//window.DietBridge.addTalkZoneListNickName(strNick,strNickIdx);
				window.DietBridge.addTalkZoneListNickName(strNick);
			}else{
				window.DietBridge.addTalkZoneListNickName(strNick);
			}
		}else{
			window.DietBridge.addTalkZoneListNickName(strNick);
		}
	}
}



function launchWebBrowser(strurl){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.launchWebBrowser(strurl);
	}else{
		var openNewWindow = window.open("about:blank");
		openNewWindow.location.href=strurl;
	}
}

function isCommunityBookmark(idx){
	if(typeof(window.DietBridge) == "object"){
		try{
			var tf=window.DietBridge.isCommunityBookmark(idx);
			if (tf){
				$("#btn_bookmark").html("<img class=\"btn_btn\" onclick=\"deleteCommunityBookmark('"+idx+"');\" src=\"/img/btn_bookmark_on.png\">");
			}else{
				$("#btn_bookmark").html("<img class=\"btn_btn\" onclick=\"CommunityBookmark('"+idx+"');\" src=\"/img/btn_bookmark_off.png\">");
			}
		}catch (e){
			$("#btn_bookmark").html("<img class=\"btn_btn\" onclick=\"CommunityBookmark('"+idx+"');\" src=\"/img/btn_bookmark_off.png\">");
		}
	}else{
		$("#btn_bookmark").html("<img class=\"btn_btn\" src=\"/img/btn_bookmark_off.png\">");
	}
}	

function CommunityBookmark(idx){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityBookmark(idx);
		$("#btn_bookmark").html("<img class=\"btn_btn\" onclick=\"deleteCommunityBookmark('"+idx+"');\" src=\"/img/btn_bookmark_on.png\">");
	}
}

function deleteCommunityBookmark(idx){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.deleteCommunityBookmark(idx);
		$("#btn_bookmark").html("<img class=\"btn_btn\" onclick=\"CommunityBookmark('"+idx+"');\" src=\"/img/btn_bookmark_off.png\">");
	}
}

function altdelCommunityBookmark(idx){
	alert("삭제된 게시물 입니다.");
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.deleteCommunityBookmark(idx);
		getCommunityBookmarkList(1);
	}
}

function getCountBookmarkList(){
	if(typeof(window.DietBridge) == "object"){
		var jsonArr=window.DietBridge.getCommunityBookmarkList();
		var jsonList=JSON.parse(jsonArr);
		$("#abookmark").text("북마크 ("+jsonList.list.length+")");
	}
	
}

function getCommunityBookmarkList(page){
	if(typeof(window.DietBridge) == "object"){
		var jsonArr=window.DietBridge.getCommunityBookmarkList();
		var jsonList=JSON.parse(jsonArr);
		var bookMarkList="";
		for (var x=0;x <jsonList.list.length;x++){
			var newidx = jsonList.list[x].idx;
			bookMarkList += newidx; 
			if (x+1 != jsonList.list.length){
				bookMarkList += ",";
			}
		}
		$("#abookmark").text("북마크 ("+jsonList.list.length+")");
		bookMarkListJson(bookMarkList,page);
	}
}

function bookMarkListJson(bookMarkList,page){
	$.ajax({
		type	: "post",
		url		: "/V25/API/BookMarkList.asp",
		data	: {"bookMarkList":bookMarkList,"nowpage":page},
		dataType	: "json",
		success : function(oResult){
			bookMarkListView(oResult);
		}
	});
}

function bookMarkListView(oResult){
	var div_list="";
	var page_list="";
	var total_page=parseInt(oResult.TOTALPAGE);
	var total_count=parseInt(oResult.TOTALCOUNT);
	var now_page=parseInt(oResult.NOWPAGE);
	var bookMarkList=oResult.BOOKMARKLIST;

	for (i=0; i<oResult.LIST.length; i++){
		var IDX				= oResult.LIST[i].IDX;
		var TITLE			= oResult.LIST[i].TITLE;
		var REPRE_IMG		= oResult.LIST[i].REPRE_IMG;
		var VIEW_NICK_IDX	= oResult.LIST[i].VIEW_NICK_IDX;
		var GOODHIT			= oResult.LIST[i].GOODHIT;
		var VIEWHIT			= oResult.LIST[i].VIEWHIT;
		var REPLY_COUNT		= oResult.LIST[i].REPLY_COUNT;
		var VIEW_MENU_ID	= oResult.LIST[i].VIEW_MENU_ID;
		var REGDATE			= oResult.LIST[i].REGDATE;
		var VIEW_NICK_NAME	= oResult.LIST[i].VIEW_NICK_NAME;
		var PROFILEIMG		= oResult.LIST[i].PROFILEIMG;
		var MEM_GRADE		= oResult.LIST[i].MEM_GRADE;
		var MENU_HAN		= oResult.LIST[i].MENU_HAN;
		var ACTIVE_YN		= oResult.LIST[i].ACTIVE_YN;
		var IMG_COUNT		= oResult.LIST[i].IMG_COUNT;

		if ((i % 2) == 0) {
			var div_class="schlistall";
		}else{
			var div_class="schlistall2";
		}
		
		div_list += "<div class=\""+div_class+"\">";
		div_list += "	<div class=\"schlistt\">";

		if (ACTIVE_YN == "Y"){
			var goUrl="/V25/API/member_community_log.asp?idx="+IDX+"&view_nick_idx="+VIEW_NICK_IDX+"&page_type=BOOKMARK";
		}else{
			var goUrl="javascript:altdelCommunityBookmark('"+IDX+"');";
		}
		
		if (REPRE_IMG != "") {
			div_list += "		<a href=\""+goUrl+"\">";
			div_list += "			<div class=\"photo2\">";
			div_list += "				<p class=\"photo_view\"><img src=\""+REPRE_IMG+"\" alt=\"썸네일\"/></p>";
			div_list += "				<p class=\"picture_count_box\"><span class=\"picture_count\">+"+IMG_COUNT+"</span></p>";
			div_list += "			</div>";
			div_list += "		</a>";
		}
		div_list += "		<a href=\""+goUrl+"\">";
		div_list += "		<div class=\"schtit_nav\"><img class=\"icn_navi\" src=\"/img/icn_navi.png\">"+MENU_HAN+"</div>	";
		div_list += "		<div class=\"schtit2_wrap\">";
		div_list += "			<span class=\"schtit2\">"+TITLE+"</span>			";
		div_list += "			<span class=\"ico_newtit_wrap\"></span>";
		div_list += "		</div>	";
		div_list += "		</a>";
		div_list += "		<div class=\"listphotoall\">";
		div_list += "			<a onclick=\"viewMemberInfo('"+VIEW_NICK_IDX+"');\" style=\"cursor:pointer\">";
		div_list += "			<span class=\"listphoto\">";
		div_list += "				<p class=\"listphoto_view\"><img src=\""+PROFILEIMG+"\" width=\"40px\" alt=\"썸네일\"/></p>";
		div_list += "			</span>";
		div_list += "			</a>";
		div_list += "			<img class=\"icn_grade\" src=\"/img/icn_grade_"+MEM_GRADE+".png\" width=\"30px\" alt=\"다신다이어터\" />";
		div_list += "		</div>		";	
		div_list += "		<ul class=\"schtxtlist\"> ";		
		div_list += "			<li class=\"nicknday\">";
		div_list += "				<em class=\"nick\">"+VIEW_NICK_NAME+"</em>";
		div_list += "				<em class=\"nicknday_bar nick\">|</em> ";
		div_list += "				<em class=\"nick\">"+REGDATE+"</em>";
		div_list += "			</li>";
		div_list += "			<li class=\"goodnreply\">";
		div_list += "				<span class=\"icos_wrap\"><img class=\"ico_hits\" src=\"/img/ico_hits.png\" alt=\"조회수\">"+VIEWHIT+"</span>";
		div_list += "				<span class=\"icos_wrap\"><img class=\"icn_reply\" src=\"/img/ico_reply.png\" alt=\"댓글수\">"+REPLY_COUNT+"</span>";
		div_list += "				<span class=\"icos_wrap\"><img class=\"icn_good\" src=\"/img/ico_good.png\" alt=\"추천수\">"+GOODHIT+"</span>";
		div_list += "			</li>";
		div_list += "		</ul>";
		div_list += "	</div>";
		div_list += "</div>";
	}

	if (div_list == ""){
		div_list = "<div class=\"listno\">		<p>리스트 내용이 없습니다.</p>		</div>";
		$("#bookmark").html(div_list);
	}else{
		$("#bookmark").html(div_list);
		bookmarkpaging(total_count,total_page,now_page);
	}

}

function bookmarkpaging(totalcount,totalpage,nowpage){
	var div_moreview1 ="<p class=\"btpg\">";
	var nBlockpage =parseInt(( nowpage -1)/4)*4+1;
	
	if (nowpage > 1){
		div_moreview1 +="<a onclick=\"getCommunityBookmarkList('"+ parseInt(parseInt(nowpage)-1) +"');\"><span class=\"npgBtn_b\" >◀&nbsp;이전</span></a>";
	}

	if (parseInt(totalpage) > parseInt(nowpage)){
		div_moreview1 +="<a onclick=\"getCommunityBookmarkList('"+ parseInt(parseInt(nowpage)+1) +"');\"><span class=\"npgBtn_b\">다음&nbsp;▶</span></a>";
	} 

	
	div_moreview1 +="</p><p class=\"ntpg\">";

	if (nowpage > 1){ 
		div_moreview1 +="<a onclick=\"getCommunityBookmarkList('1');\"><span class=\"npgBtn\" >처음</span></a>&nbsp;";
	}
	
	var pagei=1;

	while ( pagei <=4 && nBlockpage <= totalpage){
		if (nBlockpage == parseInt(nowpage)){
			div_moreview1 +="<span class=\"npgBtn_v\">"+nBlockpage+"</span>";
		}else{
			div_moreview1 +="<a onclick=\"getCommunityBookmarkList('"+nBlockpage+"');\"><span class=\"npgBtn\">"+nBlockpage+"</span></a>";
		}
		nBlockpage++;
		pagei ++;
	}
	if (totalpage > nBlockpage-1){
		div_moreview1 +="…<a onclick=\"getCommunityBookmarkList('"+totalpage+"');\"><span class=\"npgBtn\" >"+totalpage+"</span>";
	}
	div_moreview1 +="</p>";
	div_moreview1 +="<p class='npgBtn_r'>총 "+totalcount+"개 등록되어 있습니다.</p>";

	$("#moreView").html(div_moreview1);	
}

function prev_next_bookmark(xidx,viewnickidx){
	if(typeof(window.DietBridge) == "object"){
		var jsonArr=window.DietBridge.getCommunityBookmarkList();
		var jsonList=JSON.parse(jsonArr);
		var bookMarkList="";
		var chknum=0;
		for (var x=0;x <jsonList.list.length;x++){
			var newidx = jsonList.list[x].idx;
			if (newidx.toString() == xidx.toString()){
				chknum=x;
			}
			bookMarkList += newidx; 
			if (x+1 != jsonList.list.length){
				bookMarkList += ",";
			}
		}
		bookMarkPrevNext(bookMarkList,chknum,viewnickidx);
	}
}

function bookMarkPrevNext(bookMarkList,chknum,viewnickidx){
	$.ajax({
		type	: "post",
		url		: "/V25/API/BookMarkPrevNext.asp",
		data	: {"bookMarkList":bookMarkList,"chknum":chknum,"viewnickidx":viewnickidx},
		dataType	: "json",
		success : function(oResult){
			bookMarkPrevNextView(oResult);
		}
	});
}

function bookMarkPrevNextView(oResult){
	var div_html="";
	if (oResult.PREV_HTML != ""){
		div_html += oResult.PREV_HTML;
	}
	if (oResult.NEXT_HTML != ""){
		div_html += oResult.NEXT_HTML;
	}
	if (div_html == ""){
		$("#view_prev_next_all").hide();
	}else{
		$("#view_prev_next").html(div_html);
	}
}

function viewMemberImg(view_mem_idx){
	if(typeof(window.DietBridge) == "object"){
		var strurl="http://diet.funnyapp.me/V25/newmember/member_picture_view.asp?view_nick_idx="+view_mem_idx;
		window.DietBridge.startActivityMemberPicture(strurl);
	}
}

function viewMemberInfo(view_mem_idx){
	if(typeof(window.DietBridge) == "object"){
		if (view_mem_idx != "73544"){
			if (view_mem_idx != ""){
				var strurl="http://diet.funnyapp.me/V25/newmember/member_write_board.asp?view_nick_idx="+view_mem_idx;
			}else{
				var strurl="http://diet.funnyapp.me/V25/newmember/mywrite_board.asp";
			}
			window.DietBridge.startActivityNonMemberInfo(strurl);
		}
	}
}

function accountAbout(strno){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.startActivityAccountAbout(strno);
	}
}


function SearchBoxActive(isActive){
	if (isActive =="Y"){
		var bln=true;
		//안보임
	}else{
		var bln=false;
		//보임
	}
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityWebSearchInputBoxActive(bln);
	}
}

function setCommunityWriteLayoutVisible(isActive){
	if (isActive =="Y"){
		var bln=true;
		//보임
	}else{
		var bln=false;
		//안보임
	}
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityWriteLayoutVisible(bln);
	}
}
//하단 커뮤니티 메인메뉴 탭 활성화
function setMainTabActivityVisible(isActive){
	if (isActive =="Y"){
		var bln=true;
	}else{
		var bln=false;
	}
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setMainTabActivityVisible(bln);
	}
}

//하단 커뮤니티 댓글영역 활성화
function setCommunityActivityCommentVisible(isActive){
	if (isActive =="Y"){
		var bln=true;
	}else{
		var bln=false;
	}
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityActivityCommentVisible(bln);
	}
}

//상단 커뮤니티 타이틀 영역   제목타이틀, 검색표시 노출/미노출
function setCommunityActivityTopLayout(title,isActive){
	if (isActive =="Y"){
		var bln=true;
	}else{
		var bln=false;
	}
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setCommunityActivityTopLayout(title,bln);
	}
}


function getBMIdata(){
	if(typeof(window.DietBridge) == "object"){
		var bmiResult=window.DietBridge.getBMIdata();
		//alert(bmiResult);
		var bmiArr=JSON.parse(bmiResult);
		var termWeight=bmiArr.termWeight;
		var divHtml="";
		if (termWeight == undefined){
			divHtml	=	"<div class=\"home_bmi_wrap\">";
			divHtml	+=	"	<div class=\"home_bmi\" >";
			divHtml	+=	"		<p>체질량 지수(BMI) 측정하기<a onclick=\"goMyProfile();\"><span class=\"icn_setup\"><img src=\"/img/icn_setup.png\" alt=\"설정\" ></span></a></p>";
			divHtml	+=	"		<p class=\"home_bmi_s\">비만도 지수와 기초대사량를 측정하고 칼로리 처방을 받으세요</p>";
			divHtml	+=	"		<p class=\"bmi_go_wrap\"><a onclick=\"goMyProfile();\"><span class=\"bmi_go\">처방받기</span></a></p>";
			divHtml	+=	"	</div>";
			divHtml	+=	"</div>";
		}else{		
			var dday=bmiArr.dday;
			var sportCalorie=bmiArr.sportCalorie;
			var foodCalorie=bmiArr.foodCalorie;
			if (parseInt(dday) >0 ){
				var dday_txt = dday+"일";
			}else{
				var dday_txt = "감량 기간이 완료되었습니다.";			
			}

			divHtml	=	"<div class=\"home_bmi_wrap\">";
			divHtml	+=	"	<div class=\"dday_box\">";	
			divHtml	+=	"		<p class=\"dday_txt_box\">";
			divHtml	+=	"		<a onclick=\"goMyProfile();\"><span class=\"icn_setup_on\"><img src=\"/img/icn_setup.png\" alt=\"설정\" ></span></a>";
			divHtml	+=	"		<span class=\"dday_tit_box\">";
			divHtml	+=	"		<em class=\"dday_tit\"><img class=\"ico_dday1\" src=\"/img/icn_dday.png\">D-Day</em>";
			divHtml	+=	"		<em class=\"dday_txt\">"+dday_txt+"</em>";
			divHtml	+=	"		</span>";
			divHtml	+=	"		</p>";
			divHtml	+=	"		<p class=\"dday_txt_box\">";
			divHtml	+=	"		<span class=\"dday_tit_box\">";
			divHtml	+=	"		<em class=\"dday_tit\"><img class=\"ico_dday1\" src=\"/img/icn_kcal.png\">음식으로 섭취한 칼로리</em>";
			divHtml	+=	"		<em class=\"dday_txt\">"+foodCalorie+"kcal</em>";
			divHtml	+=	"		</span>";
			divHtml	+=	"		</p>";
			divHtml	+=	"		<p class=\"dday_txt_box\">";
			divHtml	+=	"		<span class=\"dday_tit_box\">";
			divHtml	+=	"		<em class=\"dday_tit\"><img class=\"ico_dday1\" src=\"/img/icn_sportss.png\">운동으로 소모한 칼로리</em>";
			divHtml	+=	"		<em class=\"dday_txt\">"+sportCalorie+"kcal</em>";
			divHtml	+=	"		</span>";
			divHtml	+=	"		</p>";
			divHtml	+=	"		<p class=\"dday_txt_box listlast\">";
			divHtml	+=	"		<span class=\"dday_tit_box\">";
			divHtml	+=	"		<em class=\"dday_tit\"><img class=\"ico_dday1\" src=\"/img/icn_weight.png\">현재 감량 몸무게</em>";
			divHtml	+=	"		<em class=\"dday_txt\">"+termWeight+"kg</em>";
			divHtml	+=	"		</span>";
			divHtml	+=	"		</p>";
			divHtml	+=	"	</div>";
			divHtml	+=	"</div> ";
		}
		$("#BMIVIEW").html(divHtml);
	}
}


function viewPicture(strurl){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.startActivityMemberPicture(strurl);
	}
}

function htGoList(){
	location.href="/community/hometraining_main_list.asp";
}

function htViewer(ht_idx,ht_url){
	location.href="/community/hometraining_view.asp?idx="+ht_idx+"&bc=&ptype=sht";
	/**
	if(typeof(window.DietBridge) == "object"){
		$.ajax({
			type	: "post",
			url		: "/V25/API/hometraining_log.asp",
			data	: {"ht_idx":ht_idx},
			dataType	: "text"
		});
		window.DietBridge.startActivityHomeTrainingViewer(ht_idx,ht_url);
	}
	**/
}

function newhtViewer(ht_idx){
	location.href="/community/hometraining_view.asp?idx="+ht_idx+"&bc=&ptype=sht";
}

function viewCommunity(strurl){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.startActivityCommunityDetail(strurl);
	}else{
		location.href=strurl;
	}
}

function userHref(strurl,inout){
	if (inout =="out"){
		window.open(strurl, 'newWindow');
	}else{
		if(typeof(window.DietBridge) == "object"){
			setCommunityWriteLayoutVisible('N');		//글쓰기 버튼 안보임
			setCommunityActivityCommentVisible('N');	//댓글 영역 보임
			setMainTabActivityVisible('N');				//하단 메뉴 내용 안보임
		}
		window.location.href=strurl;
	}
}

function isHometrainingZzim(htidx,bigCateIdx,bigCateTitle,smallCateIdx,smallCateTitle,title,view_time,SPORTING_GOODS,EXERCISE_EXPLAIN,EXERCISE_TIME,EXERCISE_INTENSITY,EXERCISE_LINK_URL){
	if(typeof(window.DietBridge) == "object"){
		var tf=window.DietBridge.isHometrainingZzim(htidx);
		if (tf == true){
			var lihtml="<a class=\"vod_tab_a\" onclick=\"deleteHometrainingZzim('"+htidx+"' ,'"+bigCateIdx+"','"+bigCateTitle+"','"+smallCateIdx+"','"+smallCateTitle+"','"+title+"','"+view_time+"','"+SPORTING_GOODS+"','"+EXERCISE_EXPLAIN+"','"+EXERCISE_TIME+"','"+EXERCISE_INTENSITY+"','"+EXERCISE_LINK_URL+"');\"><img class=\"ico_sns_go\" src=\"/img/ico_bmk_on.png\">즐겨찾기 취소</a>";
		}else{
			var lihtml="<a class=\"vod_tab_a\" onclick=\"setHometrainingZzim('"+htidx+"' ,'"+bigCateIdx+"','"+bigCateTitle+"','"+smallCateIdx+"','"+smallCateTitle+"','"+title+"','"+view_time+"','"+SPORTING_GOODS+"','"+EXERCISE_EXPLAIN+"','"+EXERCISE_TIME+"','"+EXERCISE_INTENSITY+"','"+EXERCISE_LINK_URL+"');\"><img class=\"ico_sns_go\" src=\"/img/ico_bmk_off.png\">즐겨찾기 추가</a>";
		}
	}else{
		var lihtml="<a class=\"vod_tab_a\" onclick=\"setHometrainingZzim('"+htidx+"' ,'"+bigCateIdx+"','"+bigCateTitle+"','"+smallCateIdx+"','"+smallCateTitle+"','"+title+"','"+view_time+"','"+SPORTING_GOODS+"','"+EXERCISE_EXPLAIN+"','"+EXERCISE_TIME+"','"+EXERCISE_INTENSITY+"','"+EXERCISE_LINK_URL+"');\"><img class=\"ico_sns_go\" src=\"/img/ico_bmk_off.png\">즐겨찾기 추가</a>";
	}
	$("#htbook").html(lihtml);
}

function deleteHometrainingZzim(htidx,bigCateIdx,bigCateTitle,smallCateIdx,smallCateTitle,title,view_time,SPORTING_GOODS,EXERCISE_EXPLAIN,EXERCISE_TIME,EXERCISE_INTENSITY,EXERCISE_LINK_URL){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.deleteHometrainingZzim(htidx);
		isHometrainingZzim(htidx,bigCateIdx,bigCateTitle,smallCateIdx,smallCateTitle,title,view_time,SPORTING_GOODS,EXERCISE_EXPLAIN,EXERCISE_TIME,EXERCISE_INTENSITY,EXERCISE_LINK_URL);

		$.ajax({
			type	: "post",
			url		: "/V25/API/hometraining_zzim.asp",
			data	: {"ht_idx":htidx,"PM":"M"},
			dataType	: "text"
		});
	}
}

function setHometrainingZzim(htidx,bigCateIdx,bigCateTitle,smallCateIdx,smallCateTitle,title,view_time,SPORTING_GOODS,EXERCISE_EXPLAIN,EXERCISE_TIME,EXERCISE_INTENSITY,EXERCISE_LINK_URL){
	if(typeof(window.DietBridge) == "object"){
		window.DietBridge.setHometrainingZzim(htidx,bigCateIdx,bigCateTitle,smallCateIdx,smallCateTitle,title,view_time,SPORTING_GOODS,EXERCISE_EXPLAIN,EXERCISE_TIME,EXERCISE_INTENSITY,EXERCISE_LINK_URL);
		isHometrainingZzim(htidx,bigCateIdx,bigCateTitle,smallCateIdx,smallCateTitle,title,view_time,SPORTING_GOODS,EXERCISE_EXPLAIN,EXERCISE_TIME,EXERCISE_INTENSITY,EXERCISE_LINK_URL);

		$.ajax({
			type	: "post",
			url		: "/V25/API/hometraining_zzim.asp",
			data	: {"ht_idx":htidx,"PM":"P"},
			dataType	: "text"
		});
	}
}

function bookmarksite(title,url) { 
   // Internet Explorer
   if(document.all)
   {
	   window.external.AddFavorite(url, title); 
   }
	// Internet Explorer 11 version
   else if(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1){
	  window.external.AddFavorite(url, title); 
   }
   // Google Chrome
   else if(window.chrome){
	  alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
   }
   // Firefox
   //else if (window.sidebar) // firefox 
   //{
   //   window.sidebar.addPanel(title, url, ""); 
   //}
   else if (navigator.userAgent.search('Firefox') != -1) // firefox 
   {
	  alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
   }
   // Opera
   else if(window.opera && window.print)
   { // opera 
	  var elem = document.createElement('a'); 
	  elem.setAttribute('href',url); 
	  elem.setAttribute('title',title); 
	  elem.setAttribute('rel','sidebar'); 
	  elem.click(); 
   }
} 

var emoticonViewBoardName = "WebBoardView";
var emoticonViewBoard = {
	Set: function(value){
		var	exdays = 30;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value) + ((exdays==null) ? "" : ";domain=dietshin.com;path=/; expires=" + exdate.toGMTString());
		document.cookie = emoticonViewBoardName +"="+ cookieValue;
	},
	Get: function(){ 
		var cookieData = document.cookie;
		var start = cookieData.indexOf(emoticonViewBoardName);
		var cookieValue = '';
		if(start != -1){
			start += emoticonViewBoardName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cookieValue = cookieData.substring(start+1, end);
		}
		return unescape(cookieValue);
	},
	Del: function(){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		document.cookie = emoticonViewBoardName + "= " + ";domain=dietshin.com;path=/; expires=" + expireDate.toGMTString();
	}
}

function emoticonIns(idx,nowno,chknum){
	var Maxkeywords = 200;

	if (idx != ""){
		var input_idx = "@"+idx+"/"+nowno+"@";
		var input_idx2 = "@"+idx+"/"+chknum+"@";

		if (emoticonViewBoard.Get() == ""){
			emoticonViewBoard.Set(input_idx2); 
		}else{
			if (emoticonViewBoard.Get().indexOf("@") < 0 ){
				emoticonViewBoard.Del();
			}
			
			var scharray = emoticonViewBoard.Get().split(",");
			var dupl_flg_= scharray.indexOf(input_idx);
			console.log(input_idx , dupl_flg_);
			if (dupl_flg_ > -1){
				scharray.splice(dupl_flg_, 1);
			}
			if (nowno != chknum )	{
				scharray.unshift(input_idx2);
			}			
			emoticonViewBoard.Set(scharray); 

			//최대 검색어 갯수 보다 많을때는 뒤에서 끊어버린다.
			if (scharray.length > Maxkeywords){ scharray.splice(Maxkeywords, scharray.length - Maxkeywords);}
		}
	}
}