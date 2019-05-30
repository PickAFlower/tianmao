$(function(){
    var arr=null;
    var num=1;
    var pid=localStorage.pid;
    //引入头部和尾部的html
    $(".header_wrap").load("../header.html",function(){
        $(".hd_menu").hide();
        $(".navigation_wrap>a").on("mouseover mouseout",function(){
            $(".hd_menu").toggle();
        })
    })
    $(".floot").load("../flooter.html")
    
    $.ajax({
        url:"https://api.ymduo.com/item/index",
        type:"post",
        data:{gid:pid},
        dataType:"json",
        async:false,
        success:function(res){
            console.log(res.result.data)
            arr=res.result.data;
            $(".conten_right>h2").text(arr.goods_name);
            $(".conten_right>h3>span").text(arr.goods_id);
            $(".prive>p>span").text(arr.price);
            var str="";
            $.each(arr.image,function (index,ele) {
                str+='<img src="'+ele+'" alt="">'
            })
            $(".img_gather").html(str);
            $(".big_img>img").attr("src",arr.image[0]);
            var str2="";
            $.each(arr.recommend,function(index,ele){
               str2+='<li class="click" pid="'+ele.goods_id+'">'
                   +'<img src="'+ele.image+'" alt="" />'
                   +'<h5>'+ele.goods_name+'</h5>'
                   +'<p>￥<span>'+ele.price+'</span></p>'
                  + '</li>'
            })
            $(".same_list").html(str2)
            var str3="";
            $.each(arr.recommend,function(index,ele){
                str3+='<li class="click" pid="'+ele.goods_id+'">'
                    +'<img src="'+ele.image+'" alt="" />'
                    +'<p>'+ele.goods_name+'</p>'
                    +'<span>￥'+ele.price+'</span>'
                    + '</li>'
            })
            $(".Watch_shopp").html(str3)
            $(".goods_img_wrap").html(arr.detail.in_detail)
            $(".fiexd_ul>li:eq(3)>span").text("￥"+arr.price)
            
            $(".click").click(function(){
            	localStorage.pid=$(this).attr("pid")
            	location.href="details.html";
            })
        },
        error:function (err) {
            console.log(err)
        }
    })
    //加入购物车

    $(".buy>span,.cart").click(function(){
    	$(".reminder").fadeIn();
    	var outTime=setTimeout(function(){
    		$(".reminder").fadeOut();
    	},2000)
    	$(".reminder").mouseover(function(){
    		clearTimeout(outTime)
    	})
    	$(".reminder").mouseout(function(){
    		outTime=setTimeout(function(){
    		$(".reminder").fadeOut();
    	},2000)
    	})
        var flagx=true;
        var flags=true;
        var is=null;
        var js=null;
        var nums=JSON.parse(localStorage.user);
        var userid=localStorage.userid;
        for(var i=0;i<nums.length;i++){
        	if(nums[i].user==userid){
        		is=i;
        		if(nums[i].arr.length!=0){
        			 flags=false;
        		     for(var j=0;j<nums[i].arr.length;j++){
        				if(nums[i].arr[j].goods_id==arr.goods_id){
        				   flagx=false;
        				   js=j
        			   }
        		     }
        		  }
        	}
        }
        if(!flagx&&!flags){
          nums[is].arr[js].num=num;
         console.log(1)
        }else{
          arr.num=num;
          nums[is].arr.push(arr);
          
          console.log(2)
        }
            localStorage.user=JSON.stringify(nums)
    })

    
//    放大镜
    $(".big_img").mouseover(function(){
        $(".move,.posbig_img").show()
    }).mouseout(function () {
        $(".move,.posbig_img").hide()
    })
    $(".big_img").mousemove(function(e){
        $(".posbig_img>img").attr("src",$(".big_img>img").attr("src"))
        var lefts=e.pageX-$(this).offset().left-$(".move").width()/2;
        var tops=e.pageY-$(this).offset().top-$(".move").height()/2;
        lefts<0?lefts=0:lefts;
        tops<0?tops=0:tops;
        var widthbl=$(".posbig_img>img").width()/$(".big_img>img").width();
        var heightbl=$(".posbig_img>img").height()/$(".big_img>img").height();
        lefts>$(".big_img").width()-$(".move").width()?lefts=$(".big_img").width()-$(".move").width():lefts;
        tops>$(".big_img").height()-$(".move").height()?tops=$(".big_img").height()-$(".move").height():tops;
        $(".posbig_img").scrollTop(heightbl*tops)
        $(".posbig_img").scrollLeft(widthbl*lefts)
        $(".move").css({
            "left":lefts+"px",
            "top":tops+"px"
        })
    })
    //图片路径更换
    $(".img_gather>img").click(function(){
        $(".big_img>img").attr("src",$(this).attr("src"))
    })
    //下面的小图的移动
    var i=0;
    $(".img_gather").css("width",$(".img_dis").width()*($(".img_gather>img").length/4))
    $(".next").click(function () {
    	if($(".img_gather").width()<=$(".img_dis").width()){
        	return
        }
        i++;
        $(".img_gather").animate({"margin-left":$(".img_dis").width()*-i+"px"})
    })
    $(".piece").click(function(){
        i--;
        if(i<0){
           i=0;
        }else{
            $(".img_gather").animate({"margin-left":$(".img_dis").width()*-i+"px"})
        }
    })
    //数量的加减
    
    $(".jian").click(function(){
        num=Number($(".tet").val());
        num--;
        num<=0?num=1:num;
        $(".tet").val(num)
    })
    $(".jia").click(function(){
        num=Number($(".tet").val());
        num++;
        num>=9?num=9:num;
        $(".tet").val(num)
    })
//    说明
    $(".explain>p,.illustrate").mouseover(function(){
        $(".illustrate").show()
    }).mouseout(function(){
        $(".illustrate").hide()
    })

    //   商品参数的楼层跳转
    $(".fiexd_ul>li").click(function () {
        $(this).addClass("aitve").siblings().removeClass("aitve")
        if($(this).index()==0){
            $("body,html").scrollTop(($(".level").eq(1).offset().top-$(".fiexd_ul").height()))
        }else if($(this).index()==1){
            $("body,html").scrollTop($(".level").eq(0).offset().top)
        }else if($(this).index()==2){
            $("body,html").scrollTop(($(".level").eq(2).offset().top-$(".fiexd_ul").height()))
        }
    })
    //吸顶
    var fiexdTop=$(".fiexd").offset().top
    $(document).scroll(function (e) {
        if($("body,html").scrollTop()>=fiexdTop){
            $(".fiexd_ul>li:eq(3),.fiexd_ul>li:eq(4)").css("visibility","visible")
            $(".fiexd").addClass("ceiling")
        }else{
            $(".fiexd").removeClass("ceiling")
            $(".fiexd_ul>li:eq(3),.fiexd_ul>li:eq(4)").css("visibility","hidden")
        }

        if($(".level").eq(0).offset().top<=$("body,html").scrollTop()&&$("body,html").scrollTop()<$(".level").eq(1).offset().top){
            $(".fiexd_ul>li").eq(1).addClass("aitve").siblings().removeClass("aitve")
        }else if($(".level").eq(1).offset().top-$(".fiexd_ul").height()<=$("body,html").scrollTop()&&$("body,html").scrollTop()<$(".level").eq(2).offset().top){
            $(".fiexd_ul>li").eq(0).addClass("aitve").siblings().removeClass("aitve")
        }else if($(".level").eq(2).offset().top-$(".fiexd_ul").height()<=$("body,html").scrollTop()){
            $(".fiexd_ul>li").eq(2).addClass("aitve").siblings().removeClass("aitve")
        }
    })
    
//    点击收起
    var m=0;
    $(".pack_up").click(function () {
        m++;
        if(m%2==0){
            $(this).text("向上收起")
        }else{
            $(this).text("向下展开")
        }
        $(".goods>li").toggle()
    })




})