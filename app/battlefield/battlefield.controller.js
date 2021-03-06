(function() {
    'use strict';

    angular.module('2077.battlefield')
        .controller('BattlefieldController', battlefieldController);

    /* @ngInject */
    function battlefieldController(GameState, $scope, $interval, $cookies) {
        var vm = this;
        vm.gameState = GameState;

        activate();

        function activate() {
            $scope.$on('saveRequested', saveGame);
            beginFighting();
        }

        ///////////////////////////////////////////////////////////////////////

        var stop;

        function beginFighting() {
            if (angular.isDefined(stop)) {
                return;
            }

            stop = $interval(function() {
                $scope.$broadcast('attackMob');
            }, vm.gameState.state.attackSpeed);
        }

        function saveGame() {
            $cookies.putObject('2077', vm.gameState.getState())
        }

        function stopFighting() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        }

        $scope.$on('$destroy', function () {
            stopFighting();
        });
    }
})();