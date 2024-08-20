# Test lyrx to sld test project
A quick project to compare the result of the legacy project
"lyrx2sld" to the new Geostyler-lyrx-parser.

# How to use it

```bash
npm install
npm test
```

You'll also have to:
 - Convert a file with the lyrx2sld project, and add the input (`.lyrx`), outputs (GeoStyler `.json`, and `.sld`) in
   the `test/data` folder.
 - Tweak the test file to read your new files.

Eventually, update the package.json dependencies, notably the geostyler-lyrx-parser dependency.