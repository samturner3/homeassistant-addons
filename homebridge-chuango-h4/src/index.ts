import { IClientOptions } from "mqtt";
import { Client, DeviceInfo, DeviceConnection } from "chuango-h4-client";

import * as mqtt from "./entities/mqtt";
import * as chuango from "./entities/chuango";
import * as homeAssistant from "./entities/homeAssistant";
// import * as inceptionPolling from './entities/inceptionPolling';

import { Config } from "./contracts";

const main = async () => {
  try {
    // Get configuration
    const config: Config = {
      mqtt: {
        broker: process.env.MQTT_HOST,
        port: parseInt(process.env.MQTT_PORT, 10),
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        qos:
          process.env.MQTT_QOS === "0"
            ? 0
            : process.env.MQTT_QOS === "1"
            ? 1
            : 2,
        retain: process.env.MQTT_RETAIN === "true",
        discovery: process.env.MQTT_DISCOVERY === "true",
        discovery_prefix: process.env.MQTT_DISCOVERY_PREFIX,
        topic_prefix: process.env.MQTT_TOPIC_PREFIX,
        availability_topic: process.env.MQTT_AVAILABILITY_TOPIC,
        alarm_code: parseInt(process.env.MQTT_ALARM_CODE, 10),
      },
      chuango: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        guid: process.env.GUID,
      },
    };

    const availabilityTopic = config.mqtt.availability_topic;

    const mqttConnectOptions = {
      will: {
        topic: availabilityTopic,
        // payload: "offline",
        qos: 1,
        retain: true,
      },
    } as IClientOptions;

    mqtt.connect(config.mqtt, mqttConnectOptions);

    const publishStatusChange = (isConnected: boolean) => {
      mqtt.publish(availabilityTopic, isConnected ? "online" : "offline");
    };

    const connectedClient: Client = await chuango.connect(
      config.chuango,
      publishStatusChange
    );
    await homeAssistant.connect(config.mqtt, connectedClient);
    // await inceptionPolling.polling();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();
