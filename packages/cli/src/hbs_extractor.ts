import {transform} from 'ember-template-recast'

export function parseFile(source: string, fileName: string, options: any) {
  let visitor = function () {
    return {
      MustacheStatement(node: any) {
        if (node.path.original === 'x') {
          let message = node.params[0]?.original
          let desc = node.params[1]?.original
          let id = options.overrideIdFn(undefined, message, desc, fileName)
          options.onMsgExtracted(undefined, {
            id: id,
            defaultMessage: message,
            description: desc,
          })
        }
      },
    }
  }

  transform(source, visitor)
}
