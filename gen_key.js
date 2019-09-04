const fs=require('fs');

//一个key是1024，一共生成2048个key
const KEY_LEN=1024;
const KEY_COUNT=2048;
const CHARS='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?,./;[]{}!@#$%^&*()_+';

let arr=[];
for (let i=0;i<KEY_COUNT;i++){
    let key='';
    for (let j = 0; j <KEY_LEN; j++) {
        key+=CHARS[Math.floor(Math.random()*CHARS.length)];
    }
    arr.push(key);
}

fs.writeFileSync('.keys',arr.join('\n'));

console.log(`has generated ${KEY_COUNT} keys`);
