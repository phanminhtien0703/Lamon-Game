/**
 * LAMON GAME — Core Theme Manager (Dark / Light Mode)
 * File: assets/js/core/theme-manager.js
 * Tuân thủ: AI_RULES_PHP_MVC.md (Rule 8, Rule 9)
 */

(function () {
    'use strict';

    var STORAGE_KEY = 'lamon_game_theme';
    var THEME_DARK = 'dark';
    var THEME_LIGHT = 'light';

    /**
     * Lấy theme hiện tại đã lưu hoặc mặc định là Dark
     */
    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || THEME_DARK;
        } catch (e) {
            return THEME_DARK;
        }
    }

    /**
     * Cập nhật trạng thái hiển thị của các nút Toggle Theme trên trang
     */
    function updateToggleButtons(theme) {
        var buttons = document.querySelectorAll('.theme-toggle-btn, #themeToggleBtn');
        buttons.forEach(function (btn) {
            var isLight = theme === THEME_LIGHT;
            btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
            btn.setAttribute('title', isLight ? 'Đang dùng Giao diện Sáng (Bấm để chuyển Tối)' : 'Đang dùng Giao diện Tối (Bấm để chuyển Sáng)');

            var iconEl = btn.querySelector('.theme-icon');
            if (iconEl) {
                iconEl.textContent = isLight ? '☀️' : '🌙';
            }

            var labelEl = btn.querySelector('.theme-label');
            if (labelEl) {
                labelEl.textContent = isLight ? 'Sáng' : 'Tối';
            }

            btn.classList.toggle('is-light', isLight);
        });
    }

    /**
     * Áp dụng theme vào document
     */
    function applyTheme(theme, save) {
        var validTheme = theme === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;
        document.documentElement.setAttribute('data-theme', validTheme);
        
        if (document.body) {
            document.body.classList.toggle('light-theme', validTheme === THEME_LIGHT);
            document.body.classList.toggle('dark-theme', validTheme === THEME_DARK);
        }

        if (save) {
            try {
                localStorage.setItem(STORAGE_KEY, validTheme);
            } catch (e) {
                // Ignore storage quota or disabled cookies
            }
        }

        updateToggleButtons(validTheme);

        // Bắn custom event để các component khác nếu cần có thể cập nhật
        try {
            window.dispatchEvent(new CustomEvent('lamonThemeChanged', { detail: { theme: validTheme } }));
        } catch (e) {
            // IE / older fallback
        }
    }

    /**
     * Chuyển đổi qua lại giữa Dark và Light
     */
    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') || getStoredTheme();
        var next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        applyTheme(next, true);
    }

    // Gắn vào window để có thể gọi từ bên ngoài nếu cần
    window.LamonTheme = {
        get: getStoredTheme,
        set: function (t) { applyTheme(t, true); },
        toggle: toggleTheme
    };

    // Áp dụng ngay khi script tải
    applyTheme(getStoredTheme(), false);

    // Khi DOM sẵn sàng, gắn sự kiện click cho các nút
    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(getStoredTheme(), false);

        document.addEventListener('click', function (e) {
            var targetBtn = e.target.closest('.theme-toggle-btn, #themeToggleBtn');
            if (targetBtn) {
                e.preventDefault();
                toggleTheme();
            }
        });
    });
})();
