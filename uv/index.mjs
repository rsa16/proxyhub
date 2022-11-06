import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
import fs from 'fs'

const bare =  createServer('/bare/');
const serve = new nodeStatic.Server('static/');


const server = http.createServer();

server.on('request', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (bare.shouldRoute(req)) {
		  bare.routeRequest(req, res);
	  } else {
      serve.serve(req, res);
	}	
});

server.listen({
	port: process.env.PORT || 8080,
});
