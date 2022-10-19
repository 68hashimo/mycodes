function date(){
    var expire = new Date();
    expire.setTime( expire.getTime() + 1000 * 3600 * 24 );
    //document.cookie = 'data=123; expires=' + expire.toUTCString();
}

//クッキーを連想配列として取得
//クッキーの名前をキーとした連想配列で、すべてのクッキーを得られます。

function sendcookies(){
    const cki=document.cookie;
    const txt=document.getElementById("txt");
    date();
    document.cookie ='data=123;'
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

function write(){
    let gcok= GetCookies();
    let w = document.getElementById("cok");
    w.insertAdjacentHTML('afterend', '<p>' + document.cookie + '</p>');
    //w.innerHTML(cok[0]);
}