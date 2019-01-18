let express = require('express')
let bodyParser = require('body-parser');

let userRoutes = require("./routes/user")
let expenseRoutes = require("./routes/expense")

let app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});