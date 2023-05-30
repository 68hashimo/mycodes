// カメラのオン/オフ機能
const cameraoff = document.getElementById("camera-button");
cameraoff.addEventListener('click', onToggleCamera);

function onToggleCamera() {
  const videoTracks = localStream.getVideoTracks();
  const cimage = document.getElementById("cameraImage");

  if (videoTracks.length > 0 && videoTracks[0].enabled) {
    videoTracks.forEach(track => track.enabled = false);
    cimage.src = "img/Ban.png";
  } else {
    videoTracks.forEach(track => track.enabled = true);
    cimage.src = "img/camera.png";
  }
}

// マイクのミュート/ミュート解除機能
const micmute = document.getElementById("mic-mute");
micmute.addEventListener('click', onToggleMic);

function onToggleMic() {
  const audioTracks = localStream.getAudioTracks();
  const mimage = document.getElementById("micImage");

  if (audioTracks.length > 0 && audioTracks[0].enabled) {
    audioTracks.forEach(track => track.enabled = false);
    mimage.src = "img/muted.png";
  } else {
    audioTracks.forEach(track => track.enabled = true);
    mimage.src = "img/mic.png";
  }
}

function toggleStar() {
  var starImage = document.getElementById('starImage');
  var originalSrc = starImage.src;
  var staredSrc = 'icon/stared.png';
  var starImage = document.getElementById('starImage');
  var notification = document.createElement('div');

  starImage.src = staredSrc;

  // 1000ミリ秒後に元の画像に戻す
  setTimeout(function() {
    starImage.src = originalSrc;
  }, 1000);

  notification.className = 'notification';
  notification.textContent = '押しました！';
  document.body.appendChild(notification);

  // クリックエフェクト
  starImage.classList.add('clicked');

  // 通知メッセージの表示
  notification.style.display = 'block';

  // 2秒後にエフェクトと通知を元に戻す
  setTimeout(function() {
    starImage.classList.remove('clicked');
    notification.style.display = 'none';
  }, 1000);

}

