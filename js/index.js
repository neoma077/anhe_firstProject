//验证用户登录信息
$(".modal-footer #userLog").click(function(e){
  e.preventDefault();
  var userName=$(".modal-body #uname").val();
  var userPwd=$(".modal-body #upwd").val();
  sessionStorage.setItem("userName",userName);
  $.ajax({
    type:'POST',
    url:'data/userLogin.php',
    data:{uname:userName,upwd:userPwd},
    success:function(txt,msg,xhr){
      if(txt=="pass"){
        alert("验证通过！！！");
        $("#user-login").modal("hide");
        //修改登录按钮的显示
        $(".container #denglu").attr("href","../personal.html");
        $(".container #denglu").html("个人中心");
        $(".container #reg").css("display","none");
        sessionStorage.setItem("userName",userName);
      }else if(txt=="fail"){
        alert("用户名或密码输入错误，请重新输入，谢谢！！！");
        $(".modal-body #uname").val("");
        $(".modal-body #upwd").val("");
      }
    }
  })
});
//异步请求index.html的头部信息
$("#header").load("data/header.php");
$("#footer").load("data/footer.php");
//从数据库获取产品信息
$("#main").on("click",".panel-title",function(e){
  var target=e.target;
  var market=localStorage.getItem("superMarket");
  //将获取到的本地存储的超市信息转换为数组对象
  market=JSON.parse(market);
  var marketInfo=[];
  for(var i=0;i<market.length;i++){
    marketInfo.push(market[i].title);
  }
  var kindsName=$(target).attr("href");
  //console.log(kindsName);
  if(kindsName){
    kindsName=kindsName.slice(1);
    // console.log(kindsName);
    $.ajax({
      type:'GET',
      url:"data/kinds.php",
      data:{kinds:kindsName,market:marketInfo},
      success: function (txt,msg,xhr) {
        // console.log(txt);
        var html='';
        for(var i=0;i<txt.length;i++){
          html+=`<li><a href="#">${txt[i]}</a>
          <span class="add">+</span></li>`;
        }
        $("#accordion #"+kindsName+" ul").html(html);
      }
    });
  }
});
//将用户选中的物品存储到数据库中
//设置span+click事件
var productList=[];
$("#main #accordion").on("click","span.add",function(e){
  var target=e.target;
  var uname=localStorage.getItem("userName");
  if(uname=""){
    alert("请登录用户，谢谢！")
  }else{
  //获取其前一个兄弟元素的内容
  var kind=$(target).prev().html();
  productList.push(kind);
  localStorage.setItem("selItems",productList);
  }
});
//设置导航栏search栏功能
//设置放大镜单击事件函数
$("#header").on("click","span#infoSe", function () {
  var infos=$("#header #search").val();
  $.ajax({
    type:'GET',
    url:"data/searchInfo.php",
    data:{pname:infos},
    success:function(txt,msg,xhr){
      //判断当前请求信息是否成功
      if(txt=="error"){
        alert("检索的数据不存在！");
      }else{
        //将检索的数据存储在本地客户端
        localStorage.setItem("searchResult",txt);
        window.location.href="searchCenter.html";
      }
    }
  })
});
