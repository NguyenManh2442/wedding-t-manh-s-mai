/*global moment*/
const calDiffStr = (oldDate, newDate = Date.now()) => {
  const oldMoment = moment(oldDate);
  const newMoment = moment(newDate);
  const duration = moment.duration(newMoment.diff(oldMoment));
  return Math.floor(duration.as('d'));
}


const BOY = '🐱';
const GIRL = '🐯';
const DATE_MAP = {
  MEET: new Date('2021-05-02 08:30:00'),
  CONFESSION: new Date('2023-01-28 16:20:00'),
  CONFESSION_YES: new Date('2024-02-13 12:29:00'),
};


export default {
  code:
    `
// I'm in a good mood today
// I write code for your performance
// I'm going to start writing
const { ${BOY}, ${GIRL} } = 🇻🇳;
(${BOY}, ${GIRL}).Meet('${moment(DATE_MAP.MEET).format('YYYY-MM-DD HH:m:s')}');
(${BOY}, ${GIRL}).Confession('${moment(DATE_MAP.CONFESSION).format('YYYY-MM-DD HH:m:s')}');
(${BOY}, ${GIRL}).Propose('${moment(DATE_MAP.CONFESSION_YES).format('YYYY-MM-DD HH:m:s')}');

${BOY}.say('WoW，It’s been ${calDiffStr(DATE_MAP.MEET)} days！');
....

// In the near future
${BOY}.say('Marry me!❤️');
${GIRL}.response('Yes, I do！');

(${BOY}, ${GIRL}).Marry('08/09/2024')
(${BOY}, ${GIRL}).SendInvitation('01/09/2024');

// Okay, I've finished writing
// I'm going to start running`,
  executions: [{
    name: 'Initialization',
    time: '',
    duration: 0,
    visible: false
  }, {
    name: 'Decompressing',
    time: '',
    duration: 0,
    visible: false
  }, {
    name: 'Assembling',
    time: '',
    duration: 0,
    visible: false
  }, {
    name: 'Packaging',
    time: '',
    duration: 0,
    visible: false
  }, {
    name: 'Smile🙂',
    time: '',
    duration: 0,
    visible: false
  }, {
    name: 'Laughing😄',
    time: '',
    duration: 0,
    visible: false
  }, {
    name: 'Compiling...',
    time: '',
    visible: false
  }],
}