/**
 * Created by shufange on 15/1/22.
 */
var services = angular.module('services', []);

services.service('getUserListService',
    function() {
        return {
            getUserList : function($http, $scope, id) {
                $http.get('/service/user/', {params: {id: id}})
                    .success(function(data) {
                        $scope.users = data;
                        //console.log($scope.users);
                        //$scope.$parent.$broadcast('createLineChart', data);
                    })
            }
        }

    }
)


.service('editUserService',
        function() {
            return {
                editUser : function($http, $scope, edituser) {
                $http.post('/service/user/edituser', {edituser: edituser})
                    .success(function(data) {
                        //console.log(data);
                        $scope.users = data;
                    });
                }
            }

        }
);

