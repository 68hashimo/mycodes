function toggleMic() {
    var mimage = document.getElementById("micImage");
    if (mimage.src.endsWith("icon/mic.png")) {
      mimage.src = "icon/muted.png";
    } else {
      mimage.src = "icon/mic.png";
    }
}

function toggleCamera() {
  var cimage = document.getElementById("cameraImage");
  if (cimage.src.endsWith("icon/camera.png")) {
    cimage.src = "icon/Ban.png";
  } else {
    cimage.src = "icon/camera.png";
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

