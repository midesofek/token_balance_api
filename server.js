const app = require("./app");

const port = 3001;

app.listen(port, () => {
  console.log(`Listening to requests at http://localhost:${port}...`);
});

module.exports = { app };
