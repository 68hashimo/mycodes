//クッキーを連想配列として取得
//クッキーの名前をキーとした連想配列で、すべてのクッキーを得られます。

var ls_num = []; 
var div=document.getElementById("div");

function sendcookies(){
    var expire = new Date();
    var flg=true;
    expire.setTime( expire.getTime() + 1000 * 3600 * 24*365 );
    const txt_id=document.getElementById("txt");
    const txt=document.getElementById("txt").value;
    console.log(txt);
    if(txt==""){
        alert("not input");
        return
    }
    var lst=GetCookies();
    var lst_len=lst.length;
    var txt_sp=txt.split(',');
    console.log(txt_sp);
    var cok_num=spl()+1;
    txt_sp.forEach(function(val){
        if(val != "" && dist_s(lst,val)){
            document.cookie ='name'+cok_num+'='+val+'; expires=' + expire.toUTCString();
            cok_num+=1;
        }
    })/*
    if(document.cookie==""){
        if(txt_sp.length>1 && dist(lst,txt_sp,flg) && txt_er(txt,txt_sp)){
            var i = 0;
            for(var n=lst_len;n<(lst_len+txt_sp.length);n++){
                document.cookie ='name'+n+'='+txt_sp[i]+'; expires=' + expire.toUTCString();
                i++;
            }
        }
        else if(txt_sp.length==1 && dist(lst,txt_sp,flg) && txt_er(txt,txt_sp)){
            if(document.cookie==""){
                document.cookie ='name0='+txt+'; expires=' + expire.toUTCString(); 
            }
            else if(lst_len==1){
                document.cookie ='name1='+txt+'; expires=' + expire.toUTCString(); 
            }
            else{
            document.cookie ='name'+(lst_len+1)+'='+txt+'; expires=' + expire.toUTCString();    
            }
        }
        else{
            console.log("no value or Duplicate");
            //document.cookie = 'data=123; max-age=10';
            //return;
        }

    }
    else{
        if(txt_sp.length>1 && dist(lst,txt_sp,flg) && txt_er(txt,txt_sp)){
            var i = 0;
            var l = spl()+1;
            for(var f=lst_len;f<(lst_len+txt_sp.length);f++){
                document.cookie ='name'+l+'='+txt_sp[i]+'; expires=' + expire.toUTCString();
                i++;
                l++;
            }
        }
        else if(txt_sp.length==1 && dist(lst,txt_sp,flg) && txt_er(txt,txt_sp)){
            if(document.cookie==""){
                document.cookie ='name0='+txt+'; expires=' + expire.toUTCString(); 
            }
            else if(lst_len==1 && spl()!=1){
                document.cookie ='name1='+txt+'; expires=' + expire.toUTCString(); 
            }
            else{
            document.cookie ='name'+(spl()+1)+'='+txt+'; expires=' + expire.toUTCString();    
            }
            console.log("length=1")
        }
        else{
            console.log("no value or Duplicate");
            //document.cookie = 'data=123; max-age=10';
            //return;
        }

    }*/
    txt_id.value = '';
    load();
    //console.log("txt_reset")
}

//エラーワード
function txt_er(txt_e,txt_esp){
    if(txt_e==''){
        alert("no value");
        return false;
    }
    for(var er of txt_esp){
        if(er==''){
            alert('input error');
            return false;
        }
    }
    return true;
}

//重複判定
function dist(lst_d,txt_d,flg){
    for(var s=0;s<txt_d.length;s++){
        for(var t =0;t<lst_d.length;t++){
            if(txt_d[s]==lst_d[t]){
                console.log("value exist");
                alert("Duplicate")
                flg=false;
                break;
            }
        }
        if(! flg){
            break;
        }
    }
    return flg;
}
//重複処理ver2
function dist_s(lst,val){
    for(var s=0;s<lst.length;s++){
        if(lst[s]==val){
            console.log("value exist");
            alert("Duplicate");
            return false;
        }
    }
    return true;
}


//cookie取得
function GetCookies()
{
    let list=[];
    var r = document.cookie.split(';'); 
    r.forEach(function(value) { 
    //cookie名と値に分ける
        var content = value.split('=');
        if(content[0]!="autotxt"){
            list.push( content[1] );
        }
        //console.log( content[1] );
    })
    //console.log(list);
    return list;
}


//登録されているワードを返します。
function wrt(){
    const gcok=GetCookies()
    var s=document.getElementById("cok");
    var chk_cok = document.cookie; 
    s.innerHTML="";
    //s.appendChild(br);
    if(chk_cok !=""){
        for(var w = 0;w<gcok.length;w++){
            var idnum = 'idnum'+w;
            var br = document.createElement('br');
            var checkbox = document.createElement('input');
            checkbox.type='checkbox';
            checkbox.className = 'checks';
            checkbox.id = idnum;
            checkbox.value=gcok[w];
            var label = document.createElement('label')
            label.htmlFor = idnum;
            label.textContent = gcok[w];

            s.appendChild(checkbox);
            s.appendChild(label);
            s.appendChild(br);
        }
    /*
    var ck = document.cookie;
    s.innerHTML = ck;
    */
    }else{
        s.innerHTML="登録されている語句はありません"
    }
}

//削除

function del_c(check_ed){
    //const del_id=document.getElementById("del");
    //const del=document.getElementById("del").value;
    //const del=document.getElementById("del").value.split(",");
    //var del_flg=true;
    var del = check_ed;
    const lst_del=GetCookies();
    const del_sp=document.cookie.split(";")
    for(var u =0;u<lst_del.length;u++){
        if(lst_del[u]==del){
            var c_key = del_sp[u].split("=");
            document.cookie = c_key[0]+'='+del+'; max-age=0;'
            var del_keynum = c_key[0].replace("name","");
            var del_keynum=Number(del_keynum);
            var index = ls_num.indexOf(del_keynum);
            ls_num.splice(index,1);
            return;
        }
    }
    //alert("this value isnt existing");
}

//通知
function notif(){
    Push.create('hello',{
      body:'test message',
      onClick:function(){
        //document.getElementById("c").innerHTML="bye";
        load();
        this.close() 
      }  
    });
}


//名前の後についている数値の最大値を返します。
function spl(){
    //const lst_spl=GetCookies();
    const spl_sp=document.cookie.split(";");
    //var sp1 =spl_sp[spl_sp.length-1].split("=");
    for(var sp_cok of spl_sp){
        var sp_name =sp_cok.split("=");
        var sp_num = sp_name[0].replace("name","");
        try{
            sp_num=Number(sp_num);
            ls_num.push(sp_num);
        }catch(e){
            console.log("name isnot number");
        }        
    }
    var vlmax = Math.max(...ls_num);
    console.log(vlmax,ls_num);
    //div.innerHTML=ls_num;
    ls_num=[];
    return vlmax;
}

//チェックボックス取得
function getchecks(){
    var check = document.getElementsByClassName("checks");
    del_flg = false;
    for(var e0=0;e0<check.length;e0++){
        if(check[e0].checked){
            var check_ed =check[e0].value;
            //console.log(check_ed);
            del_c(check_ed);
            del_flg=true;
        }
    }
    if(del_flg){
        alert("deleted")
    }else{
        alert("not selected")
    }
    load();
}


//onload func
function load(){
    wrt()
    var load_cok=GetCookies();
    document.getElementById('cok1').innerHTML=load_cok;
}

window.addEventListener('load',load)