<?php
namespace eo\wbc\controllers\publics\pages;
defined( 'ABSPATH' ) || exit;

class Category {

    private static $_instance = null;

    public static function instance() {
        if ( ! isset( self::$_instance ) ) {
            self::$_instance = new self;
        }

        return self::$_instance;
    }

    private function __construct() {        
    }

    public function init() {
        //If add to cart triggred
        // Detection : only one category item get length > 0 
        //   i.e. using XOR check if only one of two have been set.
        if( !empty(wbc()->sanitize->get('CART')) && empty(wbc()->sanitize->get('EO_CHANGE')) && ( empty(wbc()->sanitize->get('FIRST')) XOR empty(wbc()->sanitize->get('SECOND')) ) ) {
            //Iff condition is mutual exclusive, store it to  the session.
            $this->add2cart();            
        } 

        //if Current-Category is either belongs to FIRST OR SECOND Category then initiate application                
        if(
            ($this->eo_wbc_get_category()== wbc()->options->get_option('configuration','first_slug') //get_option('eo_wbc_first_slug') 
              OR
            $this->eo_wbc_get_category()== wbc()->options->get_option('configuration','second_slug')) and !empty($_GET['EO_WBC']) //get_option('eo_wbc_second_slug')
        ){
            //if( get_option('eo_wbc_filter_enable')=='1' ){
            /*wbc()->options->update_option('filters_filter_setting','config_filter_status','config_filter_status');*/

            /*wbc()->options->update_option('filters_filter_setting','filter_setting_alternate_mobile','filter_setting_alternate_mobile');*/

            
            if(wbc()->options->get_option('filters_filter_setting','filter_setting_status','1')) {

                if(
                     // ($this->eo_wbc_get_category()==get_option('eo_wbc_first_slug') && get_option('eo_wbc_add_filter_first',FALSE) )
                     // OR 
                     // ($this->eo_wbc_get_category()==get_option('eo_wbc_second_slug') && get_option('eo_wbc_add_filter_second',FALSE) )
                     ($this->eo_wbc_get_category()==wbc()->options->get_option('configuration','first_slug') && wbc()->options->get_option_group('filters_d_fconfig',FALSE) )
                     OR 
                     ($this->eo_wbc_get_category()==wbc()->options->get_option('configuration','second_slug') && wbc()->options->get_option_group('filters_s_fconfig',FALSE) )
                ){
                    $this->eo_wbc_add_filters();          
                }
            }            
            $this->eo_wbc_add_breadcrumb();                     
            $this->eo_wbc_render(); 
        }    
    }

    public function add2cart() {
        $cart=base64_decode(wbc()->sanitize->get('CART'),TRUE);
        if(!empty($cart)){

            $cart=str_replace("\\",'',$cart);
            $cart=(array)json_decode($cart);
            
            if(is_array($cart) OR is_object($cart)) {
                   
                //if product belongs to first target;
                if (wbc()->options->get_option('configuration','first_slug')==$cart['eo_wbc_target']) {

                    WC()->session->set('EO_WBC_SETS',
                        array(
                            'FIRST'=>array(
                                            $cart['eo_wbc_product_id'],
                                            $cart['quantity'],
                                            (isset($cart['variation_id'])?$cart['variation_id']:NULL)
                                        ),
                            'SECOND'=>NULL
                                                
                    ));
                }
                //if product belongs to second target;
                elseif (wbc()->options->get_option('configuration','second_slug')==$cart['eo_wbc_target']) {

                    WC()->session->set('EO_WBC_SETS',
                        array(
                            'FIRST'=>NULL,
                            'SECOND'=>array(
                                            $cart['eo_wbc_product_id'],
                                            $cart['quantity'],
                                            (isset($cart['variation_id'])?$cart['variation_id']:NULL)
                                        )
                    ));
                }                                              
            }                        
        }
    }

    public function eo_wbc_add_to_cart_link() {
        
        $cart=base64_decode(wbc()->sanitize->get('CART'),TRUE);
        
        if(!empty($cart)){

            $cart=str_replace("\\",'',$cart);
            $cart=(array)json_decode($cart);
            
            if(is_array($cart) OR is_object($cart)) {
                   
                return EO_WBC_Support::eo_wbc_get_cart_url()."?add-to-cart=".(isset($cart['variation_id'])?$cart['variation_id']:$cart['eo_wbc_product_id'])."&quantity=".$cart['quantity'];                
            } else {
                return EO_WBC_Support::eo_wbc_get_cart_url();
            }
        }
    }

