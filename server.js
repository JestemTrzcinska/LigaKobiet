const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/league', require('./routes/api/league'));
app.use('/api/season', require('./routes/api/season'));
app.use('/api/game', require('./routes/api/game'));
app.use('/api/club', require('./routes/api/club'));
app.use('/api/player', require('./routes/api/player'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
