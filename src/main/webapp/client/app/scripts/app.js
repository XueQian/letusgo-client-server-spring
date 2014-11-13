'use strict';

angular
  .module('letusgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'indexCtrl'
      })
      .when('/itemList', {
        templateUrl: 'views/itemList.html',
        controller: 'itemListCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'cartCtrl'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: 'inventoryCtrl'
      })
      .when('/manageCategory', {
        templateUrl: 'views/manageCategory.html',
        controller: 'manageCategoryCtrl'
      })
      .when('/manageItem', {
        templateUrl: 'views/manageItem.html',
        controller: 'manageItemCtrl'
      })
      .when('/addCategory', {
        templateUrl: 'views/addCategory.html',
        controller: 'manageCategoryCtrl'
      })
      .when('/addItem', {
        templateUrl: 'views/addItem.html',
        controller: 'manageItemCtrl'
      })
      .when('/modifyCategory/:id', {
        templateUrl: 'views/modifyCategory.html',
        controller: 'modifyCategoryCtrl'
      })
      .when('/modifyItem/:id', {
        templateUrl: 'views/modifyItem.html',
        controller: 'modifyItemCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
