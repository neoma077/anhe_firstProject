<?php
    header("Content-type:text/plain;charset='utf8");
    $link=mysqli_connect("127.0.0.1","root","root","shoppingCenter");
    mysqli_set_charset($link,'utf8');
    $uname=$_REQUEST['uname'];
    $uemail=$_REQUEST['uemail'];
    $sql="select upwd from userinfo where uname='$uname' and uemail='$uemail'";
    $result=mysqli_query($link,$sql);
    $rows=mysqli_fetch_assoc($result);
    if($rows){
     $pwd=implode("",$rows);
        echo $pwd;
    }else{
        echo "error";
    }