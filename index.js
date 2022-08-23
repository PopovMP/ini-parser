'use strict'

const {toCamelCase}    = require('@popovmp/camel-case')
const {parseJsonValue} = require('@popovmp/json-value-parser')

/**
 * Parses INI text to JSON
 * The groups and options can be in any format.
 * It casts number-like values to numbers.
 *
 * @param {string} text - input INI formatted text
 *
 * @return {string} JSON
 */
function parse(text)
{
	const lines = text
		.split('\n')
		.map( line => line.trim() )
		.filter( line => line !== '' && !line.startsWith(';'))

	const output = {}

	let group = output

	for (const line of lines) {
		if ( line.startsWith('[') ) {
			const match = line.match(/^\[(.*)]$/)
			if (!match) throw new Error('Cannot parse: ' + line)
			const key = toCamelCase(match[1])
			group = output[key] = {}
		}
		else if ( line.includes('=') ) {
			const match = line.match(/^([- \w]+)[ \t]*=[ \t]*(.*)$/)
			if (!match) throw new Error('Cannot parse: ' + line)
			const key = toCamelCase(match[1])
			group[key] = parseJsonValue(match[2])
		}
		else {
			throw new Error('Cannot parse: ' + line)
		}
	}

	return output
}

module.exports = {
	parse
}
