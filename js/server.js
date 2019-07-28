$(function() {
  token = localStorage.getItem('token')
  wxid_raw = JSON.parse(localStorage.getItem('wxid_raw'))
  friend_wxid = JSON.parse(localStorage.getItem('friend_wxid'))
  wxfrom = JSON.parse(localStorage.getItem('wxfrom'))

  msglist = []
  let leftmsg = ''
  for (var i in wxfrom) {
    var data =
      '{"type":' +
      '"get_msg",' +
      '"from_wxid":' +
      '"' +
      wxfrom[i].selfwx +
      '",' +
      '"to_wxid":' +
      '"' +
      wxfrom[i].fronwx +
      '",' +
      '"createtime":' +
      '"0",' +
      '"ticket":' +
      '"' +
      token +
      '"' +
      '}'
    //console.log(data)
    //获取聊天信息
    $.ajax({
      type: 'post',
      url: 'http://192.168.10.177/api.esp',
      data: data,
      dataType: 'json',
      success: function(msg) {
        if (msg.err_code == 0) {
          var data = msg.data
          console.log(data)
          msgnick = []
          for (m in wxid_raw) {
            if (data[0]) {
              if (data[0].from_wxid !== wxid_raw[m]) {
                leftmsg = `
                                <li class="item clearfix clickhandler" data-fd=${
                                  data[0].to_wxid
                                } data-td=${data[0].from_wxid}>
                                    <img src="images/kf_06.png" alt="" class="hdimg fl" />
                                    <div class="info">
                                    <h6 class="name">${
                                      data[0].from_wxid
                                    }<em class="num">1</em></h6>
                                    <p class="fz ellipsis">留言内容聊天内容留言内...</p>
                                    </div>
                                </li>
                                `
              } else {
                leftmsg = `
                                <li class="item clearfix clickhandler" data-fd=${
                                  data[0].from_wxid
                                } data-td=${data[0].to_wxid}>
                                    <img src="images/kf_06.png" alt="" class="hdimg fl" />
                                    <div class="info">
                                    <h6 class="name">${
                                      data[0].to_wxid
                                    }<em class="num">1</em></h6>
                                    <p class="fz ellipsis">留言内容聊天内容留言内...</p>
                                    </div>
                                </li>
                                `
              }
            }
          }
          $('.chart_memlist').append(leftmsg)
          // for(i in data){
          //     //获取消息来源好友微信号
          //     for(m in wxid_raw){
          //         //如果data[i].from_wxid不等于本微信号，则添加from
          //         if(data[i].from_wxid !== wxid_raw[m]){
          //             //console.log(data[i].to_wxid)
          //             msglist.push(data[i].from_wxid)
          //         }else{
          //             //否则添加to微信号 do 1470
          //             //console.log(data[i].to_wxid)
          //             msglist.push(data[i].to_wxid)
          //         }
          //     }
          // }
          // msglist = norepeat(msglist)
          // //左边的好友
          // for(let j = 0; j < msglist.length; j++){
          //         leftmsg = `
          //         <li class="item clearfix clickhandler">
          //             <img src="images/kf_06.png" alt="" class="hdimg fl" />
          //             <div class="info">
          //             <h6 class="name">${msglist[j]}<em class="num">1</em></h6>
          //             <p class="fz ellipsis">留言内容聊天内容留言内...</p>
          //             </div>
          //         </li>
          //         `
          //     }
          //     $(".chart_memlist").append(leftmsg)
        }
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  $('body').delegate('.clickhandler', 'click', function() {
    var fromwxid = $(this)
      .get(0)
      .getAttribute('data-fd')
    var towxid = $(this)
      .get(0)
      .getAttribute('data-td')
    //console.log(fromwxid,towxid)
    var data =
      '{"type":' +
      '"get_msg",' +
      '"from_wxid":' +
      '"' +
      fromwxid +
      '",' +
      '"to_wxid":' +
      '"' +
      towxid +
      '",' +
      '"createtime":' +
      '"0",' +
      '"ticket":' +
      '"' +
      token +
      '"' +
      '}'
    //console.log(data)
    $('.chart_dialog .list').text('')
    $.ajax({
      type: 'post',
      url: 'http://192.168.10.177/api.esp',
      data: data,
      dataType: 'json',
      success: function(msg) {
        if (msg.err_code == 0) {
          var data = msg.data
          console.log(data)
          var str = ''
          for (var j in data) {
            //右边的聊天
            //左边
            if (data[j].to_wxid == towxid) {
              str = `
                            <li class="odd lists">
                            <img src="images/kf_10.png" alt="" class="hdimg" />
                            <div class="txt">${data[j].content}</div>
                            </li>
                            `
            } else {
              //右边
              str = `
                                <li class="even lists">
                                <div class="txt">${data[j].content}</div>
                                <img src="images/kf_11.png" alt="" class="hdimg" />
                                </li>
                                `
            }
            $('.chart_dialog .list').append(str)
            setTimeout(function() {
              $('.lists:last-child')[0].scrollIntoView()
            }, 100)
          }
        }
      }
    })

    //点击发送
    $('.button')
      .unbind('click')
      .bind('click', function() {
        $('.positiemoij').hide()
        var $content = $('textarea').val()
        var data =
          '{"type":' +
          '"send_msg",' +
          '"wxid":' +
          '"' +
          wxid_raw +
          '",' +
          '"to_wxid":' +
          '"' +
          fromwxid +
          '",' +
          '"content":' +
          '"' +
          $content +
          '",' +
          '"ticket":' +
          '"' +
          token +
          '"' +
          '}'
        console.log(data)
        // $.ajax({
        //     type: 'post',
        //     url: 'http://192.168.10.177/api.esp',
        //     data:data,
        //     dataType: 'json',
        //     success:function(msg){
        //         console.log(msg)
        //     }
        // })
      })
  })

  //定时获取发送
  setInterval(function() {
    callFunction()
  }, 2000)

  var data =
    '{"type":' + '"get_new_msg",' + '"ticket":' + '"' + token + '"' + '}'

  function callFunction() {
    // $.ajax({
    //     type: 'post',
    //     url: 'http://192.168.10.177/api.esp',
    //     data:data,
    //     dataType: 'json',
    //     success:function(msg){
    //         console.log(msg)
    //         if(msg.err_code == 0){
    //             var content = msg.content
    //             var from_wxid = msg.from_wxid
    //             var indexofmsg = msglist.indexOf(from_wxid)
    //             console.log(msglist.indexOf(from_wxid))
    //             if(indexofmsg == -1){
    //                 $(".chart_memlist").append(`
    //                 <li class="item clearfix">
    //                     <img src="images/kf_06.png" alt="" class="hdimg fl" />
    //                     <div class="info">
    //                     <h6 class="name">${from_wxid}<em class="num" data-msgid=${msg.msgid}>1</em></h6>
    //                     <p class="fz ellipsis">${content}</p>
    //                     </div>
    //                 </li>
    //                 `)
    //             }else{
    //                 var fromwxid = msg.from_wxid
    //                 var havemsg = $("h6:contains(fromwxid)").parents("li")
    //                 console.log(havemsg)
    //             }
    //         }
    //     }
    // })
  }
})

function norepeat(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
