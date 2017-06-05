// Anthony Astige's eslint rules
// Perhaps a bit too custom and should be adjusted if more people come on board
// Also use prettier as noted in private/bin/prettierAllTheJs

'use strict'
// Not in Meteor so this file isn't babelified
/* eslint-disable import/no-commonjs*/

module.exports = {
	env: {
		es6: true,
		browser: true,
		node: true,
		jquery: true
		// meteor: true	// Off for explicit dep; "import { Meteor } = 'meteor/meteor';"
	},

	globals: {
		React: true,
		YT: true
	},

	plugins: ['lodash', 'meteor', 'react', 'import'],

	extends: [
		'eslint:recommended',
		'plugin:lodash/recommended',
		'plugin:meteor/recommended',
		'plugin:react/recommended'
	],

	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},

	settings: {
		// Make sure you have https://www.npmjs.com/package/eslint-import-resolver-meteor
		'import/resolver': 'meteor'
	},

	rules: {
		/**
		 * Possible Errors (sparse)
		 * * Most already included in recommended
		 */
		'no-unsafe-finally': ['error'],
		'no-console': ['warn'], // Don't force vim jumping, but do highlight
		'no-prototype-builtins': ['error'],
		// 'valid-jsdoc': ['error']

		/**
		 * Best Practices (all)
		 **/
		'accessor-pairs': ['error'],
		'array-callback-return': ['error'],
		'block-scoped-var': ['error'],
		complexity: ['error', { max: 6 }],
		'consistent-return': ['error'],
		curly: ['error', 'all'],
		// 'default-case': ['error'],
		'dot-location': ['error', 'property'],
		'dot-notation': ['error'],
		eqeqeq: 'error',
		'guard-for-in': ['error'],
		// 'no-alert': ['error'],
		'no-caller': ['error'],
		// 'no-case-declarations': ['error'],			// eslint:recommended
		'no-div-regex': ['error'],
		'no-else-return': ['error'],
		'no-empty-function': ['error'],
		// 'no-empty-pattern': ['error'],				// eslint:recommended
		'no-eq-null': ['error'],
		'no-eval': ['error'],
		'no-extend-native': ['error'],
		'no-extra-bind': ['error'],
		'no-extra-label': ['error'],
		// 'no-fallthrough': ['error'],				// eslint:recommended
		'no-floating-decimal': ['error'],
		'no-implicit-coercion': ['error'],
		'no-implicit-globals': ['error'],
		'no-implied-eval': ['error'],
		// 'no-invalid-this': ['error'],
		'no-iterator': ['error'],
		'no-labels': ['error'],
		'no-lone-blocks': ['error'],
		'no-loop-func': ['error'],
		/*
		 'no-magic-numbers': ['error', {
				ignore: [0],
				ignoreArrayIndexes: true,
				enforceConst: true,
				detectObjects: falsei
			}],
		 */
		'no-multi-spaces': ['error'],
		// 'no-multi-str': ['error'],
		'no-native-reassign': ['error'],
		'no-new': ['error'],
		'no-new-func': ['error'],
		'no-new-wrappers': ['error'],
		// 'no-octal': ['error'],						// eslint:recommended
		'no-octal-escape': ['error'],
		'no-param-reassign': ['error'],
		'no-proto': ['error'],
		// 'no-redeclare': ['error'],					// eslint:recommended
		'no-return-assign': ['error'],
		'no-script-url': ['error'],
		// 'no-self-assign': ['error'],					// eslint:recommended
		'no-self-compare': ['error'],
		'no-sequences': ['error'],
		'no-throw-literal': ['error'],
		'no-unmodified-loop-condition': ['error'],
		'no-unused-expressions': ['error'],
		// 'no-unused-labels': ['error'],				// eslint:recommended
		'no-useless-call': ['error'],
		'no-useless-concat': ['error'],
		'no-useless-escape': ['error'],
		'no-void': ['error'],
		// 'no-warning-comments': ['warn'],			// I use TO DO in code too much
		'no-with': ['error'],
		radix: ['error', 'as-needed'],
		'vars-on-top': ['error'],
		'wrap-iife': ['error'],
		yoda: ['error', 'always', { onlyEquality: true }],

		/**
		 * Strict mode (all)
		 **/
		strict: ['error', 'global'],

		/**
		 * Variables (all)
		 **/
		// 'init-declarations': ['error', 'always'],	// I like vars undefined & not
		// 'no-catch-shadow': ['error'],				// Eh who needs ie8 anymore
		// 'no-delete-var': ['error'],								// eslint:recommended
		'no-label-var': ['error'],
		'no-restricted-globals': ['error', 'event'],
		'no-shadow': ['error', { allow: ['cb', 'err'] }],
		'no-shadow-restricted-names': ['error'],
		// 'no-undef': ['error'],									// eslint:recommended
		'no-undef-init': ['error'],
		'no-undefined': ['error'],
		'no-unused-vars': ['error', { vars: 'all', args: 'none' }], // eslint:recommended
		'no-use-before-define': ['error'],

		/**
		 * Node.js and CommonJS (all)
		 **/
		'callback-return': ['error'],
		'global-require': ['error'],
		'handle-callback-err': ['error'],
		'no-mixed-requires': ['error'],
		'no-new-require': ['error'],
		'no-path-concat': ['error'],
		'no-process-env': ['error'],
		'no-process-exit': ['error'],
		// 'no-restricted-modules': ['error'],	// I don't know any modules to not allow
		'no-sync': ['error'],

		/**
		 * Stylistic Issues (all)
		 **/
		'array-bracket-spacing': ['error'],
		'block-spacing': ['error'],
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		camelcase: ['error', { properties: 'never' }],
		'comma-spacing': ['error'],
		'comma-style': ['error'],
		'computed-property-spacing': ['error'],
		'consistent-this': ['error'],
		'eol-last': ['error'],
		// 'func-names': ['error'],				// Helpful debugging, but clutters code
		// +Over 500+ of these in wingr Mar 14th
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
		// 'id-blacklist': ['error'],				// I like generic var names at times
		'id-length': ['error', { min: 1, max: 30 }], // Short & long are each useful
		// 1-30 sticks our current at least
		// 'id-match': ['error'],					// Processor intensive - skip it
		// indent: ['error', 'tab', { SwitchCase: 1 }],
		'jsx-quotes': ['error'],
		'key-spacing': ['error', { multiLine: { mode: 'minimum' } }], // Alignment for multi
		'keyword-spacing': ['error', {}],
		'linebreak-style': ['error', 'unix'],
		// 'lines-around-comment': ['error'],	// Terser code style, this rule not for me
		'max-depth': ['error', { max: 3 }],
		'max-len': ['error', 100, { ignoreUrls: true }], // Prettier imperfect @ 90 config
		'max-nested-callbacks': ['error', 3],
		'max-params': ['error', { max: 4 }],
		'max-statements': ['error', { max: 15 }],
		'max-statements-per-line': ['error'],
		'new-cap': ['error'],
		'new-parens': ['error'],
		// 'newline-after-var': ['error'],		// I instantiate later, & need both styles
		// 'newline-before-return': ['error'],	// I like terse code, plus we highlight it
		// 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }], // Prettier
		'no-array-constructor': ['error'],
		'no-bitwise': ['error'],
		// 'no-continue': ['error'],				// Continue statements squash nesting
		// 'no-inline-comments': ['error'],		// I like comments after code
		'no-lonely-if': ['error'],
		// 'no-mixed-spaces-and-tabs': ['error'],					// eslint:recommended
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-negated-condition': ['error'],
		'no-nested-ternary': ['error'],
		'no-new-object': ['error'],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		// 'no-restricted-syntax': ['error'],	// Eh, use what you like in JS
		'no-spaced-func': ['error'],
		// 'no-ternary': ['error'],				// I like the ternary operator
		'no-trailing-spaces': ['error'],
		// 'no-underscore-dangle': ['error'],	// I hack too much on private vars
		// * From using bleeding edge software
		'no-unneeded-ternary': ['error', { defaultAssignment: false }],
		'no-whitespace-before-property': ['error'],
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
		'one-var': ['error', 'never'],
		'one-var-declaration-per-line': ['error', 'always'],
		'operator-assignment': ['error'],
		'operator-linebreak': ['error'],
		'padded-blocks': ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		// quotes: ['error', 'single'],
		// 'require-jsdoc': ['error'],			// Descriptive naming > docs
		semi: ['error', 'never'],
		'semi-spacing': ['error'],
		// 'sort-vars': ['error'],				// Too much burden & incorrect sometimes
		'space-before-blocks': ['error'],
		'space-before-function-paren': ['error', 'never'],
		'space-in-parens': ['error'],
		'space-infix-ops': ['error'],
		'space-unary-ops': ['error'],
		'spaced-comment': ['error', 'always', { line: { markers: ['/'] } }],
		'unicode-bom': ['error'],
		'wrap-regex': ['error'],

		/**
		 * ECMAScript 6 (all)
		 **/
		'arrow-body-style': ['error', 'as-needed'],
		'arrow-parens': ['error', 'as-needed'],
		'arrow-spacing': ['error'],
		// 'constructor-super': ['error'],						// eslint:recommended
		'generator-star-spacing': ['error'],
		// 'no-class-assign': ['error'],						// eslint:recommended
		// 'no-confusing-arrow': ['error', { allowParens: true }],
		// 'no-const-assign': ['error'],						// eslint:recommended
		'no-dupe-class-members': ['error'], // eslint:recommended
		'no-duplicate-imports': ['error'],
		// 'no-new-symbol': ['error'],							// eslint:recommended
		// 'no-restricted-imports': ['error'],					// Let's allow everything
		// 'no-this-before-super': ['error'],					// eslint:recommended
		'no-useless-computed-key': ['error'],
		'no-useless-constructor': ['error'],
		'no-useless-rename': ['error'],
		'no-var': ['error'],
		'object-shorthand': ['error'],
		'prefer-arrow-callback': ['error'],
		'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
		//	https://github.com/meteor/meteor/issues/7060
		// 'prefer-reflect': ['error', { exceptions: [			// Meteor missing Reflect
		// 'call'	// Used all over by Meteor.call(...)	// * https://goo.gl/W1M3K0
		// ] }],
		'prefer-rest-params': ['error'],
		'prefer-spread': ['error'],
		'prefer-template': ['error'],
		'require-yield': ['error'],
		'sort-imports': ['error'],
		'template-curly-spacing': ['error'],
		'yield-star-spacing': ['error'],

		/**
		 * Plugin: lodash (exceptions as recommended enabled all)
		 **/
		'lodash/prefer-lodash-method': ['off'],
		'lodash/import-scope': ['off'], // We're okay importing it all; don't care to prematurely optomize
		//'lodash/prefer-lodash-method': ['warn', { except: ['find'] }],

		/**
		 * Plugin: meteor (all)
		 **/
		/* General*/
		'meteor/no-zero-timeout': ['error'],
		/* Session*/
		'meteor/no-session': ['error'],
		'meteor/prefer-session-equals': ['off'], // Once no sessions don't need this
		/* Security*/
		'meteor/audit-argument-checks': ['error'],
		/* Blaze*/
		'meteor/template-names': ['error'],
		'meteor/no-template-lifecycle-assignments': ['error'],
		'meteor/eventmap-params': [
			'error',
			{
				eventParamName: 'ev',
				templateInstanceParamName: 'it'
			}
		],
		'meteor/prefix-eventmap-selectors': ['error', 'js-', 'strict'],
		'meteor/scope-dom-lookups': ['error'],
		'meteor/no-dom-lookup-on-created': ['error'],
		'meteor/no-template-parent-data': ['error'],

		/**
		 * Plugin: import (all)
		 **/
		/* Static analysis */
		'import/no-unresolved': ['error'],
		'import/named': ['error'],
		'import/default': ['error'],
		'import/namespace': ['error'],
		/* Helpful warnings */
		'import/export': ['error'],
		'import/no-named-as-default': ['error'], // Not working for Meteor?
		'import/no-named-as-default-member': ['error'], // "
		// 'import/no-deprecated': ['error'],				// Rule is work in progress
		// https://goo.gl/EH0DNB
		// 'import/no-extraneous-dependencies': ['error'],	// False positive Meteor
		'import/no-mutable-exports': ['error'],
		/* Module systems */
		//'import/no-commonjs': ['error'],
		'import/no-amd': ['error'],
		// 'import/no-nodejs-modules': ['error'],			// Meteor is server side too
		/* Style guide */
		'import/imports-first': ['error'],
		'import/no-duplicates': ['error'],
		'import/no-namespace': ['error'],
		'import/extensions': ['error'],
		// 'import/order': ['error'],						// sorts-imports does this
		'import/newline-after-import': ['error'],
		'import/prefer-default-export': ['error']
	}
}
