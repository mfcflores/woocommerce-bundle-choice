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
class FrontendReview extends WP_UnitTestCase {

    public function test_woocommerce_exists(){		
		$this->assertTrue( class_exists('WooCommerce') );
	}

	public function test_review(){

		require_once(constant('EO_WBC_PLUGIN_DIR'). 'EO_WBC_Frontend/EO_WBC_Review.php');

		$LoadEO_WBC_Review = new EO_WBC_Review();

		$eo_wbc_add_css = $LoadEO_WBC_Review->eo_wbc_add_css();
		$this->assertTrue( has_action( 'wp_head', 'function()') );

		$eo_wbc_buttons_css = $LoadEO_WBC_Review->eo_wbc_buttons_css();
		$this->assertNotFalse($eo_wbc_buttons_css);
		$this->assertNOtNull($eo_wbc_buttons_css);
		$this->assertContainsOnly($eo_wbc_buttons_css);

		$eo_wbc_render = $LoadEO_WBC_Review->eo_wbc_render();
		$this->assertTrue( has_action('wp_enqueue_scripts','function()'));
		$this->assertTrue( has_action('wp_footer','function()'));
		$this->assertTrue( has_action('the_content','function()'));

	}

}