import {transform} from 'ember-template-recast'

function extractText(node: any, fileName: any, options: any) {
  if (node.path.original === 'format-message') {
    let message = node.params[0]?.original
    let desc = node.params[1]?.original
    let id = options.overrideIdFn(undefined, message, desc, fileName)
    let defaultMessage = message?.replace(/\s{2,}/g, ' ')
    options.onMsgExtracted(undefined, {
      id: id,
      defaultMessage: defaultMessage,
      description: desc,
    })
  }
}

export function parseFile(source: string, fileName: string, options: any) {
  let visitor = function () {
    return {
      MustacheStatement(node: any) {
        extractText(node, fileName, options)
      },
      SubExpression(node: any) {
        extractText(node, fileName, options)
      },
    }
  }

  transform(source, visitor)
}
