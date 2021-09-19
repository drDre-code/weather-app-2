import express from 'express';
import cors from 'cors';
import { forecast } from './utils/forecast';

const app = express();


app.use(cors());

app.get('/', (req, res) => {
  const { longitude, latitude } = req.query;
  if (!longitude || !latitude) {
    return res.status(404).send({
      errorMessage: 'You must provide an address'
    });
  }

  forecast(+latitude, +longitude, (error: string | undefined, statusCode: number, forecastData: { [key: string]: string; } | undefined) => {
    if (error) {
      return res.status(statusCode).send({ errorMessage: error });
    }
    res.send({ ...forecastData });
  });
});



export default app;
