'use strict';

describe("itemListCtrl", function () {

  var createController, $scope, CartService, ItemService;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CartService = $injector.get('CartService');
      ItemService = $injector.get('ItemService');
      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller('itemListCtrl', {
          $scope: $scope,
          CartService: CartService,
          ItemService: ItemService
        });
      };
    });
  });

  describe('when load', function () {
    it('it should emit to parent_itemListActive', function () {
      spyOn($scope, '$emit');
      createController();
      expect($scope.$emit).toHaveBeenCalledWith('parent_itemListActive');
    });

    it('it should emit to parent_totalCount', function () {
      spyOn($scope, '$emit');
      createController();
      expect($scope.$emit).toHaveBeenCalledWith('parent_totalCount');
    });

  });

  describe('when getGoodsItems', function () {

    var items;

    beforeEach(function () {
      items = [
        {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
      ];
    });

    it('should return items to cart', function () {

      spyOn(ItemService, 'getGoodsItems').and.callFake(function (callback) {
        callback(items);
      });

      createController();

      ItemService.getGoodsItems(function (data) {
        expect($scope.itemList).toEqual(data);
      });

    });
  });

  describe('when addToCart', function () {
    var item, items;

    beforeEach(function () {
      item = {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'};
      items = [
        {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}
      ];
    });

    it('should return items to cart', function () {

      spyOn(CartService, 'addToCart').and.callFake(function (item, callback) {
        callback();
      });
      spyOn($scope, '$emit');

      createController();
      $scope.addToCart(item);

      CartService.addToCart(item, function () {
        expect($scope.$emit).toHaveBeenCalledWith('parent_totalCount');

      });

    });

  });

});


