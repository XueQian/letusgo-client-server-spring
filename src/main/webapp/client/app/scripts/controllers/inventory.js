'use strict';

angular.module('letusgoApp')
  .controller('inventoryCtrl', function ($scope, CartService) {

    function EventName() {
      this.PARENT_CART_ACTIVE = 'parent_cartActive';
      this.PARENT_TOTAL_COUNT = 'parent_totalCount';
      this.PARENT_TOTAL_COUNT_IS_ZERO = 'parent_totalCount is zero';
    }

    $scope.$emit(new EventName().PARENT_CART_ACTIVE);

    CartService.getCartItems(function (data) {
      $scope.boughtItems = data;
      $scope.totalMoney = CartService.getTotalMoney($scope.boughtItems);
    });

    $scope.$emit(new EventName().PARENT_TOTAL_COUNT);

    $scope.remove = function () {

      CartService.remove();
      $scope.$emit(new EventName().PARENT_TOTAL_COUNT_IS_ZERO);
    };
  });

