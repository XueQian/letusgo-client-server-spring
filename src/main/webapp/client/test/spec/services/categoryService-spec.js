
'use strict';

describe('categoryService', function () {
  var categoryService, $httpBackend, categories,$http;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      categoryService = $injector.get('CategoryService');
      $httpBackend = $injector.get('$httpBackend');
      $http=$injector.get('$http');
    });

    categories = [
      {id: 0, name: '服装鞋包'},
      {id: 1, name: '手机数码'}
    ];
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should get categories use get', function () {
    $httpBackend.expectGET('/api/categories').respond(200, categories);
    categoryService.getCategories(function (data) {
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should add category when has exist category use post',function(){
    var category={id: 0, name: '服装鞋包'};

    $httpBackend.expectGET('/api/categories').respond(200,categories);
    $httpBackend.expectPOST('/api/categories').respond(200, categories);
    categoryService.addCategory(category,function(data){
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should add category when does not have exist category use post',function(){
    var category={name: '测试'};
    spyOn(categoryService, 'getCategories').and.callFake(function (callback) {
      callback(categories);
    });
    $httpBackend.expectPOST('/api/categories').respond(200, categories);
    categoryService.addCategory(category,function(data){
      expect(categories.length).toBe(3);
    });
    $httpBackend.flush();
  });

  it('should delete category use delete',function (){
    var id =0;
    spyOn($http,'delete');
    categoryService.deleteCategory(id);
    expect($http.delete).toHaveBeenCalled();
  });

  it('should get category by id use put',function (){
    var category ={id: 0, name: '服装鞋包'};
    $httpBackend.expectGET('/api/categories/0').respond(200, category);
    categoryService.getcategory(category.id,function(data){
      expect(data.name).toBe('服装鞋包');
    });
    $httpBackend.flush();
  });

  it('should modifyCategory by id use put',function(){
    var category ={id: 0, name: '服装鞋包'};
    $httpBackend.expectPUT('/api/categories/0').respond(200, category);
    categoryService.modifyCategory(category.id,category,function(data){
      expect(data.name).toBe('服装鞋包');
    });
    $httpBackend.flush();
  });

});
