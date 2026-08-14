"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const AUDIO_URL =
  "https://tracingthepath.podomatic.com/enclosure/2026-07-30T21_02_28-07_00.mp3?_=1785470552.17837128";
const DURATION = 2502;

type StoryBeat = {
  time: number;
  year: string;
  title: string;
  kicker: string;
  description: string;
  nodes: string[];
};

type MapNode = {
  id: string;
  label: string;
  type: "idea" | "place" | "event" | "thing" | "person";
  icon?: string;
  image?: string;
  x: number;
  y: number;
};

const storyBeats: StoryBeat[] = [
  {
    time: 0,
    year: "1950s",
    kicker: "The opening question",
    title: "Can a soft drink cross the Iron Curtain?",
    description:
      "The Cold War was fought with missiles and speeches—but also with supermarkets, television cameras, vodka, and a paper cup of Pepsi.",
    nodes: ["cold-war"],
  },
  {
    time: 190,
    year: "1959",
    kicker: "A stage is built",
    title: "America sends a kitchen to Moscow",
    description:
      "The American National Exhibition turns everyday consumer goods into an argument about which system can create a better life.",
    nodes: ["exhibition", "moscow", "cold-war"],
  },
  {
    time: 435,
    year: "1959",
    kicker: "A private tour becomes history",
    title: "Nixon and Khrushchev clash",
    description:
      "Inside a model American kitchen, two leaders turn washing machines, choice, and comfort into the famous Kitchen Debate.",
    nodes: ["nixon", "khrushchev", "exhibition"],
  },
  {
    time: 635,
    year: "1959",
    kicker: "The invisible connector",
    title: "Videotape lets the debate travel",
    description:
      "Ampex recording technology captures the encounter, allowing a moment in Moscow to become a shared media event.",
    nodes: ["ampex", "nixon", "khrushchev"],
  },
  {
    time: 880,
    year: "1959",
    kicker: "A small gesture, a large opening",
    title: "Khrushchev tastes Pepsi",
    description:
      "A paper cup turns an abstract contest between superpowers into a personal encounter with an ordinary American product.",
    nodes: ["pepsi", "khrushchev", "exhibition"],
  },
  {
    time: 1170,
    year: "1972",
    kicker: "Money cannot cross the border",
    title: "Pepsi and vodka solve a trade puzzle",
    description:
      "Because Soviet currency cannot be freely exchanged, Pepsi is paid through barter—opening the American market to Stolichnaya vodka.",
    nodes: ["pepsi", "vodka", "soviet-trade"],
  },
  {
    time: 1560,
    year: "1970s–80s",
    kicker: "Commerce finds a route",
    title: "A brand travels where politics struggles",
    description:
      "Bottling plants and consumer demand expand the relationship, making Pepsi a visible piece of everyday Soviet life.",
    nodes: ["pepsi", "soviet-trade", "moscow"],
  },
  {
    time: 1890,
    year: "1989",
    kicker: "The deal becomes unbelievable",
    title: "Pepsi acquires a navy",
    description:
      "A new barter agreement includes submarines and warships, briefly making a soft-drink company the owner of a startling fleet.",
    nodes: ["pepsi", "fleet", "soviet-trade"],
  },
  {
    time: 2200,
    year: "1991 → today",
    kicker: "The path turns back",
    title: "The opening closes again",
    description:
      "The Soviet Union dissolves, the commercial bridge changes shape, and a later Russian government reverses much of the openness that made it possible.",
    nodes: ["fleet", "putin", "cold-war"],
  },
];

const nodes: MapNode[] = [
  { id: "cold-war", label: "Cold War", type: "idea", image: "cold-war.jpg", x: 50, y: 8 },
  { id: "moscow", label: "Moscow", type: "place", image: "moscow-kremlin.jpg", x: 17, y: 24 },
  { id: "exhibition", label: "U.S. Exhibition", type: "event", image: "kitchen-debate.jpg", x: 50, y: 25 },
  { id: "ampex", label: "Ampex videotape", type: "thing", image: "ampex-videotape.jpg", x: 83, y: 24 },
  { id: "nixon", label: "Richard Nixon", type: "person", image: "richard-nixon.jpg", x: 28, y: 46 },
  { id: "khrushchev", label: "Nikita Khrushchev", type: "person", image: "nikita-khrushchev.jpg", x: 72, y: 46 },
  { id: "pepsi", label: "A cup of Pepsi", type: "thing", image: "vintage-pepsi-cans.jpg", x: 50, y: 60 },
  { id: "vodka", label: "Stolichnaya", type: "thing", image: "stolichnaya.jpg", x: 17, y: 73 },
  { id: "soviet-trade", label: "Barter deal", type: "idea", image: "barter.jpg", x: 83, y: 73 },
  { id: "fleet", label: "The Pepsi fleet", type: "thing", image: "pepsi-fleet.jpg", x: 34, y: 90 },
  { id: "putin", label: "Vladimir Putin", type: "person", image: "vladimir-putin.jpg", x: 70, y: 90 },
];

