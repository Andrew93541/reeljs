class ReelsApp {
    constructor() {
        this.reels = [];
        this.selectedMedia = null;
        this.selectedMusic = null;
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        // Modal elements
        this.modal = document.getElementById('createReelModal');
        this.createReelBtn = document.getElementById('createReelBtn');
        this.backBtn = document.querySelector('.back-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        // Media elements
        this.mediaInput = document.getElementById('mediaInput');
        this.previewContainer = document.querySelector('.preview-container');
        
        // Tool buttons
        this.toolButtons = document.querySelectorAll('.tool-btn');
        
        // Music elements
        this.musicInput = document.getElementById('musicInput');
        this.audioPlayer = document.getElementById('audioPlayer');
        this.selectedMusicInfo = document.querySelector('.selected-music-info');
        this.musicControls = document.querySelector('.music-controls');
        this.musicName = document.querySelector('.music-name');
        
        // Container for reels
        this.reelsContainer = document.querySelector('.reels-container');
    }

    addEventListeners() {
        // Modal controls
        this.createReelBtn.addEventListener('click', () => this.openModal());
        this.backBtn.addEventListener('click', () => this.closeModal());
        this.nextBtn.addEventListener('click', () => this.handleNext());
        
        // Tool buttons
        this.toolButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleToolClick(e));
        });
        
        // Media input
        const galleryBtn = document.querySelector('[data-tool="gallery"]');
        galleryBtn.addEventListener('click', () => this.mediaInput.click());
        this.mediaInput.addEventListener('change', (e) => this.handleMediaUpload(e));
        
        // Music input
        const musicBtn = document.querySelector('[data-tool="music"]');
        musicBtn.addEventListener('click', () => this.musicInput.click());
        this.musicInput.addEventListener('change', (e) => this.handleMusicUpload(e));
    }

    handleToolClick(event) {
        const tool = event.currentTarget.dataset.tool;
        this.toolButtons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }

    handleMediaUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedMedia = file;
            this.showPreview(file);
        }
    }

    showPreview(file) {
        while (this.previewContainer.firstChild) {
            this.previewContainer.firstChild.remove();
        }

        const mediaElement = file.type.startsWith('video/') 
            ? document.createElement('video')
            : document.createElement('img');

        mediaElement.className = 'preview-media';
        mediaElement.src = URL.createObjectURL(file);

        if (mediaElement.tagName === 'VIDEO') {
            mediaElement.controls = false;
            mediaElement.loop = true;
            mediaElement.muted = false;
            
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            
            const customControls = document.createElement('div');
            customControls.className = 'custom-controls';
            
            const playBtn = document.createElement('button');
            playBtn.className = 'control-btn play-btn';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            
            const muteBtn = document.createElement('button');
            muteBtn.className = 'control-btn mute-btn';
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const progress = document.createElement('div');
            progress.className = 'progress';
            progressBar.appendChild(progress);

            playBtn.addEventListener('click', () => this.togglePlay(mediaElement, playBtn));
            muteBtn.addEventListener('click', () => this.toggleMute(mediaElement, muteBtn));
            
            mediaElement.addEventListener('timeupdate', () => {
                const percentage = (mediaElement.currentTime / mediaElement.duration) * 100;
                progress.style.width = `${percentage}%`;
            });

            customControls.appendChild(playBtn);
            customControls.appendChild(progressBar);
            customControls.appendChild(muteBtn);
            
            videoContainer.appendChild(mediaElement);
            videoContainer.appendChild(customControls);
            this.previewContainer.appendChild(videoContainer);
        } else {
            this.previewContainer.appendChild(mediaElement);
        }
    }

    handleMusicUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('audio/')) {
                alert('Please select an audio file');
                return;
            }

            this.selectedMusic = file;
            this.musicName.textContent = file.name;
            this.selectedMusicInfo.style.display = 'flex';
            this.musicControls.style.display = 'block';
            
            const audioUrl = URL.createObjectURL(file);
            this.audioPlayer.src = audioUrl;

            const videoElement = this.previewContainer.querySelector('video');
            if (videoElement) {
                videoElement.muted = true;
                const muteBtn = this.previewContainer.querySelector('.mute-btn');
                if (muteBtn) {
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }
        }
    }

    togglePlay(videoElement, playBtn) {
        if (videoElement.paused) {
            videoElement.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoElement.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    toggleMute(videoElement, muteBtn) {
        videoElement.muted = !videoElement.muted;
        muteBtn.innerHTML = videoElement.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    }

    handleNext() {
        if (this.selectedMedia) {
            this.createReel();
        } else {
            alert('Please select a video or photo first');
        }
    }

    createReel() {
        const reel = document.createElement('div');
        reel.className = 'reel';

        const content = document.createElement('div');
        content.className = 'reel-content';

        const mediaElement = this.selectedMedia.type.startsWith('video/') 
            ? document.createElement('video')
            : document.createElement('img');
        
        mediaElement.className = 'reel-media';
        mediaElement.src = URL.createObjectURL(this.selectedMedia);

        if (mediaElement.tagName === 'VIDEO') {
            mediaElement.controls = false;
            mediaElement.loop = true;
            
            if (this.selectedMusic) {
                mediaElement.muted = true;
            }

            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            
            const customControls = document.createElement('div');
            customControls.className = 'custom-controls';
            
            const playBtn = document.createElement('button');
            playBtn.className = 'control-btn play-btn';
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            
            const muteBtn = document.createElement('button');
            muteBtn.className = 'control-btn mute-btn';
            muteBtn.innerHTML = this.selectedMusic ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const progress = document.createElement('div');
            progress.className = 'progress';
            progressBar.appendChild(progress);

            playBtn.addEventListener('click', () => this.togglePlay(mediaElement, playBtn));
            muteBtn.addEventListener('click', () => this.toggleMute(mediaElement, muteBtn));
            
            mediaElement.addEventListener('timeupdate', () => {
                const percentage = (mediaElement.currentTime / mediaElement.duration) * 100;
                progress.style.width = `${percentage}%`;
            });

            customControls.appendChild(playBtn);
            customControls.appendChild(progressBar);
            customControls.appendChild(muteBtn);
            
            videoContainer.appendChild(mediaElement);
            videoContainer.appendChild(customControls);
            content.appendChild(videoContainer);

            if (this.selectedMusic) {
                const audio = document.createElement('audio');
                audio.src = URL.createObjectURL(this.selectedMusic);
                audio.style.display = 'none';
                content.appendChild(audio);

                mediaElement.addEventListener('play', () => audio.play());
                mediaElement.addEventListener('pause', () => audio.pause());
                mediaElement.addEventListener('ended', () => {
                    audio.pause();
                    audio.currentTime = 0;
                });
            }
        } else {
            content.appendChild(mediaElement);
        }

        reel.appendChild(content);
        
        const interactions = this.createInteractionsSection();
        reel.appendChild(interactions);

        this.reelsContainer.prepend(reel);
        this.closeModal();
    }

    createInteractionsSection() {
        const interactions = document.createElement('div');
        interactions.className = 'reel-interactions';
        
        interactions.innerHTML = `
            <div class="interaction-buttons">
                <button class="interaction-btn like-btn">
                    <i class="far fa-heart"></i>
                </button>
                <button class="interaction-btn comment-btn">
                    <i class="far fa-comment"></i>
                </button>
                <button class="interaction-btn share-btn">
                    <i class="far fa-paper-plane"></i>
                </button>
            </div>
            <div class="comments-section">
                <div class="comment-input">
                    <input type="text" placeholder="Add a comment...">
                    <button>Post</button>
                </div>
            </div>
        `;

        const likeBtn = interactions.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => this.toggleLike(likeBtn));

        const commentInput = interactions.querySelector('.comment-input');
        const input = commentInput.querySelector('input');
        const postBtn = commentInput.querySelector('button');
        postBtn.addEventListener('click', () => this.addComment(interactions.querySelector('.comments-section'), input));

        return interactions;
    }

    toggleLike(button) {
        const icon = button.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.style.color = icon.classList.contains('fas') ? '#ff0040' : '';
    }

    addComment(commentSection, input) {
        if (input.value.trim()) {
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.textContent = input.value;
            commentSection.insertBefore(comment, commentSection.lastElementChild);
            input.value = '';
        }
    }

    openModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.resetModal();
    }

    resetModal() {
        this.mediaInput.value = '';
        this.musicInput.value = '';
        this.selectedMedia = null;
        this.selectedMusic = null;
        this.previewContainer.innerHTML = `
            <p class="preview-placeholder">
                <i class="fas fa-photo-video"></i>
                <span>Select photos and videos here</span>
            </p>
        `;
        this.selectedMusicInfo.style.display = 'none';
        this.musicControls.style.display = 'none';
        this.audioPlayer.src = '';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const reelsApp = new ReelsApp();
});