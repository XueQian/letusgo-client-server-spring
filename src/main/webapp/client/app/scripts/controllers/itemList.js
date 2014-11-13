'use strict';

angular.module('letusgoApp')
  .controller('itemListCtrl', function ($scope, CartService, ItemService) {

    function EventName() {
      this.PARENT_ITEMLIST_ACTIVE = 'parent_itemListActive';
      this.PARENT_TOTAL_COUNT = 'parent_totalCount';
    }

    $scope.$emit(new EventName().PARENT_ITEMLIST_ACTIVE);

    ItemService.getGoodsItems(function (data) {
      $scope.itemList = data;
    });

    $scope.$emit(new EventName().PARENT_TOTAL_COUNT);

    $scope.addToCart = function (item) {

      CartService.addToCart(item, function () {
        $scope.$emit(new EventName().PARENT_TOTAL_COUNT);
      });
    };

  });


