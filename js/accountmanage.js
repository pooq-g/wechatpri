$(function(){

    layui.use(["layer",'form', 'upload', 'laydate'], function(){
        var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,upload = layui.upload;
        
        //全部账号
        form.on('select(category1)', function (data) {
                  category = data.value;
                  categoryName = data.elem[data.elem.selectedIndex].text;
                  console.log(categoryName)
                  form.render('select');
                });

                 //全部会员
        form.on('select(category2)', function (data) {
          category = data.value;
          categoryName = data.elem[data.elem.selectedIndex].text;
          console.log(categoryName)
          form.render('select');
        });

                //全部会员
                form.on('select(categorys)', function (data) {
                  categorys = data.value;
                  categoryNames = data.elem[data.elem.selectedIndex].text;
                  console.log(categoryNames)
                  form.render('select');
                });
                  
          

        //搜索账号的值
        $('body').delegate('.searchaccount', 'propertychange input', function() {
          console.log($(this).val())
        })

        token = localStorage.getItem("token")
            //console.log(token)
            //获取好友列表
            var data =
                '{"type":' +
                '"get_account_list",' +
                '"state":' +
                '"all",' +
                '"limit_start":' +
                '"'+0+'",' +
                '"limit_end":' +
                '"'+200+'",' +
                '"ticket":' +
                '"'+token+'"' +
                '}'
                //传入参数
                //console.log(data)
                //获取账号列表
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.10.177/api.esp',
                    data:data,
                    dataType: 'json',
                    success:function(msg){
                        if(msg.err_code == 0){
                            console.log(msg.data)
                            var totalcount = $(".item_1").find(".num").text()
                            totalcount = Number(totalcount)
                            var data = msg.data
                            totalcount += data.length
                            $(".item_1").find(".num").text(totalcount)
                            // localStorage.setItem("wxid_raw",msg.data[0].wxid_raw)
                            // localStorage.setItem("weixinnick",)
                            var str = "";
                            var ind = 0
                            var wx_raw = []
                            var wx_nick = []
                            var counts = 0
                            for(var id in data){
                                ind ++;
                                ind = ind < 10 ? "0" + ind : ind
                                
                                if(data[id].state == 2){
                                  counts++
                                  str += `
                                  <tr data-id=${data[id].id}>
                                      <td>
                                          <input data-id=${data[id].id} type="checkbox" name="" lay-skin="primary" lay-filter="itemChoose">
                                      </td>
                                      <td>&nbsp;&nbsp;${ind}</td>
                                      <td>
                                          <img src="${data[id].head_img}" style="width:30px;height:30px;border-radius:50%" data-label=${data[id].lable} data-lable=${data[id].lable} data-phone=${data[id].phone} data-id=${data[id].id} data-nick=${data[id].nick} data-sex=${data[id].sex} data-city=${data[id].sex} data-sign=${data[id].sign_str}>
                                          ${data[id].nick}
                                      </td>
                                      <td>${data[id].wxid_raw}</td>
                                      <td>8</td>
                                      <td>${data[id].sex}</td>
                                      <td>
                                          <img src="images/img_01.jpg" alt="" class="qg_vx"/>
                                      </td>
                                      <td>${data[id].lable}</td>
                                      <td>深圳</td>
                                      <td>未验证</td>
                                      <td>${data[id].phone}</td>
                                      <td>--</td>
                                      <td>185</td>
                                      <td>185</td>
                                      
                                      <td>
                                      <em class="status success"></em>
                                      
                                      </td>
                                      <td>
                                          <a href="#" class="lk c_blue c_blues" data-id=${data[id].id}>重新登录</a>
                                          <a href="#" class="lk">${data[id].login_log}</a>
                                      </td>
                                  </tr>
                                  `
                                }else{
                                  str += `
                                  <tr data-id=${data[id].id}>
                                      <td>
                                          <input data-id=${data[id].id} type="checkbox" name="" lay-skin="primary" lay-filter="itemChoose">
                                      </td>
                                      <td>&nbsp;&nbsp;${ind}</td>
                                      <td>
                                          <img src="${data[id].head_img}" style="width:30px;height:30px;border-radius:50%" data-label=${data[id].lable} data-lable=${data[id].lable} data-phone=${data[id].phone} data-id=${data[id].id} data-nick=${data[id].nick} data-sex=${data[id].sex} data-city=${data[id].sex} data-sign=${data[id].sign_str}>
                                          ${data[id].nick}
                                      </td>
                                      <td>${data[id].wxid_raw}</td>
                                      <td>8</td>
                                      <td>${data[id].sex}</td>
                                      <td>
                                          <img src="images/img_01.jpg" alt="" class="qg_vx"/>
                                      </td>
                                      <td>${data[id].lable}</td>
                                      <td>深圳</td>
                                      <td>未验证</td>
                                      <td>${data[id].phone}</td>
                                      <td>--</td>
                                      <td>185</td>
                                      <td>185</td>
                                      
                                      <td>
                                      <em class="status fail"></em>
                                      </td>
                                      <td>
                                          <a href="#" class="lk c_blue c_blues" data-id=${data[id].id}>重新登录</a>
                                          <a href="#" class="lk">${data[id].login_log}</a>
                                      </td>
                                  </tr>
                                  `
                                }
                              }
                              $(".item_2 .num").text(counts)
                              $(".item_3 .num").text($(".item_1 .num").text()-$(".item_2 .num").text())
                            $("table tbody").append(str)
                            
                            $(".item_1 num").text($("table tbody").find("tr").length)
                            form.render('checkbox');
                        }
                    },
                    error:function(err){
                        console.log(err)
                    }
                })
          
        
         
        var count = 0
          form.on('checkbox(allChoose)', function(data){
              //点击全选后的所有的tr元素
            var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
           
            //console.log(child)
            var imgArr = []
        
            var total = $(data.elem).parents('table').find('tbody input[type="checkbox"]').length;
            console.log(total)
            count++;
            if(count%2 !== 0){
                console.log("全选")
                $(".qg_topbar span:first-child").find("em").text(total)
        
            }else{
                console.log("全不选")
                $(".qg_topbar span:first-child").find("em").text(0)
            }
            //点击全选的时候批量操作总量
            $(".qg_topbar span:first-child").find("em").text(total)
            child.each(function(index, item){
                if($(item).parents('table').find('tbody input[type="checkbox"]:checked')){
                  imgArr.push($(item).parents("tr").find("td:nth-of-type(3) img").get(0))
                }
                
                
                item.checked = data.elem.checked;
            });
            form.render('checkbox');
            for(let i = 0; i < imgArr.length; i++){
                let id = imgArr[i].getAttribute("data-id")
                let imgSrc = imgArr[i].src
                window.imgSrc = imgSrc
                let sexAll = imgArr[i].getAttribute("data-sex")
                let cityAll = imgArr[i].getAttribute("data-city")
                let signAll = imgArr[i].getAttribute("data-sign")
                let nickAll = imgArr[i].getAttribute("data-nick")
                let lableAll = imgArr[i].getAttribute("data-lable")
                let phoneAll = imgArr[i].getAttribute("data-phone")
                let labelAll = imgArr[i].getAttribute("data-label")
                //console.log(id,sexAll,cityAll,signAll,nickAll,lableAll,phoneAll)
                
                //上传头像
                $(".qg_topbar span:nth-of-type(2) input").change(function(){
                    //循环出来的id和src
                    //console.log(id,imgSrc)
                    var file = document.querySelector('.qg_topbar span:nth-of-type(2) input[type=file]').files[0];
                    var reader  = new FileReader();
                    reader.addEventListener("load", function () {
                        imgSrc.src = reader.result;
                        var baseimg = reader.result
                        //console.log(baseimg)
        
                        //token
                        var token = localStorage.getItem("token")
                        //传入参数
                        var data =
                        '{"type":' +
                        '"change_head",' +
                        '"id":' +
                        '"'+id+'",' +
                        '"head_img":' +
                        '"'+baseimg+'",' +
                        '"ticket":' +
                        '"'+token+'"' +
                        '}'
                        console.log(data)
                        $.ajax({
                            type: 'post',
                            url: 'http://192.168.10.177/api.esp',
                            data:data,
                            dataType: 'text',
                            success:function(msg){
                                console.log(msg)
                                // if(msg.err_code == 0){
                                //     console.log(msg.data)
                                // }
                            },
                            error:function(err){
                                console.log(err)
                            }
                        })
                    }, false);
        
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                })
                
                //全选上线
                $(".loginup").click(function(){
                    var data =
                    '{"type":' +
                    '"login_account",' +
                    '"id":' +
                    '"'+id+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("已提交登录")
                            }else{
                                layer.msg("登录失败")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
            
                //全选下线
                $(".loginout").click(function(){
                    var data =
                    '{"type":' +
                    '"logout_account",' +
                    '"id":' +
                    '"'+id+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("下线成功")
                            }else{
                                layer.msg("操作失败")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
            
            
                //全选删除
                $(".del").click(function(){
                    var data =
                    '{"type":' +
                    '"del_account",' +
                    '"lable":' +
                    '"'+labelAll+'",' +
                    '"phone":' +
                    '"'+phoneAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("删除成功")
                            }else{
                                layer.msg("删除失败")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
            
            
                //全选修改昵称
                $(".btns .fl1").click(function(){
                    var $nick = $(".box1 .ipt_txt").val()
                    var data =
                    '{"type":' +
                    '"change_nick",' +
                    '"id":' +
                    '"'+id+'",' +
                    '"nick":' +
                    '"'+$nick+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    console.log(data)
                    // $.ajax({
                    //     type: 'post',
                    //     url: 'http://192.168.10.177/api.esp',
                    //     data:data,
                    //     dataType: 'json',
                    //     success:function(msg){
                    //         console.log(msg)
                    //         if(msg.err_code == 0){
                    //             $('.pop_hy_addtag1').hide();
                    //             $('.pop_bg').hide();
                    //             layer.msg("修改成功")
                    //         }else{
                    //             layer.msg("修改失败")
                    //         }
                    //     },
                    //     error:function(err){
                    //         console.log(err)
                    //     }
                    // })
                })
           
                   //全选修改个人信息
                $(".btns .fl2").click(function(){
                    //console.log(categoryNames)
                    var $province = $(".box3 .ipt_txt").val()
                    var $cityAll = $(".box4 .ipt_txt").val()
                    var $signAll = $(".box5 .ipt_txt").val()
                    $sexAll = categoryNames == "男" ? 1 : 2
                    //console.log($cityOneAll,$signOneAll,$sexOneAll)
                    var data =
                    '{"type":' +
                    '"change_info",' +
                    '"id":' +
                    '"'+id+'",' +
                    '"sex":' +
                    '"'+$sexAll+'",' +
                    '"province":' +
                    '"'+$province+'",' +
                    '"city":' +
                    '"'+$cityAll+'",' +
                    '"sign_str":' +
                    '"'+$signAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    console.log(data)
                    // $.ajax({
                    //     type: 'post',
                    //     url: 'http://192.168.10.177/api.esp',
                    //     data:data,
                    //     dataType: 'json',
                    //     success:function(msg){
                    //         console.log(msg)
                    //         if(msg.err_code == 0){
                    //             $('.pop_hy_addtag2').hide();
                    //             $('.pop_bg').hide();
                    //             layer.msg("修改成功")
                    //         }else{
                    //             layer.msg("修改失败")
                    //         }
                    //     },
                    //     error:function(err){
                    //         console.log(err)
                    //     }
                    // })
                })
        
            }
        });
        
        //单选
        form.on('checkbox(itemChoose)',function(data){
            var arrOne = []
            var imgOneAll = $(data.elem).parents('table').find('tbody input[type="checkbox"]:checked')
            //console.log(imgOneAll)

            var total = $(data.elem).parents('table').find('tbody input[type="checkbox"]').length;
            
            imgOneAll.each(function(index,item){
              arrOne.push($(item).parents("tr").find("td:nth-of-type(3) img").get(0))
              })
              console.log(arrOne)
              for(let i = 0; i < arrOne.length; i++){
                //console.log(arrOne[i])
                let idOneAll = arrOne[i].getAttribute("data-id")
                let imgSrcOneAll = arrOne[i].src
                let sexOneAll = arrOne[i].getAttribute("data-sex")
                let cityOneAll = arrOne[i].getAttribute("data-city")
                let signOneAll = arrOne[i].getAttribute("data-sign")
                let nickOneAll = arrOne[i].getAttribute("data-nick")
                let lableOneAll = arrOne[i].getAttribute("data-lable")
                let phoneOneAll = arrOne[i].getAttribute("data-phone")
                //console.log(lableOneAll,sexOneAll,cityOneAll,signOneAll,nickOneAll,lableOneAll,phoneOneAll)
                //上传图片
                $(".qg_topbar span:nth-of-type(2) input").change(function(){
                    
                        //循环出来的id和src
                        console.log(idOneAll,imgSrcOneAll)
                        var file = document.querySelector('.qg_topbar span:nth-of-type(2) input[type=file]').files[0];
                        var reader  = new FileReader();
                        reader.addEventListener("load", function () {
                            imgSrcOneAll = reader.result;
                            var baseimg = reader.result
                            console.log(baseimg)
            
                            //token
                            var token = localStorage.getItem("token")
                            //传入参数
                            var data =
                            '{"type":' +
                            '"change_head",' +
                            '"id":' +
                            '"'+idOneAll+'",' +
                            '"head_img":' +
                            '"'+baseimg+'",' +
                            '"ticket":' +
                            '"'+token+'"' +
                            '}'
                            console.log(data)
                            $.ajax({
                                type: 'post',
                                url: 'http://192.168.10.177/api.esp',
                                data:data,
                                dataType: 'text',
                                success:function(msg){
                                    console.log(msg)
                                    // if(msg.err_code == 0){
                                    //     console.log(msg.data)
                                    // }
                                },
                                error:function(err){
                                    console.log(err)
                                }
                            })
                        }, false);
            
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    })
                
        
              //        //修改昵称
                $(".btns .fl1nc").click(function(){
                  var $nick = $(".box1 .ipt_txt").val()
                  var data =
                  '{"type":' +
                  '"change_nick",' +
                  '"id":' +
                  '"'+idOneAll+'",' +
                  '"nick":' +
                  '"'+$nick+'",' +
                  '"ticket":' +
                  '"'+token+'"' +
                  '}'
                  console.log(data)

                  $.ajax({
                    type: 'post',
                    url: 'http://192.168.10.177/api.esp',
                    data:data,
                    dataType: 'json',
                    success:function(msg){
                        console.log(msg)
                        if(msg.err_code == 0){
                            $('.pop_hy_addtag1').hide();
                            $('.pop_bg').hide();
                            layer.msg("修改成功")
                        }
                    },
                    error:function(err){
                        console.log(err)
                    }
                })
              })  
         
              //   //修改个人信息
                $(".btns .fl2").click(function(){
                    //console.log(categoryNames)
                    var $province = $(".box3 .ipt_txt").val()
                    var $cityOneAll = $(".box4 .ipt_txt").val()
                    var $signOneAll = $(".box5 .ipt_txt").val()
                    $sexOneAll = categoryNames == "男" ? 1 : 2
                    console.log($cityOneAll,$signOneAll,$sexOneAll)
                    var data =
                    '{"type":' +
                    '"change_info",' +
                    '"id":' +
                    '"'+idOneAll+'",' +
                    '"sex":' +
                    '"'+$sexOneAll+'",' +
                    '"province":' +
                    '"'+$province+'",' +
                    '"city":' +
                    '"'+$cityOneAll+'",' +
                    '"sign_str":' +
                    '"'+$signOneAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                $('.pop_hy_addtag2').hide();
                                $('.pop_bg').hide();
                                layer.msg("修改成功")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
        
              //   //重新登录
                $("body").delegate(".c_blues","click",function(){
                    var data =
                    '{"type":' +
                    '"login_account",' +
                    '"id":' +
                    '"'+idOneAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    // console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("已提交登录")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
        
              //   //上线
                $(".loginup").click(function(){
                    var data =
                    '{"type":' +
                    '"login_account",' +
                    '"id":' +
                    '"'+idOneAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    //console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("已提交登录")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
        
        
              //   //下线
                $(".loginout").click(function(){
                    var data =
                    '{"type":' +
                    '"logout_account",' +
                    '"id":' +
                    '"'+idOneAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    //console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("下线成功")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
        
              //   //删除
                $(".del").click(function(){
                    var data =
                    '{"type":' +
                    '"del_account",' +
                    '"lable":' +
                    '"'+lableOneAll+'",' +
                    '"phone":' +
                    '"'+phoneOneAll+'",' +
                    '"ticket":' +
                    '"'+token+'"' +
                    '}'
                    //console.log(data)
                    $.ajax({
                        type: 'post',
                        url: 'http://192.168.10.177/api.esp',
                        data:data,
                        dataType: 'json',
                        success:function(msg){
                            console.log(msg)
                            if(msg.err_code == 0){
                                layer.msg("删除成功")
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                })
                 }
        
           
        
        
        
            //单选选中的数量
            var sib = $(data.elem).parents('table').find('tbody input[type="checkbox"]:checked').length;
            
            $(".qg_topbar span:first-child").find("em").text(sib)
            //总共的数量
            var total = $(data.elem).parents('table').find('tbody input[type="checkbox"]').length;
            if(sib == total){
                $(data.elem).parents('table').find('thead input[type="checkbox"]').prop("checked",true);
                form.render();
            }else{
                $(data.elem).parents('table').find('thead input[type="checkbox"]').prop("checked",false);
                form.render();
            }
        });
        //修改昵称
        $('.addtagBtnnc').click(function(){
            $('.pop_hy_addtagnc').show();
            $('.pop_bg').show();
        });
        //修改基本信息
        $('.addtagBtn2').click(function(){
            $('.pop_hy_addtag2').show();
            $('.pop_bg').show();
            
        });

        $(".fl1nc").click(function(){
          $('.pop_hy_addtagnc').hide();
          $('.pop_bg').hide();
        })
        
        });


       


})