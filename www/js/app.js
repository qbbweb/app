
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'],function($httpProvider){
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})





.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

		/*用于修改安卓tab居下 （在参数里要加入$ionicConfigProvider）*/
	  $ionicConfigProvider.platform.ios.tabs.style('standard');
	  $ionicConfigProvider.platform.ios.tabs.position('bottom');
	  $ionicConfigProvider.platform.android.tabs.style('standard');
	  $ionicConfigProvider.platform.android.tabs.position('standard');

	  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

	  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

	  $ionicConfigProvider.platform.ios.views.transition('ios');
	  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider


    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  //主页
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
   //课程列表
  .state('tab.lessonlist', {
      url: '/lessonlist',
      views: {
        'tab-lessonlist': {
          templateUrl: 'templates/tab-lessonlist.html',
          controller: 'LessonlistCtrl'
        }
      }
   })

  .state('tab.mycourse', {
    url: '/mycourse',
    views: {
      'tab-mycourse': {
        templateUrl: 'templates/tab-mycourse.html',
        controller: 'MycourseCtrl'
      }
    }
  })
   .state('tab.personal', {
    url: '/personal',
    views: {
      'tab-personal': {
        templateUrl: 'templates/tab-personal.html',
        controller: 'PersonalCtrl'
      }
    }
  })
   .state('tab.register', {
    url: '/register',
    views: {
      'tab-personal': {
        templateUrl: 'templates/tab-register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
    .state('tab.information', {
    url: '/information',
    views: {
      'tab-personal': {
        templateUrl: 'templates/information.html',
        controller: 'InformationCtrl'
      }
    }
  })
    // 学习页面
    .state('tab.study', {
      url: '/study/:myId',
      cache:"false",//不缓存
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-study.html',
          controller: 'StudyCtrl'
        }
      }
    })
    .state('tab.lessonlistStudy', {
      url: '/lessonlistStudy/:myId',
      cache:"false",//不缓存
      views: {
        'tab-lessonlist': {
          templateUrl: 'templates/tab-study.html',
          controller: 'StudyCtrl'
        }
      }
    })
    .state('tab.myStudy', {
      url: '/myStudy/:myId',
      cache:"false",//不缓存
      views: {
        'tab-mycourse': {
          templateUrl: 'templates/tab-study.html',
          controller: 'StudyCtrl'
        }
      }
    })

    .state('tab.lunbotu', {
      url: '/lunbotu',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-lunbotu.html',
          controller: 'LunbotuCtrl'
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});


