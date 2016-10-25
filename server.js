var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  user: 'petgoldfish',
  database: 'petgoldfish',
  host: 'db.imad.hasura-app.io',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
  'article-one': {
    title: 'Article One! Raghav Sai',
    heading: 'Article One',
    date: 'Sep 5, 2016',
    content: `
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, eligendi.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, eligendi.
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id cupiditate ipsam at, voluptate ex neque. Quis culpa necessitatibus numquam? Reiciendis.
              </p>`
  },
  'article-two': {
    title: 'Article Two! Raghav Sai',
    heading: 'Article Two',
    date: 'Sep 5, 2016',
    content: `
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat provident, deserunt, et quaerat perspiciatis mollitia possimus! Laboriosam nobis ipsa quis quo numquam, tenetur veniam quaerat blanditiis, cupiditate dicta est earum pariatur. Optio minima at perferendis maiores consequuntur ad aut perspiciatis omnis qui, vero, autem minus illum beatae vitae eum delectus!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam nesciunt nulla incidunt iusto consectetur beatae sapiente ipsum tenetur, vero numquam.</p>`
  },
  'article-three': {
    title: 'Article Three! Raghav Sai',
    heading: 'Article Three',
    date: 'Sep 6, 2016',
    content: `
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet id quia commodi nisi aliquam iusto architecto nemo in quis voluptatem!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda voluptates beatae mollitia exercitationem vel ab ad et minima, fuga laborum, illum id cupiditate veniam vitae delectus nesciunt debitis magni.</p>`
  }
};

function createTemplate(data) {
  var title = data.title;
  var date = data.date;
  var heading = data.heading;
  var content = data.content;
  var htmlTemplate = `
  <html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="/ui/style.css" rel="stylesheet" />
      </head>
      <body>
          <div class="container">
              <div>
                  <a href="/">Home</a>
              </div>
              <hr/>
              <h3>${heading}</h3>
              <div>
                  ${date}
              </div>
              <div>
                  ${content}
              </div>
          </div>
      </body>
  </html>
  `;
  return htmlTemplate;
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config)
app.get('/test-db', function(req, res){
    // create the pool somewhere globally so its lifetime
    // lasts for as long as your app is running
    pool.query('SELECT * from test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    })
});

var counter = 0;
app.get('/counter', function(req, res) {
  counter = counter+1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) {
  // GEt name from req
  var name;
  names.push(req.query.name);
  // JSON time
  res.send(JSON.stringify(names));
});

app.get('/ui/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName', function(req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function() {
  console.log(`IMAD course app listening on port ${port}!`);
});