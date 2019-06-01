$(function(){
	var x=0;
	function rem(doc,win){
	         	let docEl=doc.documentElement;//html  考虑以及兼容了 屏幕旋转的事件
	         	//判断事件orientatonchange 横屏 事件 或resize
	         	let resizeEvt='orientationchange'in window ? 'orientationchange' : 'resize' ;
	         	let recalc=function(){
	         		var clientWidth=docEl.clientWidth;  //获取屏幕宽度
	         		if(!clientWidth)return;  //未获取屏幕尺寸
	         		//屏幕大于750
	         		if(clientWidth>=750){
	         			docEl.style.fontSize='100px';
	         		}else{
	//       			html的font-size  100*设备宽度/750
	                    docEl.style.fontSize=100*(clientWidth/403)+'px';
	         		}
	         		
	         	};
	         	
	         	if(!doc.addEventListener)return ; //addEventListener 兼容
	         	win.addEventListener(resizeEvt,recalc,false);  //屏幕大小以及旋转变化自适应
	         	doc.addEventListener('DOMContentLoaded',recalc,false);  //页面初次打开自适应
	         	recalc();
	         	
	         	
	         }
			rem(document,window)
			// 轮播图
			 var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				paginationClickable: true,
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: 2500,
				autoplayDisableOnInteraction: false
			});
			
			$.ajax({
				url:"https://api.ymduo.com/Interface/recommendlists",
				type:"post",
				data:{
					"pf": 1,
                     "p": 1
				},
				
				success:function(res){
					console.log(res.result.data)
					var arr=res.result.data;
					var str="";
					$.each(arr,function(index,ele){
						str+='<div class="like_conter" pid="'+ele.goods_id+'">'
								+'<img src="'+ele.image+'" alt="">'
								+'<p class="describe">'+ele.goods_name+'</p>'
								+'<span>￥'+ele.price+'</span>'
								+'<p class="sales"><span>月销62笔</span><span>免运费</span></p>'
							+'</div>'
					})
					$(".like_conter_wrap").append(str)
					$(".like_conter").click(function(){
						localStorage.pid=$(this).attr("pid")
						location.href="details.html";
					})
					$("body").append('<script src="js/Swiper-3.4.2/dist/js/swiper.min.js" type="text/javascript" charset="utf-8"></script>')
					var strs="";
					$.each(arr,function(index,ele){
                        strs+=' <div class="click" pid="'+ele.goods_id+'">'
				        	     	+'<img src="'+ele.image+'" alt="">'
				                    +'<div class="contents">'
				                    	+'<p>'+ele.goods_name+'</p>'
				                    	+'<p>￥'+ele.price+'</p>'
				                    	+'<p>月销3笔 免邮费</p>'
				                    +'</div>'
				        	     +'</div>'
					})
					$(".like_conter_wrap2").html(strs)
					$(".click").click(function(){
						localStorage.pid=$(this).attr("pid")
						location.href="details.html"
					})

                    $(".cut").click(function(){
                    	x++;
                    	if (x%2==0) {
                    		$(".like_conter_wrap").css("display","block")
                    		$(".like_conter_wrap2").css("display","none")
                    	}else{
                            $(".like_conter_wrap").css("display","none")
                            $(".like_conter_wrap2").css("display","block")
                    	}
                    });


				},
				error:function(err){
					console.log(err)
				}
			})
			
			
})