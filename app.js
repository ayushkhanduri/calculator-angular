/*
	Here i have implemented my own version of bodmas algorithm , it handles +,-,*,/ 
	for eg 4*2/2 +1 = ?
	According to BODMAS (bracket of division multiplication addition subtraction)
	But the precedence of (division,multiplication) and (addition,subtraction) is same so precedence is determined by the 
	fact which came first from left to right
	so in the example 
	1) Multiply and division have same precedence but multiply comes first from left to right so we will multiply first 4*2 = 8;
	2) Then comes division 8/2 = 4;
	3) Then addition 4+1 = 5;
*/


var app = angular.module('myApp',[]);

app.controller('myController',['$scope',function($scope){
	$scope.result = "";
	$scope.allNumbers = [7,8,9,"/",4,5,6,"*",1,2,3,"-",0,".","%","+"];

	$scope.calArr = [];
	$scope.lastIndex = null;
	$scope.previousNumber = null;
	var previousInput="";
	$scope.pushNumber = function(x){
		if(typeof x !== "string" || typeof previousInput !== "string"){
			$scope.result += x;
			
		}else{
			
		}

		previousInput = x;
	}

	$scope.calculate = function(){
		
		//removing the last operator because that would not make any sense eg 3+1 +
		if($scope.result[$scope.result.length-1] === "/" || $scope.result[$scope.result.length-1] === "*"|| $scope.result[$scope.result.length-1] === "+" || $scope.result[$scope.result.length-1] === "%" || $scope.result[$scope.result.length-1] === "-"){
			$scope.deleteOneChar();
		}
		//simplest way 
		// console.log($scope.result);
		// $scope.result = eval($scope.result);

		$scope.calArr = getArrFromString();
		var i=0;
		var precedence = ["/","*","+","-"]; 
		while(i<precedence.length){
			var index = precedenceCheck(precedence, i); //because (/,*) & (+,-) have same precedence,*goto top
			if(index!= -1){
				var result;
				var currentPrecedence = $scope.calArr[index];
				switch(currentPrecedence){
					case "/": result = $scope.calArr[index-1]/ $scope.calArr[index+1];break;
					case "*": result = $scope.calArr[index-1]* $scope.calArr[index+1];break;
					case "+": result = $scope.calArr[index-1]+ $scope.calArr[index+1];break;
					case "-": result = $scope.calArr[index-1]- $scope.calArr[index+1];break;
				}
				$scope.calArr[index-1] = result;
				$scope.calArr.splice(index+1,1);
				$scope.calArr.splice(index,1);
			}else{
				i=i+2; //check for other precedence if all the cases of the current precedence has been triggered
			}
		}
		$scope.result = String($scope.calArr[0]);

	}

	//check which of the two similar precedence occurs first from left to right
	function precedenceCheck(precedence , i){
		return Min($scope.calArr.indexOf(precedence[i]) , $scope.calArr.indexOf(precedence[i+1]));
	}

	function Min(x,y){
		if(x!==-1 && y !== -1) // in the case where both equivalent precedences are present
			return Math.min(x, y);// if both occur eg / at 3rd position and % at 2nd , then send which occurs first
		else
			return Math.max(x,y); // if one of them is not present for eg x = -1 and y =3 then sending the y would make more sense
	}

	//clear the result
	$scope.clearAll = function(){
		$scope.result = "";
	}

	//delete one character
	$scope.deleteOneChar = function(){
		$scope.result = String($scope.result);
		$scope.result = $scope.result.substring(0, $scope.result.length-1);
	}

	//get an array which can be extracted from the string eg input= 3.1*4+2-1 , returns [3.1,"*",4,"+",2,"-",1] 
	function getArrFromString(){
		var calArr = [];
		var i =0 ;
		var selectedNum = ""
		while(i<$scope.result.length){
			if(Number(selectedNum + $scope.result[i])){
				selectedNum += $scope.result[i];
				i++;
			}else{
				calArr.push(Number(selectedNum));
				calArr.push($scope.result[i]);
				selectedNum = "";
				i++;
			}
		}
		Number(selectedNum) ? calArr.push(Number(selectedNum)) : "" ;
		return calArr;
	 }
}]);



angular.element(function(){
	console.log("Asdasd");
	angular.bootstrap(document,['myApp']);
});

