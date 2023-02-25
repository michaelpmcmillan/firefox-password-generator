function getRandomArrayEntry(array) {
    return array[Math.floor(Math.random() * array.length)]
}
function getRandomEntries(array, length, separator = "") {
    return Array.from(
        { length: length },
        (v, k) => getRandomArrayEntry(array)
    );
}
function joinEntries(entries, separator) {
    return entries.join(separator);
}
function getRandomWords(numWords) {
    var words = getWords();
    var entries = getRandomEntries(words, numWords);
    if (document.getElementById("chkCapitaliseFirstCharacter").checked) {
        entries = entries.map((entry) => entry.charAt(0).toUpperCase() + entry.slice(1));
    }
    var separator = document.getElementById("txtSeparator").value;
    if (!separator) {
        separator = ".";
    }
    return joinEntries(entries, separator);
}
function getRandomString(requiredLength, includeNumbers, includeLowercase, includeUppercase, includeCharacters, includeExtendedAscii) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const characters = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ";
    const extAscii = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    let chars =
        (includeNumbers ? numbers : "") +
        (includeLowercase ? lowercase : "") +
        (includeUppercase ? uppercase : "") +
        (includeCharacters ? characters : "") +
        (includeExtendedAscii ? extAscii : "");
    var entries = getRandomEntries(chars, requiredLength);
    return joinEntries(entries, "");
}
function generateString() {
    console.log('generateString');
    document.querySelector("#generated-password").innerText = getRandomString(
        document.getElementById("numPasswordLength").value,
        document.getElementById("chkNumbers").checked,
        document.getElementById("chkLowercase").checked,
        document.getElementById("chkUppercase").checked,
        document.getElementById("chkSymbols").checked,
        document.getElementById("chkExtendedAscii").checked);
}
function generateWords() {
    console.log('generateWords');
    document.querySelector("#generated-password").innerText = getRandomWords(
        document.getElementById("numWords").value
    );
}

document.querySelector("#btnGenerateString").addEventListener("click", (e) => {
    generateString();
});

document.querySelector("#btnGenerateWords").addEventListener("click", (e) => {
    generateWords();
});


document.querySelector("#btnCopy").addEventListener("click", (e) => {
    var element = document.getElementById("generated-password");
    var text = element.innerText;
    navigator.clipboard.writeText(text);
});

document.querySelector("#btnRandomWordsTab").addEventListener("click", (e) => {
    const firstActivation = !document.getElementById("btnRandomWordsTab").classList.contains('activeTab');

    document.getElementById("generateRandomWords").classList.remove('hidden');
    document.getElementById("generateRandomString").classList.add('hidden');
    document.getElementById("btnRandomWordsTab").classList.add('activeTab');
    document.getElementById("btnRandomStringTab").classList.remove('activeTab');

    if (firstActivation) {
        generateWords();
    }
});

document.querySelector("#btnRandomStringTab").addEventListener("click", (e) => {
    const firstActivation = !document.getElementById("btnRandomStringTab").classList.contains('activeTab');

    document.getElementById("generateRandomString").classList.remove('hidden');
    document.getElementById("generateRandomWords").classList.add('hidden');
    document.getElementById("btnRandomStringTab").classList.add('activeTab');
    document.getElementById("btnRandomWordsTab").classList.remove('activeTab');
    
    if (firstActivation) {
        generateString();
    }
});

generateWords();