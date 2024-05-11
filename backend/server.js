const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/auth');
const candidateRouter = require('./routes/candidate');
const voterRouter = require('./routes/voter');
const voteRouter = require('./routes/vote');
const resultRouter = require('./routes/result');
const app = express()
const port = 8000

dotenv.config()

mongoose.connect(process.env.MONGODB)
.then(() => console.log("database connected"))
.catch((error) => console.log(error))

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}))

app.use(errorHandler);
app.use('/api/' , authRouter);
app.use('/api/candidates', candidateRouter);
app.use('/api/voters', voterRouter);
app.use('/api/votes', voteRouter);
app.use('/api/results', resultRouter);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || port, () => console.log(`app listening on port ${process.env.PORT}!`))