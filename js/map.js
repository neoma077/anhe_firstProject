//// 百度地图API功能
//var map = new BMap.Map("right",{minZoom:1,maxZoom:15});    // 创建Map实例,设置地图允许的最小/大级别
//map.centerAndZoom(new BMap.Point(117.25,31.83),8);  // 初始化地图,设置中心点坐标和地图级别
//map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
//map.setCurrentCity("安徽合肥");          // 设置地图显示的城市 此项是必须设置的
//map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
//百度地图API功能
function loadJScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=zEL98QMGfP7OGIV1Y7wGDWYL8w0YTqpC&callback=init";
  document.body.appendChild(script);
}
function init() {
  var map = new BMap.Map("right");            // 创建Map实例
  var point = new BMap.Point(117.296819,31.903629); // 创建点坐标
  map.centerAndZoom(point,16);
  map.setCurrentCity("安徽合肥");          // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true);
  var marker = new BMap.Marker(point);  // 创建标注
  //marker.enableDragging(); //marker可拖拽
  map.addOverlay(marker); //在地图中添加marker
  marker.setAnimation(BMAP_ANIMATION_BOUNCE);
   //跳动的动画//启用滚轮放大缩小
  //单击获取点击的经纬度
  function deletePoint(){
    var allOverlay = map.getOverlays();
    for (var i = 0; i < allOverlay.length; i++){
      map.removeOverlay(allOverlay[i]);
    }
  }
	map.addEventListener("click",function(e){
		//console.log(e.point.lng + "," + e.point.lat);
    //function deletePoint(){
     // var allOverlay = map.getOverlays();
     //   if(allOverlay){
     //     map.removeOverlay(allOverlay);
     //     return false;
     // }
    //}
    deletePoint();
    map.removeOverlay(map.getOverlays());
    var x=e.point.lng;
    var y=e.point.lat;
    var local=x+","+y;
     //编写自定义函数,创建标注
    function addMarker(local){
      var marker = new BMap.Marker(local);
      marker.enableDragging();
      map.addOverlay(marker);
      marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    }
     //向地图添加标准
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);
    var point = new BMap.Point(x,y);
    //var label = new BMap.Label("1");
    var dis=$("#dropdown select option:selected").val();
    var circle = new BMap.Circle(point,dis,{fillColor:"skyblue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
    //var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});
    addMarker(point);

    $.ajax({
      type:'GET',
      url:"http://api.map.baidu.com/geosearch/v3/nearby",
      dataType:'JSONP',
      data:{ak:"zEL98QMGfP7OGIV1Y7wGDWYL8w0YTqpC",geotable_id:"164951",location:local,radius:dis,tags:"超市",sortby:"distance:1"},
      success: function (txt,msg,xhr) {
          //console.log(txt);
        //获取附近超市名称，存入数组superMarket中
        //遍历附近的超市,添加位置图标
        var superInfo=[];
        var superJW=[];
        for(var i=0;i<txt.contents.length;i++){
          //console.log(txt);
          //获取超市名称、超市地理位置、超市经纬度
          var superMarket={title:txt.contents[i].title,distance:txt.contents[i].distance,address:txt.contents[i].address};
          superInfo.push(superMarket);
          //superMarket.push(txt.contents[i].title);
          //for(var key in txt.contents[i]);
            var m=txt.contents[i].location[0];
            var n=txt.contents[i].location[1];
            var l=new BMap.Point(m,n);
          //获取超市的经纬度
          superJW.push(l);
            //更改超市图表显示
            var myIcon = new BMap.Icon("img/super.gif", new BMap.Size(25,70));
            var marker2 = new BMap.Marker(l,{icon:myIcon});  // 创建标注
            map.addOverlay(marker2);
            //addMarker(l);
            //添加附近商场文字标注
            var opts = {
              position : l,    // 指定文本标注所在的地理位置
              offset   : new BMap.Size(-150,-70)    //设置文本偏移量
            };
            var label = new BMap.Label(txt.contents[i].title+"     "+txt.contents[i].address, opts);  // 创建文本标注对象
            $("div#right label").parent().css("width","350px");
            label.setStyle({
              color : "black",
              fontSize : "15px",
              width:"100%",
              height:"30px",
              border:"1px solid #aaa",
              background:"rgba(255,255,255,.6)",
              lineHeight : "25px",
              borderRadius:"8px"
            });

            //$(".BMapLabel").css("width","100px");
            map.addOverlay(label);
            //var marker = new BMap.Marker(l);  // 创建标注
            //map.addOverlay(l);              // 将标注添加到地图中
            //var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
            //marker.setLabel(label);
          //}

        }
        //console.log(superInfo);
        var epoi=[];
        for(var i=0;i<superJW.length;i++){
          //终点
          epoi.push([superJW[i].lat,superJW[i].lng]);
          //起点
        }
        for(var i=0;i<epoi.length;i++){
        //var p1 = new BMap.Point(epoi[1][1],epoi[1][0]);
        var p2 = new BMap.Point(epoi[i][1],epoi[i][0]);
        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true},
          onPolylinesSet:function(routes) {
            searchRoute = routes[0].getPolyline();//导航路线
            map.addOverlay(searchRoute);
          },
          onMarkersSet:function(routes) {
           // var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(30,33));
            var markerstart = new BMap.Marker(routes[0].marker.getPosition() ,{icon:myIcon}); // 创建点
            map.removeOverlay(routes[0].marker); //删除起点
            //map.addOverlay(markerstart);
            var markerend = new BMap.Marker(routes[1].marker.getPosition() ,{icon:myIcon}); // 创建点
            map.removeOverlay(routes[1].marker);//删除终点
            map.addOverlay(markerend);
          }});
        driving.search(point, p2);
        }
        //for(var i=0;i<epoi.length;i++){
        //var epoi11  = new BMap.Point(epoi[i][1],epoi[i][0]);    // 终点
        //BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 50), {imageOffset: new BMap.Size(0, 0)});
        ////**************************************************************************************************************
        //var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
        //driving2.search(point, epoi11);    //显示一条公交线路
        //
        //}
        ////**************************************************************************************************************
        //console.log(epoi11);
        //将所获取的超市地理位置信息转换为JSON字符串，存储在客户端中
        superInfo=JSON.stringify(superInfo);
        //console.log(superInfo);
        localStorage.setItem("superMarket",superInfo);
      }
    });

	});
  // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠右上角位置
    anchor: BMAP_ANCHOR_TOP_RIGHT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    console.log("当前定位地址：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
//添加城市列表
  map.addControl(geolocationControl);
  map.enableInertialDragging();
  map.enableContinuousZoom();
  var size = new BMap.Size(10, 20);
  map.addControl(new BMap.CityListControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: size
    // 切换城市之间事件
    // onChangeBefore: function(){
    //    alert('before');
    // },
    // 切换城市之后事件
    // onChangeAfter:function(){
    //   alert('after');
    // }
  }));
// 百度地图API功能
  /*	function myFun(result){
   var cityName = result.name;
   map.setCenter(cityName);
   alert("当前定位城市:"+cityName);
   }
   var myCity = new BMap.LocalCity();
   myCity.get(myFun);
   */
}
window.onload = loadJScript;  //异步加载地图
//获得两点之间的距离
/* var pointA = new BMap.Point(106.486654,29.490295);  // 创建点坐标A--大渡口区
 var pointB = new BMap.Point(106.581515,29.615467);  // 创建点坐标B--江北区
 alert('从大渡口区到江北区的距离是：'+(map.getDistance(pointA,pointB)).toFixed(2)+' 米。');  //获取两点距离,保留小数点后两位
 var polyline = new BMap.Polyline([pointA,pointB], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
 map.addOverlay(polyline);     //添加折线到地图上 */
