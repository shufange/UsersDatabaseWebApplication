/**
 * Created by shufange on 15/1/20.
 */
var controllers = angular.module('controllers' , ['services']);

controllers.controller('ListController', function ($scope, $http, getUserListService) {

    //get user list from database in mysql
    getUserListService.getUserList($http,$scope, '');

    $scope.sort = '-id';

    //user sorting function
    $scope.sortBy = function(s){
        $scope.sort = s;
    };

    //edit user routing  ng-href="#/edit/{{user.ID}}"
    $scope.editUser = function(id){
        window.location.href = "#/edit/"+id;
    }

    //delete user function
    $scope.deleteUser = function(id){
        //console.log("angular side id: " + id);
        $http.post('/service/user/', {userid: id})
            .success(function(data){
                getUserListService.getUserList($http, $scope, '');
            });

    };



})

.controller('CreateController', ['$scope', '$http',function CreateController($scope, $http) {
        $scope.CreateUserController = function()  {
            var newuser = {
                ID:'',
                FIRST_NAME: $scope.fName,
                LAST_NAME: $scope.lName,
                SEX: (typeof $scope.SexM === 'undefined')? '1':'0',
                AGE: $scope.Age
            };
            //console.log(newuser);
            $http.post('/service/user/createuser/', {newuser: newuser})
                .success(function(data){
                    //console.log("Successfully created user!");
                });

            window.location.href = "/";
        }
    }])

.controller('EditController', function EditController($scope, $http, $routeParams, getUserListService) {

        $scope.user = getUserListService.getUserList($http, $scope, $routeParams.id);

        $scope.EditUserController = function()  {
            var edituser = {
                ID: $routeParams.id,
                FIRST_NAME: $scope.fName,
                LAST_NAME: $scope.lName,
                SEX: (typeof $scope.SexM === 'undefined')? '1':'0',
                AGE: $scope.Age
            };

            //editUserService.editUser(edituser);
            $http.post('/service/user/edituser/', {edituser: edituser})
                .success(function(data) {
                    //console.log("success");
                    $scope.user = getUserListService.getUserList($http, $scope, $routeParams.id);;
                });

            //window.location.href = "/";
        }

    });
