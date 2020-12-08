import { strings, join, normalize } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  externalSchematic,
  Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,

} from '@angular-devkit/schematics';
import { getWorkspace } from '../utils/workspace';
import { parseName } from '../utils/parse-name'
import { Module } from '@nestjs/core/injector/module';
import { normalizeOptions } from '../utils/normalize-options'



interface ModuleOptions {
  name: string
  directory: string
  prefix: string,
  simpleModuleName: boolean
}

export default function (schema: ModuleOptions): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const options = normalizeOptions(tree, schema);

    let scopeName = null;
    if (/^@.*\/.*/.test(schema.name)) {
      const [scope, name] = schema.name.split('/');
      scopeName = scope.replace(/^@/, '');
      schema.name = name;
    }

    const workspace = await getWorkspace(tree);
    const newProjectRoot = workspace.extensions.newProjectRoot || '';
    const scopeFolder = scopeName ? strings.dasherize(scopeName) + '/' : '';
    const folderName = `${scopeFolder}${strings.dasherize(schema.name)}`;
    const projectRoot = join(normalize(newProjectRoot as string), folderName);
    // const distRoot = `dist/${folderName}`;
    // const pathImportLib = `${distRoot}/${folderName.replace('/', '-')}`;
    const sourceDir = `${projectRoot}/src/lib`;

    return chain([
      externalSchematic('@nrwl/angular', 'library', {
        name: schema.name,
        directory: schema.directory,
        simpleModuleName: true,
        style: 'scss',
      }),
      externalSchematic('@schematics/angular', 'component', {
        name: schema.name,
        type: 'component',
        skipTests: true,
        style: 'scss',
        export: true,
        changeDetection: 'OnPush',
        // path: options.projectRoot,
        project: options.name,
        skipImport: false,
        // module: options.modulePath
      })
    ])
  };
}
