/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/lib/Button";
import { injectIntl, intlShape } from "react-intl";
import uuid4 from "uuid/v4";
import PropertyUtils from "./../../util/property-utils";
import Tooltip from "./../../../tooltip/tooltip.jsx";

import { MESSAGE_KEYS, MESSAGE_KEYS_DEFAULTS } from "./../../constants/constants";
import { TOOL_TIP_DELAY } from "./../../constants/constants.js";


import SubPanelInvoker from "./invoker.jsx";

class SubPanelCell extends React.Component {
	constructor(props) {
		super(props);
		this.showSubPanel = this.showSubPanel.bind(this);
		this.onSubPanelHidden = this.onSubPanelHidden.bind(this);
	}

	onSubPanelHidden(applyChanges) {
		// on cancel reset back to original value
		if (!applyChanges) {
			this.props.controller.updatePropertyValue(this.props.propertyId, this.initialControlValue);
			this.props.controller.setErrorMessages(this.initialMessages);
			this.props.controller.setControlStates(this.initialStates);
		}
	}


	showSubPanel() {
		// sets the current value for parameter.  Used on cancel
		this.initialControlValue = JSON.parse(JSON.stringify(this.props.controller.getPropertyValue(this.props.propertyId)));
		this.initialMessages = this.props.controller.getErrorMessages();
		this.initialStates = this.props.controller.getControlStates();
		this.refs.invoker.showSubDialog(this.props.title, this.props.panel, this.onSubPanelHidden);
	}

	render() {
		const tooltipId = "tooltip-subpanel-cell";
		const disabled = typeof this.props.disabled !== "undefined" ? this.props.disabled : false;
		const subPanelToolTip = PropertyUtils.formatMessage(this.props.intl,
			MESSAGE_KEYS.SUBPANEL_BUTTON_TOOLTIP, MESSAGE_KEYS_DEFAULTS.SUBPANEL_BUTTON_TOOLTIP);
		const applyLabel = PropertyUtils.formatMessage(this.props.intl, MESSAGE_KEYS.APPLYBUTTON_LABEL, MESSAGE_KEYS_DEFAULTS.APPLYBUTTON_LABEL);
		const rejectLabel = PropertyUtils.formatMessage(this.props.intl, MESSAGE_KEYS.REJECTBUTTON_LABEL, MESSAGE_KEYS_DEFAULTS.REJECTBUTTON_LABEL);

		return (

			<SubPanelInvoker ref="invoker"
				rightFlyout={this.props.rightFlyout}
				applyLabel={applyLabel}
				rejectLabel={rejectLabel}
				controller={this.props.controller}
			>
				<div>
					<Tooltip
						id={uuid4() + "-" + tooltipId}
						tip={subPanelToolTip}
						direction="left"
						delay={TOOL_TIP_DELAY}
						className="properties-tooltips"
					>
						<Button
							style={{ "display": "inline" }}
							bsSize="xsmall"
							onClick={this.showSubPanel}
							disabled={disabled}
						>
							{this.props.label}
						</Button>
					</Tooltip>
				</div>
			</SubPanelInvoker>
		);
	}
}

SubPanelCell.propTypes = {
	label: PropTypes.string.isRequired,
	title: PropTypes.string,
	panel: PropTypes.object.isRequired,
	disabled: PropTypes.bool,
	controller: PropTypes.object,
	propertyId: PropTypes.object,
	intl: intlShape,
	rightFlyout: PropTypes.bool
};

export default injectIntl(SubPanelCell);