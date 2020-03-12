<?php
class EO_WBC_Review
{
    public function __construct()
    {  
        if(empty($_GET['FIRST']) || empty($_GET['SECOND']))
        {            
            exit(wp_redirect(EO_WBC_Support::eo_wbc_get_cart_url()));
            return;
        } 

        $this->eo_wbc_add_css();    //images style
        $this->eo_wbc_render();    //Page Review cart data
        
        if( !empty($_POST['add_to_cart']) && sanitize_text_field($_POST['add_to_cart'])==1)
        {
            $this->eo_wbc_add_this_to_cart();
            //Redirect to cart page.       
            exit(wp_redirect(EO_WBC_Support::eo_wbc_get_cart_url()));
        }
    }
    
    private function eo_wbc_add_css()
    {
        add_action( 'wp_head',function(){
            ?>
                <!-- Created with Wordpress plugin - WooCommerce Product bundle choice -->
                <!-- <style> div.row{ display: flex !important; flex-flow: column !important; } div.row div{ margin-top:1em; } div.woocommerce{ width:100%; } .eo_wbc_first{ float:left; display: inline-block; width:50%; } .eo_wbc_second{ display: inline-block; left: 50%; width:50%; } @media only screen and (max-width: 720px){ .eo_wbc_first{ width:100% } .eo_wbc_second{ width:100%; } } </style> -->
            <?php
            /*<style>
                div.row{
                    display: flex !important;
                    flex-flow: column !important;
                }
                div.row div{
                    margin-top:1em;
                }
                div.woocommerce{                        
                    width:100%;
                }   
                .eo_wbc_first{            
                    float:left;            
                    display: inline-block;                        
                    width:50%;
                }           
                .eo_wbc_second{
                    display: inline-block;                        
                    left: 50%;
                    width:50%;
                }                    
                @media only screen and (max-width: 720px){
                    .eo_wbc_first{    
                        width:100%
                    }
                    .eo_wbc_second{
                        width:100%;                            
                    }
                }
            </style>*/
        });            
    }
    
    public function eo_wbc_add_this_to_cart()
    {
        $eo_wbc_sets=WC()->session->get('EO_WBC_SETS',NULL);
        $eo_wbc_maps=WC()->session->get('EO_WBC_MAPS',array());
        
        if(!is_null($eo_wbc_sets)){
            
            foreach (wc()->cart->cart_contents as $cart_key=>$cart_item)
            {
                $product_count=0;
                $single_count=0;
                //loop through each of maps and count total product and single product count.
                foreach ($eo_wbc_maps as $map)
                {
                    if($map["FIRST"][0]==$cart_item["product_id"] && $map["FIRST"][2]==$cart_item["variation_id"]){
                        $product_count+=$map["FIRST"][1];
                        if (!$map["SECOND"]){
                            $single_count+=$map["FIRST"][1];
                        }
                    }
                    if ($map["SECOND"] && $map["SECOND"][0]==$cart_item["product_id"] && $map["SECOND"][2]==$cart_item["variation_id"])
                    {
                        $product_count+=$map["SECOND"][1];
                    }
                }
                //if no such product available in maps then just add as single to the list.
                if ($product_count>0)
                {
                    //if total product count is lesser then cart's total amount.
                    if ($product_count<$cart_item["quantity"])
                    {
                        //if the item is single only.
                        if($single_count>0)
                        {
                            foreach ($eo_wbc_maps as $map_key=>$map)
                            {
                                if($map["FIRST"][0]==$cart_item["product_id"] && $map["FIRST"][2]==$cart_item["variation_id"])
                                {
                                    unset($eo_wbc_maps[$map_key]);
                                }                                
                            }
                            $eo_wbc_maps[]=array(
                                    "FIRST"=>array(
                                        (string)$cart_item["product_id"],
                                        (string)($cart_item["quantity"]-$product_count)+$single_count,
                                        (string)$cart_item["variation_id"]                                        
                                        ),
                                    "SECOND"=>FALSE
                                );
                        }
                        else
                        {
                            $eo_wbc_maps[]=array(
                                "FIRST"=>array(
                                    (string)$cart_item["product_id"],
                                    (string)($cart_item["quantity"]-$product_count),
                                    (string)$cart_item["variation_id"]                                    
                                ),
                                "SECOND"=>FALSE
                            );
                        }
                    }
                }
                else
                {
                    //No product available in maps so add as single to list.
                    $eo_wbc_maps[]=array(
                        "FIRST"=>array(
                            (string)$cart_item["product_id"],
                            (string)$cart_item["quantity"],
                            (string)$cart_item["variation_id"]                            
                        ),
                        "SECOND"=>FALSE
                    );
                }
            } 
            //adding set to the woocommerce cart
            $cart_details=WC()->session->get('EO_WBC_SETS');
            if(!empty($cart_details['FIRST']) && !empty($cart_details['SECOND'])){
                $FIRT_CART_ID=wc()->cart->add_to_cart(
                                $cart_details['FIRST'][0],
                                $cart_details['FIRST'][1],
                                $cart_details['FIRST'][2],
                                is_null($cart_details['FIRST'][2])?null:EO_WBC_Support::eo_wbc_get_product_variation_attributes($cart_details['FIRST'][2])
                            );                  
                if($FIRT_CART_ID)
                {
                    $SECOND_CART_ID=wc()->cart->add_to_cart(
                                $cart_details['SECOND'][0],
                                $cart_details['SECOND'][1],
                                $cart_details['SECOND'][2],
                                is_null($cart_details['SECOND'][2])?null:EO_WBC_Support::eo_wbc_get_product_variation_attributes($cart_details['SECOND'][2])
                            );
                    if($SECOND_CART_ID)
                    {
                        //All is good so we saved mapps to session.
                        $eo_wbc_maps[]=WC()->session->get('EO_WBC_SETS');                            
                        WC()->session->set('EO_WBC_MAPS',$eo_wbc_maps);
                    }
                    else
                    {
                        $FIRST_OB=(array)wc()->cart->get_cart_item($FIRT_CART_ID);
                        if($FIRST_OB['quantity']==$cart_details['FIRST'][1])
                        {
                            wc()->cart->remove_cart_item($FIRT_CART_ID);
                        }
                        elseif($FIRST_OB['quantity']>$cart_details['FIRST'][1])
                        {
                            wc()->cart->set_quantity($FIRT_CART_ID,($FIRST_OB['quantity']-$cart_details['FIRST'][1]));
                        }                   
                    }
                }            
            }            
        }
        else
        {
            wc_add_notice(__('Unexpected error has occured','woo-bundle-choice'),'error');
            wc_print_notices();
        }                
    }
    
