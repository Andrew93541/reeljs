class FilterEffects {
    constructor() {
        this.currentFilter = 'normal';
        this.filters = {
            normal: '',
            grayscale: 'grayscale(100%)',
            sepia: 'sepia(100%)',
            vintage: 'sepia(50%) contrast(95%) brightness(95%)',
            brightness: 'brightness(130%)'
        };
    }

    initializeFilters(mediaElement) {
        this.mediaElement = mediaElement;
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.addFilterListeners();
    }

    addFilterListeners() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.applyFilter(filter);
                
                // Update active button
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    applyFilter(filterName) {
        if (this.mediaElement && this.filters[filterName] !== undefined) {
            this.currentFilter = filterName;
            this.mediaElement.style.filter = this.filters[filterName];
        }
    }

    getCurrentFilter() {
        return this.currentFilter;
    }
}