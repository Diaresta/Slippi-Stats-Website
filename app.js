// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

// Static Files
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routing
app.get(['/', '/home'], (req, res) => res.render('SOMETHING', {
  title: 'Whatever title';
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
