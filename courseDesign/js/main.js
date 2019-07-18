var board= new Array();
var score=0;
var hasConflicted =new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function () {
	prepareForMobile();
	newgame();
});
function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSapce=20;
        cellSideLength=100;

    }
    //设置整个棋盘的样式：宽、高等
    $('#grid-container').css('width',gridContainerWidth-2*cellSapce);
    $('#grid-container').css('height',gridContainerWidth-2*cellSapce);
    $('#grid-container').css('padding',cellSapce);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

//新游戏
function newgame(){
    init();
    //产生数字
    generateOneNumber();
    generateOneNumber();
}

//初始化
function init(){
    for(var i = 0 ; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
        	//因为有16个位置
            var gridCell = $("#grid-cell-"+ i +"-" + j);
            //设置每个对象的样式，分别距顶部、左边的距离
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }

    }
    
    //首先初始化棋盘上的每个数和hasConflicted，都设置为0
    for(var i = 0; i < 4; i++) {
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();

    score=0;
}

function updateBoardView(){
	//先清空所有的
    $(".number-cell").remove();
    for(var i = 0 ; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
        	//添加数字
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var theNumberCell = $("#number-cell-" + i + "-" + j);
			
			if(board[i][j] == 0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i, j) + cellSideLength * 0.5);
				theNumberCell.css('left', getPosLeft(i, j) + cellSideLength * 0.5);
				theNumberCell.text("");
			} else {
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
       }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
	
    if(nospace(board)){
    return false;
    }
	
	//每次随机产生一个位置，x和y
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
//  console.log(randx + "   " + randy)

    var times=0;
    //找到棋盘上为空的位置
    while (times<50){
        if (board[randx][randy]==0)
            break;
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    //如果经过上面的50次循环都没有找到，就只能通过暴力查找空位置，
    if(times==50){
         for(var i=0;i<4;i++){
             for(var j=0;j<4;j++){
                 if(board[i][j]==0){
                     randx=i;
                     randy=j;
                 }
             }
         }
    }
    //随机产生2或4
    var randNumber=Math.random()<0.5? 2 : 4;
    board[randx][randy]=randNumber;
    showNumber(randx,randy,randNumber);
    return true;
}

$(document).keydown(function(event){
	console.log("控制键盘")
    switch (event.keyCode){
        case 37:  //left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                console.log("向左");
                setTimeout("isgameover()",300);
            }
            break;
        case 38:  //up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39:  //right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40:   //down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }

});