$(function(){
    var token = localStorage.getItem("token")
    console.log(token)
    var data =
        '{"type":' +
        '"get_friend_list",' +
        '"wxid":' +
        '"wxid_seiyx5yxsx7822",' +
        '"limit1":' +
        '"'+0+'",' +
        '"limit2":' +
        '"'+20+'",' +
        '"ticket":' +
        '"'+token+'"' +
        '}'
        //console.log(data)
        //获取好友列表
    $.ajax({
        type: 'post',
        url: '/api.php',
        data:data,
        dataType: 'json',
        success:function(msg){
            console.log(msg)
            if(msg.err_code == 0){
                console.log(msg.data)
            }
        },
        error:function(err){
            console.log(err)
        }
    })
})