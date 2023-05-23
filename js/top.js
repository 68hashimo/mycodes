//


//テキストエリアの文字列を次のページに渡す＞今は使っていない
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
  if(length(rid)==0){
    return ture
  }
  return rid
}

function joined(){
    //var text = vroll();
    var id1 = rname();
    if(typeof(id1)=="boolean"){
      return alert("no input");
    }
    location.href = "index.html?rl="+"rid="+encodeURIComponent(id1);
}
//ここまで