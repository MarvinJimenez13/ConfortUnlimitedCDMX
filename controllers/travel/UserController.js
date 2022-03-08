var userApp = angular.module("User", ['Session']);

var userController = function($scope, $http, SessionService){
    $scope.dataUser = {}

    $scope.continue = function(){
        SessionService.set("dataUser", $scope.dataUser)
        window.location.href="destination"
    }
}

userApp.controller("UserController", ['$scope', '$http', 'SessionService', userController]);