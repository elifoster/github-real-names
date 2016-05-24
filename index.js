var self = require('sdk/self');
var pageMod = require('sdk/page-mod');
var he = require('he');

pageMod.PageMod({
    include: /https?:\/\/(www\.)?github.com\/.+\/.+\/(issues|pull)\/\d+/,
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
        var request = require('sdk/request').Request;
        request({
            url: 'https://github.com/' + username,
            onComplete: function(response) {
                var text = response.text;
                var name = /<div class="vcard-fullname" itemprop="name">(.+)<\/div>/.exec(text);
                if (name) {
                    name = he.decode(name[1]);
                } else {
                    name = username;
                }
                worker.port.emit('sendRealname', { real: name, user: username } );
            }
        }).get();
    });
}