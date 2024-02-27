export interface MqttConfig {
  broker: string;
  port: number;
  username: string;
  password: string;
  qos: 0 | 1 | 2;
  retain: boolean;
  discovery: boolean;
  discovery_prefix: string;
  topic_prefix: string;
  availability_topic: string;
  alarm_code: number;
}

export interface ChuangoConfig {
  username: string;
  password: string;
  guid: string;
}

export interface Config {
  mqtt: MqttConfig;
  chuango: ChuangoConfig;
}
