import { flatten } from '@nestjs/common';
import { getRepository, BaseFirestoreRepository, IEntity, Constructor, IWherePropParam } from 'fireorm';
import { mergeDeepRight, reduce, append, assoc, assocPath } from 'ramda';

type withId<T> = T & { heroId: string };
type withHeroes<T> = T & { heroes: string[] };

const replaceAll = (value: string) => value.split(' ').join('')

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

    async index(props: string[]) {
        const _items = await this.getAll();
        const items = _items.map(i => {
            const indexes = reduce((a, c) => ({ [c]: ((replaceAll(i[c] as string||'')).toLowerCase() ), ...a }), {}, props)
            return assoc('index', indexes, i)
        })

        items.forEach(async i => {
            await this.update(i.id, i)
        })
    }
}