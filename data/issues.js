var authors = document.getElementsByClassName('author');

var doneAuthors = {};

for (var i = 0; i < authors.length; i++) {
    var author = authors[i];
    var username = author.textContent;
    if (!doneAuthors.hasOwnProperty(username)) {
        self.port.emit('getRealname', username);
    }
}

function trySetHTML() {
    for (var i = 0; i < authors.length; i++) {
        var author = authors[i];
        // Skip the repo header (e.g., the "elifoster" in "elifoster/github-real-names").
        if (author.getAttribute('itemprop') == 'author') {
            continue;
        }
        var username = author.textContent;
        console.log('setting ' + username);
        authors[i].textContent = doneAuthors[username] || username;
    }
}

self.port.on('sendRealname', function(obj) {
    doneAuthors[obj['user']] = obj['real'];
    trySetHTML();
});