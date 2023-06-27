const Peer = window.Peer;
flg=false;
at=false;
(async function main() {
  const localVideo = document.getElementById('js-local-stream');
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const roomMode = document.getElementById('js-room-mode');
  const localText = document.getElementById('js-local-text');
  const sendTrigger = document.getElementById('js-send-trigger');
  const messages = document.getElementById('js-messages');
  const meta = document.getElementById('js-meta');
  const sdkSrc = document.querySelector('script[src*=skyway]');
  const evc = document.getElementById('event');
  //const atxt = document.getElementById('atxt');
  const roommoji = document.getElementById('menu_roommoji');
  const mymoji=document.getElementById("menu_mymoji");

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();
  
  const getRoomModeByHash = () => (location.hash === '#sfu' ? 'sfu' : 'mesh');
  var expire = new Date();

  roomMode.textContent = getRoomModeByHash();
  window.addEventListener(
    'hashchange',
    () => (roomMode.textContent = getRoomModeByHash())
  );

  const localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(console.error);

  /*
    async function min() {
      // 表示用のCanvas
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      // 画像処理用のオフスクリーンCanvas
      const offscreen = document.createElement("canvas");
      const offscreenCtx = offscreen.getContext("2d");
      // カメラから映像を取得するためのvideo要素
      const video = document.createElement("video");
    
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
    
      video.srcObject = stream;
      // streamの読み込み完了
      video.onloadedmetadata = () => {
        video.play();
    
        // Canvasのサイズを映像に合わせる
        canvas.width = offscreen.width = video.videoWidth;
        canvas.height = offscreen.height = video.videoHeight;
    
        tick();
      };
    
    
      // 1フレームごとに呼び出される処理
      function tick() {
        // カメラの映像をCanvasに描画する
        filter();
    
    
        // イメージデータを取得する（[r,g,b,a,r,g,b,a,...]のように1次元配列で取得できる）
        const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
        // imageData.dataはreadonlyなのでfilterメソッドで直接書き換える
        filter(imageData.data);
    
        // オフスクリーンCanvasを更新する
        offscreenCtx.putImageData(imageData, 0, 0);
    
        // 表示用Canvasに描画する
        ctx.drawImage(offscreen, 0, 0);
    
        // 次フレームを処理する
        window.requestAnimationFrame(tick);
      }
    
      function filter(data) {
        // 画像処理を行う
        offscreenCtx.translate( 640, 0 );
        offscreenCtx.scale( -1, 1 );
        offscreenCtx.drawImage(video, 0, 0);
      }
    
      
    }

  min();
  */


  function toggleCamera() {
    const videoTracks = localStream.getVideoTracks();
    const cameraButton = document.getElementById("camera-button");
    const cameraImage = document.querySelector("#camera-button img");
  
    if (videoTracks.length > 0 && videoTracks[0].enabled) {
      videoTracks.forEach(ctrack => ctrack.enabled = false);
      cameraImage.src = "img/Ban.png";
    } else {
      videoTracks.forEach(ctrack => ctrack.enabled = true);
      cameraImage.src = "img/camera.png";
    }
  }
  
  const cameraButton = document.getElementById("camera-button");
  cameraButton.addEventListener('click', toggleCamera);


  function toggleMic() {
    const audioTracks = localStream.getAudioTracks();
    const micButton = document.getElementById("mic-button");
    const micImage = document.querySelector("#mic-button img");
  
    if (audioTracks.length > 0 && audioTracks[0].enabled) {
      audioTracks.forEach(mtrack => mtrack.enabled = false);
      micImage.src = "img/muted.png";
      f_mute()
    } else {
      audioTracks.forEach(mtrack => mtrack.enabled = true);
      micImage.src = "img/mic.png";
      f_mute()
    }
  }
  
  const micButton = document.getElementById("mic-button");
  micButton.addEventListener('click', toggleMic);

  

  // Render local stream
  localVideo.muted = true;
  localVideo.srcObject = localStream;
  localVideo.playsInline = true;
  await localVideo.play().catch(console.error);

  // eslint-disable-next-line require-atomic-updates
  const peer = (window.peer = new Peer({
    key: 'f810ebbb-3b29-4ebc-ae3c-d58c967be2e3',
    debug: 3,
  }));

  // Register join handler
  joinTrigger.addEventListener('click', () => {
    // Note that you need to ensure the peer has connected to signaling server
    // before using methods of peer instance.
    if (!peer.open) {
      return;
    }
    
    //ここif_12/14
    if(flg){
      return;
    }
    flg=true;
    
    var check_type=Object.prototype.toString;

    const room = peer.joinRoom("roomId", {
      //roomId.valueが元値
      mode: getRoomModeByHash(),
      stream: localStream,
    });

    room.once('open', () => {
      messages.textContent += '=== 参加しました ===\n';
    });
    room.on('peerJoin', peerId => {
      messages.textContent += `=== 参加しました! ===\n`;
      console.log("ピアIDは:"+peerId);
    });

    // Render remote stream for new peer join in the room
    room.on('stream', async stream => {
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      // mark peerId to find it later at peerLeave event
      newVideo.setAttribute('data-peer-id', stream.peerId);
      remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);
      notify(0,"ルームに参加");
      //if (user != 'customer'){notify();}
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent　部屋に送られたメッセージと送信者を表示する
      if(typeof(data)=="object"){
        console.log(atxt);
        roommoji.innerHTML += '<div>'+ String(data.msg) +'</div>';
        speechm(String(data.msg));
        return
      }
      var user = data.split(":");
      messages.textContent += `${user[0]}: ${cut(user[1])}\n`;
      console.log(data);
      let target = document.getElementById('js-messages');
      target.scrollTo(0,target.scrollHeight);
    });

    // for closing room members
    room.on('peerLeave', peerId => {
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id="${peerId}"]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();

      messages.textContent += `=== ${"2"}退出しました ===\n`;
      messages.textContent = null;
      roommoji.innerHTML="ルームの文字起こし";
      mymoji.innerHTML="あなたの文字起こし";
    });
    // for closing myself
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      messages.textContent += '== 退出しました ===\n';
      messages.textContent = null;
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
      location.href="top.html"
    });

    //--dataConnection-
    /*
    const conn = peer.connect(peerId);
    conn.on("data",(data)=>{
        console.log(data);
    });
    conn.send(nw_data);
    */

    evc.addEventListener('click',clg);
    sendTrigger.addEventListener('click', onClickSend);
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });


    function onClickSend() {
      // Send message to all of the peers in the room via websocket WebSocket経由でルーム内のすべてのピアにメッセージを送信する
      //ここif_12/14
      if(localText.value==""){
        alert("No input");
        return;
      }
      var s_msg=userm()+":"+localText.value;/*`${userm()}:${localText.value}`;*/
      room.send(s_msg);
      messages.textContent += `${userm()}: ${cut(localText.value)}\n`;
      localText.value = '';
      let target = document.getElementById('js-messages');
      target.scrollTo(0,target.scrollHeight);
    }

    function clg(){
      var automsg=autotxtcookie();
      var autotxt = {pn:"mojiokoshi",msg:userm()+';'+automsg};
      room.send(autotxt)
    }

  });
  peer.on('error', console.error);
})();