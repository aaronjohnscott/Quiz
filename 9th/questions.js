/* Urban Pulse! question bank
 *
 * Options are listed in scoring order, always:
 *   index 0 -> navigator, 1 -> planner, 2 -> connector, 3 -> builder
 */

const TEACHER = {
  name: 'your teacher',
  contact: ''
};

const TYPES = {
  navigator: {
    key: 'navigator',
    name: 'Night Navigator',
    emoji: '#',
    heading: 'You are a Night Navigator!',
    description:
      'Night Navigators stay calm when the streets get loud. You notice patterns first, keep routes clear, and move with steady control when energy spikes.'
  },
  planner: {
    key: 'planner',
    name: 'City Planner',
    emoji: '*',
    heading: 'You are a City Planner!',
    description:
      'City Planners are organized and practical. You think ahead, cover details, and make sure people feel safe and supported.'
  },
  connector: {
    key: 'connector',
    name: 'Neon Connector',
    emoji: '+',
    heading: 'You are a Neon Connector!',
    description:
      'Neon Connectors are social and energetic. You keep groups moving together and can lift the mood of any room.'
  },
  builder: {
    key: 'builder',
    name: 'Rooftop Builder',
    emoji: 'x',
    heading: 'You are a Rooftop Builder!',
    description:
      'Rooftop Builders are goal-driven and hands-on. You like practical progress and are happiest when results move from idea to action.'
  }
};

const SCORE_ORDER = ['navigator', 'planner', 'connector', 'builder'];

const QUESTIONS = [
  {
    id: 1,
    section: 'SECTION 1: EARLY STRIDE',
    type: 'choice',
    text: 'You arrive first at the school gym for a long weekend event. What do you do?',
    options: [
      'Walk the room once and map the main entrances.',
      'Set up signs so everyone knows where to be.',
      'Say hi to everyone before event starts.',
      'Look for supplies so you can start building setup right away.'
    ]
  },
  {
    id: 2,
    section: 'SECTION 1: EARLY STRIDE',
    type: 'choice',
    text: 'A friend passes you a snack list to help them choose dinner.',
    options: [
      'Pick one option and get it done fast.',
      'Create a balanced list with a backup plan.',
      'Ask group tastes and make options for everyone.',
      'Streamline choices into an efficient prep order.'
    ]
  },
  {
    id: 3,
    section: 'SECTION 1: EARLY STRIDE',
    type: 'choice',
    text: 'Your bus is late and everyone is in a messy line.',
    options: [
      'Wait for the right timing and stay ready for the next stop.',
      'Ask staff for a clear order and keep it active.',
      'Make a joke to keep the mood light while waiting.',
      'Check who is missing and find a practical way to fix it.'
    ]
  },
  {
    id: 4,
    section: 'SECTION 1: EARLY STRIDE',
    type: 'choice',
    text: 'You are asked to lead a short warm-up routine.',
    options: [
      'Let people move in a way that feels natural.',
      'Share a clear timeline before you start.',
      'Bring energy and coach everyone into the flow.',
      'Set a target and push everyone through quickly.'
    ]
  },

  {
    id: 5,
    section: 'SECTION 2: LUNCH HOUR',
    type: 'choice',
    text: 'A ride-share app shows a major downtown detour. What is your move?',
    options: [
      'Stick to your current route and stay flexible.',
      'Find the safest alternate route and update the group.',
      'Keep everyone connected with quick updates while rerouting.',
      'Turn it into a challenge and beat the expected arrival time.'
    ]
  },
  {
    id: 6,
    section: 'SECTION 2: LUNCH HOUR',
    type: 'choice',
    text: 'At a food truck block party, someone asks you to set up teams.',
    options: [
      'Assign teams quickly and let people self-organize.',
      'Draft a short plan so each station has a clear task.',
      'Introduce people so quieter students pair with confident ones.',
      'Choose who does what and check that tasks are completed.'
    ]
  },
  {
    id: 7,
    section: 'SECTION 2: LUNCH HOUR',
    type: 'choice',
    text: 'You hear a local band setting up on the corner. What catches your eye first?',
    options: [
      'Where people enter and where exits are placed.',
      'The order of setup so nothing is left behind.',
      'Who is enjoying the music and why.',
      'How to help with cables, speakers, and timing.'
    ]
  },
  {
    id: 8,
    section: 'SECTION 2: LUNCH HOUR',
    type: 'written',
    text: 'Your route takes you through an alley everyone says is boring. Write what it feels like to discover it anyway.',
    prompt: 'Describe the lights, sounds, textures, one person you notice, and why you would return.',
    requirement: 'Write at least 6 sentences.',
    placeholder: 'At first the alley looked ordinary, but when I looked closer, I noticed...'
  },

  {
    id: 9,
    section: 'SECTION 3: NIGHT SHIFT',
    type: 'choice',
    text: 'Which phrase sounds most like you?',
    options: [
      'I keep moving so I can see the whole map.',
      'I like having a plan, but can change if needed.',
      'I get a lot done when people move together.',
      'I want to finish and then improve things next time.'
    ]
  },
  {
    id: 10,
    section: 'SECTION 3: NIGHT SHIFT',
    type: 'choice',
    text: 'Power flickers off during an event-planning session. What do you do?',
    options: [
      'Use the pause to focus on manual next steps.',
      'Assign a backup plan and communication chain.',
      'Keep everyone calm and coordinate by voice.',
      'Reassign roles and keep moving tasks in motion.'
    ]
  },
  {
    id: 11,
    section: 'SECTION 3: NIGHT SHIFT',
    type: 'written',
    text: 'Every city has one legend. Write a legend about a strange sound you hear after dark.',
    prompt: 'Tell it as a story you might tell someone while walking home.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'People around here say the sound means...'
  },
  {
    id: 12,
    section: 'SECTION 3: NIGHT SHIFT',
    type: 'written',
    text: 'Describe one perfect day in your city, from morning to late-night lights.',
    prompt: 'Walk through the day in order with people, places, and your own choices.',
    requirement: 'Write at least 4 sentences.',
    placeholder: 'By sunrise, the city felt...'
  },

  {
    id: 13,
    section: 'SECTION 4: CITY STYLE',
    type: 'choice',
    text: 'Which city role sounds most like your energy?',
    options: ['Signal Coordinator', 'Route Designer', 'Community Host', 'Street Engineer']
  },
  {
    id: 14,
    section: 'SECTION 4: CITY STYLE',
    type: 'choice',
    text: 'Which phrase fits you best?',
    options: [
      'I like knowing where everyone is headed.',
      'I work best with a checklist.',
      'I want everyone to feel included.',
      'I want to finish and then make it better.'
    ]
  },
  {
    id: 15,
    section: 'SECTION 4: CITY STYLE',
    type: 'choice',
    text: 'If you ran a weekend block festival, what would you lead?',
    options: [
      'A guided night route with hidden landmarks.',
      'A full logistics chart and volunteer desk.',
      'An open mic that brings everyone onstage.',
      'The build-out team for lighting, booths, and cleanup.'
    ]
  }
];
