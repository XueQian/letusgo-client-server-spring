
'use strict';

describe('itemService', function () {
  var itemService, $httpBackend, items,$http;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      itemService = $injector.get('ItemService');
      $httpBackend = $injector.get('$httpBackend');
      $http=$injector.get('$http');
    });

    items = [
      {id: 1, 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'},
     {id: 2, 'category': '全球美食', name: '美食１', 'price': 1111, 'unit': '件'}
    ];
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should get categories use get', function () {
    $httpBackend.expectGET('/api/items').respond(200,items);
    itemService.getGoodsItems(function (data) {
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should add item when has exist item use post',function(){
    var item={id: 1, 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'};
    $httpBackend.expectGET('/api/items').respond(200,items);
    $httpBackend.expectPOST('/api/items').respond(200, items);
    itemService.addItem(item,function(data){
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should add item when does not have exist item use post',function(){
    var item={name: '测试'};
    spyOn(itemService, 'getGoodsItems').and.callFake(function (callback) {
      callback(items);
    });
    $httpBackend.expectPOST('/api/items').respond(200, items);
    itemService.addItem(item,function(data){
      expect(items.length).toBe(3);
    });
    $httpBackend.flush();
  });

  it('should delete item by id use delete',function (){
    var id =items[0].id;
    spyOn($http,'delete');
    itemService.deleteGoodsItems(id);
    expect($http.delete).toHaveBeenCalled();
  });

  it('should get item by id use put',function (){
    var item ={id: 0, 'category': '服装鞋包', name: '服装1', 'price': 11, 'unit': '件'};
    $httpBackend.expectGET('/api/items/0').respond(200, item);
    itemService.getItem(item.id,function(data){
      expect(data.name).toBe('服装1');
    });
    $httpBackend.flush();
  });

  it('should modify item by id use put',function(){
    var item ={id: 0, 'category': '服装鞋包', name: '服装1', 'price': 11, 'unit': '件'};
    $httpBackend.expectPUT('/api/items/0').respond(200, item);
    itemService.modifyItem(item.id,item,function(data){
      expect(data.name).toBe('服装1');
    });
    $httpBackend.flush();
  });

});
