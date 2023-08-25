import http from 'http'
import { fetchData } from './api.js'
import url from 'url'
import querystring from 'querystring'

const routes = {
    "/weather": (req, res, query) => {
        res.writeHead(200, "{ 'Content-Type': 'text/html' }")
        if (!query.city) {
            res.write('Please provide a city in the url params')
            res.end()
            return
        }
        fetchData(query.city).then(data => {
            if (!data)
                res.write(`<h1>Please provide a supported city</h1`)
            else 
                res.write(`<h1>${data}</h1`)
            res.end()
        })
    },

}
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const query = querystring.parse(parsedUrl.query);
    for (let route in routes) {
        if (route === parsedUrl.pathname)
            return routes[route](req, res, query)

        show404(res)
    }
}).listen(process.env.PORT || 3000)

function show404(res) {
    res.writeHead(404, "{ 'Content-Type': 'text/html' }")
    res.write(`<h1>PAGE NOT FOUND</h1`)
    res.end()
}