var GLOBLE=GLOBLE||{}
$(function(){
	$(".wrap_block, .main_wrap, .gaishu_block").css("height",($(window).height()-50)+"px");
	$(".gaishu_block").width($(window).width());
	
	$(window).resize(function(){
		$(".wrap_block, .main_wrap, .gaishu_block").css("height",($(window).height()-50)+"px");
//		$(".wrap_block, .main_wrap, .gaishu_block").css("width",($(window).width())+"px")
		$(".gaishu_block").width($(window).width());
//		调整页面大小的时候让整屏居中
	
		if(mainSlideIndex){
			if(GLOBLE.resizeTimer){
				clearInterval(GLOBLE.resizeTimer)
			}
			GLOBLE.resizeTimer=setTimeout(function(){
				mainSlideGoing=true;
				mainSlideGo();
				gaishuMove();
			},200)
		}
	})
	
	doWelcomeAnimate();
	function doWelcomeAnimate(){
		GLOBLE.welcomeAnimateTimer=setTimeout(function(){
			$(".welcome_content").animate({"top":"40%"},600);
			//each循环所有元素each循环绑定一个function index是当前元素的下标element-当前元素
			$(".welcome_content .welcome_animate").each(function(index,element){
				//获取当前元素
				var $this=$(this);
				//给当前元素设置延时器
				setTimeout(function(){
					//让当前元素显示添加动画
					$this.show().addClass("animated fadeInUp");
					//延时当前（index）*200毫秒
					
				},200*(index+1))
			});
			//设置延时器2.5让动画收起
			setTimeout(function(){
				//所有的JQ效果都能加回调函数 代表完成效果要做的事
				$(".welcome_wrap").slideUp(600,"easeOutStrong",function(){
					GLOBLE.welcomeOver=true;//用于鼠标上下滑动整屏滚动触发的判断条件
				});
			},2500);
		},4000);
	}
	
	//当点击欢饮页面两次后，自动收起，
	//用来判断是否点击 模仿做dbclick效果
	//锁
	var welcomeDBclick=false;
	$(".welcome_content").click(function(){
		if(welcomeDBclick){
			$(".welcome_wrap").slideUp(600,"easeOutStrong",function(){
				GLOBLEwelcomeOver=true;
			});
		}else{
			welcomeDBclick=true;
		}
	})
	
//	单页滚动开始
//  鼠标滚动实践绑定及检测 滚动的下标
	var mainSlideIndex=0;
	//判定页面是否在进行滚动 false代表没滚动
	var mainSlideGoing=false;
	//判定是否第一次滚动
	var mainSlideDelay=0
	var mainSlideTimer=null;
	var scrollFun=function(e){
		e=e||window.event;
		if(e.wheelDelta){//判断浏览器IE，谷歌滑轮事件
			if(e.wheelDelta>0){//当滑轮向上滚动时	
			!!GLOBLE.welcomeOver?mainSlideUp():"";
			}
			if(e.wheelDelta<0){//当滑轮向下滚动
				mainSlideDown();
			}
			
		}else if(e.detail){//Firefox滑轮事件
			if(e.detail>0){//当滑轮向下滚动时
			!!GLOBLE.welcomeOver?mainSlideUp():"";
			}
			if(e.detail<0){//当滑轮向上滚动时
				//alert("滑轮向上滚动ff")；
				mainSlideUp();
			}
		}
	}
	if(document.addEventListener){//firefox
		document.addEventListener('DOMMouseScroll',scrollFun,false);
	}
	//滚动滑轮触发scrollFun方法//ie 谷歌
	window.onmousewheel=document.onmousewheel=scrollFun;
//	向下滚
	function mainSlideDown(){
		if(mainSlideDown<1){//这个判断用于检测第一次鼠标滚动，让第二次鼠标滚动的时候，再执行页面效果
			clearInterval(mainSlideTimer);
			mainSlideTimer=setTimeout(function(){
				mainSlideDelay++;
			},100)
		}else if(!mainSlideGoing){
			mainSlideGoing=true;
			mainSlideIndex++;
			if(mainSlideIndex>$(".wrap_block").length-2){
				mainSlideIndex=$(".wrap_block").length-2;
			}
			mainSlideGo();
		}
	}
	
	
	//向上滚
	function mainSlideUp(){
		if(mainSlideDelay<1){
			clearInterval(mainSlideTimer);
			mainSlideTimer=setTimeout(function(){
				mainSlideDelay++;
			},100)
		}else if(!mainSlideGoing){
			mainSlideGoing=true;
			mainSlideIndex--;
			if(mainSlideIndex<0){
				mainSlideIndex=0;
			}
			mainSlideGo()
		}
	}
	
	//滚动方法
	function mainSlideGo(){
		$(".main_slide").animate({"top":"-"+$(".wrap_block").height()*mainSlideIndex+"px"},600,"easeBothStrong",function(){
			mainSlideGoing=false;
			mainSlideDelay=0;
			if(mainSlideIndex==0){
				
			}else if(mainSlideIndex==4){
				$(".nav_piece").removeClass("now").eq(mainSlideIndex-1).addClass("now");
				$(".nav_piece").eq(mainSlideIndex).addClass("now");
			}else{
				$(".nav_piece").removeClass("now").eq(mainSlideIndex-1).addClass("now");
			}
		});
	}
	
	//点击导航的时候 ，滚动到对应模块
	$(".nav_piece h1").click(function(){
		var navIndex=$(this).parent().index(".nav_piece");
		if(navIndex==4){
			navIndex=3;
		};
		if(navIndex !=5){
			mainSlideIndex=navIndex+1;
			mainSlideGo();
		}
	});
//	//在第一页的时候，点击向下翻页箭头
	$(".welcome2_content .donext").click(function(){
		mainSlideIndex=1;
		mainSlideGo();
	})
	//如果进入页面时，需要转跳到相应模块儿，执行下面函数
	var mainHash=window.location.hash.substring(1);
	if(mainHash){
		if(mainHash==0||mainHash==1||mainHash==2||mainHash==3||mainHash==4){
			$(".welcome_wrap").slideUp(0,function(){
				GLOBLE.welcomeOver=true;//用于鼠标上下滑动整屏滚动出发的判断条件
			});
			mainSlideIndex=mainHash;
			mainSlideGo();
			gaishuMove();
			window.location.hash="";
		}
	}
	
	
	
	
	$(".gaishu_goright").mouseenter(function(){
		$(this).removeClass("nohover");
	})
	var gaishuIndex=0;
	$(".gaishu_goleft").css("opacity",0.3);
	$(".gaishu_goright").click(function(){
		gaishuIndex++;
		
		if(gaishuIndex>2){
			gaishuIndex=2;
			$(".gaishu_goright").css("opacity",0.3);
		}else{
			gaishuMove();
		}
	});
	$(".gaishu_goleft").click(function(){
		gaishuIndex--;
		if(gaishuIndex<0){
			gaishuIndex=0;
			$(".gaishu_goleft").css("opacity",0.3);
		}else{
			gaishuMove();
		}
	})
	function gaishuMove(){
		$(".gaishu_goleft, .gaishu_goright").css("opacity",0.3);
		$(".gaishu_slider").animate({"left":"-"+$(".gaishu_block").width()*gaishuIndex+"px"},600,function(){
			$(".gaishu_goleft, .gaishu_goright").css("opacity",1);
		});
	}
	
	setInterval(function(){
		$(".jiazhi_shineimg").fadeIn(1000,function(){
			$(".jiazhi_shineimg").delay(100).fadeOut(800);
		})
	},1900);
	
	
	
	var slide=$(".xiaoniaoyun .yun_slider")

	$(".yunmove_btn_left").click(function(){
		$This=$(this)
		$(".yunmove_btn.now").animate({"left":"-78px"},100,function(){
			$(".yunmove_btn.now").removeClass("now")
			$This.find(".yunmove_btn").animate({"left":"0px"},400).addClass("now")
		})
		$(".yun_slider").animate({"left":"0"},600)	
	});
	$(".yunmove_btn_right").click(function(){
		$This=$(this)
		$(".yunmove_btn.now").animate({"left":"78px"},100,function(){
			$(".yunmove_btn.now").removeClass("now")
			$This.find(".yunmove_btn").animate({"left":"0px"},400).addClass("now")
		})
		$(".yun_slider").animate({"left":"-910px"},600)	
	});
   
	
})
