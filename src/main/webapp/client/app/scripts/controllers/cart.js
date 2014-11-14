'use strict';

angular.module('letusgoApp')
    .controller('cartCtrl', function ($scope, CartService) {

        function EventName() {
            this.PARENT_CART_ACTIVE = 'parent_cartActive';
            this.PARENT_TOTAL_COUNT = 'parent_totalCount';
        }
        function getCartItems() {

            CartService.getCartItems(function (data) {
                $scope.cartItems = data;
                $scope.totalMoney = CartService.getTotalMoney($scope.cartItems);
            });
        }
        function getTotalCount() {
            CartService.getTotalCount($scope.cartItems);
            $scope.$emit(new EventName().PARENT_TOTAL_COUNT);
        }

        $scope.$emit(new EventName().PARENT_CART_ACTIVE);
        $scope.$emit(new EventName().PARENT_TOTAL_COUNT);

        getCartItems();
        $scope.changeCount = function (newCartItem) {
            CartService.changeCartItemCount(newCartItem);

            getTotalCount();
            getCartItems();
        };

        $scope.deleteCartItem = function (id) {
            CartService.deleteCartItem(id);
        }
    });
