/* Lake Life! — question bank
 *
 * Options are listed here in SCORING order, always:
 *   index 0 -> driftwood, 1 -> lilypad, 2 -> duck, 3 -> canoe
 *
 * That is the authoring order only. On screen the four answers are shuffled
 * into a different order for every question, so students never see all the
 * Driftwood answers sitting in slot 1. Each answer keeps its own personality
 * no matter where it lands, and the points are added up from that — so editing
 * this list is safe as long as the four stay in the order above.
 */

/* ── Teacher details ──────────────────────────────────────────
   Shown to a student if their PDF won't save, so they know exactly who to
   tell. Put your name in, and an email or room number if you want one.
   Leave `contact` as an empty string to show no contact detail.        */
const TEACHER = {
  name: 'your teacher',
  contact: ''   // e.g. 'at msjones@school.org' or 'in Room 14'
};

const TYPES = {
  driftwood: {
    key: 'driftwood',
    name: 'Driftwood',
    emoji: '🪵',
    heading: 'You are Driftwood!',
    description:
      'Driftwood moves at its own pace and never seems to be in a hurry. You’re calm, independent, and comfortable being on your own for a while. You notice things other people float right past, and when you finally land somewhere, you stay put.'
  },
  lilypad: {
    key: 'lilypad',
    name: 'Lily Pad',
    emoji: '🍃',
    heading: 'You are a Lily Pad!',
    description:
      'Lily Pads are steady, adaptable, and quietly dependable. You handle whatever the day brings one step at a time, and you make things easier for everyone around you without making a big deal about it.'
  },
  duck: {
    key: 'duck',
    name: 'Duck',
    emoji: '🦆',
    heading: 'You are a Duck!',
    description:
      'Ducks are social, cheerful, and always where the group is. You keep the energy up, pull quiet people in, and make an ordinary day feel like an event. Nobody has a bad time when you’re around.'
  },
  canoe: {
    key: 'canoe',
    name: 'Canoe',
    emoji: '🛶',
    heading: 'You are a Canoe!',
    description:
      'Canoes are built to go somewhere. You’re curious, determined, and happiest when you’re heading toward something new. You’ll paddle past the easy spot to see what’s around the next bend.'
  }
};

const SCORE_ORDER = ['driftwood', 'lilypad', 'duck', 'canoe'];

