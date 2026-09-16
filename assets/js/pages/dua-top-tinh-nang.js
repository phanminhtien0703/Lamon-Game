(function () {
    'use strict';

    let currentMode = 'tab';
    let currentDay = 1;

    function setViewMode(mode) {
        currentMode = mode;
        const btnTab = document.getElementById('btn-view-tab');
        const btnAll = document.getElementById('btn-view-all');
        const timelineTabs = document.getElementById('timeline-tabs');

        if (mode === 'all') {
            if (btnAll) btnAll.classList.add('active');
            if (btnTab) btnTab.classList.remove('active');
            if (timelineTabs) timelineTabs.style.display = 'none';

            // Show all cards
            for (let i = 1; i <= 8; i++) {
                const card = document.getElementById('card-day-' + i);
                if (card) card.style.display = 'block';
            }
        } else {
            if (btnTab) btnTab.classList.add('active');
            if (btnAll) btnAll.classList.remove('active');
            if (timelineTabs) timelineTabs.style.display = 'flex';
            selectDay(currentDay);
        }
    }

    function selectDay(dayNum) {
        currentDay = dayNum;
        // Update tabs
        const tabs = document.querySelectorAll('.timeline-tab-item');
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', index === (dayNum - 1));
        });

        // If in tab mode, show only this day
        if (currentMode === 'tab') {
            for (let i = 1; i <= 8; i++) {
                const card = document.getElementById('card-day-' + i);
                if (card) {
                    card.style.display = (i === dayNum) ? 'block' : 'none';
                }
            }
        } else {
            // If all mode, scroll into view
            const card = document.getElementById('card-day-' + dayNum);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Bind view mode buttons
        const modeButtons = document.querySelectorAll('[data-view-mode]');
        modeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-view-mode');
                setViewMode(mode);
            });
        });

        // Bind timeline day tabs
        const dayTabs = document.querySelectorAll('[data-day]');
        dayTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const day = parseInt(tab.getAttribute('data-day'), 10);
                if (!isNaN(day)) {
                    selectDay(day);
                }
            });
        });

        // Initialize Day 1
        selectDay(1);
    });
})();
