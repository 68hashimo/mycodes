function link_getcok(){
    try{
        var data2=location.href.split("=")[1];
        var lu_name=decodeURI(data2);
    }catch(e){
        var lu_name="no name";
    }
    //location.href = "get_cok.html?"+"rid="+lu_name;
    var moji_location="get_cok.html?"+"rid="+lu_name;
    var newWindow = window.open(moji_location, '語句登録', 'top=100,left=100,width=700,height=500');
    if( newWindow ) {
    console.log('正常に開きました');
    }
    else {
    console.log('正常に開けませんでした！');
    newWindow.close();
    }
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
    //location.href = "index.html?"+"rid="+lu_name;
    window.close();
}