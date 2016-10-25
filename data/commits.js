var authors = document.getElementsByClassName('commit-author-section');
var tease = document.querySelectorAll('.commit-author-section a.user-mention');

var doneAuthors = {};

for (var i = 0; i < tease.length; i++) {
    var author = tease[i];
    var username = author.textContent;
    if (!doneAuthors.hasOwnProperty(username)) {
        self.port.emit('getRealname', username);
    }
}

// if (tease) {
//     var teaseUsername = tease.textContent;
//     if (!doneAuthors.hasOwnProperty(teaseUsername)) {
//         self.port.emit('getRealname', teaseUsername);
//     }
// }

function trySetHTML(user) {
    for (var i = 0; i < tease.length; i++) {
        var author = tease[i];
        var username = author.textContent;
        if (user == username) {
            tease[i].textContent = doneAuthors[username];
        }
    }
    // if (tease) {
    //     var teasename = tease.textContent;
    //     tease.textContent = doneAuthors[teasename];
    // }
}

self.port.on('sendRealname', function(obj) {
    doneAuthors[obj['user']] = obj['real'];
    trySetHTML(obj['user']);
});