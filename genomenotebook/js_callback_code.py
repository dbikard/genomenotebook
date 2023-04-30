import os


def get_js_code(js_file):
    # Get the path of the current Python module
    module_path = os.path.abspath(__file__)

    # Construct the path to the file you need to open
    file_path = os.path.join(os.path.dirname(module_path), f"javascript/{js_file}")

    # Open the file and read its contents
    with open(file_path, 'r') as handle:
        return ''.join(handle.readlines())

x_range_change_callback_code=get_js_code("x_range_change_callback_code.js")
search_callback_code=get_js_code("search_callback_code.js")
track_callback_code=get_js_code("track_callback_code.js")


def get_example_data_dir():
    """
    Return the path to the example_data directory.
    """
    return os.path.join(os.path.dirname(__file__), 'data')