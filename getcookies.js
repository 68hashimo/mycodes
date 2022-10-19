//クッキーを連想配列として取得
//クッキーの名前をキーとした連想配列で、すべてのクッキーを得られます。

function sendcookies(){
    var expire = new Date();
    expire.setTime( expire.getTime() + 1000 * 3600 * 24 );
    const txt=document.getElementById("txt").value;
    document.cookie ='name='+txt+'; expires=' + expire.toUTCString();
    document.cookie = 'data=123; max-age=5';
}

function GetCookies()
{
    let list=[];
    var r = document.cookie.split(';'); 
    r.forEach(function(value) { 
    //cookie名と値に分ける
        var content = value.split('=');    
        console.log( content[1] );
        list.push( content[1] );
    })
    console.log(list);
    return list;
}


function wrt(){
    const tend=GetCookies()
    //const tend=document.getElementById("txt").value;
    var s=document.getElementById("cok");
    s.innerHTML=tend;
}

//
function notif(){
    Push.create('hello',{
      body:'test message',
      onClick:function(){
        //document.getElementById("c").innerHTML="bye";
        wrt();
        this.close()
          
      }  
    });
}
/*
function write(){
    let gcok= GetCookies();
    let w = document.getElementById("cok");
    w.insertAdjacentHTML('afterend', '<p>' + document.cookie + '</p>');
    //w.innerHTML(cok[0]);
}
*/