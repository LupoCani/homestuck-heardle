import { GuessType } from "../types/guess";
import { isWeekend } from "./isWeekend";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let EMOJIS: any;

if (isWeekend) {
  EMOJIS = {
    red: "⬜",
    yellow: "🟨",
    white: "🟦",
  };
} else {
  EMOJIS = {
    red: "⬜",
    yellow: "🟨",
    white: "🟩",
  };
}

export function guessToEmoji(guess: GuessType): string {
  const songEmoji = guess.isCorrect ? EMOJIS.white : EMOJIS.red;
  const artistEmoji =  EMOJIS[guess.artistColor as keyof typeof EMOJIS] ;
  const albumEmoji = guess.rightAlbum ? EMOJIS.white : EMOJIS.red;
  const tagsEmoji =  EMOJIS[guess.tagColor as keyof typeof EMOJIS];
  return `${songEmoji}${artistEmoji}${albumEmoji}${tagsEmoji}`;
}

export function scoreToEmoji(guesses: GuessType[], noEmbed: boolean, noLinks: boolean): string {
  const msInDay = 86400000;
  const startDate = new Date(Date.UTC(2022, 4, 2, 0, 0, 0));
  const todaysDate = new Date();
  const index = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay) + 1 ;
  let suffix = "";
  if (noLinks === false) suffix = noEmbed ? '\nPlayed at <https://heardle.homestuck.net>' : '\nPlayed at https://heardle.homestuck.net';

  let score = 'X';
  let scoreEmojis = "";

  guesses.forEach((guess: GuessType, index) => {
    if (guess.isCorrect) score = (index + 1).toString();
    if (guess.song) scoreEmojis +=  '\n' + guessToEmoji(guess);
  });

  const prefix = isWeekend ? `Homestuck Fanmusic Heardle #${index} ${score}/6` : `Homestuck Heardle #${index} ${score}/6`;

  return `${prefix}${scoreEmojis}${suffix}`;
}
