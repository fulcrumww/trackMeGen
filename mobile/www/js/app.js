
angular.module('starter', ['ionic',  'ngCordova', 'starter.controllers' ])

.run(function($ionicPlatform, $window, $rootScope,$n, $state,$q,$timeout,ContactService) {
        document.addEventListener("offline", $n.onOffline, false);
        document.addEventListener("online", $n.onOnline, false);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
                       
                       $rootScope.data = {
                       contacts : []
                       };
                        $rootScope.users= {"json": {"mobiles":[]}};
                       
                       ContactService.find().then(function (contacts) {
                          $rootScope.data.contacts = contacts;
                          for(var i=0;i<$rootScope.data.contacts.length; i++){
                          for(var j=0;j<$rootScope.data.contacts[i].phoneNumbers.length;j++){
                           // taking out only mobile numbers from contact selected
                                                  
                           $rootScope.users.json.mobiles.push($rootScope.data.contacts[i].phoneNumbers[j].value.replace(/[^\d\+]/g,""));
                           }
                           }
                                                 
                          /*  $timeout(function(){
                                alert("contacts only : "+$rootScope.users);
                            },1000);
                           */
                          }, function (error) {
                          //console.log('here in error: '+error);
                          });
      navigator.splashscreen.hide();
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  //  window.plugin.backgroundMode.enable();
                      

  });
        $ionicPlatform.registerBackButtonAction(function () {
          if($rootScope.page != "dashboard" && $rootScope.page != "login"){
              $state.go('app.dashboard');
          }else{
           navigator.Backbutton.goHome(function() {
                     //alert('success');
                }, function() {
                    // alert('fail');
                });
            // https://github.com/ZhichengChen/cordova-plugin-android-home plugin
           /*    navigator.home.home(function(){
              }, function(){
              });*/
          }
        }, 100);
  
})

.service("$n", ["$config", "$location", "$window", "$state", "$rootScope",
    function($config, $location, $window, $state, $root){
        var $n = {

            connected : true,

            onOffline : function(){
                $root.$apply(function(){
                    $n.connected = false;
                    $state.go('app.nonetwork');
                });
            },

            onOnline : function(){
                $root.$apply(function(){
                    $n.connected = true;
                    $window.history.back();
                   // $state.go('app.dashboard');
                });

            }
        };
        return $n;
    }])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
        .state('app.dashboard', {
               url: "/dashboard",
               views: {
               'menuContent' :{
               templateUrl: "templates/dashboard.html",
               controller: 'dashboardCtrl'
               }
               }
               })
        
        .state('app.register', {
             url: "/register",
             cache: false,
             views: {
            'menuContent' :{
             templateUrl: "templates/register.html",
             controller: 'registerCtrl'
             }
            }
    })
        
        .state('app.travel-plan', {
               url: "/travel-plan",
               cache: false,
               views: {
               'menuContent' :{
               templateUrl: "templates/Travel-plan.html",
               controller: 'Travel_PlanCtrl'
               
                             }
               
                 },
                params:{'updatePlan': null}
        })
        .state('app.notifierdetails', {
               url: "/notifierdetails",
               cache: false,
               views: {
               'menuContent' :{
               templateUrl: "templates/notifierdetails.html",
               controller: 'notifierDetailsCtrl'
               }
               }
               })
        .state('app.contacts', {
               url: "/contacts",
               cache: false,
               views: {
               'menuContent' :{
               templateUrl: "templates/contacts.html",
               controller: 'contactsCtrl'
               }
               }
               })
        
    .state('app.profile', {
        url: "/profile",
        cache: false,
        views: {
        'menuContent' :{
        templateUrl: "templates/profile.html",
        controller: 'profileCtrl'
        }
      }
    })
   
 
    .state('app.allTravelPlans', {
        url: "/allTravelPlans",
        views: {
        'menuContent' :{
        templateUrl: "templates/listAllPlans.html",
        controller: 'allTravelPlansCtrl'
        }
      }
    })
     .state('app.currentlocation', {
       url: "/currentlocation",
       views: {
       'menuContent' :{
       templateUrl: "templates/currentlocation.html",
       controller: 'currentLocationCtrl'
       }
        }
    })
        
    .state('app.nonetwork', {
       url: "/nonetwork",
       views: {
       'menuContent' :{
         templateUrl: "templates/nonetwork.html",
         controller: 'nonetworkCtrl'
        }
     }
    });
    
// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});



