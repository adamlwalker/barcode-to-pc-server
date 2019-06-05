import { OutputProfileModel } from "./output-profile.model";

/**
 * When editing this file rember to reflect the same changes to
 * response.model.ts present on the server side.
 */
export abstract class responseModel {
    readonly action: string;
    public abstract fromObject(obj: any): responseModel;

    public static readonly ACTION_GET_VERSION = 'getVersion';
    public static readonly ACTION_HELO = 'helo';
    public static readonly ACTION_PONG = 'pong';
    public static readonly ACTION_PUT_SCAN_ACK = 'putScanAck';
    public static readonly ACTION_POPUP = 'action_popup';
    public static readonly ACTION_ENABLE_QUANTITY = 'enableQuantity';
    public static readonly UPDATE_OUTPUT_PROFILES = 'update_output_profiles';
    public static readonly ACTION_REQUEST_SCAN_SESSION_UPDATE = 'requestScanSessionUpdate';
    public static readonly ACTION_KICK = 'kick';
}

/**
 * @deprecated
 */
export class responseModelGetVersion extends responseModel {
    action = responseModel.ACTION_GET_VERSION;
    version: string;

    public fromObject(obj: ({ version: string })) {
        this.version = obj.version;
        return this;
    }
}

export class responseModelHelo extends responseModel {
    action = responseModel.ACTION_HELO;
    version: string;
    outputProfiles: OutputProfileModel[];

    /**
     * @deprecated Use OutputProfiles instead
     */
    quantityEnabled: boolean;

    public fromObject(obj: ({ version: string, outputProfiles: OutputProfileModel[], quantityEnabled: boolean })) {
        this.version = obj.version;
        this.outputProfiles = obj.outputProfiles;
        this.quantityEnabled = obj.quantityEnabled;
        return this;
    }
}

export class responseModelPong extends responseModel {
    action = responseModel.ACTION_PONG;

    public fromObject(obj: ({})) {
        return this;
    }
}

export class responseModelPutScanAck extends responseModel {
    action = responseModel.ACTION_PUT_SCAN_ACK;
    scanSessionId: number;
    scanId: number;

    public fromObject(obj: ({ scanSessionId: number, scanId: number })) {
        this.scanSessionId = obj.scanSessionId;
        this.scanId = obj.scanId;
        return this;
    }
}

export class responseModelPopup extends responseModel {
    action = responseModel.ACTION_POPUP;
    title: string;
    message: string;

    public fromObject(obj: ({ title: string, message: string })) {
        this.title = obj.title;
        this.message = obj.message;
        return this;
    }
}

/**
 * @deprecated For backwards compatibility only, use OutputProfiles instead
 */
export class responseModelEnableQuantity extends responseModel {
    action = responseModel.ACTION_ENABLE_QUANTITY;
    enable: boolean;

    public fromObject(obj: ({ enable: boolean })) {
        this.enable = obj.enable;
        return this;
    }
}

export class responseModelUpdateOutputProfiles extends responseModel {
    action = responseModel.UPDATE_OUTPUT_PROFILES;
    outputProfiles: OutputProfileModel[];

    public fromObject(obj: ({ outputProfiles: OutputProfileModel[] })) {
        this.outputProfiles = obj.outputProfiles;
        return this;
    }
}

export class responseModelKick extends responseModel {
    action = responseModel.ACTION_KICK;
    message: string = '';

    public fromObject(obj: ({ message: string })) {
        this.message = obj.message;
        return this;
    }
}
