import { Box, FormControl, IconButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";
import React from "react";
import { ArrowRight } from "react-feather";
import { Header } from "../components/Header";
import { SidebarWMain } from "../components/SidebarWMain";
import { useIsAuthenticated } from "../providers/Auth";

const gLanguages = {
    "af": "Afrikaans",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "az": "Azerbaijani",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "ny": "Chichewa",
    "zh-CN": "Chinese",
    "co": "Corsican",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "tl": "Filipino",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "ht": "Haitian Creole",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "iw": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "ig": "Igbo",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "jw": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "rw": "Kinyarwanda",
    "ko": "Korean",
    "ku": "Kurdish (Kurmanji)",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Maori",
    "mr": "Marathi",
    "mn": "Mongolian",
    "my": "Myanmar (Burmese)",
    "ne": "Nepali",
    "no": "Norwegian",
    "or": "Odia (Oriya)",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pa": "Punjabi",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "gd": "Scots Gaelic",
    "sr": "Serbian",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "sv": "Swedish",
    "tg": "Tajik",
    "ta": "Tamil",
    "tt": "Tatar",
    "te": "Telugu",
    "th": "Thai",
    "tr": "Turkish",
    "tk": "Turkmen",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "ug": "Uyghur",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "cy": "Welsh",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu",
}

const Engine = () => {
    const authed = useIsAuthenticated();

    const [result, setResult] = React.useState("");

    const [from, setFrom] = React.useState("auto");
    const [to, setTo] = React.useState("en");

    let stoppedTypingInt: any;

    const maybeStartTranslating = (value: string) => {
        if(!authed) return;

        clearTimeout(stoppedTypingInt);

        if(!value.length) {
            return setResult("");
        }

        stoppedTypingInt = setTimeout(() => {
            setResult("Translating...");

            axios.get(
                `/api/engine/translate?input=${value}&from=${from}&to=${to}`
            ).then(r => {
                setResult(r.data.translated);
            })
        }, 800);
    }

    React.useEffect(() => {
        const el = document.getElementById("translate-text") as any;
        
        if(el && el.value) {
            maybeStartTranslating(el.value);
        }
    }, [from, to])

    return (
        <>
            <NextSeo title={"Translate – Dialect"} />

            <Header />

            <SidebarWMain hideSidebar={true}>
                <div className={"flex flex-col gap-4 py-12"}>
                    <h1 className={"text-3xl font-semibold"}>
                        Translate
                    </h1>
                    <p className={"text-gray-500"}>
                        Search from translation sources to convert text from one language to another.
                    </p>

                    {!authed && <p className={"text-red-500 font-semibold"}>You need to be signed in to access this tool.</p>}

                    <Paper className={`mt-10 ${!authed ? `pointer-events-none opacity-50` : ``}`}>
                        <Box className={"flex justify-between items-center"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Box className={"w-full"}>
                                <FormControl fullWidth sx={{ "*": { border: "none !important" } }}>
                                    <Select
                                        id="trans-from"
                                        value={from}
                                        fullWidth
                                        onChange={(e: any) => setFrom(e.target.value)}
                                    >
                                        <MenuItem value={"auto"}>Detect Language</MenuItem>
                                        {Object.entries(gLanguages).map(([key, value]) => (
                                            <MenuItem key={key} value={key}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <IconButton 
                                className={from == "auto" ? "pointer-events-none" : "h-10"}
                                onClick={() => {
                                    const frozenTo = to;
                                    const frozenFrom = from;

                                    const el = document.getElementById("translate-text") as any;

                                    setFrom(frozenTo);
                                    setTo(frozenFrom);
                                    el.value = result;
                                }}
                            >
                                <ArrowRight />
                            </IconButton>
                            <Box className={"w-full"}>
                                <FormControl fullWidth sx={{ "*": { border: "none !important" } }}>
                                    <Select
                                        id="trans-to"
                                        value={to}
                                        fullWidth
                                        onChange={(e: any) => setTo(e.target.value)}
                                    >
                                        {Object.entries(gLanguages).map(([key, value]) => (
                                            <MenuItem key={key} value={key}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        <div className={"flex justify-between text-2xl"}>
                            <TextField 
                                rows={3}
                                fullWidth 
                                multiline
                                className={"text-2xl"}
                                id={"translate-text"}
                                style={{ fontSize: "24px !important" }}
                                onChange={(e: any) => maybeStartTranslating(e.target.value)}
                                sx={{ 
                                    borderRight: 1,
                                    borderColor: "divider",
                                    fontSize: "24px !important",
                                    "*": { 
                                        border: "none !important",
                                        fontSize: "24px !important"
                                    },
                                    "* > textarea": {
                                        padding: "1rem !important"
                                    }
                                }} 
                            />
                            <TextField 
                                fullWidth 
                                inputProps={{
                                    readOnly: true
                                }}
                                multiline
                                value={result}
                                placeholder={"Translation"}
                                sx={{ 
                                    "*": { 
                                        border: "none !important",
                                        fontSize: "24px"
                                    },
                                    "* > textarea": {
                                        padding: "1rem"
                                    }
                                }} 
                            />
                        </div>
                    </Paper>
                </div>
            </SidebarWMain>
        </>
    )
}

export default Engine;