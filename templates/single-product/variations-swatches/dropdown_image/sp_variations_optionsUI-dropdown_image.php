<?php
/**
 * 
 * in case if you want to implement your custom html then follow our documentation guide on how to add add custom html templates by following this link https://sphereplugins.com/docs/how-to-override-templates-using-custom-html
 */

 --- a code woo-bundle-choice/application/controllers/publics/options.php no che
$selected_item =  sprintf( '<img class="ui mini avatar image" src="%s">%s', esc_url( $image_url ),esc_attr( $selected_item->name ));





$template = array(
    'type' => 'img',
    'class' => 'ui mini avatar image',
    'src' => esc_url( $variable_item_data['options_loop_image'][$term->slug] ),
),
'preHTML'=>esc_attr( $variable_item_data['selected_item']->name );