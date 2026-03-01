import React, { useEffect, useState } from 'react';
import { getNativeDeviceInfo } from '../utils/deviceInfo';

const DeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [isNativeApp, setIsNativeApp] = useState(false);

    useEffect(() => {
        const info = getNativeDeviceInfo();
        if (info) {
            setDeviceInfo(info);
            setIsNativeApp(true);
        }
    }, []);

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-6 mt-4">기기 정보</h2>

            {isNativeApp && deviceInfo ? (
                <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    기기 모델명
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {deviceInfo.model}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    OS 버전
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Android {deviceInfo.osVersion}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    앱 버전
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {deviceInfo.appVersion}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="w-full max-w-md bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
                    <p className="text-yellow-700">
                        앱 환경이 아닙니다. 이 기능은 Sofa 네이티브 앱에서만 사용할 수 있습니다.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DeviceInfo;
