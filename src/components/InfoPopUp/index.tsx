import React from "react";
import { Button } from "..";

import * as Styled from "./index.styled";

interface Props {
  onClose: () => void;
}

export function InfoPopUp({ onClose }: Props) {
  return (
    <Styled.Container>
      <Styled.PopUp>
        <h1>HOW TO PLAY</h1>
        <Styled.Section>
          <p>Listen to the intro, then find the correct Homestuck song in the list. This game currently takes songs from the official albums on weekdays, and a few popular fanmusic/unofficial albums on Saturday and Sunday.</p>
        </Styled.Section>
        <Styled.Section>
          <p>Incorrect attempts unlock more parts of the song, and tell you if you got the artist, album or theme right:</p>
          <ul>
            <li><b>Song:</b> The game ends if you get this right, otherwise it&apos;ll show up <span className="red">red</span>.</li>
            <li><b>Artist:</b> If one of more of the contributors of your guess are in the final song, it&apos;ll be <span className="yellow">yellow</span>, white if they&apos;re all in the final song, <span className="red">red</span> if none are.</li>
            <li><b>Album:</b> White if you got it right, <span className="red">red</span> if you didn&apos;t.</li>
            <li><b>Theme:</b> If one of more of the art tags (characters or locations that appear in the art) of your guess are in the final song, it&apos;ll be <span className="yellow">yellow</span>, white if they&apos;re all in the true song, <span className="red">red</span> if none apply.</li>
          </ul>
          <p>If you&apos;re stuck, the skip button (or an empty guess) will submit a random song from the soundtrack.</p>
        </Styled.Section>
        <Styled.Section>
          <p>Answer in as few tries as possible and share your score!</p>
        </Styled.Section>
        <Button variant="green" style={{ marginTop: 20 }} onClick={onClose}>
          Play
        </Button>
      </Styled.PopUp>
    </Styled.Container>
  );
}
