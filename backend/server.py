from flask import Flask, jsonify
from flask.ext.cors import CORS, cross_origin
import pandas as pd
import codecs
import os
import sys

try:
    from ConfigParser import SafeConfigParser, Error
except:
    from configparser import SafeConfigParser, Error

from data import split_on_column

app = Flask(__name__)
CORS(app)


# Variable bindings. Maps strings to DataFrames.
VARS = {}


@app.route('/')
@cross_origin(supports_credentials=True)
def hello():
    return jsonify({ 'columns':['#records'],
                     'data':[{'#records': VARS['original'].shape[0]}]})


@app.route('/records/<input>/<int:start>/<int:end>')
def records(input, start, end):
    return VARS[input][start:end].to_json()


@app.route('/split/<col>/<input>/<output>')
def split(col, input, output):
    VARS[output] = split_on_column(VARS[input], col)
    return jsonify({"#records": VARS[output].shape[0]})


@app.route('/vars')
def vars():
    return jsonify({"vars": VARS.keys()})



@app.route('/query')
@cross_origin(supports_credentials=True)
def query():
    records = []
    for idx, row in data.head(10).iterrows():
        d = dict(row)
        d['date'] = str(d['date'])
        records.append(d)
    return jsonify({'records': records})


if __name__ == '__main__':
    conf = SafeConfigParser(allow_no_value=True)

    # Try reading files in the current directory first
    conf.read(['.rigrc', 'rigrc'])

    try:
        data_dir = conf.get('data', 'path')
    except:
        print('Please specify the data directory in a .rigrc (see README).')
        sys.exit()

    print('Loading data from {}'.format(data_dir))

    dfs = []
    for doc in os.listdir(data_dir):
        json_file = os.path.join(data_dir, doc)
        with codecs.open(json_file, 'rb', encoding='utf-8') as f:
            dfs.append(pd.read_json(f))
    VARS['original'] = pd.concat(dfs)

    print('Finished loading data')

    app.run(debug=True)
