__version__ = "0.6.1"

from .data import get_example_data_dir
from .browser import GenomeBrowser
from .utils import (parse_gff,
                    get_default_glyphs,
                    default_attributes
                   )
from bokeh.io import output_notebook
output_notebook(hide_banner=True) 