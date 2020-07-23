<?php 

class sunob_a_a_settingsAndStatusCest extends n_f_adminSideSetupCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    // // tests
    // public function tryToTest(AcceptanceTester $I)
    // {
    // }

    public function enablingBonusFeaturePriceControl(AcceptanceTester $I) {

		if( !$I->test_allowed_in_this_environment("sunob_a_") ) {
            return;
        }

		$this->enablingBonusFeature($I, 'price_control', 'eowbc-price-control', 'Set pricing method to update price in bulk');

		// TODO do other additional testing and verification here 

	}

	public function enablingBonusFeatureOptionsUI(AcceptanceTester $I) {

		if( !$I->test_allowed_in_this_environment("sunob_a_") ) {
            return;
        }

        $this->enablingBonusFeature($I, '', '', '');

		// TODO do other additional testing and verification here 

	}

	public function enablingBonusFeatureSpecificationView(AcceptanceTester $I) {

		if( !$I->test_allowed_in_this_environment("sunob_a_") ) {
            return;
        }

        $this->enablingBonusFeature($I, '', '', '');

		// TODO do other additional testing and verification here 

	}

	public function enablingBonusFeatureShortcodeFilters(AcceptanceTester $I) {

		if( !$I->test_allowed_in_this_environment("sunob_a_") ) {
            return;
        }

        $this->enablingBonusFeature($I, '', '', '');

		// TODO do other additional testing and verification here 

	}

	public function enablingBonusFeatureShopCategoryPageFilters(AcceptanceTester $I) {

		if( !$I->test_allowed_in_this_environment("sunob_a_") ) {
            return;
        }

        $this->enablingBonusFeature($I, '', '', '');

		// TODO do other additional testing and verification here 

	}	

}
