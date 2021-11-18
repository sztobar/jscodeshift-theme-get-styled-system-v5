import {
  Transform,
  ImportSpecifier,
  ImportNamespaceSpecifier,
  ImportDefaultSpecifier,
} from 'jscodeshift';

type PossibleImportSpecifier =
  | ImportSpecifier
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier;

const transform: Transform = (fileInfo, api, options) => {
  const printOptions = options.printOptions || { quote: 'single' };
  const { jscodeshift: j } = api;

  const getThemeGetImportDeclation = (importedIdentifier = 'themeGet') =>
    j.importDeclaration(
      [
        j.importSpecifier(
          j.identifier(importedIdentifier),
          j.identifier('themeGet')
        ),
      ],
      j.literal('@styled-system/theme-get')
    );

  let themeGetIdentifier = 'themeGet';
  const root = j(fileInfo.source);
  root
    .find(j.ImportDeclaration, {
      source: { value: 'styled-system' },
      specifiers: (specifiers?: PossibleImportSpecifier[]) =>
        specifiers?.some(isThemeGetImportSpecifier) ?? false,
    })
    .replaceWith((path) => {
      const specifiersExceptThemeGet =
        path.node.specifiers?.filter((specifier) => {
          if (isThemeGetImportSpecifier(specifier)) {
            themeGetIdentifier = specifier.imported.name;
            return false;
          }
          return true;
        }) ?? [];

      return specifiersExceptThemeGet.length > 0
        ? j.importDeclaration(
            specifiersExceptThemeGet,
            path.node.source,
            path.node.importKind
          )
        : null;
    })
    .insertAfter(getThemeGetImportDeclation(themeGetIdentifier));

  let namespaceIdentifierName: string | undefined = undefined;
  root
    .find(j.ImportDeclaration, {
      source: { value: 'styled-system' },
      specifiers: (specifiers?: PossibleImportSpecifier[]) =>
        specifiers?.some(
          (specifier) => specifier.type === 'ImportNamespaceSpecifier'
        ) ?? false,
    })
    .forEach((path) => {
      const namespaceSpecifier = path.node.specifiers?.find(
        (specifier) => specifier.type === 'ImportNamespaceSpecifier'
      );
      namespaceIdentifierName = namespaceSpecifier?.local?.name;
    })
    .insertAfter(getThemeGetImportDeclation());

  if (namespaceIdentifierName !== undefined) {
    root
      .find(j.MemberExpression, {
        object: { type: 'Identifier', name: namespaceIdentifierName },
        property: { type: 'Identifier', name: 'themeGet' },
      })
      .replaceWith(() => j.identifier('themeGet'));
  }

  return root.toSource(printOptions);
};

const isThemeGetImportSpecifier = (
  specifier: PossibleImportSpecifier
): specifier is ImportSpecifier => {
  if (specifier.type === 'ImportSpecifier') {
    return specifier.local?.name === 'themeGet' ?? false;
  }
  return false;
};

export default transform;
