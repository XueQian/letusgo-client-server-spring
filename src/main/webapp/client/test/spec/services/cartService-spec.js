
'use strict';

describe('cartService', function () {
  var cartService, $httpBackend, cartItems,$http;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      cartService = $injector.get('CartService');
      $httpBackend = $injector.get('$httpBackend');
      $http=$injector.get('$http');
    });

    cartItems = [
      {item: {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1},
      {item: {barcode: 'ITEM00002', 'category': '全球美食', name: '美食１', 'price': 1111, 'unit': '件'}, count: 2}
    ];

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should get cartItems use get', function () {
    $httpBackend.expectGET('/api/cartItems').respond(200, cartItems);
    cartService.getCartItems(function (data) {
      expect(data.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should add to cart when has exist item use post',function(){
    var item = {barcode: 'ITEM00000', 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'};
    $httpBackend.expectGET('/api/cartItems').respond(200,cartItems);
    cartItems[0].count = 2;
    $httpBackend.expectPOST('/api/cartItems').respond(200, cartItems);
    cartService.addToCart(item,function(data){
        expect(cartItems[0].count).toBe(2);
        expect(cartItems.length).toBe(2);
      });
    $httpBackend.flush();
  });

  it('should add to cart when does not have exist item use post',function(){
    var item = {barcode: 'ITEM00000', 'category': '服装鞋包', name: '测试1', 'price': 11, 'unit': '件'};
    $httpBackend.expectGET('/api/cartItems').respond(200,cartItems);
    $httpBackend.expectPOST('/api/cartItems').respond(200, cartItems);
    cartService.addToCart(item,function(data){
      expect(cartItems[0].count).toBe(1);
      expect(cartItems.length).toBe(2);
    });
    $httpBackend.flush();
  });

  it('should change cartItem count use put',function (){
    var cartItem = {item: {id:1, 'category': '服装鞋包', name: '服装１', 'price': 11, 'unit': '件'}, count: 1};
    $httpBackend.expectPUT('/api/cartItems/1').respond(200, cartItem);
    cartService.changeCartItemCount(cartItem,function(data){
      expect(data.count).toBe(1);
    });
    $httpBackend.flush();
  });

  it('should have getTotalCount function',function(){
    var result=cartService.getTotalCount(cartItems);
    expect(result).toBe(3);
  });

  it('should have getTotalCount function',function(){
    var result=cartService.getTotalMoney(cartItems);
    expect(result).toBe(2233);
  });

  it('should remove cartItems use post',function(){
    spyOn($http,'post');
    cartService.remove();
    expect($http.post.calls.count()).toBe(1);
  });

});
