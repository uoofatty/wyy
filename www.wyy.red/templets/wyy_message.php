<?php
require_once(dirname(__FILE__).'/config.php');
require_once(DEDEINC.'/typelink.class.php');
require_once(DEDEINC.'/datalistcp.class.php');
require_once(DEDEADMIN.'/inc/inc_list_functions.php');
setcookie('ENV_GOBACK_URL', $dedeNowurl, time()+3600, '/');
$query = "SELECT *,
case ifcheck
when 1 then '是'
else '否' 
end as 'check'
FROM gd_gfxq";
$dlist = new DataListCP();
$dlist->pageSize = 30;
if(empty($s_tmplets)) $s_tmplets = 'templets/gd_gfxq.htm';
$dlist->SetTemplate(DEDEADMIN.'/'.$s_tmplets);

//查询
$dlist->SetSource($query);

//显示
$dlist->Display();
$dlist->Close();