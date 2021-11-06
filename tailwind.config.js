module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or "media" or "class"
    theme: {
        extend: {},
        fontFamily: {
            sans: [
                "Satoshi",
                "-apple-system", 
                "BlinkMacSystemFont", 
                "Segoe UI", 
                "Roboto", 
                "Oxygen", 
                "Ubuntu", 
                "Cantarell", 
                "Open Sans", 
                "Helvetica Neue", 
                "sans-serif"
            ]
        }
    },
    variants: {
        extend: {
            transform: ["hover", "focus", "group-hover"],
            translate: ["hover", "focus", "group-hover"],
            backgroundColor: ["active"]
        },
    },
    plugins: [],
}