const QUESTIONS = [
  {
    id: 1,
    section: '🌅 Morning at the Lake',
    type: 'choice',
    text: 'You get to the lake first thing in the morning. What’s the first thing you do?',
    options: [
      '🪵 Find a quiet spot and just watch the water.',
      '🍃 Set out the chairs and cooler so everything’s ready.',
      '🦆 Yell for everyone else to hurry up and get in.',
      '🛶 Head straight out to see how far you can swim.'
    ]
  },
  {
    id: 2,
    section: '🌅 Morning at the Lake',
    type: 'choice',
    text: 'Someone hands you a fishing pole. What’s your reaction?',
    options: [
      'Hold it and mostly enjoy sitting there.',
      'Cast it out and wait patiently.',
      'Talk the whole time and forget to watch the line.',
      'Keep trying new spots and bait until something bites.'
    ]
  },
  {
    id: 3,
    section: '🌅 Morning at the Lake',
    type: 'choice',
    text: 'The water is freezing. How do you get in?',
    options: [
      'I don’t. I’m good right here.',
      'One step at a time until I’m used to it.',
      'Whenever everyone else does — we go in together.',
      'Run down the dock and jump straight off the end.'
    ]
  },
  {
    id: 4,
    section: '🌅 Morning at the Lake',
    type: 'choice',
    text: 'You’re in charge of packing the cooler. What’s your strategy?',
    options: [
      'Grab whatever is already in the fridge.',
      'Pack the basics that everyone will want.',
      'Text the group and ask what people like.',
      'Make a list so nothing gets forgotten.'
    ]
  },
  {
    id: 5,
    section: '🐟 Out on the Water',
    type: 'choice',
    text: 'Your canoe starts drifting away from the group. What do you do?',
    options: [
      'Let it drift for a while — it’s peaceful out here.',
      'Paddle back at a steady pace.',
      'Shout over to everyone and turn it into a joke.',
      'Figure out which way the wind is pushing and take the fastest way back.'
    ]
  },
  {
    id: 6,
    section: '🐟 Out on the Water',
    type: 'choice',
    text: 'Your group is setting up a game off the dock. What role do you naturally take?',
    options: [
      'Watch from the shore until someone calls me in.',
      'Help set it up wherever I’m needed.',
      'Get everyone excited and keep score out loud.',
      'Explain the rules and organize the teams.'
    ]
  },
  {
    id: 7,
    section: '🐟 Out on the Water',
    type: 'choice',
    text: 'You spot something shiny on the lake bottom. What excites you most?',
    options: [
      'Just knowing it’s down there.',
      'Bringing it up to look at later.',
      'Calling everyone over to see it.',
      'Diving down to figure out what it actually is.'
    ]
  },
  {
    id: 8,
    section: '🐟 Out on the Water',
    type: 'written',
    text: 'The lake has one small island nobody has ever explored. Describe what you would find there.',
    prompt:
      'Explain: what the island looks like • one thing you discover there • how you feel standing on it • one reason you would go back.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'When I finally pulled up onto the island, the first thing I saw was…'
  },
  {
    id: 9,
    section: '🌲 Around the Campfire',
    type: 'choice',
    text: 'Which quote sounds most like you?',
    options: [
      '“I’m happy just being out here.”',
      '“I’ll take it as it comes.”',
      '“It’s not a good time unless everyone’s here.”',
      '“Let’s see how far we can get.”'
    ]
  },
  {
    id: 10,
    section: '🌲 Around the Campfire',
    type: 'choice',
    text: 'A storm rolls in and everyone has to pack up fast. What do you do?',
    options: [
      'Wait for someone to tell me what to grab.',
      'Quietly start packing up my own stuff.',
      'Crack jokes so nobody panics.',
      'Take charge and get everything loaded before the rain hits.'
    ]
  },
  {
    id: 11,
    section: '🌲 Around the Campfire',
    type: 'written',
    text: 'Every lake has a legend about something living in the deep end. Write the legend for this one.',
    prompt: 'Tell it the way you would tell it to someone around a campfire.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'They say that out in the middle of the lake, where it gets deep…'
  },
  {
    id: 12,
    section: '🌲 Around the Campfire',
    type: 'written',
    text: 'You get one perfect day at the lake, start to finish. Describe it.',
    prompt: 'Walk through the day in order — morning, afternoon, and after dark.',
    requirement: 'Write at least 3 sentences.',
    placeholder: 'My perfect lake day would start with…'
  },
  {
    id: 13,
    section: '🛶 Your Lake Style',
    type: 'choice',
    text: 'Which lake animal are you most like?',
    options: ['🐟 Catfish', '🦫 Beaver', '🐸 Frog', '🦅 Osprey']
  },
  {
    id: 14,
    section: '🛶 Your Lake Style',
    type: 'choice',
    text: 'Which phrase fits you best?',
    options: [
      '“I like doing my own thing.”',
      '“I like having a plan, but I can roll with changes.”',
      '“I’d rather be around people than by myself.”',
      '“I want to see how good I can get at something.”'
    ]
  },
  {
    id: 15,
    section: '🛶 Your Lake Style',
    type: 'choice',
    text: 'If you ran the boat rental shop, what would you rent out?',
    options: [
      'Inner tubes and floating chairs.',
      'Life jackets, paddles, and everything people forget.',
      'Pontoon boats with music and room for everybody.',
      'Kayaks, wakeboards, and maps of the hidden coves.'
    ]
  }
];
