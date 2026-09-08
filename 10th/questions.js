/* Cosmic Compass! question bank
 *
 * Options are listed in scoring order:
 *   index 0 -> stargazer, 1 -> mission control, 2 -> orbit mate, 3 -> trailblazer
 */

const TEACHER = {
  name: 'your teacher',
  contact: ''
};

const TYPES = {
  stargazer: {
    key: 'stargazer',
    name: 'Stargazer',
    emoji: '*',
    heading: 'You are a Stargazer!',
    description:
      'Stargazers are curious, observant, and imaginative. You notice the details other people miss, ask thoughtful questions, and find meaning in the big picture.'
  },
  missioncontrol: {
    key: 'missioncontrol',
    name: 'Mission Control',
    emoji: '#',
    heading: 'You are Mission Control!',
    description:
      'Mission Control types are prepared, steady, and dependable. You think ahead, track the details, and help a team feel ready for whatever comes next.'
  },
  orbitmate: {
    key: 'orbitmate',
    name: 'Orbit Mate',
    emoji: '+',
    heading: 'You are an Orbit Mate!',
    description:
      'Orbit Mates are warm, collaborative, and encouraging. You bring people into the conversation and make a group feel like a real crew.'
  },
  trailblazer: {
    key: 'trailblazer',
    name: 'Trailblazer',
    emoji: 'x',
    heading: 'You are a Trailblazer!',
    description:
      'Trailblazers are bold, practical, and ready to experiment. You would rather test an idea, learn from it, and keep moving than wait for perfect conditions.'
  }
};

const SCORE_ORDER = ['stargazer', 'missioncontrol', 'orbitmate', 'trailblazer'];

const QUESTIONS = [
  {
    id: 1,
    section: 'SECTION 1: LAUNCH DAY',
    type: 'choice',
    text: 'Your class gets to design a tiny satellite. What do you do first?',
    options: [
      'Sketch what it might discover and send back to Earth.',
      'List the materials, deadlines, and jobs we will need.',
      'Ask everyone what part they want to help with.',
      'Start building a quick model and improve it as we go.'
    ]
  },
  {
    id: 2,
    section: 'SECTION 1: LAUNCH DAY',
    type: 'choice',
    text: 'You are packing for a trip to a new planet. Which item matters most?',
    options: [
      'A notebook for observations and questions.',
      'A checklist with backups for every important supply.',
      'A way to send messages to the rest of the crew.',
      'A useful tool that can solve unexpected problems.'
    ]
  },
  {
    id: 3,
    section: 'SECTION 1: LAUNCH DAY',
    type: 'choice',
    text: 'The countdown pauses because one sensor is acting strangely. What is your move?',
    options: [
      'Study the readings and wonder what the signal could mean.',
      'Follow the safety steps and check the sensor carefully.',
      'Explain the pause so everyone knows what is happening.',
      'Try a practical fix and see whether the readings improve.'
    ]
  },
  {
    id: 4,
    section: 'SECTION 1: LAUNCH DAY',
    type: 'choice',
    text: 'A new student joins your space crew. How do you help them settle in?',
    options: [
      'Show them the most interesting things the crew is studying.',
      'Explain the routine, roles, and where everything belongs.',
      'Introduce them to everyone and invite them into the conversation.',
      'Give them a small job so they can jump into the action.'
    ]
  },

  {
    id: 5,
    section: 'SECTION 2: DEEP SPACE',
    type: 'choice',
    text: 'Your ship reaches a fork in the star map. Which route feels right?',
    options: [
      'The route with the most mysteries to investigate.',
      'The route with the clearest data and safest plan.',
      'The route where the whole crew can decide together.',
      'The route no one has tried yet.'
    ]
  },
  {
    id: 6,
    section: 'SECTION 2: DEEP SPACE',
    type: 'choice',
    text: 'You discover a glowing object drifting outside the window. What catches your attention?',
    options: [
      'Its color, shape, and the story it might tell about space.',
      'Its distance, speed, and whether it could affect the ship.',
      "Everyone's reaction as the crew gathers to look.",
      'How to safely get closer and learn what it can do.'
    ]
  },
  {
    id: 7,
    section: 'SECTION 2: DEEP SPACE',
    type: 'choice',
    text: 'The crew has one free hour between missions. What sounds best?',
    options: [
      'Look through the telescope and make a new discovery.',
      'Organize the cabin and prepare for tomorrow.',
      'Play a game that gets the whole crew laughing.',
      'Test a new gadget or explore an off-limits-looking corridor.'
    ]
  },
  {
    id: 8,
    section: 'SECTION 2: DEEP SPACE',
    type: 'written',
    text: 'Your ship passes a planet that no map has ever recorded. Describe what you see.',
    prompt: "Include the planet's colors, landscape, atmosphere, one surprising detail, and what you think might live there.",
    requirement: 'Write at least 6 sentences.',
    placeholder: 'At first, the unknown planet looked like...'
  },

  {
    id: 9,
    section: 'SECTION 3: RETURN SIGNAL',
    type: 'choice',
    text: 'A mysterious message arrives from far away. What is your first thought?',
    options: [
      'What could the sender be trying to tell us?',
      'How can we record it and verify the information?',
      'Who should we gather to listen and figure it out together?',
      'How quickly can we answer and start a real exchange?'
    ]
  },
  {
    id: 10,
    section: 'SECTION 3: RETURN SIGNAL',
    type: 'choice',
    text: 'Your team has to present its mission to Earth. Which role would you choose?',
    options: [
      'Create the story, images, and big questions behind the mission.',
      'Track the facts, timing, and order of the presentation.',
      'Welcome questions and make sure every teammate is heard.',
      'Build the demonstration and make the idea come alive.'
    ]
  },
  {
    id: 11,
    section: 'SECTION 3: RETURN SIGNAL',
    type: 'written',
    text: 'Write a short message from a space explorer who has just seen something impossible.',
    prompt: 'Make the message sound personal. Explain what happened, how the explorer felt, and what should happen next.',
    requirement: 'Write at least 5 sentences.',
    placeholder: 'To whoever receives this message: I need you to know...'
  },
  {
    id: 12,
    section: 'SECTION 3: RETURN SIGNAL',
    type: 'written',
    text: 'Imagine you can spend one perfect day anywhere in the universe. Tell the story.',
    prompt: 'Move through the day in order and include the place, the people with you, and one choice you make.',
    requirement: 'Write at least 4 sentences.',
    placeholder: 'When I woke up, I was somewhere no one on Earth had ever...'
  },

  {
    id: 13,
    section: 'SECTION 4: COSMIC STYLE',
    type: 'choice',
    text: 'Which space-station job sounds most like your energy?',
    options: ['Telescope Observer', 'Flight Director', 'Crew Host', 'Rover Engineer']
  },
  {
    id: 14,
    section: 'SECTION 4: COSMIC STYLE',
    type: 'choice',
    text: 'Which phrase fits you best when a challenge appears?',
    options: [
      'I want to understand what is really going on.',
      'I want a clear plan before we begin.',
      'I want everyone to feel supported.',
      'I want to try something and learn from the result.'
    ]
  },
  {
    id: 15,
    section: 'SECTION 4: COSMIC STYLE',
    type: 'choice',
    text: 'If you led a mission to a brand-new moon, what would you lead?',
    options: [
      "The team searching for clues about its history.",
      'The mission schedule, supplies, and safety checks.',
      'The crew community that keeps everyone connected.',
      'The landing team that explores the surface first.'
    ]
  }
];
