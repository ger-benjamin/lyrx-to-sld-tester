import { expect, test } from 'vitest';
import { readFileSync } from "fs";
import { LyrxParser } from "geostyler-lyrx-parser";
import SldStyleParser from 'geostyler-sld-parser';
import xmlFormat from 'xml-formatter';
import {Style} from "geostyler-style";

const lyrxFolder = "./test/data/"
const expectedFolder = "./test/data/"
const lyrxParser = new LyrxParser();
const sldStyleParser = new SldStyleParser({sldVersion: '1.1.0'});

const lyrxFileToGeoStyler = async (fileName: string): Promise<Style> => {
  const lyrxFile = readFileSync(`${lyrxFolder}${fileName}`, 'utf-8');
  const lyrxJson = JSON.parse(lyrxFile);
  const result = await lyrxParser.readStyle(lyrxJson);
  if (result.warnings.length) {
    console.warn('From Lyrx reader: ');
    console.warn(result.warnings)
  }
  return result.output as Style;
}

const geoStylerStyleToSLD = async (geoStylerStyle: Style): Promise<string> => {
  const result = await sldStyleParser.writeStyle(geoStylerStyle!);
  if (result.warnings?.length) {
    console.warn('From SLD writer: ');
    console.warn(result.warnings);
  }
  return result.output ?? '';
}

const readExpectedFile = (fileName: string): string => {
  return readFileSync(`${expectedFolder}${fileName}`, 'utf-8');
}

test('lyrx 2 sld', async () => {
  const geoStylerStyle = await lyrxFileToGeoStyler('alg_wtkwildkorr_01.lyrx');
  const sldStyle = await geoStylerStyleToSLD(geoStylerStyle);
  const sldExpected = readExpectedFile('alg_wtkwildkorr_01.sld');
  expect(xmlFormat(sldStyle!)).toEqual(xmlFormat(sldExpected));
})
