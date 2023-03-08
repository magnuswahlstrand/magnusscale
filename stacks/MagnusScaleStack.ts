import {Api, Config, StackContext} from "sst/constructs";


export function MagnusScaleStack({stack}: StackContext) {
    const PLANETSCALE_PASSWORD = new Config.Secret(stack, "PLANETSCALE_PASSWORD");
    const PLANETSCALE_USERNAME = new Config.Parameter(stack, "PLANETSCALE_USERNAME", {
        value: "cgiyexqws13gyii4pe5u",
    });
    const PLANETSCALE_HOST = new Config.Parameter(stack, "PLANETSCALE_HOST", {
        value: "aws.connect.psdb.cloud",
    });


    // Create an HTTP API
    const api = new Api(stack, "Api", {
        routes: {
            "POST /": "packages/functions/src/lambda.handler",
        },

    });
    api.bind(
        [
            PLANETSCALE_HOST,
            PLANETSCALE_USERNAME,
            PLANETSCALE_PASSWORD,
        ]
    )

    // Show the endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });
}
