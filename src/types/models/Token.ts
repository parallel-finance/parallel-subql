// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';


export class Token implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public decimal?: number;

    public name?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Token entity without an ID");
        await store.set('Token', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Token entity without an ID");
        await store.remove('Token', id.toString());
    }

    static async get(id:string): Promise<Token | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Token entity without an ID");
        const record = await store.get('Token', id.toString());
        if (record){
            return Token.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<Token, FunctionPropertyNames<Token>>> & Entity): Token {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Token(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
