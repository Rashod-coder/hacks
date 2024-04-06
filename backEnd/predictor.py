from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Load the dataset
dataset = pd.read_csv('carrot_data.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

# Preprocess the data
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [2])], remainder='passthrough')
X = np.array(ct.fit_transform(X))
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Train the model
regressor = LinearRegression()
regressor.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    pounds = float(data['pounds'])
    day_of_week = [0] * 7 
    day_index = int(data['day_of_week'])
    day_of_week[day_index - 1] = 1 
    seasonal_yield = float(data['seasonal_yield'])
    user_input = np.array([[day_of_week, seasonal_yield, pounds]])
    prediction = regressor.predict(user_input)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(port=5001, debug=True)


    import requests

    url = 'http://localhost:5000/predict'
    data = {
        'pounds': 10,
        'day_of_week': 1,
        'seasonal_yield': 17
    }
    response = requests.post(url, json=data)
    print(response.json()) 