<template>

  <table class="table">
    <tr>
      <th v-for="item in data.headers">
        {{ item.label }}
      </th>
    </tr>
    <tr v-for="item in data.body">
      <td v-for="(i,index) in item">
        <div v-if="typeof openMas(i) === 'object'">
          <div v-for="elem in openMas(i)">
            {{ elem }}
          </div>
        </div>
        <div v-else>{{ i }}</div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TableViewer',
  props: {
    data: {}
  },
  methods: {
    openMas(mass) {
      if (mass.length) {
        return mass
      } else {
        return 'l'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.table {
  tr {
    border-top: 1px solid #dfe2e5;

    &:last-child {
      font-weight: bold;
      border: none;
      border: 4px solid black;

      td {
        border: 1px solid black;
        &:nth-child(1){
          border: none!important;
        }
        &:nth-child(2){
          border: none!important;
        }
        &:nth-child(3){
          border: none!important;
        }
      }

    }

    td {
      width: auto;
      max-width: 350px;

      &:nth-child(3) {


      }
    }

    &:nth-child(2n) {
      background-color: #f6f8fa;
    }
  }

  th {
    background-color: rgb(255, 255, 204);
  }

  td, th {
    border: 1px solid #dfe2e5;
    padding: .6em 1em;
  }


}
.special{
  tr {
    border-top: 1px solid #dfe2e5;

    &:last-child {
      border: 1px solid #dfe2e5!important;
      font-weight: normal!important;
      td {
        border: 1px solid black;
        &:nth-child(1){
          border: 1px solid #dfe2e5!important;
        }
        &:nth-child(2){
          border: 1px solid #dfe2e5!important;
        }
        &:nth-child(3){
          border: 1px solid #dfe2e5!important;
        }
      }
    }
    td {
      border: 1px solid #dfe2e5!important;
      padding: .6em 1em;
    }
  }
}
</style>
