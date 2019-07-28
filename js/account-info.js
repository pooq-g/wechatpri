$(function() {
  var token = localStorage.getItem('token')
  console.log(token)
  var data =
    '{"type":' +
    '"get_account_info",' +
    '"id":' +
    '"1",' +
    '"ticket":' +
    '"' +
    token +
    '"' +
    '}'
  console.log(data)
  //6.获取指定账号信息
  $.ajax({
    type: 'post',
    url: 'http://192.168.10.177/api.esp',
    data: data,
    dataType: 'json',
    success: function(msg) {
      console.log(msg)
      if (msg.err_code == 0) {
        console.log(msg.data)
      }
    },
    error: function(err) {
      console.log(err)
    }
  })
})
