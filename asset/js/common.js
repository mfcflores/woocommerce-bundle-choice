/**
 * common js functions and also the common defs for the module, observer, prototype and singleton design patterns 
 * 
 * this asset file will contain the common layer and functions, and if there are common functions which are specific to admin only then that will not go here but on in the admin asset js file, and if there are common functions which are to be used by frontend but in some cases by admin or even if not going to be used by admin then also be added here. so this asset file will be loaded on both admin and frontend. the decision of managing common flows like this and priotizing what goes to frontend is because of the requirement of minimizing the number of assets that would be loaded on frontend. 
 */
window.document.splugins = window.document.splugins || {};
window.document.splugins.common = window.document.splugins.common || {};

window.document.splugins.wbc = window.document.splugins.wbc || {};

//  common functions 
window.document.splugins.common.parseJSON = function(result,confirm_obj_format=true, obj_format='result'/*our standard response result object on any kind of ajax or api calls to our backends and other applicable layers*/) {
    var resjson = null;
    try{
        console.log('called splugins parseJSON');
        resjson = jQuery.parseJSON(result);
    }
    catch(e) {
        try{
            console.log('Normal jQuery parseJSON failed. Trying extract.');
            jsonobjs = window.document.splugins.extractJSON(result);
            // TODO here it is possible that in some rare cases more than one json result object is return in that case we need to find all json string object from response and identify our response only by putting some unique key/identifier like wbc_ajax_response maybe in our response
            if( typeof(jsonobjs[0]) != undefined && typeof(jsonobjs[0]) != 'undefined' ) {
                console.log('splugins parseJSON extracted the json string from response');
                result = JSON.stringify(jsonobjs[0]);   //since we want to use jQuery.parseJSON
                resjson = jQuery.parseJSON(result); 
            }
        }
        catch(e) {
            console.log('Exception handling of splugins parseJSON failed.');
        }
    }

    if( resjson ){

        if( confirm_obj_format ) {

            if( obj_format == 'result' ) {

                if( typeof(resjson["type"]) == undefined || typeof(resjson["type"]) == 'undefined' ) {
                    console.log('splugins parseJSON undefined type detected in the json response');
                    resjson["type"] = "error";
                }

                if( typeof(resjson["msg"]) == undefined || typeof(resjson["msg"]) == 'undefined' ) {
                    console.log('splugins parseJSON undefined msg detected in the json response');
                    resjson["msg"] = "";
                }
            }
        }
        
        return resjson;
    }
    else {
        return {"type":"error","msg":"Unable to parse result json object, please contact Sphere Plugins Support for a quick fix on this issue."};
    }
}

window.document.splugins.common._o = function(object, property) {

    return Object.prototype.hasOwnProperty.call(object, property);
   
}

window.document.splugins.common._b = function(binding_stats, event, key) {
    
    binding_stats[event] = binding_stats[event]  || {};

    if(typeof( binding_stats[event][key]) == undefined){

         binding_stats[event][key] = true;
         return false;

    }

    return true;

}


//  TODO publish defs from here of the any design pattern that we define to be used as common patter like design pattern of the wbc.filters module 
    //  below the observer design pattern implemented for Feed.events act as one of published defs



//  Feed 
window.document.splugins.Feed = window.document.splugins.Feed || {};



//  Feed.events 
//  the feeling comes in the mind is it may become overloaded if we create such a broad class like Feed where Feed page can contain many features, events and so on. but there is absolute need of one central observer pattern which let subscribe to any subject(feature) and then later notify them when related event occurs. the need is of central observer and notifier but nothing beyond that so it will be very light and almost like a namespace holding diferent fetures. and in essense Feed will be collection of different subject(feature) where each subject is itself a observer pattern. 
    //  it is supposed to hold the collection of features like pagination, filters, feed render, sorting and so on but yeah its only job is to listen to events and notify to their subscribers. 
    //  NOTE: whenever if any requirements comes up of supporting the jquery events based on their trigger/on api functions then that can as usual be supported internally, all that is needed is is register subject with one additional param that is event_core_backend=jQuery. -- and on this regard the syntax can also bring as much closer as possible to that of jQuery syntax but yeah we will need atleast something like sp_e or so just like _ underscore js have _ in there for everything. 
window.document.splugins.events = window.document.splugins.events || {};

window.document.splugins.events.subject = window.document.splugins.events.subject || {};

window.document.splugins.events.subject.core = function( feature_unique_key, notifications ) {
    this.feature_unique_key = feature_unique_key;
    this.notifications = notifications;     // [];    //  list of notifications it can notify for.  
    this.observers = [];

    return {
    feature_unique_key: function() {

        return this.feature_unique_key;
    },    
    subscribeObserver: function(observer) {
        // ACTIVE_TODO here check the callbacks of observer first and if this subject is not supporting the notifications for particular callback then simply throw error and do not subscriber the observer 

        this.observers.push(observer);
    },
    unsubscribeObserver: function(observer) {
        // ACTIVE_TODO implement as required only
        // var index = this.observers.indexOf(observer);
        // if(index > -1) {
        // this.observers.splice(index, 1);
        // }
    },
    notifyObserver: function(observer) {
        // ACTIVE_TODO implement as required only
        // var index = this.observers.indexOf(observer);
        // if(index > -1) {
        // this.observers[index].notify(index);
        // }
    },
    notifyAllObservers: function(notification) {
        for(var i = 0; i < this.observers.length; i++){
            this.observers[i].notify(i, notification);
        };
    }
    };
};

//  publish it 
window.document.splugins.events.subject.api = window.document.splugins.events.subject.core( {}/*if required then the php layer configs can be set here by using the js vars defined from the php layer*/ );

window.document.splugins.events.observer = window.document.splugins.events.observer || {};

window.document.splugins.events.observer.core = function(callbacks) {
    this.callbacks = callbacks;     // [];    //  list of notifications callbacks it waits for.  

    return {
        notify: function(index, notification) {
            // console.log("Observer " + index + " is notified!");

            // TODO check if observer listens to this notification and if not then return with false
            // var index = this.observers.indexOf(observer);
            // if(index > -1) {
            // this.observers.splice(index, 1);
            // }

            this.callbacks[notification]();
        }
    }
}

//  publish it 
window.document.splugins.events.observer.api = window.document.splugins.events.observer.core( {}/*if required then the php layer configs can be set here by using the js vars defined from the php layer*/ );

window.document.splugins.events.core = function() {
    this.subjects = [];

    return {

        createSubject: function( feature_unique_key, notifications ) {
            // console.log("Observer " + index + " is notified!");

            // TODO check if subject already created and exist then throw error
            // var index = this.observers.indexOf(observer);
            // if(index > -1) {
            // this.observers.splice(index, 1);
            // }

            this.subjects.push( new window.document.splugins.events.subject( feature_unique_key, notifications ) );
        }, 
        subscribeObserver: function(feature_unique_key, callbacks) {
            // console.log("Observer " + index + " is notified!");

            // before subscribing the ovserver check if the feature_unique_key subject is created in the first place, if not then throw error 
            var found_index = null;
            for(var i = 0; i < this.subjects.length; i++){
                if( this.subjects[i].feature_unique_key() == feature_unique_key ) {

                    found_index = i;
                    break;
                }
            }

            if( found_index == -1 ) {

                throw "There is no subject exist for specified feature_unique_key "+feature_unique_key;
            } else {

                this.subjects[found_index].subscribeObserver( new window.document.splugins.events.observer( callbacks ) );
            }
        },
        notifyAllObservers: function(feature_unique_key, notification, stat_object=null, callbackt=null ) {

            // NOTE: now the events module will officially support one way callback on the notification that is recieved by subscriber. and also the one more stat_object var. and the callback is strictly one way only and there is no plan to extend it further. and even if it is required for any flow then the base flow and architecture should be refactored to achieve that which will ensure simple and clean flow, and if extend callback flow further then it would help achieve high dynamics but would also lead to unnecessarily complex, sensitive to regression effects and the messy architecture resulting in many long debug sessions also. so instead in such cases js modules should refine there architecture a little as needed and simply publish public function under their api which would do the job. and if even by any chance we required to do this then it must be confirmed with the expertly designed architectures and design patterns which confirms that more level of callbacks would be fine and not lead to complex or messy flows or race conditions if followed certain standards. -- and on a side note one can make use of stat_object and some additional mechanisam to implement back and forth callbacks but as usual since we are not supporting the callbacks officially similarly we neither intend to implement or approve any such flow. so that should not be done in the first place. 

            // console.log("Observer " + index + " is notified!");

            // check if the feature_unique_key subject is created in the first place, if not then throw error 
            var found_index = null;
            for(var i = 0; i < this.subjects.length; i++){
                if( this.subjects[i].feature_unique_key() == feature_unique_key ) {

                    found_index = i;
                    break;
                }
            }

            if( found_index == -1 ) {

                throw "There is no subject exist for specified feature_unique_key "+feature_unique_key;
            } else {

                this.subjects[found_index].notifyAllObservers( notification );
            }
        }

    }
}


//  publish it 
window.document.splugins.events.api = window.document.splugins.events.core( {}/*if required then the php layer configs can be set here by using the js vars defined from the php layer*/ );

// var subject = new Subject();

// var observer1 = new Observer();
// var observer2 = new Observer();
// var observer3 = new Observer();
// var observer4 = new Observer();

// subject.subscribeObserver(observer1);
// subject.subscribeObserver(observer2);
// subject.subscribeObserver(observer3);
// subject.subscribeObserver(observer4);

// subject.notifyObserver(observer2); // Observer 2 is notified!

// subject.notifyAllObservers();
// // Observer 1 is notified!
// // Observer 2 is notified!
// // Observer 3 is notified!
// // Observer 4 is notified!


//  templating 
window.document.splugins.templating = window.document.splugins.templating || {};

window.document.splugins.templating.core = function( configs ) {

    var _this = this; 

    _this.configs = jQuery.extend({}, {}/*default configs*/, configs);  

    var get_template = function( tmpl_id, templating_lib ) {

        if( templating_lib == 'wp' ) {

            return wp.template( tmpl_id );  
        }
    };

    var apply_data = function( template, template_data, templating_lib ) {

        if( templating_lib == 'wp' ) {

            return template( template_data );   
        }
    };

    //  so far the templates are set from the server layers so no need to set it from here so far  
    var set_template = function( tmpl_id, template_content, templating_lib ) {

        //  TODO implement 
    };

    return {

        get_template: function( tmpl_id, templating_lib ) {

            return get_template( tmpl_id, templating_lib );
        }, 
        apply_data: function( template, template_data, templating_lib ) {

            return apply_data( template, template_data, templating_lib ); 
        }, 
        set_template: function( tmpl_id, template_content, templating_lib ) {

            set_template( tmpl_id, template_content, templating_lib ); 
        }

    };
};

//  publish it 
window.document.splugins.templating.api = window.document.splugins.templating.core( {}/*if required then the php layer configs can be set here by using the js vars defined from the php layer*/ );

///////////// -- 15-06-2022 -- @drashti -- ///////////////////////////////

//  compatability 
window.document.splugins.compatability = window.document.splugins.compatability || {};

window.document.splugins.compatability.core = function(configs) {
    this.configs = jQuery.extend({}, {}/*default configs*/, configs);   

    var get_template = function( tmpl_id, templating_lib ) {

      
    };

    var apply_data = function( template, template_data, templating_lib ) {

       
    };

    //  so far the templates are set from the server layers so no need to set it from here so far  
    var set_template = function( tmpl_id, template_content, templating_lib ) {

        //  TODO implement 
    };

    return {

        get_template: function( tmpl_id, templating_lib ) {

           
        }, 
        apply_data: function( template, template_data, templating_lib ) {

          
        }, 
        set_template: function( tmpl_id, template_content, templating_lib ) {

           
        }

    };
};

////////////////////////////////////////////



// the variations js module
window.document.splugins.wbc.variations = window.document.splugins.wbc.variations || {};