const connections = [
  ["cold-war", "moscow"], ["cold-war", "exhibition"], ["cold-war", "ampex"],
  ["moscow", "exhibition"], ["exhibition", "nixon"], ["exhibition", "khrushchev"],
  ["ampex", "nixon"], ["ampex", "khrushchev"], ["nixon", "pepsi"],
  ["khrushchev", "pepsi"], ["pepsi", "vodka"], ["pepsi", "soviet-trade"],
  ["vodka", "soviet-trade"], ["soviet-trade", "fleet"], ["fleet", "putin"],
  ["putin", "cold-war"],
] as const;

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const activeIndex = useMemo(() => {
    let index = 0;
    storyBeats.forEach((beat, i) => {
      if (currentTime >= beat.time) index = i;
    });
    return index;
  }, [currentTime]);

  const activeBeat = storyBeats[activeIndex];
  const revealedNodes = useMemo(
    () => new Set(storyBeats.slice(0, activeIndex + 1).flatMap((beat) => beat.nodes)),
    [activeIndex],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setCurrentTime(audio.currentTime);
    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("play", play);
    audio.addEventListener("pause", pause);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("play", play);
      audio.removeEventListener("pause", pause);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play();
    else audio.pause();
  }

  function seek(time: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Tracing The Path home">
          <img className="brand-cover" src="tracing-the-path-cover.jpg" alt="" />
          <span><strong>TRACING THE PATH</strong><small>THE INTER-CONNECTED 20TH CENTURY</small></span>
        </a>
        <div className="host-chip"><img src="dan-r-morris.png" alt="" /><span>HOSTED &amp; NARRATED BY<strong>DAN R. MORRIS</strong></span></div>
        <button className="about-button" onClick={() => setShowGuide(true)}>HOW TO EXPLORE <span>↗</span></button>
      </header>

      <section className="experience" id="top">
        <aside className="story-panel">
          <div className="episode-identity">
            <img src="pepsi-episode-art.jpg" alt="When Pepsi Cracked the Iron Curtain episode artwork" />
            <div><span>EPISODE 82</span><strong>A story by<br />Dan R. Morris</strong></div>
          </div>
          <div className="eyebrow"><span>NOW TRACING</span><b>{activeBeat.year}</b></div>
          <h1>When Pepsi Cracked <em>the Iron Curtain</em></h1>
          <div className="beat-copy" key={activeBeat.title}>
            <span className="beat-kicker">{activeBeat.kicker}</span>
            <h2>{activeBeat.title}</h2>
            <p>{activeBeat.description}</p>
          </div>
          <div className="listen-note"><span>✦</span><p><strong>Listen for the connection</strong>Watch how ordinary products become unlikely diplomats.</p></div>
        </aside>

        <section className="map-panel" aria-label="Animated story connection map">
          <div className="map-heading"><span>THE STORY, DRAWN AS DAN TELLS IT</span><div className="drawing-status"><i />{isPlaying ? "DRAWING NOW" : "PRESS PLAY TO DRAW"}</div><small>{revealedNodes.size} of {nodes.length} connections revealed</small></div>
          <div className="map-canvas">
            <div className="paper-grid" />
            {connections.map(([from, to], index) => {
              const start = nodes.find((node) => node.id === from)!;
              const end = nodes.find((node) => node.id === to)!;
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const length = Math.sqrt(dx * dx + dy * dy).toFixed(3);
              const angle = (Math.atan2(dy, dx) * (180 / Math.PI)).toFixed(3);
              const revealed = revealedNodes.has(from) && revealedNodes.has(to);
              const active = activeBeat.nodes.includes(from) && activeBeat.nodes.includes(to);
              return <span key={index} className={`connection ${revealed ? "revealed" : ""} ${active ? "active" : ""}`} style={{ left: `${start.x}%`, top: `${start.y}%`, width: `${length}%`, transform: `rotate(${angle}deg)` }}><i /></span>;
            })}
            {nodes.map((node, nodeIndex) => {
              const revealed = revealedNodes.has(node.id);
              const active = activeBeat.nodes.includes(node.id);
              return (
                <button
                  key={`${node.id}-${revealed ? activeIndex : "hidden"}`}
                  className={`map-node node-${node.id} ${node.type} ${revealed ? "revealed" : ""} ${active ? "active" : ""}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%`, "--draw-delay": `${(nodeIndex % 3) * 120}ms` } as React.CSSProperties}
                  onClick={() => revealed && setSelectedNode(node.id === selectedNode ? null : node.id)}
                  aria-label={`${node.label}, ${node.type}`}
                >
                  <span className="sketch-frame">
                    {node.image ? <img src={node.image} alt="" /> : <b className="object-sketch">{node.icon}</b>}
                    <i className="hatch h1" /><i className="hatch h2" /><i className="hatch h3" />
                    <span className="pencil-tip">✎</span>
                  </span>
                  <strong>{node.label}</strong>
                  <small>{node.type}</small>
                </button>
              );
            })}
            {selectedNode && (
              <div className="node-detail">
                <button onClick={() => setSelectedNode(null)} aria-label="Close detail">×</button>
                <span>{nodes.find((node) => node.id === selectedNode)?.type}</span>
                <strong>{nodes.find((node) => node.id === selectedNode)?.label}</strong>
                <p>Appears in {storyBeats.filter((beat) => beat.nodes.includes(selectedNode)).length} chapter{storyBeats.filter((beat) => beat.nodes.includes(selectedNode)).length === 1 ? "" : "s"} of this path.</p>
              </div>
            )}
          </div>
          <div className="map-legend"><span><i className="legend-person" />Person</span><span><i className="legend-thing" />Product / thing</span><span><i className="legend-event" />Event / idea</span><small>Click a revealed element to inspect it</small></div>
        </section>
      </section>

      <section className="player-shell" aria-label="Episode player">
        <audio ref={audioRef} src={AUDIO_URL} preload="metadata" />
        <div className="player-main">
          <button className="play-button" onClick={togglePlay} aria-label={isPlaying ? "Pause episode" : "Play episode"}>{isPlaying ? "Ⅱ" : "▶"}</button>
          <div className="player-title"><span>YOU’RE LISTENING TO</span><strong>When Pepsi Cracked the Iron Curtain</strong><small>Dan R. Morris · Tracing The Path</small></div>
          <div className="scrubber-wrap">
            <div className="chapter-labels">{storyBeats.map((beat, i) => <button key={beat.time} className={i === activeIndex ? "active" : ""} onClick={() => seek(beat.time)}>{beat.year}</button>)}</div>
            <input aria-label="Episode progress" type="range" min="0" max={DURATION} value={currentTime} onChange={(event) => seek(Number(event.target.value))} style={{ "--progress": `${(currentTime / DURATION) * 100}%` } as React.CSSProperties} />
            <div className="time-row"><span>{formatTime(currentTime)}</span><span>{formatTime(DURATION)}</span></div>
          </div>
          <button className="jump-button" onClick={() => seek(storyBeats[Math.min(activeIndex + 1, storyBeats.length - 1)].time)}>NEXT CONNECTION <span>→</span></button>
        </div>
        <div className="chapter-strip">
          <span>CHAPTER {activeIndex + 1} OF {storyBeats.length}</span>
          <div>{storyBeats.map((beat, i) => <button key={beat.time} className={i <= activeIndex ? "complete" : ""} onClick={() => seek(beat.time)} aria-label={`Go to ${beat.title}`}><i /></button>)}</div>
          <strong>{activeBeat.title}</strong>
        </div>
      </section>

      <section className="journey">
        <div><span>THE PATH SO FAR</span><h2>History rarely moves in a straight line.</h2></div>
        <p>Follow the chain from a Moscow exhibition to a kitchen argument, a cup of cola, a bottle of vodka—and finally a fleet of warships.</p>
        <div className="path-list">{storyBeats.map((beat, i) => <button key={beat.time} onClick={() => seek(beat.time)} className={i === activeIndex ? "active" : ""}><span>{String(i + 1).padStart(2, "0")}</span><small>{beat.year}</small><strong>{beat.title}</strong><i>→</i></button>)}</div>
      </section>

      <section className="host-feature">
        <div className="host-photo-wrap"><img src="dan-r-morris.png" alt="Dan R. Morris, host of Tracing The Path" /><span>YOUR STORYTELLER</span></div>
        <div className="host-story"><span>THE VOICE BEHIND THE PATH</span><h2>Dan R. Morris</h2><h3>Award-winning storyteller. 20th-century historian. Tireless connector of dots.</h3><p>Dan begins with something familiar—a product, a person, a phrase—and follows the forgotten decisions that made it matter. This visual edition lets you watch those connections take shape while he tells the story.</p><a href="https://audienceindustries.com/about-tracing-the-path" target="_blank" rel="noreferrer">MEET DAN &amp; TRACING THE PATH ↗</a></div>
        <img className="host-cover" src="tracing-the-path-cover.jpg" alt="Tracing The Path podcast cover" />
      </section>

      <footer><span>TRACING THE PATH</span><p>Hosted by Dan R. Morris · Everyday things. Extraordinary connections.</p><a href="https://podcasts.apple.com/us/podcast/tracing-the-path-the-connected-20th-century/id1476334630" target="_blank" rel="noreferrer">VIEW ON APPLE PODCASTS ↗</a></footer>

      {showGuide && <div className="modal-backdrop" onClick={() => setShowGuide(false)}><div className="guide-modal" onClick={(event) => event.stopPropagation()}><button onClick={() => setShowGuide(false)} aria-label="Close guide">×</button><span>HOW TO EXPLORE</span><h2>Listen. Watch. Follow the path.</h2><ol><li><b>01</b><p><strong>Press play</strong>The map reveals people, places, and objects with the story.</p></li><li><b>02</b><p><strong>Choose a chapter</strong>Jump to any connection from the timeline or path list.</p></li><li><b>03</b><p><strong>Inspect the map</strong>Select any revealed element to see where it returns.</p></li></ol><button className="start-button" onClick={() => { setShowGuide(false); togglePlay(); }}>START THE EPISODE →</button></div></div>}
    </main>
  );
}
