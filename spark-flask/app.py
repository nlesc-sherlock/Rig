import os
from flask import Flask, jsonify
from pyspark import SparkContext, SparkConf
from pyspark.sql import SQLContext
import nbformat as nbf
import nbformat.v4 as nbf4

app = Flask(__name__)

conf = SparkConf().setAppName('csv viewer')
sc = SparkContext(conf=conf)
sqlContext = SQLContext(sc)
csv_file = '/user/shelly/panama/offshore_leaks_csvs/Entities.csv'
df = sqlContext.read.format('com.databricks.spark.csv').options(header='true', inferschema='true').load(csv_file)


@app.route('/table', methods=['GET'])
def table():
    try:
        result = df.select('name', 'status').limit(10).collect()
        return jsonify(result)
    except Exception as e:
        print(e)
        return e

@app.route('/run_notebook', methods=['POST'])
def run_notebook():
    params = json.loads(request.data)
    notebook = params.get('workflow',[])
    for cell in notebook.get('cells'):
        exec cell.get('source')
    return jsonify({ "output": final_output })


if __name__ == '__main__':
    try:
        app.run(port=os.environ.get('FLASK_PORT', 8080), host='0.0.0.0')
    finally:
        sc.stop()
