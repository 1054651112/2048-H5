# 2048-H5

这是一个《2048》小游戏，整个游戏的设计分为三大部分：

链接地址：https://1054651112.github.io/2048-H5/courseDesign/index.html


第一部分：html页面部分

	页面主要分为两个板块：分别是标签按钮和游戏棋盘两部分

	（1）标签主要就是一些提示内容，如：分数部分。

	（2）按钮主要包括：重启游戏、游戏帮助（提示键）和打开音乐键

	

	游戏棋盘部分主要包括三部分：大棋盘、4*4的16个数字位置、数字部分

	---其中数字部分主要是通过数组来进行实现的。

	

第二部分：css样式部分

	这里主要是一些标签、按钮的样式，包括：字体、颜色背景、边框样式，css部分就是为了是整个布局和页面更加美化，符合整体审美水平。

	

第三部分：js逻辑部分

	大概的逻辑就是：数字的移动以及在随机位置产生数字2或4

	1.随机位置产生2或4：

	因为游戏规则就是只能从2或4里面随机生成，然后位置也是随机的，所以这里我们可以使用数组来实现。整个棋盘分为4*4，也就是4行4列，

	我们可以利用二维数组，先将整个4*4的二维数组全部定义为0，0可以表示棋盘中没有数字，这样我们可以随机产生两个数（在0~3之间的整

	数），分别表示x和y，这样我们就可以找到棋盘中该位置，通过它是否为零来判断是否能够产生2或者4，随机位置产生2或4大概的逻辑就是

	这样。

	

	2.数字的移动：首先，移动分为4个方向：上、下、左、右；然后，我们来具体讨论一下细节问题。

	（1）是否能够移动：

	例如：是否能够向左移动：这里我们这样分析，向左移动就是要判断当前的位置的左边（也就是j-1列）是否为0，或者判断左边（j-1列）和当前位置的数字是否相等。

	如果左边为0或者左边和当前位置的数字相等，这样就可以向左移动。

	同理：向上、向下、向右也是判断相应的方向上是否为0或者是否与当前位置的数字相等。

	当然，像第一列无法向左移动；第4列无法向右移动；第一行无法向上移动；第4行无法向下移动，边界可以不用讨论。

	（2）水平方向是否有阻塞：

	首先，在棋盘中找到不为0的位置，如果是向左、向右移动就需要判断水平方向是否阻塞。

	（3）垂直方向是否有阻塞：

	在棋盘中找到不为0的位置，如果是向上、向下移动就需要判断垂直方向是否阻塞。

	（4）具体移动：

	---向左或向右：首先，遍历棋盘这个二维数组，可以依次找到不为0的位置，然后以该位置作为标准，从距离该位置最远处进行判断，找到距离该位置最远处为0的位置，

	同时如果水平方向没有阻塞，那么该位置的数字就可以移动到最远处，移动后同时设定该位置为0。然后进行下一个数据的移动。

	【注】：这里要注意的是：向左移动时，列必须由小到大遍历；向右移动时，列必须从大到小遍历，这样才能保证在有空位置的情况下，所有数字都能向左或向右移动。

	

	---向上或向下：首先，遍历棋盘这个二维数组，可以依次找到不为0的位置，然后以该位置作为标准，从距离该位置最远处进行判断，找到距离该位置最远处为0的位置，

	同时如果垂直方向没有阻塞，那么该位置的数字就可以移动到最远处，移动后同时设定该位置为0。然后进行下一个数据的移动。

	【注】：这里要注意的是：向上移动时，行必须由小到大遍历；向下移动时，行必须从大到小遍历，这样才能保证在有空位置的情况下，所有数字都能向上或向下移动。
