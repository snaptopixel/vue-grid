import 'index.styl';
import Vue from 'vue';
import { Grid } from 'grid/Grid';
import { Column } from 'grid/Column';
import { ColumnGroup } from 'grid/ColumnGroup';
import {Chance} from 'chance';

const c = new Chance();

class MockData {
  public name = c.name();
  public id = c.guid();
  public message = c.sentence();
}

const items = [];
for(let i=0, l=100; i<l; i++) {
  items.push(new MockData());
}

new Vue({
  el: '#app',
  components: {
    uvGrid: Grid,
    uvGridColgroup: ColumnGroup,
    uvGridColumn: Column
  },
  methods: {
    updateList() {
      this.items = [new MockData(), new MockData()]
    }
  },
  data() {
    return {
      items
    }
  },
  template: `
  <div>
  <button @click="updateList" style="display:block;">Test</button>
  <uv-grid v-bind:items="items">
    <uv-grid-colgroup slot="colgroup">
      <template slot="label">Column Group</template>
      <uv-grid-colgroup slot="colgroup">
        <template slot="label">Column Group</template>
        <uv-grid-column ref="name" slot="column" width="300">
          <template slot="label">Name</template>
          <template slot="template" slot-scope="data">
            <div style="height: 50px">{{data}}</div>
          </template>
        </uv-grid-column>
        <uv-grid-column ref="id" slot="column" width="100">
          <template slot="label">Id</template>
          <template slot="template" slot-scope="data">
            {{data}}
          </template>
        </uv-grid-column>
        <uv-grid-column ref="message" slot="column">
          <template slot="label">Message</template>
          <template slot="template" slot-scope="data">
            {{data}}
          </template>
        </uv-grid-column>
      </uv-grid-colgroup>
      <uv-grid-colgroup slot="colgroup">
        <template slot="label">Column Group</template>
        <uv-grid-column ref="name" slot="column" width="300">
          <template slot="label">Name</template>
          <template slot="template" slot-scope="data">
            <div style="height: 50px">{{data}}</div>
          </template>
        </uv-grid-column>
        <uv-grid-column ref="id" slot="column" width="100">
          <template slot="label">Id</template>
          <template slot="template" slot-scope="data">
            {{data}}
          </template>
        </uv-grid-column>
        <uv-grid-column ref="message" slot="column">
          <template slot="label">Message</template>
          <template slot="template" slot-scope="data">
            {{data}}
          </template>
        </uv-grid-column>
      </uv-grid-colgroup>
    </uv-grid-colgroup>
    <uv-grid-colgroup slot="colgroup">
        <template slot="label">Column Group</template>
        <uv-grid-column ref="name" slot="column" width="300">
          <template slot="label">Name</template>
          <template slot="template" slot-scope="data">
            <div style="height: 50px">{{data}}</div>
          </template>
        </uv-grid-column>
    </uv-grid-colgroup>
  </uv-grid>
  </div>`
});