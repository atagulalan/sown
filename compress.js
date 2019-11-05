const fs = require('fs')

module.exports = {
	compress: (settingsFile, inputFolder) => {
		const { ignore, spacing, numbers, numberSeperator, fileIdentifier } = require(settingsFile)

		let walk = function(dir, n = dir.length) {
			let results = {}
			if (!fs.existsSync(dir)) return {}
			fs.readdirSync(dir).forEach(function(file) {
				file = dir + '/' + file
				let stat = fs.statSync(file)
				if (stat && stat.isDirectory()) {
					results = { ...results, ...walk(file, n) }
				} else {
					let fileName = file.split('/')
					fileName = fileName[fileName.length - 1]
					if (ignore.indexOf(fileName) === -1) {
						results[file.substr(n + 1)] = fs.readFileSync(file, 'utf8')
					}
				}
			})
			return results
		}

		let items = walk(inputFolder)
		let textified =
			Object.keys(numbers)
				.map((key) => key + ' - ' + numbers[key] + '\n')
				.join('') +
			numberSeperator +
			'\n'.repeat(spacing[1])
		Object.keys(items).map((key) => {
			textified += fileIdentifier.join(key) + '\n'.repeat(spacing[0]) + items[key] + '\n'.repeat(spacing[1])
		})

		fs.writeFileSync('./' + Object.keys(numbers).join(' - ') + '.txt', textified)
	}
}
