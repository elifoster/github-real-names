var authors = document.getElementsByClassName('author');

var doneAuthors = {};

for (var i = 0; i < authors.length; i++) {
    var author = authors[i];
    var username = author.innerHTML;
    if (!doneAuthors.hasOwnProperty(username)) {
        self.port.emit('getRealname', username);
    }
}

function trySetHTML() {
    for (var i = 0; i < authors.length; i++) {
        var author = authors[i];
        var username = author.innerHTML;
        authors[i].innerHTML = doneAuthors[username] || username;
    }
}

self.port.on('sendRealname', function(obj) {
    doneAuthors[obj['user']] = obj['real'];
    trySetHTML();
});