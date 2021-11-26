/* eslint-disable import/no-commonjs,no-process-env */
module.exports = {
  runtime: 'nodejs14.x',
  // vpc: {
  //   // securityGroupIds: [{ 'Fn::ImportValue': '${self:custom.appPrefix}-resources-vpc-default-security-group-id' }],
  //   // subnetIds: [
  //   //   { 'Fn::ImportValue': '${self:custom.appPrefix}-resources-vpc-default-subnet-1' },
  //   //   { 'Fn::ImportValue': '${self:custom.appPrefix}-resources-vpc-default-subnet-2' },
  //   // ],
  //   securityGroupIds: [process.env.VPC_SECURITY_GROUP_ID_1],
  //   subnetIds: [
  //     process.env.VPC_SUBNET_ID_1,
  //     process.env.VPC_SUBNET_ID_2,
  //     // process.env.VPC_SUBNET_ID_3,
  //     // process.env.VPC_SUBNET_ID_4,
  //     // process.env.VPC_SUBNET_ID_5,
  //     // process.env.VPC_SUBNET_ID_6,
  //   ],
  // },
  // fileSystemConfig: {
  //   localMountPath: '/mnt/shared',
  //   arn: { 'Fn::ImportValue': '${self:custom.appPrefix}-${self:custom.stage}-shared-efs-ap-arn' },
  // },
}
