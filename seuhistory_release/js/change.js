document.getElementById('submit').onclick = function(){
  var request = ajax();
  request.open("POST", "change.php");
  var data = "stuNum=" + document.getElementById("stuNum").value + "&ID=" + document.getElementById("ID").value + "&name=" + document.getElementById("name").value;
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(data);
  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(request.status === 200){
        var response = JSON.parse(request.responseText);
        if(response.res === false){
          document.getElementById('result').innerHTML = response.reason;
        }else{
          setCookie('rand', response.msg, new Date().getTime()+3600);
          document.getElementById('result').innerHTML = response.reason;
        }
      }else{
        alert("发生错误：" + request.status);
      }
    }
  }
}

document.getElementById("stuNum").onblur = function(){
  var re = /^(\d\d)[0-9A-Z]1(4|5)\d(\d\d)$/;
  document.getElementById('result').innerHTML = re.test(document.getElementById('stuNum').value)?"":"学号格式错误！";
}

document.getElementById("ID").onblur = function(){
  var re = /^2131(4|5)\d\d\d\d$/;
  document.getElementById('result').innerHTML = re.test(document.getElementById('ID').value)?"":"一卡通号格式错误！";
}
