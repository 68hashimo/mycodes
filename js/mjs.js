const t_cok=document.getElementById("t_cok");
const ev = document.getElementById('ev_t');
const join_t=document.getElementById('js-join-trigger');
const autotx_btn=document.getElementById('btn');


function cut(tx){
    let i =1;
    let j=0;
    let tlen=tx.length;
    let str ='';
    const n ='\n'
    if (tx.length>=16){
        while (tlen>=15)
        {
            if (tlen>=15){
                let rep = tx.slice(j,i*15)+ n;
                str+=rep;
                i+=1;
                j+=15;
                tlen-=15;
                rep=''
            }
        }
        str += tx.slice((i-1)*15);
        //str=i*15;
        return str;
    }else{
        return tx;
    }
}
//1234567890a234567890b234567890 あいうえおかきくけこ漢字漢字漢字;func 文字列を改行する


//notification
function notify(n,n_str){
    var ls_notify=["ルームに参加しました",'登録した語句を検知しました'];
    var notify_text=ls_notify[n];
    Push.create(notify_text,{
      body:n_str,
      onClick:function(){
          this.close()  
      }  
    });
}
//userm使っていない
function userm(){
    try{
        var data2=location.href.split("=")[1];
        var text2=data2.split("&")[0];
        return decodeURI(data2);
    }catch(e){
        var u_name="no name";
        return u_name; 
    }
    //document.getElementById("txt_cok").innerHTML=text2;
}

//receive_name

window.onload = function(){
    var data = location.href.split("=")[1];
    var text = data.split("&")[0];
    document.getElementById("txt_cok").innerHTML = `your name:${decodeURI(text)}`;   
    /*decodeURIComponent(text);
    var data1 = location.href.split("&")[1];
    var text1=data1.split("=")[1];
    document.getElementById("js-room-id").value=text1;
    */
}
//*/

//get cookie test
function Cookies()
{
    //ev.click();
    console.log(GCookies());
}
window.addEventListener('load', function(){
    console.log("load：リソースファイルを全て読み込みました。");
    setTimeout(function(){
        join_t.click();
        ev.click();
        //autotx_btn.click();
        console.log(join_t);
    },2000);    
});

//jquery_menu
document.addEventListener('DOMContentLoaded', function(){
  
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');
  
    function menuToggle() {
  
      menuButton.classList.toggle('button-change');
      if(menuButton.textContent == 'メニューを開く'){
        menuButton.textContent = 'メニューを閉じる'
      }else{
        menuButton.textContent = 'メニューを開く'
      }
      navMenu.classList.toggle('nav-menu-open');
      overlay.classList.toggle('overlay-on');
    }

    document.addEventListener('keydown', (e)=> { 
        if(e.shiftKey) {
            if(e.ctrlKey){
                navMenu.classList.toggle('nav-menu-open');
                overlay.classList.toggle('overlay-on');
                //console.log("keydown_a");
            } 
        }
      });
  
    const menuEvent = document.getElementsByClassName('menu-event');
    for(let i = 0; i < menuEvent.length; i++) {
        menuEvent[i].addEventListener('click', menuToggle, false);
    }
  
  }, false);
// ev.style.visibility="hidden"
ev.addEventListener('click',Cookies);