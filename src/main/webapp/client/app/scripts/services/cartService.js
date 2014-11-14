'use strict';

angular.module('letusgoApp')
    .service('CartService', function ($http) {


        this.getCartItems = function (callback) {
            $http.get(' http://localhost:8080/api/cartitems').
                success(function (data) {
                    callback(data);
                });
        };

        this.addToCart = function (item) {
            this.getCartItems(function (data) {
                var result =   _.find(data, function (cartItem) {
                    return  item.id=== cartItem.item.id;
                });

                if (result !== undefined) {
                        $http.put('http://localhost:8080/api/cartitems/' + result.id, {id: result.id, item: result.item, count: result.count + 1});

                    } else {
                        $http.post('http://localhost:8080/api/cartitems', {id: null, item: item, count: 1});
                    }
            });

        };

        this.changeCartItemCount = function (cartItem) {
            $http.put('http://localhost:8080/api/cartitems/' + cartItem.id, {id: cartItem.id, item: cartItem.item, count: cartItem.count});
        };

        this.getTotalCount = function (cartItems) {

            return  _.reduce(_.pluck(cartItems, 'count'), function (count1, count2) {
                return count1 + count2;
            });
        };

        this.getTotalMoney = function (cartItems) {

            var totalMoney = 0;
            _(cartItems).forEach(function (cartItem) {
                totalMoney += cartItem.item.price * cartItem.count;
            });

            return totalMoney;
        };

        this.remove = function () {
            $http.delete('http://localhost:8080/api/cartitems');
        };

        this.deleteCartItem = function (id) {
            $http.delete('http://localhost:8080/api/cartitems/' + id);
        };

    });
