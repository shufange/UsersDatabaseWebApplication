/**
 * Created by shufange on 15/1/20.
 */
var MainApp = angular.module('MainApp',['ngRoute', 'controllers', 'services']);

MainApp.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'ListController',
            templateUrl: '../views/list.html'
        }).
        when('/edit/:id', {
        controller: 'EditController',
        templateUrl: '../views/edituser.html'
        }).
        when('/newuser', {
            controller: 'CreateController',
            templateUrl: '../views/createuser.html'
        }).
        otherwise({
            redirectTo: '/'
        });

});









/* .
 // Notice that for the detail view, we specify a parameterized URL component
 // by placing a colon in front of the id
 when('/edit/:id', {
 controller: 'EditController',
 templateUrl: '/views/edituser.html'
 }).
 when('/newuser', {
 controller: 'CreateController',
 templateUrl: '/views/createuser.html'
 }).
 otherwise({
 redirectTo: '/'
 });
 */
