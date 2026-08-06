/* Find Your Forest Vibe — question bank
 *
 * Options are listed here in SCORING order, always:
 *   index 0 -> rock, 1 -> pinecone, 2 -> woodland, 3 -> gem
 *
 * That is the authoring order only. On screen the four answers are shuffled
 * into a different order for every question, so students never see all the
 * Rock answers sitting in slot 1. Each answer keeps its own personality no
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
  rock: {
    key: 'rock',
    name: 'Rock',
    emoji: '🌿',
    heading: 'You are a Rock!',
    description:
      'Rocks are calm, independent, and unbothered by chaos. You tend to move at your own pace and observe the world around you carefully. When you choose to put your energy into something, you can be surprisingly strong and steady.'
  },
  pinecone: {
    key: 'pinecone',
    name: 'Pinecone',
    emoji: '🌲',
    heading: 'You are a Pinecone!',
    description:
      'Pinecones are balanced, adaptable, and reliable. You usually know how to go with the flow and handle challenges one step at a time. You help keep the classroom ecosystem grounded and steady.'
  },
  woodland: {
    key: 'woodland',
    name: 'Woodland Creature',
    emoji: '🐿️',
    heading: 'You are a Woodland Creature!',
    description:
      'Woodland Creatures bring energy, personality, and connection everywhere they go. You enjoy interacting with people, sharing ideas, and making situations more lively and fun. Your enthusiasm helps create community.'
  },
  gem: {
    key: 'gem',
    name: 'Gem',
    emoji: '💎',
    heading: 'You are a Gem!',
    description:
      'Gems are focused, thoughtful, and driven to grow. You often push yourself to improve, solve problems, and take pride in your work. Your determination and creativity help you shine in challenging situations.'
  }
};

const SCORE_ORDER = ['rock', 'pinecone', 'woodland', 'gem'];

const QUESTIONS = [
  {
    id: 1,
    type: 'choice',
    text: 'You’re starting a new video game. What’s your style?',
    options: [
      'I skip the tutorial and figure things out later.',
      'I follow the basics and see what happens.',
      'I play while talking to everyone around me.',
      'I study the strategies so I can master it quickly.'
    ]
  },
  {
    id: 2,
    type: 'choice',
    text: 'Your group is building a giant blanket fort. What role do you naturally take?',
    options: [
      'I mostly watch unless someone tells me exactly what to do.',
      'I help when needed.',
      'I keep everyone entertained and talking.',
      'I organize ideas and help make the fort awesome.'
    ]
  },
  {
    id: 3,
    type: 'choice',
    text: 'Which sounds MOST satisfying?',
    options: [
      'Finally getting to relax after avoiding chores all day',
      'Finishing something “well enough”',
      'Laughing with friends during class activities',
      'Completing something you’re proud of'
    ]
  },
  {
    id: 4,
    type: 'choice',
    text: 'Your teacher says a project is due in 2 weeks. You:',
    options: [
      'Forget about it until the last minute',
      'Plan to work on it eventually',
      'Start talking about ideas with everyone',
      'Break it into steps and get started early'
    ]
  },
  {
    id: 5,
    type: 'choice',
    text: 'If your desk represented your personality, it would look:',
    options: [
      'Like a natural disaster happened',
      'A little messy but manageable',
      'Covered with notes and random conversations',
      'Organized with everything ready to go'
    ]
  },
  {
    id: 6,
    type: 'choice',
    text: 'Which classroom sounds most enjoyable?',
    options: [
      'One where I can quietly do my own thing',
      'One that’s balanced and relaxed',
      'One where everyone talks and collaborates',
      'One where everyone is motivated and creative'
    ]
  },
  {
    id: 7,
    type: 'choice',
    text: 'When something is difficult, what do you usually do first?',
    options: [
      'Wait and hope it makes sense later',
      'Ask for help after trying a little',
      'Talk it through with other people',
      'Keep trying different strategies until it clicks'
    ]
  },
  {
    id: 8,
    type: 'written',
    text: 'Imagine you’re stranded on an island with 3 items. What do you bring and why?',
    prompt: 'Name all three items and explain your thinking for each one.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'The three things I would bring are…'
  },
  {
    id: 9,
    type: 'choice',
    text: 'Which statement sounds MOST like you?',
    options: [
      '“I work best under pressure.”',
      '“I do fine if I stay somewhat focused.”',
      '“I get energy from talking and sharing ideas.”',
      '“I like improving and doing my best.”'
    ]
  },
  {
    id: 10,
    type: 'choice',
    text: 'A teammate in your group is doing nothing. What do you MOST likely do?',
    options: [
      'Ignore it',
      'Quietly do your own part',
      'Talk to everyone about it',
      'Help solve the problem so the group succeeds'
    ]
  },
  {
    id: 11,
    type: 'written',
    text: 'You wake up tomorrow with ONE unusual ability. It cannot be super strength or flying.',
    prompt:
      'Describe: what the ability is • how you discovered it • one good thing about it • one problem it causes.',
    requirement: 'Write at least 5–10 sentences.',
    placeholder: 'When I woke up, I realized I could…'
  },
  {
    id: 12,
    type: 'written',
    text: 'Imagine your life is turned into a movie. What would the title be and why?',
    prompt: 'Give the title, then explain why it fits you.',
    requirement: 'Write at least 2–3 sentences.',
    placeholder: 'My movie would be called…'
  },
  {
    id: 13,
    type: 'written',
    text: 'A mysterious locked box appears in your classroom. Everyone wants to open it.',
    prompt: 'What do you think is inside, and what clues lead you to that conclusion?',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'I think the box contains…'
  },
  {
    id: 14,
    type: 'choice',
    text: 'Which animal would survive school the best?',
    options: ['Turtle 🐢', 'Golden Retriever 🐕', 'Squirrel 🐿️', 'Owl 🦉']
  },
  {
    id: 15,
    type: 'choice',
    text: 'Pick the phrase that fits you BEST:',
    options: [
      '“I move at my own pace.”',
      '“I usually get things done.”',
      '“I like being part of everything happening.”',
      '“I enjoy challenges.”'
    ]
  }
];
