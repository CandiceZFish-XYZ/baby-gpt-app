import * as cdk from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  OriginAccessIdentity,
  CloudFrontWebDistribution,
  ViewerCertificate,
  SecurityPolicyProtocol,
} from "aws-cdk-lib/aws-cloudfront";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Source, BucketDeployment } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

const ROOT_DOMAIN = "xzhou.dev";
const APP_NAME = "babygpt";

export class BabyGptWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket to host the website content
    const websiteBucket = new Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
    });

    new BucketDeployment(this, "DeployWebsite", {
      sources: [Source.asset("../baby-gpt-website/build")],
      destinationBucket: websiteBucket,
      memoryLimit: 512,
    });

    // Create a Route53 DNS record to map the domain to the CloudFront distribution
    const domainName = `${APP_NAME}.${ROOT_DOMAIN}`;
    const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
      domainName: ROOT_DOMAIN,
    });

    // Create a HTTPS certificate
    const certificate = new Certificate(this, "HttpsCertificate", {
      domainName: domainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });

    // Create an access identity for the bucket
    const accessIdentity = new OriginAccessIdentity(this, "AccessIdentity");
    websiteBucket.grantRead(accessIdentity);

    // Create a CloudFront distribution to serve the website content
    const distribution = new CloudFrontWebDistribution(
      this,
      "WebsiteDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
              originAccessIdentity: accessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 404,
            errorCachingMinTtl: 0,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
          aliases: [domainName],
          securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2021,
        }),
      }
    );

    // A record
    const aliasRecord = new ARecord(this, "WebsiteAliasRecord", {
      zone: hostedZone,
      recordName: APP_NAME,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
  }
}
