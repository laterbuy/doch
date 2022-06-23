#!/usr/bin/env node
const { execSync } = require('child_process');
const { resolve } = require('path');

const run = (argv) => {
  if (argv[2] === 'init') {
    const projectDir = resolve(__dirname, '../../doch');
    // 删除 node_modules
    execSync(`rm -rf ${projectDir}/node_modules`);
    // 拷贝当前项目到新的目录
    execSync(`cp -r ${projectDir} .doch`);
    process.chdir(`${process.cwd()}/.doch/`);
    const result = execSync(`npm i`);
    result.on('data', (chunk) => {
      console.log(chunk.toString())
    })
  } else if (argv[2] === 'dev') {
    process.chdir(`${process.cwd()}/.doch/`);
    const result = execSync(`npm run dev`, {
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
