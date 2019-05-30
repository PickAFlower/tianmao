$(function(){
    $(".floot").load("../flooter.html")
    //判断显示那个div
    var datas=null;
    var flag=true;
    if(localStorage.userid){
    	$(".without,.nowadays").hide()
    }else{
    	$(".without,.nowadays").show()
    }
    //点击logo跳转主页
    $(".heads>img").click(function(){
    	location.href="../index.html";
    })
    var batchNum=1;
    xunaran();
    function xunaran(){
    var strs=localStorage.user;
    if(strs){
    	var datax=JSON.parse(strs);
    	for(var i=0;i<datax.length;i++){
    		if(localStorage.userid==datax[i].user){
    			datas=datax[i].arr;
    		}
    	}
    	if(datas.length!=0){
    	var str3="";
    	$.each(datas, function(index,ele) {
    		str3+='<div class="catalogue_message">'
         +'<div class="catalogue_message_top">'
         +'<div class="catalogue_message_one clicks" pid="'+ele.goods_id+'">'
         +'<label class="check_la" >'
         +'<input type="checkbox"  class="check_all_input check">'
         +'</label>'
         +'<img src="'+ele.detail.img+'" alt="">'
         +'<div>'
         +'<p>'+ele.detail.subtitle+'</p>'
         +'<p>规格：默认款式</p>'
         +'</div>'
         +'</div>'
         +'<div><span>￥'+ele.price+'</span></div>'
         +'<div class="control"><button class="jian">-</button><input type="text" class="numtext" value="'+ele.num+'"><button class="jia">+</button></div>'
         +'<div><span>￥'+Number(ele.price)*ele.num+'</span></div>'
         +'<div class="del_wrap">'
         +'<p>移入我的收藏</p>'
         +'<p class="del">删除</p>'
         +'</div>'
         +'</div>' 
         +'<div class = "catalogue_message_two" > </div>'
         +'</div>'
    	})
    	$(".catalogue").html(str3);
       
       }else{
       	  flag=false;
       }
    	
    }else{
        flag=false;
     }
    
     //判断哪个显示
     if(flag){
     	 $(".no_goods").hide();
         $(".are_goods").show();
     }else{
     	 $.ajax({
     	 	type:"post",
     	 	url:"https://api.ymduo.com/Interface/recommendlists",
     	 	async:false,
     	    data:{
                pf: 1,
                p: batchNum
              },
     	    dataType:"json",
     	    success:function (res) {
               var newarr=res.result.data;
               var strx="";
               for(var i=0;i<8;i++){
               	   strx+='<li pid="'+newarr[i].goods_id+'" class="click">'
                         +'<img src="'+newarr[i].image+'" alt="">'
                         +'<p class="List_one">'+newarr[i].goods_name+'</p>'
                         +'<p class="List_two">￥<span class="List_two_price">'+newarr[i].price+'</span><span class="List_two_lj">￥0.3</span><span  class="List_two_img"></span></p>'
                         +'</li>'
               }
               $(".product_list_ul").html(strx)
               $(".click").click(function(){
               	 var pid=$(this).attr("pid")
               	 localStorage.pid=pid;
               	 location.href="details.html"
               })
             },
               error:function (err) {
               console.log(err)
             }
     	  	
     	 });
     	 $(".no_goods").show();
         $(".are_goods").hide();
     } 
    }
    $(".batch").click(function(){
    	   batchNum++;
           xunaran();
    })
    
    
    //选择时切换图片和计算价格
    	$(".check").click(function () {
       if ($(this).is(':checked')){
       	   moneys();
           $(this).parent().css("background","url(\"https://www.ttcj.tv/css/pc/images/cart/choose_icon.png\")no-repeat")
       } else{
       	   moneys();
           $(this).parent().css("background","url(\"https://www.ttcj.tv/css/pc/images/cart/no_choose_icon.png\")no-repeat");
       }
    })
    
     //数量
     $(".numtext").change(function(){
     	var unit=Number($(this).parent().parent().children().eq(1).children().text().substr(1));
     	var num=Number($(this).val());
     	$(this).parent().parent().children().eq(3).children().text("￥"+unit*num);
     	moneys();
     })
     $(".jian").click(function(){
     	var zhi=Number($(this).next().val());
     	if(zhi>1){
     	  zhi--;
     	  $(this).next().val(zhi);
     	}else{
     	  $(this).next().val(1);
     	}
     	var nu=Number($(this).parent().parent().children().eq(1).children().text().substr(1));
        $(this).parent().parent().children().eq(3).children().text("￥"+(nu*zhi).toFixed(2));
     	 moneys();
     })
     $(".jia").click(function(){
     	var zhi=Number($(this).prev().val());
     	if(zhi<9){
     	  zhi++;
     	  $(this).prev().val(zhi);
     	}else{
     	  $(this).prev().val(9);
     	}
     	var nu=Number($(this).parent().parent().children().eq(1).children().text().substr(1));
        $(this).parent().parent().children().eq(3).children().text("￥"+(nu*zhi).toFixed(2));
     	 moneys();
     })
     //全选
     xuze();
     function xuze(){
     	var inp=document.getElementsByClassName("check");
     	var check_la=document.getElementsByClassName("check_la");
        for(var i=0;i<inp.length;i++){
     	inp[i].index=i;
     	inp[i].onclick=function(){
     		if(this.index==0||this.index==inp.length-1){
     			var xuanz=this.checked
     			var url="";
     			if(xuanz){
     				url='url("https://www.ttcj.tv/css/pc/images/cart/choose_icon.png") no-repeat';
     			}else{
     				url='url("https://www.ttcj.tv/css/pc/images/cart/no_choose_icon.png") no-repeat';
     			}
     			for(var j=0;j<inp.length;j++){
     				inp[j].checked=xuanz;
     				check_la[j].style.background=url;
     			}
     			moneys();
     		}
     	}
       }
     }
      
      //计算金钱
      function moneys(){
      	var x=0;
      	var moneyNum=0;
      	 $.each($(".check"), function(index,ele) {
      	 	 if($(".check").eq(index).is(':checked')){
      	 	 	if(index!=0&&index!=$(".check").length-1){
      	 	 		x++;
      	 	 	var str=$(".check").eq(index).parent().parent().parent().children().eq(1).children();
      	 	    var str2=$(".check").eq(index).parent().parent().parent().children().eq(2).children().eq(1);
      	 	    var str3=$(".check").eq(index).parent().parent().parent().children().eq(3).children();
      	 	    var numsto=Number(str2.val());
      	 	    moneyNum+=Number(str3.text().substr(1));
      	 	   }
      	 	 }
      	 })
      	 if(x!=0){
      	 	$(".go_payment").css("background","red");
      	 }else{
      	 	$(".go_payment").css("background","#DDD");
      	 }
      	 $(".units>span").text(x);
      	 var moneyNumxs=moneyNum.toFixed(2)
      	 $(".money").text("￥"+moneyNumxs);
      }
    
      //删除
      $(".del").click(function(){
      	var arrCun=JSON.parse(localStorage.user);
      	var ids=$(this).parent().parent().children().eq(0).attr("pid");
      	for(var j=0;j<arrCun.length;j++){
      		if(localStorage.userid==arrCun[j].user){
      			for(var l=0;l<arrCun[j].arr.length;l++){
      				if(ids==arrCun[j].arr[l].goods_id){
      					arrCun[j].arr.splice(l,1);
      				}
      			}
      		}
      	}
      	localStorage.user=JSON.stringify(arrCun);
      	location.reload()
      })
})