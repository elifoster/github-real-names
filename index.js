var self = require('sdk/self');
var pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: '*.github.com',
    contentScriptFile: self.data.url('names.js'),
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
                    name = name[1];
                } else {
                    name = username;
                }
                worker.port.emit('sendRealname', { real: name, user: username } );
            }
        }).get();
    });
}