angular.module('starter.controllers', [])
.constant("$config", {
    "serviceUrl": "http://123.63.36.182:8084/trackme"
          })
.service("ContactsService", ['$q', function($q) {
                             
         var formatContact = function(contact) {

         return {
            "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
            "name"   :        contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
            "phoneNumbers"        : contact.phoneNumbers || []
         };

         };

         var pickContact = function() {

             var deferred = $q.defer();

             if(navigator && navigator.contacts) {

                navigator.contacts.pickContact(function(contact){deferred.resolve( formatContact(contact) );});

             } else {
                deferred.reject("Bummer.  No contacts in desktop browser");
             }

             return deferred.promise;
         };

         return {
            pickContact : pickContact
         };
   }])
.factory("ContactService", function ($rootScope, $q) {
    return {
         create: function () {
         return navigator.contacts.create()
         },
         find: function () {
         var deferred = $q.defer();
         var options = new ContactFindOptions();
        // options.filter = filter; "displayName","name", "phoneNumbers"   com.fulcrum.tracking
         options.multiple = true;
         var fields = ["*"];
         if(navigator && navigator.contacts) {
         
         navigator.contacts.find(fields, function (contacts) {
                                 $rootScope.$apply(function () {
                                                   deferred.resolve(contacts);
                                                   });
                                 
                                 }, function (error) {
                                 $rootScope.$apply(function () {
                                                   deferred.reject(error);
                                                   });
                                 }, options);
         } else {
         deferred.reject("Bummer.  No contacts in desktop browser");
         }
         
         return deferred.promise;
         }
         };
         })

     .factory('connectServer',['$http', function($http){
        var service={};
        service.getResponse = function (url,methodtype,param) {
          return  $http({
            url: url,
            dataType: "json",
            contentType: "application/json",
            method: methodtype,
            timeout:15000,
            data: param
            
            });
          };
        return service;
  }])
    .factory('connectServerToGet',['$http', function($http){
        var service={};
        service.getResponse = function (url,methodtype,param) {
            return  $http({
                url: url,
                dataType: "json",
                contentType: "application/json",
                method: methodtype,
                timeout:15000,
                params: param

            });
        };
        return service;
    }])


.directive('standardTimeMeridian', function () {
           return {
           restrict: 'AE',
           replace: true,
           scope: {
           etime: '=etime'
           },
           template: "<strong>{{stime}}</strong>",
           link: function (scope, elem, attrs) {
           
           scope.stime = epochParser(scope.etime, 'time');
           
           function prependZero(param) {
           if (String(param).length < 2) {
           return "0" + String(param);
           }
           return param;
           }
           
           function epochParser(val, opType) {
           if (val === null) {
           return "00:00:00";
           } else {
           var meridian = ['AM', 'PM'];
           
           if (opType === 'time') {
           var hours = parseInt(val / 3600);
           var minutes = (val / 60) % 60;
           var hoursRes = hours > 12 ? (hours - 12) : hours;
           
           var currentMeridian = meridian[parseInt(hours / 12)];
           
           return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
           }
           }
           }
           
           scope.$watch('etime', function (newValue, oldValue) {
                        scope.stime = epochParser(scope.etime, 'time');
                        });
           
           }
           };
           })

.directive('standardTimeNoMeridian', function () {
           return {
           restrict: 'AE',
           replace: true,
           scope: {
           etime: '=etime'
           },
           template: "<strong>{{s1time}}</strong>",
           link: function (scope, elem, attrs) {
           
           scope.stime = epochParser(scope.etime, 'time');
          
           function prependZero(param) {
           if (String(param).length < 2) {
           return "0" + String(param);
           }
           return param;
           }
           
           function epochParser(val, opType) {
           if (val === null) {
           return "00:00:00";
           } else {
           if (opType === 'time') {
           var hours = parseInt(val / 3600);
           var minutes = (val / 60) % 60;
           (prependZero(hours) + ":" + prependZero(minutes));
           $("#txttime").val((prependZero(hours) + ":" + prependZero(minutes)+ ":00"));
           
           return (prependZero(hours) + ":" + prependZero(minutes )+ ":00");
           }
           }
           }
           
           scope.$watch('etime', function (newValue, oldValue) {
                        scope.stime = epochParser(scope.etime, 'time');
                        });
           
           }
           };
           })

