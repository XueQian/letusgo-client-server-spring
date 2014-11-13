'use strict';

angular.module('letusgoApp')
  .controller('indexCtrl', function ($scope, CartService) {

    function EventName() {

      this.PARENT_INDEX_ACTIVE = 'parent_indexActive';
      this.PARENT_CART_ACTIVE = 'parent_cartActive';
      this.PARENT_TOTAL_COUNT = 'parent_totalCount';
      this.PARENT_ITEMLIST_ACTIVE = 'parent_itemListActive';
      this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
      this.PARENT_TOTAL_COUNT_IS_ZERO = 'parent_totalCount is zero';
    }

    $scope.$emit(new EventName().PARENT_INDEX_ACTIVE);

    $scope.$on(new EventName().PARENT_TOTAL_COUNT, function () {

      CartService.getCartItems(function (data) {

          $scope.totalCount = CartService.getTotalCount(data);
      });
    });

    $scope.$on(new EventName().PARENT_TOTAL_COUNT_IS_ZERO, function () {

      $scope.totalCount = 0;
    });

    $scope.$on(new EventName().PARENT_INDEX_ACTIVE, function () {

      $scope.indexActive = true;
      $scope.itemListActive = false;
      $scope.cartActive = false;
      $scope.manageActive = false;
    });

    $scope.$on(new EventName().PARENT_ITEMLIST_ACTIVE, function () {

      $scope.indexActive = false;
      $scope.itemListActive = true;
      $scope.cartActive = false;
      $scope.manageActive = false;
    });

    $scope.$on(new EventName().PARENT_CART_ACTIVE, function () {

      $scope.indexActive = false;
      $scope.itemListActive = false;
      $scope.cartActive = true;
      $scope.manageActive = false;
    });

    $scope.$on(new EventName().PARENT_MANAGE_ACTIVE, function () {

      $scope.indexActive = false;
      $scope.itemListActive = false;
      $scope.cartActive = false;
      $scope.manageActive = true;
    });

  });
