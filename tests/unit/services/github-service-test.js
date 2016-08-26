import { moduleFor, test } from 'ember-qunit';

moduleFor('service:github-service', 'Unit | Service | github service', {

});

const tagList = [  {
    "name": "0.51.0",
    "zipball_url": "https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/zipball/0.39.0",
    "tarball_url": "https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/tarball/0.39.0",
    "commit": {
      "sha": "f0056123541222ba3056c0454d787915bb8ff990",
      "url": "https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/commits/f0056123541222ba3056c0454d787915bb8ff990"
    }
  },
  {
    "name": "0.52.0",
    "zipball_url": "https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/zipball/0.38.0",
    "tarball_url": "https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/tarball/0.38.0",
    "commit": {
      "sha": "b9974dd8e28839aca10526a02d5ceb38afd545b2",
      "url": "https://api.github.com/repos/MyPureCloud/purecloud_api_sdk_javascript/commits/b9974dd8e28839aca10526a02d5ceb38afd545b2"
    }
  }
];

test('process github tags', function(assert) {
    let service = this.subject();

    let result = service._processSdkTags(tagList);
    
    assert.equal(result.length, 2);
    assert.equal(result[0],'0.52.0');
});
