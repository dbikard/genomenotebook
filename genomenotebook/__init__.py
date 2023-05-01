__version__ = "0.5.0"

from .data import get_example_data_dir
from .browser import GenomeBrowser
from .utils import get_genome_annotations, get_genes_from_annotation
from bokeh.io import output_notebook
output_notebook(hide_banner=True) 