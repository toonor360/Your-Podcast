# Your Podcast

#### Create your own Podcast website with simple no code configuration.

You can edit episodes and podcast details via the `config.json` file in the src/ directory.

All images should be added to the `src/assets/logos` directory, and in `config.json`, only the filename with the extension should be specified, without the path.

For example: if there’s a file named `src/assets/logos/your-logo.png`, you only need to write `your-logo.png` in `config.json`.

All audio files should be added to the `src/assets/audio` directory, and in `config.json`, only the filename with the extension should be specified, without the path.

For example: if there’s a file named `src/assets/audio/episode.mp3`, you only need to write `episode.mp3` in `config.json`.

## How to Add New Episodes?

1. Edit the `src/config.json` file and add a new episode.
2. Add the episode’s audio file to the `src/assets/audio` directory.
3. You can add an image for the episode by adding a file in the `src/assets/logos` directory with the same name as the episode.

For example: if you want to add a new episode with an audio file located at `src/assets/audio/episode.mp3`, you would write the following in `config.json`:

```json
{
  "episodes": [
    {
      "title": "New Episode",
      "description": "Description of the new episode",
      "file": "episode.mp3",
      "uploadDate": "Nov 7, 2024",
      "image": "episode.png"
    }
  ]
}
```

## How to Add a Link to a Platform?

1. Edit the `src/config.json` file and add a new platform.
2. Add an image for the platform by adding a file to the `src/assets/platforms` directory.

For example: if you want to add a link to Spotify, you would write the following in `config.json`:

```json
{
  "platforms": [
    {
      "name": "spotify",
      "url": "https://open.spotify.com/show/some-id",
      "icon": "spotify.png"
    }
  ]
}
```

## How to change color scheme?

Edit the primary and secondary colors in `tailwind.config.js` file to the colors of your choosing.


<br>

### Disclaimer

_This repo is a personal project and not an official or affiliated product of any company or existing website. The goal of this project is solely for learning, experimentation, and personal growth. It is not intended to replicate, profit from, or misuse any designs, features, or intellectual property of any existing website. Any resemblance to another website is purely coincidental and unintentional._

_I do not own the rights to any of the images, logos, or audio files used in this project. All rights belong to their respective owners._