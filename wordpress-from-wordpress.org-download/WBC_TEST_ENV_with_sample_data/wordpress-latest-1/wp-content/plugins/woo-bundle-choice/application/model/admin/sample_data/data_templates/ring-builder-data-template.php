<?php


/*
*	ring builder template for Sample data.
*/

namespace eo\wbc\model\admin\sample_data\data_templates;

defined( 'ABSPATH' ) || exit;

class Ring_Builder_Data_Template extends Pair_Builder_Data_Template {

	private static $_instance = null;

	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self;
		}

		return self::$_instance;
	}

	private function __construct() {
		
    	$this->asset_folder = 'jewelry';
	}

	public function get_attributes() {
    	return array(
	                array(
	                    'label' => 'Carat',
	                    'range'=>true,
	                    'terms' => array('min'=>'0.2','max'=>'3'),
	                    'description' => 'Carat attributes for diamond shape',
	                    'slug' => 'eo_carat_attr'
	                ),
	                array(
	                    'label' => 'Clarity',
	                    'terms' => array('IF','VVS1','VVS2','VS1','VS2','SI1'),
	                    'description' => 'Clarity attributes for diamond shape',
	                    'slug' => 'eo_clarity_attr'
	                ),
	                array(
	                    'label' => 'Colour',
	                    'terms' => array('D','E','F','G','H','I','J','K','L','M'),
	                    'description' => 'Colour attributes for diamond shape',
	                    'slug' => 'eo_colour_attr'
	                ),
	                array(
	                    'label' => 'Polish',
	                    'terms' => array('Excellent','Very Good','Good','Fair'),
	                    'description' => 'Polish attributes for diamond shape',
	                    'slug' => 'eo_polish_attr'
	                ),
	                array(
	                    'label' => 'Symmetry',
	                    'terms' => array('Excellent','Very Good','Good','Fair'),
	                    'description' => 'Symmetry attributes for diamond shape',
	                    'slug' => 'eo_symmertry_attr'
	                ),
	                array(
	                    'label' => 'Fluorescence',
	                    'terms' => array('None','Very','Slight','Slight','Faint'),
	                    'description' => 'Fluorescence attributes for diamond shape',
	                    'slug' => 'eo_fluorescence_attr'
	                ),
	                array(
	                    'label' => 'Depth',
	                    'range'=>true,
	                    'terms' => array('min'=>'45','max'=>'55'),        
	                    'description' => 'Depth attributes for diamond shape',
	                    'slug' => 'eo_depth_attr'
	                ),
	                array(
	                    'label' => 'Size',
	                    'range'=>true,
	                    'terms' => array('min'=>'4','max'=>'7'),        
	                    'description' => 'Size attributes for settings',
	                    'slug' => 'eo_size_attr'
	                ),
	                array(
	                    'label' => 'Table',
	                    'range'=>true,
	                    'terms' => array('min'=>'45','max'=>'55'),
	                    'description' => 'Table attributes for diamond shape',
	                    'slug' => 'eo_table_attr'
	                ),
	                array(
	                    'label' => 'Grading Report',
	                    'terms' => array('GIA','IGI','AGS','HRD'),
	                    'description' => 'Grading report attributes for diamond shape',
	                    'slug' => 'eo_grading_report_attr'
	                ),
	                array(
	                    'label' => 'Ring Style',
	                    'terms' => array('Halo','Pave','Solitaire','Trilogy'),
	                    'description' => 'Ring style attributes for diamond shape',
	                    'slug' => 'eo_ring_style_attr'
	                ),
	                array(
	                    'label' => 'Metal',
	                    'terms' => array('14K White Gold','18K White Gold','14K Yellow Gold','18K Yellow Gold','14K Rose Gold','18K Rose Gold','Platinum'),
	                    'description' => 'Metal attributes for diamond shape',
	                    'slug' => 'eo_metal_attr'
	                ),
	              ); 
	}

	public function get_categories() {
		$_img_url= constant('EOWBC_ASSET_URL').'img/sample_data/'.$this->asset_folder.'/';    // EO_WBC_PLUGIN_DIR.'EO_WBC_Admin/EO_WBC_Config/EO_WBC_View/';
          
      	return array(
                    array(
                        'thumb' => '',
                        'name' => 'Diamond Shape',
                        'description' => 'Diamond shapes category',
                        'slug' => 'eo_diamond_shape_cat',
                        'child'=> 
                        array(
                                array(
                                    'thumb' => $_img_url.'round.png',
                                    'name' => 'Round',
                                    'description' => 'Diamond round shape',
                                    'slug' => 'eo_diamond_round_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'princess.png',
                                    'name' => 'Princess',
                                    'description' => 'Diamond princess shape',
                                    'slug' => 'eo_diamond_princess_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'emerald.png',
                                    'name' => 'Emerald',
                                    'description' => 'Diamond emerald shape',
                                    'slug' => 'eo_diamond_emerald_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'asscher.png',
                                    'name' => 'Asscher',
                                    'description' => 'Diamond asscher shape',
                                    'slug' => 'eo_diamond_asscher_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'marquise.png',
                                    'name' => 'Marquise',
                                    'description' => 'Diamond marquise shape',
                                    'slug' => 'eo_diamond_marquise_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'oval.png',
                                    'name' => 'Oval',
                                    'description' => 'Diamond oval shape',
                                    'slug' => 'eo_diamond_oval_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'rediant.png',
                                    'name' => 'Radiant',
                                    'description' => 'Diamond radiant shape',
                                    'slug' => 'eo_diamond_radiant_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'pear.png',
                                    'name' => 'Pear',
                                    'description' => 'Diamond pear shape',
                                    'slug' => 'eo_diamond_pear_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'heart.png',
                                    'name' => 'Heart',
                                    'description' => 'Diamond heart shape',
                                    'slug' => 'eo_diamond_heart_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'cushion.png',
                                    'name' => 'Cushion',
                                    'description' => 'Diamond cushion shape',
                                    'slug' => 'eo_diamond_cushion_shape_cat'
                                )
                        )
                    ),
                    array(
                        'thumb' => '',
                        'name' => 'Setting Shape',
                        'description' => 'Setting shapes category',
                        'slug' => 'eo_setting_shape_cat',
                        'child'=> 
                        array(
                                array(
                                    'thumb' => $_img_url.'round.png',
                                    'name' => 'Round Setting',
                                    'description' => 'Setting round shape',
                                    'slug' => 'eo_setting_round_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'princess.png',
                                    'name' => 'Princess Setting',
                                    'description' => 'setting princess shape',
                                    'slug' => 'eo_setting_princess_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'emerald.png',
                                    'name' => 'Emerald Setting',
                                    'description' => 'Setting emerald shape',
                                    'slug' => 'eo_setting_emerald_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'asscher.png',
                                    'name' => 'Asscher Setting',
                                    'description' => 'Setting asscher shape',
                                    'slug' => 'eo_setting_asscher_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'marquise.png',
                                    'name' => 'Marquise Setting',
                                    'description' => 'Setting marquise shape',
                                    'slug' => 'eo_setting_marquise_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'oval.png',
                                    'name' => 'Oval Setting',
                                    'description' => 'Setting oval shape',
                                    'slug' => 'eo_setting_oval_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'rediant.png',
                                    'name' => 'Radiant Setting',
                                    'description' => 'Setting radiant shape',
                                    'slug' => 'eo_setting_radiant_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'pear.png',
                                    'name' => 'Pear Setting',
                                    'description' => 'Setting pear shape',
                                    'slug' => 'eo_setting_pear_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'heart.png',
                                    'name' => 'Heart Setting',
                                    'description' => 'Setting heart shape',
                                    'slug' => 'eo_setting_heart_shape_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'cushion.png',
                                    'name' => 'Cushion Setting',
                                    'description' => 'Setting cushion shape',
                                    'slug' => 'eo_setting_cushion_shape_cat'
                                )
                        )
                    ),
                    array(
                        'thumb' => '',
                        'name' => 'Ring Style',
                        'description' => 'Ring style category',
                        'slug' => 'eo_ring_style_cat',
                        'child'=> 
                        array(
                                array(
                                    'thumb' => $_img_url.'halo.png',
                                    'name' => 'Halo',
                                    'description' => 'Halo style for ring',
                                    'slug' => 'eo_ring_halo_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'pave.png',
                                    'name' => 'Pave',
                                    'description' => 'Pave style for ring',
                                    'slug' => 'eo_ring_pave_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'solitaire.png',
                                    'name' => 'Solitaire',
                                    'description' => 'Solitaire style for ring',
                                    'slug' => 'eo_ring_solitaire_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'trilogy.png',
                                    'name' => 'Trilogy',
                                    'description' => 'Trilogy style for ring',
                                    'slug' => 'eo_ring_trilogy_cat'
                                )
                        )            
                     ),
                     array(
                        'thumb' => '',
                        'name' => 'Metal',
                        'description' => 'Metal category',
                        'slug' => 'eo_metal_cat',
                        'child'=> 
                        array(
                                array(
                                    'thumb' => $_img_url.'wg-14.jpg',
                                    'name' => '14K White Gold',
                                    'description' => '14k white gold category for metal',
                                    'slug' => 'eo_metal_14k_white_gold_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'wg-18.jpg',
                                    'name' => '18K White Gold',
                                    'description' => '18k white gold category for metal',
                                    'slug' => 'eo_metal_18k_white_gold_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'yg-14.jpg',
                                    'name' => '14K Yellow Gold',
                                    'description' => '14k yellow gold category for metal',
                                    'slug' => 'eo_metal_14k_yellow_gold_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'yg-18.jpg',
                                    'name' => '18K Yellow Gold',
                                    'description' => '18k yellow gold category for metal',
                                    'slug' => 'eo_metal_18k_yellow_gold_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'rg-14.jpg',
                                    'name' => '14K Rose Gold',
                                    'description' => '14k rose gold category for metal',
                                    'slug' => 'eo_metal_14k_rose_gold_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'rg-18.jpg',
                                    'name' => '18K Rose Gold',
                                    'description' => '18k rose gold category for metal',
                                    'slug' => 'eo_metal_18k_rose_gold_cat'
                                ),
                                array(
                                    'thumb' => $_img_url.'pl.jpg',
                                    'name' => 'Platinum',
                                    'description' => 'Platinum category for metal',
                                    'slug' => 'eo_metal_platinum_cat'
                                )
                        )            
                     )
                  );
	}

    public function get_maps() {
        return array(
                        array(
                            ['slug','eo_diamond_round_shape_cat','product_cat'],
                            ['slug','eo_setting_round_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_princess_shape_cat','product_cat'],
                            ['slug','eo_setting_pear_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_emerald_shape_cat','product_cat'],
                            ['slug','eo_setting_emerald_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_asscher_shape_cat','product_cat'],
                            ['slug','eo_setting_asscher_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_marquise_shape_cat','product_cat'],
                            ['slug','eo_setting_marquise_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_oval_shape_cat','product_cat'],
                            ['slug','eo_setting_oval_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_radiant_shape_cat','product_cat'],
                            ['slug','eo_setting_radiant_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_pear_shape_cat','product_cat'],
                            ['slug','eo_setting_pear_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_heart_shape_cat','product_cat'],
                            ['slug','eo_setting_heart_shape_cat','product_cat']
                        ),
                        array(
                            ['slug','eo_diamond_cushion_shape_cat','product_cat'],
                            ['slug','eo_setting_cushion_shape_cat','product_cat']
                        )
                    );
    }

}