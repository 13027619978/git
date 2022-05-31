var fs = require('fs-extra')
var lineReader = require('line-reader')

var filePath = process.cwd() + '/log/123.txt'

async function myFileExists (path) {
	return await fs.pathExists(path)
}

async function myCreateFile (path) {
  try {
    await fs.ensureFile(path)
		console.log('create file ok')
		return true
  } catch (err) {
  	console.log('create file error')
    console.error(err)
  }	
}

async function myAppendFile (path,data) {
	try {
		await fs.outputFile(path, data,{flag:'a+'})
		console.log('append file ok')
		return true
	} catch (err) {
		console.log('append file error')
		console.error(err)
	}
}

async function myRemoveFile (path) {
  try {
    await fs.remove(path)
		console.log('remove file ok')
		return true
  } catch (err) {
		console.log('remove file error')
    console.error(err)
  }
}


async function test(){
	var ret = await myRemoveFile(filePath)
	console.log(ret)
}

lineReader.eachLine(filePath, function(line, last) {
  console.log(line);
	console.log(last);
  if (/* done */ last == true) {
    return false; // stop reading
  }
});

console.log('myfile.js已准备好')
