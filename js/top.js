function vroll(){
    let ckv="";
    let ftr=document.getElementsByName('rl');
    let len=ftr.length;
    for (let i =0;i<len;i++){
      if(ftr.item(i).checked){
        ckv=ftr.item(i).value;
      }
    }
    return ckv
}

function rname(){
  var rid=document.getElementById("rname").value;
  if(rid.length==0){
    return true
  }
  return rid
}

function joined(){
    //var text = vroll();
    var id1 = rname();
    if(typeof(id1)=="boolean"){
      return alert("no input");
    }
    location.href = "index.html?"+"rid="+encodeURIComponent(id1);
}
//ここまで変更