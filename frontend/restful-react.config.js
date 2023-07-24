/**
 * Restful-react configuration.
 *
 * @type {import('restful-react/dist/bin/config').RestfulReactAdvancedConfiguration}
 */
module.exports = {
  travelInsightsBackend: {
    file: '../backend/src/openapi.generated.json',
    output: 'src/api.generated.tsx',
    customProps: {
      base: '"https://tinfbackend.freemine.de/api"'
    }
  }
};
