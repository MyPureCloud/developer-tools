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

            if(parseInt(aSplit[0]) !== parseInt(bSplit[0])){
                return parseInt(bSplit[0]) - parseInt(aSplit[0]);
            }
            else if(parseInt(aSplit[1]) !== parseInt(bSplit[1])){
                return parseInt(bSplit[1]) - parseInt(aSplit[1]);
            }else{
                return parseInt(bSplit[2]) - parseInt(aSplit[2]);
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
