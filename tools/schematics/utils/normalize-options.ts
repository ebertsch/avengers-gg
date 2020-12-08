import { toFileName, toClassName, getNpmScope } from '@nrwl/workspace'
import { libsDir } from '@nrwl/workspace/src/utils/ast-utils'

export function normalizeOptions(host, options) {
    const name = toFileName(options.name);
    const projectDirectory = options.directory
        ? `${toFileName(options.directory)}/${name}`
        : name;
    const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
    const fileName = options.simpleModuleName ? name : projectName;
    const projectRoot = `${libsDir(host)}/${projectDirectory}`;
    const moduleName = `${toClassName(fileName)}Module`;
    const parsedTags = options.tags
        ? options.tags.split(',').map((s) => s.trim())
        : [];
    const modulePath = `${projectRoot}/src/lib/${fileName}.module.ts`;
    const defaultPrefix = getNpmScope(host);
    const importPath = options.importPath || `@${defaultPrefix}/${projectDirectory}`;

    const opts = Object.assign(Object.assign({}, options), {
        prefix: options.prefix ? options.prefix : defaultPrefix,
        name: projectName,
        projectRoot,
        entryFile: 'index',
        moduleName,
        projectDirectory,
        modulePath,
        parsedTags,
        fileName,
        importPath
    });
    console.log(opts);
    return opts;
}