    private function eo_wbc_add_to_cart()
    {
        $cart=base64_decode(sanitize_text_field($_GET['CART']),TRUE);        
        if (!empty($cart)){
            
            $cart=str_replace("\\",'',$cart);
            $cart=(array)json_decode($cart);
            if(is_array($cart) OR is_object($cart)){

                //if product belongs to first target;
                $eo_wbc_sets=WC()->session->get('EO_WBC_SETS',array());                
                if (get_option('eo_wbc_first_slug')==$cart['eo_wbc_target']) {

                    $eo_wbc_sets['FIRST']=array(
                                        $cart['eo_wbc_product_id'],
                                        $cart['quantity'],
                                        (isset($cart['variation_id'])?$cart['variation_id']:NULL)
                                    );
                }
                //if product belongs to second target;
                elseif (get_option('eo_wbc_second_slug')==$cart['eo_wbc_target']) {

                     $eo_wbc_sets['SECOND']=array(
                                        $cart['eo_wbc_product_id'],
                                        $cart['quantity'],
                                        (isset($cart['variation_id'])?$cart['variation_id']:NULL)                                            
                                    );
                }
                WC()->session->set('EO_WBC_SETS',$eo_wbc_sets);
            }
        }
        
    }

    private function eo_wbc_buttons_css(){
      return '.ui.dimmer .ui.button{'.
          (get_option('eo_wbc_home_btn_color')?'background-color:'.get_option('eo_wbc_home_btn_color').' !important;':'').
          (get_option('eo_wbc_home_btn_text_color')?'color:'.get_option('eo_wbc_home_btn_text_color').' !important;':'').
          (get_option('eo_wbc_home_btn_border_color')?'border-color:'.get_option('eo_wbc_home_btn_border_color').' !important;':'').
          (get_option('eo_wbc_home_btn_radius')?'border-radius:'.get_option('eo_wbc_home_btn_radius').'px !important;':'').'}'.
          (get_option('eo_wbc_home_btn_hover_color')?'.ui.dimmer .ui.button:hover{ background-color:'.get_option('eo_wbc_home_btn_hover_color').' !important; }':'');
            
    }
    
