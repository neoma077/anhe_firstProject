<?php
    header("Content-type:application/json;charset='utf8");
    $link=mysqli_connect('127.0.0.1','root','root','shoppingcenter');
    mysqli_set_charset($link,'utf8');
    $kind=$_REQUEST['kinds'];
    $market=$_REQUEST['market'];
    //遍历超市数组，检索出符合超市和种类的商品列表
    $rows=array();
    for($i=0;$i<count($market);$i++){
        $sql="select*from productlist where kinds='$kind' and supermarket='$market[$i]'";
        $result=mysqli_query($link,$sql);
        $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
        //遍历$list中的pname,存储到新数组$rows中
        for($j=0;$j<count($list);$j++){
            array_push($rows,$list[$j]['pname']);
        }
    }
//    print_r($rows);
    $rows=json_encode($rows);
    echo $rows;