(function () {
  const API_URL = "https://lamongame.com/track"; // backend endpoint

  // session id để phân biệt người chơi
  let sessionId = localStorage.getItem("lg_session");

  if (!sessionId) {
    sessionId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    localStorage.setItem("lg_session", sessionId);
  }

  // 1. Track khi vào trang
  sendEvent("page_view", {
    page: location.href,
    referrer: document.referrer
  });

  // 2. Track click toàn site (quan trọng)
  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-track]");
    sendEvent("click", {
      text: el?.innerText?.slice(0, 50),
      tag: el?.tagName,
      data: el?.getAttribute("data-track"),
      page: location.href
    });
  });

  function sendEvent(event, data = {}) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event,
        sessionId,
        ...data,
        ua: navigator.userAgent,
        time: new Date().toISOString()
      })
    }).catch(() => {});
  }
})();