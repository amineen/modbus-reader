export namespace main {
	
	export class Device {
	    Ip: string;
	    Port: string;
	
	    static createFrom(source: any = {}) {
	        return new Device(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Ip = source["Ip"];
	        this.Port = source["Port"];
	    }
	}

}

