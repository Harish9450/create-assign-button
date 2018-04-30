
import { lowercase, uppercase } from "./../utils/transforms/StringTransforms";
import { IMetadataListConfig } from "./MetadataListConfig.types";
import { stringify } from "querystring";

export const baseConfig: IMetadataListConfig = {
	Entity: {
		columns: {
			MetadataId: {
			},
			LogicalName: {
				transform: lowercase
			},
			DisplayName: {
				transform: uppercase,
				columnWidth: "large"
			},
			Description: {
			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}
		}
	},
	Position: {
		columns: {
			name: {
			},
			positionid: {

			},
			parentpositionid: {

			},
			description: {

			}
		}
	},
	// Quote Component properties
	Quote: {
		columns: {
			name: {
			},
			statuscode: {
			},
			totalamount: {
			},
			createdon: {
			}		
		}
	},
	Product: {
		columns: {
			name: {
			},
			productid: {

			},
			hierarchypath: {

			},
			validfromdate: {

			},
			validtodate: {

			},
			statuscode: {

			},
			productstructure: {

			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}

		}
	},
	Task: {
		columns: {
			activityid: {

			},
			description: {

			},
			subject: {

			},
			prioritycode: {

			},
			statuscode: {

			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}
		}
	},
	Lead: {
		columns: {
			fullname: {

			},
			subject: {

			},
			createdon: {

			},
			modifiedon: {

			},
			statuscode: {

			},
			leadid: {

			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}
		}
	},

    Order: {
		columns: {
			name: {
			},
			ordernumber: {

			},
			prioritycode: {

			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}
		}
	},
    Invoice: {
		columns :{
			name: {

			},
			totalamount: {

			},
			statuscode : {

			},
			_customerid_value: {

			},
			invoiceid: {
				
			}
		}
	},

	Email: {
		columns: {
			subject: {
			},
			prioritycode: {

			},
			activityid: {

			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}
		}
	},
	Contact: {
		columns: {
			contactid: {},
			fullname: {},
			// firstname: {},
			// middlename: {},
			// lastname: {},
			telephone1: {},
			emailaddress1: {},
			// address1_telephone1: {},
			// address1_line1: {},
			// address1_fax: {},
			// address1_telephone2: {},
			// address1_line2: {},
			// address1_line3: {},
			// address1_city: {},
			// address1_postalcode: {},
			// preferredcontactmethodcode: {},
			// jobtitle: {},
			// address1_country: {},
			// address1_stateorprovince: {},
			// customertypecode: Data
		}
	},
	Appointment: {
		columns: {
			subject: {
			},
			activityid: {

			},
			location: {

			},
			description: {

			},
			prioritycode: {

			},
			scheduledstart: {

			},
			scheduledend: {

			},
			scheduleddurationminutes: {

			},
			isalldayevent:{

			}
		},
		options: {
			selection: {
				selectionMode: "multiple"
			}
		}
	},

	Field: {
		columns: {
			DisplayName: {

			}
		}
	}
};
