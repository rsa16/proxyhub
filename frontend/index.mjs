import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
import express from 'express';
import transformMiddleware from 'express-transform-bare-module-specifiers';
import bcrypt from 'bcrypt';
import session from 'express-session'
import path from 'path'
import { fileURLToPath, format } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bare =  createServer('/bare/');
const app = express();

const pwd = '$2b$06$MTqZ2eMbs.AtgKvLsKWTSengGoIZMI6iA1mu5rfTY4A10HBpqsVPW';

app.use((req, res, next) => {
	if (bare.shouldRoute(req)) bare.routeRequest(req, res);
	else next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: '123',
	resave: true,
	saveUninitialized: true
}))

app.use("/geogame", express.static("./static"));

app.get("/", (req, res) => {
	res.status(404)
})

app.get("/geogame/", (req, res) => {
	if (req.session.loggedIn)
	{
		res.sendFile(path.join(__dirname + "/home.html"))
	} else {
		res.redirect("/geogame/login")
	}
})

app.get("/geogame/login", (req, res) => {
	if (req.session.loggedIn === true)
	{
		res.redirect("/geogame")
	}
	else{
		res.sendFile(path.join(__dirname + "/login.html"));
	}
})

app.get("/geogame/auth", (req, res) => {
	if (req.session.loggedIn === true)
	{
		res.redirect(" /geogame")
	} else {
		res.redirect(format({
			pathname: "/geogame/login",
			query: {
				errorCode: 1
			}
		}));
	}
})
app.post("/geogame/auth", (req, res) => {
	let password = req.body.password;

	console.log(password);
	bcrypt.compare(password, pwd, function (err, result) {
		if (result)
		{
			req.session.loggedIn = true;
			console.log(req.session.loggedIn);
			res.redirect("/geogame")
		} else {
			req.session.loggedIn = false
			res.redirect(format({
				pathname: "/geogame/login",
				query: {
					errorCode: 0
				}
			}))
		}
	});
})

app.listen(8001);