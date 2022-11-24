function GCookies()
{
    console.log("gcookie");
    let list=[];
    var r = document.cookie.split(';'); 
    r.forEach(function(value) { 
        var content = value.split('=');    
        list.push( content[1] );
    })
    return list;
}



function speechm(te){
    //content.innerHTML += "test"
    //const ls=["こんにちは","おはよう","漢字"];
    var ls=GCookies()
    console.log(ls,te);
    if(ls==""){
        return;
    }
    for(let i=0;(i<ls.length);i++){
        for(let m=0;(te.length)>=ls[i].length+m;m++){
            if(te.length<ls[i]){
                break
            }
            let c = te.slice(m,(ls[i].length+m));
            if(c==ls[i]){
                notify();
                break
            }
        }
    }
    //content.innerHTML += ls;
}