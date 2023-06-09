function link_getcok(){
    try{
        var data2=location.href.split("=")[1];
        var lu_name=decodeURI(data2);
    }catch(e){
        var lu_name="no name";
    }
    location.href = "get_cok.html?"+"rid="+lu_name;
}

function link_index(){
    try{
        var data2=location.href.split("=")[1];
        var lu_name=decodeURI(data2);
        if(lu_name=="undefined"){
            lu_name="no_name";
        }
    }catch(e){
        var lu_name="no_name";
    }
    location.href = "index.html?"+"rid="+lu_name;
}