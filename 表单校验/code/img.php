<?php
class img{
	/** 
	 *  @param images array 保存所有图像资源 通过destory方法释放资源
	 */
	public $images=array();
	/** 
	 *  @param 实例化类 检测GD库
	 */
	final public function __construct(){
		 extension_loaded('GD') or die('GD not exists');
	}
	/** 
	 *  @param img string 若为图像文件由图像创建 否则创建真彩色画布  return array(img,width,height)图像资源 宽高索引与关联两种
	 *  @param width && height int 若非图像则指定画布宽高
	 */
	final public function create_image(&$img='',$width=100,$height=100){
	   if($img && file_exists($img)){
		   @$info=getimagesize($img) or die('not found img!');
		   preg_match('/(jpeg)|(gif)|(png)/i',$info['mime'],$arr) or die('mime is error');
	       $arr='$img=imagecreatefrom'.$arr[0].'("'.$img.'");';
	       eval($arr);
	   }else{
		   $info=array($width,$height);
		   $img=imagecreatetruecolor($width,$height);
	   }
	   array_push($this->images,$img);
	   return array('img'=>&$img,$info[0],$info[1],'width'=>$info[0],'height'=>$info[1]);
    }
    /** 获取颜色
	 *  @param &img resuouse
	 *  @param alpha intval
	 *  @param color string(#ffffff) | array 字符串必须16进制  数组值顺序 rgb 
	 */
	final public function get_color(&$img,&$color='#ff6600',$alpha=0){
	    if(!is_array($color)){
			$tmp=array();
	  		$tmp[]=hexdec(substr($color,1,2));
	  		$tmp[]=hexdec(substr($color,3,2));
	  		$tmp[]=hexdec(substr($color,5,2));
			$color=$tmp;
	  	}
	  $color=imagecolorallocatealpha($img,$color[0],$color[1],$color[2],$alpha);
   }
    /** 设置背景色
	 *  @param info array 创建图像资源时返回的info数组
	 *  @param x y int填充起始XY坐标
	 *  @param color string(#ffffff) | array 字符串必须16进制  数组值顺序 rgb
	 *  @param alpha int　透明度
	 */
   final public function bg_color(&$info,&$color,$x=0,$y=0,$alpha=0){
	   imagefilledrectangle($info['img'],$x,$y,$info[0]-1, $info[1]-1,$color);
   }
   /** 获取字体
	 *  @param &font string 传址 若字体不存在 font=''
	 */
   final public function get_font(&$font='') {
	   file_exists ($font ) && strtolower ( strrchr ( $font, '.' ) ) == '.ttf' or $font='';
   }
   /** 返回字体宽高
	 *  @param &str &font string  size int angle int rreturn array(width,height)
	 */
   final public function get_font_box(&$str,&$font,$size=20,$angle=0){
		$info=imagettfbbox($size,$angle,$font,$str);
		return array($info [2] - $info [0],$info [1] - $info [7]);
   }
   /** 绘制文字
	 *  @param position int 0-8种常规定位  x  y偏移量
	 */
   final public function text(&$info,&$str,&$font,&$color,$size=20,$position=0,$x=0,$y=0,$angle=0){
	   	$box=$this->get_font_box($str,$font,$size,$angle);
		$xy=$this->position($info,$box[0],$box[1],true,$position);
		imagettftext($info['img'],$size,$angle,$xy[0]+$x,$xy[1]+$y,$color,$font,$str);   
   }
   final public function image_copy(&$info,&$info1,$position=0,$x=0,$y=0){
	   $xy=$this->position($info,$info1[0],$info1[1],false,$position,$x,$y);
	   imagecopy ($info['img'],$info1['img'],$xy[0],$xy[1],0,0,$info1[0],$info1[1]);
   }
    /** 获取文字或图像常规定位 0-8
	 *  @param width && $height  int字符或图像所点吧宽高
	 *  @param style int 定位样式 0左上 1上居中 2右上... 
	 *  @param marginLeft && marginTop 左与上的偏移量 
	 *  @param type bool 布尔值 文字与图片定位算法不同  若真则为文字 若假则为图片
	 */
   final public function position(&$info,$width,$height,$type,$style=0,$marginLeft=0,$marginTop=0){
	    $x=$y=0;
		switch($style){
			case 0:
				$x=$marginLeft;
				$y=$marginTop+($type?$height:0);
				break;
			case 1:
				$x=($info[0]-$width)/2;
				$y=$marginTop+($type?$height:0);
				break;
			case 2:
				$x=$marginLeft+$info[0]-$width;
				$y=$marginTop+($type?$height:0);
				break;
			case 3:
				$x=$marginLeft;
				$y=$marginTop+($info[1]-$height)/2+($type?$height:0);
				break;
			case 4:
				$x=($info[0]-$width)/2;
				$y=$marginTop+($info[1]-$height)/2+($type?$height:0);
				break;
			case 5:
				$x=$marginLeft+$info[0]-$width;
				$y=$marginTop+($info[1]-$height)/2+($type?$height:0);
				break;
			case 6:
				$x=$marginLeft;
				$y=$marginTop+$info[1]-$height+($type?$height:0);
				break;
			case 7:
				$x=($info[0]-$width)/2;
				$y=$marginTop+$info[1]-$height+($type?$height:0);
				break;
			case 8:
				$x=$marginLeft+$info[0]-$width;
				$y=$marginTop+$info[1]-$height+($type?$height:0);
				break;
			default :
				return array($x,$y);
		}
		return array($x,$y);
   }
   final  public function destory(){
		foreach($this->images as $v){
			@imagedestroy($v);
		}   
   }
}