# Test lyrx to sld test project
A quick project to compare the result of the legacy project
"lyrx2sld" to the new Geostyler-lyrx-parser.

# How to use it

```bash
npm install
npm test
```

Then use an IDE to debug results. If the `lyrx` file is converted successfully to
`sld` (even if the test fail), you can check the output in ./test/sldResults.

You'll also have to:
 - Convert a file with the lyrx2sld project, and add the input (`.lyrx`), outputs (GeoStyler `.json`, and `.sld`) in
   the `test/data` folder.
 - Tweak the test file to read your new files.

Eventually, update the package.json dependencies, notably the geostyler-lyrx-parser dependency.

## Use another version of a parser

For instance, another version of the `geostyler-lyrx-parser` or `geostyler-sld-parser`.

If you want a not released version of a parser proceed like this:

 - git clone the wanted parser on your computer.
 - **build it** (probably `nom install` and `npm run build`)
 - At the root of the parser, run `npm link`
 - Go back in this project
 - Run `npm link `<previously-linked-parser>`

You can now see a symbolic link in the `node_modules` directory, that point to
the wanted parser.

If you modify the parser, don't forget to **build it** again.

