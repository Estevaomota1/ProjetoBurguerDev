const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Middleware para parsing de JSON

app.post('/orders', (req, res) => {
    const order = req.body;

    console.log('Pedido recebido:', order);

    // Aqui você pode processar o pedido e salvar no banco de dados, se necessário

    // Simulando uma resposta de sucesso
    res.status(200).json({ message: 'Pedido recebido com sucesso!' });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta ${PORT}`);
});
