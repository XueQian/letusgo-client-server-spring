'use strict';

angular.module('letusgoApp')
    .service('CartService', function ($http) {

        this.getCartItems = function (callback) {
            $http.get(' http://localhost:8080/api/cartitems').
                success(function (data) {
                    callback(data);
                });
        };

        this.addToCart = function (item, callback) {
            this.getCartItems(function (data) {

                var cartItems = data;

                if (hasExistItem(item, data)) {
                    var existCartItem = getExistCartItem(item, cartItems);
                    existCartItem.count++;

                } else {
                    cartItems.push({item: item, count: 1});
                }

                $http.post('http://localhost:8080/api/cartItems', {cartItems: cartItems})
                    .success(function () {
                        callback();
                    });

            });

        };


        this.changeCartItemCount = function (cartItem) {
            $http.put('http://localhost:8080/api/cartitems/' + cartItem.id, {id:cartItem.id,item:cartItem.item,count:cartItem.count});
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
            $http.post('/api/payment');
        };

        this.deleteCartItem = function (id) {
            $http.delete('http://localhost:8080/api/cartitems/' + id);
        };


        function hasExistItem(item, cartItems) {

            return _.any(cartItems, function (cartItem) {
                return item.name === cartItem.item.name;
            });
        }

        function getExistCartItem(item, cartItems) {

            return _.find(cartItems, function (cartItem) {
                return item.name === cartItem.item.name;
            });
        }


    });
