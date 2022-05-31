var qr = require('qr-image');
const {FileBox} = require('file-box');


var img = qr.image('1234567890', { type: 'png', size:5, margin:1 });


console.log(img);
const fileBox1 = FileBox.fromStream(img,'123456.png');
fileBox1.toFile('12345678.png');
