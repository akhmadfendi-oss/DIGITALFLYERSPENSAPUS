#!/usr/bin/env node
import { exec } from 'child_process';

const cmd = 'npx -y eslint@8 . --ext js,jsx --fix --report-unused-disable-directives --max-warnings 0';
console.log('Running:', cmd);

const p = exec(cmd, { cwd: process.cwd(), env: process.env });

p.stdout.pipe(process.stdout);
p.stderr.pipe(process.stderr);

p.on('exit', (code) => {
  if (code === 0) {
    console.log('\nauto-fix completed successfully.');
  } else {
    console.error(`\nauto-fix exited with code ${code}`);
  }
  process.exit(code ?? 0);
});
