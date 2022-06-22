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
function notify(){
    Push.create('こんにちは',{
      bpdy:'test message',
      onClick:function(){
          this.close()
          
      }  
    });
}

