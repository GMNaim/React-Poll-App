const POLLS = [
  {
    id: "2434v",
    title: "What is your fav prog lang",
    description: "description",
    options: [
      {
        id: "unique id of each option",
        value: "C Programming",
        vote: 0,
      },
      {
        id: "4567gh45",
        value: "Java",
        vote: 0,
      },
      {
        id: "we can generate unique id with shortid package",
        value: "Python",
        vote: 0,
      },
      {
        id: "sdf3g43f",
        value: "Javascript",
        vote: 0, // total nuber of vote for this option
      },
    ],
    created: new Date(), // when the poll is created
    totalVote: 0, // total vote for this poll
    opinions: [], // info of persons who give opinions
  },
  {
    id: "2434sdfv",
    title: "How are you felling today?",
    description: "description",
    options: [
      {
        id: "unique id of each optionsdf",
        value: "Good",
        vote: 0,
      },
      {
        id: "4567ghwer45",
        value: "Bad",
        vote: 0,
      },
      {
        id: "we can generate unique id with shortid packageewr br",
        value: "Awesome",
        vote: 0,
      },
      {
        id: "sdf3werg43f",
        value: "Not Good Not Bad",
        vote: 0, // total nuber of vote for this option
      },
    ],
    created: new Date(), // when the poll is created
    totalVote: 0, // total vote for this poll
    opinions: [], // info of persons who give opinions
  },
  {
    id: "2434324 v",
    title: "What is your profession?",
    description: "description",
    options: [
      {
        id: "324unique id of each option",
        value: "Student",
        vote: 0,
      },
      {
        id: "456 g37gh45",
        value: "Job holder",
        vote: 0,
      },
    ],
    created: new Date(), // when the poll is created
    totalVote: 0, // total vote for this poll
    opinions: [], // info of persons who give opinions
  },
  {
    id: "24dre68-34v",
    title: "What are you doing in this free time?",
    description: "description",
    options: [
      {
        id: "6-68runique id of each option",
        value: "Playing game",
        vote: 0,
      },
      {
        id: "4r68r8-f567gh45",
        value: "Studying",
        vote: 0,
      },
      {
        id: "---6868 we can generate unique id with shortid package",
        value: "Sleeping",
        vote: 0,
      },
    ],
    created: new Date(), // when the poll is created
    totalVote: 0, // total vote for this poll
    opinions: [], // info of persons who give opinions
  },
];

export default POLLS;
