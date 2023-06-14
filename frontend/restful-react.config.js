/**
 * Restful-react configuration.
 *
 * @type {import("restful-react/dist/bin/config").RestfulReactAdvancedConfiguration}
 */
module.exports = {
	travelInsightsBackend: {
		file: '../backend/src/openapi.generated.json',
		output: 'src/api.generated.tsx',
		customProps: {
			base: '"http://localhost:4567/api"',
		},
	},
};
