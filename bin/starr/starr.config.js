module.exports = {
    // host for test mode
    "host": "127.0.0.1",
    "port": "9981",

    // entry for starr, put your code in this folder
    "base": "./",

    "build": "dist",

    // CDN server host
    "static": {
        "dev": "",
        "test": "",
        "pre": "",
        "release": ""
    },

    // api address
    "api": {
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

    "template": {
        "title"         :   "",                         // inner template document title
        "keywords"      :   "",                         // inner template meta keywords
        "description"   :   "",                         // inner template meta description
        "viewport"      :   "",                         // inner template meta viewport
        "path"          :   "template.html"             // custom template path, omit it if your desire to use inner template
    },

    "pages": "pages",

    // alias :)
    "alias": {
        "scss": "scss"
    }

}
