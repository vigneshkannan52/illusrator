<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'illusrator_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Vzz0Rpcm_nYR(%KbP`+l.hYcH`%x7XfH|Lg2i/(FfXNJ#._k7AYRo87z-*@v}/<U' );
define( 'SECURE_AUTH_KEY',  '{u4lE+6|22gXZmFQX;j^PDo1y<?p2zW-!5@6!R3xXh9ZN*XqI5fun))9Gogvc|5)' );
define( 'LOGGED_IN_KEY',    'UA2%C4czPD+ETo8{WwPuaB=iyf9~&F%|5)d]z!}{&.U`>$hZ8/a]mf?8[:1sN}C-' );
define( 'NONCE_KEY',        'lAvsPdAA[?Y*B41ki(ZWubz`>L^>;Zfbb!$pO*O4qG/qUon<0X-n8Q-:%S8hW3YD' );
define( 'AUTH_SALT',        'o6OsK9bCv~>dR[BaLBHeWMv=;F7]|:q9t=JZ_(4=IE1Y(;d`uLn47~,(Kb`Kb;Pt' );
define( 'SECURE_AUTH_SALT', 'll0V|4z=rv_q9Fl?G8A 3;aNRsxlmMh%5j<K;T8.wlcR:/Q}]wPuVIBrNcAfgc7b' );
define( 'LOGGED_IN_SALT',   '.bnp0h%t}s0yIRanKdk2Q~DEzlm9db0N7~jA1u:xaM=a{KHjn$e3OEc<uW3b;_gK' );
define( 'NONCE_SALT',       'Do)N7R`shNwN+zzVLPN_,hk=HfIqaLIj-pE4F-iUQms}oL)a_+w/DWEANlaHPP%4' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
