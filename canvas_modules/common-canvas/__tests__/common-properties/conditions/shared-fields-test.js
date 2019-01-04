/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import propertyUtils from "../../_utils_/property-utils";
import { expect } from "chai";
import sharedFieldsParamDef from "../../test_resources/paramDefs/sharedFields_paramDef.json";


describe("Condition dmSharedFields test cases", () => {
	let wrapper;
	// let controller;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(sharedFieldsParamDef);
		wrapper = renderedObject.wrapper;
		// controller = renderedObject.controller;
	});
	afterEach(() => {
		wrapper.unmount();
	});


	it("Test the available fields.", () => {
		// Validate the available fields in the selectColumns control
		let fieldPicker = propertyUtils.openFieldPicker(wrapper, "properties-ft-input_fields");
		propertyUtils.fieldPicker(fieldPicker, [], ["Age", "BP", "Cholesterol"]);

		// Validate the available fields in the table control
		const summaryPanel = propertyUtils.openSummaryPanel(wrapper, "structuretable_filter-summary-panel");
		fieldPicker = propertyUtils.openFieldPicker(wrapper, "properties-ft-structuretable_filter");
		const tableRows = fieldPicker.find("tr.properties-fp-data-rows");
		expect(tableRows).to.have.length(3); // Other fields should be filtered out
		// close summary panel
		summaryPanel.find("button.properties-apply-button").simulate("click");

		// Check the available fields in the weight dropdown
		const weightDropDown = wrapper.find("div[data-id='properties-regression_weight_field'] DropdownV2");
		let options = weightDropDown.prop("items"); // by Type
		let expectedOptions = [
			{ label: "...", value: "" },
			{ label: "K", value: "K" },
			{ label: "BP", value: "BP" }
		];
		expect(options).to.eql(expectedOptions);

		// Check the available fields in the offset dropdown
		const offsetDropDown = wrapper.find("div[data-id='properties-offset_field'] DropdownV2");
		options = offsetDropDown.prop("items"); // by Type
		expectedOptions = [
			{ label: "...", value: "" },
			{ label: "Na", value: "Na" }
		];
		expect(options).to.eql(expectedOptions);
	});

	it("Test allow a change to a field to filter another field's choices.", () => {
		// Select another field in the selectColumns control
		const fieldPicker = propertyUtils.openFieldPicker(wrapper, "properties-ft-input_fields");
		propertyUtils.fieldPicker(fieldPicker, ["Age", "BP", "Cholesterol"], ["Age", "BP", "Cholesterol"]);

		const weightDropDown = wrapper.find("div[data-id='properties-regression_weight_field'] DropdownV2");
		const options = weightDropDown.prop("items"); // by Type
		const expectedOptions = [
			{ label: "...", value: "" },
			{ label: "K", value: "K" }
		];
		expect(options).to.eql(expectedOptions);
	});

	it("Shares fields between dmSharedFields and columnSelection panel", () => {
		// Validate the available fields in the selectColumns control
		const fieldPicker = propertyUtils.openFieldPicker(wrapper, "properties-column_selection_fields");
		propertyUtils.fieldPicker(fieldPicker, [], ["Age", "Sex", "BP", "Na", "K", "Drug"]);

		// Check the available fields in the single chooser dropdown
		const weightDropDown = wrapper.find("div[data-id='properties-column_selection_chooser'] DropdownV2");
		let options = weightDropDown.prop("items"); // by Type
		let expectedOptions = [
			{ label: "...", value: "" },
			{ label: "Sex", value: "Sex" },
			{ label: "Cholesterol", value: "Cholesterol" },
			{ label: "Na", value: "Na" },
			{ label: "K", value: "K" },
			{ label: "Drug", value: "Drug" }
		];
		expect(options).to.eql(expectedOptions);

		// Check the available fields in the offset dropdown
		const offsetDropDown = wrapper.find("div[data-id='properties-dmSharedFields_chooser'] DropdownV2");
		options = offsetDropDown.prop("items"); // by Type
		expectedOptions = [
			{ label: "...", value: "" },
			{ label: "Age", value: "Age" },
			{ label: "Sex", value: "Sex" },
			{ label: "BP", value: "BP" },
			{ label: "Na", value: "Na" },
			{ label: "K", value: "K" },
			{ label: "Drug", value: "Drug" }
		];
		expect(options).to.eql(expectedOptions);
	});
});