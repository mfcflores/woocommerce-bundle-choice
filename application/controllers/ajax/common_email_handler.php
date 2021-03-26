<?php
/**
*	Ajax handler to handle ajax save request for eowbc_filters form.	
*
*/

$res = array( "type"=>"success", "msg"=>"" );

if( !empty(wbc()->sanitize->post('_wpnonce')) ) {

	$subject_template = wbc()->sanitize->post('email_header_template');
	$subject_template = explode(',',$subject_template);
	if(empty($subject_template) or count($subject_template)!==2){
		$res["type"]="error";
	}

	$email_template = wbc()->sanitize->post('email_body_template');
	$email_template = explode(',',$email_template);
	if(empty($email_template) or count($email_template)!==2){
		$res["type"]="error";
	}

	$subject_template = wbc()->options->get_option($subject_template[1],$subject_template[0]);
	$email_template = wbc()->options->get_option($email_template[1],$email_template[0]);

	if(!empty($subject_template) and !empty($email_template) and !empty(wbc()->sanitize->post('email_field_vars'))) {
	
		if(strpos($email_template,'{filter_data}')){
			$filter_data = array();

			// Filter data collaction.
			if(!empty($_POST['_category'])){
				$category = wbc()->sanitize->post('_category');
				$category = array_filter(explode(',',$category));
				if(!empty($category) and is_array($category)){
					foreach ($category as $cat) {
						$_category = get_term_by('slug',$cat,'product_cat');
						if(!empty($_category) and !is_wp_error($_category) and !empty(wbc()->sanitize->post('cat_filter_'.$cat))){

							$cat_terms = wbc()->sanitize->post('cat_filter_'.$cat);
							$cat_terms = array_filter(explode(',',$cat_terms));

							$cat_terms_names = array();

							if(!empty($cat_terms) and is_array($cat_terms)){
								foreach ($cat_terms as $cat_term) {
									$cat_term_obj = get_term_by('slug',$cat_term,'product_cat');
									if(!empty($cat_term_obj) and !is_wp_error($cat_term_obj)){
										$cat_terms_names[] = $cat_term_obj->name;
									}
									
								}
								$filter_data[$_category->name] = implode(', ',$cat_terms_names);
							}
						}
					}
				}
			}

			if(!empty($_POST['_attribute'])){
				$attribute = wbc()->sanitize->post('_attribute');
				$attribute = array_filter(explode(',',$attribute));
				if(!empty($attribute) and is_array($attribute)){

					wbc()->load->model('category-attribute');

					$catat_model = \eo\wbc\model\Category_Attribute::instance();
					
					foreach ($attribute as $attr) {
						
						$_attribute = $catat_model->get_attribute(substr($attr,3));

						if(!empty($_attribute) and !is_wp_error($_attribute)) {

							if(!empty(wbc()->sanitize->post('min_'.$attr)) and !empty(wbc()->sanitize->post('max_'.$attr))) {

								$attr_min = wbc()->sanitize->post('min_'.$attr);
								$attr_max = wbc()->sanitize->post('max_'.$attr);

								$attr_term_obj_min = get_term_by('slug',$attr_min,$attr);

								if(!empty($attr_term_obj_min) and !is_wp_error($attr_term_obj_min)){
									$attr_term_obj_min = get_term_by('name',$attr_min,$attr);										
								}

								$attr_term_obj_max = get_term_by('slug',$attr_max,$attr);

								if(!empty($attr_term_obj_max) and !is_wp_error($attr_term_obj_max)){
									$attr_term_obj_max = get_term_by('name',$attr_max,$attr);										
								}
								
								
								if(!empty($attr_term_obj_min) and !is_wp_error($attr_term_obj_min) and !empty($attr_term_obj_max) and !is_wp_error($attr_term_obj_max)){
																
									$filter_data[$_attribute->attribute_label] = $attr_term_obj_min->name.' - '.$attr_term_obj_max->name;
								}


							} elseif( !empty(wbc()->sanitize->post('checklist_'.$attr)))  {
								$attr_terms = wbc()->sanitize->post('checklist_'.$attr);
								$attr_terms = array_filter(explode(',',$attr_terms));	

								$attr_terms_names = array();

								if(!empty($attr_terms) and is_array($attr_terms)){
									foreach ($attr_terms as $attr_term) {
										
										$attr_term_obj = get_term_by('slug',$attr_term,$attr);

										if(!empty($attr_term_obj) and !is_wp_error($attr_term_obj)){
											$attr_term_obj = get_term_by('name',$attr_term,$attr);			
										}
										
										if(!empty($attr_term_obj) and !is_wp_error($attr_term_obj)){
											$attr_terms_names[] = $attr_term_obj->name;
										}
									}
									$filter_data[$_attribute->attribute_label] = implode(', ',$attr_terms_names);
								}

							}					
						}
					}
				}
			}

			if(!empty(wbc()->sanitize->post('min_price')) and !empty(wbc()->sanitize->post('max_price'))){
				$filter_data['Price'] = wc_price(wbc()->sanitize->post('min_price')).' - '. wc_price(wbc()->sanitize->post('max_price'));
			}

			if(!empty($filter_data)){
				$filter_details = '';
				foreach ($filter_data as $filter_data_key => $filter_data_value) {
					$filter_details.="${filter_data_key}: ${filter_data_value}".$nl;				
				}
				$email_template = str_replace('{filter_data}',$filter_details,$email_template);
			}			
		}

		$nl='<br/>
		';
		$email_template = str_replace('{nl}', $nl, $email_template);
		$email_field_vars = wbc()->sanitize->post('email_field_vars');
		$email_field_vars = explode(',',$email_field_vars);
		if(!empty($email_field_vars) and is_array($email_field_vars)){
			foreach ($email_field_vars as $email_field_var) {
				$email_template = str_replace('{'.$email_field_var.'}',wbc()->sanitize->post($email_field_var), $email_template);	
			}
		}
			
		$admin_email=wbc()->options->get('admin_email');
			
		if(!empty(sanitize_email($admin_email))){
			wp_mail($admin_email,$subject_template, $email_template);
		}

	} else {
		$res["type"]="error";
	}
}
else {
	$res["type"]="error";
}
/*echo json_encode($res);
die();*/
wbc()->rest->response($res);