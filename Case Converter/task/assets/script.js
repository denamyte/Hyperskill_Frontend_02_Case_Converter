const editor = document.querySelector("textarea");

function capitalize(regex) {
    let match;
    let parts = [];
    let text = editor.value.trim().toLowerCase();
    while ((match = regex.exec(text)) !== null) {
        parts.push(text.substring(match.index, match.index + match[0].length));
    }
    editor.value = parts.map(sentence =>
        sentence[0].toUpperCase() + sentence.slice(1)
    ).join("");
}

const listeners = {
    "upper-case": function () {
        editor.value = editor.value.toUpperCase();
    },
    "lower-case": function () {
        editor.value = editor.value.toLowerCase();
    },
    "proper-case": function () {
        capitalize(/[a-z\d']+[^a-z\d']+/g)
    },
    "sentence-case": function () {
        capitalize(/[^.!?]+([.!?] *|$)/g);
    },
    "save-text-file": function () {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.value));
        element.setAttribute('download', 'text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    },
}

for (id in listeners) {
    document.getElementById(id).addEventListener("click", listeners[id])
}