.directive('ionicTimePicker', function ($ionicPopup) {
           return {
           restrict: 'AE',
           replace: true,
           scope: {
           etime: '=etime',
           format: '=format',
           step: '=step'
           },
           link: function (scope, element, attrs) {
           
           element.on("click", function () {
                      
                      var obj = {epochTime: scope.etime, step: scope.step, format: scope.format};
                      
                      scope.time = { hours: 0, minutes: 0, meridian: "" };
                      
                      var objDate = new Date(obj.epochTime * 1000);       // Epoch time in milliseconds.
                      
                      scope.increaseHours = function () {
                      if (obj.format == 12) {
                      if (scope.time.hours != 12) {
                      scope.time.hours += 1;
                      } else {
                      scope.time.hours = 1;
                      }
                      }
                      if (obj.format == 24) {
                      if (scope.time.hours != 23) {
                      scope.time.hours += 1;
                      } else {
                      scope.time.hours = 0;
                      }
                      }
                      };
                      
                      scope.decreaseHours = function () {
                      if (obj.format == 12) {
                      if (scope.time.hours > 1) {
                      scope.time.hours -= 1;
                      } else {
                      scope.time.hours = 12;
                      }
                      }
                      if (obj.format == 24) {
                      if (scope.time.hours > 0) {
                      scope.time.hours -= 1;
                      } else {
                      scope.time.hours = 23;
                      }
                      }
                      };
                      
                      scope.increaseMinutes = function () {
                      if (scope.time.minutes != (60 - obj.step)) {
                      scope.time.minutes += obj.step;
                      } else {
                      scope.time.minutes = 0;
                      }
                      };
                      
                      scope.decreaseMinutes = function () {
                      if (scope.time.minutes != 0) {
                      scope.time.minutes -= obj.step;
                      } else {
                      scope.time.minutes = 60 - obj.step;
                      }
                      };
                      
                      if (obj.format == 12) {
                      
                      scope.time.meridian = (objDate.getUTCHours() >= 12) ? "PM" : "AM";
                      scope.time.hours = (objDate.getUTCHours() > 12) ? ((objDate.getUTCHours() - 12)) : (objDate.getUTCHours());
                      scope.time.minutes = (objDate.getUTCMinutes());
                      
                      if (scope.time.hours == 0 && scope.time.meridian == "AM") {
                      scope.time.hours = 12;
                      }
                      
                      scope.changeMeridian = function () {
                      scope.time.meridian = (scope.time.meridian === "AM") ? "PM" : "AM";
                      };
                      
                      $ionicPopup.show({
                                       templateUrl: 'templates/time-picker-12-hour.html',
                                       title: '<strong>12-Hour Format</strong>',
                                       subTitle: '',
                                       scope: scope,
                                       buttons: [
                                                 { text: 'Cancel' },
                                                 {
                                                 text: 'Set',
                                                 type: 'button-positive',
                                                 onTap: function (e) {
                                                 
                                                 scope.loadingContent = true;
                                                 
                                                 var totalSec = 0;
                                                 
                                                 if (scope.time.hours != 12) {
                                                 totalSec = (scope.time.hours * 60 * 60) + (scope.time.minutes * 60);
                                                 } else {
                                                 totalSec = scope.time.minutes * 60;
                                                 }
                                                 
                                                 if (scope.time.meridian === "AM") {
                                                 totalSec += 0;
                                                 } else if (scope.time.meridian === "PM") {
                                                 totalSec += 43200;
                                                 }
                                                 scope.etime = totalSec;
                                                 }
                                                 }
                                                 ]
                                       })
                      
                      }
                      
                      if (obj.format == 24) {
                      
                      scope.time.hours = (objDate.getUTCHours());
                      scope.time.minutes = (objDate.getUTCMinutes());
                      
                      $ionicPopup.show({
                                       templateUrl: 'templates/time-picker-24-hour.html',
                                       title: '<strong>24-Hour Format</strong>',
                                       subTitle: '',
                                       scope: scope,
                                       buttons: [
                                                 { text: 'Cancel' },
                                                 {
                                                 text: 'Set',
                                                 type: 'button-positive',
                                                 onTap: function (e) {
                                                 
                                                 scope.loadingContent = true;
                                                 
                                                 var totalSec = 0;
                                                 
                                                 if (scope.time.hours != 24) {
                                                 totalSec = (scope.time.hours * 60 * 60) + (scope.time.minutes * 60);
                                                 } else {
                                                 totalSec = scope.time.minutes * 60;
                                                 }
                                                 scope.etime = totalSec;
                                                 }
                                                 }
                                                 ]
                                       })
                      
                      }
                      
                      });
           
           }
           };
           })


