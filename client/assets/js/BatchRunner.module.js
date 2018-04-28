(function() {
    'use strict';

    angular.module('BatchRunner', ['application'])
    .factory('RunBatchInterceptor', ['$q', 'BatchRunner', function($q, BatchRunner){
        return {
            'response': function (response) {
                if (response && response.headers('X-Needs-Batch')) {
                    return BatchRunner.start($q, response.headers('X-Needs-Batch'));
                }
            }
        }
    }])
    .service('BatchRunner', ['ApiLocator', '$http', function(ApiLocator, $http) {
        this.running = false;
        // return a promise that resolves with the unpacked original response
        // when the batch is done?
        this.start = function(orig_q, taskId) {
            // TODO: create API for batch task query for population of grid
            // and retrieval of current runner ids.
            $http.get(ApiLocator.url('batch-overview'))
                .then(function (batchOverviewResponse) {
                    // Suppose pending batches are contained in a nested structure
                    // in BatchOverviewResponse.taskGroups.
                    // What is the idiomatic way to transform to the bound property
                    // of TasksController?
                    if (! this.running) {

                    }
                })
        }

        this.test = function() {
            return 42;
        }
    }]);
})();