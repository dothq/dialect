enum LanguageScript {
    Latin = "latin",
    Arabic = "arabic",
    Armenian = "armenian",
    Bengali = "bengali",
    Cyrillic = "cyrillic",
    Myanmar = "myanmar",
    ChineseSimplified = "chinese_simplified",
    ChineseTraditional = "chinese_traditional",
    Georgian = "georgian",
    Greek = "greek",
    Gujarati = "gujarati",
    Hebrew = "hebrew",
    Devanagari = "devanagari",
    Japanese = "japanese",
    Kannada = "kannada",
    Khmer = "khmer",
    Korean = "korean",
    Malayalam = "malayalam",
    Odia = "odia",
    Gurmukhi = "GurmukhÄ«",
    Sinhalese = "sinhalese",
    Tamil = "tamil",
    Telugu = "telugu",
    Thai = "thai",
}

enum LanguageDirection {
    LTR = "ltr",
    RTL = "rtl",
}

export const defaultLanguages = [
    {
        code: "ar",
        name: "Arabic",
        flag: "ð¦ðª",
        script: LanguageScript.Arabic,
        direction: LanguageDirection.RTL,
    },
    {
        code: "an",
        name: "Aragonese",
        flag: "ð´ââ ï¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR,
    },
    {
        code: "hy-AM",
        name: "Armenian",
        flag: "ð¦ð²",
        script: LanguageScript.Armenian,
        direction: LanguageDirection.LTR
    },
    {
        code: "as",
        name: "Assamese",
        flag: "ð®ð³",
        script: LanguageScript.Bengali,
        direction: LanguageDirection.LTR
    },
    {
        code: "ast",
        name: "Asturian",
        flag: "ð´ââ ï¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "az",
        name: "Azerbaijani",
        flag: "ð¦ð¿",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "eu",
        name: "Basque",
        flag: "ðªð¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "be",
        name: "Belarusian",
        flag: "ð§ð¾",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "bn-BD",
        name: "Bengali",
        flag: "ð§ð©",
        script: LanguageScript.Bengali,
        direction: LanguageDirection.LTR
    },
    {
        code: "bn-IN",
        name: "Bengali",
        flag: "ð®ð³",
        script: LanguageScript.Bengali,
        direction: LanguageDirection.LTR
    },
    {
        code: "bs",
        name: "Bosnian",
        flag: "ð§ð¦",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "br",
        name: "Breton",
        flag: "ð«ð·",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "bg",
        name: "Bulgarian",
        flag: "ð§ð¬",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "my",
        name: "Burmese",
        flag: "ð´ââ ï¸",
        script: LanguageScript.Myanmar,
        direction: LanguageDirection.LTR
    },
    {
        code: "ca",
        name: "Catalan",
        flag: "ðªð¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "zh-CN",
        name: "Chinese (Simplified)",
        flag: "ð¨ð³",
        script: LanguageScript.ChineseSimplified,
        direction: LanguageDirection.LTR,
    },
    {
        code: "zh-TW",
        name: "Chinese (Traditional)",
        flag: "ð¨ð³",
        script: LanguageScript.ChineseTraditional,
        direction: LanguageDirection.LTR
    },
    {
        code: "hr",
        name: "Croatian",
        flag: "ð­ð·",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "cs",
        name: "Czech",
        flag: "ð¨ð¿",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "da",
        name: "Danish",
        flag: "ð©ð°",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "nl",
        name: "Dutch",
        flag: "ð³ð±",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "en-GB",
        name: "English (Great Britain)",
        flag: "ð¬ð§",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "en-US",
        name: "English (United States)",
        flag: "ðºð¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "en-ZA",
        name: "English (South Africa)",
        flag: "ð¿ð¦",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "eo",
        name: "Esperanto",
        flag: "ð´ââ ï¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "et",
        name: "Estonian",
        flag: "ðªðª",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "fi",
        name: "Finnish",
        flag: "ð«ð®",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "fr",
        name: "French",
        flag: "ð«ð·",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "gd-GB",
        name: "Scottish Gaelic (Great Britain)",
        flag: "ð´ó §ó ¢ó ³ó £ó ´ó ¿",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "gl-ES",
        name: "Galician",
        flag: "ðªð¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "ka-GE",
        name: "Georgian",
        flag: "ð¬ðª",
        script: LanguageScript.Georgian,
        direction: LanguageDirection.LTR
    },
    {
        code: "de",
        name: "German",
        flag: "ð©ðª",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "el",
        name: "Greek",
        flag: "ð¬ð·",
        script: LanguageScript.Greek,
        direction: LanguageDirection.LTR
    },
    {
        code: "gu-IN",
        name: "Gujarati",
        flag: "ð®ð³",
        script: LanguageScript.Gujarati,
        direction: LanguageDirection.LTR
    },
    {
        code: "ht",
        name: "Haitian",
        flag: "ð­ð¹",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "he",
        name: "Hebrew",
        flag: "ð®ð±",
        script: LanguageScript.Hebrew,
        direction: LanguageDirection.RTL
    },
    {
        code: "hi-IN",
        name: "Hindi",
        flag: "ð®ð³",
        script: LanguageScript.Devanagari,
        direction: LanguageDirection.LTR
    },
    {
        code: "hu-HU",
        name: "Hungarian",
        flag: "ð­ðº",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "is-IS",
        name: "Icelandic",
        flag: "ð®ð¸",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "id-ID",
        name: "Indonesian",
        flag: "ð®ð©",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "ga-IE",
        name: "Irish",
        flag: "ð®ðª",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "it-IT",
        name: "Italian",
        flag: "ð®ð¹",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "ja-JP",
        name: "Japanese",
        flag: "ð¯ðµ",
        script: LanguageScript.Japanese,
        direction: LanguageDirection.LTR,
    },
    {
        code: "kn",
        name: "Kannada",
        flag: "ð®ð³",
        script: LanguageScript.Kannada,
        direction: LanguageDirection.LTR
    },
    {
        code: "kk",
        name: "Kazakh",
        flag: "ð°ð¿",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "km-KH",
        name: "Khmer",
        flag: "ð°ð­",
        script: LanguageScript.Khmer,
        direction: LanguageDirection.LTR
    },
    {
        code: "ko",
        name: "Korean",
        flag: "ð°ð·",
        script: LanguageScript.Korean,
        direction: LanguageDirection.LTR
    },
    {
        code: "lv",
        name: "Latvian",
        flag: "ð±ð»",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "lt",
        name: "Lithuanian",
        flag: "ð±ð¹",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "dsb",
        name: "Lower Sorbian",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "mk",
        name: "Macedonian",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "mai",
        name: "Maithili",
        script: LanguageScript.Devanagari,
        direction: LanguageDirection.LTR
    },
    {
        code: "ms",
        name: "Malay",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR,
    },
    {
        code: "ml",
        name: "Malayalam",
        script: LanguageScript.Malayalam,
        direction: LanguageDirection.LTR
    },
    {
        code: "mr",
        name: "Marathi",
        script: LanguageScript.Devanagari,
        direction: LanguageDirection.LTR
    },
    {
        code: "mn",
        name: "Mongolian",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "ne-NP",
        name: "Nepali",
        script: LanguageScript.Devanagari,
        direction: LanguageDirection.LTR
    },
    {
        code: "nb-NO",
        name: "Norwegian BokmÃ¥l",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "nn-NO",
        name: "Norwegian Nynorsk",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "oc",
        name: "Occitan",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "or",
        name: "Oriya",
        script: LanguageScript.Odia,
        direction: LanguageDirection.LTR,
    },
    {
        code: "fa",
        name: "Persian",
        script: LanguageScript.Arabic,
        direction: LanguageDirection.RTL
    },
    {
        code: "pl",
        name: "Polish",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "pt",
        name: "Portuguese",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "pt-BR",
        name: "Portuguese (Brazil)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "pt-PT",
        name: "Portuguese (Portugal)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "pa-IN",
        name: "Punjabi",
        script: LanguageScript.Gurmukhi,
        direction: LanguageDirection.LTR
    },
    {
        code: "ro",
        name: "Romanian",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "rm",
        name: "Romansh",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "ru-RU",
        name: "Russian",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "sr",
        name: "Serbian",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "si",
        name: "Sinhala",
        script: LanguageScript.Sinhalese,
        direction: LanguageDirection.LTR,
    },
    {
        code: "sk",
        name: "Slovak",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "sl",
        name: "Slovenian",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "son",
        name: "Songhay",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "es-AR",
        name: "Spanish (Argentina)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "es-CL",
        name: "Spanish (Chile)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "es-ES",
        name: "Spanish (Spain)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "es-MX",
        name: "Spanish (Mexico)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "sw",
        name: "Swahili",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "sv-SE",
        name: "Swedish",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "tl",
        name: "Tagalog",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "ta",
        name: "Tamil",
        script: LanguageScript.Tamil,
        direction: LanguageDirection.LTR,
    },
    {
        code: "te",
        name: "Telugu",
        script: LanguageScript.Telugu,
        direction: LanguageDirection.LTR
    },
    {
        code: "th",
        name: "Thai",
        script: LanguageScript.Thai,
        direction: LanguageDirection.LTR
    },
    {
        code: "tr",
        name: "Turkish",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "uk",
        name: "Ukrainian",
        script: LanguageScript.Cyrillic,
        direction: LanguageDirection.LTR
    },
    {
        code: "hsb",
        name: "Upper Sorbian",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "ur",
        name: "Urdu",
        script: LanguageScript.Arabic,
        direction: LanguageDirection.RTL
    },
    {
        code: "uz",
        name: "Uzbek",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "vi",
        name: "Vietnamese",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "cy-GB",
        name: "Welsh (Great Britain)",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "fy-NL",
        name: "Western Frisian",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "wo",
        name: "Wolof",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "xh",
        name: "Xhosa",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
    {
        code: "zu",
        name: "Zulu",
        script: LanguageScript.Latin,
        direction: LanguageDirection.LTR
    },
]