.controller('AppCtrl', function($config,$scope, $n, $ionicModal, $stateParams, $timeout, $state,$rootScope,$http,$ionicLoading, $ionicPopup, $window,connectServer) {
            
           $scope.Register=function(){
             $state.go('app.register',self, { reload: true });
            };
            
            $scope.travelPlan=function(){
                $state.go('app.travel-plan' ,{ 'updatePlan': null });
            };
            
            $scope.travelPlanList=function(){
            $state.go('app.allTravelPlans',null, { reload: true });
            };
            
            $scope.dashboard=function(){
                $state.go('app.dashboard');
            };
            
            $scope.profile=function(){
              $state.go('app.profile',self, { reload: true });
            };
            
            $scope.Login = function(){
            var url= $config.serviceUrl + "/api/v2/user/login";
            var mobile= localStorage.getItem('mobile');
            var email= localStorage.getItem('email');
            param = {"json":{"mobile" : mobile, "email" :email }};
           // alert('params: '+JSON.stringify(param));
            if(mobile !=null && email !=null ){
            
            connectServer.getResponse(url,"POST",param).success(function (data) {
                    $ionicLoading.hide();
                    var obj = data.data;
                    // alert("Data ::: "+JSON.stringify(obj));
                    
                    localStorage.setItem('userId',obj.userId);
                    localStorage.setItem('sessionId',obj.sessionId);
                    console.log(" sessionId: "+obj.sessionId+" userId: "+obj.userId);
                    $rootScope.showAlert('Login is successfull.');
                    $state.go('app.dashboard');
                    }).error(function (data) {
                             $ionicLoading.hide();
                });
            
            }else{
               $ionicLoading.hide();
              // $rootScope.showAlert('');
            }

        };
    })

    .controller('registerCtrl', function($config,$scope, $n, $ionicModal, $stateParams, $timeout, $state,$rootScope,$http,$ionicLoading, $ionicPopup, $window,connectServer) {
                
      $scope.user={"full_name" : null, "mobile" : null, "email" :null  };
        $scope.deviceid = "";
        // Get UUID using plugin https://github.com/jcesarmobile/IDFVPlugin and cordova device plugin for iOS only
                $timeout(function(){
                         //alert('here: '+device.platform);
               if(device.platform == "iOS"){
                window.IDFVPlugin.getIdentifier(function(result){  $scope.deviceid =result; localStorage.setItem("deviceid",result);},function(error){ $rootScope.showAlert(error); });
                }else{
                // For Android
                   $scope.deviceid = device.uuid ;
                   localStorage.setItem("deviceid",device.uuid);
                }
                         },2000);
                $rootScope.showAlert = function(msg) {
                var alertPopup = $ionicPopup.alert({title: 'MESSAGE',template: msg});
                alertPopup.then(function(res) {});
                };
              
            $scope.register=function(){
                   //$state.go('app.travel-plan');
                localStorage.setItem('userId','');
                localStorage.setItem('sessionId','');
                localStorage.setItem('mobile',$scope.user.mobile);
                localStorage.setItem('email',$scope.user.email);
                //$ionicLoading.show({template: 'Loading...'});
                var url= $config.serviceUrl + "/api/v2/user/register";
                //  var param={"json":{"full_name" : "FWIN01112", "password" : "fulcrum$1"}};
              
                param = {"json":{"full_name" : $scope.user.fullname, "mobile" : $scope.user.mobile, "email" :$scope.user.email , "device_details" :$scope.deviceid}};
                //alert('params: '+JSON.stringify(param));
                if($scope.user.fullname!=null && $scope.user.mobile !=null && $scope.user.email !=null && $scope.deviceid !=null){

                    connectServer.getResponse(url,"POST",param).success(function (data) {
                        $ionicLoading.hide();
                        var obj = data.data;
                       // alert("Data ::: "+JSON.stringify(obj));
                
                        localStorage.setItem('userId',obj.userId);
                        localStorage.setItem('sessionId',obj.sessionId);
                        console.log(" sessionId: "+obj.sessionId+" userId: "+obj.userId);
                        $rootScope.showAlert('Registration is successfull.');
                        $state.go('app.travel-plan');
                     }).error(function (data) {
                        $ionicLoading.hide();
                    });

                }else{
                    $ionicLoading.hide();
                    $rootScope.showAlert('Please enter mendatory fields');
                }


            };
           
    })

