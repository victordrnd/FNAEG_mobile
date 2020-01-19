import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';
import Service from './Service';

class InventaireService {

    http: AxiosInstance;
    constructor() {
        this.http = Service.getInstance();
    }


    create(kits){
        let obj = {
            kits : kits
        }
        return this.http.post(`${environment.apiUrl}/inventory/create`, obj)
            .then((res : any ) => {
                return res.data.result;
            })
            .catch(err => console.log(err));
    }


    getAll(){
        return this.http.get(`${environment.apiUrl}/inventory`)
            .then((res:any) =>{
                return res.data.result
            })
            .catch(err => console.log(err))
    }

    delete(inventaire){
        return this.http.delete(`${environment.apiUrl}/inventory/${inventaire.id}/delete`)
            .then((res :any)=> {
                return res.data.result;
            })
            .catch(err => console.log(err));
    }






}

export default new InventaireService();