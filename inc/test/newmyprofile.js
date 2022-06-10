

function nicknamefocus(){
	var vals=$("#NICKNAME").val();
	if (vals == "닉네임을 입력하세요"){
		$("#NICKNAME").val("");
	}
}

function byearfocus(){
	var vals=$("#BYEAR").val();
	if (vals == "년도"){
		$("#BYEAR").val("");
	}
}

function nickreg(){
	var checkCnt = $("input[name=SEX]:checked").size();
	if (checkCnt == 0){
		alert("성별을 선택해 주세요");
		return false;
	}

	var sex=$(':radio[name="SEX"]:checked').val();

	var now=new Date();
	if (trim($("#BYEAR").val()) == "" || trim($("#BYEAR").val()) == "년도" || isNaN($("#BYEAR").val()) || parseInt($("#BYEAR").val()) < 1900 || parseInt($("#BYEAR").val()) > now.getFullYear() ){
		alert("생년월일 생년을 확인해 주세요");
		$("#BYEAR").focus();
		return false;
	}

	if ($("select[name=BMONTH]").val() == ""){
		alert("생년월일 월을 선택해 주세요");
		return false;
	}

	if ($("select[name=BDAY]").val() == ""){
		alert("생년월일 일을 선택해 주세요");
		return false;
	}

	var stature=parseFloat(trim($("#STATURE").val()));
	if (stature == "" || isNaN(stature) || stature < 50 || stature > 220)	{
		alert("키값을 확인해 주세요.");
		$("#STATURE").focus();
		return false;
	}

	var weight=parseFloat(trim($("#WEIGHT").val()));
	if (weight == "" || isNaN(weight) || weight < 20 || weight > 180)	{
		alert("몸무게를 확인해 주세요.");
		$("#WEIGHT").focus();
		return false;
	}
	var byear=$("#BYEAR").val();
	var bmonth=$("select[name=BMONTH]").val();
	var bday=$("select[name=BDAY]").val();

	////여기부터 BMIDATA관련저장
	var bmi_data=weight / (stature*stature) * 10000;
	bmi_data=bmi_data.toFixed(1);
	var bmi_device_id = window.DietBridge.getDeviceId();
	$.ajax({
		type	: "post",
		url		: "/V25/API/bmi_data.asp",
		data	: {"sex":sex,"birthyear":byear,"birthmon":bmonth,"birthday":bday,"height":stature,"weight":weight,"bmi":bmi_data,"device_id":bmi_device_id},
		dataType	: "html",
		success : function(oResult){
		}
	});
	///여기까지 BMIDATA저장

	if (gn_sex == ""){
		setNick("","",sex,byear,bmonth,bday,stature,weight,"","","","","","");
		alert("등록하였습니다.");
		location.replace("myprofile_view.asp");
	}else{
		setNick("","",sex,byear,bmonth,bday,stature,weight,"","","","","","");
		alert("수정하였습니다.");
		location.replace("myprofile_view.asp");
	}
}


function View(){
	if (gn_sex ==""){
		$("#BYEAR").val("년도");
	}else{
		$("#BYEAR").val(gn_byear);
	}
	$("input[name=SEX]:input[value="+gn_sex+"]").attr("checked",true);
	$("#BMONTH").val(gn_bmonth);
	$("#BDAY").val(gn_bday);
	$("#STATURE").val(gn_stature);
	$("#WEIGHT").val(gn_weight);
	
}

function setNick(nick_idx,nickname,sex,byear,bmonth,bday,stature,weight,goal_weight,goal_term,goal_term_type,active_mass,day_target_cal,day_exercise_cal){
	var jsonArr={"nick_idx":""+nick_idx+"","nickname":""+nickname+"","sex":""+sex+"","byear":""+byear+"","bmonth":""+bmonth+"","bday":""+bday+"","stature":""+stature+"","weight":""+weight+"","goal_weight":""+goal_weight+"","goal_term":""+goal_term+"","goal_term_type":""+goal_term_type+"","active_mass":""+active_mass+"","day_target_cal":""+day_target_cal+"","day_exercise_cal":""+day_exercise_cal+""};
	jsonArr=JSON.stringify(jsonArr);
	if  (typeof(window.DietBridge) == "object"){
		window.DietBridge.setProfileJsonData(jsonArr);
	}
}


