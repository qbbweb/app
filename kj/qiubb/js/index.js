$(function(){
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	
	
	(function(){
	var oDiv=$(".banner_wrap")
	var oPerv=oDiv.find(".prev")
	var oNext=oDiv.find(".next")
	var aSpan=oDiv.find(".middle span")
	var animateFather=null;
	var nowIndex=0;
	
	animateFather=$(".banner_one").eq(0);
	animateImage();
	
	oNext.click(function(){
		if(nowIndex<aSpan.length-1){
			nowIndex++;
		}else{
			nowIndex=0;
		}
		bannerAnimate();
	})
	oPerv.click(function(){
		if(nowIndex>0){
			nowIndex--;
		}else{
			nowIndex=aSpan.length-1;
		}
		bannerAnimate();
	})
	aSpan.click(function(){
		nowIndex=$(this).index();
		bannerAnimate();
		
	})
	function bannerAnimate(){
		aSpan.removeClass("now");
		aSpan.eq(nowIndex).addClass("now");
		$(".banner_one").fadeOut();
		animateFather=$(".banner_one").eq(nowIndex);
		animateFather.fadeIn();
		animateImage()
	}
	function animateImage(){
		animateFather.find("img").eq(0).show().addClass("animated fadeInLeft")
		setTimeout(function(){
			animateFather.find("img").eq(1).show().addClass("animated fadeInLeft")
			animateFather.find("img").eq(2).show().addClass("animated fadeInLeft")
		},300)
	}
	
})();



    (function(){
    	var Mokuai=$("#chanpin01");
    	var oPrev=Mokuai.find(".prev");
    	var oNext=Mokuai.find(".next");
    	var line=Mokuai.find(".now_line");
    	var oSpan=line.find("span");
    	var conOne=Mokuai.find(".content_one");
    	var nowIndex=0;
    	
    	
    	
    	oPrev.click(function(){
    		if(nowIndex>0){
			   nowIndex--;
		    }else{
			   nowIndex=oSpan.length-1;
		    }
		    dofade("fadeInLeft")
    	})
    	oNext.click(function(){
		   if(nowIndex<oSpan.length-1){
			nowIndex++;
		   }else{
			nowIndex=0;
		   }
		  dofade("fadeInRight")
	    })
    	oSpan.each(function(i,elem){
    		console.log(i)
    		$(this).click(function(){
		    var act=(i>nowIndex)?"fadeInRight":"fadeInLeft";
		    nowIndex=i;
	        dofade(act);
    	})
		
	})
    	function dofade(action){
    		line.find(".now_linebtn_one").removeClass("now").eq(nowIndex).addClass("now");
    		conOne.hide().eq(nowIndex).fadeIn();
    		conOne.eq(nowIndex).find("h1,p,img").attr("class","").addClass("animated "+action);
    	}
    	
    })();
    
    $(".jianjie .now_line, .jianjie .change_line span").css("opacity",'0');
    
    
    (function(){
    	var oWrap=$(".yewucontent_wrap")
    	var oCen=$(".centerimg")
    	var Icon=$(".shousuo_icon")
    	var aCon=$(".yewucontent_ditail")
    	var nowIndex=0;
    	
    	oCen.add(Icon).hover(function(){
    		$(this).addClass("animated tada")
    	},function(){
    		$(this).removeClass("animated tada")
    	})
    	
    	oCen.click(function(){
    		nowIndex=oCen.index($(this));
    		doSlide();
    	})
    	Icon.click(function(){
    		nowIndex=Icon.index($(this));
    		doSlide();
    	})
    	function doSlide(){
    		if(Icon.eq(nowIndex).hasClass('zhankai')){
    			aCon.stop().slideUp();
    			Icon.removeClass("zhankai")
    		}else{
    			aCon.stop().slideUp().delay(300).eq(nowIndex).slideDown(300)
    			Icon.removeClass("zhankai").eq(nowIndex).addClass("zhankai")
    		}
    	}
    })();
    
    
    
    
    (function(){
    	$(".team_box .headimg").hover(function(){
    		
    		$(this).find("a").stop().fadeIn(300);
    	},function(){
    		$(this).find("a").stop().fadeOut(300);
    	})
    	
    	var oCont=$(".teamcontent_wrap");
    	var oWrap=$(".team_move");
    	var oPrev=oCont.find(".prev");
    	var oNext=oCont.find(".next");
    	var oDiv=oWrap.find(".twoteam_wrap");
    	nowIndex=0;
    	var pretime=null;
    	var nexttime=null;
    	var timer=null;
    	
    	oPrev.click(function(){
    		clearInterval(timer)
    		clearTimeout(pretime);
    		pretime=setTimeout(function(){
    			oLeft();
    			
    		},300)
    		zidong();
    	})
    	oNext.click(function(){
    		clearInterval(timer)
    		clearTimeout(nexttime);
    		nexttime=setTimeout(function(){
    			oRight();
    		},300)
    		zidong();
    	})
		  	oWrap.hover(function(){
		  		clearInterval(timer)
		 	},zidong)
		  	
    	function  zidong(){
    		
    		timer=setInterval(function(){
    			 oRight();
    		},3000)
    	}
  	zidong();
    	function oLeft(){
    		oWrap.find(".twoteam_wrap:last").insertBefore(oWrap.find(".twoteam_wrap:first"));
    	
	    		oWrap.animate({"left":"-1130px"},0);
	    		oWrap.animate({"left":"0"},1000,"backIn");
    		
    		nowIndex--;
    		if(nowIndex<0){
    			nowIndex=2;
    			
    		}
    		
    		oCont.find(".middle_points").find("span").removeClass("now").eq(nowIndex).addClass("now")
    	};
    	
    	function oRight(){
    		
    		oWrap.animate({"left":"-1130px"},1000,"backIn",function(){
    			oWrap.find(".twoteam_wrap:first").appendTo(oWrap);
    			oWrap.animate({"left":"0"},0);
    		})
    		nowIndex++;
    		if(nowIndex>2){
    			nowIndex=0;
    		}
    			
    		oCont.find(".middle_points").find("span").removeClass("now").eq(nowIndex).addClass("now")
    	}
    	
    	
    })();
    
    
    
    	var oInput=$(".input_box input,.input_box textarea");

    	oInput.focus(function(){
    		$(this).parent(".input_box").addClass("focus_input_box");
    	}).blur(function(){
    		oInput.parent(".input_box").removeClass("focus_input_box");
    	})
       
    	
    
    
})

