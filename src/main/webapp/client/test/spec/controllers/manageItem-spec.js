'use strict';

describe("manageItemCtrl", function () {

  var createController, $location, $scope, CategoryService, ItemService;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      CategoryService = $injector.get('CategoryService');
      ItemService = $injector.get('ItemService');
      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller('manageItemCtrl', {
          $scope: $scope,
          CategoryService: CategoryService,
          ItemService: ItemService,
          $location: $location

        });
      };
    });
  });

  describe('when load', function () {

    it('it should emit to parent_manageActive', function () {
      spyOn($scope, '$emit');
      createController();
      expect($scope.$emit).toHaveBeenCalledWith('parent_manageActive');
    });

  });

  describe('when getGoodsItems', function () {

    var items;

    beforeEach(function () {
      items = [
        {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
      ];
    });

    it('should return goodsItems', function () {

      spyOn(ItemService, 'getGoodsItems').and.callFake(function (callback) {
        callback(items);
      });

      createController();

      ItemService.getGoodsItems(function (data) {
        expect($scope.products).toEqual(data);
      });

    });
  });

  describe('when deleteItem', function () {

    it('should call deleteGoodsItems in ItemService', function () {

      var index = 0;
      spyOn(ItemService, 'deleteGoodsItems');

      createController();
      $scope.deleteItem(index);
      expect(ItemService.deleteGoodsItems).toHaveBeenCalledWith(index);

    });

    it('should get goodsItems', function () {

      var items = [
        {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
      ];
      var index = 0;

      spyOn(ItemService, 'getGoodsItems').and.callFake(function (callback) {
        callback(items);
      });

      createController();
      $scope.deleteItem(index);

      ItemService.getGoodsItems(function (data) {
        expect($scope.products).toEqual(data);
      });
    });

  });

  describe('when getCategories', function () {

    var categories;

    beforeEach(function () {
      categories = [
        {id: 0, name: '服装鞋包'}
      ];
    });

    it('should return items to cart', function () {

      spyOn(CategoryService, 'getCategories').and.callFake(function (callback) {
        callback(categories);
      });

      createController();

      CategoryService.getCategories(function (data) {
        expect($scope.categories).toEqual(data);
      });

    });

  });

  describe('when addItem', function () {

    var items, item;

    beforeEach(function () {
      items = [
        {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
      ];
      item = {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'};
    });

    it('should return items after add', function () {

      spyOn(ItemService, 'addItem').and.callFake(function (item, callback) {
        callback(items);
      });

      createController();
      $scope.addItem();

      ItemService.addItem(item, function (data) {
        expect($scope.products).toEqual(data);
      });

    });
  });

});
