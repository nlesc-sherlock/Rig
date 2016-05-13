from flask import Flask, jsonify, request
from flask.ext.cors import CORS, cross_origin
import pandas as pd
import codecs
import os
import sys
import json
import nbformat as nbf
import nbformat.v4 as nbf4
from generator import generate_notebook

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

selectedDatasetId = 0

@app.route('/')
@cross_origin(supports_credentials=True)
def hello():
    return jsonify({ 'columns':['#records'],
                     'data':[{'#records': VARS['original'].shape[0]}]})

@app.route('/inventory')
@cross_origin(supports_credentials=True)
def inventory():
    # Set selected dataset by the default to the first one
    return jsonify({ 'selected' : selectedDatasetId,
                     'columns':['Data Set Name', 'Information'],
                     'data':[{'Data Set Name':'Dataset 1', 'Information': 'Information data set 1'},
                             {'Data Set Name':'Dataset 2', 'Information': 'Information data set 2'}]})


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

@app.route('/setdata', methods=['POST'])
@cross_origin(supports_credentials=True)
def setdata():
    global selectedDatasetId
    data = json.loads(request.data)
    oldSelectedDatasetId = selectedDatasetId
    selectedDatasetId = data['index']
    print 'Changing selected data set from '  + str(oldSelectedDatasetId) + ' to ' + str(selectedDatasetId)
    return jsonify({'status': 'OK'})

@app.route('/generate', methods=['POST'])
@cross_origin(supports_credentials=True)
def generate():
    params = json.loads(request.data)
    input_path = "/data/enron_mail.seq"
    generated_file = generate_notebook(params.get('workflow',[]), input_path, './workflow/generated_notebook.ipynb')
    # TODO: return actual URL of generated notebook
    print generated_file
    return jsonify({ "notebook_url": generated_file })


@app.route('/suggestions', methods=['POST'])
@cross_origin(supports_credentials=True)
def suggestions():
    """Return task suggestions based on task name and user interaction.
    """
    blocks = []
    for fn in os.listdir('./blocks'):
        if os.path.isfile('./blocks/' + fn) and fn.endswith('.ipynb'):
            with open('./blocks/' + fn, 'r') as f:
                notebook = nbf.read(f, 4)
            for cell in notebook['cells']:
                metadata = cell.get('metadata', {})
                if metadata.get('type', '') == 'block':
                    blocks.append({ "notebook": fn,
                                    "name": metadata.get('blockname', 'untitled'),
                                    "block": cell })

    params = json.loads(request.data)
    mainScreenInteraction = params.get('mainScreenInteraction', {})
    topOfStack = params.get('topOfStack', {})
    # TODO: filter suggestions by parameters
    print blocks
    return jsonify({ 'suggestions': blocks })


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

    app.run(host='0.0.0.0', debug=True)
