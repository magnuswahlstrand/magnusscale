import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {getCounter, increaseCounter} from "../../core/db"

export const handler: APIGatewayProxyHandlerV2 = async () => {
    await increaseCounter('hits')
    const counter = await getCounter('hits')
    return {
        statusCode: 200,
        headers: {"Content-Type": "json/application"},
        body: JSON.stringify({count: counter.tally}),
    };
};