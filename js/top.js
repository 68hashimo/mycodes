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

function roomid(){
  let rid=document.getElementById("rid").value;
  return rid
}

function joined(){
    var text = vroll();
    var id1 = roomid();
    location.href = "index.html?rl="+encodeURIComponent(text)+"&rid="+encodeURIComponent(id1);
}
//ここまで