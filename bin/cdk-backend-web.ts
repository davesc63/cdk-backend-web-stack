#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkBackendWebStack } from '../lib/cdk-backend-web-stack';

const app = new cdk.App();
new CdkBackendWebStack(app, 'CdkBackendWebStack');
