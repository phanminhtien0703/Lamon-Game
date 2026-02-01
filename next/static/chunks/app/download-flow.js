/* download-flow.js - Phương án 1: mở Messenger tab mới + redirect current tab */
(function(){
  /* =========== Config =========== */
  const FB_PAGE = 'YOUR_PAGE_USERNAME'; // <-- THAY: ví dụ 'lamongame' hoặc page id
  const CREATE_REF_ENDPOINT = '/api/create-ref'; // optional: backend tạo shortRef
  const LOG_CLICK_ENDPOINT = '/api/log-click';   // optional: beacon logging
  const REDIRECT_DELAY_MS = 200; // delay trước redirect tab chính

  /* =========== Helpers =========== */
  function saveUtmFromUrl() {
    try {
      const u = new URL(window.location.href);
      ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid'].forEach(k=>{
        const v = u.searchParams.get(k);
        if (v) localStorage.setItem(k, v);
      });
    } catch(e){}
  }
  function getStoredUtm(key) { return localStorage.getItem(key) || ''; }
  function encodePayload(obj){
    try { return btoa(JSON.stringify(obj)); } catch(e) { return encodeURIComponent(JSON.stringify(obj)); }
  }
  async function createShortRef(payload){
    try {
      const resp = await fetch(CREATE_REF_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
        credentials: 'same-origin'
      });
      if (!resp.ok) throw new Error('create-ref failed');
      const j = await resp.json();
      if (j && j.ref) return j.ref;
    } catch(e){ /* ignore */ }
    return null;
  }
  function logClickViaBeacon(data){
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
        navigator.sendBeacon(LOG_CLICK_ENDPOINT, blob);
        return;
      }
    } catch(e){}
    fetch(LOG_CLICK_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data),
      keepalive: true
    }).catch(()=>{});
  }

  /* =========== Main handler =========== */
  async function handleButtonClick(e){
    e.preventDefault();
    const btn = e.currentTarget;
    const text = btn.getAttribute('data-text') || '';
    const downloadUrl = btn.getAttribute('data-download') || '';
    const gameId = btn.getAttribute('data-gameid') || '';

    const payload = {
      g: gameId || null,
      utm: getStoredUtm('utm_source'),
      fbclid: getStoredUtm('fbclid'),
      t: Date.now()
    };
    const fallbackRef = encodePayload(payload);
    const encodedText = encodeURIComponent(text || '');

    // 1) open blank tab synchronously
    let popup = null;
    try { popup = window.open('about:blank', '_blank'); } catch(e){ popup = null; }

    const messengerFallback = `https://m.me/${FB_PAGE}?ref=${encodeURIComponent(fallbackRef)}${encodedText ? '&text='+encodedText : ''}`;
    if (popup) {
      try { popup.location.href = messengerFallback; } catch(e){}
    } else {
      // popup blocked -> fallback open messenger in same tab
      window.location.href = messengerFallback;
      return;
    }

    // 2) try create shortRef (async) and update popup
    (async ()=>{
      const shortRef = await createShortRef({
        gameId: gameId,
        utm_source: getStoredUtm('utm_source'),
        fbclid: getStoredUtm('fbclid')
      });
      if (shortRef && popup && !popup.closed) {
        try { popup.location.href = `https://m.me/${FB_PAGE}?ref=${encodeURIComponent(shortRef)}${encodedText ? '&text='+encodedText : ''}`; } catch(e){}
      }
    })();

    // 3) log click (non-blocking)
    try { logClickViaBeacon({ gameId, ref: fallbackRef, text, ts: Date.now() }); } catch(e){}

    // 4) redirect current tab to download if provided
    if (downloadUrl) {
      setTimeout(()=> { window.location.href = downloadUrl; }, REDIRECT_DELAY_MS);
    }
  }

  /* =========== Attach handlers =========== */
  function attachHandlers(){
    document.querySelectorAll('.open-messenger-btn').forEach(btn=>{
      btn.removeEventListener('click', handleButtonClick);
      btn.addEventListener('click', handleButtonClick);
    });
  }

  // init
  saveUtmFromUrl();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachHandlers);
  } else {
    attachHandlers();
  }
  // watch dynamic DOM
  const container = document.querySelector('body');
  if (container && window.MutationObserver) {
    new MutationObserver(attachHandlers).observe(container, { childList: true, subtree: true });
  }
})();
