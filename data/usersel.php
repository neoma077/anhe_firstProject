<?php
    header("Content-type:text/plain;charset='utf8'");
    $link=mysqli_connect('127.0.0.1','root','root','shoppingcenter');
    mysqli_set_charset($link,'utf8');
    $uname=$_REQUEST['userName'];
    $data=$_REQUEST['data'];
    $cha=json_encode($data);
    $sql="insert usersel(username,data) values('$uname','$cha')";
    $result=mysqli_query($link,$sql);
    if($result){
        echo "succ";
    }else{
        echo "error";
    }