<form role="search" method="get" class="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="s">
		<?php echo _e( 'Search for:', 'semplice' ); ?>
	</label>
	<input 
		type="search"
		class="searchform__input"
		placeholder="<?php echo esc_attr_e( 'Search', 'semplice' ); ?>"
		value="<?php echo get_search_query(); ?>"
		name="s"
	/>

	<button type="submit" class="searchsubmit">
		<span class="screen-reader-text"><?php echo _e( 'Search', 'semplice' ); ?></span>
		
	</button>
</form>
