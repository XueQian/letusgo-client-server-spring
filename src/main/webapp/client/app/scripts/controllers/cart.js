'use strict';

angular.module('letusgoApp')
  .controller('cartCtrl', function ($scope, CartService) {

    function EventName() {
      this.PARENT_CART_ACTIVE = 'parent_cartActive';
      this.PARENT_TOTAL_COUNT = 'parent_totalCount';
    }

    $scope.$emit(new EventName().PARENT_CART_ACTIVE);

    function getCartItems(data) {

      $scope.cartItems = data;
      $scope.totalMoney = CartService.getTotalMoney($scope.cartItems);
    }

    CartService.getCartItems(function (data) {
      getCartItems(data);
    });

    $scope.$emit(new EventName().PARENT_TOTAL_COUNT);

    function getTotalCount() {

      CartService.getTotalCount($scope.cartItems);
      $scope.$emit(new EventName().PARENT_TOTAL_COUNT);

    }

    $scope.changeCount = function (newCartItem) {

      CartService.changeCartItemCount(newCartItem, function (data) {

        getCartItems(data);
        getTotalCount();
      });
    };

  });
