import axios, { AxiosInstance } from 'axios';
import environment from '../environments/environment';
import Kit from '../core/models/kit';
import AsyncStorage from '@react-native-community/async-storage';

class InventaireService {

    http: AxiosInstance;
    constructor() {
        this.http = axios;
    }


    async registerNewInventaire(kits : Array<Kit>){
        await AsyncStorage.getItem('listInventory');
    }



}

export default new InventaireService();