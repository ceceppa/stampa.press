/* global nine3, jQuery */
/**
 * Send the ajax request and call the success function when done
 *
 * @param string ajaxAction name to perform.
 * @param object $form the HTML form.
 * @param object callback the callback to execute on success.
 */
export default function ajaxCall(ajaxAction, data, succesCallback, failedCallback) {
  jQuery.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${nine3.home_url}/wp-json/nine3/v1/ajax/${ajaxAction}`,
    data,
    beforeSend(request) {
      request.setRequestHeader('X-WP-Nonce', nine3.nonce);
    },
    success: response => {
      succesCallback.call(this, response);
    },
    error: response => {
      failedCallback.call(this, response);
    },
  });
}
