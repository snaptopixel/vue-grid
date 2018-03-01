import { ColumnGroup } from './ColumnGroup';
import { Prop, Component } from 'vue-property-decorator';
import Vue, { ComponentOptions } from 'vue';
import fastdom from 'fastdom';
import 'grid/Grid.styl';

@Component
export class Grid extends Vue {
  @Prop() items: any[];

  private rowDefinition: any = null;

  public get rows() {
    if (!this.rowDefinition) { return []; }
    // TODO limit this to visible in position only
    return this.items.map(model => {
      return this.$createElement(this.rowDefinition, {props: {model}});
    });
  }

  mounted() {
    const h = this.$createElement;
    const groupedColumns = [];
    this.$slots.colgroup.forEach(slot => {
      const c = slot.componentInstance as ColumnGroup;
      const renderFns = c.getColumns();
      groupedColumns.push(data => renderFns.map(r => r(data)));
    });
    @Component
    class GridRow extends Vue {
      @Prop() public model: any;
      render(h) {
        console.log(groupedColumns.map(f => f(this.model)));
        return h(
          'div',
          {class: 'uv-grid-row'},
          groupedColumns.map(f => f(this.model))
        );
      }
      mounted() {
        this.measure();
      }
      updated() {
        this.measure();
      }
      measure() {
        console.log('hi', this.$el.offsetHeight);
      }
    }
    this.rowDefinition = GridRow;
  }
  render(h) {
    return h('div', {class: 'uv-grid'}, [
      h('div', {class: 'uv-grid-header'}, this.$slots.colgroup),
      h('div', {class: 'uv-grid-body'}, this.rows),
    ]);
  }
}