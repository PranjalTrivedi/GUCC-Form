document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click on all devices
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // Disable developer tools (Windows and macOS/iOS)
    document.onkeydown = function(e) {
        // Block common developer shortcuts (Windows: F12, Ctrl+Shift+I, Ctrl+U)
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            alert("Developer tools are disabled.");
        }
        // Block macOS/iOS Safari Web Inspector (Option+Command+I)
        if (e.key === 'i' && e.altKey && e.metaKey) {
            e.preventDefault();
            alert("Developer tools are disabled.");
        }
    };

    // Disable long-press context menus on mobile
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length === 1) {
            const touchStartTime = Date.now();
            document.addEventListener('touchend', (e) => {
                const touchEndTime = Date.now();
                if (touchEndTime - touchStartTime > 500) { // 500ms threshold for long press
                    e.preventDefault();
                }
            }, { once: true, passive: false });
        }
    }, { passive: false });

    // Disable form field context menus (including mobile long-press)
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('contextmenu', (event) => event.preventDefault());
        input.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                const touchStartTime = Date.now();
                input.addEventListener('touchend', (e) => {
                    const touchEndTime = Date.now();
                    if (touchEndTime - touchStartTime > 500) {
                        e.preventDefault();
                    }
                }, { once: true, passive: false });
            }
        }, { passive: false });
    });
});