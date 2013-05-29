/*
 * Increase version number
 *
 * grunt bump
 * grunt bump:patch
 * grunt bump:minor
 * grunt bump:major
 *
 * @author Vojta Jina <vojta.jina@gmail.com>
 * @author Mathias Paumgarten <mail@mathias-paumgarten.com>
 */
var bumpVersion = require("./bump/index.js");

module.exports = function(grunt) {
  grunt.registerTask('bump', 'Increment the version number.', function() {
    var versionType = this.args[0];
    var argPackages = this.args.splice(versionType ? 1 : 0);
    var packages = argPackages.length ? argPackages : ['package.json', 'bower.json', 'component.json'];

    packages.filter(grunt.file.exists).map(grunt.file.read).forEach(function(content, i) {
      var version;

      content = content.replace(/([\'|\"]version[\'|\"][ ]*:[ ]*[\'|\"])([\d|.]*)([\'|\"])/i, function(match, left, center, right) {
        version = bumpVersion(center, versionType || 'patch');

        return left + version + right;
      } );
      grunt.file.write(packages[i], content);
    });

    grunt.log.ok('Version bumped to ' + version);
  });
};

