#!/usr/bin/env node
// Build the template.html with data-slot markers and rewritten first-classes.
//
// Approach: read the source lines from the input HTML and apply targeted
// transformations. Line-based so we have exact control without needing a
// DOM parser.

import { readFileSync, writeFileSync } from 'node:fs';

const INPUT = '.snowflake/projects/001-jfk-airport-a/input/index.html';
const OUTPUT = '.snowflake/projects/001-jfk-airport-a/output/templates/jfk-airport-a.html';
const ASSET_BASE = 'https://paolomoz.github.io/stardust-site/samples/jfk-airport/';

const raw = readFileSync(INPUT, 'utf8');
const lines = raw.split('\n');

// 1) Extract <main>...</main> region (lines 920-1444 in 1-indexed = indices 919-1443).
let mainStart = -1;
let mainEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (mainStart < 0 && /^<main /.test(lines[i])) mainStart = i;
  if (mainStart >= 0 && /^<\/main>/.test(lines[i])) { mainEnd = i; break; }
}
if (mainStart < 0 || mainEnd < 0) throw new Error('main not found');

let body = lines.slice(mainStart, mainEnd + 1);

// 2) Rewrite asset paths: src="assets/..." -> absolute.
body = body.map((l) => l.replaceAll('src="assets/', `src="${ASSET_BASE}assets/`));

