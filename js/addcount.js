$(function() {
  layui.use(['layer', 'form', 'upload', 'laydate'], function() {
    var form = layui.form,
      layer = layui.layer,
      layedit = layui.layedit,
      laydate = layui.laydate,
      upload = layui.upload

    var alllabelgoup = localStorage.getItem('alllabelgoup')
    console.log(alllabelgoup)
    var token = localStorage.getItem('token')
    console.log(token)

    $('.addtagBtns')
      .unbind()
      .bind('click', function() {
        $('.pop_hy_edittag').show()
        $('.pop_bg').show()
        form.render('radio')
      })

    //新建标签
    // $('.fl1s')
    //   .unbind()
    //   .bind('click', function() {
    //     //console.log($('.ipt_txts').val())
    //     $('.pop_hy_edittag').show()
    //     $('.box10').append(`
    //       <li class="grp" style="display:block">
    //         <input
    //           type="radio"
    //           name="tag"
    //           value="${$('.ipt_txts').val()}"
    //           title="${$('.ipt_txts').val()}"
    //           lay-filter="messageset"
    //         />
    //       </li>
    //       `)
    //     $('.pop_bg').show()
    //     $('.pop_hy_addtag1s').hide()
    //     form.render('radio')
    //   })

    //单选
    form.on('radio(messageset)', function(data) {
      console.log(data.value)
      var choosegroup = data.value

      $('.quedingf2').click(function() {
        var files = document.getElementById('files')
        files.onchange = function() {
          var file = files.files[0]
          var reader = new FileReader()
          reader.readAsText(file, 'gb2312') //后面的参数是防止中文乱码
          reader.onload = function() {
            // console.log(reader.result)
            var str = reader.result
            //读取到的文档数据
            console.log(str)
            var nstr = str.split('\n')
            //对数据进行换行符分割
            console.log(nstr)
            var newArr = []
            for (var i = 0; i < nstr.length; i++) {
              // console.log(nstr[i])
              newArr.push(nstr[i].split('----'))
            }
            //分割之后的数据
            //console.log(newArr)

            for (var j in newArr) {
              var data =
                '{"type":' +
                '"add_account",' +
                '"lable":' +
                '"' +
                choosegroup +
                '",' +
                '"phone":' +
                '"' +
                newArr[j][0] +
                '",' +
                '"password":' +
                '"' +
                newArr[j][1] +
                '",' +
                '"a16":' +
                '"' +
                newArr[j][2] +
                '",' +
                '"ticket":' +
                '"' +
                token +
                '"' +
                '}'
              //拿到的传入的参数
              //console.log(data)
              $.ajax({
                type: 'post',
                url: 'http://192.168.10.177/api.esp',
                data: data,
                dataType: 'json',
                success: function(msg) {
                  console.log(msg)
                  if (msg.err_code == 0) {
                    layer.msg('上传成功')
                  } else {
                    layer.msg('上传失败')
                  }
                },
                error: function(err) {
                  console.log(err)
                }
              })
            }
          }
        }
      })
    })
  })
})
