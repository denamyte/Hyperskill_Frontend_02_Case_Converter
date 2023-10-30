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
    }
}

for (id in listeners) {
    document.getElementById(id).addEventListener("click", listeners[id])
}