// 3) Apply targeted string substitutions for slot insertions and class rewrites.
//
// The replacements list uses unique substrings present in the source to anchor
// each edit. Each entry: { find: string, replace: string }.
const replacements = [
  // --- brand-hero ---
  // Hero image: it's `<img src="..." alt="">` directly inside .brand-hero
  // We add data-slot="hero-image". The src is the only one with that path.
  {
    find: '<img src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/032_26_JFK_20Hero_20Image_v1_r0_promo-5x2-99093042.jpg" alt="">',
    replace: '<img data-slot="hero-image" src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/032_26_JFK_20Hero_20Image_v1_r0_promo-5x2-99093042.jpg" alt="">',
  },
  // Meta strip
  {
    find: '      <span>John F. Kennedy International Airport</span>',
    replace: '      <span data-slot="meta-left">John F. Kennedy International Airport</span>',
  },
  {
    find: '      <span>New York City</span>',
    replace: '      <span data-slot="meta-right">New York City</span>',
  },
  // Brand-hero title
  {
    find: '      <h1>JFK</h1>',
    replace: '      <h1 data-slot="title">JFK</h1>',
  },
  // Brand-hero deck
  {
    find: '      <p class="deck">Your world-class gateway to the world.</p>',
    replace: '      <p class="deck" data-slot="deck">Your world-class gateway to the world.</p>',
  },

  // --- audience-section ---
  // Opener title and deck
  {
    find: '      <h2 class="display">What are you here to do?</h2>',
    replace: '      <h2 class="display" data-slot="opener-title">What are you here to do?</h2>',
  },
  {
    find: '      <p class="deck">Pick where you are in your day. We\'ll route you straight to the task.</p>',
    replace: '      <p class="deck" data-slot="opener-deck">Pick where you are in your day. We\'ll route you straight to the task.</p>',
  },
  // Audience tile labels and metas. Order in source: departing/arriving/pickup/connecting/visiting.
  // Departing label "Departing"
  {
    find: '          <div class="label">Departing</div>\n          <div class="meta">Search a flight, check parking and security wait times.</div>',
    replace: '          <div class="label" data-slot="tile-departing.label">Departing</div>\n          <div class="meta" data-slot="tile-departing.meta">Search a flight, check parking and security wait times.</div>',
  },
  {
    find: '          <div class="label">Arriving</div>\n          <div class="meta">Track an arrival, baggage, ground transport.</div>',
    replace: '          <div class="label" data-slot="tile-arriving.label">Arriving</div>\n          <div class="meta" data-slot="tile-arriving.meta">Track an arrival, baggage, ground transport.</div>',
  },
  {
    find: '          <div class="label">Picking up</div>\n          <div class="meta">Current pickup zones &amp; ride-app pickup points.</div>',
    replace: '          <div class="label" data-slot="tile-pickup.label">Picking up</div>\n          <div class="meta" data-slot="tile-pickup.meta">Current pickup zones &amp; ride-app pickup points.</div>',
  },
  {
    find: '          <div class="label">Connecting</div>\n          <div class="meta">Terminal-to-terminal, AirTrain, walk times.</div>',
    replace: '          <div class="label" data-slot="tile-connecting.label">Connecting</div>\n          <div class="meta" data-slot="tile-connecting.meta">Terminal-to-terminal, AirTrain, walk times.</div>',
  },
  {
    find: '          <div class="label">Visiting</div>\n          <div class="meta">Maps, dining, lounges, accessibility.</div>',
    replace: '          <div class="label" data-slot="tile-visiting.label">Visiting</div>\n          <div class="meta" data-slot="tile-visiting.meta">Maps, dining, lounges, accessibility.</div>',
  },

  // --- 5 task panel first-class rewrites ---
  // Each is the opening <section ...> tag. Use the unique data-audience attribute to anchor.
  {
    find: '<section data-section="task-panel" data-audience="departing" data-purpose="commercial-conversion" class="task-panel">',
    replace: '<section data-section="task-panel" data-audience="departing" data-purpose="commercial-conversion" class="task-panel-departing task-panel">',
  },
  {
    find: '<section data-section="task-panel" data-audience="arriving" data-purpose="audience-arriving" class="task-panel" hidden>',
    replace: '<section data-section="task-panel" data-audience="arriving" data-purpose="audience-arriving" class="task-panel-arriving task-panel" hidden>',
  },
  {
    find: '<section data-section="task-panel" data-audience="pickup" data-purpose="audience-pickup" class="task-panel" hidden>',
    replace: '<section data-section="task-panel" data-audience="pickup" data-purpose="audience-pickup" class="task-panel-pickup task-panel" hidden>',
  },
  {
    find: '<section data-section="task-panel" data-audience="connecting" data-purpose="audience-connecting" class="task-panel" hidden>',
    replace: '<section data-section="task-panel" data-audience="connecting" data-purpose="audience-connecting" class="task-panel-connecting task-panel" hidden>',
  },
  {
    find: '<section data-section="task-panel" data-audience="visiting" data-purpose="audience-visiting" class="task-panel" hidden>',
    replace: '<section data-section="task-panel" data-audience="visiting" data-purpose="audience-visiting" class="task-panel-visiting task-panel" hidden>',
  },

  // --- task panel: departing ---
  {
    find: '        <div class="eyebrow">Departing</div>\n        <h2 class="display">Welcome to JFK.</h2>\n        <p>Search a flight by destination or by number. Reserve parking ahead of time. Or jump straight to one of today\'s most common things to do, on the right.</p>',
    replace: '        <div class="eyebrow" data-slot="eyebrow">Departing</div>\n        <h2 class="display" data-slot="title">Welcome to JFK.</h2>\n        <p data-slot="intro">Search a flight by destination or by number. Reserve parking ahead of time. Or jump straight to one of today\'s most common things to do, on the right.</p>',
  },
  {
    find: '      <aside class="task-side" aria-label="Quick actions for departing passengers">\n        <div class="label-eyebrow">Quick actions</div>\n        <h3 class="display">Skip to what you need.</h3>',
    replace: '      <aside class="task-side" aria-label="Quick actions for departing passengers">\n        <div class="label-eyebrow" data-slot="side-eyebrow">Quick actions</div>\n        <h3 class="display" data-slot="side-title">Skip to what you need.</h3>',
  },

  // --- task panel: arriving ---
  {
    find: '        <div class="eyebrow">Arriving</div>\n        <h2 class="display">Welcome back to New York.</h2>\n        <p>Track an inbound flight by airline, number, or origin. Find your baggage claim and the right way out, terminal by terminal.</p>',
    replace: '        <div class="eyebrow" data-slot="eyebrow">Arriving</div>\n        <h2 class="display" data-slot="title">Welcome back to New York.</h2>\n        <p data-slot="intro">Track an inbound flight by airline, number, or origin. Find your baggage claim and the right way out, terminal by terminal.</p>',
  },
  {
    find: '      <aside class="task-side" aria-label="Quick actions for arriving passengers">\n        <div class="label-eyebrow">Quick actions</div>\n        <h3 class="display">First steps off the plane.</h3>',
    replace: '      <aside class="task-side" aria-label="Quick actions for arriving passengers">\n        <div class="label-eyebrow" data-slot="side-eyebrow">Quick actions</div>\n        <h3 class="display" data-slot="side-title">First steps off the plane.</h3>',
  },

  // --- task panel: pickup ---
  {
    find: '        <div class="eyebrow">Picking up</div>\n        <h2 class="display">Live pickup status.</h2>\n        <p>Construction has moved several pickup zones this week. Find the right zone for your terminal before you head out, and follow the airport signage when you arrive.</p>',
    replace: '        <div class="eyebrow" data-slot="eyebrow">Picking up</div>\n        <h2 class="display" data-slot="title">Live pickup status.</h2>\n        <p data-slot="intro">Construction has moved several pickup zones this week. Find the right zone for your terminal before you head out, and follow the airport signage when you arrive.</p>',
  },
  {
    find: '      <aside class="task-side" aria-label="Quick actions for pickup drivers">\n        <div class="label-eyebrow">Quick actions</div>\n        <h3 class="display">Park, wait, or circle.</h3>',
    replace: '      <aside class="task-side" aria-label="Quick actions for pickup drivers">\n        <div class="label-eyebrow" data-slot="side-eyebrow">Quick actions</div>\n        <h3 class="display" data-slot="side-title">Park, wait, or circle.</h3>',
  },

  // --- task panel: connecting ---
  {
    find: '        <div class="eyebrow">Connecting</div>\n        <h2 class="display">Get to your next gate.</h2>\n        <p>Terminal-to-terminal navigation, AirTrain frequency, walk times, and minimum connection times by airline pair.</p>',
    replace: '        <div class="eyebrow" data-slot="eyebrow">Connecting</div>\n        <h2 class="display" data-slot="title">Get to your next gate.</h2>\n        <p data-slot="intro">Terminal-to-terminal navigation, AirTrain frequency, walk times, and minimum connection times by airline pair.</p>',
  },
  {
    find: '      <aside class="task-side" aria-label="Quick actions for connecting passengers">\n        <div class="label-eyebrow">Quick actions</div>\n        <h3 class="display">On the move, fast.</h3>',
    replace: '      <aside class="task-side" aria-label="Quick actions for connecting passengers">\n        <div class="label-eyebrow" data-slot="side-eyebrow">Quick actions</div>\n        <h3 class="display" data-slot="side-title">On the move, fast.</h3>',
  },

  // --- task panel: visiting ---
  {
    find: '        <div class="eyebrow">Visiting</div>\n        <h2 class="display">More than an airport.</h2>\n        <p>Six terminals, dozens of restaurants, three lounges, a public art program, and a few quiet corners. Here\'s what\'s open today.</p>',
    replace: '        <div class="eyebrow" data-slot="eyebrow">Visiting</div>\n        <h2 class="display" data-slot="title">More than an airport.</h2>\n        <p data-slot="intro">Six terminals, dozens of restaurants, three lounges, a public art program, and a few quiet corners. Here\'s what\'s open today.</p>',
  },
  {
    find: '      <aside class="task-side" aria-label="Quick actions for visitors">\n        <div class="label-eyebrow">Quick actions</div>\n        <h3 class="display">Make it more than a layover.</h3>',
    replace: '      <aside class="task-side" aria-label="Quick actions for visitors">\n        <div class="label-eyebrow" data-slot="side-eyebrow">Quick actions</div>\n        <h3 class="display" data-slot="side-title">Make it more than a layover.</h3>',
  },

  // --- guide-section ---
  {
    find: '      <h2 class="display">Your Guide to JFK</h2>',
    replace: '      <h2 class="display" data-slot="title">Your Guide to JFK</h2>',
  },

  // --- construction ---
  {
    find: '        <h2 class="display">Building tomorrow\'s JFK.</h2>',
    replace: '        <h2 class="display" data-slot="title">Building tomorrow\'s JFK.</h2>',
  },
  {
    find: '        <p>JFK is mid a $19B redevelopment that runs through 2028: new terminals, new roadways, rebuilt pickup zones. Most days, most things work. Some days, something doesn\'t. Live status is at the top of the page; the full plan and current advisories are here.</p>',
    replace: '        <p data-slot="body">JFK is mid a $19B redevelopment that runs through 2028: new terminals, new roadways, rebuilt pickup zones. Most days, most things work. Some days, something doesn\'t. Live status is at the top of the page; the full plan and current advisories are here.</p>',
  },
  {
    find: '          <a href="https://www.portauthoritybuilds.com/redevelopment/us/en/jfk.html">JFK Redevelopment plan &rarr;</a>',
    replace: '          <a href="https://www.portauthoritybuilds.com/redevelopment/us/en/jfk.html" data-slot="cta-1">JFK Redevelopment plan &rarr;</a>',
  },
  {
    find: '          <a href="/stardust-site/alerts-advisories">All alerts and advisories &rarr;</a>',
    replace: '          <a href="/stardust-site/alerts-advisories" data-slot="cta-2">All alerts and advisories &rarr;</a>',
  },
  {
    find: '        <img src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/JFK_20Airport_20map_202.5-7e06d1e6.jpg" alt="JFK airport map illustration showing terminals and current construction zones." loading="lazy">',
    replace: '        <img data-slot="image" src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/JFK_20Airport_20map_202.5-7e06d1e6.jpg" alt="JFK airport map illustration showing terminals and current construction zones." loading="lazy">',
  },

  // --- essentials ---
  {
    find: '        <h2 class="display">While you\'re here.</h2>',
    replace: '        <h2 class="display" data-slot="title">While you\'re here.</h2>',
  },
  {
    find: '        <p>From quick bites to sit-down meals, last-minute essentials, and lounges to settle in before your flight.</p>',
    replace: '        <p data-slot="deck">From quick bites to sit-down meals, last-minute essentials, and lounges to settle in before your flight.</p>',
  },
  // Essential card 1 (Dine)
  {
    find: '          <div class="photo"><img src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/4-0_4_SDRcard_card-wide-16x9-0765162a.jpg" alt="A diner at a JFK food court." loading="lazy"></div>',
    replace: '          <div class="photo"><img data-slot="card-1.image" src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/4-0_4_SDRcard_card-wide-16x9-0765162a.jpg" alt="A diner at a JFK food court." loading="lazy"></div>',
  },
  {
    find: '            <h3>Dine</h3>\n            <p>Quick bites to sit-down meals, plenty of dietary options, perfect for a rush or a slow morning.</p>\n            <a href="/stardust-site/dine-shop-relax/food">JFK Airport restaurants &rarr;</a>',
    replace: '            <h3 data-slot="card-1.title">Dine</h3>\n            <p data-slot="card-1.body">Quick bites to sit-down meals, plenty of dietary options, perfect for a rush or a slow morning.</p>\n            <a href="/stardust-site/dine-shop-relax/food" data-slot="card-1.cta">JFK Airport restaurants &rarr;</a>',
  },
  // Essential card 2 (Shop)
  {
    find: '          <div class="photo"><img src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/4-0_2_shopteasercard_card-wide-16x9-25a97a96.jpg" alt="A shop interior at a JFK terminal." loading="lazy"></div>',
    replace: '          <div class="photo"><img data-slot="card-2.image" src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/4-0_2_shopteasercard_card-wide-16x9-25a97a96.jpg" alt="A shop interior at a JFK terminal." loading="lazy"></div>',
  },
  {
    find: '            <h3>Shop</h3>\n            <p>Forgot something? Last-minute travel essentials, snacks, sunglasses, chargers, and souvenirs.</p>\n            <a href="/stardust-site/dine-shop-relax/shops">JFK Airport shops &rarr;</a>',
    replace: '            <h3 data-slot="card-2.title">Shop</h3>\n            <p data-slot="card-2.body">Forgot something? Last-minute travel essentials, snacks, sunglasses, chargers, and souvenirs.</p>\n            <a href="/stardust-site/dine-shop-relax/shops" data-slot="card-2.cta">JFK Airport shops &rarr;</a>',
  },
  // Essential card 3 (Relax)
  {
    find: '          <div class="photo"><img src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/4-0_4_RelaxTeaser_card-wide-16x9-f2de0260.jpg" alt="A traveler relaxing in a JFK lounge area." loading="lazy"></div>',
    replace: '          <div class="photo"><img data-slot="card-3.image" src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/4-0_4_RelaxTeaser_card-wide-16x9-f2de0260.jpg" alt="A traveler relaxing in a JFK lounge area." loading="lazy"></div>',
  },
  {
    find: '            <h3>Relax</h3>\n            <p>Looking for a place to relax before your flight? Discover airport lounges, spas, and more.</p>\n            <a href="/stardust-site/dine-shop-relax/lounge-and-rest">Places to relax at JFK Airport &rarr;</a>',
    replace: '            <h3 data-slot="card-3.title">Relax</h3>\n            <p data-slot="card-3.body">Looking for a place to relax before your flight? Discover airport lounges, spas, and more.</p>\n            <a href="/stardust-site/dine-shop-relax/lounge-and-rest" data-slot="card-3.cta">Places to relax at JFK Airport &rarr;</a>',
  },

  // --- accessibility ---
  {
    find: '          <h2 class="display">Accessibility at JFK.</h2>\n          <p>Mobility, vision, hearing, hidden disabilities, and the Hidden Disabilities Sunflower lanyard program. Services in every terminal.</p>',
    replace: '          <h2 class="display" data-slot="title">Accessibility at JFK.</h2>\n          <p data-slot="body">Mobility, vision, hearing, hidden disabilities, and the Hidden Disabilities Sunflower lanyard program. Services in every terminal.</p>',
  },
  {
    find: '      <a href="/stardust-site/explore-jfk/accessibility-services" class="arrow-cta">All accessibility services &rarr;</a>',
    replace: '      <a href="/stardust-site/explore-jfk/accessibility-services" class="arrow-cta" data-slot="cta">All accessibility services &rarr;</a>',
  },

  // --- latest ---
  {
    find: '        <h2 class="display">Latest from JFK.</h2>\n        <a href="/stardust-site/alerts-advisories" class="all">All alerts &amp; updates &rarr;</a>',
    replace: '        <h2 class="display" data-slot="title">Latest from JFK.</h2>\n        <a href="/stardust-site/alerts-advisories" class="all" data-slot="all-link">All alerts &amp; updates &rarr;</a>',
  },
  {
    find: '          <div class="photo"><img src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/0-0_8_leffertsblvdlotcard_card-wide-16x9-afbc37d1.jpg" alt="A pickup zone at JFK with cars and signage." loading="lazy"></div>',
    replace: '          <div class="photo"><img data-slot="feature.image" src="https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/media/0-0_8_leffertsblvdlotcard_card-wide-16x9-afbc37d1.jpg" alt="A pickup zone at JFK with cars and signage." loading="lazy"></div>',
  },
  {
    find: '            <div class="eyebrow">Pickup &amp; drop-off</div>\n            <h3>Convenient pick-up and drop-off areas.</h3>\n            <p>Construction has moved several pickup zones, including T5 ride-app to Lot 2 and the T7 taxi stand. Find the right zone for your terminal, with current relocations.</p>\n            <a href="/stardust-site/transportation/pick-up-drop-off" class="read">See the pickup map &rarr;</a>',
    replace: '            <div class="eyebrow" data-slot="feature.eyebrow">Pickup &amp; drop-off</div>\n            <h3 data-slot="feature.title">Convenient pick-up and drop-off areas.</h3>\n            <p data-slot="feature.body">Construction has moved several pickup zones, including T5 ride-app to Lot 2 and the T7 taxi stand. Find the right zone for your terminal, with current relocations.</p>\n            <a href="/stardust-site/transportation/pick-up-drop-off" class="read" data-slot="feature.cta">See the pickup map &rarr;</a>',
  },
  {
    find: '            <div class="eyebrow">Customer support</div>\n            <h3>JFK customer support on WhatsApp.</h3>\n            <p>Need help while at the airport? JFK is on WhatsApp every day, 10 a.m. to 2 a.m. ET: accessibility, assistance, and more.</p>\n            <a href="https://www.panynj.gov/WhatsApp_JFK">Learn more &rarr;</a>',
    replace: '            <div class="eyebrow" data-slot="companion-1.eyebrow">Customer support</div>\n            <h3 data-slot="companion-1.title">JFK customer support on WhatsApp.</h3>\n            <p data-slot="companion-1.body">Need help while at the airport? JFK is on WhatsApp every day, 10 a.m. to 2 a.m. ET: accessibility, assistance, and more.</p>\n            <a href="https://www.panynj.gov/WhatsApp_JFK" data-slot="companion-1.cta">Learn more &rarr;</a>',
  },
  {
    find: '            <div class="eyebrow">Recognition</div>\n            <h3>Nominate an employee for great service.</h3>\n            <p>Did an employee make your day? Tell us about it. Recognise the people who make JFK work.</p>\n            <a href="https://survey3.medallia.com/?RRNominationSurvey&amp;airport=jfk_feedback">Learn more &rarr;</a>',
    replace: '            <div class="eyebrow" data-slot="companion-2.eyebrow">Recognition</div>\n            <h3 data-slot="companion-2.title">Nominate an employee for great service.</h3>\n            <p data-slot="companion-2.body">Did an employee make your day? Tell us about it. Recognise the people who make JFK work.</p>\n            <a href="https://survey3.medallia.com/?RRNominationSurvey&amp;airport=jfk_feedback" data-slot="companion-2.cta">Learn more &rarr;</a>',
  },
];

