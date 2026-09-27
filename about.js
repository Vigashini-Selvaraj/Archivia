
document.addEventListener('DOMContentLoaded', () => {

    // Timeline Line Scroll Animation
    const tLine = document.querySelector('.timeline-line');
    const tPoints = document.querySelectorAll('.timeline-point');

    window.addEventListener('scroll', () => {
        const vh = window.innerHeight;

        if(tLine) {
            const tRect = document.querySelector('.timeline-grand').getBoundingClientRect();
            if(tRect.top < vh * 0.8) {
                tPoints.forEach((p, i) => {
                    const pRect = p.getBoundingClientRect();
                    if(pRect.top < vh * 0.85) {
                        p.classList.add('visible');
                    }
                });
            }
        }
    });
    
    // Dynamic height for timeline line
    if(tLine) {
        window.addEventListener('scroll', () => {
            const container = document.querySelector('.timeline-grand');
            const rect = container.getBoundingClientRect();
            const vh = window.innerHeight;
            if(rect.top < vh) {
                const scrolledIntoContainer = vh - rect.top;
                const pct = Math.min(100, Math.max(0, (scrolledIntoContainer / rect.height) * 100));
                document.documentElement.style.setProperty('--t-line-h', pct + '%');
            }
        });
        const style = document.createElement('style');
        style.innerHTML = `.timeline-line::after { height: var(--t-line-h, 0%); }`;
        document.head.appendChild(style);
    }
});
