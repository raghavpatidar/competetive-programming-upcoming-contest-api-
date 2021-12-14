// const { scrape } = require('./codechef')
// const { codeforces } = require('./codeforces')
// codeforces();
// console.log('i ma here');
// // console.log(scrape);
// scrape();

const express = require('express');
const futureContest = require('./Future-Contest/routes/futureContest')
const app = express();

app.use('/api/future', futureContest);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
