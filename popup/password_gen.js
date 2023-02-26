var newPassword = "";

function getRandomArrayEntry(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function getRandomEntries(array, length) {
    return Array.from(
        { length: length },
        (v, k) => getRandomArrayEntry(array)
    );
}

function joinEntries(entries, separator) {
    return entries.join(separator);
}

function getRandomWords() {
    var wordsAToE = getWordsAToE();
    var wordsFToM = getWordsFToM();
    var wordsNToZ = getWordsNToZ();
    var entries = getRandomEntries([...wordsAToE, ...wordsFToM, ...wordsNToZ], settings.words_config.num_words);
    if (settings.words_config.capitalise_first_letter) {
        entries = entries.map((entry) => entry.charAt(0).toUpperCase() + entry.slice(1));
    }
    return joinEntries(entries, settings.words_config.separator);
}

function getRandomString() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const characters = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ";
    const extAscii = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    let chars =
        (settings.string_config.include_numbers ? numbers : "") +
        (settings.string_config.include_lowercase ? lowercase : "") +
        (settings.string_config.include_uppercase ? uppercase : "") +
        (settings.string_config.include_symbols ? characters : "") +
        (settings.string_config.include_extended_ascii ? extAscii : "");
    var entries = getRandomEntries(chars, settings.string_config.pass_length);
    return joinEntries(entries, "");
}

function generatePassword() {
    if (settings.tab === "words") {
        return getRandomWords();
    } else if(settings.tab === "string") {
        return getRandomString();
    }

    console.log('unknown tab: ' + settings.tab);
    return getRandomWords();
}