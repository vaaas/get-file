'use strict'
const fs = require('fs')
const determine_mime_type = require('determine-mime-type')
const error_responses = require('error-responses')
const access = x => new Promise(yes => fs.access(x, fs.constants.R_OK, e => e ? yes(false) : yes(true)))
const stat = x => new Promise((yes, no) => fs.stat(x, (e, x) => e ? no(e) : yes(x)))
module.exports = async function get_file(pathname)
	{ if (await access(pathname))
		{	if ((await stat(pathname)).isFile())
				return {
					status: 200,
					mimetype: determine_mime_type(pathname),
					data: fs.createReadStream(pathname),
					headers: [],
				}
			else
				return error_responses.bad_request('Not a file') }
	else
		return error_responses.not_found }
