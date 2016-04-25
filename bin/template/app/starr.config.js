module.exports = {
    // host for test mode
    "host": "127.0.0.1",
    "port": "9981",

    // entry for starr, put your code in this folder
    "base": "src",

    // CDN server host
    "static": {
        "dev": "",
        "test": "",
        "pre": "",
        "release": ""
    },

    // global const
    "globals": {
        "static_api": { // `${STATIC_API}`
            "dev": "",
            "test": "",
            "pre": "",
            "release": ""
        }
    },

    //
    "vendor": ["react", "react-dom"],

    // alias :)
    "alias": {
        "scss": "scss"
    }

}
