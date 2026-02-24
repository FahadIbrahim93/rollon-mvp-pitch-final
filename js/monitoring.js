(function () {
    'use strict';

    const LOG_KEY = 'rollon_client_logs_v1';
    const MAX_LOGS = 50;

    function persistLog(type, payload) {
        try {
            const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
            logs.push({ type, payload: String(payload), at: new Date().toISOString(), path: location.pathname });
            localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(-MAX_LOGS)));
        } catch {
            // no-op
        }
    }

    window.addEventListener('error', (event) => {
        persistLog('error', event.message || event.error?.stack || 'unknown error');
    });

    window.addEventListener('unhandledrejection', (event) => {
        persistLog('unhandledrejection', event.reason?.stack || event.reason || 'promise rejection');
    });

    window.RollonMonitoring = {
        getLogs() {
            try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); } catch { return []; }
        },
        clearLogs() {
            localStorage.removeItem(LOG_KEY);
        }
    };
}());
