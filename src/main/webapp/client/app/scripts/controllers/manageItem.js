'use strict';

angular.module('letusgoApp')
  .controller('manageItemCtrl', function ($location, $scope, CategoryService, ItemService) {

    function EventName() {
      this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
    }

    $scope.$emit(new EventName().PARENT_MANAGE_ACTIVE);

    ItemService.getGoodsItems(function (data) {
      $scope.items = data;
    });

    $scope.deleteItem = function (index) {

      ItemService.deleteGoodsItems(index);

      ItemService.getGoodsItems(function (data) {
        $scope.items = data;
      });
    };

    CategoryService.getCategories(function (data) {
      $scope.categories = data;
    });

    $scope.addItem = function () {

      ItemService.addItem($scope.item, function (data) {
        $scope.items = data;
        $location.path('/manageItem');
      });
    };

  });
