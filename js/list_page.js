$(function () {
	var losFlag=JSON.parse(localStorage.Flags)
	if(losFlag){
	 var shopp_name=JSON.parse(localStorage.shopp_name)
	 var shopp_pid=JSON.parse(localStorage.shopp_pid)
	 var pid=localStorage.pid;
	 var psk=null;
	for(var i=0;i<shopp_pid.length;i++){
		for(var j=0;j<shopp_pid[i].length;j++){
			if(shopp_pid[i][j]==pid){
				psk=shopp_pid[i];
			}
		}
	}
	for(var m=0;m<shopp_name.length;m++){
		if(m==0){
			$(".classify_list_div").text(shopp_name[m].title)
			for(var n=0;n<shopp_name[m].sgroup.length;n++){
				$(".classify_list_div_ul").append('<li class="clickxs" pid="'+psk[m]+'">'+shopp_name[m].sgroup[n].title+'</li>')
			}
		}else{
			var strsr='<div class="stretch_right"><h3>'+shopp_name[m].title+'</h3><ul>';
			var strsc="";
			for(var z=0;z<shopp_name[m].sgroup.length;z++){
    		        strsc+='<li class="clickxs" pid="'+psk[z]+'">'+shopp_name[m].sgroup[z].title+'</li>';
			}
			var strsx=strsr+strsc+'</ul></div>';
			$(".stretch").append(strsx)
		}
	 }
	}
	
	
	$(".span").height($(".stretch").height()+"px")
	$(".clickxs").click(function(){
		console.log($(this).attr("pid"))
		localStorage.pid=$(this).attr("pid")
		location.href="list_page.html"
	})

	$(".fewer").click(function(){
		$(".stretch").slideToggle(function(){})
	})
	
	
    var x=0;
    var num=1;
    var arr=null;
    $(".header_wrap").load("../header.html",function(){
        $(".hd_menu").hide();
        $(".navigation_wrap>a").on("mouseover mouseout",function(){
            $(".hd_menu").toggle();
        })
    })
    $(".floot").load("../flooter.html")
//    吸顶菜单
    var tops=$(".synthesize").offset().top;
    $(document).scroll(function () {
        if($("body,html").scrollTop()>=tops){
            $(".synthesize").addClass("fiexd")
        }else{
            $(".synthesize").removeClass("fiexd")
        }
    })
//    数据
   kewoods();
   function kewoods(){
   var kewood=null;
   var urls="";
   if(losFlag){
   	$(".page_number").show()
   	kewood={  category_id: localStorage.pid,
               p: 1,
               order: num
          };
   	urls="https://api.ymduo.com/category/goodsList";
   	ajax(kewood,urls);
   }else{
   	$(".page_number").hide()
   	kewood={
   		keywords:localStorage.keywords,
               order: num,
               p: 1
            }
   	urls="https://api.ymduo.com/search/index";
   	ajax(kewood,urls);
   }
   }
	
    
   function ajax(kewood,urls){
       $.ajax({
           type:"post",
           url:urls,
           data:kewood,
           async:false,
           dataType:"json",
           success:function (res) {
               arr=res.result.data;
               xuan();
           },
           error:function (err) {
               console.log(err)
           }
       })
   }
   
   
    function xuan(){
        var str="";
        $.each(arr,function (index,ele) {
            str+='<div pid="'+ele.goods_id+'" class="click">'
                +'<img src="'+ele.image+'" alt="">'
                +'<p>'+ele.goods_name+'</p>'
                +'<span>￥'+ele.price+'</span>'
                +'</div>'
        })
        $(".colours").html(str)
    }
   
    //价格
    $(".synthesize_left>span:eq(2)").click(function () {
        x++;
        if(x%2!=0){
            bj();
            xuan();
        }else{
            bj();
            arr.reverse();
            xuan();
        }
    })
    //价格
    function bj(){
        for(var i=0;i<arr.length-1;i++){
            for(var j=0;j<arr.length-i-1;j++){
                if(Number(arr[j].price)>Number(arr[j+1].price)){
                    var sum=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=sum;
                }
            }
        }
        return arr
    }
    $(".synthesize_left>span:eq(1)").click(function () {
        x++;
        for(var i=0;i<arr.length-1;i++){
            for(var j=0;j<arr.length-i-1;j++){
                if(Number(arr[j].pay_num)<Number(arr[j+1].pay_num)){
                    var sum=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=sum;
                }
            }
        }
        xuan();
    })
    //   页数
    $(".page_number>img").eq(0).click(function () {
        num--;
        kewoods();
        $(".page_number>span").eq(num-1).addClass("border2").siblings().removeClass("border2")
        if(num<=1){
            num=1;
        }else{
            kewoods();
        }
        if(num>5){
            $(".page_number>span").eq(4).addClass("border2").siblings().removeClass("border2")
            $(".page_number>span").eq(4).text(num)
            $(".page_number>span").eq(3).text("...")
        }else{
            $(".page_number>span").eq(4).text("5")
            $(".page_number>span").eq(num-1).addClass("border2").siblings().removeClass("border2")
            $(".page_number>span").eq(3).text("4")
        }
    })

    $(".page_number>img").eq(1).click(function () {
        num++;
        kewoods();
        if(num>5){
            $(".page_number>span").eq(4).addClass("border2").siblings().removeClass("border2")
            $(".page_number>span").eq(4).text(num)
            $(".page_number>span").eq(3).text("...")
        }else{
            $(".page_number>span").eq(num-1).addClass("border2").siblings().removeClass("border2")
            $(".page_number>span").eq(3).text("4")
            $(".page_number>span").eq(4).text("5")
        }
    })

    $(".page_number>span").click(function () {
    	kewoods();
        var i=Number($(this).text());
        $(this).addClass("border2").siblings().removeClass("border2")
        num=i;
    })
    
    $.ajax({
    	type:"post",
    	url:"https://api.ymduo.com/category/goodsList",
    	async:false,
    	data:{category_id: 552,
               p: 1,
               order: 1},
    	dataType:"json",
    	success:function (res) {
           var arrs=res.result.data;
           var strx="";
           for(var i=0;i<3;i++){
           	  strx+='<div class="click" pid="'+arrs[i].goods_id+'">'
                 +'<img src="'+arrs[i].image+'" alt="">'
                 +'<p>'+arrs[i].goods_name+'</p>'
                 +'<span>￥'+arrs[i].price+'</span>'
                 +'</div>'
           }
             $(".shopp").html(strx)
             
           },
           error:function (err) {
               console.log(err)
           }
    });
   
    
     //点击后跳转到详情页
    $(".click").click(function(){
    	localStorage.pid=$(this).attr("pid");
    	location.href="details.html"
    })
})