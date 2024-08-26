from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/orders', methods=['POST'])
def receive_order():
    order = request.json
    print('Pedido recebido:', order)
    # Aqui você pode adicionar a lógica para salvar o pedido no banco de dados ou processá-lo
    return jsonify({'message': 'Pedido recebido com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
