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
	export class RegisterValue {
	    Register: number;
	    Value: number;
	
	    static createFrom(source: any = {}) {
	        return new RegisterValue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Register = source["Register"];
	        this.Value = source["Value"];
	    }
	}

}

export namespace pkg {
	
	export class ModbusReading {
	    register_pair: string;
	    LSR: number;
	    MSR: number;
	    Value: number;
	
	    static createFrom(source: any = {}) {
	        return new ModbusReading(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.register_pair = source["register_pair"];
	        this.LSR = source["LSR"];
	        this.MSR = source["MSR"];
	        this.Value = source["Value"];
	    }
	}

}

