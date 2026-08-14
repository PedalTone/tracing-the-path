export type StoryBeat = {
  time: number;
  end: number;
  historicalYear: number;
  range: [number, number];
  scale: "centuries" | "decades" | "years";
  year: string;
  kicker: string;
  title: string;
  description: string;
  takeaway: string;
  nodes: string[];
  route?: [string, string];
};

export type MapNode = {
  id: string;
  label: string;
  kind: "person" | "event" | "object" | "idea" | "place";
  image: string;
  x: number;
  y: number;
  firstSeen: number;
  historicalDate: string;
  description: string;
};

export type StoryConnection = {
  from: string;
  to: string;
  revealAt: number;
  label: string;
  explanation: string;
};

export const AUDIO_URL =
  "https://tracingthepath.podomatic.com/enclosure/2026-07-30T21_02_28-07_00.mp3?_=1785470552.17837128";
export const DURATION = 2502.38;

export const storyBeats: StoryBeat[] = [
  {
    time: 0, end: 58, historicalYear: 1959, range: [1953, 1972], scale: "decades", year: "1959",
    kicker: "The opening riddle", title: "What connects videotape, vodka, and Pepsi?",
    description: "Dan opens at the famous Kitchen Debate, then asks us to set aside the familiar Cold War explanation and look for a stranger path.",
    takeaway: "The answer will require three separate histories to collide in one Moscow kitchen.",
    nodes: ["pepsi", "ampex", "vodka", "nixon", "khrushchev"],
  },
  {
    time: 58, end: 344, historicalYear: 1763, range: [1763, 1917], scale: "centuries", year: "1763 → 1917",
    kicker: "Before the Iron Curtain", title: "America and Russia begin with trade, not rivalry",
    description: "Catherine the Great welcomes American merchants; a century later Russian ships appear during the U.S. Civil War. Singer and Westinghouse follow the trade route east.",
    takeaway: "The commercial bridge existed long before the Cold War tried to close it.",
    nodes: ["empire", "lenin"], route: ["United States", "Russian Empire"],
  },
  {
    time: 344, end: 660, historicalYear: 1917, range: [1914, 1929], scale: "decades", year: "1917 → 1929",
    kicker: "The door closes", title: "Revolution turns products and pictures into state power",
    description: "Lenin nationalizes industry. Stolichnaya emerges from state alcohol production, while Soviet newsreels become a controlled window onto the outside world.",
    takeaway: "Vodka and moving pictures become two tools of the new Soviet state.",
    nodes: ["lenin", "vodka", "newsreels"], route: ["Paris newsreels", "Soviet cinemas"],
  },
  {
    time: 660, end: 1043, historicalYear: 1892, range: [1892, 1956], scale: "decades", year: "1892 → 1956",
    kicker: "The technology path", title: "A Russian pilot builds the machine that remembers television",
    description: "Alexander M. Poniatoff travels from Russia through wartime Europe and China to California, founds Ampex, and helps turn German magnetic recording ideas into broadcast technology.",
    takeaway: "A Russian-born engineer makes the videotape system that will capture the Soviet-American encounter.",
    nodes: ["poniatoff", "ampex"], route: ["Kazan, Russia", "California, U.S."],
  },
  {
    time: 1043, end: 1357, historicalYear: 1893, range: [1893, 1956], scale: "decades", year: "1893 → 1956",
    kicker: "The product path", title: "Pepsi survives failure by learning to sell value",
    description: "From Caleb Bradham’s drugstore drink to bankruptcy, a twelve-ounce bottle, radio jingles, and wartime competition, Pepsi becomes a company hungry for an opening abroad.",
    takeaway: "By the 1950s, Donald Kendall sees international markets as Pepsi’s way past Coke.",
    nodes: ["pepsi", "kendall"], route: ["North Carolina", "Global bottling markets"],
  },
  {
    time: 1357, end: 1646, historicalYear: 1955, range: [1953, 1959], scale: "years", year: "1953 → 1959",
    kicker: "A cultural thaw", title: "The superpowers agree to show each other everyday life",
    description: "After Stalin, exchanges carry dancers, art, medicine, books, and finally full national exhibitions across the divide. American companies are invited to Moscow.",
    takeaway: "Culture creates the temporary doorway that business and politics will use.",
    nodes: ["exhibition", "khrushchev", "kendall"], route: ["New York", "Moscow"],
  },
  {
    time: 1646, end: 1759, historicalYear: 1959, range: [1958, 1960], scale: "years", year: "July 1959",
    kicker: "The taste test", title: "Donald Kendall puts a cup of Pepsi in Khrushchev’s hand",
    description: "Kendall persuades Vice President Nixon to guide Khrushchev to the Pepsi booth, where the Soviet leader compares American-bottled and Moscow-bottled Pepsi.",
    takeaway: "A carefully staged taste test becomes Pepsi’s photograph heard around the world.",
    nodes: ["kendall", "nixon", "khrushchev", "pepsi", "exhibition"],
  },
  {
    time: 1759, end: 1890, historicalYear: 1959, range: [1958, 1960], scale: "years", year: "July 24, 1959",
    kicker: "The convergence", title: "The Kitchen Debate is captured on Ampex videotape",
    description: "Nixon and Khrushchev argue over capitalism and communism inside a model kitchen. The encounter travels because Ampex records it—and Ampex was founded by Poniatoff, born in Russia.",
    takeaway: "The episode’s first hidden connection lands: Russian origins helped carry America’s Cold War message.",
    nodes: ["nixon", "khrushchev", "exhibition", "ampex", "poniatoff"],
  },
  {
    time: 1890, end: 2047, historicalYear: 1972, range: [1959, 1972], scale: "decades", year: "1959 → 1972",
    kicker: "The trade puzzle", title: "A blocked currency turns Pepsi into vodka",
    description: "Kendall keeps the political door open. Because Soviet rubles cannot be exchanged freely, Pepsi syrup is traded for tomato paste and Stolichnaya vodka.",
    takeaway: "Barter turns two state-linked products into unlikely diplomatic currency.",
    nodes: ["kendall", "nixon", "pepsi", "vodka"], route: ["Soviet Union", "United States"],
  },
  {
    time: 2047, end: 2234, historicalYear: 1989, range: [1972, 2022], scale: "decades", year: "1989 → 2022",
    kicker: "The deal outgrows the joke", title: "Pepsi briefly owns a fleet—and then history fractures it",
    description: "A larger barter deal includes submarines and warships. The Soviet collapse scatters factories across new borders; later conflict closes many of the commercial paths the story opened.",
    takeaway: "The famous ‘Pepsi navy’ was a moment in a much larger story about systems, borders, and fragile access.",
    nodes: ["pepsi", "fleet", "putin", "vodka"], route: ["Soviet ports", "Norwegian scrapyards"],
  },
  {
    time: 2234, end: DURATION, historicalYear: 1959, range: [1944, 1990], scale: "decades", year: "The cutting-room floor",
    kicker: "Dan’s epilogue", title: "The path keeps branching after the main story ends",
    description: "Dan returns with Pepsi-can collecting, stranger barter deals, Ampex inventions, Elvis, the Emmys, and the Pepsi Points jet that was never meant to fly.",
    takeaway: "A finished path is really an invitation to notice the next connection.",
    nodes: ["pepsi", "ampex", "fleet"],
  },
];

