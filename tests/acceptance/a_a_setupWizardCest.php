<?php 

class a_a_setupWizardCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    // // tests
    // public function tryToTest(AcceptanceTester $I)
    // {
    // }

    public function step1(AcceptanceTester $I) {

		//login to admin panel, should save and maintain cookies so that do not need to login on all admin test. but yeah however during the front end test should flush the admin cookie first.  
		$I->loginAsAdmin();
		$I->see( 'Dashboard' );

		// go to the page
		$I->amOnPage('/wp-admin/admin.php?page=eowbc&wbc_setup=1');
		$I->see('Choose inventory');

		// select inventory
		$I->executeJS("jQuery('#eo_wbc_inventory_type_dropdown_div').dropdown('set selected', 'jewelry');");	//better than setting val directly is to select the nth element that has value val 

		// save 
		$I->click('Submit');

		// confirm if saved properly or not
		$I->see('Ring Builder');	//if we see Ring Builder on next step than it's properly saved
	}

	public function step2(AcceptanceTester $I) {

		//login to admin panel, should save and maintain cookies so that do not need to login on all admin test. but yeah however during the front end test should flush the admin cookie first.  
		$I->loginAsAdmin();
		$I->see( 'Dashboard' );

		// go to the page
		$I->amOnPage('/wp-admin/admin.php?page=eowbc&wbc_setup=1');
		$I->see('Choose inventory');

		// select inventory. TODO here there is a bug if inventory is saved than it should repopulate here, so remove this step once the bug is fixed
		$I->executeJS("jQuery('#eo_wbc_inventory_type_dropdown_div').dropdown('set selected', 'jewelry');");	//better than setting val directly is to select the nth element that has value val 

		// continue to next step  
		$I->click('Submit');
		$I->see('Choose features');	

		// select features
		$I->executeJS("jQuery('#ring_builder').checkbox('set checked');");	

		// save 
		$I->click('Submit');

		// confirm if saved properly or not
		$I->click('Back');
		$I->see('Ring Builder');	//TODO here should actually confirm is the switch is on, do it by fetching javascript value and comparing it but it will required javascript See etc function. 
	}

	public function step3(AcceptanceTester $I) {

		//login to admin panel, should save and maintain cookies so that do not need to login on all admin test. but yeah however during the front end test should flush the admin cookie first.  
		$I->loginAsAdmin();
		$I->see( 'Dashboard' );

		// go to the page
		$I->amOnPage('/wp-admin/admin.php?page=eowbc&wbc_setup=1');
		$I->see('Choose inventory');

		// select inventory. TODO here there is a bug if inventory is saved than it should repopulate here, so remove this step once the bug is fixed
		$I->executeJS("jQuery('#eo_wbc_inventory_type_dropdown_div').dropdown('set selected', 'jewelry');");	//better than setting val directly is to select the nth element that has value val 

		// continue to next step  
		$I->click('Submit');
		$I->see('Choose features');	

		// select features. TODO here there is a bug if feature is saved than it should repopulate here, so remove this step once the bug is fixed
		$I->executeJS("jQuery('#ring_builder').checkbox('set checked');");	

		// continue to next step 
		$I->click('Submit');
		$I->see('Skip and finish');	

		// click sample data action. however, the sample data option should be used and tested from sample data's own test class here we just go to sample data page and see if its loaded or not
		$I->click('Add sample and Finish');
		$I->click('You are at step 1 of 3 steps.');

		//go back to the page
		$I->moveBack();

		// now skip sample data and finish.
		$I->click('Skip and finish');

		// confirm if saved properly or not
		$I->see("Product bundling based on user's choice.");	
	}

}
