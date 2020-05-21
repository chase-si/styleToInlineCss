const fs = require('fs');
const { parse } = require('node-html-parser');

const { handleCssContextToObject, addStyleToDom } = require('./untils');

const writeFile = (path, jsonstring) => {
	let streamWrite = fs.createWriteStream(path);
	streamWrite.write(jsonstring);
	streamWrite.end();
	streamWrite.on('error', err => {
		throw err
	});
	// streamWrite.on('finish',()=>{
	//   cb();
	// });
};
 
const inputText = fs.readFileSync('./input.html', 'utf-8'); 
const inputTextDom = parse(inputText);

const cssContext = fs.readFileSync('./style.css', 'utf-8'); 
const cssObject = handleCssContextToObject(cssContext);

for (let [key, value] of Object.entries(cssObject)) {
  for (let dom of inputTextDom.querySelectorAll(key)) {
    dom = addStyleToDom(dom, value);
  };
}

writeFile('./output.html', inputTextDom.outerHTML);