.controller('Travel_PlanCtrl', function( $config,$scope, $n, $ionicModal, $stateParams, $timeout, $state,$rootScope,$http,$ionicLoading, $ionicPopup, $cordovaDatePicker, connectServerToGet, connectServer) {
          /* Plugin Used:  https://github.com/rajeshwarpatlolla/TimePickerForIonicFramework
             cordova plugin add org.apache.cordova.contacts, console plugin
             Purpose: To show Time Picker 
           */
            $scope.label ="Create";
            $scope.user={starting_point: null,end_point : null,date  : null,time : null};
            var userId =null, sessionId = null;
            
            
            $scope.slots = [
                            {epochTime: 12600, step: 15, format: 12},
                            {epochTime: 54900, step: 1, format: 24}
                            ];
            userId= localStorage.getItem('userId');
            sessionId= localStorage.getItem('sessionId');
            // updatePlan contains travelPlanId send from allTravelPlansCtrl 's showPlanDetails()
            var updatePlan = $stateParams.updatePlan;
            if(updatePlan != null && updatePlan != 'undefined' ){
            $scope.label ="Update";
            $scope.userID=userId;
            var url= $config.serviceUrl + "/api/v2/travel/details/"+parseInt(updatePlan)+"?sessionId="+sessionId+"&userId="+userId;
            var params ="";
            $scope.users=[];
            $scope.removedContacts=[];
            $scope.removedContactsToSendReq=[];
            connectServerToGet.getResponse(url,"GET",params).success(function (data) {
                 var response = data.data;
                 //Get And display
                // alert('detailssssss: '+JSON.stringify(response));
                 $scope.user.starting_point= response.startingPoint;
                 $scope.user.end_point= response.endPoint;
                 var scheduleStartTime = response.scheduleStartTime.split(" ");
                 $scope.user.date=scheduleStartTime[0];
                 $scope.user.time=scheduleStartTime[1];
                 $scope.users=response.users;
                 }).error(function (data, status, headers, config) {
                          $rootScope.showAlert('status ='+ status + ' ' + headers);
                          $ionicLoading.hide();
                 });

            }
            
            $scope.removeContact = function(contact){
            var confirmPopup = $ionicPopup.confirm({title: 'Contact',template: 'Are you sure you want to remove contact?'});
            confirmPopup.then(function(res) {
              if(res) {
              var index = $scope.users.indexOf(contact);
              $scope.users.splice(index,1);
               console.log('Contact deleted');
              var url= $config.serviceUrl + "/api/v2/travel/user?sessionId="+sessionId+"&userId="+userId;
              var param={"json" : { "travelPlanId": parseInt(updatePlan), "userId" :parseInt(contact.userId)}};
              connectServer.getResponse(url,"DELETE",param).success(function (data) {
                    //$ionicLoading.hide();
                   // alert("DELETE SUccess: "+": "+"data: "+JSON.stringify(obj));
              
            }).error(function (data) {
                     $ionicLoading.hide();
                     });
              }
              });
            }
$scope.openDatePicker=function(){
             //alert("openDatePicker");
            var options = {
            date: new Date(),
            mode: 'date', // or 'time'
            minDate: new Date() ,
            allowOldDates: false,
            allowFutureDates: true,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#000000',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
            };
            document.addEventListener("deviceready", function () {
                                      $cordovaDatePicker.show(options,true).then(function(date){
                                         //$scope.user.date=date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear();
                                         $scope.user.date=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
                                                                                
                                       });
                                      
                                      }, false);
}
            
            $scope.isSameLocation =function(){
               if($scope.user.starting_point === $scope.user.end_point){
                    $rootScope.showAlert('Starting point and ending point should be different');
                    $scope.user.end_point ='';
            }else{
            }
            };
            
        $scope.create_travelPlan=function(){
            //alert($scope.label);
             $scope.user.time =  $("#txttime").val();
            if($scope.label === "Update" ){
           // $scope.removedContacts
          //$ionicLoading.hide();
            
                  var url= $config.serviceUrl + "/api/v2/travel/update?sessionId="+sessionId+"&userId="+userId;
                  var sheduled_time = $scope.user.date+' '+$scope.user.time;
                  
                  var param={"json":{ "travelPlanId": updatePlan  , "starting_point" : $scope.user.starting_point, "end_point" : $scope.user.end_point, "schedule_start_time" : sheduled_time, "userId" : parseInt(userId)}};
                  
                  if($scope.user.starting_point!=null && $scope.user.end_point !=null && $scope.user.date!=null && $scope.user.time !=null && userId !=null){
                   // alert('param:'+JSON.stringify(param));
                  connectServer.getResponse(url,"PUT",param).success(function (data) {
                     //$ionicLoading.hide();
                     var obj = data.data;
                      //alert("TRAVEL PLAN ID: "+obj.travelPlanId+": "+"data: "+JSON.stringify(obj));
                     localStorage.setItem("travelPlanId",obj.travelPlanId);
                     $state.go('app.contacts');
                     }).error(function (data) {
                              $ionicLoading.hide();
                     });

                    }else{
                    $ionicLoading.hide();
                    $rootScope.showAlert('Please enter all fields data');
                    }
            
            }else{
          
            //$ionicLoading.show({template: 'Loading...'});
            var url= $config.serviceUrl + "/api/v2/travel/plan?sessionId="+sessionId+"&userId="+userId;
            var sheduled_time = $scope.user.date+' '+$scope.user.time;
            //alert($scope.user.date+' sheduled_time: '+sheduled_time);
           // var sheduled_time = $scope.user.date+' '+$scope.user.time+':00';
            var param={"json":{"starting_point" : $scope.user.starting_point, "end_point" : $scope.user.end_point, "schedule_start_time" : sheduled_time, "user_id" : parseInt(userId)}};
            
             if($scope.user.starting_point!=null && $scope.user.end_point !=null && $scope.user.date!=null && $scope.user.time !=null && userId !=null){
             connectServer.getResponse(url,"POST",param).success(function (data) {
             //$ionicLoading.hide();
             var obj = data.data;
             // alert(obj.travelPlanId+": "+"data: "+JSON.stringify(obj));
              localStorage.setItem("travelPlanId",obj.travelPlanId);
             if($rootScope.users.json.mobiles ==[] && $rootScope.users.json.mobiles.length == 0){
               $rootScope.showAlert('Could not access your contacts');
             }else{
                $state.go('app.contacts');
             }
             }).error(function (data) {
                $ionicLoading.hide();
             });
             
             }else{
             $ionicLoading.hide();
             $rootScope.showAlert('Please enter all fields data');
             }
            
            }
            };
            
            })
        .controller('notifierDetailsCtrl', function($scope,$rootScope,$http,$state,$n, ContactsService,$filter,$ionicPopup) {
            console.log('In notifier details');
            $scope.data = [];
            $scope.data= JSON.parse(localStorage.getItem('selectedContacts'));
            //alert("data: "+$scope.data);
                    $scope.showTravelPlan = function(){
                      $state.go('app.allTravelPlans');
                    }
            })

