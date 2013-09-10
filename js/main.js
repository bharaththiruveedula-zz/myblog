var mainapp = angular.module("main-app",[]);
	mainapp.config(function($interpolateProvider) {
  		$interpolateProvider.startSymbol('{[{');
  		$interpolateProvider.endSymbol('}]}');
	});
	var List = function($scope, $http){
		var alertmsg = '';
		$http({method: 'GET', url: 'api/v1/todos/?format=json'}).
  			success(function(data, status, headers, config) {
  				$scope.todos = data.objects;
			}).
  			error(function(data, status, headers, config) {
  			});
		$scope.remove = function(id,index){
			$http({method: 'DELETE', url: 'api/v1/todos/'+id}).
  			success(function(data, status, headers, config) {
				$scope.todos.splice(index,1);
				$scope.alertmsg = "You have successfully deleted the todo";
				console.log(jQuery);
			}).
  			error(function(data, status, headers, config) {
  			});

		}
		$scope.add = function(){
			var name = $scope.addtext;
			$http.post('api/v1/todos/',
				{name:name}).
			success(function(data, status, headers, config) {
				$http({method: 'GET', url: 'api/v1/todos/?format=json'}).
  				success(function(data, status, headers, config) {
  					$scope.todos = data.objects;
				}).
  				error(function(data, status, headers, config) {
  				});
  				$scope.addtext = '';
			}).
			error(function(data, status, headers, config) {
  			});		
		}
	}