export const nodes: MapNode[] = [
  { id: "empire", label: "U.S.–Russia trade", kind: "idea", image: "sketch-us-russia-trade.png", x: 13, y: 13, firstSeen: 58, historicalDate: "1763–1917", description: "Commercial ties, ships, and American companies connect the two countries long before the Cold War." },
  { id: "lenin", label: "Vladimir Lenin", kind: "person", image: "sketch-vladimir-lenin.png", x: 37, y: 12, firstSeen: 300, historicalDate: "1917", description: "The Bolshevik revolution nationalizes industry and pushes foreign companies out." },
  { id: "newsreels", label: "Soviet newsreels", kind: "object", image: "sketch-newsreel-camera.png", x: 63, y: 12, firstSeen: 432, historicalDate: "1919–1929", description: "Moving images become a tightly controlled way for Soviet audiences to see the world." },
  { id: "poniatoff", label: "Alexander Poniatoff", kind: "person", image: "sketch-alexander-poniatoff.png", x: 87, y: 13, firstSeen: 660, historicalDate: "1892–1980", description: "The Russian-born electrical engineer and pilot who founded Ampex in California." },
  { id: "ampex", label: "Ampex videotape", kind: "object", image: "sketch-ampex-videotape.png", x: 24, y: 37, firstSeen: 817, historicalDate: "1944–1956", description: "Poniatoff’s company advances magnetic recording and demonstrates practical broadcast videotape." },
  { id: "kendall", label: "Donald Kendall", kind: "person", image: "sketch-donald-kendall.png", x: 50, y: 36, firstSeen: 1043, historicalDate: "1921–2020", description: "The ambitious Pepsi executive who turns the Moscow exhibition into an international opening." },
  { id: "pepsi", label: "Pepsi-Cola", kind: "object", image: "sketch-pepsi-cola.png", x: 76, y: 37, firstSeen: 0, historicalDate: "1893 onward", description: "A struggling soft drink that becomes both consumer product and instrument of exchange." },
  { id: "nixon", label: "Richard Nixon", kind: "person", image: "sketch-richard-nixon.png", x: 13, y: 62, firstSeen: 0, historicalDate: "1959", description: "The U.S. vice president who guides Khrushchev through the exhibition and into the televised debate." },
  { id: "exhibition", label: "American Exhibition", kind: "event", image: "sketch-american-exhibition.png", x: 38, y: 62, firstSeen: 1357, historicalDate: "July 1959", description: "A six-week Moscow showcase where consumer goods become arguments about political systems." },
  { id: "khrushchev", label: "Nikita Khrushchev", kind: "person", image: "sketch-nikita-khrushchev.png", x: 63, y: 62, firstSeen: 0, historicalDate: "1953–1964", description: "The Soviet leader who samples Pepsi and debates Nixon inside the model kitchen." },
  { id: "vodka", label: "Stolichnaya", kind: "object", image: "sketch-stolichnaya.png", x: 87, y: 62, firstSeen: 18, historicalDate: "Soviet era", description: "State-produced vodka that later becomes Pepsi’s barter payment for entering the Soviet market." },
  { id: "fleet", label: "The Pepsi fleet", kind: "object", image: "sketch-pepsi-fleet.png", x: 35, y: 88, firstSeen: 2047, historicalDate: "1989", description: "Decommissioned Soviet submarines and ships included in a much larger barter agreement." },
  { id: "putin", label: "Vladimir Putin", kind: "person", image: "sketch-vladimir-putin.png", x: 66, y: 88, firstSeen: 2140, historicalDate: "1999 onward", description: "Dan’s final turn: renewed conflict and authoritarian rule constrict the cross-border opening." },
];

