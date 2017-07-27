const express 		= require('express'),
			app 				= express(),
			bodyParser  = require('body-parser'),
			http 				= require('http'),
			morgan 			= require('morgan'),
			mongoose 		= require('mongoose'),
			cors 				= require('cors'),
			router 			= require('./router'),
			path 				= require('path');

// if (process.env.NODE_ENV === 'development') {
// 	mongoose.connect('mongodb://localhost:auth/medium-clone');
// } else {
// 	mongoose.connect('mongodb://mrhubo:mrhubo161@ds127163.mlab.com:27163/medium-clone')
// }

mongoose.connect('mongodb://localhost:auth/medium-clone');

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 6060;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);



