
var GLOBAL=GLOBAL||{};
$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	
	$(".title_list .pen").click(function(){
		$(".title_list").animate({"width":"100px",backgroundPositionX:"-680px"},0,function(){
			$(".title_list").animate({"width":"780px",backgroundPositionX:"-320px"},1300);
		})
	})
	
	
	
	
	var likeTipsArr=["娘娘威武","皇上万岁，万万岁","爱死你啦、MUA~","再点一下试试~"];
	var ifLikebtnClicked=false;
	$(".like_btn").click(function(){
		if(!ifLikebtnClicked){
			ifLikebtnClicked=true;
			$(".like_tips").text(likeTipsArr[Math.floor(Math.random()*likeTipsArr.length)]);
			doMove();
		}else if(ifLikebtnClicked &&$(".like_tips").text()=="再点一下试试~"){
			$(".like_tips").text("喊你点就点 傻逼~");
			doMove();
			
		}
		
		function doMove(){
			$(".like_tips").animate({"top":"0",opacity:"1"},600,"elasticOut",function(){
				$(".like_tips").delay(600).animate({"left":"-500px",opacity:"0"},600,"backIn",function(){
					$(".like_tips").animate({"top":"379px","left":"258px",opacity:"0"},0)
					$(".like_btn").addClass("like_btn_cliked")
				});
			});
		}
		
		
		
	})
	
	loadArticleList();
	function loadArticleList(){
		if(getUrlParams("type")){
		var result=articleData[getUrlParams("type")+getUrlParams("articleId")];	
		
		$("#typeTitle").html(result.data.typeTitle)
		$("#typeEntitle").html(result.data.typeEntitle)
		$("#articleTitle").text(result.data.title)
		$("#updateTime").text(result.data.updateAt)
		$("#cover").attr("src",result.data.coverImg)
		$("#author").text(result.data.creatByFullName);
		$("#content").html(result.data.content)
			
		}

	}
	
	function getUrlParams(name){
//		var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");    //type=xiaoniaoNews,"",xiaoniaoNwes,""
		var r=window.location.search.substr(1)
//		var r=window.location.search.substr(1).match(reg);
		var z=r.split("&");
		var na=z[0].split("=");
		var acid=z[1].split("=");
		
		if(r!=null){
			if(name=="type"){
		return na[1];
		}else{
		return acid[1];
		}
		}
		else
		return "";
//		if(r!=null)
//		return r[2];
//		else
//		return "";
		
		
	}
})
