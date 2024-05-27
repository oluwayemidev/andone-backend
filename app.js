const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { createServer } = require('http');
const { Server } = require('socket.io');

connectDB();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Ensure upload directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Static route for serving uploaded images
app.use('/uploads', express.static(uploadDir));

// Routes
// Make sure to place middleware before routes that require it
const quotationRoutes = require('./routes/quotations');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const solarCalculationRoutes = require('./routes/solarCalculation');

app.use('/api/quotations', quotationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static(uploadDir));
app.use('/api/solarCalculations', solarCalculationRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
  socket.on('sendMessage', (message) => {
      io.emit('message', message);
  });
});

// Catch-all route to serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
