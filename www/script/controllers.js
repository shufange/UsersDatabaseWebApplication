/**
 * Created by shufange on 15/1/20.
 */
var controllers = angular.module('controllers' , ['services']);

controllers.controller('ListController', function ($scope, $http, getUserListService) {

    //get user list from database in mysql
    getUserListService.getUserList($http, $scope, '');

    $scope.sort = '-id';

    //user sorting function
    $scope.sortBy = function(s){
        $scope.sort = s;
    };


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

.controller('EditController', function EditController($scope, $http, $routeParams, getUserListService, editUserService) {

        $scope.user = getUserListService.getUserList($http, $scope, $routeParams.id);

        $scope.EditUserController = function()  {
            var edituser = {
                ID: '',
                FIRST_NAME: $scope.fName,
                LAST_NAME: $scope.lName,
                SEX: (typeof $scope.SexM === 'undefined')? '1':'0',
                AGE: $scope.Age
            };
            editUserService.editUser(edituser);

            window.location.href = "/";
        }

    });
