import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {updateCounter} from "../../core/cool"
import {getCountersV2} from "../../core/db"

export const handler: APIGatewayProxyHandlerV2 = async () => {
    await updateCounter()
    const counters = await getCountersV2()
    console.log()
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: JSON.stringify(counters[0].tally),
    };
};