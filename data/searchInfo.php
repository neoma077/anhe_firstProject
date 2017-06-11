<?php
    header("Content-Type:text/plain;charset='utf8'");
    $link=mysqli_connect("127.0.0.1","root","root","shoppingcenter");
    mysqli_set_charset($link,'utf8');
    $pinfo=$_REQUEST['pname'];
    $sql="select*from productlist where pname like '%$pinfo%'";
    $result=mysqli_query($link,$sql);
    $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
    if($list){
        $list=json_encode($list);
        echo $list;
    }else{
        echo "error";
    }