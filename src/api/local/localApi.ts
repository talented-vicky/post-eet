const getLocation = () : Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const localApi = {
    getLocation
}

export default localApi;