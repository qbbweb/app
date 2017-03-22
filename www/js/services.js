angular.module('starter.services', [])
  .factory('locals',['$window',function ($window) {
    return{
      set:function (key,value) {
        // 本地存储$window.localStorage.key=value;
        $window.localStorage[key]=value;
      },
      // 读取单个属性
      get:function (key,defaultValue) {
        return  $window.localStorage[key] || defaultValue;
      }
    }
  }])
  //页面共享数据的方法，使用方式，一个页面设置值，另一个页面取值，并设置为空
  .factory('shareData',function ($window) {

    var allData={};
    return{
      //存储单个属性
      set:function (key,value) {
      allData[key]=value;
    },
    get:function(key,defaultValue){
      return allData[key]||defaultValue;
    }
    }
  })

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing datahideTabs
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
