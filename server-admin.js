const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Para resolver caminhos de arquivos

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta "admin-dashboard"
app.use(express.static(path.join(__dirname, 'admin-dashboard')));

// Definindo rotas
app.get('/', (req, res) => {
  // Envia o arquivo HTML como resposta
  res.sendFile(path.join(__dirname, 'admin-dashboard', 'adminDashboard.html'));
});

app.post('/api/orders', (req, res) => {
  const order = req.body;
  console.log('Order received:', order);
  res.json({ status: 'success', order });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
