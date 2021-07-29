'use strict'
const fs = require('fs')
const determine_mime_type = require('determine-mime-type')
const access = x => new Promise((yes, no) => fs.access(x, e => e ? no(e) : yes(true)))
const stat = x => new Promise((yes, no) => fs.stat(x, (e, x) => e ? no(e) : yes(x)))
module.exports = async function get_file(pathname) {
    await access(pathname)
    if ((await stat(pathname)).isFile())
        return {
            status: 200,
            mimetype: determine_mime_type(pathname),
            data: fs.createReadStream(pathname),
            headers: [],
        }
    else
        throw 'Not a file'
}
