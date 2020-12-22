import { flatten } from '@nestjs/common';
import { query } from 'express';
import { getRepository, BaseFirestoreRepository, IEntity, Constructor } from 'fireorm';
import { mergeDeepRight, reduce, append, assoc, keys } from 'ramda';
import { indexString } from './utils/index-string';

type withId<T> = T & { heroId: string };
type withHeroes<T> = T & { heroes: string[] };


export abstract class DataServiceBase<T extends IEntity> {
    private repository: BaseFirestoreRepository<T>

    constructor(entity: Constructor<T>) {
        this.repository = getRepository(entity);
    }

    async getAll(): Promise<T[]> {
        return await this.repository.find()
    }

    async getById(id: string): Promise<T> {
        return await this.repository.findById(id);
    }

    async getByHeroes(ids: string[]): Promise<T[]> {
        return this.repository.whereArrayContainsAny((a: withHeroes<T>) => a.heroes, ids).find()
    }

    async getByHeroId(ids: string[]): Promise<T[]> {

        const _results = reduce((results, id: string) => {
            return append(
                this.repository.whereEqualTo((a: withId<T>) => a.heroId, id).find(),
                results
            )
        }, [], ids)

        const queried = await Promise.all(_results)
        return flatten(queried)
    }

    async add(item: T): Promise<T> {
        return await this.repository.create(item)
    }

    async remove(id: string) {
        await this.repository.delete(id)
    }

    async update(id: string, item: T): Promise<T> {
        const _item = assoc('id', id, item)
        return await this.repository.update(_item)
    }

    async patch(id: string, item: Partial<T>): Promise<T> {
        const dbItem = this.repository.findById(id)
        const merged = mergeDeepRight(dbItem, item) as unknown as T
        const _item = assoc('id', id, merged);
        return await this.repository.update(_item)
    }

    indexItem(item: T, props: string[]): T {
        const indexes = reduce((a, c) => ({ [c]: (indexString(item[c] as string||'') ), ...a }), {}, props)
        return assoc('index', indexes, item)
    }

    async index(props: string[]) {
        const _items = await this.getAll();
        const items = _items.map(i => this.indexItem(i, props))

        items.forEach(async i => {
            await this.update(i.id, i)
        })
    }

    async findCascading(queryObject: Partial<T>): Promise<T | null> {
        const props = keys(queryObject)
        for(let i=0;i<props.length;i++) {
            const indexedField = indexString(queryObject[props[i] as string])
            const result = await this.repository.whereEqualTo(`index.${props[i]}` as any, indexedField).findOne()
            if(result) { return result }
        }
    }
}