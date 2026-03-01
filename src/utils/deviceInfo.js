export const getNativeDeviceInfo = () => {
    try {
        // Check if the native bridge is available
        if (window.SofaNative && window.SofaNative.getDeviceInfo) {
            const deviceInfoString = window.SofaNative.getDeviceInfo();
            return JSON.parse(deviceInfoString);
        }
        // Return null if not in the native app environment
        return null;
    } catch (error) {
        console.error("Failed to get native device info", error);
        return null;
    }
};
