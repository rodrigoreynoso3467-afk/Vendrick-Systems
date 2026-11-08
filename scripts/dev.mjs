import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const require = createRequire(import.meta.url);
let next;
try { next = require.resolve('next/dist/bin/next'); }
catch { console.error('Next.js is not installed. Stop other development servers and run npm ci successfully before npm run dev.'); process.exit(1); }
const args = process.argv.slice(2).filter(arg => arg !== '--strictPort').map(arg => arg === '--host' ? '--hostname' : arg);
const child = spawn(process.execPath, [next, 'dev', ...args], { stdio:'inherit', env:process.env });
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
child.on('error', error => { console.error(error.message); process.exit(1); });