function myInfo(){
	var gn_sex = $("#sex").val();
	var gn_byear = $("#byear").val();
	var gn_bmonth = $("#bmonth").val();
	var gn_bday = $("#bday").val();
	var gn_stature = $("#stature").val();
	var gn_weight = $("#weight").val();

	if (gn_sex == "M"){
		$("#SEX").html("남자");
	}else if(gn_sex == "F"){
		$("#SEX").html("여자");
	}
	$("#BIRTHDAY").html(gn_byear+"년"+gn_bmonth+"월"+gn_bday+"일");
	$("#STATURE").html(gn_stature+"cm");
	$("#WEIGHT").html(gn_weight+"kg");
	
	var av=24;
	var xy="";
	var bmi=gn_weight / (gn_stature*gn_stature) * 10000;
	bmi=bmi.toFixed(1);

	if (bmi <= 18.5){
		xy=bmi*0.9;
		$("#bmi_text").html("당신의 비만도(BMI) 지수는 "+bmi+"로 <strong class=\"p-red\">“저체중”</strong> 입니다.");
	}else if(bmi > 18.5  && bmi < 23){
		xy=bmi*1.6;
		$("#bmi_text").html("당신의 비만도(BMI) 지수는 "+bmi+"로 <strong class=\"p-red\">“정상”</strong> 입니다.");
	}else if(bmi >= 23  && bmi < 25){
		if (bmi == 23){
			xy=bmi*1.73;
		} else {
			xy=bmi*2.1;
		}
		$("#bmi_text").html("당신의 비만도(BMI) 지수는 "+bmi+"로 <strong class=\"p-red\">“과체중”</strong> 입니다.");
	}else if(bmi >= 25  && bmi < 30){
		if (bmi <= 25){
			xy=parseInt(bmi*2.41);
		} else if (bmi <= 26){
			xy=bmi*2.47;
		} else if (bmi <= 27){
			xy=bmi*2.51;
		} else if (bmi <= 28){
			xy=bmi*2.57;
		} else if (bmi <= 29){
			xy=bmi*2.61;
		} else if (bmi < 30){
			xy=bmi*2.61;
		}
		$("#bmi_text").html("당신의 비만도(BMI) 지수는 "+bmi+"로 <strong class=\"p-red\">“비만”</strong> 입니다.");
	}else{
		if (bmi <= 30){
			xy=bmi*2.65;
		}else if (bmi <= 31){
			xy=bmi*2.68;
		}else if (bmi <= 32){
			xy=bmi*2.71;
		}else if (bmi <= 33){
			xy=bmi*2.74;
		}else{
			xy=34*2.77;
		}
		$("#bmi_text").html("당신의 비만도(BMI) 지수는 "+bmi+"로 <strong class=\"redorang2\">“고도비만”</em> 입니다.");
	}
	$("#bmicnt").html(bmi);

	if (bmi > 0){
		$("#grapnavi").css({"position":"absolute","top":"25px","display":"block","width":"28px","left":xy+"%"});
	}else{
		$("#grapnavi").css({"position":"absolute","top":"25px","display":"block","width":"28px","left":xy+"%"});
	}
}

function myCalInfo(){
	if (gn_sex == "")	{
		if  (typeof(window.DietBridge) == "object"){
			showToast("기본정보를 입력해 주세요.");
		}else{
			alert("기본정보를 입력해 주세요.");
		}
		location.replace("myprofile.asp");
	}
	if (gn_goal_term_type == ""){
		gn_goal_term_type="D";
	}
	$("#STATURE").html(gn_stature+"cm");
	$("#WEIGHT").html(gn_weight+"kg");
	$("#GOAL_WEIGHT").val(gn_goal_weight);
	$("#GOAL_TERM").val(gn_goal_term);
	$("#GOAL_TERM_TYPE").val(gn_goal_term_type);
	$("input[name=ACTIVE_MASS]:input[value='"+gn_active_mass+"']").attr("checked",true);
	if (gn_goal_term_type == "M"){
		$("#GOAL_TERM_IMG").attr("src","/img/btn_month.png");
	}else{
		$("#GOAL_TERM_IMG").attr("src","/img/btn_day.png");
	}
}

function ImgChange(){
	goal_term_type=$("#GOAL_TERM_TYPE").val();
	if (goal_term_type == "M"){
		$("#GOAL_TERM_IMG").attr("src","/img/btn_day.png");
		$("#GOAL_TERM_TYPE").val("D");
	}else{
		$("#GOAL_TERM_IMG").attr("src","/img/btn_month.png");
		$("#GOAL_TERM_TYPE").val("M");
	}
}

