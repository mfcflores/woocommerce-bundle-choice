<?php
/**
 * 
 * in case if you want to implement your custom html then follow our documentation guide on how to add add custom html templates by following this link https://sphereplugins.com/docs/how-to-override-templates-using-custom-html
 */

---- a code /woo-bundle-choice/application/view/publics/swatches/button.php no che
printf( '<div class="variable-item-span variable-item-span-%s">%s</div>', esc_attr( $type ), esc_html( $term->name ) );