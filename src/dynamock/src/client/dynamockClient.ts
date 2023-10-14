import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
/**
 * This interface is used to configure the dynamock client
 */
interface DynamockClientConfig {
    /**
     * Used to point to the currently running dynamock server
     */
    host: string
}

export default function dynamockClient (config: DynamockClientConfig ){
    const clientId = uuidv4()

    return {

    }
}
