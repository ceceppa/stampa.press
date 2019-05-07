# User Stories

As a Developer I should have a tool that makes easier the development of Gutenberg blocks, because at the moment I cannot 100% re-use the code from the "render" function for the "save" one, as the React "tags" have to be converted in HTML ones. So it almost require double of the effor to create simple blocks, and the complexity of the process grows with the one of the module.

## Acceptance Criteria

- It should be possible to visually draw the block via drag & drop components
- It should be possible to add/edit block settings
- It should be possible to add/edit the single element settings
- It should be possible to save the block as JSON file
- It should be possible to import the block from a JSON file
- It should be possible to extend the list of components via WP filters
- It should be possible to generate basic React/JSX code with the selected components and options
- It should be possible to generate a basic PHP file that outputs the fields
- It should be possible to generate the save function as HTML

## Hero module

Scenario: Hero module

- Given building a simple Hero module (Background image, h1 tag, sub title)
- When I visit a product page
- And I click 'Add to cart'
- Then the item should be added to my cart
- And I should go to my shopping cart
