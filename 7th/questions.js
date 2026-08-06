/* Beach Bound! — question bank
 *
 * Options are listed here in SCORING order, always:
 *   index 0 -> shell, 1 -> starfish, 2 -> dolphin, 3 -> wave
 *
 * That is the authoring order only. On screen the four answers are shuffled
 * into a different order for every question, so students never see all the
 * Shell answers sitting in slot 1. Each answer keeps its own personality no
 * matter where it lands, and the points are added up from that — so editing
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
  shell: {
    key: 'shell',
    name: 'Shell',
    emoji: '🐚',
    heading: 'You are a Shell!',
    description:
      'Shells are calm, thoughtful, and comfortable moving at their own pace. You enjoy peaceful moments and often observe before jumping into something new. Like every shell, you have hidden strengths waiting to be discovered.'
  },
  starfish: {
    key: 'starfish',
    name: 'Starfish',
    emoji: '⭐',
    heading: 'You are a Starfish!',
    description:
      'Starfish are flexible, resilient, and quietly dependable. You adapt well to new situations and approach challenges one step at a time. Others appreciate your calm attitude and willingness to help when it’s needed.'
  },
  dolphin: {
    key: 'dolphin',
    name: 'Dolphin',
    emoji: '🐬',
    heading: 'You are a Dolphin!',
    description:
      'Dolphins are energetic, friendly, and love connecting with others. Your enthusiasm helps people feel welcome, and you bring excitement and laughter wherever you go.'
  },
  wave: {
    key: 'wave',
    name: 'Wave',
    emoji: '🌊',
    heading: 'You are a Wave!',
    description:
      'Waves are always moving forward. You’re curious, determined, and love taking on new challenges. Your drive to learn and improve helps you make a lasting impact wherever you go.'
  }
};

const SCORE_ORDER = ['shell', 'starfish', 'dolphin', 'wave'];

const QUESTIONS = [
  {
    id: 1,
    section: '🌞 Beach Vibes',
    type: 'choice',
    text: 'You arrive at a beautiful beach. What’s the first thing you do?',
    options: [
      '😎 Find the perfect spot to relax and enjoy the view.',
      '🏖️ Set up your towel and umbrella before exploring.',
      '🏐 Join the first group playing volleyball or frisbee.',
      '🗺️ Walk the shoreline to discover hidden treasures.'
    ]
  },
  {
    id: 2,
    section: '🌞 Beach Vibes',
    type: 'choice',
    text: 'You find a mysterious map in the sand. What do you do?',
    options: [
      'Leave it where it is.',
      'Pick it up and look it over later.',
      'Show everyone nearby and ask what they think.',
      'Start following it immediately to solve the mystery.'
    ]
  },
  {
    id: 3,
    section: '🌞 Beach Vibes',
    type: 'choice',
    text: 'Which beach activity sounds the most fun?',
    options: [
      'Floating peacefully in the water.',
      'Building a giant sandcastle.',
      'Playing games with friends.',
      'Learning to surf or paddleboard.'
    ]
  },
  {
    id: 4,
    section: '🌞 Beach Vibes',
    type: 'choice',
    text: 'You’re packing for a beach vacation. What’s your strategy?',
    options: [
      'I’ll throw things in the bag when it’s time to leave.',
      'I’ll make sure I have the basics.',
      'I’ll ask my friends what they’re bringing.',
      'I’ll make a checklist so I don’t forget anything.'
    ]
  },
  {
    id: 5,
    section: '🐚 Island Adventures',
    type: 'choice',
    text: 'You discover a cave. What do you do?',
    options: [
      'Decide it’s probably not worth exploring.',
      'Peek inside but don’t go too far.',
      'Invite everyone to come explore together.',
      'Carefully investigate to see what you can discover.'
    ]
  },
  {
    id: 6,
    section: '🐚 Island Adventures',
    type: 'choice',
    text: 'Your group needs to build a raft. What role do you naturally take?',
    options: [
      'Wait until someone tells you what to do.',
      'Help wherever needed.',
      'Keep everyone motivated and laughing.',
      'Organize the plan and divide up the jobs.'
    ]
  },
  {
    id: 7,
    section: '🐚 Island Adventures',
    type: 'choice',
    text: 'You find an old bottle with a message inside. What excites you most?',
    options: [
      'Having a cool souvenir.',
      'Reading the message.',
      'Sharing it with everyone.',
      'Figuring out who wrote it and solving the mystery.'
    ]
  },
  {
    id: 8,
    section: '🐚 Island Adventures',
    type: 'written',
    text: 'If you could have one beach superpower, which would you choose?',
    prompt:
      'Explain: what your power is • how you would use it • one advantage • one unexpected challenge.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'My beach superpower would be…'
  },
  {
    id: 9,
    section: '🌊 Ocean Thinking',
    type: 'choice',
    text: 'Which quote sounds most like you?',
    options: [
      '“I’ll figure it out eventually.”',
      '“Slow and steady works for me.”',
      '“Everything is more fun with other people.”',
      '“There’s always something new to learn.”'
    ]
  },
  {
    id: 10,
    section: '🌊 Ocean Thinking',
    type: 'choice',
    text: 'A giant wave knocks over everyone’s sandcastle. What do you do?',
    options: [
      'Build another one later.',
      'Help clean up your own area.',
      'Laugh and encourage everyone to rebuild together.',
      'Come up with a stronger design that won’t fall next time.'
    ]
  },
  {
    id: 11,
    section: '🌊 Ocean Thinking',
    type: 'written',
    text: 'Imagine dolphins could talk. What is the first question you would ask them?',
    prompt: 'Give your question, then explain why that is the one you would ask.',
    requirement: 'Write at least 3 sentences.',
    placeholder: 'The first thing I would ask a dolphin is…'
  },
  {
    id: 12,
    section: '🌊 Ocean Thinking',
    type: 'written',
    text: 'You discover a tiny uninhabited island. Describe what your first 24 hours would look like.',
    prompt: 'Walk through the day in order — what you do first, next, and last.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'The moment I stepped onto the island, I…'
  },
  {
    id: 13,
    section: '🌴 Your Beach Style',
    type: 'choice',
    text: 'Which beach animal would you most want as a companion?',
    options: ['🐢 Sea Turtle', '🦀 Hermit Crab', '🐬 Dolphin', '🦅 Seagull']
  },
  {
    id: 14,
    section: '🌴 Your Beach Style',
    type: 'choice',
    text: 'Which phrase fits you best?',
    options: [
      '“I’m happiest taking things one step at a time.”',
      '“I like having a plan, but I stay flexible.”',
      '“I enjoy being around people.”',
      '“I love challenging myself.”'
    ]
  },
  {
    id: 15,
    section: '🌴 Your Beach Style',
    type: 'choice',
    text: 'If you opened a beach shop, what would it sell?',
    options: [
      'Cold drinks and hammocks.',
      'Beach essentials for everyone.',
      'Games, music, and souvenirs.',
      'Adventure gear and maps.'
    ]
  }
];
