$(".container #submit").click(function () {
  var uname=$("#username").val();
  var upwd=$("#password").val();
  var uemail=$("#email01").val();
  var ubirthday=$("#birth01").val();
  console.log(uname,upwd,uemail,ubirthday);
  $.ajax({
    type:'POST',
    url:'data/userReg.php',
    data:{uname:uname,upwd:upwd,uemail:uemail,ubirthday:ubirthday},
    success:function(txt,msg,xhr){
      //console.log(arguments);
      if(txt=="succ"){
        // console.log("注册成功！")
        $(".container").html("注册成功！！！");
        var $elem=$("<a href='index.html'>点击跳转到首页</a>");
        $(".container").append($elem);
      }else if(txt=="blank"){
        alert("用户名或密码不能为空！");
      }
    },
    error:function(txt,msg,xhr){
      alert("发生未知错误！");
    }
  });
});
//验证用户名是否已存在
$(".container #username").blur(function () {
  var uname=$(this).val();
  var mess=$(this).parent().next();
  $.ajax({
    type:'POST',
    url:'data/unameCheck.php',
    data:{uname:uname},
    success:function (txt,msg,xhr) {
      //console.log(arguments);
      if(txt=="uname exists"){
        mess.html('用户名已存在！！！');
        $("#usernameTip").css("backgroundColor","red");
      }else if(txt=="succ"){
        mess.html('用户验证通过！');
        $("#usernameTip").css("backgroundColor","green");
      }
    }
  })
});