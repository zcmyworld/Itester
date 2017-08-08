let path = require('path');
let spawn = require('child_process').spawn
let nixJsonAPIScript = path.join(__dirname, '../linux_json_api.sh');

/**
 * arp_cache 高速缓存
 * bandwidth 带宽
 * common_applications 公共应用
 * cpu_info CPU信息,型号,核数等
 * cpu_intensive_processes 进程cpu状态
 * cpu_temp CPU温度
 * cpu_utilization CPU使用
 * cron_history 定时任务
 * current_ram 当前内存 RAM USAGES
 * disk_partitions 硬盘分区
 * docker_processes docker进程
 * download_transfer_rate 下载速率
 * general_info 基础信息
 * io_stats 硬盘信息
 * ip_addresses ip地址
 * load_avg CPU AVG LOAD CPU 平均负载
 * logged_in_users 用户登陆时间
 * memcached
 * memory_info 内存信息
 * network_connections 网络连接数
 * number_of_cpu_cores cpu核数
 * ping ping状态
 * pm2_stats
 * ram_intensive_processes 进程内存状态
 * recent_account_logins 系统最近登陆的用户
 * redis
 * scheduled_crons 定时任务
 * swap 交换内存
 * upload_transfer_rate 上传速率
 * user_accounts 系统用户帐号
 */

class System {
  async cpu_temp() {
    let rs = await getPluginData('cpu_temp');
    return rs.output[0];



  }

  async cpu_utilization() {
    let rs = await getPluginData('cpu_utilization');
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

// let co = require('co');
// co(async function () {
//   await module.exports.cpu_utilization();
// })