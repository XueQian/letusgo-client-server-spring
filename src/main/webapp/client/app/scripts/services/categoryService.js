'use strict';

angular.module('letusgoApp')
    .service('CategoryService', function ($http) {

        this.getCategories = function (callback) {
            $http.get('http://localhost:8080/api/categories').
                success(function (data) {
                    callback(data);
                });
        };

        this.addCategory = function (category) {

            this.getCategories(function (data) {

                if (!hasExistCategory(category, data)) {

                    $http.post('http://localhost:8080/api/categories', {id: null, name: category.name});
                }
            });
        };

        this.deleteCategory = function (id) {
            $http.delete('http://localhost:8080/api/categories/' + id);
        };

        this.getCategory = function (id, callback) {

            $http.get('http://localhost:8080/api/categories/' + id)
                .success(function (data) {
                    callback(data);
                });
        };

        this.modifyCategory = function (category) {
            $http.put('http://localhost:8080/api/categories/' + category.id, {id: category.id, name: category.name})
        };

        function hasExistCategory(category, categoryList) {

            return _.any(categoryList, function (aCategory) {
                return category.name === aCategory.name;
            });
        }

    });










