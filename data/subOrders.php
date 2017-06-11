<?php
    header("Content-Type:text/plain;charset='utf8'");
    $link=mysqli_connect("127.0.0.1","root","root","shoppingcenter");
    mysqli_set_charset($link,'utf8');
    $userName=$_REQUEST['userName'];
    $arrive=$_REQUEST['arrive'];
    $userAdd=$_REQUEST['userAdd'];
    $payment=$_REQUEST['payment'];
    $userData=$_REQUEST['userData'];
    //将$userData转换为JSON字符串
    $userData=json_encode($userData);
    //将客户端提交的数据存入到数据库中
    $sql="insert userbuy(uname,arrive,userAdd,pay,userData) values('$userName','$arrive','$userAdd','$payment','$userData')";
    $result=mysqli_query($link,$sql);
    if($result){
        echo "succ";
    }else{
        echo "error";
    }