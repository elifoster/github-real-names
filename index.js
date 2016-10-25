var self = require('sdk/self');
var pageMod = require('sdk/page-mod');
var ss = require('sdk/simple-storage');
var he = require('he');

if (!ss.storage.githubUsers) {
    ss.storage.githubUsers = {};
}

pageMod.PageMod({
    include: /https?:\/\/(www\.)?github.com\/.+\/.+\/(issues|pull)\/\d+(#issuecomment-\d+)?/,
    contentScriptFile: self.data.url('issues.js'),
    onAttach: startListening
});

pageMod.PageMod({
    include: /https?:\/\/(www\.)?github\.com(\/)?((dashboard)?(\/)?(index\/\d+)?)/,
    contentScriptFile: self.data.url('dashboard.js'),
    onAttach: startListening
});

pageMod.PageMod({
    include: /https?:\/\/(www\.)?github\.com\/.+\/.+(\/)?(\/commits)?(\/.+)?(\?page=\d+)?/,
    contentScriptFile: self.data.url('commits.js'),
    onAttach: startListening
});

function startListening(worker) {
    worker.port.on('getRealname', function(username) {
        if (ss.storage.githubUsers[username]) {
            worker.port.emit('sendRealname', { real: ss.storage.githubUsers[username], user: username } );
            return;
        }
        var request = require('sdk/request').Request;
        request({
            url: 'https://github.com/' + username,
            onComplete: function(response) {
                var text = response.text;
                var name = /<span class="vcard-fullname d-block" itemprop="name">(.+)<\/span>/.exec(text);
                if (name) {
                    name = he.decode(name[1]);
                } else {
                    name = username;
                }
                ss.storage.githubUsers[username] = name;
                worker.port.emit('sendRealname', { real: name, user: username } );
            }
        }).get();
    });
}