$(function(){
			var flag=true;
			$(".floot").load("../flooter.html");
			//点击查看密码
			var passwords=document.getElementById("password");
			$("#pass>span").click(function(){
				$(this).toggleClass("bgr");
					if(flag){
						passwords.type="text";
						flag=false;
					}else{
						flag=true;
						passwords.type="password";
					}
			})
			//点击切换登录和注册
			$(".list>li").click(function(){
				$(this).addClass("style").siblings().removeClass("style")
				var i=$(this).index();
				if(i==0){
					$("#form").show()
					$(".register").hide()
				}else{
					$("#form").hide()
					$(".register").show()
				}
			})
			//判断登录的
			var flag2=true;
			var flag3=true;
			$("form input").bind('input propertychange',function(){
				if($("form input").eq(0).val()&&$("form input").eq(1).val()){
					$("form input").eq(2).css("background","rgb(65, 133, 244)")
				}else{
					$("form input").eq(2).css("background","#BABABA")
				}
			})
			//登录用户
			var flag4=false;
			var flag5=false;
			$("#subBtn").attr("disabled",false)
			$("#subBtn").click(function(){
				var yonghu=JSON.parse(localStorage.user)
				console.log(yonghu)
				var fi1=$("form input").eq(0).val();
				console.log(fi1)
				console.log(yonghu[0].user)
				var fi2=$("form input").eq(1).val();
				for(var i=0;i<yonghu.length;i++){
					if(yonghu[i].user==fi1){
						flag4=true;
					}
					if(yonghu[i].pass==fi2){
						flag5=true;
					}
				}
				if(flag4&&flag5){
					localStorage.userid=fi1;
					alert("登录成功，正在跳转")
					$("#subBtn").attr("disabled",true)
					location.href="../index.html?"+fi1;
				}else{
					if(!flag4){
					alert("用户名错误")
					$(this).attr("disabled",false)
				   }else{
				   	  if(!flag5){
					     alert("密码错误")
					     $(this).attr("disabled",false)
				      }
				   } 
				}
				})
			$(".register input").bind('input propertychange',function(){
				if($(".register input").eq(0).val()&&$(".register input").eq(1).val()&&$(".register input").eq(2).val()&&$(".register input").eq(3).val()){
					$(".register input").eq(4).css("background","rgb(65, 133, 244)")
					flag2=true;
				}else{
					$(".register input").eq(4).css("background","#BABABA")	
					flag2=false;
				}
			})
			//判断是否阅读协议和验证码
			$(".go_in").click(function(){
				//判断验证码
				var tt=$(".auth").text();
				var importVal=$("#import").val();
				if(tt==importVal){
					flag3=true;
				}else{
					auth();
					flag3=false;
				}
				//判断是否阅读协议和验证码
				if($("#agreement[type='checkbox']").is(':checked')&&flag2&&flag3){
					//判断是否重复注册
					var users=$(".register input").eq(0).val()
					if(users.length!=11){
						return alert("请输入正确格式的手机号")
					}
					var passw=$(".register input").eq(1).val()
					if(passw.length<6){
						return alert("请按格式输入密码")
					}
					var obj={user:users,pass:passw,arr:[]};
					var myuser=localStorage.user;
					var flags=true;
					if(!myuser){
						console.log(myuser)
						var arra=[];
						arra.push(obj)
					    var arr9=JSON.stringify(arra);
					    localStorage.user=arr9
					    localStorage.userid=users;
					    alert("注册成功")
					}else{
//						[{user:1,pass:2,gou:{}}]
					    var getmyuser=JSON.parse(localStorage.user);
					    $.each(getmyuser, function(index,ele){
					    	if(ele.user==users){
					    		flags=false;
					    	}
					    });
					    if(flags){
					    	console.log(getmyuser)
					        getmyuser.push(obj)
					        var arr3=JSON.stringify(getmyuser);
					        localStorage.user=arr3;
					        localStorage.userid=users;
					        alert("注册成功")
					        location.reload()
					    }else{
					    	alert("用户已注册")
					    	location.reload()
					    }
					}
					
					$(".tt").css("visibility","hidden")
					$(".register input").eq(4).attr("disabled",true)
				}else if($("#agreement[type='checkbox']").is(':checked')==false||flag3==false){
					if(flag3==false){
						$(".tt").css("visibility","visible")
						$(".tt").text("验证码错误")
					}else{
						$(".tt").css("visibility","visible")
					    $(".tt").text("必须同意三佳注册协议才能登陆")
					}
				}else if($("#agreement[type='checkbox']").is(':checked')==true){
					$(".tt").css("visibility","hidden")
				}
				else{
					$(".register input").eq(4).attr("disabled",false)
				}
				
			})
			
			//验证码
			function auth(){
			var arr=[2525,5256,2584,8778,8877,7748,7741,6963,9966,7301];
			var num=Math.floor(Math.random()*10);
			var sum=arr[num];
			$(".auth").text(sum)	
			}
			auth();
			
			
			
		})