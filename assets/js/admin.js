document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabLinks = document.querySelectorAll('.menu li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all tabs
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // File uploads preview
    setupFileUpload('profile-image', 'preview-profile', 'upload-profile-btn');
    setupFileUpload('background-video', 'preview-video', 'upload-video-btn', true);
    setupFileUpload('background-music', 'preview-audio', 'upload-audio-btn', false, true);
    setupFileUpload('cursor-style', 'preview-cursor', 'upload-cursor-btn');
    
    // Opacity range slider
    const opacitySlider = document.getElementById('terminal-opacity');
    const opacityValue = document.getElementById('opacity-value');
    
    opacitySlider.addEventListener('input', function() {
        opacityValue.textContent = this.value;
    });
    
    // Save buttons functionality
    document.getElementById('save-profile').addEventListener('click', saveProfile);
    document.getElementById('save-media').addEventListener('click', saveMedia);
    document.getElementById('save-appearance').addEventListener('click', saveAppearance);
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    
    // Load existing settings
    loadSettings();
});

// Function to handle file upload and preview
function setupFileUpload(inputId, previewId, buttonId, isVideo = false, isAudio = false) {
    const fileInput = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const uploadBtn = document.getElementById(buttonId);
    
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                if (isVideo) {
                    preview.src = e.target.result;
                    if (preview.querySelector('source')) {
                        preview.querySelector('source').src = e.target.result;
                    }
                    preview.load();
                } else if (isAudio) {
                    if (preview.querySelector('source')) {
                        preview.querySelector('source').src = e.target.result;
                    }
                    preview.load();
                } else {
                    preview.src = e.target.result;
                }
            }
            
            reader.readAsDataURL(file);
        }
    });
}

// Save functions for each settings section
function saveProfile() {
    const username = document.getElementById('username').value;
    const profileImage = document.getElementById('preview-profile').src;
    
    localStorage.setItem('username', username);
    localStorage.setItem('profileImage', profileImage);
    
    // Update admin panel
    document.getElementById('current-username').textContent = username;
    document.getElementById('admin-profile-pic').src = profileImage;
    
    showNotification('Profile settings saved!');
}

function saveMedia() {
    const video = document.getElementById('preview-video');
    const audio = document.getElementById('preview-audio');
    
    let videoSrc = '';
    if (video.querySelector('source')) {
        videoSrc = video.querySelector('source').src;
    } else {
        videoSrc = video.src;
    }
    
    let audioSrc = '';
    if (audio.querySelector('source')) {
        audioSrc = audio.querySelector('source').src;
    } else {
        audioSrc = audio.src;
    }
    
    localStorage.setItem('backgroundVideo', videoSrc);
    localStorage.setItem('backgroundMusic', audioSrc);
    
    showNotification('Media settings saved!');
}

function saveAppearance() {
    const terminalColor = document.getElementById('terminal-color').value;
    const terminalBgColor = document.getElementById('terminal-bg-color').value;
    const terminalOpacity = document.getElementById('terminal-opacity').value;
    const cursorStyle = document.getElementById('preview-cursor').src;
    
    localStorage.setItem('terminalColor', terminalColor);
    localStorage.setItem('terminalBgColor', terminalBgColor);
    localStorage.setItem('terminalOpacity', terminalOpacity);
    localStorage.setItem('cursorStyle', cursorStyle);
    
    showNotification('Appearance settings saved!');
}

function saveSettings() {
    const terminalText = document.getElementById('terminal-text').value;
    
    localStorage.setItem('terminalText', terminalText);
    
    showNotification('General settings saved!');
}

// Load settings from localStorage
function loadSettings() {
    // Profile settings
    if (localStorage.getItem('username')) {
        document.getElementById('username').value = localStorage.getItem('username');
        document.getElementById('current-username').textContent = localStorage.getItem('username');
    }
    
    if (localStorage.getItem('discordId')) {
        document.getElementById('discord-id').value = localStorage.getItem('discordId');
    }
    
    if (localStorage.getItem('profileImage')) {
        document.getElementById('preview-profile').src = localStorage.getItem('profileImage');
        document.getElementById('admin-profile-pic').src = localStorage.getItem('profileImage');
    }
    
    // Media settings
    if (localStorage.getItem('backgroundVideo')) {
        const video = document.getElementById('preview-video');
        if (video.querySelector('source')) {
            video.querySelector('source').src = localStorage.getItem('backgroundVideo');
        } else {
            video.src = localStorage.getItem('backgroundVideo');
        }
        video.load();
    }
    
    if (localStorage.getItem('backgroundMusic')) {
        const audio = document.getElementById('preview-audio');
        if (audio.querySelector('source')) {
            audio.querySelector('source').src = localStorage.getItem('backgroundMusic');
        } else {
            audio.src = localStorage.getItem('backgroundMusic');
        }
        audio.load();
    }
    
    // Appearance settings
    if (localStorage.getItem('terminalColor')) {
        document.getElementById('terminal-color').value = localStorage.getItem('terminalColor');
    }
    
    if (localStorage.getItem('terminalBgColor')) {
        document.getElementById('terminal-bg-color').value = localStorage.getItem('terminalBgColor');
    }
    
    if (localStorage.getItem('terminalOpacity')) {
        document.getElementById('terminal-opacity').value = localStorage.getItem('terminalOpacity');
        document.getElementById('opacity-value').textContent = localStorage.getItem('terminalOpacity');
    }
    
    if (localStorage.getItem('cursorStyle')) {
        document.getElementById('preview-cursor').src = localStorage.getItem('cursorStyle');
    }
    
    // General settings
    if (localStorage.getItem('terminalText')) {
        document.getElementById('terminal-text').value = localStorage.getItem('terminalText');
    }
}

// Show notification
function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        // Create notification container
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '9999';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = '#00b894';
    notification.style.color = 'white';
    notification.style.padding = '12px 24px';
    notification.style.borderRadius = '4px';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    notification.style.animation = 'slideIn 0.3s forwards';
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Add to DOM
    notificationContainer.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}
