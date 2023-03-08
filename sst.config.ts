import {SSTConfig} from "sst";
import {MagnusScaleStack} from "./stacks/MagnusScaleStack";

export default {
    config(_input) {
        return {
            name: "magnusscale",
            region: "eu-west-1",
        };
    },
    stacks(app) {
        app.stack(MagnusScaleStack);
    }
} satisfies SSTConfig;
