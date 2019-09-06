<?php
/**
 * Custom reset password form.
 *
 * @used:
 *  -
 *
 * @package Stella
 */

?>
<form id="login_form" class="ajax-form">
	<input type="hidden" name="action" value="reset_password">
	<input type="hidden" name="login" value="<?php echo esc_attr( $_GET['login'] ); ?>">
	<input type="hidden" name="key" value="<?php echo esc_attr( $_GET['key'] ); ?>">
	<div class="ajax-form__field password">
		<input type="Password" name="login-password1" placeholder="New password" min-length="6" required />
	</div>
	<div class="ajax-form__field password">
		<input type="password" name="login-password2" placeholder="Confirm password" min-length="6" requried />
	</div>
	<p class="ajax-form__message"></p>
	<div class="ajax-form__field button">
		<input type="submit" name="login-btn" value="Confirm" />
	</div>
</form>
