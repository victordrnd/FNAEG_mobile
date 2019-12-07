import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';


class KitService {

    http: AxiosInstance;
    constructor() {
        this.http = axios;
    }


    async getAllKit(callback): Promise<any> {
        this.http.get(`${environment.apiUrl}/kits`)
            .then(res => {
                callback(res.data.result)
            })
            .catch(error => {
                console.info(error.response.data)
            })
    }

   

}

export default new KitService();