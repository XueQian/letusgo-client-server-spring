'use strict';

describe("modifyItemCtrl", function () {

  var createController, $scope, CategoryService, ItemService, $routeParams;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemService = $injector.get('ItemService');
      $routeParams = $injector.get('$routeParams');
      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller('modifyItemCtrl', {
          $scope: $scope,
          CategoryService: CategoryService,
          ItemService: ItemService,
          $routeParams: $routeParams
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

  describe('when getItem', function () {

    it('should return item by id ', function () {
      var id = 0;
      var item = {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'};

      spyOn(ItemService, 'getItem').and.callFake(function (id, callback) {
        callback(item);
      });

      createController();

      ItemService.getItem(id, function (data) {
        expect($scope.item).toEqual(data);
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

  describe('when modifyItem', function () {

    it('should return items after modify', function () {
      var index = 0;
      var item = {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'};
      var items = [
        {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1}
      ];

      spyOn(ItemService, 'modifyItem').and.callFake(function (index, item, callback) {
        callback(items);
      });

      createController();
      $scope.modifyItem(index);
//      expect(ItemService.modifyItem).toHaveBeenCalledWith(index,item,function(){});

    });

  });


});
