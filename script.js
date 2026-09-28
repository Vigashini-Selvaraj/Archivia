document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && closeMobileMenu && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
        closeMobileMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
    }

    // 2. Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        const lightIcon = themeToggle.querySelector('.light-icon');
        const darkIcon = themeToggle.querySelector('.dark-icon');
        
        // Check local storage
        const savedTheme = localStorage.getItem('archivia-theme') || 'light';
        setTheme(savedTheme, lightIcon, darkIcon);

        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            setTheme(next, lightIcon, darkIcon);
        });
    }

    function setTheme(theme, lightIcon, darkIcon) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('archivia-theme', theme);
        if (theme === 'dark') {
            if(lightIcon) lightIcon.style.display = 'none';
            if(darkIcon) darkIcon.style.display = 'block';
        } else {
            if(lightIcon) lightIcon.style.display = 'block';
            if(darkIcon) darkIcon.style.display = 'none';
        }
    }

    // 3. RTL Toggle
    const rtlToggle = document.getElementById('rtlToggle');
    
    if (rtlToggle) {
        const savedDir = localStorage.getItem('archivia-dir') || 'ltr';
        setDir(savedDir, rtlToggle);

        rtlToggle.addEventListener('click', () => {
            const current = html.getAttribute('dir');
            const next = current === 'ltr' ? 'rtl' : 'ltr';
            setDir(next, rtlToggle);
        });
    }

    function setDir(dir, toggleBtn) {
        html.setAttribute('dir', dir);
        localStorage.setItem('archivia-dir', dir);
        if(toggleBtn.querySelector('.dir-text')) {
            toggleBtn.querySelector('.dir-text').innerText = dir === 'rtl' ? 'RTL' : 'LTR';
        }
    }

    // 4. Hero Book Interaction
    const magicalBookWrapper = document.getElementById('magicalBookWrapper');
    const heroVisual = document.querySelector('.hero-visual');

    if (magicalBookWrapper && heroVisual) {
        // Mouse tracking removed to allow CSS animation to play flawlessly

        // Sync with CSS animation (8s total)
        setInterval(() => {
            // Add 'open' class at 20% (1.6s into the 8s animation)
            setTimeout(() => magicalBookWrapper.classList.add('open'), 1600);
            // Remove 'open' class at 60% (4.8s into the 8s animation)
            setTimeout(() => magicalBookWrapper.classList.remove('open'), 4800);
        }, 8000);
        
        // Initial run to sync immediately
        setTimeout(() => magicalBookWrapper.classList.add('open'), 1600);
        setTimeout(() => magicalBookWrapper.classList.remove('open'), 4800);
    }
});


// Global Modal Functions
window.openTrendingModal = function(title, cat, imgUrl, desc) {
    document.getElementById('tmTitle').innerText = title;
    document.getElementById('tmCat').innerText = cat;
    document.getElementById('tmImg').src = imgUrl;
    document.getElementById('tmDesc').innerText = desc;
    
    let btn = document.getElementById('tmExploreBtn');
    if(btn) {
        btn.onclick = function() {
            window.location.href = `blog-details.html?title=${encodeURIComponent(title)}&cat=${encodeURIComponent(cat)}&img=${encodeURIComponent(imgUrl)}`;
        };
    }
    
    document.getElementById('trendingModal').style.display = 'flex';
};
window.closeTrendingModal = function() {
    document.getElementById('trendingModal').style.display = 'none';
};
window.openShelfModal = function() {
    document.getElementById('shelfModal').style.display = 'flex';
};
window.closeShelfModal = function() {
    document.getElementById('shelfModal').style.display = 'none';
};

// Shelf Book Modal
window.openShelfBookModal = function(title, author, year, genre, catalog, color, coverUrl) {
    document.getElementById('sbmTitle').innerText = title;
    document.getElementById('sbmAuthor').innerText = author;
    document.getElementById('sbmYear').innerText = year;
    document.getElementById('sbmGenre').innerText = genre;
    document.getElementById('sbmCatalog').innerText = catalog;
    document.getElementById('sbmCover').src = coverUrl;
    
    // Update Read Preview button to navigate with query parameters
    const readBtn = document.getElementById('sbmReadBtn');
    if (readBtn) {
        readBtn.href = `book-details.html?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&img=${encodeURIComponent(coverUrl)}`;
    }
    
    // Bookmark button logic
    const bookmarkBtn = document.getElementById('sbmBookmarkBtn');
    if (bookmarkBtn) {
        bookmarkBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> ADD TO BOOKMARKS';
        bookmarkBtn.style.backgroundColor = 'transparent';
        bookmarkBtn.style.color = 'var(--c-primary)';
        bookmarkBtn.onclick = function() {
            this.innerHTML = '<i class="fa-solid fa-bookmark"></i> BOOKMARK ADDED';
            this.style.backgroundColor = 'var(--c-primary)';
            this.style.color = 'var(--c-bg)';
        };
    }
    
    document.getElementById('shelfBookModal').style.display = 'flex';
};
window.closeShelfBookModal = function() {
    document.getElementById('shelfBookModal').style.display = 'none';
};

// Author Accordion
window.toggleAuthor = function(element) {
    const allCards = document.querySelectorAll('.h2-author-accordion .auth-card');
    allCards.forEach(card => {
        card.style.flex = '1';
        card.style.opacity = '0.7';
        card.classList.remove('active');
        const details = card.querySelector('.auth-details');
        if (details) details.style.opacity = '0';
    });
    
    element.style.flex = '4';
    element.style.opacity = '1';
    element.classList.add('active');
    const activeDetails = element.querySelector('.auth-details');
    if (activeDetails) activeDetails.style.opacity = '1';
};
