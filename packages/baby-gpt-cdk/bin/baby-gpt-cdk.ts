#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BabyGptWebsiteStack } from '../lib/baby-gpt-website-stack';
import { BabyGptApiStack } from '../lib/baby-gpt-api-stack';

const app = new cdk.App();
new BabyGptWebsiteStack(app, 'BabyGptWebsiteStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

new BabyGptApiStack(app, 'BabyGptApiStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});