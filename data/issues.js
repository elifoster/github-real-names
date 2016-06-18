var authors = document.getElementsByClassName('author');

var doneAuthors = {};

var i;

for (i = 0; i < authors.length; i++) {
    emitGet(authors[i]);
}

var assignees = document.getElementsByClassName('assignee');

for (i = 0; i < assignees.length; i++) {
    emitGet(assignees[i]);
}

function emitGet(person) {
    var username = person.textContent;
    if (!doneAuthors.hasOwnProperty(username)) {
        self.port.emit('getRealname', username);
    }
}

function setHTMLForAuthors(people) {
    for (var i = 0; i < people.length; i++) {
        var person = people[i];
        if (person.getAttribute('itemprop') == 'author') {
            continue;
        }

        var username = person.textContent;
        people[i].textContent = doneAuthors[username] || username;
    }
}

function trySetHTML() {
    setHTMLForAuthors(authors);
    setHTMLForAuthors(assignees);
}

self.port.on('sendRealname', function(obj) {
    doneAuthors[obj['user']] = obj['real'];
    trySetHTML();
});