    private function eo_wbc_render()
    {   
        add_action( 'wp_enqueue_scripts',function(){ 
            wp_register_style('eo_wbc_ui_css',plugin_dir_url(EO_WBC_PLUGIN_FILE).'css/ui/semantic.min.css');
            wp_enqueue_style( 'eo_wbc_ui_css');
            wp_register_script('eo_wbc_ui_js',plugin_dir_url(EO_WBC_PLUGIN_FILE).'js/ui/semantic.min.js');
            wp_enqueue_script( 'eo_wbc_ui_js');
        },100);

        add_action('wp_footer',function(){
            ?>
                <script>
                    jQuery(document).ready(function($){
                        jQuery('.special.cards .image').dimmer({ on: 'hover' });
                    });
                </script>
            <?php
        },100);

        add_filter('the_content',function(){

            if(!in_the_loop() || !is_singular() || !is_main_query() ) return '';
            
            if( !empty($_GET['FIRST']) && !empty($_GET['SECOND']) && !empty($_GET['CART']) )
            {                
                //if data available at _GET then add to out custom cart
                $this->eo_wbc_add_to_cart();
            }                        
            
            //Add session set data to temporary iff the set data is not empty.
            if(WC()->session->get('EO_WBC_SETS',FALSE)) {
                
                $_session_set=WC()->session->get('EO_WBC_SETS',FALSE);
                if(!empty($_session_set['FIRST']) && !empty($_session_set['SECOND']) ){
                    WC()->session->set('TMP_EO_WBC_SETS',WC()->session->get('EO_WBC_SETS'));
                }
            }
            
            $set=WC()->session->get('TMP_EO_WBC_SETS',FALSE);            
            if(!empty($set)){

                $first=EO_WBC_Support::eo_wbc_get_product((int)($set['FIRST'][2]?$set['FIRST'][2]:$set['FIRST'][0]));
                $second=EO_WBC_Support::eo_wbc_get_product((int)($set['SECOND'][2]?$set['SECOND'][2]:$set['SECOND'][0]));

                $content=EO_WBC_Breadcrumb::eo_wbc_add_breadcrumb(sanitize_text_field($_GET['STEP']),sanitize_text_field($_GET['BEGIN'])).'<br/>';
                
                $content.='<!-- Created with Wordpress plugin - WooCommerce Product bundle choice --><div class="ui special cards centered">'.
                    '<div class="card">'.
                        '<div class="blurring dimmable image">'.
                          '<div class="ui dimmer inverted transition hidden">'.
                            '<div class="content">'.
                                '<div class="center">'.
                                    '<a class="ui button primary" href="'.EO_WBC_Breadcrumb::eo_wbc_breadcrumb_change_url((!empty($_GET['BEGIN']) && $_GET['BEGIN']==get_option('eo_wbc_first_slug') ? 1 : 2),(empty($set['FIRST'][2])?$set['FIRST'][0]:$set['FIRST'][2])).'" >Change</a>'.
                                '</div>'.
                            '</div>'.
                          '</div>'.$first->get_image('full').
                          '</div>'.
                        '<div class="content">'.
                            '<div class="header">'.($first->get_title()).'</div>'.
                            '<div class="meta">'.__($set['FIRST'][2]?"<br/>".implode('<br/>',EO_WBC_Support::eo_wbc_get_product_variation_attributes($set['FIRST'][2])):'').
                            '</div>'.
                        '</div>'.
                        '<div class="extra content">'.
                            '<div class="header description">'.
                                (wc_price($first->get_price())."&nbsp;X&nbsp;".$set['FIRST'][1]).
                            '</div>'.
                        '</div>'.
                    '</div>'.
                    '<div class="card">'.
                        '<div class="blurring dimmable image">'.
                          '<div class="ui dimmer inverted transition hidden">'.
                            '<div class="content">'.
                                '<div class="center">'.
                                    '<a class="ui button primary" href="'.EO_WBC_Breadcrumb::eo_wbc_breadcrumb_change_url((!empty($_GET['BEGIN']) && $_GET['BEGIN']==get_option('eo_wbc_first_slug') ? 2 : 1),(empty($set['SECOND'][2])?$set['SECOND'][0]:$set['SECOND'][2])).'">Change</a>'.        
                                '</div>'.
                            '</div>'.
                          '</div>'.
                          $second->get_image('full').
                        '</div>'.
                        '<div class="content">'.
                            '<div class="header">'.__($second->get_title()).'</div>'.
                            '<div class="meta">'.__($set['SECOND'][2]?"<br/>".implode('<br/>',EO_WBC_Support::eo_wbc_get_product_variation_attributes($set['SECOND'][2])):'').
                            '</div>'.
                        '</div>'.
                        '<div class="extra content">'.
                            '<div class="header description">'.
                                (wc_price($second->get_price())."&nbsp;X&nbsp;".$set['SECOND'][1]).
                            '</div>'.
                        '</div>'.
                    '</div>'.
                '</div>'.
                '<div class="ui row"><form action="" method="post" class="woocommerce" style="float:right;margin-top: 1.5em;">'.
                    '<input type="hidden" name="add_to_cart" value=1>'.
                    '<button class="ui button right floated aligned" style="background-color:'.get_option('eo_wbc_active_breadcrumb_color',wc()->session->get('EO_WBC_BG_COLOR',FALSE)).'">'.__('Add This To Cart','woo-bundle-choice').
                    '</button>'.
                '</form></div>';                
                return $content;
            } else {
                
                exit(wp_redirect(EO_WBC_Support::eo_wbc_get_cart_url()));                
            }            
           
        });	   
    }
}