    public function eo_wbc_add_filters() {
        //Add product filter widget...
        
        add_action( 'woocommerce_archive_description',function(){     
            wbc()->load->model('publics/component/eowbc_filter_widget');          
            // if (class_exists('EO_WBC_Filter_Widget')) {
                \eo\wbc\model\publics\component\EOWBC_Filter_Widget::instance()->init();                                
            // }
        },130);         
        
    }

    public function eo_wbc_add_breadcrumb()
    {           
        //Add Breadcumb at top....      
        add_action( 'woocommerce_archive_description',function(){     
            wbc()->load->model('publics/component/eowbc_breadcrumb');       
            echo \eo\wbc\model\publics\component\EOWBC_Breadcrumb::eo_wbc_add_breadcrumb(wbc()->sanitize->get('STEP'),wbc()->sanitize->get('BEGIN')).'<br/><br/>';
        }, 120);
    }

    public function eo_wbc_render()
    {   
        if( wbc()->options->get_option('configuration','pair_maker_status',FALSE)/*get_option('eo_wbc_pair_maker_status',FALSE)*/ && isset($_GET) && !empty(wbc()->sanitize->get('STEP')) && wbc()->sanitize->get('STEP')==2 && (empty(wbc()->sanitize->get('FIRST')) XOR empty(wbc()->sanitize->get('SECOND'))) ) {

            add_action( 'wp_enqueue_scripts',function(){ 
                // wp_register_style('eo_wbc_ui_css',plugin_dir_url(EO_WBC_PLUGIN_FILE).'asset/css/fomantic/semantic.min.css');
                // wp_enqueue_style( 'eo_wbc_ui_css');
                // wp_register_script('eo_wbc_ui_js',plugin_dir_url(EO_WBC_PLUGIN_FILE).'asset/js/fomantic/semantic.min.js');
                // wp_enqueue_script( 'eo_wbc_ui_js');
                wbc()->load->asset('css','fomantic/semantic.min');
                wbc()->load->asset('js','fomantic/semantic.min');
            },100);

            add_action('wp_head',function(){
                ?>
                    <style type="text/css">
                        .products{
                            display: none !important;
                        }                        
                        .ui.card>.image>img, .ui.cards>.card>.image>img{
                            width: 50%;
                        }
                    </style>                    
                <?php
            });

            add_action('wp_footer',function(){
                wbc()->load->template('publics/category', array()); 
            });

        } else {
            //Hide Add to cart in Shop and product_category page
            remove_action( 'woocommerce_after_shop_loop_item','woocommerce_template_loop_add_to_cart');
                    
            remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );    

            //Add information to end of pemalink of product
            add_filter( 'post_type_link',array($this,'eo_wbc_product_url'));   
        } 

