import { Client, DeviceInfo, DeviceConnection } from "chuango-h4-client";
import { ChuangoConfig } from "../contracts";

export const exploreDevice = async (client: Client, device: DeviceInfo) => {
  client.connect(device).then((connection: DeviceConnection) => {
    console.info("Connected to device " + device.deviceID);

    // const uuid = this.api.hap.uuid.generate(device.deviceID);
    // const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
    // if(existingAccessory) {
    //     new ChuangoH4PlatformAccessory(this, existingAccessory, connection);
    // } else {
    // const accessory = new this.api.platformAccessory(device.deviceID, uuid);
    // new ChuangoH4PlatformAccessory(this, accessory, connection);
    // this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    // }
  });
};

export const discoverDevices = async (
  client: Client
): Promise<DeviceInfo[]> => {
  console.info("Discovering chuango devices...");
  return client.listDevices();

  //   .then((devices: DeviceInfo[]) => {
  //     // for (const device of devices) {
  //     //   console.info("Found device " + device.deviceID + " connecting...");
  //     //   exploreDevice(client, device);
  //     // }
  //   });
};

export const connect = async (
  config: ChuangoConfig,
  onAuthenticated: (isConnected: boolean) => void
): Promise<Client> => {
  return Client.login(config.username, config.password, config.guid)
    .then((client: Client) => {
      console.info("Login successful");
      return client;
      //   discoverDevices(client);
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};
