'use strict'
const fs = require('fs')
const determine_mime_type = require('determine-mime-type')
const error_responses = require('error-responses')
module.exports = async function get_file(pathname)
{	try
	{	return {
		status: 200,
		mimetype: determine_mime_type(pathname),
		data: fs.createReadStream(pathname),
		headers: [], }}
	catch(e) { return error_responses.not_found }}
