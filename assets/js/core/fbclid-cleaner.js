/**
 * FBCLID URL Parameter Cleaner
 * Tự động trích xuất fbclid vào localStorage và làm sạch URL trên thanh địa chỉ.
 */
(function () {
    'use strict';
    try {
        var url = new URL(window.location.href);
        if (url.searchParams.has('fbclid')) {
            var fbclid = url.searchParams.get('fbclid');
            if (fbclid) {
                try { localStorage.setItem('fbclid', fbclid); } catch (e) {}
            }
            url.searchParams.delete('fbclid');
            var cleanUrl =
                url.pathname +
                (url.searchParams.toString() ? '?' + url.searchParams.toString() : '') +
                url.hash;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    } catch (e) {}
})();
