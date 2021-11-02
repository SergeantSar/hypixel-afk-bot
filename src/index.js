const app = require('./Application');

app
  .register()
  .then(() => {
    app.connect();
  })
  .catch(err => {
    console.error(err);
  });