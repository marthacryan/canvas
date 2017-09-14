/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/


module.exports = function() {

	/* global browser */

	this.Then("I click zoom in", function() {
		var zoomIn = browser.$(".canvas-zoom-controls").$$("div")[0].$("img");
		zoomIn.click();
	});

	this.Then("I click zoom out", function() {
		var zoomOut = browser.$(".canvas-zoom-controls").$$("div")[1].$("img");
		zoomOut.click();
	});


	this.Then(/^I verify zoom transform value is "([^"]*)"$/, function(givenZoomTransform) {
		var actualZoomTransform = browser.$(".svg-area").$$("g")[0].getAttribute("transform");
		expect(actualZoomTransform).toEqual(givenZoomTransform);
	});

};