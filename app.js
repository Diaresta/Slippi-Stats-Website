// Imports
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');
const { default: SlippiGame } = require('@slippi/slippi-js');
const PORT = process.env.PORT || 3000;

// Multer Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});

// Init Upload Var
const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('match');

// Check File Type
function checkFileType(file, cb) {
  // Allowed File Extensions
  const filetypes = /slp/;
  // Check Extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb('Slippi Files Only!');
  }
}

// Output file as JSON
function writeToFile(output) {
  fs.writeFileSync('static/json/stats.json', JSON.stringify(output));
  console.log('Finished writting stats to output.json!');
}

// Static Files
app.use(express.static(path.join(__dirname, 'static')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routing
app.get(['/', '/home'], (req, res) =>
  res.render('home', {
    title: 'Shine: SSBM Stats Viewer',
  })
);

app.get(['/match-upload', ''], (req, res) =>
  res.render('match-upload', {
    title: 'Shine: SSBM Stats Viewer',
  })
);

app.get(['/match-upload-demo', ''], (req, res) =>
  res.render('match-upload', {
    title: 'Shine: SSBM Stats Viewer',
    demo: 'demo',
  })
);

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('home', {
        error: err,
      });
    } else {
      if (req.file == undefined) {
        res.render('home', {
          error: 'No File Selected!',
        });
      } else {
        res.render('match-upload', {
          title: 'Shine: SSBM Stats Viewer',
        });
        const game = new SlippiGame('./public/uploads/match.slp');
        const settings = game.getSettings();
        const metadata = game.getMetadata();
        const stats = game.getStats();
        const frames = game.getFrames();
        const output = [];
        output.push(settings, metadata, stats);
        writeToFile(output);
      }
    }
  });
});

// Error Handling
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (res.status(err.status)) {
    res.render('error', {
      title: `Shine - ${err.status} Error`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
