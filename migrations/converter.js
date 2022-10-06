import fs from 'fs';
import util from 'util';

let result = [];
const str = fs.readFileSync('data.csv', 'utf-8').replace(/\n/g, '');

str.split('),').forEach((line,i) => {
  // if (i < 7) return
  // console.log('line:', line)
  const parsed = line.replace('(', '').trim().split(/',|L,/);

  // console.log('parsed:', parsed, parsed.length)


  const trimmed = parsed.map((s) => {
    let t = s.trim();
    if (t[0] === "'") t = t.substring(1);
    if (t[t.length - 1] === "'") t = t.substring(0, t.length - 1);
    return t
  });
  // console.log('trimmed:', trimmed)


  const obj = {
    order: i + 1,
    keyWords: trimmed[0] + ', ' + trimmed[1],
    description: trimmed[2],
    partOfSpeech: trimmed[3],
    lexicalGroup: trimmed[4],
    characteristic: trimmed[5]
  }
  console.log(obj)
  result.push(obj);
  // if(i >= 8) process.exit()

})

result.forEach((obj, i) => {
  obj.keyWords = obj.keyWords.replace(', NUL','').substring(3).trim();
  if (obj.keyWords[0] === "'") obj.keyWords = obj.keyWords.substring(1);
})

console.log(result.length)
fs.writeFileSync('./output.json', util.inspect(result));
