const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { protect, admin } = require('./middleware/authMiddleware');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Ensure upload directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Static route for serving uploaded images
app.use('/uploads', express.static(uploadDir));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const chatRoutes = require('./routes/chatRoutes')(io);
const quotationRoutes = require('./routes/quotations');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const solarCalculationRoutes = require('./routes/solarCalculation');

app.use('/api/chat', protect, chatRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', protect, admin, adminRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static(uploadDir));
app.use('/api/solarCalculations', solarCalculationRoutes);

app.use(notFound);
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ userId }) => {
    socket.join(userId);
  });

  socket.on('sendMessage', async (message) => {
    const { sender, receiver, content } = message;

    // Save message to database
    // Example:
    // const newMessage = new Message({ sender, receiver, content });
    // await newMessage.save();

    io.to(receiver).emit('message', { sender, content });
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
});

// Start Server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
