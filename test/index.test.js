'use strict'

const {strictEqual}  = require('assert')
const {describe, it} = require('@popovmp/mocha-tiny')
const {parse}        = require('../index.js')

describe('parser', () => {

	describe('when given empty string', () => {
		it('gets: {}', () => {
			const input = ''
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{}')
		})
	})

	describe('when given a group', () => {
		it('it parses it correctly', () => {
			const input = '[group]'
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"group":{}}')
		})
	})

	describe('when given key-value pair', () => {
		it('it parses it correctly', () => {
			const input = 'foo = bar'
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"foo":"bar"}')
		})
	})

	describe('when given an INI text', () => {
		it('it parses it to JSON correctly', () => {
			const input = `
;; Global fields
    global = foo
    let another_Global-var = 3.14
    
    ; Arbitrary text in group
[my group]
    gr-42 = 42
    boolean = true
    falsy = False
    nil = null
    
    ; Empty string value
PascalCase=
; Negative float number
  negative = -2.2       
    [Other_group]
	my long variable = this is a long text
			
			`
			const output   = JSON.stringify( parse(input) )
			const expected = '{"global":"foo","letAnotherGlobalVar":3.14,"myGroup":{"gr42":42,"boolean":true,"falsy":false,"nil":null,"pascalCase":"","negative":-2.2},"otherGroup":{"myLongVariable":"this is a long text"}}'
			strictEqual(output, expected)
		})
	})
})
