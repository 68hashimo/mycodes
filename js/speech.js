const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';
          
const btn = document.getElementById('btn');
const content = document.getElementById('content');
btn.addEventListener('click' , function() {
    // 音声認識をスタート
    console.log("start");
    speech.start();
});
          
//---------------追記---------------//
//音声自動文字起こし機能
  
speech.onresult = function(e) {
    speech.stop();
    if(e.results[0].isFinal){
        var autotext =  e.results[0][0].transcript
        var expire = new Date();
        expire.setTime( expire.getTime() + 1000 * 3600 * 24*365 );
        console.log(e);
        content.innerHTML += '<div>'+ autotext +'</div>';
        speechm(autotext);
        document.cookie = "autotxt="+autotext+'; expires=' + expire.toUTCString();
        ev_click();
    }
}
              
          
speech.onend = () => { 
speech.start() 
};
//--------------------------------//

function start_speech(){
    console.log("start_byfunc");
    speech.start();
}