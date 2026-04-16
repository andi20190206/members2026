// 智能返回:从 Demo 导航或直接打开时使用 fallback,从站内跳转时用 history.back
function smartBack(fallback) {
  var r = document.referrer;
  var host = location.host;
  // 无来源
  if (!r) { location.href = fallback; return; }
  // 非同域
  if (!r.includes(host)) { location.href = fallback; return; }
  // 来自 Demo 导航 index.html(根路径或显式 index.html)
  var path = r.split('?')[0].split('#')[0];
  if (path.endsWith('/index.html') || /\/members2026\/?$/.test(path) || /\/$/.test(path)) {
    location.href = fallback;
    return;
  }
  // 否则正常返回
  history.back();
}
