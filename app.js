const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Set the content type to SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Parse the URL to get the 'text' parameter
    const queryObject = url.parse(req.url, true).query;
    const s = queryObject.text || '';

    // Check if s is not empty
    if (s.trim() !== '') {
        const l = s.split('');
        const lst = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];

        let n = 0;
        let result = '';

        function sendResult(data) {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }

        while (n < l.length) {
            for (const i of lst) {
                if (l[n] === i) {
                    result += i;
                    sendResult({ result });
                    break;
                } else {
                    // You can remove this else block if you don't need to log intermediate results
                    sendResult({ result: result + i });
                }
            }
            n++;
        }

        // Final result
        sendResult({ result });
    } else {
        // Output an error message if s is empty
        res.end(`data: ${JSON.stringify({ error: 'Text parameter is empty' })}\n\n`);
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});