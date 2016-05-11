# IPython Notebooks with code blocks
To create a block, add a cell to a pyspark iPython notebook that does the task that it needs to do. Then add the metadata of that cell and copy from the metadata_template.json.
The fields of the metadata are the following:
- `type` : if the type is `block`, the cell is regarded as a block and put in the generated notebook.
- `input`: the variable name of the input spark DataFrame (optional)
- `output`: the variable name of the output spark DataFrame
- `arguments`: list of variable names that are arguments to your block
- `name`: (unique) name of the block


To test if your block works correctly, you can add cells to your Notebook that are not of type `block`. These are ignored in the Notebook generation.
