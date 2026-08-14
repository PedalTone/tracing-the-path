import { readFileSync, writeFileSync } from "node:fs";

const source = process.argv[2];
const destination = process.argv[3];

if (!source || !destination) {
  throw new Error("Usage: node scripts/build-transcript.mjs <whisper.json> <output.json>");
}

const transcript = JSON.parse(readFileSync(source, "utf8"));

const corrections = [
  [/Alexander Matvievich[- ]Pontyov/gi, "Alexander M. Poniatoff"],
  [/Alexander Matveevich[- ]Pontyov/gi, "Alexander M. Poniatoff"],
  [/Alexander Pontyov/gi, "Alexander Poniatoff"],
  [/Pontyaf/gi, "Poniatoff"],
  [/Pontyov/gi, "Poniatoff"],
  [/Douglas Kendall/gi, "Donald Kendall"],
  [/Stulichnaya/gi, "Stolichnaya"],
  [/Stulichnia/gi, "Stolichnaya"],
  [/stiliknya/gi, "Stolichnaya"],
  [/Stolle\b/g, "Stoli"],
  [/Barry Oldfield/gi, "Barney Oldfield"],
  [/Charles Goth/gi, "Charles Guth"],
  [/\bGoth\b/g, "Guth"],
  [/\bKoch\b/g, "Coke"],
  [/McDonald Douglas/gi, "McDonnell Douglas"],
  [/dearming/gi, "disarming"],
  [/Moiseyev Dance Troupe/gi, "Moiseyev Dance Company"],
  [/Raskaya-Tetara/gi, "Russkaya Aysha"],
  [/Kino chronica/gi, "Kinokhronika"],
  [/Alexander Matviev Poniatoff/gi, "Alexander M. Poniatoff"],
  [/Poniatoff A\.M\.P\./g, "Poniatoff's initials, A.M.P.,"],
];

function clean(text) {
  let result = text.trim().replace(/\s+/g, " ");
  for (const [pattern, replacement] of corrections) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

const segments = transcript.transcription.map((segment, index) => ({
  id: index,
  start: Math.round(segment.offsets.from / 10) / 100,
  end: Math.round(segment.offsets.to / 10) / 100,
  text: clean(segment.text),
}));

writeFileSync(
  destination,
  `${JSON.stringify({
    episode: 82,
    title: "When Pepsi Cracked the Iron Curtain",
    host: "Dan R. Morris",
    duration: 2502.38,
    generatedBy: "whisper.cpp small.en",
    reviewStatus: "Machine transcript with manually reviewed proper-name corrections",
    segments,
  }, null, 2)}\n`,
);

const textDestination = destination.replace(/\.json$/i, ".txt");
writeFileSync(
  textDestination,
  [
    "TRACING THE PATH — EPISODE 82",
    "When Pepsi Cracked the Iron Curtain",
    "Hosted and narrated by Dan R. Morris",
    "",
    "Machine transcript generated from the podcast audio; proper names manually reviewed.",
    "",
    ...segments.map((segment) => {
      const minutes = Math.floor(segment.start / 60);
      const seconds = Math.floor(segment.start % 60).toString().padStart(2, "0");
      return `[${minutes}:${seconds}] ${segment.text}`;
    }),
    "",
  ].join("\n"),
);

function vttTime(seconds) {
  const totalMs = Math.round(seconds * 1000);
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const secs = Math.floor((totalMs % 60_000) / 1000);
  const ms = totalMs % 1000;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
}

writeFileSync(
  destination.replace(/\.json$/i, ".vtt"),
  `WEBVTT\n\n${segments.map((segment) => `${segment.id + 1}\n${vttTime(segment.start)} --> ${vttTime(segment.end)}\n${segment.text}\n`).join("\n")}`,
);
