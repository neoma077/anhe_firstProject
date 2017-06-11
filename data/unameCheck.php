<?php
    header("Content-type:text/plain;charset='utf8");
    $link=mysqli_connect("127.0.0.1",'root','root','shoppingCenter');
    mysqli_set_charset($link,'utf8');
    $uname=$_REQUEST['uname'];
    $sql="select*from userinfo where uname='$uname'";
    $result=mysqli_query($link,$sql);
    $rows=mysqli_fetch_assoc($result);
    if($rows){
       echo "uname exists";
    }else{
       echo "succ";
    }