.controller('contactsCtrl', function($config,$n, $scope,$state,$stateParams, $timeout, $rootScope, $http,$state,$ionicModal,$filter,$ionicPopup,$ionicLoading,connectServer) {
   
            
            $scope.array =  [];
            var userId= localStorage.getItem('userId');
            var sessionId= localStorage.getItem('sessionId');
             //alert(userId+" sessionId: "+sessionId+" contactsCtrl: "+$rootScope.users.json.mobiles);
            $scope.array_ = angular.copy($scope.array);
            var url= $config.serviceUrl + "/api/v2/user/contacts?sessionId="+sessionId+"&userId="+userId;
            $scope.list= [];
            $scope.toggleSelection = function toggleSelection(userId,fullName,mobile,checked) {
              if(checked){
                 $scope.array.push({"userId":userId,"fullName" : fullName, "mobile" : mobile});
              }else{
                $scope.findAndRemove($scope.array, 'userId', userId);
           
              }
            };

            //$ionicLoading.show({template: 'Loading...'});
            // Sending all mobile contacts to server to match who has registered with the app
            var param= {
            "json": {
            "mobiles":$rootScope.users.json.mobiles
            }
            };
           // if($scope.user.fullname!=null && $scope.user.mobile !=null && $scope.user.email !=null && $scope.deviceid !=null){
            
           connectServer.getResponse(url,"POST",param).success(function (data) {
                $ionicLoading.hide();
                var obj = data.data;
                 //alert("Data from server : "+JSON.stringify(obj)); com.fulcrum.tracking
                 $scope.list= data;
                 if(obj == 'No Records Found'){
                   $rootScope.showAlert('Sorry! No one from your contacts registered with us.');
                    $state.go('app.allTravelPlans');
                 }
               
                }).error(function (data) {
                         $ionicLoading.hide();
            });
            
           // }else{
           // $ionicLoading.hide();
//$rootScope.showAlert('Please enter mendatory fields');
         //   }
            $scope.findAndRemove = function(array, property, value) {
            $.each(array, function(index, result) {
                   if(result[property] == value) {
                      //Remove from array
                      array.splice(index, 1);
                   }    
                   });
            };
    $scope.saveContacts = function(){
           // alert(JSON.stringify($scope.array));
        localStorage.setItem('selectedContacts',JSON.stringify($scope.array));
      
            var arrUserID_Role =[];
            var travelPlanId= localStorage.getItem("travelPlanId");
            for(var s=0;s< $scope.array.length;s++){
             arrUserID_Role.push({"userId":$scope.array[s].userId, "role":"user" });
            }
            // Adding User to Travel Plan
            var url= $config.serviceUrl + "/api/v2/travel/user?sessionId="+sessionId+"&userId="+userId;
             var param =  {
            "json": {
            "travelPlanId":parseInt(travelPlanId),
            "users":arrUserID_Role
            }
            };
            setTimeout(function(){
            //alert(url+" : param: "+JSON.stringify(param));
           connectServer.getResponse(url,"POST",param).success(function (data) {
            $ionicLoading.hide();
            var obj = data.data;
              //alert("Data from server : "+JSON.stringify(obj));
            $state.go('app.notifierdetails');
            }).error(function (data) {
                     $ionicLoading.hide();
            });
                       },1000);

      //  $state.go('app.notifierdetails');
    };
            
    })
