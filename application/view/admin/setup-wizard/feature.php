<?php
/*
*	Displays the setup wizard's feature page
*/
?>
			<input type="hidden" name="action" value="feature">
			<div class="ui form segment">
			  	<div class="grouped fields">

			    	<label class="ui large text"><?php _e('Choose features','woo-bundle-choice'); ?> <span class="ui medium grey text"><?php echo eowbc_lang( "(You can later change these options from Settings page)" ); ?></span></label>

			    	<?php if(wbc()->sanitize->get('eo_wbc_inventory_type') == 'jewelry'): ?>	
		      		<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="ring_builder" id="ring_builder" value="1" <?php echo in_array('ring_builder',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Ring Builder</label>
					    </div>
					</div>
					<?php endif; ?>

					<?php if(wbc()->sanitize->get('eo_wbc_inventory_type') == 'clothing'): ?>	
		      		<div class=" field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="pair_maker" value="1" <?php echo in_array('pair_maker',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Pair Maker</label>
					    </div>
					</div>
					<?php endif; ?>
		    		
		    		<?php 
					//hiren disabled this on 08-05-2020 since now the single diamond API integration option is added 
		    		if(false && wbc()->sanitize->get('eo_wbc_inventory_type') == 'jewelry'): 
		    		?>
			      		<div class=" field">
						    <div class="ui toggle checkbox">
						      	<input type="checkbox" tabindex="0" class="hidden" name="rapnet_api" value="1" <?php echo in_array('rapnet_api',$feature_option)?'checked="checked"':''; ?>>
						      	<label>Rapnet (You will need paid <a href="https://sphereplugins.com/product/woocommerce-rapnet-integration-extension/" target="_blank">extension</a>)</label>
						    </div>
						</div>

						<div class=" field">
						    <div class="ui toggle checkbox">
						      	<input type="checkbox" tabindex="0" class="hidden" name="glowstar_api" value="1" <?php echo in_array('glowstar_api',$feature_option)?'checked="checked"':''; ?>>
						      	<label>GlowStart Diamond API (API service is free, but you will need paid <a href="https://sphereplugins.com/product/diamond-api-integration/" target="_blank">extension</a>)</label>
						    </div>
						</div>
					<?php 
					endif; 
					?>

					<?php if(wbc()->sanitize->get('eo_wbc_inventory_type') == 'others' or wbc()->sanitize->get('eo_wbc_inventory_type') == 'home_decor'): ?>
					<div class=" field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="guidance_tool" value="1" <?php echo in_array('guidance_tool',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Guidance Tool</label>
					    </div>
					</div>
					<?php endif; ?>
					
					<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="price_control" value="1" <?php echo in_array('price_control',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Price Control <a href="https://sphereplugins.com/product/woocommerce-diamond-api-integration/" target="_blank">Learn more</a></label>
					    </div>
					</div>		  

					<?php if(wbc()->sanitize->get('eo_wbc_inventory_type') == 'jewelry'): ?>	
		      		<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="filters_on_home" value="1" <?php echo in_array('filters_on_home',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Filters for Home</label>
					    </div>
					</div>

					<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="filters_on_shop_cat" value="1" <?php echo in_array('filters_on_shop_cat',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Filters for Shop/Category Page</label>
					    </div>
					</div>

					<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="opts_uis_on_item_page" value="1" <?php echo in_array('opts_uis_on_item_page',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Options UI for Item Page</label>
					    </div>
					</div>

					<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="spec_view_on_item_page" value="1" <?php echo in_array('spec_view_on_item_page',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Specifications View for Item Page</label>
					    </div>
					</div>
					<?php endif; ?>  	

					<?php 
					//we are asking this also because so that if user is not going to use shortcodes we do not affect performance by any chance
					?>
					<div class="field">
					    <div class="ui toggle checkbox">
					      	<input type="checkbox" tabindex="0" class="hidden" name="shortcodes" value="1" <?php echo in_array('shortcodes',$feature_option)?'checked="checked"':''; ?>>
					      	<label>Shortcode</label>
					    </div>
					    <i class="exclamation circle icon" data-content="If enabled shortcodes functionality will be enabled for button widgets and other widgets where it is possible for us to provide shortcode." data-variation="very wide"></i>
					</div>

					<?php 
		    		if(wbc()->sanitize->get('eo_wbc_inventory_type') == 'jewelry'): 
		    		?>
						<div class=" field">
						    <div class="ui toggle checkbox">
						      	<input type="checkbox" tabindex="0" class="hidden" name="api_integrations" value="1" <?php echo in_array('api_integrations',$feature_option)?'checked="checked"':''; ?>>
						      	<label>Diamond APIs Integrations</label>
						    </div>
						    <i class="exclamation circle icon" data-html="Rapnet, GlowStar and other popular api interations, you can even request if the one you want to use is not supported yet by us. (Note that for this feature you will need paid <a href='https://sphereplugins.com/product/woocommerce-diamond-api-integration/' target='_blank'>extension</a>)" data-variation="very wide"></i>
						</div>
						
					<?php 
					endif; 
					?>

			  	</div>
			  	<div class="inline fields">
			  		<div class="field">
			  			<button class="ui inverted red button" type="submit" onclick="window.history.go(-1); return false;">Back</button>
			  		</div>
			  		<div class="field">
			  			<button class="ui inverted primary button" type="submit"><?php echo eowbc_lang('Next');?></button>
			  		</div>
			  	</div>
			</div>