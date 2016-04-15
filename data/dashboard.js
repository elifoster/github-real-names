var links = document.querySelectorAll('.alert .body .title a');

var actorLinks = [];

for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var click = link.getAttribute('data-ga-click');
    if (click && click.includes('target:actor')) {
        actorLinks.push(link);
    }
}

var doneActors = {};

for (var j = 0; j < actorLinks.length; j++) {
    var username = actorLinks[j].textContent;
    if (!doneActors.hasOwnProperty(username)) {
        self.port.emit('getRealname', username);
    }
}

function trySetHTML(user) {
    for (var i = 0; i < actorLinks.length; i++) {
        var actorLink = actorLinks[i];
        var username = actorLink.textContent;
        if (username == user) {
            actorLinks[i].textContent = doneActors[username];
        }
    }
}

self.port.on('sendRealname', function(obj) {
    if (!doneActors.hasOwnProperty(obj['user'])) {
        doneActors[obj['user']] = obj['real'];
    }
    trySetHTML(obj['user']);
});