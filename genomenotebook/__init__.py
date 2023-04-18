__version__ = "0.3.6"

from .js_callback_code import get_example_data_dir
from .browser import GenomeBrowser
from bokeh.io import output_notebook
output_notebook()
