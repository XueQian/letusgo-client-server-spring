'use strict';

angular.module('letusgoApp')
    .controller('manageCategoryCtrl', function ($scope, $location, CategoryService, CartService) {

        function EventName() {
            this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
        }

        $scope.$emit(new EventName().PARENT_MANAGE_ACTIVE);

        function update() {
            CategoryService.getCategories(function (data) {
                $scope.categories = data;
            });

        }
        update();

//        $scope.getItem = function (id) {
//            return ItemService.getItem(id);
//        };

        $scope.deleteCategory = function (id) {
            CategoryService.deleteCategory(id);
            update();
        };

        $scope.addCategory = function () {

            CategoryService.addCategory($scope.category, function (data) {
                $scope.categories = data;
                $location.path('/manageCategory');
            });
        };

    });