ACTIVE_TODO_OC_START
//  TODO right now variations swatches and gallery images are managed through their own js modules and so far there is no need of the central variations core js module, but whenver required we need to create one. 
    have d move to asana, the all below open comments and other comments. for reference keep some part here. and then replace this line only with "moved to asana"
    
    things supposed to be managed by the sp_variations 
        -   data 
            --  attributes 
                --  (input) types like dropdown, button, image swatches and so on 
                    --  ACTIVE_TODO so do we need to host any additional events beyond basics done, maybe not but still need to confirm, before launching the beta. so test all widget input types that we support on wbc free version -- to d and -- to h 
                --  attribute options/terms 
                    --  properties of options/terms like if out of stock 
                        --  it maybe already coming in that variable-items-wrapper dump, if not then we need to dump it from there -- to b 
            --  extract product_variations and assign in our main data var -- to d 
            --  gallery_images  
                --  images 
                --  videos 
                        --  video can be served using custom_html also but maybe its own specific type for video is necessary? need to decide on it -- to h 
                --  custom_html 
                --  NOTE: since the data in case gallery_images module will be comming from the variation events in the variation etc. event args so nothing needed to be assigned in our main data var. 
                        --  and like for swatches if required then need to dump the data in images container dom element, like for swatches it is on variable-items-wrapper element dom -- to h and -- to b 
                            --  check if that plugin we were exploring does have, but either way we will do only if it is necessary for us on the js layer -- to b 
        -   template 
            // --  will vary based on attribute types, extensions and some other feature related conditions also 
            //     --  but to simplify it we can simply depend on template_type or if required then in specific scenarios on the particular template_key 
            //         --  maybe adding anything else is unnecessary, and the attribute_types for swatches and gallery_item_type for the gallery_images is enough. so adding anything additional would make it unnecessarily complex. and either way both attribute_types and the gallery_item_type does conncets to the templates. so nothing to do here. 
                        --  however need to ensure that gallery_item_type support is in place -- to h 
                            --  on the backend legacy admin form we may already have type field which would be used as this -- to b 
                            --  and on js layers put appropriate conditions at needed layers -- to d 
                            --  and the name/key gallery_item_type may change, so lets just use the right one only -- to d and -- to b 
            // --  we will also need to interact (mainly create) the slider and zoom tempaltes 
            //     --  the main requirement will be making/creating template dynamic using the image array and so on data 
            //         --  it will almost only on php side 
            //             --  and what we could do is do it using the hooks in our slider and zoom modules php layers 
            //             --  so even our internal slider and zoom js/jquery plugins tempaltes will also be made dynamic using this hooks 
            //             --  so that these hooks become publish ready when we decide to publish the hooks and js api for slider and zoom -- and as planned in one of the option of our four option offering for the gallery_images slider and zoom, that we look forward to try supporting the external zoom and slider with our planned level of efforts, we can (and should) provide service to make the slider and zoom template dynamic using our data by implementing those hooks when those plugins are enabled.  
                            // --  ACTIVE_TODO when we decide to actually publish php hooks and js api for slider and zoom, based on user demand as mentioned below, then at that above planned php hooks will also be published 
            --  since we need to manage the slider and js templating dynamically on the slider and zoom layers 
                --  so gallery_images module will have template related functions that the form builder js module have, so create those functions -- to d 

                --  and yeah in gallery_images module we will need one more object namely template_data so create that under data object that is created -- to d 
                    --  if data object is not created then create that in gallery_images module also -- to d 

                    -- Above two points might not be necessary so check if form builder module had any flow that requires it otherwise just keep it on hold. and mark above two and these as ACTIVE_TODO and then we would remove it after 1st revision -- to d and -- to h 

                --  and t we need to make sure that our slider and zoom assets are lighter so make sure that they are loading only needed things and are difinitely the minified versions only 
                    --  first confirm if they are loading on the right place like from footer hook and so on, and are also loading once only of course -- to t 
                    --  second make sure that only minified versions are loading and if they are not minified then minify them and load that only -- to t 
                    --  third also make sure that desktop assets only are loading for desktop and the mobile assets only are loading for the mobile -- to t 
            --  react tempaltes -- we will going to one alternate widgets set of templates which would be based on react framework 
                --  what if same data which is coming from model and passed to load view is given to react as json, maybe that is the option, and our layers on php data layer and tempalting layer does match with templating layer of the react so just replace the php templating layer with react. need to confim if this is the flow we should do and yeah it is not close enough to our plan of reusability and even using executable instructions that is mentioned there in that ssm class notes -- to h 
                    --  and even if above is confirmed still in that case also we would like to continue using (and we must do it for reusability and above all we can not manage two application layers) the same js modules of particular extensions (which is rendering react widget instead of regular widgets) as the application layer specifically one which is managing events and application stat and logical insteractions(so not the UI level events, stat or logical interactions that would still be handled by react only). but is possible, confirm with t -- to h. 
            --  what about zoom dom loop template, just create one and replace inside or create all and hide/show? the later is clean and would require less maintainance so should do that. -- to h. related tasks are in the events section below. 
                    --  and in case some zoom must need only one tempalte then we can simply enable that setting using a hook for zoom core layers and php and publish that under the configsfor variations gallery_images and swatches as well. 
                        --  on js layer such configs we can keep on common parent later of the variations js module itself. 
        -   pages 
            -- category page 
            -- item page 
            --- like we implicitly assumed for the devices and so on layers, that there will be flgas like is_mobile, is_tablet that will be used throughout this variations js modules and the other layers interacting with it, similar way we can have the flgas for this pages layers also. like is_category_page and is_item_page. 
                    -- create above two flags under ..splugins.common namespace, in js.vars.asset.php so no need to pass those as configs here when this module initiated -- to d done
                --  but yeah since the pages is a significant and major layer so at some place we may like dedicated functions and there would be like some flows will require dedicated functions for the item page while some flows will require dedicated functions for the category page 
        -   slider and zoom 
            --  it will mostly be matter of interest to the variations.gallery_images module but since it is vital for overall stability of functions and the overall experience that is why it is considered as a dedicated thing 
            --  its events -- it may directly or indirectly connect itself to the below events layer mentioned 
                --  it should always be indirectly, and a mature abstraction should be ensured always otherwise our task of providing the php and js api for external and zoom and slider would become challanging 
            --  events it listens to simply the events that it mandatorily expects and the events that is optional for it but accepts 
                --  based on these we can easily define what our hooks (php layer) and js api that we are to provide for slider and zoom would look like or how it will be composed 
            --  media 
                --  images 
                --  in addition to images other things that it may need to support are videos and custom html 

            --  configurations 
                --  regarding configurations we would like to find out the way to use the legacy zoom optons settings provided maybe, first confirm if its actually legacy -- to h 
                                      var zoom_options = $.extend({
                    touch: false
                  }, wc_single_product_params.zoom_options);
                    --  and if it is legacy then first need to confirm if it has any use for other zoom plugins, or is it useful only when the legacy zoom theme support is enabled? -- to h 
                        --  that will most likely be the case, but in that case is it better idea to make the legacy zoom, lightbox, slider theme suppoort as default slider and zoom implementation? it may seems like that so in that case we must do it and asap -- to h 
                            --  however note that lightbox seems to be specific only to the photo swipe and so on feature in the plugin we were exploring -- to h 
        -   events 
                --  mouse events 
                --  keyboard events 
                --  legacy events (events of woo emitted on certain scenarios) 
                --  events emitted by other plugins/themes which we need to take care of in case of compatiblity matters, so it can be termed as the compatiblity events 
                --  just for the comments, it seems that as long as any external slider and zoom plugin is providing the key js events like that slider_thumb_click and zoom_area_hover and on php side with above flows we are almost covering the 70-80% of basics requirement to host external slider and zoom dynamically 
                    --  maybe we all we need to do is have our main container classes emitting through the base configs of particular modules -- to b 
                        --  then bind events here based on that class, so maybe dependancy on slider and zoom js/jQuery plugins is not necessary -- to h  
                            --  yeah but some jquery plugins might be preventing the events from reaching to their parent elements so in such cases we need to handle the exceptional scenarios by depending on the slider/zoom plugin to provide that event api or we may have still some other work around or compatiblity layers would help if we add there section for handling compatiblity for these required events and then if we put patches for specific slider/zoom or theme or mix of both then that will work. -- and last sort would be to depend on the external slider/zoom to provide the event API -- to h ACTIVE_TODO or would be on going TODO 
                            --  and in case when the only option that is left is to depend on the external slider/zoom jquery plugin does provide the api then in that case out gallery_images and swatches module should publish public functions under ...api namely on_click and on_hover functions which directly call the internal private functions of click and hover etc events. so in this case the listener fucntions would not be in picture and the external plugins api should be connected directly to private functions and that would achieve clean flow. -- to h ACTIVE_TODO 
                                --  and the flow for making this connection between the external plugin api and our modules published api namespace would be provided by maube a dedicated module that will provide the very planned js api for external slider/zoom plugins. -- to h ACTIVE_TODO 
                                    --  so we may like to create one such module when we do implementation to provide api for external slider/zoom plugins. -- to h ACTIVE_TODO  
                        --  and on that regard the fundamental job of the slider thumb click listener is to replace the zoom are container dom with whatever the particular related zoom template at that index provide -- to h 
                            --  and the fundamental job of the hover event of the zoom area is nothing as of now, since even the extensions handle their own business logic -- to h. so we can let the function be there and bind only when there is requirement. 
                        --  and on that regard the fundamental job of the swatches change event is to 
                            --  emit the necessary events based on the current attribute_types to be processed. so check what m had did in service class, and other extensions js -- to d 
                            --  and on this regard the base event of reset_all/reset has to emit the wc reset_variations but that must be handled by legacy layers so not sure why m did that but maybe it is raising reset event from our layers that is what m may have did in which case need to handle that -- to h 
                            --  and on this regard when we clear the old js layers of wbc, service class and extensions then we will know many such things -- to h 
                        --  and on this regard gallery_images module also need to create listener function for variation change event and listen to that, and when that is detected -- to h 
                            --  then do erase the slider and zoom dom 
                                --  it may create blink and jump effects, so could we handle that using the effects and after effect management 
                            --  then append new templates in the loop in both slider and zoom, there would be their own function and loop 
                                --  but is it good idea to do it from single function and single loop then so if certain conditions need to be managed then slider and zoom does work in sync by default without having to worry about anything 
                            --  then need to refresh the slider and zoom, so here the external slider and zoom must be binding to api events so that they does refresh their plugin when the event is recieved 
                                --  so here now maybe we need to simply publish the api with very few basics covered but atleast that would help start flow experimented and our default slider and zoom implementation can simply use that and that will help in experiment. so simply publish the api under .gallery_images.sp_slzm(confirm namespace on variations class).core and export it under ...api as usual. 
                                --  and for now just provide one public function refresh_listener and one private refresh_listener which would subscribe internally to the gallery_images notification
                                    --  and private function upon recieving the notification from the gallery_images module it would just call the callback function
                                    --  so the public refresh_listener function would accept the callback 
                                    --  ACTIVE_TODO in future though we may like to move the .gallery_images.sp_slzm module to separate asset file and separate it from our other noisy code of all js modules so that users find it clean also. 
                                        --  ACTIVE_TODO and definitely it is very basic approach with which we are going, but we would like to do research on how to build and publish api layers and api. and definitely we would like to do mature implementation from the initial versions. 

                                  
                    else if( not for example slider input is not supported then host the listener event so that extension js do its job or simply skip it and let extension js do their part )
                        // ACTIVE_TODO_OC_START
                        // --  and we can and should simply use observer pattern events to host for example the slider listener here and then emit internal change event from here     
                        //     --  still in this case the variation.swatches will register its event subject and emit bootstrap level notification like bootstrap/on.load maybe on.load is more user friendly 
                        //     --  then at that time applicable extension will bootstrap the js layer 
                        //     --  and when the change event occurs the applicable extension will simply call the ...swatches.api function to notify back about their change event or the events module can add support to provide callbacks to subscriber so that they can reply with something when they have done something based on notification. so it can be called the notification_response. -- but it will be about breaking our own rule of keeping the events simple. so even if we must do then in that case it must be till notification_response only and no further callback back and forth can be supported. otherwise it mostly lead to long debug sequences. --  however it has benefit of less maintainance since otherwise extensions need to know about the ...swatches.api but in case of events support of notification_response it only need to learn about and depend on the variations.swatches subject of events module. and as long as we can keep it limited to notification_response only and do not extend it further it will be clean to be frank. 

                        var callback = null ;
                        window.document.splugins.events.api.notifyAllObservers( 'swatches', 'process_attribute_types', type, callback );

                        //     --  and we are planning to host darker/lighter slider support also from here as usual so it will be just like above slider example 
                                --  but yeah after the change event is recieved here that will be emitted to the gallery_images module to let them do their job. since darker lighter is not part of the variation there is no further thing to do from here after the change event is recieved. -- to h. so it will involve the observer pattern notifications. 
                                    --  and since it is different kind processing that is required after change event so the input_template_type must be defined uniquely like slider_no_variation -- to h. just do the needful. 
                                        NOTE: and yeah on that note everything of the sp_variations module must be dynamic and nothing should be hardcoded so slider_no_variation input template type must be passed right from where the template is defined on admin to till here 
                        // ACTIVE_TODO_OC_END                

                    //  data applicable loops 
                    _this.data.product_variations.each( function() {

                        //  pre process data and process collections that would be necessary for neat and quick ops 

                        // collect input types to be supported 
                        _this.data.template_types = {};   
                        // ACTIVE_TODO_OC_START
                        // is the woo input template type means dropdown is mandatorily kept by plugins, not seems likely but still confirm and then we need a way to determine(always) the exact input type based on the field/input type selected on woo panel or otherwise simply support the input_template_type field which will be set in background implicitly based on the field/input type selected on woo panel -- this field is simply better then managing many different template names of extensions and defining based on that -- and it will default to the above field/input type for wbc nothing to manage, only if condition below that if input_template_type is not defined then read simply above field/input type. and in case of extensions that need to be defined based on the template that is selected on their admin panel. so this template option should be only be defining it and passing it where applicable so that is gets here. and it is need to be defined based on that only to avoid confusion and many unnecessary and confusing configuration overheads -- to h or -- to d 
                        // ACTIVE_TODO_OC_END

                    }); 

                    //  template 
                    _this.data.template_types.each( function( type ) {

                        //  do necessary logic if support is available, if not for example custom_html then manage accordingly  
                        if( type == 'default'/*means the default template provided by slider and zoom*/ || type == 'custom_html' ) 
                            // ACTIVE_TODO_OC_START
                            in case of custom_html as long as the slider and zoom events are not emitted and they would not be since we would be doing our custom html, but if they are then need to cancel them using their apis (only) as mentioned in the events functions below 
                                -- but one matter that we need to handle in detail is managing the slider thumb indexes which is providing anything custom like custom_html dom (like 360,  darker lighter, diamond meta and recently purchased) for their main image ares (which is also zoom area) 
                                    --  and mostly none of the slider or zoom plugin would be providing such complex apis and even if they do then not sure if all have those and even if they do then not sure if all have it mature 
                                        --  so one simple (but tricky, yeah it is trick and not standard) option is to simply hide the zoom area container and show the custom html. 
                                            --  but since it is not standard we should find standard, or can use that trick since it is simple and also effective option especially because it is less likely for most slider and zoom to provide support
                                                --  but if we are to use this trick then we need to bring it closer to standard implementation by ensuring the possible flows like always have our classes in zoom area container like sp-variations-zoom-container 
                            // ACTIVE_TODO_OC_END                    
                    }); 

        -   effects and managing after effects 
                --  may need to provide some effects but only where and if necessary, the majority of effects will be provided by the slider and zoom js/jQuery plugin 
                --  will need to manage the after effects very precisely, to ensure smooth and non cluttering experience 
                    --  it may or likely include managing the loading, swaping and updating of images 

                --  we may like to use the underscore js, I think we must use it from very beginning -- to h 
                    --  first of all confirm that if wp/woo legacy stack is loading it and if they are then we should not load our own versions to ensure optimum performance -- to t and -- to h 
                        --  either way if we required to load it then we must load as per the wp, woo and theme/plugins standards so that we can avoid unnecessary versions and mostly load the similar versions -- to a and -- to t. here the catch is that we need to find our the wp standards to let load the common version used by most to save on the performance and so on. 
                    --  and note that while we are planning to use the underscore js for effects management and smoothing among its other users that we may do, we should note that mostly we need to manage smoothing of broad or specific layers or mianly of extensions events/effects but apart from that the slider and zoom plugins internal smoothing and effects should managed by that plugins and that include all those image effects, smoothing including maybe also the image preload management among other things and if the particular slider and zoom is not providing it or if their support is not mature then can simply change the slider and zoom js/jquery plugin -- to h. just for the notes. 
        -   devices 
                --  is_mobile and is_tablet - this would be primary 
                        -- create above two flags under ..splugins.common namespace, in js.vars.asset.php so no need to pass those as configs here when this module initiated -- to d done
                    --  for layers which need to have complete different implementation for mobile etc. then for them applicable flgas should be set/initiated from the higher layers layers for example the slider and zoom would be completely different plugin for mobile devices -- but anyway now we will see to it again to reconsider using the new slider also for mobile but only if that is beneficial in terms of setup time and maintainance time, for the later it would be beneficial but not sure about the initial setup and implementation time and challanges that may arise. -- to h 
                        --  and we would like to reconsider the zoom also in the same way like above -- to h 
                --  browser - will matter so much 
                --  screen size - need to handle occasionally only as long as overall UI/UX layers are mature 
                --  os 
        -   plugins/themes 
                --  there will be list of compatiblity matters that need to be handled so it will go under the compatiblity matter, and clearly it will go in compatiblity layers 
                    --  not related to this section but lets create simply a compatiblity module of its own like at the level where templating module is in namespace -- to d --    ACTIVE_TODO/TODO then each modules like filters, variations and so on can have their own module like ...filters.compatiblity just like there ...filters.core core module. but this is only if necessary, otherwise a function inside core module is much readability friendly. 
                        --  a compatiblity function inside filters, variations.swatches and variations.gallery_images module -- to d 

                    --  initially even in 1st revision we must implement some fundamental compatiblity matters -- to h 
                        --  make sure that all the compatiblity matters are covered from the plugins we were exploring -- to h or -- to s 
        -   configs 
                --  will control decision of whether to display certain section or not, for example whether to display template part of attribute name (for us ribbon wrapper)
                --  or whether to show tooltip or not 
                --  ACTIVE_TODO image preload will going to be an important and strategic feature for the gallery_images module, so we will need to add support for that very soon with on admin by default is applicable flag will be on, and user can disable that if they want -- to h and -- to d 
                    --  ACTIVE_TODO/TODO and after the above feature is basically implemented very soon in future we may like add the feasible and effective innovations that would add value to this feature -- to h and -- to d 
                --  ACTIVE_TODO like above thumbnail height and thumbnail position is also something that we need to support very soon -- to h and -- to d 
                    --  ACTIVE_TODO and similarly if there is anything else like above things or related matters in the plugins we were exploring then we should cover them too -- to h and -- to d 
        -   php hooks and js api 
                        --  but yeah it will be served only if the related requirement is enabled, for example external slider and zoom option is enabled. so that extra hook and event are served or events are bound only if required and it will prevent unnecessary resource usage. 
            --  would be used by our extensions and would be used for the hooks/js-api support for slider zoom replacement 
                --  for extensions it would our events module of subject/observer pattern 
                    --  can we create and publish of it for external use also by users, at least not till it is not well thought and confirmed that it will not create any conflict or issues of any kind otherwise it will create mess for our users too 
                --  the events that sp_variations provide so that any slider or zoom can at least cover their mandatory events if not the optional 
                    --  there are two or more important ACTIVE_TODO mentioned here in this common js file, that are important to above point 
                --  the events that sp_variations will listen to 
                    --  so that slider zoom can inject their dom and so on 
                        --  there are two or more important ACTIVE_TODO mentioned here in this common js file, that are important to above point 


        -   random 
            --  each extensions will have their own module, so create variations.assets.php file in each 7 extensions. in some b had already created -- to a. ask b if you have questions. 
                --  also create load asset function in model -- to a. ask b if questions. 
                --  and then always call load_asset from render_ui calling stack -- to a. 
                --  so confirm that render_ui is called from the controller init stack, the flow for it is set in either size or shape extensions so follow that -- to a 
                --  and then load asset should load above variations.assets.php so put that loading statements -- to a. ask d or b 
                --  and then inside variations.assets.php crete the js module, the module name should be based on the singleton function name -- to a 
                --  and then inside module create the general fucntions like init, init_private, bootstrap, preprocess, preprocess_data and so on -- to s 
                --  and then from here mostly instead of hosting things like managing events or binding clicks etc. it will just listen to events. so implement all subscribe statements -- to a 
                --  and then it will additionally implement logic of when the notification recieved like doing business logic on notification or doing some processing and then calling back the callback, since now events api support one way calling back on notification -- to a  
                --  and also export publish the module under ...api -- to a 

            --  size extensions host its own change event based on its selector, so move that applicable code to the applicable function in the function heirarchy -- to a 
                --  so we may need to create one or two applicable from our function heirarchy in swatches module to over there -- to a 
                --  and then move inside those functions the applicable existing code of the size extension -- to a 
                --  and some of the existing code need to be commented, which I will update you about -- to h and -- to a 
                --  and then after that if any code remains there then discuss with me -- to a 
                --  and then listen for process_attribute_types notification and upon recieving that notification call the above functions which hosts the events -- to a 
                --  and from there when the change event is detected then call this js modules on_change or so base event handler -- to a 
                --  and that would simply call the callback function -- to a 
                --  so the callback function need to be saved under _this object with var name _this.on_change_callback, when the notification is recieved -- to a 
                --  and on the core swatches module the inline function of callback (would be created from where the notification is sent) would recieve the callaback and simply pass the call to the base on_change or change function of the swatches module -- to a 

            // --  360 extensions host its own hover event based on its selector, so move that applicable code to the applicable function in the function heirarchy -- to a done 
                // --  so we may need to create one or two applicable from our function heirarchy in gallery_images module to over there -- to a done
                    --  and one more additional event that need to be host is slider thumb hover, here the thumb is of 360 extension -- to a 
                        --  and please do check once and also talk with both k and t about if hover is now should be replaced with the click or not, if click is standard experience and most sites are doing that then we should switch to that -- to a. but maybe hover is what most sites are doing and that is why we did that actually. 
                --  and then move inside those functions the applicable existing code of the particular extension -- to a 
                    --  in this extension there will be code of playing and pausing the video so need to create base functions for them and then call them -- to a 
                        // --- play and pause aa 2 function banava na done
                            ---- play and pause no code bhavesh bhai pase thi levanose
                    --  and also there will be code of implementing the top left height and width properties of iframe, so implement that accordingly but whichever is applicable for the item page -- to a
                            // --- process_properties_template (position - top left valo code , item and catary vali condition mukvi) 
                        // --  so there there will be item page condition, just implement that as it is in the swatches etc module -- to a 
                        --  and this layers will also host or recieve many logics and flows of the 360 overall improvements and major upgrades we planned -- to h and -- to a 
                    // --  and additionally there are 360 related handling inside the zoom assets.php file so move that at right place in the this 360 js module -- to a (360 related code levano baki hoy to check karvu) 
                --  and some of the existing code need to be commented, which I will update you about -- to h and -- to a 
                --  and then after that if any code remains there then discuss with me -- to a 
                --  and then listen for process_images notification and upon recieving that notification call the above functions which hosts the events -- to a 
                --  and from there when the change event is detected then call this js modules on_change or so base event handler -- to a 
                --  and that would simply call the callback function -- to a 
                --  so the callback function need to be saved under _this object with var name _this.on_change_callback, when the notification is recieved -- to a 
                --  and on the core swatches module the inline function of callback (would be created from where the notification is sent) would recieve the callaback and simply pass the call to the base on_change or change function of the swatches module -- to a 
                -- init - initprivate - preprocess - (prepocessdata)   

            // --  darker lighter extensions host its own hover event based on its selector, so move that applicable code to the applicable function in the function heirarchy -- to a done
                // --  so we may need to create one or two applicable from our function heirarchy in gallery_images module to over there -- to a done
                    // --  and one more additional event that need to be host is slider thumb hover, here the thumb is of darker lighter extension -- to a 
                        // --  and please do check once and also talk with both k and t about if hover is now should be replaced with the click or not, if click is standard experience and most sites are doing that then we should switch to that -- to a. but maybe hover is what most sites are doing and that is why we did that actually. 
                --  and then move inside those functions the applicable existing code of the particular extension -- to a 
                        --  and this layers will also host or recieve many logics and flows of the darker lighter overall improvements and major upgrades we planned -- to h and -- to a (omar ni site ma virtual try on check karvanu darker lighter , darker lighter mobile ni javascript all point)
                    // --  and additionally there maybe darker lighter related code handling inside the zoom assets.php file so move that at right place in the this darker lighter js module -- to a (aa file mathi code levano se)
                --  and some of the existing code need to be commented, which I will update you about -- to h and -- to a 
                --  and then after that if any code remains there then discuss with me -- to a 
                --  and then listen for process_images notification and upon recieving that notification call the above functions which hosts the events -- to a 
                --  and from there when the change event is detected then call this js modules on_change or so base event handler -- to a 
                --  and that would simply call the callback function -- to a 
                --  so the callback function need to be saved under _this object with var name _this.on_change_callback, when the notification is recieved -- to a 
                --  and on the core swatches module the inline function of callback (would be created from where the notification is sent) would recieve the callaback and simply pass the call to the base on_change or change function of the swatches module -- to a 

            --  diamond meta 

            --  advanced info 

            --  recently purchased 