// Now apply quick-action slot insertions. Per panel, there are 5 quick-action <a> blocks.
// Each block has this shape:
//   <a href="..." class="quick-action">
//     <span class="l">LABEL</span>
//     <span class="v">VALUE_TEXT <span class="icon-arrow-right" ...></span></span>
//   </a>
// We need to put data-slot on the .l span (wrapping its text) and on a new
// inner span inside .v that wraps only the text part (not the icon span).
//
// Strategy: build per-panel replacements based on the panel's data-audience plus the index.
const panels = [
  { aud: 'departing', items: [
    { l: 'Reserve parking', v: 'Save up to 20%' },
    { l: 'Find your terminal', v: 'All 5 terminals' },
    { l: 'Airport map', v: 'Interactive' },
    { l: 'Public transportation', v: 'AirTrain &middot; Subway &middot; Bus' },
    { l: 'Contact your airline', v: 'All carriers' },
  ]},
  { aud: 'arriving', items: [
    { l: 'Baggage claim by terminal', v: 'Find yours' },
    { l: 'AirTrain to Jamaica', v: 'Subway, LIRR' },
    { l: 'Taxi to Manhattan', v: 'Flat fare' },
    { l: 'Lost &amp; Found', v: 'Submit a report' },
    { l: 'Meet &amp; Greet', v: 'All terminals' },
  ]},
  { aud: 'pickup', items: [
    { l: 'Pick-up &amp; drop-off areas', v: 'All terminals' },
    { l: 'Ride-app pickup points', v: 'Uber, Lyft' },
    { l: 'Terminal access changes', v: 'Active alerts' },
    { l: 'Park and wait', v: 'Cell-phone lot, short-term' },
    { l: 'Stuck somewhere?', v: 'Contact us' },
  ]},
  { aud: 'connecting', items: [
    { l: 'All Terminals', v: 'Find your gate' },
    { l: 'AirTrain map', v: 'Stations, frequency' },
    { l: 'Walk times', v: 'Gate to gate' },
    { l: 'Accessibility transport', v: 'Wheelchair, escort' },
    { l: 'Travel between airports', v: 'JFK, LGA, EWR' },
  ]},
  { aud: 'visiting', items: [
    { l: 'Explore JFK', v: 'Services, terminals' },
    { l: 'Airport services', v: 'Currency, banking, more' },
    { l: 'Accessibility services', v: 'All terminals' },
    { l: 'Got a question?', v: 'Real humans' },
    { l: 'JFK on WhatsApp', v: '10am to 2am ET' },
  ]},
];

