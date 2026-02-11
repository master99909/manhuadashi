"use strict";

(function initLegalNav() {
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

  function buildHomeUrl() {
    return "./index.html?lang=" + encodeURIComponent(lang);
  }

  function goBackWithFallback() {
    var referrer = document.referrer || "";
    var hasHistory = window.history.length > 1;
    var sameOriginReferrer = false;

    try {
      if (referrer) {
        var refUrl = new URL(referrer, window.location.href);
        sameOriginReferrer = refUrl.origin === window.location.origin;
      }
    } catch (_err) {
      sameOriginReferrer = false;
    }

    if (hasHistory && sameOriginReferrer) {
      window.history.back();
      return;
    }

    window.location.href = buildHomeUrl();
  }

  var homeLink = document.getElementById("legal-home-link");
  if (homeLink) {
    homeLink.setAttribute("href", buildHomeUrl());
  }

  var backBtn = document.getElementById("legal-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", function (event) {
      event.preventDefault();
      goBackWithFallback();
    });
  }
})();
