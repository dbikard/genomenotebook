__version__ = "0.8.10"

from .data import get_example_data_dir
from .browser import GenomeBrowser, GenomeStack
from .utils import (parse_gff,
                    inspect_feature_types,
                    download_file
                   )
from .glyphs import (get_default_glyphs, 
                    get_feature_patches, 
                    Glyph, 
                    default_attributes,
                    )
from bokeh.io import output_notebook

from . import javascript as _js

output_notebook(hide_banner=True) 