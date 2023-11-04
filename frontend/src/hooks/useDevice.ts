import { useEffect, useState } from 'react';

export enum DeviceTypes {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export type Device = DeviceTypes.MOBILE | DeviceTypes.DESKTOP;

export interface IDeviceMetadata {
  device: Device;
  width: number;
}

const MAX_MOBILE_WINDOW_SIZE = 767;

export default function useDevice(): IDeviceMetadata | null {
  const [deviceMetadata, setDeviceMetadata] = useState<IDeviceMetadata | null>(null);

  useEffect(() => {
    function handleResize() {
      const deviceWidth = window?.innerWidth;
      let device: Device;

      if (deviceWidth <= MAX_MOBILE_WINDOW_SIZE) {
        device = DeviceTypes.MOBILE;
      } else {
        device = DeviceTypes.DESKTOP;
      }

      setDeviceMetadata({
        device,
        width: deviceWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceMetadata;
}
