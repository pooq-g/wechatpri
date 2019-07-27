$(function() {
  $('.ipt_button').click(function() {
    if ($('.ipt_name').val() && $('.ipt_psd').val()) {
      var $user = $('.ipt_name').val()
      var $pass = $('.ipt_psd').val()
      var $pass = $.md5($pass)
      // var data =
      //   '{"type":' +
      //   '"login",' +
      //   '"user":' +
      //   '"admin",' +
      //   '"pass":' +
      //   '"e10adc3949ba59abbe56e057f20f883e"' +
      //   '}'
        var data =
        '{"type":' +
        '"login",' +
        '"user":' +
        '"'+$user+'",' +
        '"pass":' +
        '"'+$pass+'"' +
        '}'
      $.ajax({
        type: 'post',
        url: 'http://192.168.10.177/api.esp',
        data:data,
        dataType: 'json',
        success: function(msg) {
          console.log(msg)
          if(msg.err_code == 0){
            console.log("登录成功")
            var ticket = msg.ticket
            console.log(ticket)
            localStorage.setItem("token",ticket)
            //跳转到首页
            location.href="账号-会员管理.html"
          }
        },
        error: function(err) {
          console.log(err)
        }
      })
    } else {
      alert('请输入账号或密码')
    }
  })
})
