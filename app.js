var app = angular.module('myApp',[]);

app.controller('myController',['$scope',function($scope){
	$scope.result = "";
	$scope.allNumbers = [7,8,9,"/",4,5,6,"*",1,2,3,"-",0,".","%","+"];

	$scope.calArr = [];
	$scope.lastIndex = null;
	$scope.previousNumber = null;
	var previousInput="";
	$scope.pushNumber = function(x){
		// if(typeof x==="string" && x!="."){
		// 	$scope.calArr.push(Number($scope.result.substr($scope.lastIndex)));
		// 	$scope.lastIndex = $scope.result.length+1;
		// 	$scope.calArr.push(x);
		// 	console.log($scope.calArr);
		// }
		if(typeof x !== "string" || typeof previousInput !== "string"){
			$scope.result += x;
			
		}else{
			
		}

		previousInput = x;
	}

	$scope.calculate = function(){
		//$scope.calArr = [6,"/",6,"-",1];
		
		//removing the last operator because that would not make any sense eg 3+1 +
		if($scope.result[$scope.result.length-1] === "/" || $scope.result[$scope.result.length-1] === "*"|| $scope.result[$scope.result.length-1] === "+" || $scope.result[$scope.result.length-1] === "%" || $scope.result[$scope.result.length-1] === "-"){
			$scope.deleteOneChar();
		}
		//simplest way 
		console.log($scope.result);
		$scope.result = eval($scope.result);

		// $scope.calArr = getArrFromString();
		// var i=0;
		// var precedence = ["/","*","+","-"];
		// while(i<precedence.length){
		// 	var index = $scope.calArr.indexOf(precedence[i]);
		// 	if(index!= -1){
		// 		var result;
		// 		switch(precedence[i]){
		// 			case "/": result = $scope.calArr[index-1]/ $scope.calArr[index+1];break;
		// 			case "*": result = $scope.calArr[index-1]* $scope.calArr[index+1];break;
		// 			case "+": result = $scope.calArr[index-1]+ $scope.calArr[index+1];break;
		// 			case "-": result = $scope.calArr[index-1]+ $scope.calArr[index+1];break;
		// 		}
		// 		$scope.calArr[index-1] = result;
		// 		$scope.calArr.splice(index+1,1);
		// 		$scope.calArr.splice(index,1);
		// 	}else{
		// 		i++; //check for other precedence if all the cases of the current precedence has been triggered
		// 	}
		// }
		// console.log($scope.calArr);

	}

	$scope.clearAll = function(){
		$scope.result = "";
	}

	$scope.deleteOneChar = function(){
		$scope.result = String($scope.result);
		$scope.result = $scope.result.substring(0, $scope.result.length-1);
	}

	// function getArrFromString(){
	// 	var calArr = [];
	// 	var i =0 ;
	// 	var selectedNum = ""
	// 	while(i<$scope.result.length){
	// 		if(Number($scope.result[i])){
	// 			selectedNum += $scope.result[i];
	// 			i++;
	// 		}else{
	// 			calArr.push(Number(selectedNum));
	// 			calArr.push($scope.result[i]);
	// 			selectedNum = "";
	// 			i++;
	// 		}
	// 	}
	// 	Number(selectedNum) ? calArr.push(Number(selectedNum)) : "" ;
	// 	return calArr;
	// 	// for(var i = 0; i< $scope.result.length ; i++ ){
	// 	// 	if($scope.result[i]=== "/" || $scope.result[i] == "*" || $scope.result[i] == "+" || $scope.result[i] == "-"){
	// 	// 		calArr.push(Number($scope.result.substr(previous,i)));
	// 	// 		calArr.push($scope.result[i]);
	// 	// 		previous = i+1;
	// 	// 	}

	// 	// }


	// }
}]);



angular.element(function(){
	console.log("Asdasd");
	angular.bootstrap(document,['myApp']);
});

