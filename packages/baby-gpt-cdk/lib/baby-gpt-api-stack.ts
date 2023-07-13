import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class BabyGptApiStack extends cdk.Stack {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the API Gateway
    this.api = new apigateway.RestApi(this, "MyApi", {
      endpointTypes: [apigateway.EndpointType.REGIONAL],
      deploy: true,
      deployOptions: {
        stageName: "api",
      },
    });

    // Add a resource and integrate GET method with a Lambda function
    //  hello-world
    const helloWorldLambda = new lambda.Function(this, "HelloWorldFunc", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("../baby-gpt-api/dist"),
      handler: "get-hello-world.handler",
    });

    const todos = this.api.root.addResource("hello-world");
    todos.addMethod("GET", new apigateway.LambdaIntegration(helloWorldLambda));

    //  keywords

    const keywordsLambda = new lambda.Function(this, "KeywordsFunc", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("../baby-gpt-api/dist"),
      handler: "get-keywords.handler",
      timeout: cdk.Duration.seconds(10),
    });

    const keywordsTodos = this.api.root.addResource("keywords");
    keywordsTodos.addMethod(
      "GET",
      new apigateway.LambdaIntegration(keywordsLambda)
    );

    //  QAs

    const qasLambda = new lambda.Function(this, "QasFunc", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("../baby-gpt-api/dist"),
      handler: "get-qas.handler",
      timeout: cdk.Duration.seconds(15),
    });

    const qasTodos = this.api.root.addResource("qas");
    qasTodos.addMethod("GET", new apigateway.LambdaIntegration(qasLambda));
  }
}
