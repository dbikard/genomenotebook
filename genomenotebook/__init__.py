__version__ = "0.5.4"

from .data import get_example_data_dir
from .browser import GenomeBrowser
from .utils import (get_genome_annotations, 
                    get_features_from_annotation, 
                    default_glyphs
                   )
from bokeh.io import output_notebook
output_notebook(hide_banner=True) 