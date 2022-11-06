import express from 'express';
import loginRoutes from './routes/login.routes';
import orderRoutes from './routes/order.routes';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

// Criar rotas aqui
app.use('/login', loginRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

export default app;
