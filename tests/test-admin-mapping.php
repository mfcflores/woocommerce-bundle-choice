<?php
/*
* Boilerplate - DO NOT TOUCH ANY LINES HERE.
* FUTURE : TO BE MOVED TO COMMON FILE.
*/
$wp_tests_dir = getenv( 'WP_TESTS_DIR' ) ? getenv( 'WP_TESTS_DIR' ) : '/tmp/wordpress-tests-lib';
require_once $wp_tests_dir . '/includes/functions.php';
require_once $wp_tests_dir . '/includes/bootstrap.php';
require_once $wp_tests_dir . '/includes/listener-loader.php';

require_once dirname( dirname( __FILE__ ) ) . '/woo-bundle-choice.php';		

activate_plugin('woocommerce/woocommerce.php');
activate_plugin('woocommerce-bundle-choice/woo-bundle-choice.php');		
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

/**
* Backend unit testing.
*/
class AdminMapping extends WP_UnitTestCase {

    public function test_woocommerce_exists(){		
		$this->assertTrue( class_exists('WooCommerce') );
	}

	public function test_mapping(){

		require_once(constant('EO_WBC_PLUGIN_DIR'). 'EO_WBC_Admin/EO_WBC_Config/EO_WBC_View/EO_WBC_View_Head_Banner.php');
		require_once(constant('EO_WBC_PLUGIN_DIR').'EO_WBC_Admin/EO_WBC_Config/EO_WBC_View/EO_WBC_List_Table.php');
		require_once(constant('EO_WBC_PLUGIN_DIR').'EO_WBC_Admin/EO_WBC_Config/EO_WBC_View/EO_WBC_View_Mapping.php');



		$HasCat = eo_wbc_product_has_cat_parent($term_id1,$term_id2);

		$HasCat->expects($this->once())
	     ->method('method')
	     ->with($this->equalTo($arg1),$this->equalTo($arg2));

		$this->assertIsBool($HasCat);
		$this->assertNotFalse($HasCat);

		$PrimeCat = eo_wbc_prime_category($slug,$prefix);

		$this->assertNotFalse($PrimeCat);
		$this->assertNotNull($PrimeCat);

		$attrib = eo_wbc_attributes();

		$this->assertNotFalse($attrib);
		$this->assertNotNull($attrib);

	}

	public function formData_save(){

		require_once(constant('EO_WBC_PLUGIN_DIR').'EO_WBC_Admin/EO_WBC_Config/EO_WBC_Actions.php');
		require_once(constant('EO_WBC_PLUGIN_DIR').'EO_WBC_Admin/EO_WBC_Config/EO_WBC_List_Table');

		$data1 = $_POST['eo_wbc_first_category'] = 'diamond';
		$data2 = $_POST['eo_wbc_second_category'] = 'ring';
		$data3 = $_POST['eo_wbc_add_discount'] = '2';
		$data4 = $_POST['_wpnonce'] = 'eo_wbc_nonce_add_map';

		$saveForm = new EO_WBC_Actions();
		$saveForm->map_add();

		$GetForm = new EO_WBC_List_Table();

		$Data = array('first_cat_id'=>$data1,'second_cat_id'=>$data2,'discount'=>$data3.'%');

		$this->assertEquals($Data,$GetForm->get_maps());
	}
}