const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json());

require('../public/routes/htmlRoutes')(app);
// require('../public/routes/apiRoutes')(app);


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  