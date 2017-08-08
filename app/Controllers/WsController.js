
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
      connect_type: "cpu_temp",
      data: {
        time: ToolTime.getTime(),
        info: temp
      }
    }))
  }

  async cpu_utilization(ctx) {
    let info = await SystemService.cpu_utilization();
    info = parseFloat(info)
    ctx.websocket.send(JSON.stringify({
      connect_type: "cpu_utilization",
      data: {
        time: ToolTime.getTime(),
        info: info
      }
    }))
  }

  async load_avg(ctx) {
    let info = await SystemService.load_avg();
    ctx.websocket.send(JSON.stringify({
      connect_type: "load_avg",
      data: {
        time: ToolTime.getTime(),
        info: info
      }
    }))
  }

  async current_ram(ctx) {
    let info = await SystemService.current_ram();
    info = info.replace(/\\/g, '');
    info = JSON.parse(info);
    let rs = parseFloat(info.used / info.total);
    ctx.websocket.send(JSON.stringify({
      connect_type: "current_ram",
      data: {
        time: ToolTime.getTime(),
        info: rs
      }
    }))
    console.log(rs)
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