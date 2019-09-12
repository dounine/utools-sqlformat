const {readFileSync} = require('fs');
var exec = require('child_process').exec;
const clipboard = require('electron').clipboard;
utools.onPluginReady(() => {
    if (window.ready) {
        window.ready()
    }
});
utools.onPluginEnter(({code, type, payload}) => {
    console.log('用户进入插件', code, type, payload);
    if (window.onPluginEnter) {
        window.onPluginEnter({
            code,
            type,
            payload
        })
    }
});
window.cache_get = function (key) {
    return utools.db.get(key)
};
window.cache_put = function (key, data) {
    return utools.db.put({
        _id: key,
        data
    })
};
window.copy = function (text) {
    clipboard.writeText(text)
};
window.notice = function (msg) {
    utools.showNotification(msg, clickFeatureCode = null, silent = true);
};

