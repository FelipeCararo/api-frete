require('dotenv/config');

const app = require('./app');

app.server.listen(process.env.PORT);
