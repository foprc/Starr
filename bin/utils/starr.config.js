module.exports = {
    host: '0.0.0.0',
    port: '9981',
    base: 'src',
    build: 'dist',

    // Define CDN domain, and leave it blank if you do not use.
    static: {
        dev: '', // for start
        pre: '', //
        release: '' //
    },

    // API base url
    api: {
        dev: '',
        pre: '',
        release: ''
    },


    "devtool": "source-map"
}
