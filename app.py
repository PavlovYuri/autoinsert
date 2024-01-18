from flask import Flask, request, jsonify
from utils import get_answer

app = Flask(__name__)

@app.route("/objects", methods=["POST"])
def take_objects():
    data = request.get_json()
    answer = get_answer(data)
    response = jsonify(answer)
    response.status_code = 200
    return response 

if __name__ == "__main__":
    app.run(port=7000)