function detailreg(){
	var goal_weight=parseFloat(trim($("#GOAL_WEIGHT").val()));
	if (goal_weight == "" || isNaN(goal_weight))	{
		alert("목표 체중을 확인해 주세요.");
		$("#GOAL_WEIGHT").focus();
		return false;
	}
	var goal_term=trim($("#GOAL_TERM").val());
	if (goal_term == "" || isNaN(goal_term) )	{
		alert("체중 감량 기간을 확인해 주세요.");
		$("#GOAL_TERM").focus();
		return false;
	}
	var goal_term_type=$("input[name=GOAL_TERM_TYPE]").val();
	var active_mass = $(':radio[name="ACTIVE_MASS"]:checked').val();
	if (goal_term_type == "M"){
		var goal_term_text=goal_term+"개월";
	}else{
		var goal_term_text=goal_term+"일";
		goal_term_type="D";
	}
	if(confirm("목표체중"+goal_weight+"kg 감량기간 "+goal_term_text+"이 맞습니까?")){
		if  (typeof(window.DietBridge) == "object"){
			var jsonArr = window.DietBridge.getProfileJsonData();
			var nick=JSON.parse(jsonArr);
			gn_sex=nick.sex;
			gn_byear=nick.byear;
			gn_bmonth=nick.bmonth;
			gn_bday=nick.bday;
			gn_stature=nick.stature;
			gn_weight=nick.weight;
		}
		//2014.07.29 추가
		if (goal_term_type=="M"){
			var target_term=30*parseInt(goal_term);
		}else{
			var target_term=parseInt(goal_term);
		}

		var av_weight=(gn_stature-100)*0.9;			//표준체중
		var beauty_weight=av_weight-6;				//미용체중
		var av_weight_float=av_weight.toFixed(1);	
		var beauty_weight_float=beauty_weight.toFixed(1);
		var now=new Date();
		var age=now.getFullYear()-parseInt(gn_byear)+1;
		//기초대사량
		if (gn_sex == "F"){
			var basic_met=247-(2.67*age)+401.5*(parseFloat(gn_stature)/100)+8.60*parseFloat(gn_weight);
		}else{
			var basic_met=293-(3.8*age)+456.4*(parseFloat(gn_stature)/100)+10.12*parseFloat(gn_weight);
		}

		basic_met=parseFloat(basic_met);
		var active_met=parseFloat(basic_met*active_mass);
		var digest_met=parseFloat(((basic_met+active_met)/0.9)*0.1);
		var all_met = basic_met+active_met+digest_met;
		var minus_weight=parseFloat(gn_weight)-parseFloat(goal_weight);
		var target_cal			= 7700*minus_weight;		//목표감량
		var day_cal			= target_cal / target_term;		//일일감량 칼로리
		var day_target_cal	= all_met - day_cal;			//일일 목표칼로리
		var day_eat_cal		= day_target_cal*1.2;			//음식칼로리
		var day_exercise_cal = day_target_cal * 0.2;		//운동칼로리

		if (parseInt(day_eat_cal) < 0){
			day_eat_cal=800;
			if (day_target_cal < 0){
				day_target_cal=day_target_cal * -1;
			}
			day_exercise_cal=day_eat_cal+parseInt(day_target_cal);
			//$("#TR_CAL").hide();
		}else if (parseInt(day_eat_cal) <= 800){
			//day_eat_cal=800;
			//day_exercise_cal=day_eat_cal-parseInt(day_target_cal) +parseInt(day_exercise_cal);
			day_exercise_cal=800-parseInt(day_eat_cal) +parseInt(day_exercise_cal);
			day_eat_cal=800;
			//$("#TR_CAL").hide();
		}
		//2014.07.29 여기까지 추가
		setNick("","","","","","","","",goal_weight,goal_term,goal_term_type,active_mass,day_eat_cal,day_exercise_cal);
		if(parseInt(window.DietBridge.getAppVersionCode()) >= 15){
			var ymds=$("#SYEAR").val()+""+$("#SMONTH").val()+""+$("#SDAY").val();
			window.DietBridge.setDietDday(ymds);
		}
		location.replace("myprofile_calorie_view.asp");
	}
}

