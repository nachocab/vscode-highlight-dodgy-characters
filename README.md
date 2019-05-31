# Highlight dodgy characters

Highlight all non-ascii characters (port of [Highlight Dodgy Characters](https://packagecontrol.io/packages/Highlight%20Dodgy%20Chars) from Sublime Text)

![Screenshot](./screenshot.png "Screenshot")

## Features

It highlights all the non-ascii characters, including dashes, fancy quotes and emojis.

Inspired from [Highlight Bad Chars](https://github.com/WengerK/vscode-highlight-bad-chars/)

### Whitelisting

You can override the whitelist of characters that will not be highlighted in your workspace or user settings:
```
"highlight-dodgy-characters.whitelist": "´€£¡¿äàáâãåǎąăæçćĉčđďðèéêëěęĝģğĥìíîïıĵķĺļłľñńňöòóôõőøœŕřẞßśŝşšșťţþțüùúûűũųůŵýÿŷźžż"
```

The default "bad char" decoration style can be configured through the `highlight-dodgy-characters.badCharDecorationStyle` and defaults to:

```
    "highlight-dodgy-characters.badCharDecorationStyle": {
        "cursor": "crosshair",
        "backgroundColor": "rgba(255,0,0,0.3)",
        "borderWidth": "1px",
        "borderStyle": "solid",
        "borderColor": "rgba(255,0,0,0.6)"
    }
```

### Examples

An example file that contains dodgy characters can be found [here](./src/test/examples.txt)
