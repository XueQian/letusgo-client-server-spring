'use strict';

describe("inventoryCtrl", function () {

  var createController, $scope, CartService;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CartService = $injector.get('CartService');
      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller('inventoryCtrl', {
          $scope: $scope,
          CartService: CartService
        });
      };
    });
  });

  describe('when load', function () {

    it('it should emit to parent_cartActive', function () {
      spyOn($scope, '$emit');
      createController();
      expect($scope.$emit).toHaveBeenCalledWith('parent_cartActive');
    });

    it('it should emit to parent_totalCount', function () {
      spyOn($scope, '$emit');
      createController();
      expect($scope.$emit).toHaveBeenCalledWith('parent_totalCount');
    });

  });

  describe('when getCartItems,', function () {

    var items;

    beforeEach(function () {
      items = [
        {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
      ];
    });

    it('should return items to cart', function () {

      spyOn(CartService, 'getCartItems').and.callFake(function (callback) {
        callback(items);
      });
      spyOn(CartService, 'getTotalMoney');

      createController();

      CartService.getCartItems(function (data) {
        expect($scope.boughtItems).toEqual(data);
        expect(CartService.getTotalMoney).toHaveBeenCalled();
      });

    });
  });

  describe('when remove,', function () {

    it('should call remove from CartService', function () {
      spyOn(CartService, 'remove');

      createController();
      $scope.remove();
      expect(CartService.remove).toHaveBeenCalled;
    });

    it('it should emit to parent_totalCount is zero', function () {
      spyOn($scope, '$emit');
      createController();
      $scope.remove();
      expect($scope.$emit).toHaveBeenCalledWith('parent_totalCount is zero');
    });

  });
});



