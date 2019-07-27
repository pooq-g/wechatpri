// $(function(){
//     var token = localStorage.getItem("token")
//     //console.log(token)
//     var data =
//         '{"type":' +
//         '"get_account_list",' +
//         '"state":' +
//         '"all",' +
//         '"limit_start":' +
//         '"'+0+'",' +
//         '"limit_end":' +
//         '"'+20+'",' +
//         '"ticket":' +
//         '"'+token+'"' +
//         '}'
//         //传入参数
//         //console.log(data)
//         //获取账号列表
//         $.ajax({
//             type: 'post',
//             url: '/api.php',
//             data:data,
//             dataType: 'json',
//             success:function(msg){
//                 console.log(msg)
//                 if(msg.err_code == 0){
//                     console.log(msg.data)
//                     var data = msg.data
//                     var str = "";
//                     var ind = 0
//                     for(var id in data){
//                         ind ++;
//                         ind = ind < 10 ? "0" + ind : ind
//                         str += `
//                         <tr>
//                             <td>
//                                 <input type="checkbox" name="" lay-skin="primary" lay-filter="itemChoose">
//                             </td>
//                             <td>&nbsp;&nbsp;${ind}</td>
//                             <td>${data[id].nick}</td>
//                             <td>${data[id].wxid_raw}</td>
//                             <td>8</td>
//                             <td>${data[id].sex}</td>
//                             <td>
//                                 <img src="images/img_01.jpg" alt="" class="qg_vx"/>
//                             </td>
//                             <td>7.12</td>
//                             <td>深圳</td>
//                             <td>未验证</td>
//                             <td>${data[id].phone}</td>
//                             <td>--</td>
//                             <td>185</td>
//                             <td>185</td>
//                             <td>1815</td>
//                             <td>
//                             <em class="status success"></em>
//                             </td>
//                             <td>
//                                 <a href="#" class="lk c_blue">重新登录</a>
//                                 <a href="#" class="lk">登录信息</a>
//                             </td>
//                         </tr>
//                         `
//                     }
//                     $("tbody").append(str)
//                 }
//             }
//         })
// })