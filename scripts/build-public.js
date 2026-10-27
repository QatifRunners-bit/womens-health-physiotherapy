import {mkdir,rm,copyFile,cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
export async function buildPublic(destination='dist') {
  const root=fileURLToPath(new URL('../',import.meta.url));
  const target=resolve(root,destination);
  if (target===resolve(root)) throw Error('Build destination must not be the source root');
  await rm(target,{recursive:true,force:true});
  await mkdir(join(target,'assets'),{recursive:true});
  for(const file of ['index.html','admin.html','.nojekyll'])await copyFile(join(root,file),join(target,file));
  for(const file of ['patient.js','patient.css','patient-state.js','questions.js','scoring.js'])await copyFile(join(root,'assets',file),join(target,'assets',file));
  await cp(join(root,'assets/fonts'),join(target,'assets/fonts'),{recursive:true});
  return target;
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log(await buildPublic());
