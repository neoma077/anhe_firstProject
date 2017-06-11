<?php
    header("Content-type:text/plain;charset='utf8'");
    $link=mysqli_connect("127.0.0.1",'root','root','shoppingCenter');
    mysqli_set_charset($link,'utf8');
    $uname=$_REQUEST['uname'];
    $upwd=$_REQUEST['upwd'];
    $uemail=$_REQUEST['uemail'];
    $ubirthday=$_REQUEST['ubirthday'];
    //设置防止重复提交功能
    $sql="select*from userinfo where uname='$uname'";
    $result=mysqli_query($link,$sql);
    $rows=mysqli_fetch_assoc($result);
    $sql="insert userinfo(uname,upwd,uemail,ubirthday) values('$uname','$upwd','$uemail','$ubirthday')";
    if($rows){
        echo  "uname exists";
    }else if($uname=""||$upwd=""){
        echo "blank";
    }else{
        $result=mysqli_query($link,$sql);
        if($result){
            echo "succ";
         }else{
            echo "error";
        }
     }
