/*
 * @version: 0.0.1
 * @author: https://twitter.com/isocroft
 * 
 * @project: https://github.com/synergixe/vue-trix
 */

<template>
  <VueTrix
    ref="trix"
    :localStorage="localStorage"
    v-trix-editor-options="editorOptions"
    :placeholder="placeholder"
    :init-content="initialContent"
    :inputId="inputId"
    :inputName="inputName"
    v-model="content"
    @trix-attachment-add="handleAttachmentAdd"
    @trix-attachment-remove="handleAttachmentRemove"
    @trix-file-accept="handleFileAccept"
    @trix-before-initialize="handleBeforeInit"
    @trix-initialize="handleInit"
    @trix-focus="handleFocus"
    @trix-blur="handleBlur"
  />
</template>

<script>
import VueTrix from 'vue-trix';
export default {
  name: 'syn-vue-trix',
  props: {
    readonly: {
      default: false,
      type: Boolean
    },
    attachmentCaption: {
      default: '',
      required: false,
      type: String
    },
    placeholder: {
      default: 'Enter Content...',
      type: String
    },
    initialContent: {
      type: String,
      required: true,
      default: ''
    },
    inputId: {
      type: String,
      required: false,
      default: ''
    },
    inputName: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    VueTrix
  },
  data() {
    return {
      content: this.initialContent
    };
  },
  computed: {
    editorOptions() {
      return this.readonly ? 
        (this.attachmentCaption !== '' 
            ? {
                readonly:this.readonly,
                attachment:{caption:this.attachmentCaption}
              } : 'readonly')
        : (this.attachmentCaption !== ''
            ? {
                attachment:{caption:this.attachmentCaption}
              } : '');
    }
  },
  model:{
    prop:'initialContent',
    event:'update'
  },
  methods:{
    handleInit(data){
      this.$root.$emit("synTrixInitialize", data) // v-on:syn-trix-initialize=""
    },
    handleBeforeInit(data){
      this.$root.$emit("synTrixBeforeInitialize", data) // v-on:syn-trix-before-initialize=""
    },
    handleFocus(data) {
      this.$emit("synTrixFocus", data); // v-on:syn-trix-focus=""
    },
    handleBlur(data) {
      this.$emit("synTrixBlur", data); // v-on:syn-trix-blur=""
    },
    handleFileAccept(file) {
      this.$emit("synTrixDropFile", file); // v-on:syn-trix-drop-file=""
    },
    handleAttachmentAdd(file) {
      this.$emit("synTrixUploadFile", file); // v-on:syn-trix-upload-file=""
    },
    handleAttachmentRemove(file) {
      this.$emit("synTrixRemoveFile", file); // v-on:syn-trix-remove-file=""
    },
    updateEditorModel(val){
       if (val !== this.initialContent) 
            this.$emit('update', this.content);
         
    }
  },
  watch: {
    content: {
      immediate:true,
      handler:"updateEditorModel"
    }
  },
  directives: {
    'trix-editor-options': {
      bind(el, binding, vnode){
            let _node = (el.className.indexOf('trix-container') + 1)
                      ? el.getElementsByTagName('trix-editor')[0]
                      : (el.className.indexOf('trix-content') + 1 ? el : el );
            let _editor = _node.editor;
          if((binding.arg && binding.arg === 'readonly') 
              || (binding.value === 'readonly') 
                || (binding.value && binding.value.readonly === 'readonly')){
            _node.contentEditable = false;
            _node.parentNode.classList.add("trix-disabled");
          } else {
            _node.contentEditable = true;
            _node.parentNode.classList.remove("trix-disabled");
          }
          if(binding.value && binding.value.attachments instanceof Object){
              if(Trix){
                  Trix.config.attachments.preview.caption = binding.attachments.caption;
              }
          }
      },
      inserted(el){
          let _node = (el.className.indexOf('trix-container') + 1)
                      ? el.getElementsByTagName('trix-editor')[0]
                      : (el.className.indexOf('trix-content') + 1 ? el : el );
          let _editor = _node.editor;
          let rect = _editor.getClientRectAtPosition(0)
          let pixelOffset = rect ? {x:rect.left, y:rect.top} {x:0,y:0}
          
          // later add infomation tooltip at the pixel offset later
      },
      update(el, binding, vnode) {
        
      }
    }
  }
}
</script>

<style scoped>
.trix-container {
  /*width:auto !important;*/
  max-width: 100%;
  /*height:auto;*/
  min-height: 200px;
}
.trix-disabled .trix-editor,
.trix-disabled .trix-toolbar {
  pointer-events: none !important;
}
.trix-disabled .trix-toolbar {
  opacity: 0.56 !important;
}
</style>
