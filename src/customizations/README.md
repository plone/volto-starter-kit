# Local Customizations

In order to customize the components, you have to add the override key/value
pair in the `customizations` object in the main `package.json` file like this:

```
"customizations": {
      './theme/Header/Header': '../../../../customizations/Header/Header',
}
```

The key is the path of the original import, then the value is the path to the
replaced file, relative to the original one.

In the future this might have a more friendly naming/approach that will take
care of the paths automatically.
