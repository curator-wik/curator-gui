(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    // ui-grid
    'ui.grid',
    'ui.grid.treeView'
  ])
    .config(config)
    .controller('TasksController', ['$scope', 'uiGridTreeViewConstants', 'uiGridConstants', function ($scope, uiGridTreeViewConstants, uiGridConstants) {
      $scope.gridOptions = {
        showTreeExpandNoChildren: true,
        columnDefs: [
          { name: 'task', width: '80%' },
          { name: 'progress', width: '20%'},
        ],
        minRowsToShow: 8,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
      };

      $scope.gridOptions.data = [
        {'task': 'Update core to version 7.50', 'progress': '82%', '$$treeLevel': 0},
        {'task': 'Apply patches', 'progress': '82%'},
        {'task': 'Delete old files', 'progress': '100%'},
        {'task': 'Update component "Rules"', 'progress': '20%', '$$treeLevel': 0},
        {'task': 'Apply patches', 'progress': '34%'},
        {'task': 'Install replacement files', 'progress': '-'},
      ];
    }])
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
