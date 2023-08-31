const express = require('express');
const errorHandler = require('errorhandler');

const app = express();
const port = process.env.PORT || 3064;
console.log(port);

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        const code = err.code || 500;
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        });
    })
}



app.listen(port);