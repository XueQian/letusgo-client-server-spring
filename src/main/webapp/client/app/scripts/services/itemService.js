'use strict';

angular.module('letusgoApp')
  .service('ItemService', function ($http) {

    this.getGoodsItems = function (callback) {
      $http.get('/api/items').
        success(function (data) {
          callback(data);
        });
    };

    this.addItem = function (item, callback) {

      this.getGoodsItems(function (data) {

        var itemList = data;

        if (!hasExistItem(item,itemList)) {

          setExistItem(item,itemList);
        }

        $http.post('/api/items', {itemList: itemList})
          .success(function (data) {
            callback(data);
          });

      });
    };

    this.deleteGoodsItems = function (id) {
      $http.delete('/api/items/' + id);
    };

    this.getItem = function (id, callback) {

      $http.get('/api/items/' + id)
        .success(function (data) {
          callback(data);
        });
    };

    this.modifyItem = function (id, item, callback) {

      $http.put('/api/items/' + id, {item: item})
        .success(function (data) {
          callback(data);
        });
    };

    function hasExistItem(item,itemList){

      return _.any(itemList, function (itemList) {
        return item.name === itemList.name;
      });
    }

    function setExistItem(item,itemList){

      var id = _.pluck(itemList, 'id');
      item.id = _.max(id) + 1;
      itemList.push(item);
    }

  });

