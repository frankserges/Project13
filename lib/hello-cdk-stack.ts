import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// Import the Lambda module
import * as lambda from 'aws-cdk-lib/aws-lambda';
export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
          // Define the Lambda function resource
          const myFunction = new lambda.Function(this, "HelloWorldFunction", {
            runtime: lambda.Runtime.NODEJS_20_X, // Provide any supported Node.js runtime
            handler: "index.handler",
            code: lambda.Code.fromInline(`
              exports.handler = async function(event) {
                return {
                  statusCode: 200,
                  body: JSON.stringify('Hello CDK!'),
                };
              };
            `),
          });
                // Define the Lambda function URL resource
        const myFunctionUrl = myFunction.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
          });
      
          // Define a CloudFormation output for your URL
          new cdk.CfnOutput(this, "myFunctionUrlOutput", {
            value: myFunctionUrl.url,
          })
    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
