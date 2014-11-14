'use strict';

angular.module('letusgoApp')
    .controller('itemListCtrl', function ($scope, CartService, ItemService,CategoryService) {

        function EventName() {
            this.PARENT_ITEMLIST_ACTIVE = 'parent_itemListActive';
            this.PARENT_TOTAL_COUNT = 'parent_totalCount';
        }

        $scope.$emit(new EventName().PARENT_ITEMLIST_ACTIVE);

        function update(){
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

        $scope.$emit(new EventName().PARENT_TOTAL_COUNT);

        $scope.addToCart = function (item) {
            CartService.addToCart(item, function () {
                update();
                $scope.$emit(new EventName().PARENT_TOTAL_COUNT);
            });
        };

    });


