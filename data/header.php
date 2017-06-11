<?php
    header("Content-type:text/html;charset='utf8");
    ?>
<div class="navbar navbar-default  navbar-fixed-top">
  <div class="container">
    <!--导航条头部-->
    <div class="navbar-header">
      <img src="img/logo.png">
      <a href="#" class="navbar-toggle" data-toggle="collapse in">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
    </div>
    <!--定义导航条折叠部分-->
    <div class="navbar-collapse collapse">
      <!--导航中的菜单-->
      <ul class="nav navbar-nav">
        <li><a href="index.html">首页</a></li>
        <li class="dropdown">
          <a data-toggle="dropdown" href="#">产品大全 <span class="caret"></span></a>
        </li>
        <li>
          <form class="navbar-form">
            <div class="form-group has-feedback">
              <label for="search">搜索关键字:</label>
              <input class="form-control" id="search" placeholder="请输入搜索内容">
              <span class="glyphicon glyphicon-search form-control-feedback"></span>
              <span id="infoSe" style="display:inline-block;width:30px;height:30px;position:absolute;right:2px;top:2px;z-index:100;cursor: pointer;"></span>
            </div>
          </form>
        </li>
      </ul>
      <a href="userReg.html" class=" navbar-right navbar-link  navbar-text" id="reg">注册</a>
      <a href="#user-login" data-toggle="modal" class=" navbar-right navbar-link  navbar-text"  id="denglu">登录</a>
      <!--<a href="#" class="navbar-link navbar-right navbar-text">个人中心</a>-->
      <a href="#" class="navbar-link navbar-right navbar-text">用户服务</a>
      <a href="shoppingCenter.html" class="navbar-link navbar-right navbar-text">已选产品</a>
    </div>
  </div>
</div>
<script>
  var users=sessionStorage.getItem("userName");
  if(users){
    $(".container #denglu").attr("href","../paper/personal.html");
    $(".container #denglu").html("个人中心");
    $(".container #reg").css("display","none");
  }
</script>