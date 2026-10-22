# Local fonts

Cormorant Garamond (regular and italic, weight 400) and Manrope (variable weight 200–800) are Latin WOFF2 builds downloaded from Fontsource's jsDelivr CDN. Both are distributed under the SIL Open Font License 1.1; original license files are included here. No font package is installed.

Sources: [Cormorant Garamond](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), and [Fontsource](https://fontsource.org/).

The combined binary payload is 71,372 bytes. `next/font/local` self-hosts these files, supplies fallback metrics, and uses font-display swap. Regular and italic display faces plus one body variable face are sufficient for the current design. Add other language subsets only after confirming language requirements; fallbacks render characters outside Latin coverage.
