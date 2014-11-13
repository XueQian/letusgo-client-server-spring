'use strict';

describe("manageCategoryCtrl", function () {

  var createController, $scope, $location, CategoryService, ItemService;

  beforeEach(function () {

    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      CategoryService = $injector.get('CategoryService');
      ItemService = $injector.get('ItemService');
      var $controller = $injector.get('$controller');

      createController = function () {

        return $controller('manageCategoryCtrl', {
          $scope: $scope,
          $location: $location,
          CategoryService: CategoryService,
          ItemService: ItemService
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

  describe('when getItem', function () {

    it('should call getItem in ItemService', function () {

      var id = 0;
      spyOn(ItemService, 'getItem');

      createController();
      $scope.getItem(id);
      expect(ItemService.getItem).toHaveBeenCalledWith(id);

    });

  });

  describe('when deleteCategory', function () {

    it('should call deleteCategory in CategoryService', function () {

      var index = 0;
      spyOn(CategoryService, 'deleteCategory');

      createController();
      $scope.deleteCategory(index);
      expect(CategoryService.deleteCategory).toHaveBeenCalledWith(index);

    });

    it('should get categories', function () {

      var categories = [
        {id: 0, name: '服装鞋包'}
      ];
      var index = 0;

      spyOn(CategoryService, 'getCategories').and.callFake(function (callback) {
        callback(categories);
      });

      createController();
      $scope.deleteCategory(index);

      CategoryService.getCategories(function (data) {
        expect($scope.categories).toEqual(data);
      });
    });

  });

  describe('when addCategory', function () {

    var categories, category;

    beforeEach(function () {
      categories = [
        {id: 0, name: '服装鞋包'}
      ];
      category = {id: 0, name: '服装鞋包'};
    });

    it('should return categories after add', function () {

      spyOn(CategoryService, 'addCategory').and.callFake(function (category, callback) {
        callback(categories);
      });

      createController();
      $scope.addCategory();

      CategoryService.addCategory(category, function (data) {
        expect($scope.categories).toEqual(data);
      });

    });
  });

});





