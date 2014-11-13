'use strict';

angular.module('letusgoApp')
  .service('CartService', function ($http) {

    this.getCartItems = function (callback) {
      $http.get('/api/cartItems').
        success(function (data) {
          callback(data);
        });
    };

    this.addToCart = function (item, callback) {
      this.getCartItems(function (data) {

        var cartItems = data;

        if (hasExistItem(item,data)) {
          var existCartItem = getExistCartItem(item,cartItems);
          existCartItem.count++;

        } else {
          cartItems.push({item: item, count: 1});
        }

        $http.post('/api/cartItems', {cartItems: cartItems})
          .success(function () {
            callback();
          });

      });

    };


    this.changeCartItemCount = function (cartItem, callback) {

      var id = cartItem.item.id;
      $http.put('/api/cartItems/' + id, {cartItem: cartItem})
        .success(function (data) {
          callback(data);
        });
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

    function hasExistItem(item,cartItems){

      return _.any(cartItems, function (cartItem) {
        return item.name === cartItem.item.name;
      });
    }

    function getExistCartItem(item,cartItems){

      return _.find(cartItems, function (cartItem) {
        return item.name === cartItem.item.name;
      });
    }


  });
