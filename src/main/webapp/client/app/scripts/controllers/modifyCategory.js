'use strict';

angular.module('letusgoApp')
    .controller('modifyCategoryCtrl', function ($scope, CategoryService, $routeParams) {

        function EventName() {
            this.PARENT_MANAGE_ACTIVE = 'parent_manageActive';
        }

        $scope.$emit(new EventName().PARENT_MANAGE_ACTIVE);

        CategoryService.getCategory($routeParams.id, function (data) {
            $scope.category = data;
        });

        $scope.modifyCategory = function (category) {
            CategoryService.modifyCategory(category, function (data) {
                $scope.categories = data;
            });
        };

    });



