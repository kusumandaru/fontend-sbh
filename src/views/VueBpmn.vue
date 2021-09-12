<template>
  <div ref="container" class="vue-bpmn-diagram-container"></div>
</template>

<script>
/* eslint-disable */
  import BpmnJS from 'bpmn-js';
  export default {
    name: 'vue-bpmn',
    props: {
      xml: {
        type: String,
        required: true
      },
      activity: {
        type: String,
        required: true
      },
      options: {
        type: Object
      }
    },
    data: function() {
      return {
        diagramXML: null
      };
    },
    mounted: function () {
      var container = this.$refs.container;
      var self = this;
      var _options = Object.assign({
        container: container
      }, this.options)
      this.bpmnViewer = new BpmnJS(_options);
      this.bpmnViewer.on('import.done', function(event) {
        var error = event.error;
        var warnings = event.warnings;
        if (error) {
          self.$emit('error', error);
        } else {
          self.$emit('shown', warnings);
        }
        var canvas =  self.bpmnViewer.get('canvas')
        canvas.addMarker(self.activity, 'highlight');   
        canvas.zoom('fit-viewport');
        canvas.zoom('fit-viewport');

      });
      if (this.xml) {
        this.diagramXML = this.xml;
      }
    },
    beforeDestroy: function() {
      this.bpmnViewer.destroy();
    },
    watch: {
      xml: function(val) {
        this.$emit('loading');
        this.diagramXML = this.xml;
      },
      diagramXML: function(val) {
        this.bpmnViewer.importXML(val);
      }
    },
    methods: {
    }
  };
/* eslint-enable */
</script>

<style>
  .vue-bpmn-diagram-container {
    height: 900px;
    width: 500px;
  }
</style>
