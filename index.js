#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const { compress } = require('./compress')
const { expand } = require('./expand')

let args = process.argv.slice(2)
let settingsFile = path.resolve(__dirname, 'settings.js')
let outputFolder = 'output'

function help() {
	console.log(
		[
			'',
			'  (\\____/)',
			'  / @__@ \\',
			' (  (oo)  )',
			'  `-.~~.-`',
			'   /    \\',
			' @/      \\_',
			'(/ /    \\ \\)',
			' WW`----`WW',
			'',
			'Usage: sown <command> [direction | file] [options]',
			'       sown compress ./my-project/',
			'',
			'Where <command> is one of:',
			'       compress                Compresses target direction to a single file',
			'       expand                  Expands single file to a directory',
			'       help                    Outputs this.',
			'',
			'Options:',
			'       -s, --settings <file>   Imports settings from specified file',
			'       -o, --output <folder>   Outputs expanded files to specified folder',
			'',
			'Specify configs in the js-formatted file:',
			'       ' + settingsFile,
			'or on the command line via: sown <command> --settings <file>',
			''
		].join('\n')
	)
}

if (args[0] === '--help' || args[0] === '--h' || args[0] === 'help') {
	help()
} else {
	if (args.includes('--settings') || args.includes('-s')) {
		argIndex = args.findIndex((e) => e === '--settings' || e === '-s')
		settingsFile = path.resolve(__dirname, args.splice(argIndex, 2)[1])
	}

	if (!fs.existsSync(settingsFile)) {
		console.error(`Error: Couldn't find settings file.`)
		process.exit()
	}

	if (args.includes('expand') || args.includes('compress')) {
		argIndex = args.findIndex((e) => e === 'expand' || e === 'compress')
		let command, filename
		;[command, filename] = args.splice(argIndex, 2)

		if (!filename) {
			console.error(`Error while ${command}: You didn't specify any file/directory.`)
			process.exit()
		}

		let fileLocation = path.resolve(__dirname, filename)

		if (command === 'compress') {
			if (fs.existsSync(fileLocation)) {
				if (fs.statSync(fileLocation).isDirectory()) {
					compress(settingsFile, fileLocation)
				} else {
					console.log('Specified folder is a file. Please specify a folder.')
				}
			} else {
				console.log('Specified folder not found.')
			}
		}

		if (command === 'expand') {
			if (fs.existsSync(fileLocation)) {
				if (fs.statSync(fileLocation).isFile()) {
					//Look if output specified
					if (args.includes('--output') || args.includes('-o')) {
						argIndex = args.findIndex((e) => e === '--output' || '-o')
						outputFolder = args.splice(argIndex, 2)[1]
						console.log(outputFolder)
					} else {
						console.log("No output folder specified. Expanding to './output' folder.")
					}

					expand(settingsFile, fileLocation, outputFolder)
				} else {
					console.log('Specified file is a folder. Please specify a file.')
				}
			} else {
				console.log('Specified file not found.')
			}
		}
	} else {
		help()
	}
}
