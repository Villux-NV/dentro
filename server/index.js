const express = require('express');
const cors = require('cors');
const router = require('./routes');
const db = require('./models');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, no page found. :`(');
})


try {
  db.authenticate();
  db.sync();
  console.log('DB Connected!');
} catch (err) {
  console.log(`Unable to connect ${err}`);
}

const PORT = process.env.PORT || 3500;
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server not alive, ${err}`);
  } else {
    console.log(`Server Lives at ${PORT}!`);
  }
});

