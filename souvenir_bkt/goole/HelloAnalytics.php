

<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<br><br>
<div class="container-fluid well span6">
  <div class="row-fluid">
        <div class="span2" >
        <img src="../assets/img/jam.jpg" class="img-circle" width="150" height="120">
        </div>
        
        <div class="span8">
            <h3>Google Analytics</h3>
            <h6>http://souvenirringgo.infinityfreeapp.com/</h6>
            <h6></h6>
            <h6>Data :</h6>
            <h6></h6>
            <?php

// Load the Google API PHP Client Library.
require_once __DIR__ . '/vendor/autoload.php';

$analytics = initializeAnalytics();
$profile = getFirstProfileId($analytics);
$results = getResults($analytics, $profile);
printResults($results);

function initializeAnalytics()
{
  // Creates and returns the Analytics Reporting service object.

  // Use the developers console and download your service account
  // credentials in JSON format. Place them in this directory or
  // change the key file location if necessary.
  $KEY_FILE_LOCATION = __DIR__ . '/arched-album-292714-5d7b06b85dfc.json';

  // Create and configure a new client object.
  $client = new Google_Client();
  $client->setApplicationName("Hello Analytics Reporting");
  $client->setAuthConfig($KEY_FILE_LOCATION);
  $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
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

function getResults($analytics, $profileId) {
  // Calls the Core Reporting API and queries for the number of sessions
  // for the last seven days.
   return $analytics->data_ga->get(
       'ga:' . $profileId,
       '7daysAgo',
       'today',
       'ga:sessions,ga:pageviews');
}

function printResults($results) {
  // Parses the response from the Core Reporting API and prints
  // the profile name and total sessions.
  if (count($results->getRows()) > 0) {

    // Get the profile name.
    $profileName = $results->getProfileInfo()->getProfileName();

    // Get the entry for the first entry in the first row.
    $rows = $results->getRows();
    $sessions = $rows[0][1];

    // Print the results.
    
    print "Total pageviews is : $sessions\n";
  } else {
    print "No results found.\n";
  }
}?>
        </div>
        
        <div class="span2">
            <div class="btn-btn">
                <a role='button' class="btn btn succes fa fa-hand-o-left"  href="../index.php">
                    Back
                    
                </a>
            </div>
        </div>
</div>
</div>

