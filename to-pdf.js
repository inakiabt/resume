var phantomjs = require('phantomjs-prebuilt');
var program = phantomjs.exec(
	'./rasterize.js',
	'./resume.html',
	'./resume.pdf',
	'Letter'
);
program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);
