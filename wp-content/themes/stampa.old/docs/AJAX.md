# Ajax

The theme has built-in JS and PHP code to handle the AJAX Requests and it offers a unified method to make and handle the requests.

The script make the request using the REST API and in return always gets a JSON Object.

The custom endpoint will return different error code according to the status of the request:

|Code|Error|Description|
|---|---|---|
|200||Everything is ok|
|401|Invalid nonce|The nonce validation has failed|
|404|No action found|This error is triggered when no custom code has been executed for the current request (see PHP section for more information).|
|500|Invalid response|The function triggered by the request is not returning an array (see PHP section for more information).| 

## Usage

### JavaScript

`ajaxCall( [action name], [data], [success], [failure] );`

- `action name` the name of the AJAX action we're performing
- `data` the data to be sent to the REST API
- `success` the success callback, it receives the _**response**_ as parameter
- `failure` the failure callback.

#### Example

``` js
import ajaxCall from './data-ajax';

ajaxCall(
  'test-action',
  {
    key: 'value',
  },
  successResponse => {
    console.info(successResponse);
  },
  errorResponse => {
    console.error(errorResponse);
  }
);
```

### PHP

To handle the AJAX request you have to use the following filter:

``` php
add_filter( 'nine3_ajax_[action name]', '[your function]' );
```

### Example

``` php
/**
 * Handle the ajax request for the action "test-action".
 *
 * @param array $reponse the response to be sent (the response MUST be an array).
 * @param array $params  the request parameters.
 *
 * @return array
 */
add_filter( 'nine3_ajax_test-action', function( $response, $params ) {
  return [
    'done' => 1,
  ];
} );
```

As you can see the response **must** be an array, any other type will make the REST API returning the `500 Error`.

If you get `404` when doing the ajax request, check that the filter does not have any spelling issue.
