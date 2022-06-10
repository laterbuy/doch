#!/usr/bin/env node
const { spawn } = require('child_process');

const run = (argv) => {
  if (argv[2] === 'dev') {
    const result = spawn('npm run dev', {
      stdio: 'inherit',
      shell: process.platform === 'win32'
     });
    result.on('data', (chunk) => {
      console.log(chunk.toString())
    })
  } else {
    console.log(`unsupport ${argv[2]}`);
  }
};

run(process.argv);
