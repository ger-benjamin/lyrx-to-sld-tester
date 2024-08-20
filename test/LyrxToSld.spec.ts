import { expect, test } from 'vitest';
import { readFileSync, statSync } from "fs";
import { LyrxParser } from "geostyler-lyrx-parser";
import SldStyleParser from 'geostyler-sld-parser';
import xmlFormat from 'xml-formatter';
import {Style} from "geostyler-style";

const lyrxFolder = "./test/data/";
const expectedFolder = "./test/data/";
const fileName = "afu_boriethbo_01";
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

const readLegacyGeoStylerStyle = (fileName: string): Record<string, any>|null => {
  const path = `${lyrxFolder}${fileName}`;
  const exists = statSync(path, {throwIfNoEntry:false});
  if (!exists) {
    return null;
  }
  return JSON.parse(readFileSync(path, 'utf-8'));
}

test('lyrx 2 sld', async () => {
  const geoStylerStyle = await lyrxFileToGeoStyler(`${fileName}.lyrx`);
  // See geoStyler diff
  const legacyLyrx2sldGeostylerStyle = readLegacyGeoStylerStyle(`${fileName}_legacy.json`);
  if (legacyLyrx2sldGeostylerStyle) {
    expect(geoStylerStyle).toEqual(legacyLyrx2sldGeostylerStyle);
  }
  const sldStyle = await geoStylerStyleToSLD(geoStylerStyle);
  const sldExpected = readExpectedFile(`${fileName}.sld`);
  expect(xmlFormat(sldStyle!)).toEqual(xmlFormat(sldExpected));
})
