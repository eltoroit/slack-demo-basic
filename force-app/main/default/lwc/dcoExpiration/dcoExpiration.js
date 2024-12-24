import { LightningElement, wire } from "lwc";
import getExpirationDaysLeft from "@salesforce/apex/TrialExpirationController.getExpirationDaysLeft";

export default class DcoExpiration extends LightningElement {
	daysLeft;
	orgExpires = false;
	badgeClass = "";

	@wire(getExpirationDaysLeft)
	wired_getExpirationDaysLeft({ data, error }) {
		if (data) {
			this.orgExpires = data.orgExpires;
			if (data.orgExpires) {
				this.daysLeft = `This trial org will expire in ${data.daysLeft} days<br/> (${data.expDate})`;
				if (data.daysLeft > 7) {
					this.badgeClass = "green";
				} else if (data.daysLeft > 2) {
					this.badgeClass = "yellow";
				} else {
					this.badgeClass = "red";
				}
			}
		} else if (error) {
			alert(JSON.stringify(error));
		}
	}
}
