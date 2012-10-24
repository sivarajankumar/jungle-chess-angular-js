angular.module('jungle-chess', []);

function JungleChessController($scope) {
	var controller = this;

	$scope.resetBoard = function() {
		$scope.board = controller.createBoard();
	};

	$scope.resetBoard();

}

JungleChessController.prototype.createBoard = function() {
	var board = [];
	var animals = [ {
		name : 'Rat',
		x : 2,
		y : 0
	}, {
		name : 'Cat',
		x : 1,
		y : 5
	}, {
		name : 'Dog',
		x : 1,
		y : 1
	}, {
		name : 'Wolf',
		x : 2,
		y : 4
	}, {
		name : 'Leopard',
		x : 2,
		y : 2
	}, {
		name : 'Tiger',
		x : 0,
		y : 6
	}, {
		name : 'Lion',
		x : 0,
		y : 0
	}, {
		name : 'Elephant',
		x : 2,
		y : 6
	} ];
	var players = [ {
		name : 'player1',
		startingPosition : 'top'
	}, {
		name : 'player2',
		startingPosition : 'bottom'
	} ];

	var rows = 9, columns = 7;

	// create empty board
	for ( var i = 0; i < rows; i++) {
		var row = [];
		for ( var j = 0; j < columns; j++) {
			row.push({
				type : 'grass'
			});
		}
		board.push(row);
	}

	// set terrain
	var waterCells = [ [ 3, 1 ], [ 3, 2 ], [ 3, 4 ], [ 3, 5 ], [ 4, 1 ], [ 4, 2 ], [ 4, 4 ], [ 4, 5 ], [ 5, 1 ], [ 5, 2 ], [ 5, 4 ],
			[ 5, 5 ], ];
	for ( var i = 0; i < waterCells.length; i++) {
		board[waterCells[i][0]][waterCells[i][1]].type = 'water';
	}
	var trapCells = [ [ 0, 2 ], [ 0, 4 ], [ 1, 3 ], [ 7, 3 ], [ 8, 2 ], [ 8, 4 ] ];
	for ( var i = 0; i < trapCells.length; i++) {
		board[trapCells[i][0]][trapCells[i][1]].type = 'trap';
	}
	var denCells = [ [ 0, 3 ], [ 8, 3 ] ];
	for ( var i = 0; i < denCells.length; i++) {
		board[denCells[i][0]][denCells[i][1]].type = 'den';
	}

	// place animals at their starting position
	for ( var i = 0; i < players.length; i++) {
		var player = players[i];

		for ( var j = 0; j < animals.length; j++) {
			var animal = angular.copy(animals[j]);
			if (player.startingPosition == 'bottom') {
				animal.x = rows - 1 - animals[j].x;
				animal.y = columns - 1 - animals[j].y;
			}
			animal.player = player;
			board[animal.x][animal.y].animal = animal;
		}
	}

	return board;
};