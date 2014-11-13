'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function ($http) {

    this.getCategories = function (callback) {
      $http.get('/api/categories').
        success(function (data) {
          callback(data);
        });
    };

    this.addCategory = function (category, callback) {

      this.getCategories(function (data) {

        var categoryList = data;

        if (!hasExistCategory(category,categoryList)) {

          setExistCatogory(category,categoryList);
        }

        $http.post('/api/categories', {categoryList: categoryList})
          .success(function (data) {
            callback(data);
          });

      });
    };

    this.deleteCategory = function (id) {
      $http.delete('/api/categories/' + id);
    };

    this.getcategory = function (id, callback) {

      $http.get('/api/categories/' + id)
        .success(function (data) {
          callback(data);
        });
    };

    this.modifyCategory = function (id, category, callback) {

      $http.put('/api/categories/' + id, {category: category})
        .success(function (data) {
          callback(data);
        });
    };

    function hasExistCategory(category,categoryList){

      return _.any(categoryList, function (aCategory) {
        return category.name === aCategory.name;
      });
    }

    function setExistCatogory(category,categoryList){
      var id = _.pluck(categoryList, 'id');
      category.id = _.max(id) + 1;

      categoryList.push(category);
    }

  });










