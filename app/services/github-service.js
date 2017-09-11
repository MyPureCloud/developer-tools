/*global $*/
import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented,{
    jsSdkReleases:[],
    _processSdkTags(tags){
        let releases = [];
        for(var x=0;x< tags.length; x++){
            releases.push(tags[x].name);
        }
        releases.sort(function compare(a, b) {
            let aSplit = a.split('.');
            let bSplit = b.split('.');
            if(aSplit[0].localeCompare(bSplit[0])!== 0){
                return bSplit[0].localeCompare(aSplit[0]);
            }
            else if(aSplit[1].localeCompare(bSplit[1])!== 0){
                return bSplit[1].localeCompare(aSplit[1]);
            }else{
                return bSplit[2].localeCompare(aSplit[2]);
            }

        });

        return releases;

    } ,
    init(){

        let that = this;
        $.getJSON("https://api.github.com/repos/MyPureCloud/platform-client-sdk-javascript/tags").done(function(tags){
            that._processSdkTags(tags);
            if ( !(that.get('isDestroyed') || that.get('isDestroying')) ) {

                that.set("jsSdkReleases", that._processSdkTags(tags));
            }
        });
    }
});
