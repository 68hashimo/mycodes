function LoadProc() {
  var target = document.getElementById("DateTimeDisp");

  var Hour = now.getHours();
  var Min = now.getMinutes();

  target.innerHTML =Hour + ":" + Min + ":";
}

//通知
function notif(){
    Push.create('good',{
      body:'引き続き対応お願いします。',
      onClick:function(){
        //document.getElementById("c").innerHTML="bye";
        wrt();
        this.close()
          
      }  
    });
}

function notif2(){
  Push.create('change',{
    body:'担当変わります。',
    onClick:function(){
      //document.getElementById("c").innerHTML="bye";
      wrt();
      this.close()
        
    }  
  });
}

function notif3(){
  alert("緊急事態")
}  