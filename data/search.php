<?php
    header("Content-type:application/json;charset='utf8");
    $link=mysqli_connect('127.0.0.1','root','root','shoppingcenter');
    mysqli_set_charset($link,'utf8');
    $usersel=$_REQUEST['product'];
    $list=array();
    for($i=0;$i<count($usersel);$i++){
        $pname=$usersel[$i]['kinds'];
        $sql="select*from productlist where pname='$pname'";
        $result=mysqli_query($link,$sql);
        $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
        for($m=0;$m<count($rows);$m++){
        array_push($list,$rows[$m]);
        }
    }
    echo json_encode($list);