var mAsad = angular.module('masadApp', ['ngMaterial','ui.router']);

mAsad.config(['$stateProvider','$urlRouterProvider','$mdThemingProvider',function($stateProvider,$urlRouterProvider,$mdThemingProvider) {

    // $mdThemingProvider.theme('darky')
    // .primaryPalette('grey',{
    // 'default': '900'}).dark();

    // $mdThemingProvider.theme('myBtnTheme')
    // .primaryPalette('cyan');

    // $mdThemingProvider.setDefaultTheme('darky');

    // $mdThemingProvider.alwaysWatchTheme(true);

    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'homeCtlr'
    });
        $urlRouterProvider.otherwise('home');
}]);
