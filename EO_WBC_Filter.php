<?php
class EO_WBC_Filter
{
	function eo_wbc_attribute_range($term,$min,$max,$numeric_range=FALSE) {
        $list=array();
        if($min==$max) {
            $list[]=$min;
        }
        else {
            if($numeric_range)
            {            	
            	$list=get_terms(array('taxonomy'=>$term,'hide_empty'=>FALSE));            	
            	$list=array_filter($list,function($element){
					return !( (int)$element->name >= (int)$min AND (int)$element->name <= $max);
				});
				$list=array_column($list,'term_id');
            }
            else
            {
                $list=get_terms(array('taxonomy'=>$term,'hide_empty'=>FALSE));
                $list_slug=array_column($list,'slug');
				$_min=array_search($min, $list_slug);
				$_max=array_search($max, $list_slug);
				
				$list=array_filter($list,function($index){
					return !($index >= $_min AND $index <= $_max);
				},ARRAY_FILTER_USE_KEY);

				$list=array_column($list,'term_id');
            }                
        }              
        return $list;
    }

	//////////////////////////////////////////////////////////////////////////////////////////////////
	//  Enable non table based filter that loads whole page at front :)
	//////////////////////////////////////////////////////////////////////////////////////////////////
	function __construct() {

		if(isset($_GET['eo_wbc_filter'])) {    

		    add_filter('pre_get_posts',function($query ) {		    		

		        if( $query->is_main_query() ) {

		        	if(isset($_GET['products_in']) AND !empty($_GET['products_in']) ){
		        		$query->set('post__in',explode(',',$_GET['products_in']));			        	
			        }

		            /*$tax_query=array('relation' => 'AND');
                    ///////////////////////////////////////////////
                    //Filter section for category
                    ///////////////////////////////////////////////
		            if( isset($_GET['_category']) OR isset($_GET['_current_category']) ){

		                if(!empty($_GET['_category'])) {

		                    foreach( array_filter(explode(',', $_GET['_category'])) as $_category){
		                    	
		                        if(isset($_GET['cat_filter_'.$_category]) && (!empty($_GET['cat_filter_'.$_category])) ) {                           
		                            $tax_query[]=array(
		                                'taxonomy' => 'product_cat',
		                                'field' => 'slug',
		                                'terms' =>array_filter(explode(',',$_GET['cat_filter_'.$_category])),
		                                'compare'=>'EXISTS IN'
		                            );                    
		                        }
		                    }  
		                }
		                elseif(!empty($_GET['_current_category'])) {

		                    $tax_query[]=array(
		                        'taxonomy' => 'product_cat',
		                        'field' => 'slug',
		                        'terms' => explode(',',$_GET['_current_category'])
		                    );
		                }

		                ///////////////////////////////////////////////
	                    //Filter section for attributes
	                    ///////////////////////////////////////////////                    
			            if(!empty($_GET['_attribute'])) {

			                foreach (array_filter(explode(',', $_GET['_attribute'])) as $attr) {

			                    if(isset($_GET['min_'.$attr]) && isset($_GET['max_'.$attr])){
			                        
			                        if ( is_numeric($_GET['min_'.$attr]) && is_numeric($_GET['max_'.$attr]) ) {
			                            
			                            $tax_query[]=array(
			                                'taxonomy' => $attr,
			                                'field' => 'slug',
			                                'terms' => $this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr],true),
			                                'compare'=>'EXISTS IN'
			                            );
			                        }
			                        else {

			                            $tax_query[]=array(
			                                'taxonomy' => $attr,
			                                'field' => 'slug',
			                                'terms' => $this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr]),
			                                'compare'=>'EXISTS IN'
			                            );
			                        }                   
			                    }
			                    elseif (isset($_GET['checklist_'.$attr]) && !empty($_GET['checklist_'.$attr])) {
			                        $tax_query[]=array(
			                            'taxonomy' => $attr,
			                            'field' => 'slug',
			                            'terms' => explode(',',$_GET['checklist_'.$attr]),
			                            'compare'=>'EXISTS IN'
			                        );     
			                    } 
			                }
			            }           
		            }*/

		            /*$query->set('tax_query',$tax_query);*/
		            /*echo json_encode($tax_query);
		        	exit();*/		        	
		        	if( isset($_GET['_category']) OR isset($_GET['_current_category']) ){

		        		$tax_query=array('relation' => 'AND');
		                if(!empty($_GET['_category'])) {

		                    foreach( array_unique(array_filter(explode(',', $_GET['_category']))) as $_category){
		                    	
		                        if(isset($_GET['cat_filter_'.$_category]) && (!empty($_GET['cat_filter_'.$_category])) ) {                           
		                            $tax_query[]=array(
		                                'taxonomy' => 'product_cat',
		                                'field' => 'slug',
		                                'terms' =>array_filter(explode(',',$_GET['cat_filter_'.$_category])),
		                                'compare'=>'EXISTS IN'
		                            );                    
		                        }
		                    }  
		                }
		                elseif(!empty($_GET['_current_category'])) {

		                    $tax_query[]=array(
		                        'taxonomy' => 'product_cat',
		                        'field' => 'slug',
		                        'terms' => explode(',',$_GET['_current_category']),
		                        'compare'=>'EXISTS IN'
		                    );
		                }		                
		                /*$query->set('tax_query',$tax_query);*/

		                ///////////////////////////////////////////////
	                    //Filter section for attributes
	                    ///////////////////////////////////////////////  
		                if(!empty($_GET['_attribute'])) {

			                foreach (array_filter(explode(',', $_GET['_attribute'])) as $attr) {

			                    if(isset($_GET['min_'.$attr]) && isset($_GET['max_'.$attr])){
			                        
			                        if ( is_numeric($_GET['min_'.$attr]) && is_numeric($_GET['max_'.$attr]) ) {
			                            
			                            $tax_query[]=array(
			                                'taxonomy' => $attr,
			                                'field' => 'term_id',
			                                'terms' => $this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr],true),
			                                'compare'=>'EXISTS IN'
			                            );
			                        }
			                        else {

			                            $tax_query[]=array(
			                                'taxonomy' => $attr,
			                                'field' => 'term_id',
			                                'terms' => $this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr]),
			                                'compare'=>'EXISTS IN'
			                            );
			                        }                   
			                    }
			                    elseif (isset($_GET['checklist_'.$attr]) && !empty($_GET['checklist_'.$attr])) {
			                        $tax_query[]=array(
			                            'taxonomy' => $attr,
			                            'field' => 'slug',
			                            'terms' => explode(',',$_GET['checklist_'.$attr]),
			                            'compare'=>'EXISTS IN'
			                        );     
			                    } 
			                }
			            }

		                $query->set('tax_query',$tax_query);

			            /*if(!empty($_GET['_attribute'])) {
			            	
			            	$meta_query=array('relation' => 'AND');

			                foreach (array_filter(explode(',', $_GET['_attribute'])) as $attr) {

			                    if(isset($_GET['min_'.$attr]) && isset($_GET['max_'.$attr])){
			                        
			                        if ( is_numeric($_GET['min_'.$attr]) && is_numeric($_GET['max_'.$attr]) ) {
			                            
			                            $meta_query[]=array(
			                            	'key'     => 'attribute_'.$attr,
						                    'value'   => array_unique($this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr],true)),
						                    'compare' => 'IN'
			                            );
			                        }
			                        else {
			                        	$meta_query[]=array(
			                            	'key'     => 'attribute_'.$attr,
						                    'value'   => $this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr]),
						                    'compare' => 'IN'
			                            );
			                        }                   
			                    }
			                    elseif (isset($_GET['checklist_'.$attr]) && !empty($_GET['checklist_'.$attr])) {
			                        $meta_query[]=array(
		                            	'key'     => 'attribute_'.$attr,
					                    'value'   => $this->eo_wbc_attribute_range($attr,$_GET['min_'.$attr],$_GET['max_'.$attr]),
					                    'compare' => 'IN'
		                           	);     
			                    } 
			                }				                	                
			                $query->set('meta_query',$meta_query);
			            }*/
		            }		            
		        }		       
		    });		   
		}
	}	
}