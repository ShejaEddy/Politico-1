import express from 'express';
import router from './routes/route';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({
    status: 200,
    message: 'Politico Xpress',
}));

app.use('/api/v1', router);

app.listen(process.env.PORT || 8080, () => {
    console.log('Working');
});


export default app;