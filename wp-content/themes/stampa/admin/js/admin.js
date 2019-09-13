/**
 * Admin JS
 */

jQuery(document).ready(function() {
	
	/* Theme settings save */
	jQuery('#verbosa-savesettings-button').on('click', function(e) {
		jQuery( "#verbosa-settings-dialog" ).dialog({
		  modal: true,
		  minWidth: 600,
		  buttons: {
			'Close': function() {
			  jQuery( this ).dialog( "close" );
			}
		  }
		});
		jQuery('#verbosa-themesettings-textarea').val(jQuery('#verbosa-export input#verbosa-themesettings').val());
		jQuery('#verbosa-settings-dialog strong').hide();
		jQuery('#verbosa-settings-dialog div.settings-error').remove();
		jQuery('#verbosa-settings-dialog strong:nth-child(1)').show();
	});
	
	/* Theme settings load */
	jQuery('#verbosa-loadsettings-button').on('click', function(e) {
		jQuery( "#verbosa-settings-dialog" ).dialog({
			modal: true,
			minWidth: 600,
			buttons: {
				'Load Settings': function() {
					theme_settings = encodeURIComponent(jQuery('#verbosa-themesettings-textarea').val());
					nonce = jQuery('#verbosa-settings-nonce').val();	
					jQuery.post(ajaxurl, {
						action: 'cryout_loadsettings_action',
						verbosa_settings_nonce: nonce,
						verbosa_settings: theme_settings,
					}, function(response) {
						if (response=='OK') {
							jQuery('#verbosa-settings-dialog div.settings-error').remove();
							window.location = '?page=about-verbosa-theme&settings-loaded=true';
						} else {
							jQuery('#verbosa-settings-dialog div.settings-error').remove();
							jQuery('#verbosa-themesettings-textarea').after('<div class="settings-error">' + response + '</div>');
						}
					})
				}
			}
		});
		jQuery('#verbosa-themesettings-textarea').val('');
		jQuery('#verbosa-settings-dialog strong').hide();
		jQuery('#verbosa-settings-dialog strong:nth-child(2)').show();
	});

	/* Latest News Content */
    var data = {
        action: 'cryout_feed_action',
    };
	jQuery.post(ajaxurl, data, function(response) {
		jQuery("#verbosa-news .inside").html(response);
    });
				
	/* Confirm modal window on reset to defaults */
	jQuery('#verbosa_reset_defaults').click (function() {
		if (!confirm(reset_confirmation)) { return false;}
	});

});/* document.ready */

/* FIN */