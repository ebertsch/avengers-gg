import { Request, Response, NextFunction } from 'express';
import * as path from 'path'
import { promises as fs } from 'fs'
import { map, toPairs } from 'ramda';

const saveToFiles = async (req: Request, res: Response, next: NextFunction) => {
    const file = path.join(__dirname, 'db.json')
    const dest = path.join(__dirname, '../../../server-json-data')

    const contents = (await fs.readFile(file)).toString();
    const jsonContents = JSON.parse(contents);
    const jsonPairs = toPairs(jsonContents) as  [string, any][];

    const writeStrings = map( ([key, data]) => {
        const outJson = { [key]: data }
        return { key,  contents: JSON.stringify(outJson) }
    }, jsonPairs);

    const writeOps = await map(async json => { 
      const outPath = path.join(dest, json.key + `.json`)
        return await fs.writeFile(outPath, json.contents )
      }, writeStrings)

    await Promise.all(writeOps);


    res.status(200)
  }

export default saveToFiles