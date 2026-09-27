document.addEventListener('DOMContentLoaded', () => {

    // Hero Book Interactive tracking
    const heroBook = document.getElementById('heroInteractiveBook');
    if (heroBook) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroBook.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // Interactive Desk Tooltips (Reading Room)
    const deskObjs = document.querySelectorAll('.d-obj');
    const deskTooltip = document.getElementById('deskTooltip');
    const deskEnv = document.querySelector('.h2-desk-env');

    if (deskEnv) {
        deskObjs.forEach(obj => {
            obj.addEventListener('mousemove', (e) => {
                const rect = deskEnv.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                deskTooltip.textContent = obj.getAttribute('data-tooltip');
                deskTooltip.style.opacity = '1';
                deskTooltip.style.transform = 'translateY(0)';
                deskTooltip.style.left = (x + 20) + 'px';
                deskTooltip.style.top = (y - 30) + 'px';
            });

            obj.addEventListener('mouseleave', () => {
                deskTooltip.style.opacity = '0';
                deskTooltip.style.transform = 'translateY(10px)';
            });
        });
    }
});

// Subject Image Switcher
window.changeSubjectImg = function(subject, element) {
    const items = document.querySelectorAll('.subject-item');
    items.forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    const visual = document.getElementById('subjectVisual');
    const img = document.getElementById('subjectHeroImg');
    
    visual.classList.add('updating');
    
    setTimeout(() => {
        if(subject === 'tech') {
            img.src = 'assets/subject_tech_1790272887118.jpg';
        } else if(subject === 'science') {
            img.src = 'assets/subject_science_1790272898676.jpg';
        } else if(subject === 'education') {
            img.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';
        } else if(subject === 'history') {
            img.src = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80';
        }
        visual.classList.remove('updating');
    }, 300);
}

// Author Accordion Toggle
window.toggleAuthor = function(element) {
    const cards = document.querySelectorAll('.auth-card');
    cards.forEach(c => c.classList.remove('active'));
    element.classList.add('active');
}

// Archive Explorer (Lens) Switching
window.switchArchive = function(type, no, year, cat) {
    const tabs = document.querySelectorAll('.ex-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    const lens = document.getElementById('exLens');
    lens.classList.add('fading');
    
    setTimeout(() => {
        document.getElementById('exType').textContent = type;
        document.getElementById('exNo').textContent = 'NO. ' + no;
        document.getElementById('exYear').textContent = year;
        document.getElementById('exCat').textContent = cat;
        
        lens.classList.remove('fading');
    }, 400);
}

// Reading Journey Flow Animation
window.activateJourney = function(stepIndex) {
    const steps = document.querySelectorAll('.j-step');
    const lines = document.querySelectorAll('.j-line');
    
    // Reset all
    steps.forEach(s => { s.classList.remove('active'); s.classList.remove('completed'); });
    lines.forEach(l => l.classList.remove('active'));
    
    for(let i=0; i < stepIndex; i++) {
        if (i < stepIndex - 1) {
            steps[i].classList.add('completed');
            if (lines[i]) lines[i].classList.add('active');
        } else {
            steps[i].classList.add('active');
        }
    }
}

// Reading Table Book Modal
window.openH2BookModal = function(title, author, year, genre, status, img) {
    document.getElementById('h2BmTitle').textContent = title;
    document.getElementById('h2BmAuthor').textContent = "By " + author;
    document.getElementById('h2BmYear').textContent = "Published: " + year;
    document.getElementById('h2BmGenre').textContent = genre.toUpperCase();
    document.getElementById('h2BmStatus').textContent = status.toUpperCase();
    document.getElementById('h2BmImg').src = img;
    
    // Update Read Now button to navigate with query parameters
    const readBtn = document.getElementById('h2BmReadBtn');
    if (readBtn) {
        readBtn.href = `book-details.html?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&img=${encodeURIComponent(img)}`;
    }
    
    document.getElementById('h2BookModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeH2BookModal = function() {
    document.getElementById('h2BookModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Coffee Modal
window.openCoffeeModal = function() {
    document.getElementById('coffeeModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
window.closeCoffeeModal = function() {
    document.getElementById('coffeeModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Collection Modal
window.openCollectionModal = function() {
    document.getElementById('collectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
window.closeCollectionModal = function() {
    document.getElementById('collectionModal').classList.remove('active');
    document.body.style.overflow = '';
}

// News Modal (Home 2)
window.openNewsModalH2 = function() {
    document.getElementById('h2NewsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
window.closeH2NewsModal = function() {
    document.getElementById('h2NewsModal').classList.remove('active');
    document.body.style.overflow = '';
}
