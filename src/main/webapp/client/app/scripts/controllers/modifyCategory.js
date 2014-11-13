'use strict';

angular.module('letusgoApp')
  .controller('modifyCategoryCtrl', function ($scope, CategoryService, $routeParams) {

    function EventName() {
      this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
    }

    $scope.$emit(new EventName().PARENT_MANAGE_ACTIVE);

    CategoryService.getcategory($routeParams.id, function (data) {
      $scope.category = data;
    });

    $scope.modifyCategory = function (index) {
      CategoryService.modifyCategory(index, $scope.category, function (data) {
        $scope.categories = data;
      });
    };

  });



