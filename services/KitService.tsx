import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';
import { Share } from "react-native";

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


    async exportToXML(kits : Array<any>){
        let xml = "<Kits>\n"
        for(const kit of kits){
            let xmlKit = `<Kit CodeKit="${kit.CodeKit}" Stock="${kit.Stock}"/>\n`;
            xml += xmlKit
        }
        xml += "</Kits";
        
    }

   

}

export default new KitService();