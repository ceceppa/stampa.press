/* global nine3, jQuery */
($ => {
  /**
   * Manage the code for the Login/Reset password.
   *
   * The code also append/remove classes to the form element according to the
   * ajax status and response:
   *
   * .ajax       - is appended when the Ajax call is still in progress
   * .successful - is appended when the data.success value is true
   *                             (login has been successful or
   *                             when the reset form password contains a valid email).
   * .error      - is appended when the login credentials are wrong, or the reset
   *                             email is not a valid email.
   *                             NB: For security reason the reset ajax call will always return
   *                             "success = true" for each *valid* email address.
   *
   * The ajax call also return a custom message to be shown in the ajax-message.
   */
  $('body').on('submit', 'form.ajax-form', e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    $this.removeClass('ajax error');
    $this.addClass('ajax');
    $this.find('login-forgot__form__message').addClass('visible');

    ajaxCall($this.find('input[name="action"]').val(), $this, (action, $form, data) => {
      $form.removeClass('ajax');

      if (data.message && data.message.length) {
        $form.find('.ajax-message')
          .text(data.message)
          .addClass('visible');
      }

      if (data.success === true) {
        $form.addClass('successful');
      } else {
        $form.addClass('error');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    });

    return false;
  });

  /**
   * Send the ajax request and call the success function when done
   *
   * @param string ajaxAction name to perform.
   * @param object $form the HTML form.
   * @param object callback the callback to execute on success.
   */
  function ajaxCall(ajaxAction, $form, callback) {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: nine3.ajaxurl,
      data: {
        action: ajaxAction,
        security: nine3.nonce,
        url: window.location.href,
        form: $form.serialize(),
      },
      success: data => {
        callback.call(this, ajaxAction, $form, data);
      },
    });
  }
})(jQuery);
