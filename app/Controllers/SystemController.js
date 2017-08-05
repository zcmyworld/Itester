
let spawn = require('child_process').spawn
let path = require('path');
let nixJsonAPIScript = path.join(__dirname, '../linux_json_api.sh')
console.log(nixJsonAPIScript)

class SystemController {
  async cputemp(ctx) {
    let rs = await getPluginData('cpu_temp');
    ctx.body = {
      data: rs.output
    }
  }

}


async function getPluginData(pluginName) {
  return new Promise((resolve, reject) => {
    let command = spawn(nixJsonAPIScript, [pluginName, ''])
    let output = []

    command.stdout.on('data', function (chunk) {
      output.push(chunk.toString())
    })

    command.on('close', function (code) {
      resolve({
        code: code,
        output: output
      })
      // callback(code, output)
    })
  })
}


var respondWithData = function (code, output) {
  console.log(code)
  console.log(typeof output)
  console.log(output)
}


// getPluginData('cpu_temp', respondWithData)

module.exports = new SystemController();