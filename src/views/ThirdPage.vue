<template>
  <div class="container">


    <table class="table scpecial">
      <tr>
        <th>
          №
        </th>
        <th>
          МНН
        </th>
        <th>
          ТН
        </th>
        <th>
          ЖНВЛП
        </th>
      </tr>
      <tr>
        <td colspan="4" class="grey">ЛС в перечне ЖНВЛП</td>
      </tr>
      <tr v-for="(item,index) in dataInfoWithTrue">
        <td>{{ index + 1 }}</td>
        <td v-for="i in item">
          <div v-if="i === 'False'">
            N
          </div>
          <div v-else-if="i === 'True'">
            V
          </div>
          <div v-else>

            <div v-for="elem in openMas(i)">
              {{ elem }}
            </div>

          </div>
        </td>
      </tr>
      <tr>
        <td colspan="4" class="grey">Остальные ЛС</td>
      </tr>
      <tr v-for="(item,index) in dataInfoWithFalse">
        <td>{{ index + 1 }}</td>
        <td v-for="i in item">
          <div v-if="i === 'False'">
            N
          </div>
          <div v-else-if="i === 'True'">
            V
          </div>
          <div v-else>
            <div v-for="elem in openMas(i)">
              {{ elem }}
            </div>
          </div>
        </td>
      </tr>

    </table>


  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'

export default {
  name: 'ThirdPage',
  data() {
    return {
      infoWithTrue: [],
      infoWithFalse: []
    }
  },
  mounted() {
    // "SELECT `spMNN`.`MNN`,`spMNN`.`VEN`,group_concat(spTN.TN) as TN FROM `spTN`
    // INNER JOIN `spMNN` ON `spMNN`.`id`=`spTN`.`MNN`
    // WHERE `spMNN`.`VEN` = 'False' или 'True'
    // GROUP BY `spMNN`.`MNN`"
    axios
        .get('http://fortest.webtm.ru/index.php?query=true')
        .then(response => (this.infoWithTrue = response.data));

    axios
        .get('http://fortest.webtm.ru/index.php?query=false')
        .then(response => (this.infoWithFalse = response.data));
  },
  computed: {

    dataInfoWithTrue() {
      return this.infoWithTrue;
    },
    dataInfoWithFalse() {
      return this.infoWithFalse;
    },

  },
  created() {
    this.findRepetitionsAndReplace()
  },
  methods: {
    openMas(mass) {
      if (mass.length) {
        return mass.split(',')
      } else {
        return 'l'
      }
    }
  }

}
</script>

<style scoped lang="scss">
.grey {
  background-color: #d9e2f3;
}

</style>
