<?php
	
	$data = unserialize(file_get_contents('goods.txt'));
	
	$page = intval(isset($_GET['page']) ? $_GET['page'] :1);
	
	$callback = isset($_GET['callback']) ? $_GET['callback'] : 'callback';
	
	$txt =  isset($data[$page]) ? $data[$page] : json_encode(array());//file_get_contents('http://hd.8264.com/index.php?app=default&ajax=1&page='.$page);
	
	sleep(mt_rand(1,2));
	
	echo $txt;
	
	
	
	

?>