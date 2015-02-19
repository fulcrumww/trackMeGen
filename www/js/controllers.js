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

    .controller('registerCtrl', function($scope, $ionicModal, $timeout, $state,$rootScope) {
            $scope.register=function(){
            alert("register");
            
            }
            
    })


.controller('nonetworkCtrl', function($scope,$rootScope,$http,$state,ContactsService,$filter,$ionicPopup,geolocation) {
       //$rootScope.page="nonetwork";
            
});




