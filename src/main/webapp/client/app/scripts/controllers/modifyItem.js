'use strict';

angular.module('letusgoApp')
  .controller('modifyItemCtrl', function ($scope, CategoryService, ItemService, $routeParams) {

    function EventName() {
      this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
    }

    $scope.$emit(new EventName().PARENT_MANAGE_ACTIVE);

    ItemService.getItem($routeParams.id, function (data) {
      $scope.item = data;
    });

    CategoryService.getCategories(function (data) {
      $scope.categories = data;
    });

    $scope.modifyItem = function (index) {
      ItemService.modifyItem(index, $scope.item, function () {
      });
    };

  });

