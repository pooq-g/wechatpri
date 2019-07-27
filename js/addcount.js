$(function(){
    var token = localStorage.getItem("token")
    console.log(token)

    var files = document.getElementById('files');
	files.onchange = function() {
		var file = files.files[0];
		var reader = new FileReader();
		reader.readAsText(file,'gb2312');//后面的参数是防止中文乱码
		reader.onload = function() {
            // console.log(reader.result)
            var str = reader.result
            //读取到的文档数据
            console.log(str)
            var nstr = str.split("\n")
            //对数据进行换行符分割
            console.log(nstr)
            var newArr = []
            for(var i = 0; i < nstr.length; i++){
                // console.log(nstr[i])
                newArr.push(nstr[i].split("----"))
            }
            //分割之后的数据
            //dconsole.log(newArr)
            for(var j in newArr){
                var data =
                '{"type":' +
                '"add_account",' +
                '"lable":' +
                '"group1",' +
                '"phone":' +
                '"'+newArr[j][0]+'",' +
                '"password":' +
                '"'+newArr[j][1]+'",' +
                '"a16":' +
                '"'+newArr[j][2]+'",' +
                '"ticket":' +
                '"'+token+'"' +
                '}'
                //拿到的传入的参数
                console.log(data)
                //setTimeout(function(){
                    // $.ajax({
                    //     type: 'post',
                    //     url: 'http://192.168.10.177/api.esp',
                    //     data:data,
                    //     dataType: 'json',
                    //     contentType:"application/json",
                    //     success:function(msg){
                    //         console.log(msg)
                    //         if(msg.err_code == 0){
                    //             console.log("传入成功")
                    //         }
                    //     },
                    //     error:function(err){
                    //         console.log(err)
                    //     }
                    // })
                    axios.post("http://192.168.10.177/api.esp",data)
                    .then(function(msg){
                        console.log(msg)
                    })

                //},500)
            }

            
		}
	}
})