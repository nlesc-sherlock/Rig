import nbformat as nbf
import nbformat.v4 as nbf4

def generate_notebook(workflow, output_path):
    #Define output
    nb_out = nbf4.new_notebook()
    cells_out = []

    #Add Preamble
    preamble_file = "./blocks/preamble.ipynb"
    with open(preamble_file, 'r') as f:
        preamble = nbf.read(f, 4)
        cells_out.extend(preamble['cells'])

    #Add all cells in the list
    last_output = None
    for block in workflow:
        name = block["name"]
        cell = block['block']
        metadata = cell.get('metadata', {})
        namecell = "## %s" % name
        cells_out.append(nbf4.new_markdown_cell(namecell))

        #create the input
        code_input = '%s = %s \n' % (metadata.get('input', 'input'), last_output)
        cells_out.append(nbf4.new_code_cell(code_input))

        #Create the arguments
        code_arguments = ""
        arguments = metadata.get('arguments', [])
        for argument in arguments:
            val = metadata['values'][argument]
            code_arguments += ("%s = %s \n" % (argument, val))
        if len(arguments) > 0:
            cells_out.append(nbf4.new_code_cell(code_arguments))
        code_arguments

        #append the actual cell
        cells_out.append(nbf4.new_code_cell(cell["source"]))
        last_output = metadata.get('output', None)

    nb_out['cells'] = cells_out
    with open(output_path, 'w') as f:
        nbf.write(nb_out, f, version=4)

    return output_path
