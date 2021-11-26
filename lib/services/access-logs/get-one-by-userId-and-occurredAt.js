import AccessLogsModel from 'lib/models/access-logs'

export default () => (userId, occurredAt) => AccessLogsModel.get({ userId, occurredAt })
