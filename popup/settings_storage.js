const defaultSettings = {
    tab: "words",
    words_config: {
        num_words: 4,
        capitalise_first_letter: true,
        separator: '.'
    },
    string_config: {
        include_numbers: true,
        include_lowercase: true,
        include_uppercase: true,
        include_symbols: true,
        include_extended_ascii: false,
        pass_length: 24,
    }
};

let settings = defaultSettings;

function saveOptions() {
    return browser.storage.sync
        .set({ settings })
        .then(
            (foo) => {},
            (error) => console.log("failed to save settings: " + error));
}

function restoreOptions() {
    return browser.storage.sync
        .get('settings')
        .then((res) => {
            if (res && res.settings) {
                settings = res.settings;
            } else {
                settings = defaultSettings;
            }
        });
}

function updateWordsConfig(numWords, capitaliseFirstLetter, separator) {
    settings.words_config.num_words = numWords;
    settings.words_config.capitalise_first_letter = capitaliseFirstLetter;
    settings.words_config.separator = separator;
}

function updateStringConfig(numPasswordLength, includeNumbers, includeLowercase, includeUppercase, includeSymbols, includeExtendedAscii) {
    settings.string_config.pass_length = numPasswordLength;
    settings.string_config.include_numbers = includeNumbers;
    settings.string_config.include_lowercase = includeLowercase;
    settings.string_config.include_uppercase = includeUppercase;
    settings.string_config.include_symbols = includeSymbols;
    settings.string_config.include_extended_ascii = includeExtendedAscii;
}

function updateConfig(activeTab) {
    settings.tab = activeTab;
}