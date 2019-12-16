import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';
import Share from 'react-native-share';
import base64 from 'react-native-base64';
import Kit from '../core/models/kit';

class KitService {

    http: AxiosInstance;
    constructor() {
        this.http = axios;
    }


    async getAllKit(callback): Promise<any> {
        this.http.get(`${environment.apiUrl}/kit`)
            .then(res => {
                callback(res.data.result)
            })
            .catch(error => {
                console.info(error.response.data)
            })
    }


    async exportToXML(kits: Array<any>) {
        let xml = `<?xml version="1.0"?>\n<Kits>\n`
        for (const kit of kits) {
            let xmlKit = `<Kit CodeKit="${kit.CodeKit}" Stock="${kit.Stock}"/>\n`;
            xml += xmlKit
        }
        xml += "</Kits>";
        let date = new Date().toDateString();
        Share.open({ url: "data:text/xml;base64," + base64.encode(xml), type: 'text/xml', subject: `Export stock FNAEG ${date}`, filename: `Stock du` })
    }



}

export default new KitService();