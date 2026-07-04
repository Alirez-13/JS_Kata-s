const express = require('express')
const routes = require('../../Routes')
const { sequelize } = require('../../models/User');

const app = express();

app.use(express.json());

app.use('/', routes);

const PORT = 3000;

async function startApp() {
  try {
    
    await sequelize.sync({ alter: true });
    console.log('SQLite Database synced successfully.');

    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
  }
}


startApp();