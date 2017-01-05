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
    .factory('RequireJSONInterceptor', ['$q', 'ApiLocator', function($q, ApiLocator){
      return {
        'response': function (response) {
          if (response
              && response.config.url.substr(0, ApiLocator.getPath().length) == ApiLocator.getPath()
              && response.headers('Content-Type') != 'application/json') {
            return $q.reject('Response was not JSON');
          } else {
            return response;
          }
        }
      };
    }])
    .config(['$httpProvider', function ($httpProvider){
      $httpProvider.interceptors.push('RequireJSONInterceptor');
    }])
    .service('ApiLocator', ['$location', function($location) {
      this.path = $location.path() + 'api/v1/';

      this.getPath = function() {
        return this.path;
      }

      this.setPath = function(new_path) {
        this.path = new_path;
      }

      this.url = function(endpoint) {
        return this.getPath() + endpoint;
      }
    }])
    .factory('Api.status', ['$http', 'ApiLocator', 'ModalFactory', function($http, ApiLocator, ModalFactory) {
      var connection_settings_modal = null;

      return {
        'getStatus': function() {
          var promise = $http.get(ApiLocator.url('status'));
          promise.then(function(response) {
            if (connection_settings_modal) {
              connection_settings_modal.destroy();
              connection_settings_modal = null;
            }
          });
          promise.catch(function (errResponse) {
            if (!connection_settings_modal) {
              // Show connection settings dialog
              connection_settings_modal = new ModalFactory({
                overlay: 'true',
                overlayClose: 'false',
                templateUrl: 'templates/partials/connection-settings-modal.html',
              });
              connection_settings_modal.activate();
            }
          });
          return promise;
        }
      }
    }])
    .controller('AppController', ['$http', 'Api.status', 'ApiLocator', function($http, Api_status, ApiLocator) {
      // When starting up, determine the status of the server and prompt for any missing settings.
      var self = this;

      self.status = {};

      self.getStatus = function() {
        Api_status.getStatus().then(
          function(response) {
            self.status = response.data;
          }
        );
      }

      self.getStatus();
    }])
    .controller('ConnectionSettingsController', ['ApiLocator', 'Api.status', function(ApiLocator, Api_status){
      var self = this;
      self.api_url = ApiLocator.getPath();

      self.submit = function() {
        ApiLocator.setPath(self.api_url);
        Api_status.getStatus();
      }
    }])
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
