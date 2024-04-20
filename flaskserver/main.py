from flask import Flask, jsonify, request, redirect
import pandas as pd
import xgboost as xgb
import joblib
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins=['http://localhost:5173','http://localhost:5173'])

model = xgb.Booster()
model.load_model('model.bst')
sc = joblib.load('scaler1.pkl')
# inference_dict = {
#     'longitude': 78.534042,
#     'latitude': 14.724026,
#     'Hour': 19,
#     'Second': 42,
#     'Day_of_Week': 5.0
# }

# df_main = pd.DataFrame(inference_dict, index=[0])
# df_main = xgb.DMatrix(df_main)

@app.route('/')
def hello_world():
    # return "Hello World!"
    inference_dict = {
            'longitude': 11.101010,
            'latitude': 16.101010,
            'Hour': 17,
            'Seconds': 42,
            'Day_of_Week': 5.0
        }

    df_main = pd.DataFrame(inference_dict, index=[0])
    df_main = xgb.DMatrix(df_main)
    float_value = float(model.predict(df_main)[0])
    # Return the float value as JSON
    return jsonify(float_value=float_value)


@app.route('/model_inference', methods = ["GET", "POST"])
def inference():
    # pass
    # print(request.method)
    now=datetime.now()
    if request.method == "POST":
        lat = request.json['lat']
        long = request.json['long']
        hour = request.json['hour'] 
        minutes = request.json['minutes']
        day_of_week = request.json['day_of_week']
        

        inference_dict = {
            'longitude': lat,
            'latitude': long,
            'Hour': hour,
            'Second': minutes,
            'Day_of_Week': day_of_week
        }

        df_main = pd.DataFrame(inference_dict, index=[0])

        #scaling the values
        # df_main = sc.transform(df_main)

        #converting to DMatrix format
        df_main = xgb.DMatrix(df_main)

        float_value = float(model.predict(df_main)[0])
        # Return the float value as JSON
        return jsonify(float_value=float_value)
    # return jsonify(request.json)
    
    else:
        raise ValueError


# @app.route('/predict')
# def predict():
#     result = {'prediction': str(model.predict(df_main)[0])}
#     return jsonify(result)




# print(model.predict(df_main)[0])



if __name__ == "__main__":
    app.run(debug=True)