        add_action( 'woocommerce_no_products_found', function(){

            remove_action( 'woocommerce_no_products_found', 'wc_no_products_found', 10 );
            $html='<!-- Created with Wordpress plugin - WooCommerce Product bundle choice --><br/><br/>';
            $html.='<div class="woocommerce ui grid centered">';
                $html.='<div class="ui row" style="height:max-content;">';                    
                    $html.="<div class='ui grid centered'>";
                        $html.="<div class='ui row' style='padding-bottom:3rem !important'>";
                            $html.="<h1 style='font-size:10vw;color:#767676;'>Ooops!</h1>";
                        $html.="</div>";
                        $html.="<div class='ui row' style='padding-bottom:0px'>";
                            $html.='<span class="ui inverted text">' . __( 'No products were found matching your selection.', 'woocommerce' ) .'<span>';
                        $html.="</div>";    
                        $html.="<div class='ui row'  style='padding-bottom:3rem !important'>";                            
                            $html.='<button href="'.$this->eo_wbc_prev_url().'" class="ui inverted secondary single_add_to_cart_button button alt">Go back</button>&nbsp;&nbsp;';
                            $html.='<button href="'.((empty(wbc()->sanitize->get('FIRST')) XOR empty(wbc()->sanitize->get('SECOND')))?strtok(get_permalink((empty(wbc()->sanitize->get('FIRST'))?wbc()->sanitize->get('SECOND'):wbc()->sanitize->get('FIRST'))),'?'):'').'" class="ui grey button single_add_to_cart_button alt">Continue buying single item</button>&nbsp;&nbsp;';
                        $html.="</div>";    
                                                    
                        if(current_user_can('manage_options')){
                            //Manage the mapping section
                            $html.="<div class='ui row' style='padding-bottom:0rem !important'>";
                                $html.='<a href="'.admin_url('admin.php?page=eowbc-mapping').'"><span class="ui text primary">As admin of the site please create a product mapping to fix this problem.</span></a>';
                            $html.="</div>";                                                    
                        } else {                            
                            $html.="<div class='ui row' style='padding-bottom:0rem !important'>";
                                $html.='<a href="'.site_url('/?wbc_report=1').'">Report to admin to help them fix this problem.</a>&nbsp;&nbsp;';
                            $html.="</div>";                                                    
                        }
                        
                        $html.="<div class='ui row' style='padding-bottom:5rem !important'>";    
                            $html.="<span class='ui header'></span>";                        
                        $html.="</div>";    
                    $html.="</div>";                
                $html.='</div>';                                    
            $html.='</div><script> jQuery(document).ready(function($){ $(".ui.button").on("click",function(){ window.location.href=$(this).attr("href"); }); }); </script>';
            echo($html);            
        }, 9 );
    }
        
    public function eo_wbc_prev_url(){
        $site_ = site_url();
        if($this->eo_wbc_get_category()==wbc()->options->get_option('configuration','first_slug')/*get_option('eo_wbc_first_slug')*/){
            $_cat=wbc()->options->get_option('configuration','first_slug')/*get_option('eo_wbc_second_slug')*/;
        } elseif ($this->eo_wbc_get_category()==wbc()->options->get_option('configuration','second_slug')/*get_option('eo_wbc_second_slug')*/) {
            $_cat=wbc()->options->get_option('configuration','second_slug')/*get_option('eo_wbc_first_slug')*/;
        }
        return $site_."/product-category/{$_cat}/?EO_WBC=1&BEGIN={$_cat}&STEP=1&FIRST=&SECOND=";
    }
    public function eo_wbc_product_url($url){
        return  $url.'?EO_WBC=1'.
                        '&BEGIN='.wbc()->sanitize->get('BEGIN').
                        '&STEP='.wbc()->sanitize->get('STEP').                            
                        '&FIRST='.
                        (
                            $this->eo_wbc_get_category()==wbc()->options->get_option('configuration','first_slug')/*get_option('eo_wbc_first_slug')*/ 
                                ?
                            ''
                                :
                            (
                                !empty(wbc()->sanitize->get('FIRST'))
                                    ? 
                                wbc()->sanitize->get('FIRST')
                                    :
                                ''
                            )
                        ).
                        '&SECOND='.
                        (
                            $this->eo_wbc_get_category()==wbc()->options->get_option('configuration','second_slug')/*get_option('eo_wbc_second_slug')*/
                                ?
                            ''
                                :
                            (
                                !empty(wbc()->sanitize->get('SECOND'))
                                    ?
                                wbc()->sanitize->get('SECOND')
                                    :
                                ''
                            )
                        );
    }

    public function eo_wbc_id_2_slug($id){
        return get_term_by('id',$id,'product_cat')->slug;
    }
    
    /**
     * Function to find current page's product super category
     * @param null
     * @return string
     */
    public function eo_wbc_get_category()
    {        
        global $wp_query;        
        
        //get list of slug which are ancestors of current page item's category
        $term_slug=array_map(array('self',"eo_wbc_id_2_slug"),get_ancestors($wp_query->get_queried_object()->term_id, 'product_cat'));


        //append current page's slug so that create complete list of terms including current term even if it is parent.
        $term_slug[]=$wp_query->get_queried_object()->slug;

        if(in_array(wbc()->options->get_option('configuration','first_slug')/*get_option('eo_wbc_first_slug')*/,$term_slug))
        {
            return wbc()->options->get_option('configuration','first_slug')/*get_option('eo_wbc_first_slug')*/;
        }
        elseif(in_array(wbc()->options->get_option('configuration','second_slug')/*get_option('eo_wbc_second_slug')*/,$term_slug))
        {
            return wbc()->options->get_option('configuration','second_slug')/*get_option('eo_wbc_second_slug')*/;
        }
    }
}