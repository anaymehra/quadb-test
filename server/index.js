import express from 'express';
import db from "./db.js";
import cors from "cors"
import axios from 'axios';


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
db.connect();

app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const data = Object.entries(response.data).slice(0,10)
    // tapping into the data that we need:
      const formattedData = data.map(([name, details]) => ({
        name: details.name,
        last: details.last,
        buy: details.buy,
        sell: details.sell,
        volume: details.volume,
        base_unit: details.base_unit,
      }));
      
    // console.log(formattedData);
    // Inserting data into the PostgreSQL database
      await Promise.all(
        formattedData.map(async (item) => {
          await db.query(
            'INSERT INTO hodlinfo (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
            [item.name, item.last, item.buy, item.sell, item.volume, item.base_unit]
          );
        })
      );
      res.json(formattedData);

    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  });

app.listen(port, () => {
    console.log("Server running on port: " + port)
})


