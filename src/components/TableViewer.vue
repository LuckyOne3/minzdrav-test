<template>

  <table class="table" >
    <tr>
      <th v-for="item in data.headers">
        {{ item.label }}
      </th>
    </tr>
    <tr v-for="item in data.body">
      <td v-for="i in item">{{ i }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TableViewer',
  props: {
    data: {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  tr {
    border-top: 1px solid #dfe2e5;
    &:last-child{
      font-weight: bold;
      border: none;
      border: 4px solid black;
      td{
        border: 1px solid black;
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
</style>
