import { strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
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



interface ModuleOptions {
  name: string
  path: string
  module: string
  project: string
}

function generateFiles(schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        ...strings,
        ...schema,
      }),
      move(schema.path),
    ]);

    return chain([mergeWith(templateSource)])(tree, context);
  };
}

export default function (options: ModuleOptions): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = workspace.projects.get(options.project as string);
    

    options.path = '/' + project.sourceRoot + '/app/' + options.path

    const parsedPath = parseName(options.path as string, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;


    return chain([
      generateFiles(options)
    ]);
  };
}
