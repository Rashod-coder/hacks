from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.modelselection import traintestsplit
from sklearn.linearmodel import LinearRegression

app = Flask(name)

dataset = pd.read_csv('carrot_data.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [2])], remainder='passthrough')
X = np.array(ct.fit_transform(X))
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

regressor = LinearRegression()
regressor.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    pounds = float(data['pounds'])
    day_of_week = int(data['day_of_week'])
    seasonal_yield = float(data['seasonal_yield'])
    user_input = np.array([[day_of_week, seasonal_yield, pounds]])
    prediction = regressor.predict(user_input)
    return jsonify({'prediction': prediction[0]})

if __name == '__main':
    app.run(debug=True)