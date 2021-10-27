import { ParserField, Options } from 'graphql-zeus';
import { Parser } from 'graphql-js-tree'
import { TemplateUtils } from 'graphql-zeus/lib/TreeToGraphQL/templates/TemplateUtils';
export const ConvertStringToObject = (value: string) => {
  const computeString = `
    scalar Translatable
    input Translate{
        field: Translatable = ${value}
    }
`;
  const TranslatedString = Parser.parse(computeString);

  const translationNode = TranslatedString.nodes.find(
    (n) => n.name === 'Translate',
  );
  if (!translationNode || !translationNode.args) {
    return;
  }
  return translationNode.args[0].args;
};

export const ConvertValueToEditableString = (f: ParserField) => {
  const TranslatedString = TemplateUtils.resolverForConnection(f);
  return TranslatedString;
};

export const ConvertValueNodeToString = (node: ParserField) => {
  if (!node.args) {
    return '';
  }
  if (node.type.options?.includes(Options.array)) {
    if (node.args.length === 0) {
      return '[]';
    }
    return ConvertValueToEditableString(node).split('=')[1];
  }
  if (node.args.length === 0) {
    return '';
  }
  return ConvertValueToEditableString(node).split('=')[1];
};
