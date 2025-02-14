class MusicLibrary {
    constructor() {
        this.tracks = [
            {
                id: 1,
                title: "Summer Vibes",
                artist: "Artist 1",
                url: "assets/music/summer-vibes.mp3"
            },
            {
                id: 2,
                title: "Happy Days",
                artist: "Artist 2",
                url: "assets/music/happy-days.mp3"
            },
            // Add more tracks as needed
        ];

        this.initializeLibrary();
    }

    initializeLibrary() {
        this.container = document.getElementById('musicLibrary');
        this.musicList = this.container.querySelector('.music-list');
        this.showLibraryBtn = document.getElementById('showMusicLibrary');
        
        this.renderTracks();
        this.addEventListeners();
    }

    renderTracks() {
        this.musicList.innerHTML = '';
        this.tracks.forEach(track => {
            const trackElement = this.createTrackElement(track);
            this.musicList.appendChild(trackElement);
        });
    }

    createTrackElement(track) {
        const div = document.createElement('div');
        div.className = 'music-track';
        div.innerHTML = `
            <div class="track-info">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
            </div>
            <button class="select-track-btn" data-track-id="${track.id}">
                Select
            </button>
        `;
        return div;
    }

    addEventListeners() {
        this.showLibraryBtn.addEventListener('click', () => {
            this.container.classList.toggle('active');
        });

        this.musicList.addEventListener('click', (e) => {
            if (e.target.classList.contains('select-track-btn')) {
                const trackId = parseInt(e.target.dataset.trackId);
                const track = this.tracks.find(t => t.id === trackId);
                if (track) {
                    this.selectTrack(track);
                }
            }
        });
    }

    selectTrack(track) {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = track.url;
        this.container.classList.remove('active');
    }
}