export const connections: StoryConnection[] = [
  { from: "empire", to: "lenin", revealAt: 344, label: "revolution closes the market", explanation: "The 1917 revolution ends the earlier era of open commercial exchange." },
  { from: "lenin", to: "newsreels", revealAt: 432, label: "state controls the picture", explanation: "The new government uses film to manage what citizens see and how events are framed." },
  { from: "newsreels", to: "poniatoff", revealAt: 660, label: "another Russian path begins", explanation: "The narrative pivots from state-controlled images to a Russian engineer who will transform recorded media abroad." },
  { from: "poniatoff", to: "ampex", revealAt: 817, label: "founds AMPEX", explanation: "Alexander M. Poniatoff creates the company from his initials plus EX for excellence." },
  { from: "kendall", to: "pepsi", revealAt: 1281, label: "takes Pepsi overseas", explanation: "Donald Kendall sees international bottling as Pepsi’s route around Coke’s domestic advantage." },
  { from: "kendall", to: "exhibition", revealAt: 1578, label: "spots an opening", explanation: "Kendall accepts the Moscow exhibition invitation that Coke declines." },
  { from: "nixon", to: "kendall", revealAt: 1646, label: "political access", explanation: "Kendall asks Nixon to lead Khrushchev directly to the Pepsi booth." },
  { from: "exhibition", to: "pepsi", revealAt: 1646, label: "a product becomes an argument", explanation: "Pepsi is presented as a taste of American consumer life." },
  { from: "pepsi", to: "khrushchev", revealAt: 1724, label: "the taste test", explanation: "Khrushchev compares Pepsi bottled in America with Pepsi bottled in Moscow." },
  { from: "nixon", to: "exhibition", revealAt: 1759, label: "the Kitchen Debate", explanation: "The exhibition’s model kitchen becomes the stage for a political confrontation." },
  { from: "exhibition", to: "khrushchev", revealAt: 1759, label: "the Kitchen Debate", explanation: "Khrushchev answers Nixon’s claims about American abundance and choice." },
  { from: "exhibition", to: "ampex", revealAt: 1800, label: "captured on videotape", explanation: "Ampex video recording lets the Moscow encounter travel to television audiences." },
  { from: "ampex", to: "poniatoff", revealAt: 1841, label: "the Russian-born founder", explanation: "The reveal lands: technology built by a Russian immigrant records the U.S.–Soviet propaganda clash." },
  { from: "kendall", to: "vodka", revealAt: 1991, label: "solves the ruble problem", explanation: "Kendall’s barter arrangement exchanges Pepsi concentrate for tomato paste and Stolichnaya." },
  { from: "pepsi", to: "vodka", revealAt: 1991, label: "syrup for vodka", explanation: "Two drinks travel in opposite directions because Soviet currency cannot freely cross the border." },
  { from: "pepsi", to: "fleet", revealAt: 2047, label: "barter becomes a fleet", explanation: "A later agreement includes decommissioned ships that can be sold for scrap." },
  { from: "fleet", to: "putin", revealAt: 2140, label: "the opening contracts", explanation: "After the Soviet collapse, renewed conflict and political change reshape the commercial bridge." },
  { from: "vodka", to: "putin", revealAt: 2192, label: "the name breaks away", explanation: "Dan closes with Stolichnaya’s later rebranding as Stoli amid conflict with Putin’s Russia." },
];
