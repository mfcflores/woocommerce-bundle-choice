<?php
namespace eo\wbc\controller\publics\variations;
defined( 'ABSPATH' ) || exit;

class SP_Gallery_Slider extends \eo\wbc\controllers\publics\Controller{
 
    private static $_instance = null;

    public static function instance() {
        if ( ! isset( self::$_instance ) ) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }

    private function __construct() {
        
    }
    public function should_init(){

        /* --- ACTIVE_TODO implments*/
        return true;
    }

    public function init($args = array()){
        
        \eo\wbc\model\publics\variations\SP_Model_Gallery_Slider::instance()->init_core();
        
        --- get ui call
        
        \eo\wbc\model\publics\variations\SP_Model_Gallery_Slider::instance()->render_core();

        \eo\wbc\controller\publics\variations\SP_Gallery_Slider::instance()->selectron('slider_images',$args);

        $this->getUI(null);
    }

    private function selectron($page_section,$args = array()){

        $args['page_section'] = $page_section;

        if ($page_section == 'slider_images') {

            add_filter('sp_slzm_slider_images_html',function($html,$images_data) use($page_section,$args){

                $args['hook_callback_args'] = array();
                $args['hook_callback_args']['html'] = $html;
                $args['hook_callback_args']['images_data'] = $images_data;

                return $this->selectron_hook_render($page_section,'slider_images_html',$args);
            });

        }       

    }

    public function selectron_hook_render($page_section,$container_class,$args = array()){

        if ($page_section == 'slider_images') {

            if ($container_class == 'slider_images_html') {
                $data = $args['hook_callback_args'];
                unset($args['hook_callback_args']);
                $this->load_view($data,$args);
            }

        }else{

            \eo\wbc\controller\publics\variations\SP_Gallery_Slider::instance()->getUI();

        }
    }

    private function load_view($data,$args = array()){

        $args['data'] = $data;
        $this->getUI($args['page_section'],$args);

    }

    private function getUI($page_section,$args = array()){

        $args['page_section'] = $page_section;
        
        if ($page_section == 'slider_images') {

            $args['page_section'] = 'slider_images_image_loop';
            $args['data'] = $this->get_ui_definition($args);

            $args['page_section'] = 'slider_images';
            $ui = $this->get_ui_definition($args);

            wbc()->load->model('ui-builder');
            \eo\wbc\model\UI_Builder::instance()->build($ui,'sp_variations_gallery_images_slider');
            
        }else{  

            \eo\wbc\model\publics\variations\SP_Model_Gallery_Slider::instance()->render_ui( $this->get_ui_definition($args));
        }
    }

    private function get_ui_definition($args = array()){

        if ($args['page_section'] == 'slider_images') {

            $args['widget_key'] = '';
            $args['template_sub_dir'] = 'single-product\gallery-slider';
            $args['template_option_key'] = '';
            $args['option_group_key'] = '';
            $args['template_key'] = 'gallery_slider_desktop';
            $args['plugin_slug'] = '';

        }else if ($args['page_section'] == 'slider_images_image_loop') {

            $args['widget_key'] = '';
            $args['template_sub_dir'] = 'single-product\gallery-slider';
            $args['template_option_key'] = '';
            $args['option_group_key'] = '';
            $args['template_key'] = 'gallery_slider_image_loop_desktop';
            $args['plugin_slug'] = '';

        }
        return parent::get_ui_definition($args);

       /* if (!in_array($args)) {
            $args = array();
        }
        $args['template_option_key'] = '';
        $args['option_group_key'] = '';
        $args['plugin_slug'] = sp_tv()->SP_Extension()->singleton_function();

        return parent::get_ui_definition($args); */
    }

}