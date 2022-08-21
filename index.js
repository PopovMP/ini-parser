'use strict'

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
			group[key] = parseValue(match[2])
		}
		else {
			throw new Error('Cannot parse: ' + line)
		}
	}

	return output
}

/**
 * Converts to camel case
 *
 * @param text
 *
 * @return {string}
 */
function toCamelCase(text)
{
	let chars = []
	for (let i = 0, wordStart = false; i < text.length; i++) {
		const char = text[i]

		if ( [' ', '_', '-'].includes(char) ) {
			wordStart = true
			continue
		}

		if (i === 0)
			chars.push( char.toLowerCase() )
		else
			chars.push( wordStart ? char.toUpperCase() : char)

		wordStart = false
	}

	return chars.join('')
}

function parseValue(text)
{
	if ( text.match(/^-?\d+$/) )
		return parseInt(text)

	if ( text.match(/^-?\d+\.\d+$/) )
		return parseFloat(text)

	if ( text.match(/^true$/i) )
		return true

	if ( text.match(/^false$/i) )
		return false

	if ( text.match(/^null$/i) )
		return null

	return text
}

module.exports = {
	parse
}
