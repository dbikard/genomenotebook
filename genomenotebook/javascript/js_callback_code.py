import os

def _get_js_path():
    """
    Return the path to the module directory.
    """
    return os.path.dirname(__file__)

def _get_js_code(js_file):
    # Get the path of the current Python module
    module_path = os.path.abspath(__file__)

    # Construct the path to the file you need to open
    file_path = os.path.join(os.path.dirname(module_path), js_file)

    # Open the file and read its contents
    with open(file_path, 'r') as handle:
        return ''.join(handle.readlines())





