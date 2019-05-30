$(function(){
	$(".head").load("../header.html",function(){
    		$(".hd_menu").hide();
    		$(".navigation_wrap>a").on("mouseover mouseout",function(){
    			$(".hd_menu").toggle();
    		})
    	})
    	$(".floot").load("../flooter.html")
    	$(".list_ul>li").click(function(){
    		$(this).addClass("border").siblings().removeClass("border")
    	})
})
