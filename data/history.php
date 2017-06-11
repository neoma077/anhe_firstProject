<?php
    header("Content-Type:text/plain;charset='utf8'");
    $link=mysqli_connect('127.0.0.1','root','root','shoppingcenter');
    mysqli_set_charset($link,'utf8');
    $userName=$_REQUEST['userName'];
    $sql="select*from userbuy where uname='$userName'";
    $result=mysqli_query($link,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $list=json_encode($rows);
    echo $list;