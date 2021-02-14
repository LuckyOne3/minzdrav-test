<template>
  <div class="container">
    <div v-if="changedExcel2Val.body.length === 1">
      Выберите файл xslx на первой странице
    </div>
    <TableViewer v-else :data="changedExcel2Val"/>

  </div>
</template>

<script>
// @ is an alias to /src
import TableViewer from '@/components/TableViewer.vue'
import {setTable} from "@/scripts/setTable";

export default {
  name: 'SecondPage',
  components: {
    TableViewer,
  },
  data() {
    return {
      changedExcel: {
        headers: [],
        body: []
      },
    }
  },
  computed: {
    excel() {
      return this.$store.getters.excel;
    },
    changedExcel2Val() {
      return this.$store.getters.excelChanged2;
    }

  },
  created() {
    this.findRepetitionsAndReplace()
  },
  methods: {
    findRepetitionsAndReplace() {
      console.log(this.changedExcel2Val.body)
      if (this.changedExcel2Val.body.length === 0 | this.changedExcel2Val.body.length === 1) {
        let data = this.excel.body

        data.sort(function (a, b) {
          let nameA = a['Международное непатентованное наименование']
          let nameB = b['Международное непатентованное наименование']
          if (nameA < nameB) //сортируем строки по возрастанию
            return -1
          if (nameA > nameB)
            return 1
          return 0 // Никакой сортировки
        })

        let previousItem = {}
        const massOfCompanies = []
        let flag = false
        let indexOfPrevious = null
        let massOfSame = []
        data.forEach((item, index) => {
          console.log(item['Международное непатентованное наименование'])
          if (index > 0) {
            if (flag === false) {
              indexOfPrevious = index - 1
              previousItem = data[indexOfPrevious]
            }
            flag = false
            if (previousItem['Международное непатентованное наименование'] === item['Международное непатентованное наименование']) {
              flag = true
            } else {
              massOfSame = data.slice(indexOfPrevious, index)
              let price = 0;
              let count = 0;
              let total = 0;
              let torgName = []
              let formVip = []
              if (massOfSame.length === 1) {
                console.log("da")
              } else {
                massOfSame.forEach((item) => {
                  price += item['Цена'] * item['Количество']
                  count += item['Количество']
                  torgName.push(item['Торговое наименование'] + '\n')
                  formVip.push(item['Форма выпуска'] + '\n')
                })
                total = price / count
                previousItem['Цена'] = total
                previousItem['Количество'] = count
                previousItem['Торговое наименование'] = torgName
                previousItem['Форма выпуска'] = formVip
              }
              console.log('same', massOfSame)
              massOfCompanies.push(item)
            }
          } else {
            massOfCompanies.push(item)
          }

        })
        console.log("уникальный массив", massOfCompanies)
        this.changedExcel.headers = this.addHeaderForTotalPrice(this.excel.headers)
        this.changedExcel.body = this.addTotalPriceAndRemoveOthers(massOfCompanies)

        console.log('zzzz', this.changedExcel)
        this.addTotalValues(this.changedExcel.body)
        this.setTableHandler(this.changedExcel.headers, this.changedExcel.body)

      }

    },
    setTableHandler(headers, excellist) {

      let result = setTable(headers, excellist)

      this.changedExcel.headers = result.headers
      this.changedExcel.body = result.excellist
      this.$store.dispatch('SET_EXCEL_CHANGED_2_ACTION', this.changedExcel)
    },
    addTotalPriceAndRemoveOthers(excellist) {
      excellist.forEach((item, index) => {
        let current = item['Количество'] * item['Цена']
        item['Затраты'] = +current.toFixed(2)
      })
      return excellist
    },
    addHeaderForTotalPrice(headers) {
      headers.push('Затраты')
      return headers
    },
    addTotalValues(excellist) {
      let price = 0;
      let count = 0;
      let totalPrice = 0;
      excellist.forEach((item, index) => {
        price += +item['Цена'].toFixed(2)
        count += item['Количество']
        totalPrice += +item['Затраты'].toFixed(2)
      })
      excellist.push(
          {
            "Международное непатентованное наименование": 'Итого',
            "Торговое наименование" : '',
            "Форма выпуска" : '',
            "Количество": +count.toFixed(2),
            //"Цена": '---',
            "Цена": +price.toFixed(2),
            "Затраты": +totalPrice.toFixed(2),
          }
      )
      return excellist
    },
  }
}
</script>

<style lang="scss">

</style>
