# Infinite Bidirectional Capped Scroll

An example of infinite scroll that loads new items on both hitting the bottom and the top of the page
and trims the total amount of items so that a maximum number of items in the page is capped.

## Running

|         |                        |
|---------|------------------------|
| Windows | `start src/index.html` |
| Unix    | `open src/index.html`  |

## Licensing

This repository is licensed under the terms of the [MIT license](LICENSE.md).

## Contributing

Please use VS Code to have `.vscode/settings.json` workspace settings picked up automatically or honor the following code formatting ruleset:

- End files with a newline (`html.format.endWithNewline` set to `true`)
- No blank lines before or after any "special" tags (`html.format.extraLiners` set to `""`)
- `head` and `body` indented like any other element (`html.format.indentInnerHtml` set to `true`)
- No ugly wrapping in the source (ew), only when viewer if need be (`html.format.wrapLineLength` set to `0`)
- We use two spaces in this house (`editor.insertSpaces` set to `true` and `editor.tabSize` set to `2`)

See [development plan](doc/tasks.md).

## Studying

See [development log](doc/notes.md).
