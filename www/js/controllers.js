angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$ionicSideMenuDelegate,$rootScope,$http,$ionicSlideBoxDelegate,locals,shareData) {
  if(!(locals.get("isLoad")=="isLoad")){
    window.location.href="#/tab/lunbotu"
  }
	$scope.dj=function(){
		$ionicSideMenuDelegate.toggleLeft();

	};


	$http.post($rootScope.URLAdmin+"/Handler/OfflineCourseHandler.ashx?action=indexshow","")
	.success(function(res){
    console.log(res)
		$scope.lunbo=res.data.bannerList;

//		好评榜
		$scope.hpb=[[res.data.goodList[0],res.data.goodList[1]],[res.data.goodList[2],res.data.goodList[3]]];

//		最新课程

		$scope.zxkc=[[res.data.newList[0],res.data.newList[1]],[res.data.newList[2],res.data.newList[3]]];

		$ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
		$ionicSlideBoxDelegate.$getByHandle("slideimgs").loop("ture");

		$scope.cnxh=res.data.chooseList
	});
  $scope.xxml=function (myId) {
    window.location="#/tab/study/"+myId
  }
  $scope.kec=function (myId) {
    window.location="#/tab/study/"+myId
  }
  $scope.lunbotu=function (myId) {
    window.location="#/tab/study/"+myId
  }
  $scope.youlike=function (myId) {
    window.location="#/tab/study/"+myId
  }
  //点击搜索，跳转到课程列表项，并设置需要 传过去的参数
  $scope.doSearch=function () {
//console.log($scope.searchText);
    if($scope.searchText){
      shareData.set('indexSearchText',$scope.searchText);
      $scope.searchText='';
      window.location.href="#/tab/lessonlist";
    }
  };

  //搜索框点击键盘搜索键
  $scope.myKeyup=function (e) {
    var keycode=window.event?e.keyCode:e.which;
    if(keycode==0||keycode==13){//keycode==0表示点击手机输入go键
      $scope.doSearch();
    }
  };

})
//课程列表
.controller('LessonlistCtrl', function($scope,$http,$rootScope,shareData,$timeout) {


//请求专业分类子级内容数据
  $http.post($rootScope.URLAdmin+"/Handler/OfflineCourseHandler.ashx?action=getcategory","")
    .success(function (res) {
      $scope.flm=res.data;
    });
  $scope.shuju=[
    {id:0,btnName:"全部"},
    {id:1,btnName:"免费"},
    {id:2,btnName:"收费"}

  ]

  //课程列表单击事件
  //列表show，hide
  $scope.lilist=false;
  $scope.lcolor={color:"#333"}
  $scope.courselist=function () {
    //让变量不等于自己来完成切换
    $scope.lilist=!$scope.lilist;
    //隐藏价格列表
    $scope.prlist=false;
    //假如列表变灰
    $scope.pcolor={color:'#333'};
  //假如课程列表显示
    if($scope.lilist==true){
      //变蓝的
      $scope.lcolor={color:"#63aafc"}
    }else{
      // 否则变灰
      $scope.lcolor={color:"#333"};
    }
  }

  //价格单击事件
  $scope.price=function () {
    $scope.prlist=!$scope.prlist;
    $scope.lilist=false;
    $scope.lcolor={color:"#333"};
    if($scope.prlist==true){
      $scope.pcolor={color:"#63aafc"}
    }else {
      $scope.pcolor={color:"#333"};
    }
  }

  //定义加载数据列表数据初始数据
  $scope.nowPage=0;
  $scope.lists=[];
  $scope.searchText="";
  $scope.CategoryId="";
  $scope.CpriceId="";

  //判断是否为首页点击搜索跳转过来的。如果是，执行搜索结果
  if(shareData.get('indexSearchText')){
    $scope.searchText=shareData.get("indexSearchText");
    shareData.set("indexSearchText","");
  }
  $scope.goPage=function (pageStart) {
    // console.log($scope.moredata);
    //当开始ajax的时候停止加载
    $scope.moredata=false;
    //列表数据请求需要提交的数据
    var myData={
      "pageStart":pageStart,//第几页
      "searchText":$scope.searchText,//搜索的专业名称
      "CategoryTwo":$scope.CategoryId,//专业id
      "CpriceId":$scope.CpriceId//价格id
    };
console.log(myData)
    //发送列表数据请求
    $http.post($rootScope.URLAdmin+"/Handler/OfflineCourseHandler.ashx?action=courseshow",myData)
      .success(function (res) {
        //算出一共有几页数据          //总共/每页个数
        $scope.totalPage=Math.ceil(res.data.count/res.data.pageStart);
        //把本业数据加载到list中
        $scope.lists=$scope.lists.concat(res.data.list);
        //现在加载的是那一页 赋值给nowpage
        $scope.nowPage=res.data.pageStart;

        //总页数>当前页
        if($scope.totalPage>res.data.pageStart){
          $scope.moredata=true;//恢复加载
        }
      });

  };
  //$scope.lists=courseLists.page(1);
  //上拉加载更多数据loadMore函数
  $scope.moredata=true;//为true时加载数据
  $scope.loadMore=function () {
    if($scope.moredata){
      //调用接口的方法 传pagestart
      $scope.goPage($scope.nowPage+1);
      $scope.$broadcast('scroll.infiniteScrollComplete')
    }
  };
  $scope.$on('$stateChangeSuccess',function () {
    $scope.loadMore();
  })

  //点击筛选或搜索执行搜索函数
  $scope.pricouSearch=function (searchText,CategoryId,CpriceId) {
    $scope.searchText=searchText;
    $scope.CategoryId=CategoryId;
    $scope.CpriceId=CpriceId;

    $scope.nowpage=0;
    $scope.lists=[];
    $scope.moredata=true;//没有更多数据
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $scope.lilist=false;
    $scope.prlist=false;
    $scope.lcolor={color:"#333"};
    $scope.pcolor={color:"#333"}
    $scope.loadMore();
  }

  //点击键盘的go键执行搜索
  $scope.myKeyup=function (e) {
    var keycode=window.event?e.keycode:e.which;
    if(keycode==0||keycode==13){
      //console.log("搜索:"+$scope.searchInputText);
      $scope.pricouSearch($scope.searchInputText,'','');
      $scope.searchInputText="";
    }
  }

  //下拉刷新
  $scope.doRefresh=function () {
    $timeout(function () {
      $scope.pricouSearch("","全部","");
      $scope.$broadcast("scroll.refreshComplete");

    },1000);
  }

  //点击进入学习页
  $scope.tz_study=function (myId) {
    window.location="#/tab/lessonlistStudy/"+myId
  }

})

