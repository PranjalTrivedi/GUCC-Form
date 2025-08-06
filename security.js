document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // Disable cut, copy, and paste
    document.addEventListener('cut', (event) => event.preventDefault());
    document.addEventListener('copy', (event) => event.preventDefault());
    document.addEventListener('paste', (event) => event.preventDefault());

    // Disable text selection
    document.addEventListener('selectstart', (event) => event.preventDefault());

    // Disable developer tools (desktop and enhanced for macOS/iOS)
    document.onkeydown = function(e) {
        // Check for common developer shortcuts
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            alert("Developer tools are disabled.");
        }
        // Check for macOS/iOS Safari Web Inspector (Option+Command+I)
        if (e.key === 'i' && e.altKey && e.metaKey) { // Option+Command+I
            e.preventDefault();
            alert("Developer tools are disabled.");
        }
    };

    // Disable long press on mobile (including iOS)
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1 || event.touchDuration > 500) { // Approximate long-press detection
            event.preventDefault();
        }
    }, { passive: false });

    // Disable iOS-specific context menu on long press
    document.addEventListener('gesturestart', (event) => {
        event.preventDefault();
    }, { passive: false });

    // Disable form field manipulation (including iOS)
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('contextmenu', (event) => event.preventDefault());
        input.onpaste = (event) => event.preventDefault();
        input.oncopy = (event) => event.preventDefault();
        input.oncut = (event) => event.preventDefault();

        input.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                const touchStartTime = Date.now();
                input.addEventListener('touchend', (e) => {
                    const touchEndTime = Date.now();
                    if (touchEndTime - touchStartTime > 500) {
                        e.preventDefault();
                    }
                }, { once: true });
            }
        }, { passive: false });
    });

    // Detect iOS and apply additional restrictions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        // Prevent pinch-to-zoom without blocking scrolling
        document.addEventListener('touchmove', (event) => {
            if (event.scale && event.scale !== 1) { // Only prevent pinch-to-zoom
                event.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('gesturechange', (event) => {
            event.preventDefault(); // Prevent iOS gesture changes
        }, { passive: false });

        // Additional iOS developer restriction
        // Detect potential Web Inspector connection (basic heuristic)
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            if (arguments[1].includes('__wcwd')) { // Safari Web Inspector flag
                alert("Debugging attempts are blocked.");
                return;
            }
            originalOpen.apply(this, arguments);
        };

        // Periodically check for debugging flags or unexpected behavior
        setInterval(() => {
            if (window.outerWidth === 0 && window.outerHeight === 0) { // Indicator of Web Inspector
                alert("Debugging detected and blocked.");
                location.reload(); // Force reload to disrupt inspection
            }
        }, 1000);

        // Disable shake-to-undo (iOS gesture for undo)
        window.addEventListener('devicemotion', (event) => {
            event.preventDefault();
        }, { passive: false });
    }
});