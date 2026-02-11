"use strict";

(function initHomeLegalLinks() {
  var validLangs = ["zh-Hans", "zh-Hant", "en", "ja", "ko"];
  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang");

  if (!lang || validLangs.indexOf(lang) === -1) {
    try {
      var remembered = window.localStorage.getItem("manga_master_site_lang");
      if (remembered && validLangs.indexOf(remembered) !== -1) {
        lang = remembered;
      }
    } catch (_err) {
      // Ignore localStorage issues and fallback below.
    }
  }

  if (!lang || validLangs.indexOf(lang) === -1) {
    lang = "zh-Hans";
  }

  try {
    window.localStorage.setItem("manga_master_site_lang", lang);
  } catch (_err) {
    // Ignore localStorage issues.
  }

  var linkIds = [
    "nav-agreement-link",
    "nav-privacy-link",
    "mobile-agreement-link",
    "mobile-privacy-link",
    "hero-agreement-link",
    "hero-privacy-link",
    "footer-agreement-link",
    "footer-privacy-link"
  ];

  function buildUrl(base) {
    return base + "?lang=" + encodeURIComponent(lang) + "&from=home";
  }

  for (var i = 0; i < linkIds.length; i += 1) {
    var el = document.getElementById(linkIds[i]);
    if (!el) continue;
    var isAgreement = linkIds[i].indexOf("agreement") !== -1;
    el.setAttribute("href", buildUrl(isAgreement ? "./agreement.html" : "./privacy.html"));
  }
})();
