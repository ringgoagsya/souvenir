
<?php
// Load the Google API PHP Client Library.
require_once __DIR__ . '/vendor/autoload.php';

class GA{
	function initializeAnalytics()
	{
	  // Creates and returns the Analytics Reporting service object.

	  // Use the developers console and download your service account
	  // credentials in JSON format. Place them in this directory or
	  // change the key file location if necessary.
	  $KEY_FILE_LOCATION = __DIR__ . '/arched-album-292714-5d7b06b85dfc.json';

	  // Create and configure a new client object.
	  $client = new Google_Client();
	  $client->setApplicationName("Project");
	  $client->setAuthConfig($KEY_FILE_LOCATION);
	  $client->setScopes('https://www.googleapis.com/auth/analytics.readonly');
	  $analytics = new Google_Service_Analytics($client);

	  return $analytics;
	}

	function getFirstProfileId($analytics) {
	  // Get the user's first view (profile) ID.

	  // Get the list of accounts for the authorized user.
	  $accounts = $analytics->management_accounts->listManagementAccounts();

	  if (count($accounts->getItems()) > 0) {
		$items = $accounts->getItems();
		$firstAccountId = $items[0]->getId();

		// Get the list of properties for the authorized user.
		$properties = $analytics->management_webproperties
			->listManagementWebproperties($firstAccountId);

		if (count($properties->getItems()) > 0) {
		  $items = $properties->getItems();
		  $firstPropertyId = $items[0]->getId();

		  // Get the list of views (profiles) for the authorized user.
		  $profiles = $analytics->management_profiles
			  ->listManagementProfiles($firstAccountId, $firstPropertyId);

		  if (count($profiles->getItems()) > 0) {
			$items = $profiles->getItems();

			// Return the first view (profile) ID.
			return $items[0]->getId();

		  } else {
			throw new Exception('No views (profiles) found for this user.');
		  }
		} else {
		  throw new Exception('No properties found for this user.');
		}
	  } else {
		throw new Exception('No accounts found for this user.');
	  }
	}
	function OrganicTraffic(){
		$analytics = $this->initializeAnalytics();
		$profileId = $this->getFirstProfileId($analytics);
		$start_date = '2020-10-15';
		$end_date ='2020-10-30';

		$Params= array(
			'dimensions' =>'ga:operatingSystem','ga:operatingSystemVersion','ga:browser','ga:browserVersion',
			'filters'=>'ga:medium==organic',
			'metrics' =>'ga:sessions' );
		return $analytics-> data_ga->get(
			'ga:'.$profileId,
			$start_date,
			$end_date,
			'ga:sessions',
			$Params);
	}
	
	function OrganicResults($analytics, $profileId, $start_date, $end_date) {
	  // Calls the Core Reporting API and queries for the number of sessions
	  // for the last seven days.
	$optParams = array( //OPTINAL SETTINGS
	'dimensions' =>'ga:browser',
	'filters'=>'ga:medium==organic',
	'metrics'=>'ga:sessions'
			  );
	   return $analytics->data_ga->get(
		   'ga:' . $profileId,
		   $start_date,
		   $end_date,
		   'ga:sessions',
		   $optParams
		   );
	}
	
	function printResults($analytics, $profileId) {
	 return $analytics->data_ga->get(
       'ga:' . $profileId,
       '7daysAgo',
       'today',
       'ga:sessions');
	 }
	

	function pengunjung(){
		$analytics = $this->initializeAnalytics();
		$profile = $this->getFirstProfileId($analytics);
		$organic = array();
		
		for ($j = 5; $j >= 0; $j--){
			$start_date = date('Y-m', strtotime("-$j month")) . '-01';
			$d = new DateTime($start_date);
			$end_date = $d->format('Y-m-t');
			$organic[$j] = $this->OrganicResults($analytics, $profile, $start_date, $end_date);
			
		}
		$this->pengunjung($organic);
			
	}
}
		$GA = new GA;
		echo" Total OrganicTraffic Visitor is ";
 		$GA -> pengunjung();

?>
!<!DOCTYPE html>
<html>
<head>

  <title></title>
</head>
<body>
  <p></p>
<a class="active" href=".././">
                          <i class="fa fa-hand-o-left"></i>
                          <span>Back To Souvenir Bukittinggi</span>
                      </a>
</body>
</html>