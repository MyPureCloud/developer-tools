import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function() {

        this.editor = window.ace.edit(this.get('element'));
        this.get('aceInit')(this.editor);
        this.editor.getSession().setValue(this.get('value'));

        this.editor.getSession().setFoldStyle("markbegin");

        this.editor.on('change', function(){
            this.set('value', this.editor.getSession().getValue());
        }.bind(this));

        let that = this;
        this.editor.commands.addCommand({
            name: "Run",
            exec: function(){that.toggleProperty('runToggle');},
            bindKey: {mac: "cmd-enter", win: "ctrl-enter"}
        });
    },
    didReceiveAttrs() {
        this._super(...arguments);

    }
});
