angular.module('app')
	.directive('backAnimation', ['$browser', '$location', function($browser, $location) {
	return {
		link: function(scope, element) {

			$browser.onUrlChange(function(newUrl) {
				if ($location.absUrl() === newUrl) {
					console.log('Back');
					element.addClass('reverse');
				}
			});

			scope.__childrenCount = 0;
			scope.$watch(function() {
				scope.__childrenCount = element.children().length;
			});

			scope.$watch('__childrenCount', function(newCount, oldCount) {
				if (newCount !== oldCount && newCount === 1) {
					element.removeClass('reverse');
				}
			});
		}
	};
}]).directive('progressBar', [
        function () {
            return {
                link: function ($scope, el, attrs) {
                    $scope.$watch(attrs.progressBar, function (newValue) {
                        el.css('width', newValue.toString() + '%');
                    });
                }
            };
        }]);
