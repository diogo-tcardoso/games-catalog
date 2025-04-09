import express from 'express';
import principalTableRouter from './src/routes/principal-table';

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', principalTableRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})