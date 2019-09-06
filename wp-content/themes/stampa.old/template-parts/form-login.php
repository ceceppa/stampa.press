<?php
/**
 * Custom login form.
 *
 * @used:
 *  -
 *
 * @package Stella
 */

?>
<div class="login-forgot">
  <form id="login_form" class="login-forgot__form ajax-form">
		<?php if ( isset( $_GET['redirect-to'] ) ) : ?>
			<input type="hidden" name="redirect-to" value="<?php echo esc_url( $_GET['redirect-to'] ); ?>">
		<?php endif; ?>
		<input type="hidden" name="action" value="login_form">
		<div class="login-forgot__form__email">
			<input type="email" name="login-email" placeholder="Email address" />
		</div>
		<div class="login-forgot__form__password">
			<input type="password" name="login-password" placeholder="Password" />
		</div>
		<p class="login-forgot__form__message ajax-message"></p>
		<div class="login-forgot__form__button">
			<input type="submit" name="login-btn" value="Login" />
		</div>
  </form>
  <div class="login-forgot__forgot">
	<a href="#forgot-password" class="login-forgot__forgot__link">Forgot your password?</a>
  </div>
</div>
