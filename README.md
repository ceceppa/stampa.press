# Stampa

**NOTE** Due lack of time this project has never been completed :(

Stampa is a Stand alone and WP Plugin that aims to generate basic REACT code for our custom blocks.

![Stampa editor](https://raw.githubusercontent.com/ceceppa/stampa.press/main/images/stampa.png)

## Why a generator?

Because IMHO Gutenberg is defective by design, and Stampa tries to address some of the issues from a developer point of view.

For example, in Gutenberg, you're forced to write each block "twice", meaning that you need to create the block in JSX inside the "edit" function and the HTML inside the save one. You can't copy the code across them as it can't be 100% reused, but it needs some manipulation.
Another issue is that you can't load your front-end CSS inside the Gutenberg editor, as it will mess up with the layout.

### The Grid approach

The reality is that the page inside the block editor will never look 100% like the one rendered in the front-end. 
For this reason, the idea of Stampa is to allow you to create your block with a simple drag and drop interface and the power of CSS Grids so that the final result will not be perfect but close enough to the actual block rendered in the post/page.

### Drag & Drop

You can create a new block by combining the available components using an easy drag-and-drop interface:

![Drag & Drop](https://raw.githubusercontent.com/ceceppa/stampa.press/main/images/drag-end-drop.gif)

### The code generator

Once you have created your block, pressing the "Save & Generate" button will generate the following files for you:

- [block name].js (this is the React block)
- [block name].php (this is the boilerplate PHP file to be used for the front-end)
That's all, simple :)

## The UI

![The editor](https://raw.githubusercontent.com/ceceppa/stampa.press/main/images/the-editor.png)

### Grid settings

This section allows you to customise the size of the CSS Grid

![Grid settings](https://raw.githubusercontent.com/ceceppa/stampa.press/main/images/grid-settings.png)

### The visual block generator

Here we have three columns:

- The first column contains the components available, more can be added via PHP
- Middle column is the visual representation of your block, element can be resized
- The last column contains the block and the selected component settings

