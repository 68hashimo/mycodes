const Peer = window.Peer;

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

  meta.innerText = `
    UA: ${navigator.userAgent}
    SDK: ${sdkSrc ? sdkSrc.src : 'unknown'}
  `.trim();

  const getRoomModeByHash = () => (location.hash === '#sfu' ? 'sfu' : 'mesh');

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



  //カメラのoff機能
  const cameraoff = document.getElementById("camera-button");
    cameraoff.addEventListener('click',  onMutecamera);
      function onMutecamera(){
        localStream.getVideoTracks().forEach(track => track.enabled = false);
      }
  //ここまで

  //カメラon機能
  const cameraon = document.getElementById("camera-on");
    cameraon.addEventListener('click',  function (){
        localStream.getVideoTracks().forEach(track => track.enabled = true);
      });
  //ここまで

  //マイクミュート機能
  const micmute = document.getElementById("mic-mute");
    micmute.addEventListener('click', onMutemic);
      function onMutemic(){
        localStream.getAudioTracks().forEach(track => track.enabled = false);
      }
  //ここまで

  //マイクミュート解除機能
  const micon = document.getElementById("mic-on");
    micon.addEventListener('click', function(){
      localStream.getAudioTracks().forEach(track => track.enabled = true);
    });
  //ここまで

  

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

    const room = peer.joinRoom(roomId.value, {
      mode: getRoomModeByHash(),
      stream: localStream,
    });

    room.once('open', () => {
      messages.textContent += '=== 参加しました ===\n';
    });
    room.on('peerJoin', peerId => {
      messages.textContent += `=== test ===\n`;
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
      notify();
    });

    room.on('data', ({ data, src }) => {
      // Show a message sent to the room and who sent
      messages.textContent += `${"1"}: ${cut(data)}\n`;
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
    });

    sendTrigger.addEventListener('click', onClickSend);
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });

    function onClickSend() {
      // Send message to all of the peers in the room via websocket
      room.send(localText.value);

      messages.textContent += `${"2"}: ${cut(localText.value)}\n`;
      localText.value = '';
      let target = document.getElementById('js-messages');
      target.scrollTo(0,target.scrollHeight);
    }
  });

  peer.on('error', console.error);
})();