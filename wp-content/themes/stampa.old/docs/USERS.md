# Users

## Utility functions

Built in utility functions

- is_administrator( $user_id = false )
- is_editor( $user_id = false )
- is_contributor( $user_id = false )
- is_subscriber( $user_id = false )
- has_no_role( $user_id = false )

## Custom Login

To enable the custom login and reset password form:

1. Set the costant `NINE3_USE_CUSTOM_LOGIN` (inside `functions.php` file) to `tue`.
2. Include (uncomment) the `assets/js/src/ajax-login.js` file in `main.js` one.

Once done, the `Pages` tab containing the following Options is going to be added to the Theme Settings:

- Login
- Forgot password
- Reset password
- Create account
- My Account page

The default login and forgot password are respectively available in:

- `template-parts/form-login.php`
- `template-parts/forgot-password.php`

**NOTE**: The script will also detect any access to the standard WP login form and redirect it to the custom one. Also, by default the user can login by email address only.

### Filters

The following filters are available to customise error messages and emails sent:

|Filter|Parameters / Description|
|---|---|
|nine3_reset_message_title|`$title` - The reset password email title|
|nine3_reset_message|`$message` - The reset password email body|
|nine3_login_failed|`[ 'email', 'success', 'message' ]`|
||The filter will pass an array with the following data:|
||- **email**: The user email|
||- **success**: (boolean) true is email used is valid|
||- **message**: The success/failed message to be displayed in the form|
|nine3_login_failed|`['success', 'message']`|
||- **success**: false|
||- **message**: The error message to by displayed in the form|
|nine3_login_successful|`['success', 'message', 'url']`|
||- **success**: true|
||- **message**: The success message to be displayed in the form|
||- **url**: To which URL redirect the user after the login|
