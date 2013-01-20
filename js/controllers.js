'use strict';

/*  Constants  */
var data_file_path = 'http://data.manyara.org.s3.amazonaws.com/';
var local_cache = { bookIndex:{} };

/* Factory */
manyara.factory ('_bookData', function($cacheFactory, $http){
    var _bookData = {};
    _bookData.indexCache = {}
    _bookData.getBookIndex = function(slug, callback){
        var bookIndex = _bookData.indexCache[slug];
        if (bookIndex){
            callback(bookIndex);
        }
        else{
            $http.get( data_file_path + 'books/index/'+slug+'.json').success(function(data) {
                bookIndex = data;
                _bookData.indexCache[slug] = bookIndex;
                callback(bookIndex);
            });
        }
    }
    _bookData.getBookPage = function(url, callback){
        $http.get(url).success(function(data) {
            var pageData = data;
            callback(pageData);
        });
    }
    return _bookData;
});


/* Controllers */

function DefaultCtrl($scope, $http) {
  $scope.alive = true;
}

function BookCtrl($scope, $http, $routeParams, _bookData) {
    var params = $routeParams;
    $scope.slug = params.slug;
    
    $scope.book = {contents:[]};
    _bookData.getBookIndex($scope.slug, function(bookIndex){
        $scope.book = bookIndex;
    });
}
function BookPageCtrl($scope, $http, $routeParams, _bookData) {
    var params = $routeParams;
    $scope.slug = params.slug;
    $scope.topicNumber = params.topicNumber;
    $scope.topicName = '';
    $scope.pageData = '';
    
    var page;
    _bookData.getBookIndex($scope.slug, function(bookIndex){
        $scope.book = bookIndex;
        var page = $scope.book.contents[$scope.topicNumber];
        $scope.topicName = page.caption;
        
        _bookData.getBookPage(page.link, function(pageData){
            $scope.content = pageData;
            /*
            var editor_opts = {
              container: 'epiceditor',
              basePath: 'lib/epiceditor',
              localStorageName: 'manyara_editor',
              parser: marked,
              focusOnLoad: false,
              shortcut: {
                modifier: 18,
                fullscreen: 70,
                preview: 80
              }
            };
            var editor = new EpicEditor(editor_opts).load();
            $scope.editor = editor;
            editor.importFile(page.link, pageData);
            editor.preview();
            */
        });
        
    });

    
}