.controller('dashboardCtrl', function($scope,$rootScope,$state,  $http, $rootScope,$ionicLoading, $ionicPopup,$n, $q) {
            //$rootScope.page="nonetwork";
            
            function getUserLastLocation (){
            $ionicLoading.show({template: 'processing...'});
            var geocoder;
            var address = "";
            var deferred = $q.defer();
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                 $scope.$apply(function(){ alert('here2');
                   geocoder = new google.maps.Geocoder();
                   var lat = position.coords.latitude;
                   var lng = position.coords.longitude;
                   var latlng = new google.maps.LatLng(lat, lng);
                   geocoder.geocode({'latLng': latlng}, function(results, status)
                    {   console.log('coords' + latlng);
                        if (status == google.maps.GeocoderStatus.OK)
                        {
                        if (results[1])
                        {
                        var smallAddress= results[1].formatted_address.split(",");
                        var  redefinedAddress=smallAddress[0]+","+smallAddress[1];
                        alert(redefinedAddress);
                        deferred.resolve(redefinedAddress);
                        }else{
                        deferred.reject("Not able to get location.");
                        }
                        
                        }
                        });
                               
                    });
                 
                 
                 },geolocationError,{ enableHighAccuracy: true ,timeout: 5000 });
            
            }
            return deferred.promise;
            }
            
            
            
            var geolocationSuccess = function(position) {
            var networkState=null;
            var deviceOS= device.platform;
            if(deviceOS.toLowerCase() == "ios"){
            networkState = Connection.CELL;
            }else{
            networkState = navigator.connection.type;
            }
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
            if( states[networkState] =="No network connection"){
            $ionicLoading.hide();
            }else{
            codeLatLng(position.coords.latitude ,position.coords.longitude );
            }
            }
            function geolocationError(error) {
            
            
            $ionicLoading.hide();
            }
            
            function initialize() {
            geocoder = new google.maps.Geocoder();
            }
            
            function codeLatLng(lat, lng) {
            var geocoder;
            var address = "";
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({
                             'latLng': latlng
                             }, function (results, status) {
                             
                             if (status == google.maps.GeocoderStatus.OK) {
                              console.log(status);
                             
                             if (results[1]) {
                             //loop through components
                             for (var i = 0; i < results[0].address_components.length; i++) {
                             //loop through types
                             for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                             address= (results[1].formatted_address);
                             }
                             }
                             //sessionStorage.setItem('address',address);
                              alert('Current Address: '+address);
                              $ionicLoading.hide();
                             var smallAddress= address.split(",");
                             var  redefinedAddress=smallAddress[0]+","+smallAddress[1];
                             
                             if(address !=null){
                            /*
                             var userId= localStorage.userId;
                             var sessionId=  localStorage.sessionId;
                             var param={"json":{"routesId" : parseInt(sessionStorage.pickUpPoint), "shiftTimmings" : sessionStorage.shiftTimmings , "currentLocation" : redefinedAddress}};
                             
                             var url= $config.serviceUrl + "/routes/travel-history?sessionId="+sessionId+"&userId="+userId;
                             
                             connectServer.getResponse(url,"POST",param).success(function (data) {
                                  $ionicLoading.hide();
                                 if( $rootScope.timeInterval== false){
                                    $rootScope.showAlert('Tracking started successfully');
                                    $state.go('app.currentlocation', null, {  });
                                 }else{
                                   $state.go($state.current, {}, {reload: true});
                                 }
                                 }).error(function (data, status, headers, config) {
                                      $ionicLoading.hide();
                                      //$rootScope.showAlert('Error in sending updates to service');
                                 });
                            */
                             }
                             } else {
                             $ionicLoading.hide();
                             }
                             } else {
                             $ionicLoading.hide();
                            
                             }
                             
                             });
            }

            
        $scope.startTracking = function(){
         try {
              $ionicLoading.show({template: 'Loading...'});
             if(navigator.geolocation){
               navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError,{ enableHighAccuracy: true ,timeout: 5000 });
               $rootScope.timeInterval= false;
             }
          }catch(err) {
            $rootScope.showAlert(err.message);
        }

      };
            
            $scope.viewLocation = function(){
            $state.go('app.currentlocation');
            };
            
    })
