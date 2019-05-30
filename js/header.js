 $(function(){
		var datas=null;
		var str=location.href.substring(location.href.lastIndexOf("/")+1);
		var str2=str.substring(0,str.indexOf("l")+1);
        var username=localStorage.userid;
        var urlsz="";
		if(str2=="index.html"){
            if(username&&username!=" "){
                $("#username").text(username)
                $(".href").eq(1).text("退出")
                $(".href").eq(1).removeAttr("href")
                $("#username").attr("href","html/personal.html")
            }else{
                $(".href").eq(0).attr("href","html/log_in.html")
                $(".href").eq(1).attr("href","html/log_in.html")
                $(".href").eq(2).attr("href","html/log_in.html")
			}
            urlsz="html/list_page.html";
		}else{
            if(username&&username!=" "){
                $("#username").text(username)
                $("#username").attr("href","personal.html")
                $(".href").eq(1).text("退出")
            }else{
                $(".href").eq(0).attr("href","log_in.html")
                $(".href").eq(1).attr("href","log_in.html")
                $(".href").eq(2).attr("href","log_in.html")
			}
            urlsz="list_page.html";
		}
		$(".href").eq(1).click(function(){
			if($(this).text()=="注册"){
				if(str2=="index.html"){
					console.log(2)
				$(this).attr("href","html/log_in.html")
			}else{
				$(this).attr("href","log_in.html")
			}
			}else{
				localStorage.userid="";
				$(".href").eq(0).text("登录")
				$(".href").eq(0).removeAttr("href")
				$(this).text("注册")
			}
		})
		
		$(".href").eq(0).click(function(){
			if($(this).text()=="登录"){
				if(str2=="index.html"){
					console.log(2)
				    $(this).attr("href","html/log_in.html")
			    }else{
				    $(this).attr("href","log_in.html")
			    }
			}else{
				if(str2=="index.html"){
					console.log(2)
				    $(this).attr("href","html/personal.html")
			    }else{
				    $(this).attr("href","personal.html")
			    }
			}
		})
		
        var urls="";
        if(str2=="index.html"||str2=="header.html"){
            urls="sanjia/json/list_data.json";
	    }else{
            urls="sanjia/json/list_data.json";
		}
	     //购物车数量
        cartNum();
		function cartNum(){
		var user=localStorage.user;
		if(user){
			if($("#username").text()=="登录"){
			$(".shopping_cart>span").text("0")
		}else{
			$.each(JSON.parse(user), function(index,ele) {
				if(ele.user==username){
					$(".shopping_cart>span").text(ele.arr.length)
				}
			});
		}
		}
		}
				
        $.ajax({
        	type:"get",
        	url:urls,
        	async:false,
        	success:function (res){
        		datas=res.catelist;
        	}
        })
        
        //搜索
        $(".search_btn").click(function(){
        	localStorage.Flags=false;
        	localStorage.keywords=$("#search_text").val()
        	location.href=urlsz;
        })
        
        //菜单
		$(".hd_menu").on("mouseover mouseout",function(){
			$("#center_wrap").toggle()
		})
		$("#center_wrap").mouseover(function(){
			$(this).show()
		})
		$("#center_wrap").mouseout(function(){
			$(this).hide()
		})
		
		
//		获取列表id
        var zarr=[];
		function ajaxData(data,array){
    		$.ajax({
    		type:"post",
    		data:data,
    		url:"https://api.ymduo.com/category/categoryList",
    		dataType:"json",
    		async:false,
    		success:function(res){
    			var arr=res.result.data;
    			for(var i=0;i<arr.length;i++){
    				array.push(arr[i].category_id)
    			}
    			zarr.push(array)
    		},
    		error:function(err){
    			console.log(err)
    		}
    	})
    	}

    	var newarr1=[];
    	var newarr2=[];
    	var newarr3=[];
    	var newarr4=[];
    	var newarr5=[];
    	ajaxData({category_id: 2390},newarr1);
    	ajaxData({category_id: 2391},newarr2);
    	ajaxData({category_id: 2392},newarr3);
    	ajaxData({category_id: 2393},newarr4);
    	ajaxData({category_id: 2389},newarr5);
    	
        //菜单移入移出
		$(".hd_menu>li").mouseover(function(){
			$("#center_wrap").html("")
			var i=$(this).index();
			var arr=datas[i-1].category2;
			for(var j=0;j<arr.length;j++){
				var ul=document.createElement("ul");
				var h3=document.createElement("h3");
				h3.innerText=arr[j].title;
				ul.appendChild(h3);
				for(var k=0;k<arr[j].sgroup.length;k++){
					var li=document.createElement("li");
					if(i<6){
						li.setAttribute("pid",zarr[i-1][k])
					}
					li.innerText=arr[j].sgroup[k].title;
					ul.appendChild(li)
				}
			$("#center_wrap").append(ul)
			}
			//列表页
            $("#center_wrap>ul>li").click(function () {
				localStorage.shopp_name=JSON.stringify(arr)
				localStorage.shopp_pid=JSON.stringify(zarr)
				localStorage.pid=$(this).attr("pid")
				localStorage.Flags=true;
                console.log(str2)
                if(str2=="index.html"||str2=="header.html"){
                    window.location.href="html/list_page.html";
				}else{
                    location.href="../html/list_page.html";
				}
            })
            
            
		})
		
		//购物车跳转
		$(".shopping_cart").click(function(){
            	console.log(str2)
            	if(str2=="index.html"||str2=="header.html"){
                    location.href="html/cart.html";
				}else{
                    location.href="cart.html";
				}
            })
        //首页跳转
		$(".Small_menu>li:eq(0)").click(function () {
			if(str2=="index.html"||str2=="header.html"){
                $(".Small_menu>li:eq(0)>a").attr("href","index.html")
			}else{
                $(".Small_menu>li:eq(0)>a").attr("href","../index.html")
			}
       })
		
		
       
		
		$(document).click(function(){
			cartNum();
		})
		
		
		
		
		
		
})