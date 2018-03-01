import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { Column } from 'grid/Column';

type ColumnRenderFn = typeof Column.prototype.renderColumn;

@Component
export class ColumnGroup extends Vue {
  render(h) {
    return h('div', {'class': 'uv-grid-header-colgroup'}, [
      h('div', {'class': 'label'}, [this.$slots.label]),
      h('div', {'class': 'content'}, [this.$slots.column || this.$slots.colgroup])
    ]);
  }

  getColumns(): ColumnRenderFn[] {
    if (this.$slots.colgroup) {
      let allColumns: ColumnRenderFn[] = [];
      this.$slots.colgroup.forEach(slot => {
        allColumns = allColumns.concat((slot.componentInstance as ColumnGroup).getColumns());
      });
      return allColumns;
    } else {
      return this.$slots.column.map(slot => {
        const c = slot.componentInstance as Column;
        return model => c.renderColumn(model[slot.data.ref]);
      });
    }
  }
}
