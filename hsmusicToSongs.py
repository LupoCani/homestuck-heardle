# Requires pip install pyyaml if you ever want to rebake this for whatever reason

from typing import List
import yaml
import os
import json
import random

def load_file(path: str) -> List[object]:
    with open(path, 'r', encoding='utf8') as f:
        subfiles = yaml.load_all(f, Loader=yaml.SafeLoader)

        objs = []
        for subfile in subfiles:
            objs.append(subfile)

    return objs 

def get_valid_songs(album_names: List[str], excluded_songs: List[str]) -> List[object]:
    valid_songs = []

    for album_name in album_names:
        potential_songs = load_file(os.path.join(file_path, f"album/{album_name}.yaml"))
        for song in potential_songs:
            if all(x in song for x in ['Track', 'URLs']):
                song_name = song['Track']
                artists =  song['Artists'] if 'Artists' in song else potential_songs[0]['Artists']
                urls = song['URLs']
                youtube_link = next((url for url in urls if 'youtu' in url), None)
                if youtube_link is not None and song_name not in excluded_songs:
                    heardle_artists = ', '.join(artists)
                    heardle_song = {
                        'artist': heardle_artists,
                        'name': song_name,
                        'youtubeId': youtube_link.rsplit('/', 1)[-1],
                    }
                    if (heardle_artists, song_name) not in [(song['artist'], song['name']) for song in valid_songs]:
                        valid_songs.append(heardle_song)
    print(f"{len(valid_songs)} songs added from album list {album_names}")
    random.shuffle(valid_songs)
    return valid_songs

if __name__ == '__main__':
    file_path = os.path.dirname(os.path.realpath(__file__))
    
    easy_album_names = [
        'homestuck-vol-1', 'homestuck-vol-2', 'homestuck-vol-3', 'homestuck-vol-4', 'homestuck-vol-1-4', 'homestuck-vol-5', 'homestuck-vol-6', 'homestuck-vol-7', 'homestuck-vol-8', 'homestuck-vol-9', 'homestuck-vol-10', 
        'midnight-crew-drawing-dead', 'alternia', 'squiddles', 'the-felt', 'strife', 'alterniabound', 'medium', 'mobius-trip-and-hadron-kaleido', 'the-wanderers', 'prospit-and-derse', 'song-of-skaia',
        'colours-and-mayhem-universe-a', 'colours-and-mayhem-universe-b', 'symphony-impossible-to-play', 'one-year-older', 'genesis-frog', 'cherubim', 's-collide'
    ]

    hard_album_names = [
        'the-baby-is-you', 'homestuck-for-the-holidays', 'lofam', 'lofam2', 'lofam3', 'lofam4', 'lofam5', 'weird-puzzle-tunes', 'strife-2', 'xenoplanetarium',
        'gristmas-carols', 'p-s', 'cosmic-caretakers', 'diverging-delicacies', 'moons-of-theseus', 'jailbreak-vol-1', 'tomb-of-the-ancestors', 'sburb', 'beyond-canon',
        'cool-and-new-voulem1', 'sburb-ost', 'hiveswap-act-1-ost', 'hiveswap-act-2-ost' 
    ]

    excluded_songs = [
        'Sburban Jungle (Brief Mix)', # Ambiguous with SJ
        'Sburban Reversal', # Ambiguous with SC
        'Null', # Silence
    ]
    
    easy_songs = get_valid_songs(easy_album_names, excluded_songs)
    hard_songs = get_valid_songs(hard_album_names, excluded_songs)
    
    with open(f'easy_songs.txt', 'w') as f:
        f.write(json.dumps(easy_songs, sort_keys=True, indent=2))

    with open(f'hard_songs.txt', 'w') as f:
        f.write(json.dumps(hard_songs, sort_keys=True, indent=2))