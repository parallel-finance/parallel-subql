// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class DotExchangeRate implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public rate?: string;

    public blockNumber?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DotExchangeRate entity without an ID");
        await store.set('DotExchangeRate', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DotExchangeRate entity without an ID");
        await store.remove('DotExchangeRate', id.toString());
    }

    static async get(id:string): Promise<DotExchangeRate | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DotExchangeRate entity without an ID");
        const record = await store.get('DotExchangeRate', id.toString());
        if (record){
            return DotExchangeRate.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new DotExchangeRate(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