ACTIVE_TODO_OC_END

// the variations swatches js module
window.document.splugins.wbc.variations.swatches = window.document.splugins.wbc.variations.swatches || {};

window.document.splugins.wbc.variations.swatches.core = function( base_container_selector, configs ) {

    var _this = this; 

    _this.configs = jQuery.extend({}, {}/*default configs*/, configs);

    _this.base_container = jQuery( ...common._o( _this.configs, 'base_container_selector') /*ACTIVE_TODO_OC_START -- to d. base_container_selector ACTIVE_TODO_OC_END*/ ||  '.variations_form' );      

    var _this.data = {};
    var _this.binding_stats = {};     
    _this.data.product_variations = _this.data('product_variations') || []; not confirm yet if actually this container holds this data or something else     


    this.$wrapper = this._element.closest('.product');
    this.$variations_form = this.$wrapper.find('.variations_form');
    // ACTIVE_TODO_OC_START
    // here mostly in the private scope, the variations module should subscribe to search filter events and pass those to variations core which would call the change event so that filters those affecting the variations data like images etc. are rendered accordingly. so that metal color based or shape based images render appropriately. 
    //     --  however, it is not limited to js layer only and actually js layer here would not be of use except the search is client side only based on the js. but the searches are always carried on the backend so the php layer need to ensure that return appropriate variations images etc. whenever the selected options of the search filters connects with variations instead of the main product. 
    //         --  m have did it already but need to implement throughly as per standard if not proper yet 
    
    // if below difference and includes functions are provided by underscore js backed by wp/woo maybe then we can port through our common namespace, mainly because maybe on other platforms or so the underscore might not be available then it can be replaced somehow from there. so maybe still it will going to be _(underscore) function only and we will need to call it with long name pattern or we can port even the common namespace as sp_common so the call will be like sp_common._ -- to h 
    // ACTIVE_TODO_OC_END
    var in_stocks = _.difference(selects, disabled_selects);
    if (_.includes(in_stocks, attribute_value)) {

    var init_private = function() {

        window.document.splugins.events.api.createSubject( 'swatches', ['process_attribute_types'] );

        preprocess();
    };


    var preprocess = function() {

        //
        //  data applicable loops 
        //
        // pre process data and process collections that would be necessary for neat and quick ops 
        preprocess_data( _this.data.product_variations );   

        // do necessary bindings for the attribute types to be supported 
        process_attribute_types();  


            // Init on Ajax Popup :)
            $(document).on('wc_variation_form.wvs', '.variations_form:not(.wvs-loaded)', function (event) {
              $(this).WooVariationSwatches();
            });

            // Try to cover all ajax data complete
            $(document).ajaxComplete(function (event, request, settings) {
              _.delay(function () {
                $('.variations_form:not(.wvs-loaded)').each(function () {
                  $(this).wc_variation_form();
                });
              }, 100);
            });

            // Composite product load
            // JS API: https://docs.woocommerce.com/document/composite-products/composite-products-js-api-reference/
            $(document.body).on('wc-composite-initializing', '.composite_data', function (event, composite) {
              composite.actions.add_action('component_options_state_changed', function (self) {
                $(self.$component_content).find('.variations_form').removeClass('wvs-loaded wvs-pro-loaded');
              });

              /* composite.actions.add_action('active_scenarios_updated', (self) => {
                 console.log('active_scenarios_updated')
                 $(self.$component_content).find('.variations_form').removeClass('wvs-loaded wvs-pro-loaded')
               })*/
            });

            // ACTIVE_TODO_OC_START
            // // Support for Yith Infinite Scroll
            so a call from here to the compatability function of this module, and that will cover all compatability matters of load time inlcuding the promize resolve block of the plugin we were exploring. so call compatability with section=bootstrap -- to d 
            // ACTIVE_TODO_OC_END

            // WooCommerce Filter Nav
            $('body').on('aln_reloaded.wvs', function () {
              _.delay(function () {
                $('.variations_form:not(.wvs-loaded)').each(function () {
                  $(this).wc_variation_form();
                });
              }, 100);
            });

        this.product_variations = this.$element.data('product_variations') || [];
        this.is_ajax_variation = this.product_variations.length < 1;
        this.product_id = this.$element.data('product_id');
              this.reset_variations = this.$element.find('.reset_variations');

        this.$element.addClass('wvs-loaded');

        our flow of calling the functions heirarchy as part of the preprocess function, will cover below like flow of binding for the update and also initialization tasks -- to h 
            --  and in out init and preprocess layer we need to bind all above legacy events which are mostly for executing the wc_variation_form ultimately -- to h 
                --  and non legacy matters in above list would go to the compatability layers -- to h 
        // Call
        this.init();
        this.update();

              // Trigger
              $(document).trigger('woo_variation_swatches', [this.$element]);

            var _this2 = this;

            var _this = this;


            most part of below code developes the logic for the stock based disable and enable feature 
                --  so we may like to consider the fundamentals for now and would do mature implementation in the 2nd revision -- to h 

        ACTIVE_TODO_OC_START
        this would be determined based on admin options settings, and we may already have that admin options settings and if not then we need to add that -- to h and -- to s 
            --  and the options object should be loaded from the variations.assets.php file, and that is already recieving many admin options related to apprearance from the model. all this options or required options should be passed to this js module under configs parameter but admin settings options should reside under key options within the configs object. -- to h and -- to s 
            --  and view with shape was already supporting this selected item label, so need to manage this asap. and atleast we can first execute this point so that shape extension does function as expected -- to h 
        // Append Selected Item Template
        if (woo_variation_swatches_options.show_variation_label) {
          this.$element.find('.variations .label').each(function (index, el) {
            $(el).append(_this2.selected_item_template);
          });
        }


            this.$element.find('ul.variable-items-wrapper').each(function (i, el) {

              $(this).parent().addClass('woo-variation-items-wrapper');

              var select = $(this).siblings('select.woo-variation-raw-select');
              var selected = '';
              var options = select.find('option');
              var disabled = select.find('option:disabled');
              var out_of_stock = select.find('option.enabled.out-of-stock');
              var current = select.find('option:selected');
              var eq = select.find('option').eq(1);

              var li = $(this).find('li:not(.woo-variation-swatches-variable-item-more)');
              var reselect_clear = $(this).hasClass('reselect-clear');

              var mouse_event_name = 'click.wvs'; // 'touchstart click';

              var attribute = $(this).data('attribute_name');
              // let attribute_values = ((_this.is_ajax_variation) ? [] : _this._generated[attribute])
              // let out_of_stocks = ((_this.is_ajax_variation) ? [] : _this._out_of_stock[attribute])
              var selects = [];
              var disabled_selects = [];
              var out_of_stock_selects = [];
              var $selected_variation_item = $(this).parent().prev().find('.woo-selected-variation-item-name');

              // For Avada FIX
              if (options.length < 1) {
                select = $(this).parent().find('select.woo-variation-raw-select');
                options = select.find('option');
                disabled = select.find('option:disabled');
                out_of_stock = select.find('option.enabled.out-of-stock');
                current = select.find('option:selected');
                eq = select.find('option').eq(1);
              }

              there will be dedicated functions under preprocess_data function heirarchy, for managing stock status and other limitations 
                --  the functions names would be namely preprocess_stock_status_data -- to h 
                --  and the other such functions which would be required is manging other such conditions, managing the legacy number of variations limit and other such limitations of supporting 30 variations only for certain functions which was there in the plugin we were exploring -- to h. it may be ACTIVE_TODO 
              options.each(function () {
                if ($(this).val() !== '') {
                  selects.push($(this).val());
                  selected = current.length === 0 ? eq.val() : current.val();
                }
              });

              disabled.each(function () {
                if ($(this).val() !== '') {
                  disabled_selects.push($(this).val());
                }
              });

              // Out Of Stocks
              out_of_stock.each(function () {
                if ($(this).val() !== '') {
                  out_of_stock_selects.push($(this).val());
                }
              });

              var in_stocks = _.difference(selects, disabled_selects);

              // console.log('out of stock', out_of_stock_selects)
              // console.log('in stock', in_stocks)

              var available = _.difference(in_stocks, out_of_stock_selects);

              // Mark Selected
              li.each(function (index, li) {

                var attribute_value = $(this).attr('data-value');
                var attribute_title = $(this).attr('data-title');

                // Resetting LI
                $(this).removeClass('selected disabled out-of-stock').addClass('disabled');
                $(this).attr('aria-checked', 'false');
                $(this).attr('tabindex', '-1');

                if ($(this).hasClass('radio-variable-item')) {
                  $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', true).prop('checked', false);
                }

                // Default Selected
                // We can't use es6 includes for IE11
                // in_stocks.includes(attribute_value)
                // _.contains(in_stocks, attribute_value)
                // _.includes(in_stocks, attribute_value)

                if (_.includes(in_stocks, attribute_value)) {

                  $(this).removeClass('selected disabled');
                  $(this).removeAttr('aria-hidden');
                  $(this).attr('tabindex', '0');

                  $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false);

                  if (attribute_value === selected) {

                    $(this).addClass('selected');
                    $(this).attr('aria-checked', 'true');

                    if (woo_variation_swatches_options.show_variation_label) {
                      $selected_variation_item.text(woo_variation_swatches_options.variation_label_separator + ' ' + attribute_title);
                    }

                    if ($(this).hasClass('radio-variable-item')) {
                      $(this).find('input.wvs-radio-variable-item:radio').prop('checked', true);
                    }
                  }
                }

                // Out of Stock

                if (available.length > 0 && _.includes(out_of_stock_selects, attribute_value) && woo_variation_swatches_options.clickable_out_of_stock) {
                  $(this).removeClass('disabled').addClass('out-of-stock');
                }
              });
            });

            this.$element.trigger('woo_variation_swatches_init', [this, this.product_variations]);

            $(document).trigger('woo_variation_swatches_loaded', [this.$element, this.product_variations]);
          }

    };

    var preprocess_data = function() {

        ACTIVE_TODO not sure if this is necessary 
        this._generated = this.product_variations.reduce(function (obj, variation) {

          Object.keys(variation.attributes).map(function (attribute_name) {
            if (!obj[attribute_name]) {
              obj[attribute_name] = [];
            }

            if (variation.attributes[attribute_name]) {
              obj[attribute_name].push(variation.attributes[attribute_name]);
            }
          });

          return obj;
        }, {});

        ACTIVE_TODO but we will make use of it from beginning 
        this._out_of_stock = this.product_variations.reduce(function (obj, variation) {

          Object.keys(variation.attributes).map(function (attribute_name) {
            if (!obj[attribute_name]) {
              obj[attribute_name] = [];
            }

            if (variation.attributes[attribute_name] && !variation.is_in_stock) {
              obj[attribute_name].push(variation.attributes[attribute_name]);
            }
          });

          return obj;
        }, {});
    
    };

    var process_attribute_types = function() {

        _this.data.attribute_types.each( function( type ) {

            // ACTIVE_TODO_OC_START
            // --  so above preprocess_data call should simply prepare two attribute types list, first is attribute_types and second is ... or simply one only. and simply delegate everything else that is not coming under attribute_types, to the extensions layers. and should simply publish this list of attribute_types from backend. 
            // NOTE: and one of the key benefit of this approach is that these layers will emit the broadcast notification event only if they detect the type to be the premiumly supported type and otherwise not. which would minimize process and little or not hanging processes and less debug console logs that would appear around. 

            // is the woo input template type means dropdown is mandatorily kept by plugins, not seems likely but still confirm and then we need a way to determine(always) the exact input type based on the field/input type selected on woo panel or otherwise simply support the input_template_type field which will be set in background implicitly based on the field/input type selected on woo panel -- this field is simply better then managing many different template names of extensions and defining based on that -- and it will default to the above field/input type for wbc nothing to manage, only if condition below that if input_template_type is not defined then read simply above field/input type. and in case of extensions that need to be defined based on the template that is selected on their admin panel. so this template option should be only be defining it and passing it where applicable so that is gets here. and it is need to be defined based on that only to avoid confusion and many unnecessary and confusing configuration overheads. no simply need to stick to attribute type only means field/input-type selected on woo panel and that is standard and clean. so implement here based on that only. -- to h or -- to d 
            // ACTIVE_TODO_OC_END

            if( type == '?' )
            // ACTIVE_TODO_OC_START    
            // do necessary logic if support is available
            //     --  that means based on type call/process necessary functions/layers for example events functions(some events functions already defined below), template functions/layers, pages functions/layers, like events the effects functions/layers, plugins/themes applicable compatiblity function calls, slider and zoom functions/layers(note that even for swatches modules there might be some conditions or conditional logics that would be required) -- to d 
            //     --  and also do call/process necessary functions/layers for the provided device type(and maybe some of their specifications would also need to be handled in future like width(which would otherwise mostly be dynamically handled), resolution and so on ACTIVE_TODO) and configs, but it will be a specific block here only and the dedicated function for them sound unnecessary -- to d
            //         --  and we need some logic of if function or layer need to be called once only then take care of that, for all above functions, including the devices and configs that are to be handled from here -- to d 
            //         --  and as usual there will going to be if conditions for applicable matters in applicable functions and their layers defined above, to handle the devices and configuration specific matters. and so the dedicated blocks of devices and configs will handle some specific matters which do not necessarily mixed with other things mentioned above like events, template, pages and so on layers. -- to h    
            // ACTIVE_TODO_OC_END   

                process_pages(type);

                process_slider_and_zoom(type); 

                process_events(type); 

                process_and_manage_effects(type);

                process_compatability_matters(type);

                // ACTIVE_TODO_OC_START
                // -   devices 
                //         --  for layers which need to have complete different implementation for mobile etc. then for them applicable flgas should be set/initiated from the higher layers layers for example the slider and zoom would be completely different plugin for mobile devices -- but anyway now we will see to it again to reconsider using the new slider also for mobile but only if that is beneficial in terms of setup time and maintainance time, for the later it would be beneficial but not sure about the initial setup and implementation time and challanges that may arise. 
                //             --  and we would like to reconsider the zoom also in the same way like above 
                //     --  browser - will matter so much 
                //     --  screen size - need to handle occasionally only as long as overall UI/UX layers are mature 
                //     --  os 
                // ACTIVE_TODO_OC_END    

                    if(window.document.splugins.common.is_mobile){

                    }else if(window.document.splugins.common.is_tablet){


                    }else if(browser){

                    }else if(screen size){

                    }else if(os){

                    };

                // ACTIVE_TODO_OC_START    
                // -   configs 
                //     --  will control decision of whether to display certain section or not, for example whether to display template part of attribute name (for us ribbon wrapper)
                //     --  or whether to show tooltip or not 
                // ACTIVE_TODO_OC_END

                    if( type == 'radio' ) 
                          
            else if( not for example slider input is not supported then host the listener event so that extension js do its job or simply skip it and let extension js do their part )
                // ACTIVE_TODO_OC_START
                // --  and we can and should simply use observer pattern events to host for example the slider listener here and then emit internal change event from here     
                //     --  still in this case the variation.swatches will register its event subject and emit bootstrap level notification like bootstrap/on.load maybe on.load is more user friendly 
                //     --  then at that time applicable extension will bootstrap the js layer 
                //     --  and when the change event occurs the applicable extension will simply call the ...swatches.api function to notify back about their change event or the events module can add support to provide callbacks to subscriber so that they can reply with something when they have done something based on notification. so it can be called the notification_response. -- but it will be about breaking our own rule of keeping the events simple. so even if we must do then in that case it must be till notification_response only and no further callback back and forth can be supported. otherwise it mostly lead to long debug sequences. --  however it has benefit of less maintainance since otherwise extensions need to know about the ...swatches.api but in case of events support of notification_response it only need to learn about and depend on the variations.swatches subject of events module. and as long as we can keep it limited to notification_response only and do not extend it further it will be clean to be frank. 

                var callback = null ;
                window.document.splugins.events.api.notifyAllObservers( 'swatches', 'process_attribute_types', type, callback );

                //     --  and we are planning to host darker/lighter slider support also from here as usual so it will be just like above slider example 
                //         --  but yeah after the change event is recieved here that will be emitted to the gallery_images module to let them do their job. since darker lighter is not part of the variation there is no further thing to do from here after the change event is recieved. 
                //             --  and since it is different kind processing that is required after change event so the input_template_type must be defined uniquely like slider_no_variation 
                //                 NOTE: and yeah on that note everything of the sp_variations module must be dynamic and nothing should be hardcoded so slider_no_variation input template type must be passed right from where the template is defined on admin to till here 
                // ACTIVE_TODO_OC_END                
            if( type == 'radio' ) 
            // ACTIVE_TODO_OC_START    
            //     -   configs 
            //             --  will control decision of whether to display certain section or not, for example whether to display template part of attribute name (for us ribbon wrapper)
            //             --  or whether to show tooltip or not 

            // --  it wil be a specific block here for devices and configs -- to d 
            // --  while for the rest create dedicated functions like process_template, process_events and so on. for the layers listed below. 
            //     --  create below list of functions after the process_attribute_types function, and apply above peudo flows there and rest of the flows those functions should adapt from the flow notes from the heirachical flow plan at top -- to d and -- to h 
            //         // -- process_template -- to d done
            //         // -- process_pages -- to d done
            //         // -- process_slider_and_zoom -- to d done
            //         // -- process_events -- to d done
            //         // -- process_and_manage_effects -- to d done
            //         // -- process_compatability_matters -- to d done
            // ACTIVE_TODO_OC_END        
            
        }); 

    }


    var process_template = function() {

        // ACTIVE_TODO_OC_START
        // --  or whether to show tooltip or not 
        // ACTIVE_TODO_OC_END 

        if( type == 'radio' ) 

    }

    var process_pages = function() {

        if(window.document.splugins.common.is_category_page){

        }else if(window.document.splugins.common.is_item_page){

        };

    }

    var process_slider_and_zoom = function(type){
        
    }

    var process_events = function(type){

        on_change_listener();    

        on_click_listener();    
    }

    var process_and_manage_effects = function(type){
        
    }

    var process_compatability_matters = function(type){
        
        if(type == 'buttons'){

            compatability("button_section");

        }else if(type == 'image'){

            compatability("image_section");

        } 

    }

    // -   events 
    // --  mouse events 
    var on_change_listener = function(type) {

        if(window.document.splugins.common._b(_this.binding_stats, 'on_change_listener', type)){
            return false;
        }

        jQuery('#select_attribute_of_variation').on('woocommerce_variation_has_changed', function(){
            // do your magic here...
         }); 

        var _this = this;
        this.$element.off('woocommerce_variation_has_changed.wvs');
        this.$element.on('woocommerce_variation_has_changed.wvs', function (event) {

          // Don't use any propagation. It will disable composit product functionality
          // event.stopPropagation();

          $(this).find('ul.variable-items-wrapper').each(function (index, el) {

            var select = $(this).siblings('select.woo-variation-raw-select');
            var selected = '';
            var options = select.find('option');
            var disabled = select.find('option:disabled');
            var out_of_stock = select.find('option.enabled.out-of-stock');
            var current = select.find('option:selected');
            var eq = select.find('option').eq(1);
            var li = $(this).find('li:not(.woo-variation-swatches-variable-item-more)');

            //let reselect_clear   = $(this).hasClass('reselect-clear');
            //let is_mobile        = $('body').hasClass('woo-variation-swatches-on-mobile');
            //let mouse_event_name = 'click.wvs'; // 'touchstart click';

            var attribute = $(this).data('attribute_name');
            // let attribute_values = ((_this.is_ajax_variation) ? [] : _this._generated[attribute])
            // let out_of_stocks = ((_this.is_ajax_variation) ? [] : _this._out_of_stock[attribute])

            var selects = [];
            var disabled_selects = [];
            var out_of_stock_selects = [];
            var $selected_variation_item = $(this).parent().prev().find('.woo-selected-variation-item-name');

            // For Avada FIX
            if (options.length < 1) {
              select = $(this).parent().find('select.woo-variation-raw-select');
              options = select.find('option');
              disabled = select.find('option:disabled');
              out_of_stock = select.find('option.enabled.out-of-stock');
              current = select.find('option:selected');
              eq = select.find('option').eq(1);
            }

            options.each(function () {
              if ($(this).val() !== '') {
                selects.push($(this).val());
                // selected = current ? current.val() : eq.val()
                selected = current.length === 0 ? eq.val() : current.val();
              }
            });

            disabled.each(function () {
              if ($(this).val() !== '') {
                disabled_selects.push($(this).val());
              }
            });

            // Out Of Stocks
            out_of_stock.each(function () {
              if ($(this).val() !== '') {
                out_of_stock_selects.push($(this).val());
              }
            });

            var in_stocks = _.difference(selects, disabled_selects);

            var available = _.difference(in_stocks, out_of_stock_selects);

            if (_this.is_ajax_variation) {

              li.each(function (index, el) {

                var attribute_value = $(this).attr('data-value');
                var attribute_title = $(this).attr('data-title');

                $(this).removeClass('selected disabled');
                $(this).attr('aria-checked', 'false');

                // To Prevent blink
                if (selected.length < 1 && woo_variation_swatches_options.show_variation_label) {
                  $selected_variation_item.text('');
                }

                if (attribute_value === selected) {
                  $(this).addClass('selected');
                  $(this).attr('aria-checked', 'true');

                  if (woo_variation_swatches_options.show_variation_label) {
                    $selected_variation_item.text(woo_variation_swatches_options.variation_label_separator + ' ' + attribute_title);
                  }

                  if ($(this).hasClass('radio-variable-item')) {
                    $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false).prop('checked', true);
                  }
                }

                $(this).trigger('wvs-item-updated', [selected, attribute_value, _this]);
              });
            } else {

              li.each(function (index, el) {

                var attribute_value = $(this).attr('data-value');
                var attribute_title = $(this).attr('data-title');

                $(this).removeClass('selected disabled out-of-stock').addClass('disabled');
                $(this).attr('aria-checked', 'false');
                $(this).attr('tabindex', '-1');

                if ($(this).hasClass('radio-variable-item')) {
                  $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', true).prop('checked', false);
                }

                // if (_.contains(selects, value))
                // if (_.indexOf(selects, value) !== -1)
                // if (selects.includes(value))

                // We can't use es6 includes for IE11
                // in_stocks.includes(attribute_value)
                // _.contains(in_stocks, attribute_value)
                // _.includes(in_stocks, attribute_value)

                // Make Selected // selects.includes(attribute_value) // in_stocks
                if (_.includes(in_stocks, attribute_value)) {

                  $(this).removeClass('selected disabled');
                  $(this).removeAttr('aria-hidden');
                  $(this).attr('tabindex', '0');

                  $(this).find('input.wvs-radio-variable-item:radio').prop('disabled', false);

                  // To Prevent blink
                  if (selected.length < 1 && woo_variation_swatches_options.show_variation_label) {
                    $selected_variation_item.text('');
                  }

                  if (attribute_value === selected) {

                    $(this).addClass('selected');
                    $(this).attr('aria-checked', 'true');

                    if (woo_variation_swatches_options.show_variation_label) {
                      $selected_variation_item.text(woo_variation_swatches_options.variation_label_separator + ' ' + attribute_title);
                    }

                    if ($(this).hasClass('radio-variable-item')) {
                      $(this).find('input.wvs-radio-variable-item:radio').prop('checked', true);
                    }
                  }
                }

                // Out of Stock
                if (available.length > 0 && _.includes(out_of_stock_selects, attribute_value) && woo_variation_swatches_options.clickable_out_of_stock) {
                  $(this).removeClass('disabled').addClass('out-of-stock');
                }

                $(this).trigger('wvs-item-updated', [selected, attribute_value, _this]);
              });
            }

            // Items Updated
            $(this).trigger('wvs-items-updated');
          });
        });

        on_change();

    };

    var on_click_listener = function(type) {

        if(window.document.splugins.common._b(_this.binding_stats, 'on_click_listener', type)){
            return false;
        }

        here it seems that m have explicitly handled the click event, but we should do if it is by standard require and the legacy flows does need us to take care of it. so confirm first with the plugin we are exploring -- to h 
        $('.variable-item').on('click',function(){
            var target_selector = $('#'+$(this).data('id'));
            target_selector.val($(this).data('value'));
            $(this).parent().find('.selected').removeClass('selected');
            $(this).addClass('selected');
            jQuery(".variations_form" ).trigger('check_variations');
            $(target_selector).trigger('change');
        });

        jQuery(".variations_form").on('click', '.reset_variations'/*'woocommerce_variation_select_change'*//*'reset'*/,function(){
            jQuery('.variable-items-wrapper .selected').removeClass('selected');
            jQuery('.variable-items-wrapper .dropdown').dropdown('restore defaults');
        });


        // Trigger Select event based on list

        if (reselect_clear) {
        // Non Selected Item Should Select
        $(this).on(mouse_event_name, 'li:not(.selected):not(.radio-variable-item):not(.woo-variation-swatches-variable-item-more)', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var value = $(this).data('value');
          select.val(value).trigger('change');
          select.trigger('click');

          select.trigger('focusin');

          if (_this.is_mobile) {
            select.trigger('touchstart');
          }

          $(this).trigger('focus'); // Mobile tooltip
          $(this).trigger('wvs-selected-item', [value, select, _this.$element]); // Custom Event for li
        });

        // Selected Item Should Non Select
        $(this).on(mouse_event_name, 'li.selected:not(.radio-variable-item):not(.woo-variation-swatches-variable-item-more)', function (e) {
          e.preventDefault();
          e.stopPropagation();

          var value = $(this).val();

          select.val('').trigger('change');
          select.trigger('click');

          select.trigger('focusin');

          if (_this.is_mobile) {
            select.trigger('touchstart');
          }

          $(this).trigger('focus'); // Mobile tooltip

          $(this).trigger('wvs-unselected-item', [value, select, _this.$element]); // Custom Event for li
        });

        // RADIO

        // On Click trigger change event on Radio button
        $(this).on(mouse_event_name, 'input.wvs-radio-variable-item:radio', function (e) {

          e.stopPropagation();

          $(this).trigger('change.wvs', { radioChange: true });
        });

        $(this).on('change.wvs', 'input.wvs-radio-variable-item:radio', function (e, params) {

          e.preventDefault();
          e.stopPropagation();

          if (params && params.radioChange) {

            var value = $(this).val();
            var is_selected = $(this).parent('li.radio-variable-item').hasClass('selected');

            if (is_selected) {
              select.val('').trigger('change');
              $(this).parent('li.radio-variable-item').trigger('wvs-unselected-item', [value, select, _this.$element]); // Custom Event for li
            } else {
              select.val(value).trigger('change');
              $(this).parent('li.radio-variable-item').trigger('wvs-selected-item', [value, select, _this.$element]); // Custom Event for li
            }

            select.trigger('click');
            select.trigger('focusin');
            if (_this.is_mobile) {
              select.trigger('touchstart');
            }
          }
        });
        } else {

        $(this).on(mouse_event_name, 'li:not(.radio-variable-item):not(.woo-variation-swatches-variable-item-more)', function (event) {

          event.preventDefault();
          event.stopPropagation();

          var value = $(this).data('value');
          select.val(value).trigger('change');
          select.trigger('click');
          select.trigger('focusin');
          if (_this.is_mobile) {
            select.trigger('touchstart');
          }

          $(this).trigger('focus'); // Mobile tooltip

          $(this).trigger('wvs-selected-item', [value, select, _this._element]); // Custom Event for li
        });

        // Radio
        $(this).on('change.wvs', 'input.wvs-radio-variable-item:radio', function (event) {
          event.preventDefault();
          event.stopPropagation();

          var value = $(this).val();

          select.val(value).trigger('change');
          select.trigger('click');
          select.trigger('focusin');

          if (_this.is_mobile) {
            select.trigger('touchstart');
          }

          // Radio
          $(this).parent('li.radio-variable-item').removeClass('selected disabled').addClass('selected');
          $(this).parent('li.radio-variable-item').trigger('wvs-selected-item', [value, select, _this.$element]); // Custom Event for li
        });
        }

        on_click();

    };

    var on_keydown_listener = function(type) {

        if(window.document.splugins.common._b(_this.binding_stats, 'on_keydown_listener', type)){
            return false;
        }

        // Keyboard Access
        $(this).on('keydown.wvs', 'li:not(.disabled):not(.woo-variation-swatches-variable-item-more)', function (event) {
        });

        on_keydown();

    };


    var on_change = function(type) {

    };

    var on_click = function(type) {

    };

    var on_reset_all = function(type) {

    };

    // ACTIVE_TODO_OC_START
    // --  keyboard events 
    // ACTIVE_TODO_OC_END
    var on_keydown = function() {

        keydown();  
    };
            // ACTIVE_TODO_OC_START
            // --  legacy events (events of woo emitted on certain scenarios) 
            // --  events emitted by other plugins/themes which we need to take care of in case of compatiblity matters, so it can be termed as the compatiblity events 
            // ACTIVE_TODO_OC_END


    // -- base events - after the above events are handled by their particular function/layer, they would call below functions to do the ultimate work         
    var change = function() {

    };

    var click = function() {

    };

    var reset_all = function() {


    };

    var keydown = function() {

        if (event.keyCode && 32 === event.keyCode || event.key && ' ' === event.key || event.keyCode && 13 === event.keyCode || event.key && 'enter' === event.key.toLowerCase()) {
          event.preventDefault();
          $(this).trigger(mouse_event_name);
        }
    };


    var compatability = function() {

        // ACTIVE_TODO_OC_START
        // this compatiblity function flow will be as per the commets in the filter js file 
        // -   plugins/themes 
        // --  there will be list of compatiblity matters that need to be handled so it will go under the compatiblity matter, and clearly it will go in compatiblity layers 
        //     --  not related to this section but lets create simply a compatiblity module of its own like at the level where templating module is in namespace -- to d --    ACTIVE_TODO/TODO then each modules like filters, variations and so on can have their own module like ...filters.compatiblity just like there ...filters.core core module. but this is only if necessary, otherwise a function inside core module is much readability friendly. 
        //         --  a compatiblity function inside filters, variations.swatches and variations.gallery_images module -- to d  

        // and add all those theme and other patch that the other plugin we were exploring have. -- to d 
        //         --  but of course in our case it will be as per our flow of how we manage loading and then ajax loading of swatches options -- to h and -- to d 
        //     --  that other plugin have some more theme specific patch fix, and some other patch for managing unexpected effects like blink and so on -- to d    
        // ACTIVE_TODO_OC_END    

    }; 

    return {

        init: function() {

            window.document.splugins.variation.events.api.notifyAllObservers( 'variation', 'before_search' ); 
            
            init_private();

        },
        before_search: function() {

            window.document.splugins.variation.events.api.notifyAllObservers( 'variation', 'before_search' ); 
        }, 
        // createSubject: function( feature_unique_key, notifications ) {
        //     // console.log("Observer " + index + " is notified!");

        //     // TODO check if subject already created and exist then throw error
        //     // var index = this.observers.indexOf(observer);
        //     // if(index > -1) {
        //     // this.observers.splice(index, 1);
        //     // }

        //     this.subjects.push( window.document.splugins.Feed.events.subject( feature_unique_key, notifications ) );
        // }, 
        // subscribeObserver: function(feature_unique_key, callbacks) {
        //     // console.log("Observer " + index + " is notified!");

        //     // before subscribing the ovserver check if the feature_unique_key subject is created in the first place, if not then throw error 
        //     var found_index = null;
        //     for(var i = 0; i < this.subjects.length; i++){
        //         if( this.subjects[i].feature_unique_key() == feature_unique_key ) {

        //             found_index = i;
        //             break;
        //         }
        //     }

        //     if( found_index == -1 ) {

        //         throw "There is no subject exist for specified feature_unique_key "+feature_unique_key;
        //     } else {

        //         this.subjects[found_index].subscribeObserver( window.document.splugins.Feed.events.observer( callbacks ) );
        //     }
        // },
        no_products_found: function() {

            window.document.splugins.variation.events.api.notifyAllObservers( 'variation', 'no_products_found' );
        }, 

    }; 
};

