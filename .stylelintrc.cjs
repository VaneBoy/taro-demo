module.exports = {
  extends: ['stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'block-no-empty': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'for',
        ],
      },
    ],
    'no-empty-source': null,
    'named-grid-areas-no-invalid': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'order/order': [['custom-properties', 'dollar-variables', 'declarations', 'rules'], { severity: 'warning' }],
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'no-invalid-position-at-import-rule': null,
    'font-family-name-quotes': 'always-where-required',
    'custom-property-pattern': null,
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
}
