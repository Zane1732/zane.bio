document.addEventListener('DOMContentLoaded', function() {
  // Load profile picture from localStorage if available
  const savedProfileImage = localStorage.getItem('profileImage');
  if (savedProfileImage) {
      document.getElementById('profile-picture').src = savedProfileImage;
  }
  // Get references to DOM elements
  var videoBackground = document.getElementById('myVideo');
  var audioBackground = document.getElementById('myAudio');
  var blurredBox = document.getElementById('blurred-box');
  var profilePicture = document.getElementById('profile-picture');
  var usernameElement = document.getElementById('username');

  // Function to convert hex color to rgba
  function hexToRGBA(hex, opacity) {
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Apply custom profile image if available
  if (localStorage.getItem('profileImage')) {
    profilePicture.src = localStorage.getItem('profileImage');
  }

  // Apply custom username if available
  if (localStorage.getItem('username') && usernameElement) {
    usernameElement.textContent = localStorage.getItem('username');
  }

  // Apply custom media if available
  if (localStorage.getItem('backgroundVideo') && videoBackground.querySelector('source')) {
    videoBackground.querySelector('source').src = localStorage.getItem('backgroundVideo');
    videoBackground.load();
  }

  if (localStorage.getItem('backgroundMusic') && audioBackground.querySelector('source')) {
    audioBackground.querySelector('source').src = localStorage.getItem('backgroundMusic');
    audioBackground.load();
  }

  // Apply custom cursor if available
  if (localStorage.getItem('cursorStyle')) {
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      .custom-cursor {
        cursor: url('${localStorage.getItem('cursorStyle')}'), auto;
      }
    `;
    document.head.appendChild(cursorStyle);
  }

  // Show content immediately
  blurredBox.style.display = 'block';
  videoBackground.play();
  audioBackground.play();

  // Function to limit volume
  function limitVolume(volume) {
    return Math.min(1, Math.max(0, volume));
  }

  // Set initial volume
  audioBackground.volume = limitVolume(0.3); // 30% volume to start
});
