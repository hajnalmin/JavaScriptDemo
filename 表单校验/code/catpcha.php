<?php
/**
 * demo
 $arr=array(
 'img'=>0,
 'size'=>24,
 'font'=>'font/hamu_font.ttf',
 'width'=>140,
 'height'=>40,
 'x'=>10,
 'y'=>0,
 );
 function init_session($str){
 //回调函数写入SESSION
 }
 $obj=new catpcha();//实例化验证码
 $obj->init($arr,'init_session');//初始化 并指定回调函数用于创建session信息
 */
file_exists('img.php') or die('img not exists!');
require 'img.php';
class catpcha extends img {
	private $color;
	final public function init(&$arr, $fun) {
		//创建源图像  初始化参数
		$info = $this -> create_image($arr['img'], $arr['width'], $arr['height']);
		$ini = array('size' => 24, 'font' => '', 'x' => 0, 'y' => 0, 'bgcolor' => '#ffffff');
		foreach ($ini as $k => $v) {
			if (!isset($arr[$k])) {
				$arr[$k] = $v;
			}
		}
		//获取字体
		$this -> get_font($arr['font']);
		//获取随机字符
		$str = $this -> get_str();
		//获取背景颜色
		$this -> get_color($arr['img'], $arr['bgcolor']);
		//设置背景颜色
		$this -> bg_color($info, $arr['bgcolor']);
		//字体不存在退出
		if (!$arr['font'])
			die('font not exists!');
		//写入随机字符
		$this -> write_text($str, $arr);
		//绘制曲线
		$this -> line($arr);
		//回调函数写入SESSION  输出  释放
		call_user_func_array($fun, array(&$str));
	}

	/** 获取随机字符串 可以指定获取的数量
	 *  @param str string
	 *  @param len int
	 */
	private function get_str($str = '', $len = 4) {
		$i = 0;
		$vcode = '';
		$str = $str ? $str : 'aDtVBlLzUXpEuTRGkYMnCfroKeFjWONhAPdZsyHSbqwIvQgimxJc';
		$l = strlen($str) - 1;
		while ($i < $len) {
			$vcode .= substr($str, mt_rand(0, $l), 1);
			$i++;
		}
		return $vcode;
	}

	/** 绘制曲线
	 *  @param y int 起始Y偏移量
	 */
	private function line(&$arr, $num = 2, $y = 5) {
		$i = 0;
		$y = mt_rand(10, $arr['height'] - 20);
		$n = mt_rand(3, 10);
		$n1 = mt_rand(20, 30);
		/*n控制幅度  n1控制起伏次数*/
		for (; $i < $arr['width']; $i++) {
			$y1 = $n * sin($i / $n1 * M_PI);
			for ($j = 0; $j < $num; $j++) {
				imagesetpixel($arr['img'], $i, $y + $y1 + $j + 1, $this -> color);
			}
		}
	}

	/** 写入字符串
	 *  @param fontsize int
	 *  @param x&&y int 字符串在画布上的XY轴偏移量
	 */
	private function write_text(&$str, &$arr) {
		$i = 0;
		$l = strlen($str);
		$x = $arr['x'];
		$y = $arr['y'];
		$this -> color = array(mt_rand(0, 105), mt_rand(0, 255), mt_rand(0, 255));
		$this -> get_color($arr['img'], $this -> color);
		while ($i < $l) {
			$txt = $str[$i];
			$angle = mt_rand(0, 40);
			//获取字符串宽高
			$info = $this -> get_font_box($txt, $arr['font'], $arr['size'], $angle);
			// x累加每个字符串宽  随机缩进
			$x += $info[0] - (!$i ? $info[0] : 0) - mt_rand(0, 2);
			imagettftext($arr['img'], $arr['size'], $angle, $x, $info[1] + $y, $this -> color, $arr['font'], $txt);
			$i++;
		}
	}

}

$arr = array('img' => 0, 'size' => 24, 'font' => 'font/hamu_font.ttf', 'width' => 140, 'height' => 35, 'x' => 10, 'y' => 0, );
function init_session($str) {
	//回调函数写入SESSION
	session_start();
	$_SESSION['yzm'] = $str;
}

$obj = new catpcha();
$obj -> init($arr, 'init_session');
header('Content-type:image/png');
imagepng($arr['img']);
$this -> destory();
