'use strict';

/* App Module */

var manyara = angular.module('manyara', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/home', {templateUrl: 'pages/home.html',   controller: DefaultCtrl}).
      when('/books', {templateUrl: 'pages/books.html',   controller: DefaultCtrl}).
      when('/book/:slug', {templateUrl: 'pages/book.html',   controller: BookCtrl}).
      when('/book/:slug/:topicNumber', {templateUrl: 'pages/book-page.html',   controller: BookPageCtrl}).
      when('/members', {templateUrl: 'pages/members.html',   controller: DefaultCtrl}).
      when('/members/:slug', {templateUrl: 'pages/member.html',   controller: DefaultCtrl}).
      when('/help', {templateUrl: 'pages/help.html',   controller: DefaultCtrl}).

      
      otherwise({redirectTo: '/home'});
}]);
