$(function(){
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
			 
			
			
			$.ajax({
				url:"https://api.ymduo.com/item/index",
				data:{
					gid:localStorage.pid
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(res){
					console.log(res.result.data)
					var arr=res.result.data;
					var str="";
					$.each(arr.image,function(index,ele){
						str+='<div class="swiper-slide"><img src="'+ele+'" alt=""></div>'
					})
					console.log(str)
					$(".swiper-wrapper").html(str)
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						paginationClickable: true,
						spaceBetween: 30,
						centeredSlides: true
					});
					$(".old_prier").html('价格<s>￥'+arr.price+'-'+arr.old_price+'</s>')
					$(".prier").html('￥'+arr.price+'-'+arr.old_price+' <span>惊喜价</span>')
					$(".shopp_name").html(arr.goods_name)
					
				},
				error:function(err){
					console.log(err)
				}
			})
			
			
})