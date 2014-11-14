'use strict';

angular.module('letusgoApp')
    .service('ItemService', function ($http) {

        this.getItems = function (callback) {
            $http.get('http://localhost:8080/api/items').
                success(function (data) {
                    callback(data);
                });
        };

        this.addItem = function (item) {

            this.getItems(function (data) {

                if (!hasExistItem(item, data)) {
                    console.log(item.category.id+'---------');
                    $http.post('http://localhost:8080/api/items', {id: null, name: item.name, unit: item.unit, price: item.price, categoryId: item.category.id});
                }

            });
        };

        this.deleteItem = function (id) {
            $http.delete('http://localhost:8080/api/items/' + id);
        };

        this.getItem = function (id, callback) {

            $http.get('http://localhost:8080/api/items/' + id)
                .success(function (data) {
                    callback(data);
                });
        };

        this.modifyItem = function (id, item, callback) {

            $http.put('http://localhost:8080/api/items/' + id, {item: item})
                .success(function (data) {
                    callback(data);
                });
        };

        function hasExistItem(item, itemList) {

            return _.any(itemList, function (itemList) {
                return item.name === itemList.name;
            });
        }

    });

