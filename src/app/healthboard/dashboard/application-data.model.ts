export class ApplicationDataResponse {
    environment: string;
	applicationDataInformationList: ApplicationDataInformation[];
}

export class ApplicationDataInformation {
    lab: string;
	applicationDataList: ApplicationData[];
}

export class ApplicationData {
    name: string;
    appStatus: boolean;
    lastAlive: string;
	url: string;
	id: string;
	appId: string;
	lab: string;
	environment: string;
	downSince: string;
}