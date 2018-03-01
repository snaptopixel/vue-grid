import Vue, { ComponentOptions } from 'vue';
import * as fastdom from 'fastdom';
import { Component, Prop } from 'vue-property-decorator';

@Component
export class Column extends Vue {
  
  @Prop() public width: number;

  private columnWidth: number;

  render(h) {
    return h('div', {
      class: 'uv-grid-column',
      style: { minWidth: `${this.width}px`, maxWidth: `${this.width}px`}
    }, [this.$slots.label]);
  }

  mounted() {
    this.columnWidth = this.$el.offsetWidth;
  }

  renderColumn(data: any) {
    return this.$createElement('div', {
      class: 'uv-grid-column',
      style: { minWidth: `${this.columnWidth}px`, maxWidth: `${this.columnWidth}px` }
    }, [this.$scopedSlots.template(data)]);
  }

}
