import NetInfo from "@react-native-community/netinfo";

// Boolean değeri internet bağlantısının olup olmamasına göre atanacaktır.
export default class NetworkUtils {

    static async isNetworkAvailable() {
        const response = await NetInfo.fetch();
        return response.isConnected;
    }

}