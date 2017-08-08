
let spawn = require('child_process').spawn
let path = require('path');
let nixJsonAPIScript = path.join(__dirname, '../linux_json_api.sh')
let ToolTime = require('../Tools/time');
let SystemService = require('../Services/System');

class WsController {
  async cpu_temp(ctx) {
    let temp = await SystemService.cpu_temp();
    temp = parseFloat(temp)
    ctx.websocket.send(JSON.stringify({
      code: 0,
      data: {
        time: ToolTime.getTime(),
        temp: temp
      }
    }))
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



module.exports = new WsController();