(function () {
    // =========================
    // CONFIG
    // =========================
    var TRACK_URL = 'https://data-track-lamongame.phanminhtien070302.workers.dev/track';
    var TELEGRAM_URL = 'https://lamongamebot.phanminhtien070302.workers.dev';

    // =========================
    // SESSION ID
    // =========================
    var sessionId = localStorage.getItem('lg_session');
    if (!sessionId) {
        sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        localStorage.setItem('lg_session', sessionId);
    }

    // =========================
    // HELPERS
    // =========================
    function extractText(el, maxLen) {
        if (!el) return '';
        maxLen = maxLen || 60;
        var t = (el.innerText || el.textContent || '') + '';
        t = t.trim();
        if (t) return t.slice(0, maxLen);

        t = el.getAttribute && (el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('alt') || el.value || '');
        if (t) return ('' + t).trim().slice(0, maxLen);

        try {
            var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
                acceptNode: function (node) {
                    return node.nodeValue && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            });
            var parts = [];
            while (walker.nextNode()) {
                parts.push(walker.currentNode.nodeValue.trim());
                if (parts.join(' ').length >= maxLen) break;
            }
            if (parts.length) return parts.join(' ').slice(0, maxLen);
        } catch (e) {}

        return '';
    }

    function sendTrack(event, data) {
        var payload = Object.assign({
            event: event,
            sessionId: sessionId,
            page: location.href,
            ua: navigator.userAgent,
            time: new Date().toISOString()
        }, data || {});

        var body = JSON.stringify(payload);

        // sendBeacon for click events (delivery before navigation)
        try {
            if (event === 'click' && navigator && navigator.sendBeacon) {
                var ok = navigator.sendBeacon(TRACK_URL, body);
                if (ok) return;
            }
        } catch (e) {}

        fetch(TRACK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: body
        }).catch(function () {});
    }

    function sendTelegram() {
        var params = new URLSearchParams(window.location.search);
        fetch(TELEGRAM_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: window.location.href,
                title: document.title,
                referrer: document.referrer,
                utm_source: params.get('utm_source'),
                utm_medium: params.get('utm_medium'),
                utm_campaign: params.get('utm_campaign'),
                userAgent: navigator.userAgent,
                time: new Date().toLocaleString()
            })
        }).catch(function () {});
    }

    // =========================
    // TRACK: Page view
    // =========================
    sendTrack('pageview', {});

    // =========================
    // TRACK: Telegram notification
    // =========================
    sendTelegram();

    // =========================
    // TRACK: Click (delegation)
    // =========================
    document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-track]');
        if (!el) return;

        var trackValue = el.getAttribute('data-track');
        var text = extractText(el, 60);

        sendTrack('click', {
            data: trackValue,
            text: text
        });
    });
})();
