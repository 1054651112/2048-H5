documentWidth = window.screen.availWidth;   //返回当前屏幕宽度（空白空间）
gridContainerWidth = 0.92*documentWidth;    //棋盘的宽度
cellSideLength = 0.18*documentWidth;        //每个棋子的宽
cellSapce = 0.04*documentWidth;             //间隔


function getPosTop (i, j) {
	return cellSapce + i * (cellSapce + cellSideLength);
}

function getPosLeft (i, j) {
	return cellSapce + j * (cellSapce + cellSideLength);
}

function getNumberBackgroundColor (number) {
	switch(number) {
	case 2:
		return "#eee4da";
		break;
	case 4:
		return "#edb0a8";
		break;
	case 8:
		return "#f2b179";
		break;
	case 16:
		return "#f59563";
		break;
	case 32:
		return "#f67e5f";
		break;
	case 64:
		return "#f65e3b";
		break;
	case 128:
		return "#edcf72";
		break;
	case 256:
		return "#edcc61";
		break;
	case 512:
		return "#9c0";
		break;
	case 1024:
		return "#33b5e5";
		break;
	case 2048:
		return "#09c";
		break;
	case 4096:
		return "#a6c";
		break;
	case 8192:
		return "#93c";
		break;
	default:
		return "black";
		break;
	}
}

function getNumberColor (number) {
	//数字小于4为黑色
	if(number < 4){
		return "#776e65";
	}
	//大于4为白色
	return "white";
}

//棋盘上是否有空间
function nospace (board) {
	//每一行进行判断，若某个位置有数字，就返回false
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++){
			if(board[i][j] == 0){
				//还有空间
				return false;
			}
		}
	}
	//没有空间
	return true;
}

//向上移动
function canMoveUp (board) {
	//注意：第一行不能向上移动
	for (var i=1;i<4;i++) {
		for (var j=0;j<4;j++){
			//当前有数字
			if(board[i][j] != 0){
				//并且上面一个没有数字或者和该数字相同，则可以向上移动
				if(board[i-1][j] == 0 || board[i][j] == board[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//向右
function canMoveRight (board) {
	for (var i=0;i<4;i++) {
		//注意：第4列不能向右移动
		for (var j=0;j<3;j++){
			//当前有数字
			if(board[i][j] != 0){
				//并且上面一个没有数字或者和该数字相同，则可以向上移动
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}

//向下
function canMoveDown (board) {
	//注意：第4行不能向下移动
	for (var i=0;i<3;i++) {
		for (var j=0;j<4;j++){
			//当前有数字
			if(board[i][j] != 0){
				//并且上面一个没有数字或者和该数字相同，则可以向上移动
				if(board[i+1][j] == 0 || board[i][j] == board[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveLeft (board) {
	for (var i=0;i<4;i++) {
		//注意：第1列不能像左移动
		for (var j=1;j<4;j++){
			//当前有数字
			if(board[i][j] != 0){
				//并且上面一个没有数字或者和该数字相同，则可以向上移动
				if(board[i][j-1] == 0 || board[i][j] == board[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}

//定位到有数字的位置，水平方向没有阻塞，向左、向右都可以
function noBlockHorizontal (row, col1, col2, board) {
	for (var i=col1+1;i<col2;i++) {
		if(board[row][i] != 0){
			return false;
		}
	}
	return true;
}

//定位到有数字的位置，垂直方向没有阻塞，向上、向下均可
function noBlockVertical (col, row1, row2, board) {
	for (var i=row1+1;i<row2;i++) {
		if (board[i][col]!=0) {
			return false;
		}
	}
	return true;
}

//不能移动
function noMove (board) {
	if (canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)) {
		return false;
	}
	return true;
}


//游戏结束
function isgameover () {
	if(nospace(board) && noMove(board)){
		//游戏结束
		gameOver();
	}
}

function gameOver () {
	alert("游戏结束！");
}

function moveLeft () {
	if (!canMoveLeft(board)) {
		return false;
	}
	
	for (var i=0; i<4; i++) {
		for (var j=1; j<4; j++){
			//向左移动逻辑
			if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                	//情况一：左边没有数字
                    if(board[i][k]==0&& noBlockHorizontal(i,k,j,board)){
                        //显示移动的动画
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        break;
                    }
                    //情况二：左边有相同的数字
                    else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                    {
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[i][k]=true;
                        score=score+board[i][k];  //分数相加
                        updateScore(score);
                        break;
                    }
                }
            }
		}
	}
	setTimeout("updateBoardView()",200);
    return true;
}

function moveRight () {
	if(!canMoveRight(board)){
        return false;
    }
    for(var i=0; i<4; i++) {
        for (var j=2; j>-1; j--) {
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        break;
                    }
                    else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])
                    {
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[i][k]=true;
                        score=score+board[i][k];
                        updateScore(score);
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp () {
	if(!canMoveUp(board)){
		return false;
	}
	for (var i = 1; i<4; i++){
		for (var j = 0; j<4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k<i; k++){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
						showMoveAnimation(i,j,k,j);   //不清楚
						board[k][j] = board[i][j];
						board[i][j] = 0;
						break;
					}
					//这里的hasConflicted不清楚
					else if(board[i][j] == board[k][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						score = score + board[k][j];   //分数相加
						updateScore(score);
						break;
					}
				}
			}
		}
	}
	
	setTimeout("updateBoardView()",200);
    return true;
}

function moveDown () {
	if(!canMoveDown(board)){
		return false;
	}
	for(var i=2; i>-1; i--){
		for (var j=0; j<4; j++) {
			if(board[i][j] != 0){
				for(var k=3; k>i; k--){
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
						showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        break;
					}
					else if(board[k][j]==board[i][j]&& noBlockVertical(j,i,k,board)&&!hasConflicted[k][j])
                    {
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[k][j]=true;
                        score=score+board[k][j];
                        updateScore(score);
                        break;
                    }
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
    return true;
}

function help () {
	alert("游戏说明：↑ ↓ ← → 控制游戏进行!");
}

function music () {
	alert("打开音乐");
}