.controller('profileCtrl', function( $config,$scope, $n, $ionicModal, $stateParams, $timeout, $state,$rootScope,$http,$ionicLoading, $ionicPopup,connectServerToGet ,connectServer) {
           
            $ionicLoading.show({template: 'Loading...'});
            $scope.user = {"name": null, "email" :null, "mobile" : null};
            var userId = null, sessionId = null;
             userId= localStorage.getItem('userId');
             sessionId= localStorage.getItem('sessionId');
            var url= $config.serviceUrl + "/api/v2/user/profile?sessionId="+sessionId+"&userId="+userId;
            var params ="";
            connectServerToGet.getResponse(url,"GET",params).success(function (data) {
               var response = data.data;
                 //Get And display
                      $ionicLoading.hide();
                      $scope.user.name=response.fullName;
                      $scope.user.email=response.email;
                      $scope.user.mobile=response.mobile;
                                                                 
                      }).error(function (data, status, headers, config) {
                           $rootScope.showAlert('status ='+ status + ' ' + headers);
                           $ionicLoading.hide();
                    });
            
            $scope.submit =function(){
             $ionicLoading.show({template: 'Loading...'});
            var url= $config.serviceUrl + "/api/v2/user/update?sessionId="+sessionId+"&userId="+userId;
           var param = { "json": {"userId":userId, "full_name":$scope.user.name,"mobile":$scope.user.mobile,"status":"active","device_details":localStorage.deviceid}
            };
            connectServer.getResponse(url,"PUT",param).success(function (data) {
                 var response = data.data;
                 //alert(JSON.stringify( data));
                 //Get And display
                 $ionicLoading.hide();

                  $rootScope.showAlert('Profile updated successfully.');
                  $state.go('app.dashboard');
                 }).error(function (data, status, headers, config) {
                          $rootScope.showAlert('Session expired. Please login again');
                          $ionicLoading.hide();
                });
            }
            
            })

