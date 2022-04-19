const app = require('./app');
require('./db/db');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
