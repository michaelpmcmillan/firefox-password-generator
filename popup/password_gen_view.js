function hideWordsTab() {
    document.getElementById("generateRandomWords").classList.add('hidden');
    document.getElementById("btnRandomWordsTab").classList.remove('activeTab');
}
function hideStringsTab() {
    document.getElementById("generateRandomString").classList.add('hidden');
    document.getElementById("btnRandomStringTab").classList.remove('activeTab');
}
function showWordsTab() {
    document.getElementById("generateRandomWords").classList.remove('hidden');
    document.getElementById("btnRandomWordsTab").classList.add('activeTab');
    hideStringsTab();
}
function showStringsTab() {
    document.getElementById("generateRandomString").classList.remove('hidden');
    document.getElementById("btnRandomStringTab").classList.add('activeTab');
    hideWordsTab();
}

function updateConfigFromUI() {
    updateConfig(
        document.getElementById("btnRandomWordsTab").classList.contains('activeTab') ? "words" : "string"
    );
    updateWordsConfig(
        document.getElementById("numWords").value,
        document.getElementById("chkCapitaliseFirstCharacter").checked,
        document.getElementById("txtSeparator").value
    );
    updateStringConfig(
        document.getElementById("numPasswordLength").value,
        document.getElementById("chkNumbers").checked,
        document.getElementById("chkLowercase").checked,
        document.getElementById("chkUppercase").checked,
        document.getElementById("chkSymbols").checked,
        document.getElementById("chkExtendedAscii").checked
    );

    saveOptions();
}

function updateUIFromConfig() {
    document.getElementById("numWords").value = settings.words_config.num_words;
    document.getElementById("chkCapitaliseFirstCharacter").checked = settings.words_config.capitalise_first_letter;
    document.getElementById("txtSeparator").value = settings.words_config.separator;

    document.getElementById("numPasswordLength").value = settings.string_config.pass_length;
    document.getElementById("chkNumbers").checked = settings.string_config.include_numbers;
    document.getElementById("chkLowercase").checked = settings.string_config.include_lowercase;
    document.getElementById("chkUppercase").checked = settings.string_config.include_uppercase;
    document.getElementById("chkSymbols").checked = settings.string_config.include_symbols;
    document.getElementById("chkExtendedAscii").checked = settings.string_config.include_extended_ascii;

    if (settings.tab === "string") {
        showStringsTab();
    } else {
        showWordsTab();
    }
}

function generateNewPassword() {
    updateConfigFromUI();
    document.querySelector("#generated-password").innerText = generatePassword();
}

document.querySelector("#btnGeneratePassword").addEventListener("click", (e) => generateNewPassword());

document.querySelector("#btnCopy").addEventListener("click", (e) => {
    navigator.clipboard.writeText(document.getElementById("generated-password").innerText);
});

document.querySelector("#btnRandomWordsTab").addEventListener("click", (e) => {
    const firstActivation = !document.getElementById("btnRandomWordsTab").classList.contains('activeTab');

    showWordsTab();

    if (firstActivation) {
        generateNewPassword();
    }
});

document.querySelector("#btnRandomStringTab").addEventListener("click", (e) => {
    const firstActivation = !document.getElementById("btnRandomStringTab").classList.contains('activeTab');

    showStringsTab();
    
    if (firstActivation) {
        generateNewPassword();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions()
        .then(res => {
            updateUIFromConfig();
            generateNewPassword();
        });
});
