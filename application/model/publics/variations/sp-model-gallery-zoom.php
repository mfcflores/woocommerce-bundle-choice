<?php
/*
*	SP Model Gallery Zoom class 
*/

namespace eo\wbc\model\publics\variations;

defined( 'ABSPATH' ) || exit;

use eo\wbc\system\core\publics\Eowbc_Base_Model_Publics ;

class SP_Model_Gallery_Zoom extends Eowbc_Base_Model_Publics {

	private static $_instance = null;

	public static function instance() {

		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self;
		}

		return self::$_instance;
	}

	public function __construct() {

	}
	
	public function get_data($for_section="default", $args=null) {

	}

	public function render_ui(){
		

	}
	public function load_asset(){

	}

	public function init_core(){

	}
	
	public function render_core(){

		add_action('sp_variations_gallery_images_render', function(){

		}, 10);
		
		$classes = array('sp-variations-gallery-images-zoom');
		$classes = apply_filters('sp_slzm_zoom_container',$classes);
	}
}