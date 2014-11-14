'use strict';

angular.module('letusgoApp')
    .controller('manageItemCtrl', function ($location, $scope, CategoryService, ItemService) {

        function EventName() {
            this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
        }

        $scope.$emit(new EventName().PARENT_MANAGE_ACTIVE);

        function update() {
            ItemService.getItems(function (data) {

                _(data).forEach(function (item) {

                    CategoryService.getCategory(item.categoryId, function (data) {
                        item.category = data.name;
                    });

                });

                $scope.items = data;
            });

        }

        update();

        $scope.deleteItem = function (id) {

            ItemService.deleteItem(id);

            update();
        };

        $scope.addItem = function () {

            ItemService.addItem($scope.item, function () {
                update();
                $location.path('/manageItem');
            });
        };

        CategoryService.getCategories(function (data) {
            $scope.categories = data;
        });

    });
