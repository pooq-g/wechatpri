$(function() {
  layui.use(['form', 'upload', 'laydate'], function() {
    var form = layui.form,
      layer = layui.layer,
      layedit = layui.layedit,
      laydate = layui.laydate,
      upload = layui.upload

    //全部
    form.on('select(category1)', function(data) {
      category = data.value
      categoryName = data.elem[data.elem.selectedIndex].text
      console.log(categoryName)
      form.render('select')
    })

    //标签
    form.on('select(category2)', function(data) {
      category = data.value
      categoryName = data.elem[data.elem.selectedIndex].text
      console.log(categoryName)
      form.render('select')
    })

    //搜索好友昵称
    $('body').delegate('.searchnick', 'propertychange input', function() {
      console.log($(this).val())
    })

    token = localStorage.getItem('token')
    wxid_raw = JSON.parse(localStorage.getItem('wxid_raw'))
    for (var id in wxid_raw) {
      var data =
        '{"type":' +
        '"get_friend_list",' +
        '"wxid":' +
        '"' +
        wxid_raw[id] +
        '",' +
        '"limit1":' +
        '"' +
        0 +
        '",' +
        '"limit2":' +
        '"' +
        20 +
        '",' +
        '"ticket":' +
        '"' +
        token +
        '"' +
        '}'

      //传入参数
      //console.log(data)

      $.ajax({
        type: 'post',
        url: 'http://192.168.10.177/api.esp',
        data: data,
        dataType: 'json',
        success: function(msg) {
          if (msg.err_code == 0) {
            var totalcount = $('.item_1')
              .find('.num')
              .text()
            totalcount = Number(totalcount)
            var data = msg.data
            totalcount += msg.friend_count
            $('.item_1 .num').text(totalcount)
            var data = msg.data
            console.log(data)
            var str = ''
            var ind = 0
            let msglist = []
            var wxfrom = []
            var count = 0
            for (var id in data) {
              console.log(data[id])
              //存储本人账号对应以及对应的好友账号
              wxfrom.push({
                selfwx: data[id].from_wxid,
                fronwx: data[id].friend_wxid
              })
              wxfrom = norepeat(wxfrom)
              //console.log(wxfrom)
              localStorage.setItem('wxfrom', JSON.stringify(wxfrom))
              msglist.push(data[id].friend_wxid)
              msglist = norepeat(msglist)
              str += `
                            <tr>
                                    <td>
                                        <input type="checkbox" name="" lay-skin="primary" lay-filter="itemChoose">
                                    </td>
                                    <td>${data[id].friend_wxid}</td>
                                    <td>
                                            <img src="${
                                              data[id].headurl
                                            }" data-id=${
                data[id].id
              } style="width:31px;height:31px;border-radius:50%">
                                        ${data[id].nickname}</td>
                                    <td>
                                        <em class="c_blue" data-id=${
                                          data[id].id
                                        }>同学家庭</em>
                                    </td>
                                    <td>${data[id].from_wxid}</td>
                                    <td>
                                        <a href="javascript:;" class="lk c_blue chartdetBtn">查看详情</a>
                                    </td>
                                    <td>
                                        <a href="javascript:;" class="lk_ico chart msgBtn" data-friend=${
                                          data[id].friend_wxid
                                        } data-nickname=${
                data[id].nickname
              }>去聊天</a>
                                        <a href="javascript:;" class="lk_ico quan chartquanBtn">朋友圈</a>
                                    </td>
                                </tr>
                            `
            }
            $('tbody').append(str)
            localStorage.setItem('friend_wxid', JSON.stringify(msglist))
            form.render('checkbox')
          }
        },
        error: function(err) {
          console.log(err)
        }
      })
    }

    form.on('checkbox(allChoose)', function(data) {
      var arr = []
      var child = $(data.elem)
        .parents('table')
        .find('tbody input[type="checkbox"]')
      child.each(function(index, item) {
        item.checked = data.elem.checked
        arr.push(
          $(item)
            .parents('tr')
            .find('td:nth-of-type(4) em')
            .get(0)
            .getAttribute('data-id')
        )
      })
      form.render('checkbox')
      //console.log(arr)
      //点击修改标签
      $('.edittagBtn').click(function() {
        $('.queding3').click(function() {
          //console.log($('.edittxt').val())
          for (let i = 0; i < arr.length; i++) {
            var data =
              '{"type":' +
              '"change_friend_lable",' +
              '"id":' +
              '"' +
              arr[i] +
              '",' +
              '"lable":' +
              '"' +
              $('.edittxt').val() +
              '",' +
              '"ticket":' +
              '"' +
              token +
              '"' +
              '}'
            //console.log(data)
            $.ajax({
              type: 'post',
              url: 'http://192.168.10.177/api.esp',
              data: data,
              dataType: 'json',
              success: function(msg) {
                console.log(msg)
                if (msg.err_code == 0) {
                  layer.msg('修改成功')
                } else {
                  layer.msg('修改失败')
                }
              }
            })
          }
        })
      })
    })
    form.on('checkbox(itemChoose)', function(data) {
      var arr = []
      var imgOneAll = $(data.elem)
        .parents('table')
        .find('tbody input[type="checkbox"]:checked')
      imgOneAll.each(function(index, item) {
        //console.log(item)
        arr.push(
          $(item)
            .parents('tr')
            .find('td:nth-of-type(4) em')
            .get(0)
            .getAttribute('data-id')
        )
      })

      $('.queding3').click(function() {
        console.log($('.edittxt').val())
        for (let i = 0; i < arr.length; i++) {
          var data =
            '{"type":' +
            '"change_friend_lable",' +
            '"id":' +
            '"' +
            arr[i] +
            '",' +
            '"lable":' +
            '"' +
            $('.edittxt').val() +
            '",' +
            '"ticket":' +
            '"' +
            token +
            '"' +
            '}'
          //console.log(data)
          $.ajax({
            type: 'post',
            url: 'http://192.168.10.177/api.esp',
            data: data,
            dataType: 'json',
            success: function(msg) {
              console.log(msg)
              if (msg.err_code == 0) {
                layer.msg('修改成功')
              } else {
                layer.msg('修改失败')
              }
            }
          })
        }
      })

      var sib = $(data.elem)
        .parents('table')
        .find('tbody input[type="checkbox"]:checked').length
      var total = $(data.elem)
        .parents('table')
        .find('tbody input[type="checkbox"]').length
      if (sib == total) {
        $(data.elem)
          .parents('table')
          .find('thead input[type="checkbox"]')
          .prop('checked', true)
        form.render()
      } else {
        $(data.elem)
          .parents('table')
          .find('thead input[type="checkbox"]')
          .prop('checked', false)
        form.render()
      }
    })

    $('.addtagBtn').click(function() {
      $('.pop_hy_addtag').show()
      $('.pop_bg').show()
    })

    //去聊天
    $('body').delegate('.msgBtn', 'click', function() {
      $('.pop_chart_msg').show()
      $('.pop_bg').show()
      var $friend = $(this)
        .get(0)
        .getAttribute('data-friend')
      var nickname = $(this)
        .get(0)
        .getAttribute('data-nickname')
      nickname = '好友昵称：' + nickname
      $('.pop_chart_msg .fl').html(nickname)

      //表情包
      var count = 0
      $('.bq').click(function() {
        count++
        if (count % 2 == 0) {
          $('.positiemoij').hide()
        } else {
          $('.positiemoij').show()
        }
        var content = $('.textarea').val()

        //输入表情
        $('.positiemoij>.expression li').click(function() {
          console.log(content)
          var name = $(this)
            .find('i')
            .get(0)
            .getAttribute('data-name')
          $('.positiemoij').hide()
          //$content += $(".ipt").val("["+name+"]")
          content += '[' + name + ']'

          console.log(content)
          $('.textarea').val(content)
        })
      })

      $('.queding2').click(function() {
        $('.positiemoij').hide()
        var $content = $('textarea').val()

        for (var i in wxid_raw) {
          var data =
            '{"type":' +
            '"send_msg",' +
            '"wxid":' +
            '"' +
            wxid_raw[i] +
            '",' +
            '"to_wxid":' +
            '"' +
            $friend +
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
          //console.log(data)
          $.ajax({
            type: 'post',
            url: 'http://192.168.10.177/api.esp',
            data: data,
            dataType: 'json',
            success: function(msg) {
              //console.log(msg)
              if (msg.err_code == 0) {
                $('.pop_hy_addtag1').hide()
                $('.pop_bg').hide()
                layer.msg('发送成功')
                $('.positiemoij').hide()
              } else {
                layer.msg('发送失败')
              }
              $('textarea').val('')
            },
            error: function(err) {
              console.log(err)
            }
          })
        }
      })
    })
    //去朋友圈
    $('body').delegate('.chartquanBtn', 'click', function() {
      $('.pop_chart_quan').show()
      $('.pop_bg').show()
    })

    $('body').delegate('.chartdetBtn', 'click', function() {
      $('.pop_chart_det').show()
      $('.pop_bg').show()
    })

    // $('.chartdetBtn').click(function(){
    //     $('.pop_chart_det').show();
    //     $('.pop_bg').show();
    // });

    $('.edittagBtn').click(function() {
      $('.pop_hy_edittag').show()
      $('.pop_bg').show()
    })
  })

  $('.positiemoij>ul li').click(function() {
    var $ind = $(this).text() - 1
    console.log($ind)
    $('.expression')
      .eq($ind)
      .addClass('one')
      .siblings()
      .removeClass('one')
  })

  //控制输入的文字数量
  $('body').delegate('.ipt', 'propertychange input', function() {
    if ($(this).val().length > 0) {
      var $len = $(this).val().length
      var $inputlen = 3000 - $len
      $('.frs').html('还可输入' + $inputlen + '字，按Enter键换行')
      if ($len >= 3000) {
        $(this).val(
          $(this)
            .val()
            .substring(0, 3000)
        )
        $('.words').html(0)
      }
    } else {
      console.log('未输入')
    }
  })
})
