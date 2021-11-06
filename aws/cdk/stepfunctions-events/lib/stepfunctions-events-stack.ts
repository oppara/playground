import * as cdk from '@aws-cdk/core';
import * as sfn from '@aws-cdk/aws-stepfunctions';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';

export class StepfunctionsEventsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stateMachine = new sfn.StateMachine(this, 'sampleStateMachine', {
      stateMachineName: 'sampleStateMachine',
      definition: new sfn.Pass(this, 'pass', {}),
    });

    new events.Rule(this, 'sampleRule', {
      ruleName: 'sampleRule',
      schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
      targets: [new targets.SfnStateMachine(stateMachine)],
    });
  }
}