.controller('allTravelPlansCtrl', function($config, $scope,$rootScope,$http,$state,$n ,$ionicModal,$filter,$ionicPopup,$ionicLoading,connectServerToGet ,connectServer) {
            //$rootScope.page="nonetwork";
            $scope.allTravelPlans=[];
             var userId = null, sessionId = null;
             userId= localStorage.getItem('userId');
             sessionId= localStorage.getItem('sessionId');
            var url= $config.serviceUrl + "/api/v2/user/itenaries/"+parseInt(userId)+"?sessionId="+sessionId+"&userId="+userId;
            var params ="";
           // alert("url: "+url+" userId: "+userId+" sessionId: "+sessionId);
             $ionicLoading.show({template: 'Loading...'});
            connectServerToGet.getResponse(url,"GET",params).success(function (data) {
                    var response = data.data;
                    //Get And display
                    $scope.allTravelPlans= response;
                    $ionicLoading.hide();
                 }).error(function (data, status, headers, config) {
                    $rootScope.showAlert('Session expired. Please login again');
                    $ionicLoading.hide();
                });
            
            $scope.showPlanDetails = function(travelId) {
              //alert('showPlanDetails'+travelId);
              $state.go('app.travel-plan' ,{ 'updatePlan': travelId });
            
            
            };
            
            })


.controller('nonetworkCtrl', function($scope,$n) {
       //$rootScope.page="nonetwork";
            
})

.controller('currentLocationCtrl', function($scope,$state,  $http, $rootScope,$ionicLoading, $ionicPopup,$n, $q) {
            $scope.mapView =false;
            $scope.isListView =function(){
              $scope.mapView =false;
            };
           // var mapElement= document.getElementById('map');
             var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
             //document.getElementById('map').style.width = width+"px";
             //alert("width: "+width);
            var cities = [
                          {
                          city : 'Toronto',
                          desc : 'This is the best city in the world!',
                          lat : 43.7000,
                          long : -79.4000
                          },
                          {
                          city : 'New York',
                          desc : 'This city is aiiiiite!',
                          lat : 40.6700,
                          long : -73.9400
                          },
                          {
                          city : 'Chicago',
                          desc : 'This is the second best city in the world!',
                          lat : 41.8819,
                          long : -87.6278
                          },
                          {
                          city : 'Los Angeles',
                          desc : 'This city is live!',
                          lat : 34.0500,
                          long : -118.2500
                          },
                          {
                          city : 'Las Vegas',
                          desc : 'Sin City...\'nuff said!',
                          lat : 36.0800,
                          long : -115.1522
                          }
                          ];
            
            $scope.isMapView = function(){
               $scope.mapView =true;
            //Data
   
                var mapOptions = {
                zoom: 4,
                center: new google.maps.LatLng(40.0000, -98.0000),
                mapTypeId: google.maps.MapTypeId.TERRAIN
                }
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                $scope.markers = [];
                
                var infoWindow = new google.maps.InfoWindow();
           

            var createMarker = function (info){
                
                var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.long),
                        title: info.city
                });
                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' );
                      infoWindow.open($scope.map, marker);
                });
            
                $scope.markers.push(marker);
            
            };
            
                for (i = 0; i < cities.length; i++){
                   createMarker(cities[i]);
                }
                $scope.openInfoWindow = function(e, selectedMarker){
                    alert("openInfoWindow called");
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }
           
            };
           
            
       // $scope.startTracking=function(){
    
       // document.getElementById("startTracking").disabled = true;
       // var param = {"sessionId":sessionId,"userId":userId};
       // var url= $config.serviceUrl + "/routes/travel-history/check/"+parseInt(sessionStorage.pickUpPoint)+"/"+sessionStorage.shiftTimmings;
        
      /*  connectServerToGet.getResponse(url,"GET",param).success(function (data) {
                $ionicLoading.hide();
                var response=data.data;
                //alert('Success: '+JSON.stringify(response.interval));
                
                // if(parseInt(response.interval) > 420){
                if(parseInt(response.interval) > 180){
                timeInterval=null;
                clearInterval(stop);
                stop=null;
                $scope.track();
                }else{
                document.getElementById("startTracking").disabled = false;
                $rootScope.showAlert('We are apologies. You can start tracking when server do not recieve any updates since last 6 minutes ');
                //$state.go('app.currentlocation', null, {  });
                }
                
                }).error(function (data, status, headers, config) {
                         $ionicLoading.hide();
                         document.getElementById("startTracking").disabled = false;
                         if(data.message.toLowerCase() == "pickup has not yet started"){
                         $scope.track();
                         }
                });
        */
            
        
      //  }


});




