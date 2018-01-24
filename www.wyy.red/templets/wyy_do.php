<?php
require_once(dirname(__FILE__).'/config.php');
require_once(DEDEADMIN.'/inc/inc_batchup.php');
require_once(DEDEADMIN.'/inc/inc_archives_functions.php');
require_once(DEDEINC.'/typelink.class.php');
require_once(DEDEINC.'/arc.archives.class.php');
$ENV_GOBACK_URL = (empty($_COOKIE['ENV_GOBACK_URL']) ? 'index.php' : $_COOKIE['ENV_GOBACK_URL']);

//在线咨询 - 删除
if($dopost=="delArchives"){
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("参数无效！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("delete from `gd_yuyue` WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("成功删除指定的文档！",$ENV_GOBACK_URL);
	exit();   
}

//审核
if ($do == 'post'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	
	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set ifcheck=1 WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("成功审核指定的内容！",$ENV_GOBACK_URL);
	
	exit();   
}

//取消审核
if ($do == 'n_post'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set ifcheck=0 WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("成功反审核指定的文档！",$ENV_GOBACK_URL);
	exit();   
}

//出售状态
if ($do == 'status'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	
	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set stratus='1' WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("房产已修改为出售状态！",$ENV_GOBACK_URL);
	
	exit();   
}

//一级推荐
if ($do == 'c1'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	
	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set stratus='999' WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("房产已修改为一级推荐！",$ENV_GOBACK_URL);
	
	exit();   
}

//二级推荐
if ($do == 'c2'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	
	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set stratus='99' WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("房产已修改为二级推荐！",$ENV_GOBACK_URL);
	
	exit();   
}

//三级推荐
if ($do == 'c3'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	
	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set stratus='9' WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("房产已修改为三级推荐！",$ENV_GOBACK_URL);
	
	exit();   
}



//取消出售状态
if ($do == 'n_status'){
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("update `$table` set stratus='0' WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("房产已修改为出售中！",$ENV_GOBACK_URL);
	exit();   
}


//删除
if ($do == 'del'){//exit('删除啊？');
	  
	if( !empty($aid) && empty($qstr) )
	{
		$qstr = $aid;
	}
	if($qstr=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}
	$qstrs = explode("`",$qstr);
	$okaids = Array();

	foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("delete from `$table` WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	}
	ShowMsg("成功删除指定的文档！",$ENV_GOBACK_URL);
	exit();   
}

//修改
if ($do == 'edit'){
	
	if( !empty($id))
	{
		$id = explode(',',$id);
		if ($table == 'gd_tjhy'){
			$status = explode(',',$status);
			$tel = explode(',',$tel);
			$msg = explode(',',$msg);		
		}
		if ($table == 'gd_zxzx'){			
			$tag = explode(',',$tag);
			$content = explode(',',$content);
			$replay = explode(',',$replay);
			$title = explode(',',$title);
		}
		
	}

	if($id=='')
	{
		 ShowMsg("让我猜猜您要操作哪些记录呢！",$ENV_GOBACK_URL);
		exit();
	}

	$num = count($id);
	for($i = 0;$i < $num;$i++)
	{//exit("update `$table` set status='" . $status[$i] . "',tel='" . $tel[$i] . "',state='" . $state[$i] . "',intent='" . $intent[$i] . "',msg='" . $msg[$i] . "',retime='" . GetMkTime(date('Y-m-d h:i:s')) . "' WHERE id=" .$id[$i]);
		if ($table == 'gd_zxzx')$dsql->ExecuteNoneQuery("update `$table` set title='".$title[$i]."',content='".$content[$i]."',tag='".$tag[$i]."',replay='".$replay[$i]."',retime='".GetMkTime(date('Y-m-d h:i:s'))."' WHERE id=".$id[$i]);
		if ($table == 'gd_tjhy')$dsql->ExecuteNoneQuery("update `$table` set status='".$status[$i]."',tel='".$tel[$i]."',msg='".$msg[$i]."',retime='".GetMkTime(date('Y-m-d h:i:s'))."' WHERE id=".$id[$i]);		
	}

	/* foreach($qstrs as $aid)
	{
		if(!isset($okaids[$aid]))
		{
			$dsql->ExecuteNoneQuery("delete from `$table` WHERE id='$aid' ");
		}
		else
		{
			$okaids[$aid] = 1;
		}
	} */
	ShowMsg("成功修改指定的记录！",$ENV_GOBACK_URL);
	exit();   
}

?>