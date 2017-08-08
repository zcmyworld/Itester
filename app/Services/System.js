let path = require('path');
let spawn = require('child_process').spawn
let nixJsonAPIScript = path.join(__dirname, '../linux_json_api.sh');

class System {
  async cpu_temp() {
    let rs = await getPluginData('cpu_temp');
    return rs.output[0];

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

module.exports = new System();