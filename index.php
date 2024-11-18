<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
    <title><?php bloginfo('name'); ?></title>
</head>
<body>
    <canvas id="lightsCanvas"></canvas>
    <?php wp_footer(); ?>
</body>
</html>
<?php
function custom_theme_scripts() {
    wp_enqueue_script('lights-script', get_template_directory_uri() . '/script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'custom_theme_scripts');
?>