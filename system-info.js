import os from 'node:os';
import ms from 'ms';
// import os from 'os';

const systemInfo = {
  platform: os.platform(),
  cpuArch: os.arch(),
  cpuCores: os.cpus().length,
  totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024)),
  freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
  homeDir: os.homedir(),
  // uptimeMinutes: Math.round(os.uptime() / 60),
  uptimeMinutes: ms(os.uptime() * 1000, { long: true }),
  timezoneOffset: new Date().getTimezoneOffset(),
  hostname: os.hostname(),
  release: os.release(),
  // CPUs: os.cpus(),
  // .map((cpu, index) => ({
  //   model: cpu.model,
  //   speed: cpu.speed,
  // })),
};

console.log('System Information:', systemInfo);