function myCalDetailInfo(){
	var gn_sex = $("#sex").val();
	var gn_stature = $("#stature").val();
	var gn_weight = $("#weight").val();
	var gn_goal_weight = $("#goal_weight").val();
	var gn_byear = $("#byear").val();
	var gn_bmonth = $("#bmonth").val();
	var gn_bday = $("#bday").val();
	var gn_goal_term = $("#goal_term").val();
	var gn_goal_term_type = $("#goal_term_type").val();
	var gn_active_mass = $("#active_mass").val();

	$("#GOAL_TERM").html(gn_weight+"kg");
	$("#WEIGHT").html(gn_weight+"kg");
	if (gn_goal_term_type=="M"){
		$("#GOAL_TERM").html(gn_goal_term+"개월");
		var target_term=30*parseInt(gn_goal_term);
	}else{
		$("#GOAL_TERM").html(gn_goal_term+"일");
		var target_term=parseInt(gn_goal_term);
	}
	$("#GOAL_WEIGHT").html(gn_goal_weight+"kg");

	var av_weight=(gn_stature-100)*0.9;			//표준체중
	var beauty_weight=av_weight-6;				//미용체중
	var av_weight_float=av_weight.toFixed(1);	
	var beauty_weight_float=beauty_weight.toFixed(1);
	$("#AV_WEIGHT").html("<span class=\"p-bk\">표준체중 "+av_weight_float+"</span> / 미용 추천 체중 <span class=\"p-bk\">"+beauty_weight_float+"</span> 입니다.");
	var now=new Date();
	var age=now.getFullYear()-parseInt(gn_byear)+1;
	//기초대사량
	if (gn_sex == "F"){
		var basic_met=247-(2.67*age)+401.5*(parseFloat(gn_stature)/100)+8.60*parseFloat(gn_weight);
	}else{
		var basic_met=293-(3.8*age)+456.4*(parseFloat(gn_stature)/100)+10.12*parseFloat(gn_weight);
	}

	basic_met=parseFloat(basic_met);
	var active_met=parseFloat(basic_met*gn_active_mass);
	var digest_met=parseFloat(((basic_met+active_met)/0.9)*0.1);
	var all_met = basic_met+active_met+digest_met;
	$("#ALL_MET").html(parseInt(all_met)+"kcal");
	
	//$("#BASIC_MET_IMG").css("width",parseInt(basic_met/all_met*320));
	//$("#ACTIVE_MET_IMG").css("width",parseInt(active_met/all_met*320));
	//$("#DIGEST_MET_IMG").css("width",parseInt(digest_met/all_met*320));

	$("#BASIC_MET").html(parseInt(basic_met));
	$("#ACTIVE_MET").html(parseInt(active_met));	
	$("#DIGEST_MET").html(parseInt(digest_met));
	$("#BASIC_MET").css("width",parseInt(basic_met/all_met*681));
	$("#ACTIVE_MET").css("width",parseInt(active_met/all_met*681));
	$("#DIGEST_MET").css("width",parseInt(digest_met/all_met*681));

	var minus_weight=parseFloat(gn_weight)-parseFloat(gn_goal_weight);
	var target_cal			= 7700*minus_weight;		//목표감량
	var day_cal			= target_cal / target_term;		//일일감량 칼로리
	var day_target_cal	= all_met - day_cal;			//일일 목표칼로리
	var day_eat_cal		= day_target_cal*1.2;			//음식칼로리
	var day_exercise_cal = day_target_cal * 0.2;		//운동칼로리

	if (parseInt(day_eat_cal) < 0){
		day_eat_cal=800;
		if (day_target_cal < 0){
			day_target_cal=day_target_cal * -1;
		}
		day_exercise_cal=day_eat_cal+parseInt(day_target_cal);
		//$("#TR_CAL").hide();
	}else if (parseInt(day_eat_cal) <= 800){
		//day_eat_cal=800;
		//day_exercise_cal=day_eat_cal-parseInt(day_target_cal) +parseInt(day_exercise_cal);
		day_exercise_cal=800-parseInt(day_eat_cal) +parseInt(day_exercise_cal);
		day_eat_cal=800;
		//$("#TR_CAL").hide();
	}

	/**
	if (parseInt(window.DietBridge.getAppVersionCode()) < 22){
		setNick("","","","","","","","","","","","",day_eat_cal,day_exercise_cal);
	}
	**/
	//$("#TARGET_CAL").html(parseInt(day_target_cal)+"kcal");
	$("#DAY_EAT_CAL").html(parseInt(day_eat_cal)+"kcal");
	$("#DAY_EXERCISE_CAL").html(parseInt(day_exercise_cal)+"kcal");
}

