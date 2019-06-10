# Components

```json
{
  "group": "The field group",
  "label": "The field label",
  "icon": "The field icon",
  "display": "HTML / Image to display when added to the grid",
  "render": ["The react/gutenberg component to render"], // hookable and optional
  "options": ["The field options to be displayed in the sidebar"]
}
```

Example

```json
[
  {
    "group": "Gutenberg",
    "id": "text",
    "data": {
      "label": "Text",
      "tooltip": "Simple text input field",
      "icon": "input.svg",
      "render": [
        "<PlainText",
        " value={ `fieldName` }",
        "onChange={ this.`onFieldNameChanged` }",
        "/>"
      ]
    }
  },
  {
    "group": "Gutenberg",
    "label": "Button",
    "tooltip": "Button field",
    "icon": "button.svg",
    "render": [
      "<PlainText",
      " value={ `fieldName` }",
      "onChange={ this.`onFieldNameChanged }",
      "/>"
    ],
    "options": {}
  }
]
```

## Filters

Defining new blocks

```php
apply_filters( 'stampa_blocks', $components );
```

This event is triggered when generating the React code for the block:

```php
apply_filters( 'stampa_block__[BLOCK ID]', $params );
```

## Ajax requests

Hooks for ajax requests
