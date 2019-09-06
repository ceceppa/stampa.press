<?php
/**
 * Custom forgot password form.
 *
 * @used:
 *  -
 *
 * @package Stella
 */

?>
<div class="login-forgot login-forgot--forgot">
  <div class="login-forgot__title">Forgot password</div>
  <form id="resetpassword_form" class="login-forgot__form ajax-form">
    <input type="hidden" name="action" value="resetpassword_form">
    <div class="login-forgot__form__email">
      <input type="email" name="forgot-email" placeholder="Email address" />
    </div>
    <p class="login-forgot__form__message ajax-message"></p>
    <div class="login-forgot__form__button">
      <input type="submit" name="reset-btn" value="Reset Password" />
    </div>
  </form>
</div>
