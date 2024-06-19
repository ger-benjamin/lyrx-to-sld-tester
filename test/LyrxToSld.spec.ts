import { expect, test } from 'vitest';
import { readFileSync } from "fs";
import { LyrxParser } from "geostyler-lyrx-parser";
import SldStyleParser from 'geostyler-sld-parser';

test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});

test('lyrx 2 sld', async () => {
  const lyrxFile = readFileSync('./test/data/alg_wtkwildkorr_01.lyrx', 'utf-8');
  const lyrxJson = JSON.parse(lyrxFile);
  const lyrxParser = new LyrxParser();
  const {output: geoStylerStyle} = await lyrxParser.readStyle(lyrxJson);

  const sldStyleParser = new SldStyleParser({sldVersion: '1.1.0'});
  // const {output: sldStyle} = await sldStyleParser.writeStyle(geoStylerStyle.rules[0]);
  console.log(geoStylerStyle);
  const {output: sldStyle} = await sldStyleParser.writeStyle(geoStylerStyle!);

  console.log(sldStyle);
  const sldExpected = readFileSync('./test/data/alg_wtkwildkorr_01.sld', 'utf-8');
  expect(sldStyle).toEqual(sldExpected);
})
