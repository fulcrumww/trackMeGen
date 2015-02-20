angular.module('starter.controllers', [])
.constant("$config", {
    "serviceUrl": "http://123.63.36.182:8084/roster_app/api/v1"
})
.service("ContactsService", ['$q', function($q) {
                             
         var formatContact = function(contact) {

         return {
            "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
            "phones"        : contact.phoneNumbers || []
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
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,$rootScope) {
    })

    .controller('registerCtrl', function($config,$scope, $ionicModal, $timeout, $state,$rootScope,$http,$ionicLoading, $ionicPopup, connectServer) {
            $scope.register=function(){
            alert("register");
              /*  $ionicLoading.show({template: 'Loading...'});
                var url= $config.serviceUrl + "/user/login";
                //  var param={"json":{"username" : "FWIN01112", "password" : "fulcrum$1"}};
                var param={"json":{"username" : $scope.user.username, "password" : $scope.user.password}};
                if($scope.user.username!=null && $scope.user.password !=null){
                    if($scope.user.remember){
                        localStorage.setItem('username',$scope.user.username);
                        localStorage.setItem('pwd',$scope.user.password);

                    }else{
                        localStorage.setItem('username','');
                        localStorage.setItem('pwd','');
                        $scope.user.remember=false;
                    }
                    connectServer.getResponse(url,"POST",param).success(function (data) {
                        $ionicLoading.hide();
                        var obj = data.data;
                        localStorage.setItem('userId',obj.userId);
                        localStorage.setItem('sessionId',obj.sessionId);
                        sessionStorage.setItem('shiftTimmings',obj.shiftTimmings);
                        sessionStorage.setItem('pickUpPoint',obj.pickUpPoint);
                        $rootScope.count = 1;
                        if(obj.pickUpPoint !=null  && obj.pickUpPoint !=""){
                            $state.go('app.dashboard');
                        }
                        else{
                            $state.go('app.profile');
                        }
                    }).error(function (data) {
                        $rootScope.showAlert(JSON.stringify(data));
                        $ionicLoading.hide();
                    });

                }else{
                    $ionicLoading.hide();
                    $rootScope.showAlert('Please enter username/ password');
                }*/


            }
            
    })


.controller('nonetworkCtrl', function($scope,$rootScope,$http,$state,ContactsService,$filter,$ionicPopup,geolocation) {
       //$rootScope.page="nonetwork";
            
});




