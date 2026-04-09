<?php
// This header IS the plugin - WordPress read it to show this in wp-admin Plugins screen.
/**
 * Plugin Name: My First Block
 * Description: Example block scaffolded with Create Block tool.
 * Requires at least: 6.7
 * Requires: 7.4
 * Version: 0.1.0
 * Author: The WordPress Contributors
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: my-first-block
 * 
 * @package CreateBlock
 */

// Security: exit if accessed directly outside WordPress.
if ( ! defined( 'ABSPATH') ) {
	exit;
}

// Register the block when WordPress is ready
add_action( 'init', 'my_frst_block_my_first_block_init' );

function my_frst_block_my_first_block_init() {
	// Point to /build not src/ - WordPress read block.json from there.
	// __DIR__ = absolute path to this file's folder.
	register_block_type( __DIR__ . '/build/my-first-block', array(
		'render_callback' => 'render_my_first_dynamic_block',
	) );
}

/**
 * This function builds the HTML for the frontend.
 * It runs every time the page is loaded.
 */
function render_my_first_dynamic_block( $attributes, $content ) {
	// Getting data from the attributes (with fallbacks)
	$text  		= isset( $attributes['content'] ) ? $attributes['content'] : '';
	$bg_color	= isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '#ffffff';
	$align		= isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'left';
	$user_name 	= isset( $attributes['userName']) ? $attributes['userName'] : '';
	$bio		= isset( $attributes['bio']) ? $attributes['bio'] : '';

	if ( empty( $text ) && empty ( $user_name ) && empty ( $bio ) ) {
		return '';
	}

	// Prepare custom styles
	$style = sprintf(
		'background-color: %s; text-align: %s;',
		esc_attr( $bg_color ),
		esc_attr( $align )
	);

	// The "Magic" Wrapper
	// This function automatically picks up the Typography and Spacing
	// settings from block.json and merges them with our custom styles.
	$wrapper_attributes = get_block_wrapper_attributes( array( 'style' => $style ) );

	$html = sprintf( '<div %s>', $wrapper_attributes );

	if ( ! empty( $user_name ) ) {
		$html .= sprintf( '<h2 class="user-name">%s</h2>', wp_kses_post( $user_name ) );
	}

	if ( ! empty( $bio ) ) {
		$html .= sprintf( '<p class="bio">%s</p>', wp_kses_post( $bio ) );
	}

	if ( ! empty( $text) ) {
		$html .= sprintf( '<div class="content">%s</div>', wp_kses_post( $text ) );
	}

	$html .= '</div>';

	return $html;
}