// Now apply all the simple replacements first.
let html = body.join('\n');
for (const { find, replace } of replacements) {
  if (!html.includes(find)) {
    throw new Error('Substring not found, anchor may be stale:\n' + find.slice(0, 80) + '...');
  }
  if (html.indexOf(find) !== html.lastIndexOf(find)) {
    throw new Error('Substring is ambiguous (matches multiple times):\n' + find.slice(0, 80) + '...');
  }
  html = html.replace(find, replace);
}

// Apply quick-action slot insertions per panel.
panels.forEach((panel, panelIdx) => {
  const panelAud = panel.aud;
  panel.items.forEach((qa, i) => {
    const slotPrefix = `qa-${i + 1}`;
    // Match: <span class="l">LABEL</span>
    const oldL = `<span class="l">${qa.l}</span>`;
    const newL = `<span class="l" data-slot="${slotPrefix}.label">${qa.l}</span>`;
    // Match: <span class="v">VALUE_TEXT <span class="icon-arrow-right" aria-hidden="true"></span></span>
    const oldV = `<span class="v">${qa.v} <span class="icon-arrow-right" aria-hidden="true"></span></span>`;
    const newV = `<span class="v"><span data-slot="${slotPrefix}.value">${qa.v}</span> <span class="icon-arrow-right" aria-hidden="true"></span></span>`;
    // Some quick-actions may appear in multiple panels (e.g. "Accessibility services").
    // For uniqueness we replace within the panel scope: find the panel section,
    // restrict replacement to within it.
    const sectionTag = `<section data-section="task-panel" data-audience="${panelAud}"`;
    const sectionStart = html.indexOf(sectionTag);
    if (sectionStart < 0) throw new Error(`Panel section ${panelAud} not found`);
    const sectionEnd = html.indexOf('</section>', sectionStart) + '</section>'.length;
    const before = html.slice(0, sectionStart);
    const panelSection = html.slice(sectionStart, sectionEnd);
    const after = html.slice(sectionEnd);
    if (!panelSection.includes(oldL)) {
      throw new Error(`Quick-action label "${qa.l}" not found in panel ${panelAud}`);
    }
    if (!panelSection.includes(oldV)) {
      throw new Error(`Quick-action value "${qa.v}" not found in panel ${panelAud}`);
    }
    const newPanelSection = panelSection.replace(oldL, newL).replace(oldV, newV);
    html = before + newPanelSection + after;
  });
});

