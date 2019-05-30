$(function(){
	//头部和脚步的html
	$(".header_wrap").load("header.html",function(){
		$(".href").eq(1).click(function(){
		 cartNum();
		})
	})
	$(".floot").load("flooter.html",function(){})
	//轮播图
	var i=0;//轮播的
	var a=0;//列表的
	function nav(){
		$(".banner_img>li").eq(i).fadeIn(1000,function(){
			i>6?i=-1:i;
		}).siblings().fadeOut()
		if(i>-1){
		$(".list>li").eq(i).addClass("bgrcolr").siblings().removeClass("bgrcolr")
		}
		i++;
	}
	timer=setInterval(nav,2000)
	$(".banner").mouseover(function(){
		clearInterval(timer)
	})
	$(".banner").mouseout(function(){
		timer=setInterval(nav,2000)
	})
	$(".list>li").mouseover(function(){
		clearInterval(timer)
		i=$(this).index();
		nav();
	})
    //广告
	$(".close").click(function(){
		$(".advertising").hide()
	})
   //直播列表数据
	$.ajax({
		type:"post",
		async:true,
		dataType:"json",
		url:"https://api.ymduo.com/Interface/recommendlists",
		data:{pf: 1,p: 1},
		success:function(res){
		   var arr=res.result.data
		   var dates=new Date()
		   var hours=dates.getHours()
		   var sid=dates.getMinutes()
		   var hourssid=hours+":"+sid;
		   for(var i=0;i<arr.length;i++){
		   	var ti1=(i<10?"0"+i:i)+":30";
		   	var ti2=(i<9?"0"+(i+1):i+1)+":30";
		   	var str=ti1+"-"+ti2;
		   	var po=null;
		   	if(hourssid>ti1&&hourssid<ti2){
		   		po="正在播出";
		   	}else if(hourssid>ti1){
		   		po="已结束";
		   	}else{
		   		po="未开始";
		   	}
		   	if(po=="正在播出"){
		   		$(".potime").text(str+" 正在直播···")
		   		$(".shoppName").text(arr[i].goods_name);
		   		$(".shoppPrice").text("￥"+arr[i].price)
		   		$(".shoppPid").attr("pid",arr[i].goods_id)
		   		$(".TV_live_hot_cen").append('<div class="TV_live_hot">'
							    +'<div class="TV_live_time">'
								+'<p style="color:red">'+po+'</p>'
								+'<p style="color:red">'+str+'</p>'
							    +'</div>'
							    +'<div class="TV_live_details">'
								+'<img src="'+arr[i].image+'" alt="">'
								+'<p>'+arr[i].goods_name+'</p>'
								+'<span>'+"￥"+arr[i].price+'</span>'
								+'<a pid="'+arr[i].goods_id+'" class="click">立即抢购&gt;</a>'
							    +'</div>'
						        +'</div>')
		   	}else{
		   		$(".TV_live_hot_cen").append('<div class="TV_live_hot">'
							    +'<div class="TV_live_time">'
								+'<p>'+po+'</p>'
								+'<p>'+str+'</p>'
							    +'</div>'
							    +'<div class="TV_live_details">'
								+'<img src="'+arr[i].image+'" alt="">'
								+'<p>'+arr[i].goods_name+'</p>'
								+'<span>'+"￥"+arr[i].price+'</span>'
								+'<a  pid="'+arr[i].goods_id+'" class="click">立即抢购&gt;</a>'
							    +'</div>'
						        +'</div>')
		   	}
		   
		   }
		   clicks();
		},
		error:function(err){
			console.log(err)
		}})
	
	
	//热销的列表
	$.ajax({
		type:"post",
		data:{pf: 1,p: 2},
		dataType:"json",
		async:true,
		url:"https://api.ymduo.com/Interface/recommendlists",
		success:function(res){
			var arr2=res.result.data;
			$(".hot_list_right").width(224*arr2.length+"px")
			for(var i=0;i<arr2.length;i++){
				if(i==0){
					$(".lis1_imgs").attr("src",arr2[i].image)
					$(".lis1_t").text(arr2[i].goods_name)
					$(".lis1_price").text(arr2[i].price)
					$(".hot_list_left").attr("pid",arr2[i].goods_id)
					$(".hot_list_left").addClass("click")
				}else{
					$(".hot_list_right").append('<div class="list_hot click" pid="'+arr2[i].goods_id+'">'
					          +'<div class="hot_list_img samll">'
						      +'<img src="'+arr2[i].image+'" alt="" />'
						      +'<span>NO.'+(i+1)+'</span>'
					          +'</div>'
					          +'<p class="color3">'+arr2[i].goods_name+'</p>'
					          +'<a href="" class="color">￥<span class="font26">'+arr2[i].price+'</span></a>'
				              +'</div>')
				}
			}
			clicks();
			setInterval(function(){
				a>=4?a=0:a;
				$(".hot_list_right").animate({"margin-left":a*-224*4},500)
				a++;
			},2000)
			
		},
		error:function(err){
			console.log(err)
		}
		
	})
	
	//新品推荐的
	$.ajax({
		type:"post",
		data:{pf: 1,p: 3},
		dataType:"json",
		async:true,
		url:"https://api.ymduo.com/Interface/recommendlists",
	    success:function(res){
	    	var arr3=res.result.data;
	    	for(var i=0;i<8;i++){
	    		if(i==1){
	    			$(".new_product_wrap").append('<div class="new_product_bigBox"></div>')
	    		}else{
	    			$(".new_product_wrap").append('<div class="click" pid="'+arr3[i].goods_id+'">'
        		      +'<img class="" src="'+arr3[i].image+'" alt="" />'
        		      +'<p class="color3">'+arr3[i].goods_name+'</p>'
        		      +'<a href="" class="color font26 " >￥'+arr3[i].price+'</a>'
        		      +'<a href="" class="font20 color a">￥0</a>'
        		      +'<span></span>'
        	          +'</div>')
	    		}
	    	}
	    	clicks();
	    },
	    error:function(err){
	    	console.log(err)
	    }
	})
	
	//食品健康
	var b=0;
	var ks=null;
	function frielis(ele1,ele2,ele3,q,w){
		$.ajax({
		type:"post",
		data:{pf: 1,p: q},
		dataType:"json",
		async:true,
		url:"https://api.ymduo.com/Interface/recommendlists",
	    success:function(res){
	    	var arr4=res.result.data;
	    	for(var i=1;i<7;i++){
	    		if(i==1){
	    			ele1.append('<div class="foodstuff_tow click" pid="'+arr4[i].goods_id+'">'
        		     +'<img src="'+arr4[i].image+'" alt="" />'
        		     +'<p class="color3">'+arr4[i].goods_name+'</p>'
        		     +'<a href="" class="color font26 margin5" >￥'+arr4[i].price+'</a>'
        		     +'<span ></span>'
        		     +'<a href="" class="font20 color margin10 ">￥0</a>'
        	         +'</div>')
	    		}else{
	    			ele1.append('<div class="click" pid="'+arr4[i].goods_id+'">'
        		       +'<img src="'+arr4[i].image+'" alt="" />'
        		       +'<p class="color3">'+arr4[i].goods_name+'</p>'
        		       +'<a href="" class="color font26" >￥'+arr4[i].price+'</a>'
        		       +'<a href="" class="font20 color a">￥0</a>'
        		       +'<span></span>'
        	           +'</div>')
	    		}
	    	}
	    	clicks();
	    },
	    error:function(err){
	    	console.log(err)
	    }
	})
	$.ajax({
		type:"post",
		data:{pf: 1,p: w},
		dataType:"json",
		async:true,
		url:"https://api.ymduo.com/Interface/recommendlists",
	    success:function(res){
	    	var arr5=res.result.data;
	    	
	    	for(var i=0;i<arr5.length;i++){
	    ele2.append('<div class="foodstuff_right_nav click" pid="'+arr5[i].goods_id+'">'
        		        +'<img src="'+arr5[i].image+'" alt="" />'
        		        +'<h5>'+arr5[i].goods_name+'</h5>'
        		        +'<p class="color">￥<span class="color font26">'+arr5[i].price+'</span></p>'
        	            +'</div>')
	    	}
	    	clicks();
	    },error:function(err){
	    	console.log(err)
	    }
	})
	ks=setInterval(function(){kss(ele2,ele3)},2000)
	ele3.mouseover(function(){
		clearInterval(ks)
		b=$(this).index();
		$(this).addClass("blue").siblings().removeClass("blue")
		ele2.animate({"margin-top":b*-518},500)
	})
	ele3.mouseout(function(){
		ks=setInterval(function(){kss(ele2,ele3)},2000)
	})
	}
	
	frielis($(".foodstuff_left:eq(0)"),$(".foodstuff_right_scroll:eq(0)"),$(".foodstuff_right_ul:eq(0)>li"),4,5)
	frielis($(".foodstuff_left:eq(1)"),$(".foodstuff_right_scroll:eq(1)"),$(".foodstuff_right_ul:eq(1)>li"),6,7)
	
	function kss(ele2,ele3){
		b++;
		b>=3?b=0:b;
		ele3.eq(b).addClass("blue").siblings().removeClass("blue")
		ele2.animate({"margin-top":b*-518},500)
	}
	//更多分类
	var imgurl="img/fenlei_banner_05.png";
	classification();
	var classiNum=4;
	function classification(){

		$(".More_goods_div").html('<div class="More_goods_bgr">'
       			+'<img src="'+imgurl+'" alt="" />'
       		+'</div>')
		$.ajax({
		type:"post",
		data:{pf: 1,p: classiNum},
		dataType:"json",
		async:true,
		url:"https://api.ymduo.com/Interface/recommendlists",
	    success:function(res){
	    	var arr6=res.result.data;
	    	for(var i=0;i<4;i++){
	   $(".More_goods_div").append('<div class="More_goods_cont click" pid="'+arr6[i].goods_id+'">'
       			     +'<img src="'+arr6[i].image+'" alt="" />'
       			     +'<h5>'+arr6[i].goods_name+'</h5>'
       			     +'<p class="color">￥<span class="font26">'+arr6[i].price+'</span></p>'
       		         +'</div>')
	    	}
	    	clicks();
	    },
	    error:function(err){
	    	console.log(err)
	    }
	})
	}
	
	$(".More_goods_ul>li").click(function(){
		$(this).addClass("More_goods_ul_li").siblings().removeClass("More_goods_ul_li")
		var i=$(this).index()
		i==0?imgurl="img/fenlei_banner_05.png":imgurl;
		i==1?imgurl="https://image.ttcj.tv/images/zh/disp/2017/fenlei_banner_07.png":imgurl;
		i==2?imgurl="https://image.ttcj.tv/images/zh/disp/2017/fenlei_banner_09.png":imgurl;
		i==3?imgurl="https://image.ttcj.tv/images/zh/disp/2017/fenlei_banner_17.png":imgurl;
		i==4?imgurl="https://image.ttcj.tv/images/zh/disp/2017/fenlei_banner_16.png":imgurl;
		i==5?imgurl="https://image.ttcj.tv/images/zh/disp/2017/fenlei_banner_19.png":imgurl;
		i==6?imgurl="https://image.ttcj.tv/images/zh/disp/2017/fenlei_banner_18.png":imgurl;
		
	    classiNum=4+i;
		classification();
	})
	//点击时跳转
	$(".go_shopp").click(function(){
		location.href="html/cart.html"
	})
	 //购物车数量
        cartNum();
		function cartNum(){
		var user=localStorage.user;
		var username=localStorage.userid;
		if(user){
			if($("#username").text()=="登录"||$("#username").text()==" "){
			$(".go_shopp>span").text("0")
		}else{
			$.each(JSON.parse(user), function(index,ele) {
				if(ele.user==username){
					$(".go_shopp>span").text(ele.arr.length)
				}
			});
		}
		}
		}
	
    //楼层和个人
    $(document).scroll(function () {
        if($(document).scrollTop()>=$(".side").eq(0).offset().top){
            $(".left_side,.right_side").show()
        }else{
            $(".left_side,.right_side").hide()
        }
        $.each($(".side"),function (index,ele) {
            if($(document).scrollTop()>=$(".side").eq(index).offset().top){
                $(".left_side>li").eq(index).css({"background":"#4185f4","color":"#fff"}).siblings().css({"background":"#fff","color":"#6177AF"})
            }
        })
    })
    $(".left_side>li").click(function () {
        var tops=$(".side").eq($(this).index()).offset().top;
        $("html,body").animate({"scrollTop":tops},300)
    })
    //回到顶部
    $(".goTop").click(function(){
        $("html,body").animate({"scrollTop":0},300)
    })
	
	function clicks(){
		$(".click").click(function(){
		console.log(1)
		var pid=$(this).attr("pid")
		localStorage.pid=pid;
		location.href="html/details.html"
	})
	}
})