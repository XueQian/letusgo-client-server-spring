'use strict';

describe('indexCtrl', function () {

  var $rootScope,createController, $scope, CartService;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $scope = $injector.get('$rootScope').$new();
      CartService = $injector.get('CartService');
      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller('indexCtrl', {
          $scope: $scope,
          CartService: CartService
        });
      };
    });
  });

  it('when load,it should emit to parent_totalCount', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('parent_indexActive');
  });

  it('parent_totalCount should should call getTotalCount in CartService', function () {
    var  data = [
      {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
    ];

    spyOn(CartService, 'getCartItems').and.callFake(function (callback) {
      callback(data);
    });
    spyOn(CartService,'getTotalCount');

    createController();
    $scope.$digest();
    $rootScope.$broadcast('parent_totalCount');
    $scope.$digest();

    CartService.getCartItems(function () {
      expect(CartService.getTotalCount).toHaveBeenCalled();
    });

  });

  it('parent_totalCount is zero should return correct value', function () {
    createController();
    $scope.$digest();
    $rootScope.$broadcast('parent_totalCount is zero');
    $scope.$digest();
    expect($scope.totalCount).toBe(0);
  });

  it('parent_indexActive should return correct value', function () {
    createController();
    $scope.$digest();
    $rootScope.$broadcast('parent_indexActive');
    $scope.$digest();
    expect($scope.indexActive).toBe(true);
  });

  it('parent_itemListActive should return correct value', function () {
    createController();
    $scope.$digest();
    $rootScope.$broadcast('parent_itemListActive');
    $scope.$digest();
    expect($scope.itemListActive).toBe(true);
  });

  it('parent_cartActive should return correct value', function () {
    createController();
    $scope.$digest();
    $rootScope.$broadcast('parent_cartActive');
    $scope.$digest();
    expect($scope.cartActive).toBe(true);
  });

  it('parent_manageActive should return correct value', function () {
    createController();
    $scope.$digest();
    $rootScope.$broadcast('parent_manageActive');
    $scope.$digest();
    expect($scope.manageActive).toBe(true);
  });

});
