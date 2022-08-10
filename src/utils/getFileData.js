import axios from "axios";

export default async (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((res) => {
                resolve(res.data);
            })
            .catch((reason) => {
                reject(reason);
            });
    });
};
