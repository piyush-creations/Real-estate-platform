from flask import Flask, request
from flask.json import jsonify
import engine

app = Flask(__name__)


# request data: {
#     "id": "2389157937597",
#     "propertyType": "House",
#     "Location": "beniganj",
#     "Price": 6000475,
#     "Bedrooms": 3,
#     "Bathrooms": 2
# },

@app.post("/recommendation")
def recommendation_api():
    try:
        # Get JSON data from request
        data = request.get_json()        
        if not data:
            return jsonify({"error": "Invalid JSON"}), 400
        recomms = engine.get_recommendations(data, n_recommend=len(data) - 1)
        return jsonify(recomms), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
