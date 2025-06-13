import express from 'express';
import principalTableRouter from './src/routes/principal-table';
import systemsRouter from './src/routes/systems-table';
import genresRouter from './src/routes/genres-table';
import typesRouter from './src/routes/types-table';
import authRoutes from './src/routes/auth-routes';

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', principalTableRouter);
app.use('/api', systemsRouter);
app.use('/api', genresRouter)
app.use('/api', typesRouter);
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

