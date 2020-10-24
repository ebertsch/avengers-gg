import * as fsPath from 'path'
import {promises as fs} from 'fs'
import { filter, mergeAll, map, values } from 'ramda';

interface Config {
    source: string;
    destination: string;
}


const wp = (path) => fsPath.join(__dirname, path);

export async function mergeJsonFiles(config: Config) {
    const filePaths = await getFilePaths(wp(config.source))
    const data = await getJsonContents(filePaths)
    await writeJsonFile(wp(config.destination), data)
}

async function getFilePaths(source: string) {
    const files = await fs.readdir(source);
    const fileNames = filter(file => file.endsWith('.json'), files);
    const absolutePaths = map((filename: string) => fsPath.join(source, filename), fileNames)
    
    return absolutePaths;
}

async function getJsonContents(files: string[]): Promise<Object> {
    const jsonData = files.map(
        async file => JSON.parse(((await fs.readFile(file)).toString()))
    )
    const allJsonData = await Promise.all(jsonData);

    return mergeAll(values(allJsonData));
}

async function writeJsonFile(destination: string, data: Object){
    const fileContents = JSON.stringify(data);
    await fs.writeFile(destination, fileContents)
}