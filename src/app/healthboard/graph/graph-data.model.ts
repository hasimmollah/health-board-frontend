export class ApplicationStatResponse {
    environment: ApplicationStat[];
	lab: ApplicationStat[];
}

export class ApplicationStat {
    name: string;
    liveCount: string;
    deadCount: string;
}