// 我的课程
.controller('MycourseCtrl', function($scope,$rootScope,$http) {


    //先设置让其显示“请登录”
     $scope.dl_tf=true;
      $http.get($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=mycourse","")
        .success(function(res){
          console.log(res)
            $scope.dl_tf=false;
            $scope.itemFir=res.data;
        })


  //收藏课程数据
  $http.get($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=mycollection","")
    .success(function (res) {

      $scope.itemSec=res.data;
    });

  //我的课程 点击
  $scope.mycou=true;
  $scope.mycol=false;
  $scope.color={color:"#63aafc"};
  $scope.colorc={color:"#333"};
  $scope.mylesson=function () {
    $scope.data.showDelete=false;
    $scope.mycou=true;
    $scope.mycol=false;
    $scope.color={color:"$63aafc"};
    $scope.colorc={color:"#333"};
  }

  // 收藏课程点击
  $scope.course=function () {
    $scope.data.showDelete=false;
    $scope.mycou=false;
    $scope.mycol=true;
    $scope.color={color:"#333"}
    $scope.colorc={color:"#63aafc"};
  }
  //先定义的显示隐藏删除按钮的数据
  $scope.data={
    showDelete:false
  };
//删除我的收藏
  $scope.onItemDelete=function (item) {
    var myId={
      courseId:item.ID
    };
    $http.post($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=deletecollection",myId)
      .success(function (res) {

      })
  }
  //分享
  $scope.doShare = function(id){
    window.plugins.socialsharing.share('给你分享一个很棒的课程', null, null,$rootScope.URLAdmin+'/www/index.html#/tab/lesslistStudy/'+id)
  };

  //$scope.itemSec=courseSecond.all()

  //跳转到学习页面
  $scope.tz_study=function (myId) {
    window.location="#/tab/myStudy/"+myId
  }
})
  // 个人中心
.controller('PersonalCtrl', function($scope,$rootScope,$http,$ionicPopup) {
// 防止页面调试过程中的页面切换导致下部tabs隐藏了，无法切换，这里设置切换到登录页的时候，显示tabs
  $rootScope.hideTabs=false;
  //是否登录请求，如果已登录，直接跳转到个人信息页
  $scope.loginuser={};
  //输入框数据
  $http.post($rootScope.URLAdmin+"/Handler/UserHandler.ashx?action=isLogin","")
    .success(function(res){
      if(res.success){
        window.location="#/tab/information"
      }
      })
      //---------------
  $scope.dlu=function (loginuser) {

    if(!!loginuser.userName&&!!loginuser.userPwd){
      $http.post($rootScope.URLAdmin+'/Handler/UserHandler.ashx?action=login',loginuser)
        .success(function (res) {
          if(res.success){
            window.location="#/tab/information"
          }else{
            $ionicPopup.alert({
              title:'提示',
              template:res.err
            })
          }
        })

    }else{
      $ionicPopup.alert({
        title:'提示',
        template:'不能为空'
      })
    }

    }
})
  // 注册
.controller('RegisterCtrl', function($scope,$rootScope,$http,$ionicPopup) {
	$scope.inof={
		userName:"",
		email:"",
		phone:"",
		userPwd:"",
		userPwdt:"",
		nickname:"",
		userPic:""
	};

	$scope.pangduan=function(inof){
		console.log(inof);
		var email_yz  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    	var photo_yz = /^1\d{10}$/;
    	if(!!inof.userName&&!!!!inof.email&&!!inof.phone&&!!inof.userPwd&&!!inof.userPwdt){
    		if(!email_yz.test(inof.email)){
    			$ionicPopup.alert({
    				title:"提示信息！",
    				template:"邮箱格式不正确，请重新输入"
    			})
    		}else if(!photo_yz.test(inof.phone)){
    			$ionicPopup.alert({
    				title:"提示信息！",
    				template:"请输入正确的手机号码"
    			})
    		}else if(inof.userPwd=!inof.userPwd){
    			$ionicPopup.alert({
    				title:"提示信息！",
    				template:"两次密码不正常，请重新输入"
    			})
    		}else{
    			var myInfor={
    				userName:$scope.inof.userName,
					email:$scope.inof.email,
					phone:$scope.inof.phone,
					userPwd:$scope.inof.userPwd,
					nickname:"",
					userPic:""
    			};
    console.log(myInfor)
    			$http.post($rootScope.URLAdmin+"/Handler/UserHandler.ashx?action=add",myInfor)
			.success(function(res){
			if(res.err){
				$ionicPopup.alert({
					title:"提示信息！",
					template:res.err
				});
			}else{
				$ionicPopup.alert({
					title:"提示信息！",
					template:"登录成功"
					});
				window.location="#/tab/information"
				}
				});
    		}
    	}else{
    		$ionicPopup.alert({
					title:"提示信息！",
					template:"请输入内容"
				});
    	}


	}




})

.controller('InformationCtrl', function($scope,$rootScope,$http) {
  $http.post($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=returnuserinfo","")
    .success(function (res) {
      console.log(res)
      $scope.name=res.nickname;
      $scope.email=res.email;
      $scope.phone=res.phone;
    });

  $scope.quit=function () {
    $http.post($rootScope.URLAdmin+"/Handler/UserHandler.ashx?action=quit","")
      .success(function (res) {
        window.location="#/tab/personal"
      })
  }

})
  .controller('StudyCtrl', function($scope,$rootScope,$http,$stateParams) {

    $scope.Vurl = 'video/mov_bbb.mp4';

    $scope.broadcast = function(url, Id){


      //视频播放兼容写法
      try{

        window.plugins.html5Video.initialize({
          "video1" : $rootScope.URLAdmin + url
        });
        $scope.pcTrue = false;

        if($scope.video_login==false && $scope.shadow.video_buy==false){

          window.plugins.html5Video.play("video1");

        }

      }catch (e){
        $scope.pcTrue = true;
        $scope.Vurl = $rootScope.URLAdmin + url;

      }

      //根据视频id设置当前播放的课件。
      for(var i=0;i<$scope.CDlists.length; i++){
        for (var j=0; j<$scope.CDlists[i].Vlist.length ; j++){
          if($scope.CDlists[i].Vlist[j].ID == Id){
            $scope.CDlists[i].Vlist[j].isViewing = true;
          }else{
            $scope.CDlists[i].Vlist[j].isViewing = false;
          }
        }
      }
    };


     var mydata = {
       courseId: $stateParams.myId
    }
    //=---------------点击切换
    $scope.color={color:"#63aafc"}
    $scope.ml_left=function () {
      $scope.mymulu=true;

      $scope.myxiangqing=false;
      $scope.color={color:"#63aafc"}
      $scope.colorc={color:"#000"}
    }
    $scope.xq_right=function () {
      $scope.mymulu=false;

      $scope.myxiangqing=true;
      $scope.color={color:"#000"}
      $scope.colorc={color:"#63aafc"}

    }
    $http.post($rootScope.URLAdmin+"/Handler/UserHandler.ashx?action=isLogin","")
      .success(function (res) {
        if(res.success) {
          $scope.video_login = false;
          $scope.mymulu=true;
          $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=learnshow",mydata)
            .success(function (res) {
              console.log(res)
              $scope.$broadcast("ifColecteds", res.data.ifColected);
              $scope.$broadcast("ifPays", res.data.ifPay);
              $scope.CDlists=res.data.CDlist;
              $scope.evaluates=res.data.evaluate.list;


              try{
                window.plugins.html5Video.initialize({
                  "video1" : $rootScope.URLAdmin + res.data.CDlist[0].Vlist[0].Vurl
                });
                $scope.pcTrue = false;
                if($scope.video_login==false && $scope.shadow.video_buy==false){
                  window.plugins.html5Video.play("video1");
                }
              }catch (e){
                $scope.pcTrue = true;
                $scope.Vurl = $rootScope.URLAdmin + res.data.CDlist[0].Vlist[0].Vurl;
              }

              //设置当前播放的课件。
              $scope.CDlists[0].Vlist[0].isViewing = true;


            })
        }else {
          /*未登录执行的代码*/
          $http.post($rootScope.URLAdmin+"/Handler/OfflineCourseHandler.ashx?action=learnshow", mydata)

            .success(function(response) {
              $scope.video_login = false;
              $scope.mymulu=true;
              $scope.footerPingjia=true;//单击评价不会出现弹窗
              $scope.starText = '收藏';
              $scope.video_login=true;//提示登录弹窗显示
              $scope.ifPaysText = '购买';
              $scope.CDlists = response.data.CDlist;
              $scope.$broadcast($rootScope.URLAdmin + response.data.CDlist[0].Vlist[0].Vurl,response.data.CDlist[0].Vlist[0].ID);
              //$scope.Vurl = $rootScope.URLAdmin + response.data.CDlist[0].Vlist[0].Vurl;
              $scope.Cname = response.data.Cname;
              $scope.evaluates = response.data.evaluate.list;
            });
        }
      })



  })
  /*底部tabs隐藏显示的指令*/
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function() {
          $rootScope.hideTabs=attributes.hideTabs;
        });

        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  .controller('StudytowCtrl', function($scope,$ionicModal,$http,$rootScope,$stateParams,$ionicPopup) {


      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.show=function(){
      $scope.modal.show()
    };
    $scope.close = function () {
      $scope.modal.hide();
    }

    $scope.createContact = function(textreaValue) {

      var mycomments = {
        courseId:$stateParams.myId,
        evaluate:textreaValue
      };
      if(textreaValue == ''){
        $ionicPopup.alert({
          title: '提示信息!',
          template: '请输入内容！'
        });
      }else{
        $http.post($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=addcoursecomments",mycomments)
          .success(function(res){
            console.log(res)
            $scope.modal.hide();
          })
      }
    }
    //调用父ctrl绑定的数据
    $scope.$on("ifColecteds",
      function (event, msg) {
        if(msg){
          $scope.star="";
          $scope.starText="已收藏"
          $scope.text={color:"#63aafc"}

        }else {
          $scope.star="-outline"
          $scope.starText="收藏"
          $scope.text={color:"#000"}

        }
        console.log(1,msg)
      });
    $scope.$on("ifPays",
      function (event, msg) {
        if(msg){
        $scope.ifPaysText="已购买"
          $scope.down=""
          $scope.texts={color:"#63aafc"}
        }else {
          $scope.ifPaysText="购买"
          $scope.down="-outline"
          $scope.texts={color:"#999"}

        }

      });

   //收藏
    $scope.collect=function () {

      var courseIds={courseId:$stateParams.myId}
      $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=collection",courseIds)
        .success(function (res) {
        console.log(2,res.ifColected)
          if(res.ifColected){
            $scope.star="";
            $scope.starText="已收藏"
            $scope.text={color:"#63aafc"}
          }else {
            $scope.star="-outline"
            $scope.starText="收藏"
            $scope.text={color:"#000"}
          }
        })
    }
    //购买
    $scope.buys= function(){

      var myID={
        courseId:$stateParams.myId
      }

      //设置支付测试数据
      var charge={"id":"ch_ez9a5O9GSCy5fj5afHTGmvHG","object":"charge","created":1442542657,"livemode":false,"paid":false,"refunded":false,"app":"app_ir1uHKe9aHaL9SWn","channel":"upacp","order_no":"123456789","client_ip":"127.0.0.1","amount":100,"amount_settle":0,"currency":"cny","subject":"Your Subject","body":"Your Body","extra":{},"time_paid":null,"time_expire":1442546257,"time_settle":null,"transaction_no":null,"refunds":{"object":"list","url":"/v1/charges/ch_ez9a5O9GSCy5fj5afHTGmvHG/refunds","has_more":false,"data":[]},"amount_refunded":0,"failure_code":null,"failure_msg":null,"metadata":{},"credential":{"object":"credential","upacp":{"tn":"201509181017374044084","mode":"00"}},"description":null};

      //发起模拟支付
      try{
        pingpp.createPayment(charge, function(result){
          //alert('suc: '+result);  //"success"

          //支付成功，请求后台，变更课程为已购买
          $http.post($rootScope.URLAdmin + "/Handler/OnCourseHandler.ashx?action=buy",myID)
            .success(function (res) {
              console.log(3,res)

                $scope.ifPaysText="已购买"
                $scope.down=""
                $scope.texts={color:"#63aafc"}
                $scope.shadow.video_buy=false;

            })
        }, function(result){
          alert('err: '+result);  //"fail"|"cancel"|"invalid"
        });
      }
      catch(e){
        alert(e);
        //如果报错，说明是在浏览器浏览的，也请求后台，变更课程为已购买
        $http.post($rootScope.URLAdmin+"/Handler/OnCourseHandler.ashx?action=buy",myID)
          .success(function(response){
            //window.location("#/tab/pay");
            $scope.ifPaysText="购买"
            $scope.down="-outline"
            $scope.texts={color:"#999"}
            console.log(response);
            console.log($scope.video_buy);
            $scope.shadow.video_buy=false;  //提示购买的隐藏
          })
      }

    }



      //评价


  })
  .controller('LunbotuCtrl', function($scope,locals) {
    $scope.sy=function () {
      locals.set("isLoad",'isLoad');
      window.location.href="#/tab/home"
    }
  });

