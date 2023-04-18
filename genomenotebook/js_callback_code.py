import os

# Get the path of the current Python module
module_path = os.path.abspath(__file__)

# Construct the path to the file you need to open
file_path = os.path.join(os.path.dirname(module_path), "javascript/x_range_change_callback_code.js")

# Open the file and read its contents
with open(file_path, 'r') as handle:
    x_range_change_callback_code = ''.join(handle.readlines())

# Construct the path to the file you need to open
file_path = os.path.join(os.path.dirname(module_path), "javascript/search_callback_code.js")

with open(file_path, 'r') as handle:
    search_callback_code =''.join(handle.readlines())

def reload():
    pass