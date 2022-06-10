/*
 * @Author: houbb
 * @Date: 2022-06-09 17:59:53
 * @LastEditTime: 2022-06-09 20:01:40
 * @LastEditors: houbb
 * @Description: 
 */
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import fs from 'fs';

const root = process.cwd();

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
      var fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {      
          readFileList(path.join(dir, item), filesList);  //递归读取文件
      } else {                
          filesList.push(fullPath);                     
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
  const dir = path.join(root, './data');
  readFileList(dir,filesList);
  const result = []
  for (let i = 0; i< filesList.length; i++) {
    result.push(await getFileBySlug(filesList[i]));
  }

  return result;

}