// Guide tiles: 5 tiles. Each has photo img, body h3, body .arrow.
const guideTiles = [
  { src: 'JFK_20Airport_20map_202.5-7e06d1e6.jpg', h3: 'Interactive Map', arrow: 'Explore &rarr;' },
  { src: '1-1_departurescard_card-portrait-3x4-0f15539f.jpg', h3: 'Departures Guide', arrow: 'Open &rarr;' },
  { src: '1-2_1_arrivalsguidehero_card-portrait-3x4-1a528b73.jpg', h3: 'Arrivals Guide', arrow: 'Open &rarr;' },
  { src: '0-1_2_general_card-portrait-3x4-ff464ef2.jpg', h3: 'Connections Guide', arrow: 'Open &rarr;' },
  { src: '3_6-1_allterminalshero_card-portrait-3x4-4efc8669.jpg', h3: 'All Terminals', arrow: 'Find yours &rarr;' },
];
guideTiles.forEach((t, i) => {
  const idx = i + 1;
  const photoSearch = `<div class="photo"><img src="${ASSET_BASE}assets/media/${t.src}"`;
  const photoReplace = `<div class="photo"><img data-slot="tile-${idx}.image" src="${ASSET_BASE}assets/media/${t.src}"`;
  if (!html.includes(photoSearch)) throw new Error(`Guide tile ${idx} photo not found: ${t.src}`);
  // But this img path also occurs in construction (uses JFK_20Airport_20map). Need to scope to guide-tiles.
  const guideStart = html.indexOf('<div class="guide-tiles">');
  const guideEnd = html.indexOf('</div>', html.indexOf('</a>\n    </div>', guideStart) + 1);
  // Easier: replace within the guide-tiles block only.
  const guideClose = '</div>\n  </section>'; // end of guide-section
  const guideBlockStart = html.indexOf('<div class="guide-tiles">');
  const guideBlockEnd = html.indexOf(guideClose, guideBlockStart);
  if (guideBlockStart < 0 || guideBlockEnd < 0) throw new Error('Guide block boundaries not found');
  const guideBefore = html.slice(0, guideBlockStart);
  const guideBlock = html.slice(guideBlockStart, guideBlockEnd);
  const guideAfter = html.slice(guideBlockEnd);
  const updatedBlock = guideBlock.replace(photoSearch, photoReplace);
  // h3 and arrow
  const h3Search = `<div class="body"><h3>${t.h3}</h3><span class="arrow">${t.arrow}</span></div>`;
  const h3Replace = `<div class="body"><h3 data-slot="tile-${idx}.title">${t.h3}</h3><span class="arrow" data-slot="tile-${idx}.arrow-label">${t.arrow}</span></div>`;
  if (!updatedBlock.includes(h3Search)) throw new Error(`Guide tile ${idx} body not found: ${t.h3}`);
  const finalBlock = updatedBlock.replace(h3Search, h3Replace);
  html = guideBefore + finalBlock + guideAfter;
});

writeFileSync(OUTPUT, html);
console.log(`Wrote ${OUTPUT} (${html.split('\n').length} lines)`);

// Quick sanity check: count [data-slot] markers
const slotCount = (html.match(/data-slot="/g) || []).length;
console.log(`Total [data-slot] markers: ${slotCount}`);

// Section count
const sectionCount = (html.match(/<section /g) || []).length;
console.log(`Section count: ${sectionCount}`);
