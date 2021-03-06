
let spawn = require('child_process').spawn
let path = require('path');
let nixJsonAPIScript = path.join(__dirname, '../linux_json_api.sh')
console.log(nixJsonAPIScript)

class SystemController {
  async cputemp(ctx) {
    let rs = await getPluginData('cpu_temp');
    ctx.body = {
      code: 0,
      data: {
        cpu_temp: rs.output[0]
      }
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
    })
  })
}

module.exports = new SystemController();