//  publish it 
window.document.splugins.wbc.variations.swatches.api = window.document.splugins.wbc.variations.swatches.core( {}/*if required then the php layer configs can be set here by using the js vars defined from the php layer*/ );

// the variations gallery images js module
window.document.splugins.wbc.variations.gallery_images = window.document.splugins.wbc.variations.gallery_images || {};

window.document.splugins.wbc.variations.gallery_images.core = function( configs ) {

    var _this = this; 

    _this.configs = jQuery.extend({}, {}/*default configs*/, configs);  
    
    // this.subjects = [];

    var _this.data = {};
    var _this.binding_stats = {};

    ///////////// -- 15-06-2022 -- @drashti -- ///////////////////////////////
    var compatability = function(section, object, expected_result) {

        ////////////////////////////////////////////////////
        if(section == 'variations_gallery'){
            jQuery(function ($)
            {
                Promise.resolve().then(function () {
                  return _interopRequireWildcard(__webpack_require__("./src/js/WooVariationGallery.js"));
                }).then(function () {
                // For Single Product
                $('.woo-variation-gallery-wrapper:not(.wvg-loaded)').WooVariationGallery(); // Ajax and Variation Product

                    $(document).on('wc_variation_form', '.variations_form', function () {
                      $('.woo-variation-gallery-wrapper:not(.wvg-loaded)').WooVariationGallery();
                    }); // Support for Jetpack's Infinite Scroll,

                    $(document.body).on('post-load', function () {
                      $('.woo-variation-gallery-wrapper:not(.woo-variation-gallery-product-type-variable):not(.wvg-loaded)').WooVariationGallery();
                    }); // YITH Quickview

                    $(document).on('qv_loader_stop', function () {
                      $('.woo-variation-gallery-wrapper:not(.woo-variation-gallery-product-type-variable):not(.wvg-loaded)').WooVariationGallery();
                    }); // Elementor

                    if (window.elementorFrontend && window.elementorFrontend.hooks) {
                      elementorFrontend.hooks.addAction('frontend/element_ready/woocommerce-product-images.default', function ($scope) {
                        $('.woo-variation-gallery-wrapper:not(.wvg-loaded)').WooVariationGallery();
                      });
                    }
                });
            });

        }    

        /////////////////////////////////////////////////////        

    }
    ///////////////////////////////////////////////////////

    var init_private = function() {

        window.document.splugins.events.api.createSubject( 'gallery_images', ['process_images'] );

        preprocess();

        return _.debounce(function () {
          
            preprocess();   

            since we are going to provide the refresh api for external slider and zoom so similarly we should provide the init api function also, and it would most like be from here -- to h or -- to s. from here means after all the preprocess and everything else is covered. 

            have t research on the photo swipe events and effects management that we might need to do -- to t. explore the plugin we are exploring and confirm the events and effects management that we would like to do. 
          _this.initPhotoswipe();

            note that apart from above most important for us is to test extensively and that 10 demo and 5 slider zoom experiements must be covered in details, and we should research on what available on all community plugins and list out the set of things which we have issues, things that we would like to do and innovations that should be brought to community -- to t and -- to kk and -- to ks and -- to a 
        }, 500);
    }

    var legacyBinding? = function() {

        jQuery('#select_attribute_of_variation').on('woocommerce_variation_has_changed', function(){
            // do your magic here...
         }); 

    }

    var preprocess = function() {

        //
        //  data applicable loops 
        //
        // pre process data and process collections that would be necessary for neat and quick ops 
        preprocess_data( _this.data );   

        // ACTIVE_TODO_OC_START
        // do necessary bindings for the gallery images  
        //     --done  will need a dedicated function namely process_images -- to d 
        //         --  and since the actual images would be available only after the variation change event(and specifically the event binding and other stat should be set and maintained for currently active images of current variation only so it must be on variation change event, and in case of simple product types that will not be the cases) so the process_images function should be called on each such stat changes -- to d 
        //             --done  move entire section below inside that function -- to d 
        // ACTIVE_TODO_OC_END
        process_images();   

        //  template 
        _this.data.template_types.each( function( type ) {

            //  do necessary logic if support is available, if not for example custom_html then manage accordingly  
            if( type == 'default'/*means the default template provided by slider and zoom*/ || type == 'custom_html' ) 
                // ACTIVE_TODO_OC_START
                // in case of custom_html as long as the slider and zoom events are not emitted and they would not be since we would be doing our custom html, but if they are then need to cancel them using their apis (only) as mentioned in the events functions below 
                //     -- but one matter that we need to handle in detail is managing the slider thumb indexes which is providing anything custom like custom_html dom (like 360,  darker lighter, diamond meta and recently purchased) for their main image ares (which is also zoom area) 
                //         --  and mostly none of the slider or zoom plugin would be providing such complex apis and even if they do then not sure if all have those and even if they do then not sure if all have it mature 
                //             --  so one simple (but tricky, yeah it is trick and not standard) option is to simply hide the zoom area container and show the custom html. 
                //                 --  but since it is not standard we should find standard, or can use that trick since it is simple and also effective option especially because it is less likely for most slider and zoom to provide support
                //                     --  but if we are to use this trick then we need to bring it closer to standard implementation by ensuring the possible flows like always have our classes in zoom area container like sp-variations-zoom-container 
                // ACTIVE_TODO_OC_END                    
        }); 

        like in the swatches module we have the base_container_selector settings need to manage it here, to figure out the below _element -- to h 
        this.$wrapper = this._element.closest('.product');
        this.$variations_form = this.$wrapper.find('.variations_form');

              this.$attributeFields = this.$variations_form.find('.variations select');
              this.$target = this._element.parent();
              this.$slider = $('.woo-variation-gallery-slider', this._element);
              this.$thumbnail = $('.woo-variation-gallery-thumbnail-slider', this._element);
        this.product_id = this.$variations_form.data('product_id');
        this.is_variation_product = this.$variations_form.length > 0;

              this._element.addClass('wvg-loaded');

              this.defaultDimension();
              this.defaultGallery();

        --  in our flow the events and other functions heirarchy called from this preprocess is, for us the initEvents level of flow -- to h. just for the notes. 
            --  and then the init or refresh function of the external slider/zoom api that is to be called, after the dom updated with slider/zoom templates is what will cover the image loaded flow of plugin we are exploring. 
        this.initEvents();
              this.initVariationGallery();

        --  we need to call the update dom templates functions on page load when it is non variation product -- to h 
            --  while for variation products it will be called by woo legacy api when the variation change event does fire on page load, so nothing to do in that case 
                --  but yeah in either case after dom templates functions are done then need to call the required functions heirarchy which would cover something similar like what init set of functions doing in the plugin we were exploring -- to h. and so this function heirarchy calling would definitely include the call to init function of the js api for slider and zoom.  
                    --  so some set of functions heirarchy would not be called initially for variation products -- to h 
                        --  otherwise if required then we can simply call it during init and then it will be called again on woo legacy change event called during page load so in this case it would be called twice during page load -- to h 
                            --  so this in essense clears the loading stack quest and points mentioned/planned in the process_template function of this module -- to h. just for the notes. 
        if (!this.is_variation_product) {
        this.imagesLoaded();
        }

        if (this.is_variation_product) {
        this.initSlick();
        this.initZoom();
        this.initPhotoswipe();
        }

              this._element.data('woo_variation_gallery', this);

              $(document).trigger('woo_variation_gallery_init', [this]);

            _createClass(WooVariationGallery, [{

                even if the plugin we are exploring does doing it or not, we would like to do it most likely. and it seems related to resize events so might be connecting to the responsive ness matters, so have to confirm on that -- to t 
                    --  and then lets do it -- to h and -- to s 
              key: "defaultDimension",
              value: function defaultDimension() {
                var _this2 = this;

                // console.log(this._element.height(), this._element.width());
                this._element.css('min-height', this._element.height()).css('min-width', this._element.width());

                $(window).on('resize.wvg', _.debounce(function (event) {
                  if (event.originalEvent) {
                    _this2._element.css('min-height', _this2._element.height()).css('min-width', _this2._element.width());
                  }
                }, 300));
                $(window).on('resize.wvg', _.debounce(function (event) {
                  if (event.originalEvent) {
                    _this2._element.css('min-height', '').css('min-width', '');
                  }
                }, 100, {
                  'leading': true,
                  'trailing': false
                }));
              }
            }, {
              key: "initEvents",
              value: function initEvents() {
                var _this3 = this;

                this._element.on('woo_variation_gallery_image_loaded', this.init());
              }
            }, {
              key: "defaultGallery",
              value: function defaultGallery() {
                ACTIVE_TODO_OC_START
                we would not like to manage extra layer of ajax to get default gallery and so on, if it is not necessary by standard flow but if by any chance standard flows does require handling any exceptional scenarios then we would need to do it -- to h and -- to d 
                    --  here check if that wc ajax event is if invoked by the plugin we were exploring? it might not be but still confirm and in the first place check if the execution even reaching till ajax since it was not noticed in the browser console -- to h 
                ACTIVE_TODO_OC_END
            }, {
            }, {

            for below mattter also research on WooCommerce ajax variations with keywords WooCommerce ajax variations legacy -- to h 
            // For Single Product
            $('.woo-variation-gallery-wrapper:not(.wvg-loaded)').WooVariationGallery(); // Ajax and Variation Product

            $(document).on('wc_variation_form', '.variations_form', function () {
              $('.woo-variation-gallery-wrapper:not(.wvg-loaded)').WooVariationGallery();
            }); // Support for Jetpack's Infinite Scroll,
    ACTIVE_TODO_OC_START
            so a call from here to the compatability function of this module, and that will cover all compatability matters of load time inlcuding the promize resolve block of the plugin we were exploring. so call compatability with section=bootstrap -- to d 


        -   slider and zoom 
            --  it will mostly be matter of interest to the variations.gallery_images module but since it is vital for overall stability of functions and the overall experience that is why it is considered as a dedicated thing 
            --  its events -- it may directly or indirectly connect itself to the below events layer mentioned 
            --  events it listens to simply the events that it mandatorily expects and the events that is optional for it but accepts 
                --  based on these we can easily define what our hooks (php layer) and js api that we are to provide for slider and zoom would look like or how it will be composed 
            --  media 
                --  images 
                --  in addition to images other things that it may need to support are videos (would be covered by custom_html) and custom html 


    --  if our slider/zoom module is enabled then 
        --  simply listen legacy js layer events and on variation change etc. keep updating our dom 
    --  if our slide/zoom module is not enabled and we are binding to slider/zoom module of the user through the flows of theme adaption template file then 
        --  simply listen legacy js layer events and then do our applicable logic as well as call the slider/zoom module api that we are binding to 
    --  if none of the two above then 
        --  then listen to legacy js layer, do our logic and then publish events on our js layer 
            --  in this case sample applies for php layer as well as planned, means publishing the php events/data to the php hooks 
    --  if none of the three above then 
        --  then user would be using one of our recommend slider and zoom modules out of the 5 recommended plugins we planned to present 
            --  in this case it will be second if layer above so carry accoding to that layer flows 

    // -   events 
    //     NOTE: in below events, all those events which falls in category of listener events of the slider or zoom layers, should strictly depend on and use only the underlying slider and zoom js/jquery plugins api. if we make any compromise in that then by definition the functioning of the layers related to it will not be perfect and will not be stable and reliable. -- then these listener category events will call our standard events handler for example slider_thumb_click_listerner would click our on_slider_thumb_click event 
    // --  ACTIVE_TODO so all events of slider/zoom listeners category should be ported as js api through our standard api interface that is published for each js modules or by means of our events observer pattern interface or something best suitable and feasible. -- we need to do it only when we finally want to provide php
    //  hooks and js api for our users to use their own preferred slider and zoom plugin. so it will be as per the user demand or something such. 
    // --  mouse events 
        - listener events 
    ACTIVE_TODO_OC_END
}}}
    var preprocess_data = function() {

        ACTIVE_TODO not sure if this is necessary 
        this._generated = this.product_variations.reduce(function (obj, variation) {

          Object.keys(variation.attributes).map(function (attribute_name) {
            if (!obj[attribute_name]) {
              obj[attribute_name] = [];
            }

            if (variation.attributes[attribute_name]) {
              obj[attribute_name].push(variation.attributes[attribute_name]);
            }
          });

          return obj;
        }, {});

        ACTIVE_TODO but we will make use of it from beginning 
        this._out_of_stock = this.product_variations.reduce(function (obj, variation) {

          Object.keys(variation.attributes).map(function (attribute_name) {
            if (!obj[attribute_name]) {
              obj[attribute_name] = [];
            }

            if (variation.attributes[attribute_name] && !variation.is_in_stock) {
              obj[attribute_name].push(variation.attributes[attribute_name]);
            }
          });

          return obj;
        }, {});
    };

    var process_images = function() {

        //  process images
        _this.data.images.each( function( image ) {
            // ACTIVE_TODO_OC_START
            // --  the key controller here in case of gallery_images module, for defining the calling sequences and flow will be, the image index(even though we had plan to use index but that is only when it is must to use that), otherwise there should be gallery_item_type field that take care implicitly the things like custom_html images for zoom area and so on 
            //         --  so should we plan gallery_item_type field support? maybe it is good idea, to have such field support right from the config file function planned for each extensions, while for wbc gallery items like image and videos it will be gallery_item_type=image or video. -- to h 
            // --  so above preprocess_data call should simply prepare two attribute types list, first is attribute_types and second is ... or simply one only. and simply delegate everything else that is not coming under attribute_types, to the extensions layers. and should simply publish this list of attribute_types from backend. 
            // NOTE: and one of the key benefit of this approach is that these layers will emit the broadcast notification event only if they detect the type to be the premiumly supported type and otherwise not. which would minimize process and little or not hanging processes and less debug console logs that would appear around. 

            // is the woo input template type means dropdown is mandatorily kept by plugins, not seems likely but still confirm and then we need a way to determine(always) the exact input type based on the field/input type selected on woo panel or otherwise simply support the input_template_type field which will be set in background implicitly based on the field/input type selected on woo panel -- this field is simply better then managing many different template names of extensions and defining based on that -- and it will default to the above field/input type for wbc nothing to manage, only if condition below that if input_template_type is not defined then read simply above field/input type. and in case of extensions that need to be defined based on the template that is selected on their admin panel. so this template option should be only be defining it and passing it where applicable so that is gets here. and it is need to be defined based on that only to avoid confusion and many unnecessary and confusing configuration overheads. no simply need to stick to attribute type only means field/input-type selected on woo panel and that is standard and clean. so implement here based on that only. -- to h or -- to d 
            // ACTIVE_TODO_OC_END

            if( type == '?' )
            // ACTIVE_TODO_OC_START   
            //  do necessary logic if support is available
            //     --  that means based on type call/process necessary functions/layers for example events functions(some events functions already defined below), template functions/layers, pages functions/layers, like events the effects functions/layers, plugins/themes applicable compatiblity function calls, slider and zoom functions/layers(note that even for swatches modules there might be some conditions or conditional logics that would be required) -- to d 
            //     --  and also do call/process necessary functions/layers for the provided device type(and maybe some of their specifications would also need to be handled in future like width(which would otherwise mostly be dynamically handled), resolution and so on ACTIVE_TODO) and configs, but it will be a specific block here only and the dedicated function for them sound unnecessary -- to d
            //         --  and we need some logic of if function or layer need to be called once only then take care of that, for all above functions, including the devices and configs that are to be handled from here -- to d 
            //         --  and as usual there will going to be if conditions for applicable matters in applicable functions and their layers defined above, to handle the devices and configuration specific matters. and so the dedicated blocks of devices and configs will handle some specific matters which do not necessarily mixed with other things mentioned above like events, template, pages and so on layers. -- to h    
            // ACTIVE_TODO_OC_END                    

                    process_template(type);

                    process_pages(type);
                    
                    process_slider_and_zoom(type);
                    
                    process_events(type);

                    process_and_manage_effects(type);

                    process_compatability_matters(type);

                // ACTIVE_TODO_OC_START    
                // -   devices 
                //         --  for layers which need to have complete different implementation for mobile etc. then for them applicable flgas should be set/initiated from the higher layers layers for example the slider and zoom would be completely different plugin for mobile devices -- but anyway now we will see to it again to reconsider using the new slider also for mobile but only if that is beneficial in terms of setup time and maintainance time, for the later it would be beneficial but not sure about the initial setup and implementation time and challanges that may arise. 
                //             --  and we would like to reconsider the zoom also in the same way like above 
                //     --  browser - will matter so much 
                //     --  screen size - need to handle occasionally only as long as overall UI/UX layers are mature 
                //     --  os 
                // ACTIVE_TODO_OC_END
                    
                    if(window.document.splugins.common.is_mobile){

                    }else if(window.document.splugins.common.is_tablet){

                    }else if(browser){

                    }else if(screen size){

                    }else if(os){

                    };
                // ACTIVE_TODO_OC_START    
                // -   configs 
                //     --  will control decision of whether to display certain section or not, for example whether to display template part of attribute name (for us ribbon wrapper)
                //     --  or whether to show tooltip or not 
                // ACTIVE_TODO_OC_END    
                    if( type == 'radio' ) 

            else if( not for example slider input is not supported then host the listener event so that extension js do its job or simply skip it and let extension js do their part )
            //     ACTIVE_TODO_OC_START
            //     --  and we can and should simply use observer pattern events to host for example the slider listener here and then emit internal change event from here     
            //         --  still in this case the variation.swatches will register its event subject and emit bootstrap level notification like bootstrap/on.load maybe on.load is more user friendly 
            //         --  then at that time applicable extension will bootstrap the js layer 
            //         --  and when the change event occurs the applicable extension will simply call the ...swatches.api function to notify back about their change event or the events module can add support to provide callbacks to subscriber so that they can reply with something when they have done something based on notification. so it can be called the notification_response. -- but it will be about breaking our own rule of keeping the events simple. so even if we must do then in that case it must be till notification_response only and no further callback back and forth can be supported. otherwise it mostly lead to long debug sequences. --  however it has benefit of less maintainance since otherwise extensions need to know about the ...swatches.api but in case of events support of notification_response it only need to learn about and depend on the variations.swatches subject of events module. and as long as we can keep it limited to notification_response only and do not extend it further it will be clean to be frank. 


            //         --  and we are planning to host darker/lighter slider support also from here as usual so it will be just like above slider example 
            //             --  but yeah after the change event is recieved here that will be emitted to the gallery_images module to let them do their job. since darker lighter is not part of the variation there is no further thing to do from here after the change event is recieved. 
            //                 --  and since it is different kind processing that is required after change event so the input_template_type must be defined uniquely like slider_no_variation 
            //                     NOTE: and yeah on that note everything of the sp_variations module must be dynamic and nothing should be hardcoded so slider_no_variation input template type must be passed right from where the template is defined on admin to till here

            var callback = null ;
            window.document.splugins.events.api.notifyAllObservers( 'gallery_images', 'process_images', type, callback );

            // --  it wil be a specific block here for devices and configs -- to d done
            // --  while for the rest create dedicated functions like process_template, process_events and so on. for the layers listed below. 
            //     --  create below list of functions after the process_attribute_types function, and apply above peudo flows there and rest of the flows those functions should adapt from the flow notes from the heirachical flow plan at top -- to d and -- to h done
            //         --done process_template -- to d
            //         --done process_pages -- to d
            //         --done process_slider_and_zoom -- to d
            //         --done process_events -- to d
            //         --done process_and_manage_effects -- to d
            //         --done process_compatability_matters -- to d
            //     ACTIVE_TODO_OC_END
        }); 

    }

    var process_template = function() {
        // ACTIVE_TODO_OC_START
        // --  or whether to show tooltip or not 
        // ACTIVE_TODO_OC_END            
        if( type == 'radio' ) 

        note that we may like to create some dedicated functions for updating the actual templates in dom, since this process_template function is broad layer for handling all template related -- to h 
            --  and should we update templates on the init_private means page load event also, I think we should only if it is required by community standards. and since it would help in avoiding load time hangs to we must confirm with legacy standards and the plugin we were is doing -- to h 
                --  and once the dom updated of the slider and zoom area the we would like to call many functions or simply can call the init layers functions like preprocess is kind of init level of function -- to h 
                          key: "galleryInit",
              value: function galleryInit(images) {
                var _this11 = this;

                var hasGallery = images.length > 1;

                this._element.trigger('before_woo_variation_gallery_init', [this, images]);

                this.destroySlick();
                var slider_inner_html = images.map(function (image) {
                  var template = wp.template('woo-variation-gallery-slider-template');
                  return template(image);
                }).join('');
                var thumbnail_inner_html = images.map(function (image) {
                  var template = wp.template('woo-variation-gallery-thumbnail-template');
                  return template(image);
                }).join('');

                if (hasGallery) {
                  this.$target.addClass('woo-variation-gallery-has-product-thumbnail');
                } else {
                  this.$target.removeClass('woo-variation-gallery-has-product-thumbnail');
                }

                this.$slider.html(slider_inner_html);

                if (hasGallery) {
                  this.$thumbnail.html(thumbnail_inner_html);
                } else {
                  this.$thumbnail.html('');
                } //this._element.trigger('woo_variation_gallery_init', [this, images]);


                _.delay(function () {
                  _this11.imagesLoaded();
                }, 1); //this._element.trigger('after_woo_variation_gallery_init', [this, images]);

              }

    }

    var process_pages = function() {

        if(window.document.splugins.common.is_category_page){

        }else if(window.document.splugins.common.is_item_page){

        };

    }

    var process_slider_and_zoom = function() {

    }

    var process_events = function() {

        slider_thumb_click_listener();

        zoom_area_hover_listener();

    }

    var process_and_manage_effects = function() {

    }

    var process_compatability_matters = function() {

        if(type == 'image'){

            compatability("image_section");

        }else if(type == 'video'){

            compatability("video_section");

        }; 

    }


    var slider_thumb_click_listener = function(type) {

        if(window.document.splugins.common._b(_this.binding_stats, 'slider_thumb_click_listener', type)){
            return false;
        }

        on_slider_thumb_click();

    };

    var zoom_area_hover_listener = function() {

        if(window.document.splugins.common._b(_this.binding_stats, 'zoom_area_hover_listener', type)){
            return false;
        }

        on_zoom_area_hover();

    };

    var on_slider_thumb_click = function() {

        --  among other things the fundamental things to do are changing zoom are active image, we would be doing it like hiding all the templates within the zoom area container first and the showing the current index template -- to h 
            --  very first do it basically by hiding maybe all nodes within the main zoom container class and then just show the node/element at index which need to be shows -- to h. since we need to start testing 1st revision asap so lets do this asap. 
                --  then eventually we may like to maintain based on the image template class(so hook would be required for it) and index, or just based on index. to ensure that maximum adaptability is ensured for external slider and zoom and even if within the main zoom area container the dom has complex structure then also things work fine, and it is like that slider/zoom plugins would have complex dom. -- to h 

        --  what could be other things that we need to do or would like to cover? 
            --  we need to stop the video of the current index(means the index which was already set before click) is actually gallery_item_type=video -- to h 
            --  and of course if clicked thumb represents the gallery_item_type=video(note that gallery_item_type video would be providing the base video support means mp4 videos while for the other formats inlcuding 360 will have other premium types support) then call the play_video function(so there will be play_video and pause_video functions) but however the play_video may have nothing since by default we are implementing auto play support for the videos -- to h 
                --  ACTIVE_TODO so on this regard very soon on admin we may like to provide setting to disable preload and/or auto play support for the videos -- to h 
            --  and of course other are covering the points mentioned in main flow above related to events, templates, compatability and so on as applicable if there are any there or anywhere else -- to h 
                --  and yeah need to make sure that if any additional notification is required then that is emitted from here, or if any extensions need to respond on notification_response callback then that is implemented -- to h 
            --  and zoom refresh seems to be needed to be called on each on_slider_thumb_click event, so just call that refresh event of the js api -- to h 
                --  but yeah if the clicked gallery_item_type of the slider thumb is not image then skip above call -- to h 
    };

    var on_zoom_area_hover = function() {
        // ACTIVE_TODO_OC_START
        // for certain images or custom html we may need to cancel the zoom event, but I think for extensions like darker lighter, diamond meta, recently purchase which have the custom html requirement then that will not emit the zoom hover event since they would not be on the standard zoom container. -- and even in case when images have such requirement fr any feature or flows then in that case we can simply skip using the standard zoom container for displaying image in the zoom area 
        // ACTIVE_TODO_OC_END    
    };


    var on_variation_change = function() {

        //  here it will be recieved by the parent layers, and the parent layer would be bootstrap or dedicated function maybe namely subscribe_to_events which will subscrive to the swatches subject of the ...variations.swatches module for the variation change event 


        //  from here call the internal base event handler of this event which is variation_change 
        variation_change(); 
    };

    var on_custom_input_change = function() {

        // ACTIVE_TODO_OC_START
        // //  custom input change is not necessarily for the custom html only, it can be for standard gallery operations also. for example some free or premium widget maybe providing different kind of interface to interact with slider or zoom layers for example diamond meta may have link or button anywhere on surrounding area which would lead to displaying custom html of diamond meta in zoom area, so as per standard flow it should invoke its related thumb click in background which would ultimately lead to displaying of the custom html in zoom area. so check if that is the case then trigger the on_click event or change event from here means call those functions. 


        // //  if the it is for the custom html then do accordingly 
        //     note that it is still not clear if the custom html is approached directly from here for their change event or rather a notification will be broadcasted on which the particular extension do some action and then respond back if it is applicable. here in this case the responding back would be based on how we decide to do it for slider handling in above swatches module. 
        // ACTIVE_TODO_OC_END    
    };


    var variation_change = function() {

        for gallery_images it is not only the variation_change event but below list of events that also need to be listened to, so implement them -- to h 
            --  show_variation
            --  hide_variation
            --  click on .reset_variations
        --  and one strange matter is that there is not seem to be the variation_change event in the plugn we were exploring, but double check and it is likely be there -- to h. so either way need to implement all above events including variation_change since we may have had it and it make no sense to skip that. 
            --  and on this regard better to create functions like init_gallery, init_variation_gallery and maybe also default_gallery and default_variation_gallery as this would create proper heirarchy like in the plugin we were exploring -- to h 
            --  it is confirmed that there is no dependancy on the variations change function in the plugin we were exploring, however it still makes sense to use that only. but in the first place confirm if above show_variation and hide_variation events are actually available, and if they are available then decide which we should use. see we can use all of them but that can create mess if not always then in certain scenarios so to ensure neat execution lets just do the best suitable only -- to h 

        //  here it will call the internal function swap_images( variation_id ) which will be doing one of the main process of this gallery_images module 
            --  here the function should be named something like show_gallery_images, which would simply show initially or update and after that show, and also there would be show_variation_gallery_images which would be doing the same but for variation gallery images -- to h 
                --  and both above function from inside call the process_template heirarchy of function like process_gallery_images_template -- to h 
        swap_images( variation_id );    
    };

    // ACTIVE_TODO_OC_START    
    // --  keyboard events 
    // ACTIVE_TODO_OC_END

    var on_keyup or down ? = function() {


    };
            // ACTIVE_TODO_OC_START
            // --  legacy events (events of woo emitted on certain scenarios) 
            // --  events emitted by other plugins/themes which we need to take care of in case of compatiblity matters, so it can be termed as the compatiblity events 
            // ACTIVE_TODO_OC_END

    // -- base events - after the above events are handled by their particular function/layer, they would call below functions to do the ultimate work         
    var change = function() {


    };

    // ACTIVE_TODO_OC_START
    // -   effects and managing after effects 
    //         --  may need to provide some effects but only where and if necessary, the majority of effects will be provided by the slider and zoom js/jQuery plugin 
    //         --  will need to manage the after effects very precisely, to ensure smooth and non cluttering experience 
    //             --  it may or likely include managing the loading, swaping and updating of images 
    // ACTIVE_TODO_OC_END

    return {

        init: function() {

            window.document.splugins.variation.events.api.notifyAllObservers( 'variation', 'before_search' ); 

            init_private();
        },
        before_search: function() {

            window.document.splugins.variation.events.api.notifyAllObservers( 'variation', 'before_search' ); 
        }, 
        // createSubject: function( feature_unique_key, notifications ) {
        //     // console.log("Observer " + index + " is notified!");

        //     // TODO check if subject already created and exist then throw error
        //     // var index = this.observers.indexOf(observer);
        //     // if(index > -1) {
        //     // this.observers.splice(index, 1);
        //     // }

        //     this.subjects.push( window.document.splugins.Feed.events.subject( feature_unique_key, notifications ) );
        // }, 
        // subscribeObserver: function(feature_unique_key, callbacks) {
        //     // console.log("Observer " + index + " is notified!");

        //     // before subscribing the ovserver check if the feature_unique_key subject is created in the first place, if not then throw error 
        //     var found_index = null;
        //     for(var i = 0; i < this.subjects.length; i++){
        //         if( this.subjects[i].feature_unique_key() == feature_unique_key ) {

        //             found_index = i;
        //             break;
        //         }
        //     }

        //     if( found_index == -1 ) {

        //         throw "There is no subject exist for specified feature_unique_key "+feature_unique_key;
        //     } else {

        //         this.subjects[found_index].subscribeObserver( window.document.splugins.Feed.events.observer( callbacks ) );
        //     }
        // },
        no_products_found: function() {

            window.document.splugins.variation.events.api.notifyAllObservers( 'variation', 'no_products_found' );
        }, 

    }; 
};

//  publish it 
window.document.splugins.wbc.variations.gallery_images.api = window.document.splugins.wbc.variations.gallery_images.core( {}/*if required then the php layer configs can be set here by using the js vars defined from the php layer*/ );

// ACTIVE_TODO_OC_START
// put ACTIVE_TODO_OC_START and ACTIVE_TODO_OC_END around each open comments section, and then comment them -- to d 
//     --  and need to do the same for filter js and ssm variations class file -- to d 
// ACTIVE_TODO_OC_END  