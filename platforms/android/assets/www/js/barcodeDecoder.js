var resultDiv;
var resultUrl;
var resultName;
var resultLat;
var resultLon;
var resultAddress;
var StoreViewModel = StoreViewModel;

document.addEventListener("deviceready", init, false);
function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	resultDiv = document.querySelector("#results");
  resultUrl = document.querySelector("#url");
  resultName = document.querySelector("#name");
  resultLat = document.querySelector("#lat");
  resultLon = document.querySelector("#lon");
  resultAddress = document.querySelector("#address");
}

function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
      resultUrl.value=result.text;
      StoreViewModel.getStoreById(result.text);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
