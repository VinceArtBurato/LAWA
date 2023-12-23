// middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
     console.error(err.stack);
   
     if (res.headersSent) {
       return next(err);
     }
   
     if (err.name === 'UnauthorizedError') {
       return res.status(401).json({ error: 'Unauthorized' });
     }
   
     res.status(500).json({ error: 'Internal Server Error' });
   };
   
   module.exports = errorMiddleware;
   