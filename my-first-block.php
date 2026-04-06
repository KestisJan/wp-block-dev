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
	register_block_type( __DIR__ . '/build/my-first-block' );
}