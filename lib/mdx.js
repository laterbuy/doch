/*
 * @Author: houbb
 * @Date: 2022-06-09 17:59:53
 * @LastEditTime: 2022-07-11 17:43:19
 * @LastEditors: houbb
 * @Description:
 */
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import fs from 'fs';

const root = process.cwd();

const configPath = path.join(root, '../doch.json')

const readJson = (configPath) => {
  let json = {}
  try {
    const result = fs.readFileSync(configPath).toString()
    json = JSON.parse(result)
  } catch (e) {
    console.info(`not found doch.json`)
  }
  return json;
}

const configSrc = readJson(configPath) || '';

const src = path.join(root, `../${configSrc}`)

const ignorePaths = ['node_modules', '.next', '.umi', '.umi-production'];

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    if (ignorePaths.includes(item)) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readFileList(path.join(dir, item), filesList);  //递归读取文件
      } else {
        filesList.push(fullPath);
      }
    }

  });
  return filesList;
}

export async function getFileBySlug(mdPath) {
  const source = fs.readFileSync(mdPath, 'utf8');
  const { code, frontmatter } = await bundleMDX({ source });
  return { mdxSource: code, frontmatter }

}

export async function getAllFiles() {
  const filesList = [];
  const dir = path.join(src, `data`);
  readFileList(dir, filesList);

  const result = []
  for (let i = 0; i < filesList.length; i++) {
    if (filesList[i].endsWith('.mdx')) {
      result.push(await getFileBySlug(filesList[i]));
    }
  }
  return result;
}
