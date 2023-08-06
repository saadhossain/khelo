import { Session } from './interface';

export const button = {
  inline_btn: {},
  keyboard_btn: {
    start: {
      Games: 'Games',
      Codex: 'Codex',
      Upload_photo: 'Upload Photo',
      My_Profile: 'My Profile',
    },
    games: {
      Pacman: 'Pacman',
      Astray: 'Astray',
      Tower: 'Tower',
      Brickout: 'Brickout',
    },
    common: {
      Back: 'Back',
    },
  },
};

export const state = {
  start: {
    text: (name: string) =>
      `Welcome back ${name}, \n my friend Pick a game 👇 and challenge your friends! 💪`,
    markup: {
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [
          [
            { text: button.keyboard_btn.start.Games },
            { text: button.keyboard_btn.start.Codex },
          ],
          [
            { text: button.keyboard_btn.start.Upload_photo },
            { text: button.keyboard_btn.start.My_Profile },
          ],
        ],
      },
    },
  },
  games: {
    text: `Please choose following one 👇 to play `,

    markup: {
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [
          [
            { text: button.keyboard_btn.games.Astray },
            { text: button.keyboard_btn.games.Pacman },
          ],
          [
            { text: button.keyboard_btn.games.Tower },
            { text: button.keyboard_btn.games.Brickout },
          ],
          [{ text: button.keyboard_btn.common.Back }],
        ],
      },
    },
  },
  game_card: {},
  ask_for_game_title: {
    text: 'Please inter your game name to generate new game',
  },
};

export const sessionDefaultValue: Session = {
  Back: '',
  next: '',
  store: {
    clone: {
      game_id: '',
      title: '',
      game_name: '',
      img: '',
    },
    generate: { imageURL: '', title: '' },
    games: [],
  },
};
