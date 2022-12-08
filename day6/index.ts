import { readFileSync } from "fs";

const parseFile = () => {
  return readFileSync("./input.txt", "utf-8");
}

const findFirstMarker = (buffer: string, markerLength: number) => {
  let marker = markerLength;

  while (marker < buffer.length) {
    const section = buffer.slice(marker - markerLength, marker);

    if (!/(.).*\1/.test(section)) return marker;

    marker++;
  }
}

const data = parseFile();
const packetMarker = findFirstMarker(data, 4);
const messageMarker = findFirstMarker(data, 14);

console.log({packetMarker, messageMarker});