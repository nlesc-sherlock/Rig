from flask import Flask, jsonify, request
from flask.ext.cors import CORS, cross_origin
import pandas as pd
import codecs
import os
import sys
import json

try:
    from ConfigParser import SafeConfigParser, Error
except:
    from configparser import SafeConfigParser, Error

from data import split_on_column
from settings import APP_STATIC

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
@cross_origin(supports_credentials=True)
def records(input, start, end):
    return jsonify({ "columns": list(VARS[input].columns),
                     "data": [ row.to_dict() for (_,row) in VARS[input][start:end].iterrows() ]
                    })

@app.route('/sample/<int:nrows>/<input>/<output>')
def sample(nrows, input, output):
    VARS[output] = VARS[input].head(nrows)
    return jsonify({"#records": VARS[output].shape[0]})


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
    """Return the 10 first records."""
    records = []
    for idx, row in VARS['original'].head(10).iterrows():
        d = dict(row)
        d['date'] = str(d['date'])
        records.append(d)
    return jsonify({'columns': ['records'],
                    'data': [{'records': records}]})


@app.route('/suggestions', methods=['POST'])
def suggestions():
    """Return task suggestions based on task name and user interaction.
    """
    top_of_stack = request.values.get('topOfStack')
    interaction = request.values.get('mainScreenInteraction')

    with codecs.open(os.path.join(APP_STATIC, 'suggestions.json'), 'rb', encoding='utf-8') as f:
        suggestions = json.load(f)

    interaction_type = interaction.get('type')
    task_name = top_of_stack.get('type')

    if not task_name == 'all':
        suggestions = [s for s in suggestions if task_name == s['in']]

    if interaction is not None:
        suggestions = [s for s in suggestions if interaction in s['interaction']]

    return jsonify({'suggestions': suggestions})


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
