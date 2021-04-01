# Infinite Bidirectional Capped Scroll

[**LIVE**](https://tomashubelbauer.github.io/infinite-bidirectional-capped-scroll)

An example of infinite scroll that loads new items on both hitting the bottom and the top of the page
and trims the total amount of items so that a maximum number of items in the page is capped.

## To-Do

### Achieve smooth scroll on the horizontal axis as well

### Fix behavior on Windows Firefox where scrolling to the causes oscilation

### Try to preserve the scroll momentum when using the touchpad

On macOS Firefox, when flicking the touchpad to give the scroll a significant
momentum, the scrollbar reaches the bottom of the page and gets stopped abruptly
which does not preserve its momentum. Instead, we could try detecting the speed
of scrolling soon and adjust the mounted content accordingly so that it grows
fast enough to drain the momentum of the scroll without reaching the end of the
page before more content is loaded.

### Package up as an ESM library and add depending instructions to the readme

Host using GitHub Pages to get a URL with the correct MIME.
