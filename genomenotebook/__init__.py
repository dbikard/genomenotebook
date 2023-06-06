__version__ = "0.8.2"

from .data import get_example_data_dir
from .browser import GenomeBrowser
from .utils import (parse_gff,
                    default_attributes,
                    download_file
                   )
from .glyphs import get_default_glyphs, get_feature_patches, Glyph
from bokeh.io import output_notebook
output_notebook(hide_banner=True) 