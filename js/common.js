$(function(){
	
    //
    $('.left_menu .haschild').click(function(){
        $(this).toggleClass('zk').find('.drop').slideToggle();
    });
   
//  弹窗
    $('.pop .close').click(function(){
        $('.pop_bg').hide();
        $(this).parents('.pop').hide();
    });
    $('.pop .cancel').click(function(){
        $('.pop_bg').hide();
        $(this).parents('.pop').hide();
    });
    $('.pop_bg').click(function(){
        $('.pop_bg').hide();
        $(this).siblings('.pop').hide();
    });
    
    $(".tabmenu .lk").click(function(){
    
        $(this).addClass("cur").siblings().removeClass("cur");
        
        var index=$(this).parent('.tabmenu').children('.lk').index(this);    
        
        $(this).parents(".tabmenu").siblings(".tabwrap").find(".module").eq(index).show().siblings().hide();
        
    });
   
});
