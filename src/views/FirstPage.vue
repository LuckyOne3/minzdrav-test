<template>
  <div class="container">
    <div class="button_group mb-4">


      <input type="file" class="my_input" @change="importExcel($event)" id="upload"/>
    </div>
    <TableViewer :data="changedExcel1Val"/>

  </div>
</template>

<script>
// @ is an alias to /src
import TableViewer from '@/components/TableViewer.vue'
import xlsx from 'xlsx'
import {setTable} from "@/scripts/setTable";

export default {
  name: 'FirstPage',
  components: {
    TableViewer,
  },
  data() {
    return {
      excel: {
        headers: [],
        body: []
      },
      changedExcel: {
        headers: [],
        body: []
      },
    }
  },
  computed: {
    changedExcel1Val(){
      return this.$store.getters.excelChanged1;
    }

  },
  methods: {
    /**
     * Import table
     */
    importExcel(e) {
      const files = e.target.files;
      console.log(files);
      if (!files.length) {
        return;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("The upload format is incorrect. Please upload xls or xlsx format");
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
          let excellist = []; // Clear received data
          // Edit data
          for (var i = 0; i < ws.length; i++) {
            excellist.push(ws[i]);
          }
          console.log("Read results", excellist); // At this point, you get an array containing objects that need to be processed
          // Get header2-1
          const a = workbook.Sheets[workbook.SheetNames[0]];
          let headers = this.getHeader(a);
          console.log('headers', headers);
          this.excel = {
            headers: JSON.parse(JSON.stringify(headers)),
            body: JSON.parse(JSON.stringify(excellist)),
          }
          excellist.sort(function (a, b) {
            let nameA = a['Международное непатентованное наименование']
            let nameB = b['Международное непатентованное наименование']
            if (nameA < nameB) //сортируем строки по возрастанию
              return -1
            if (nameA > nameB)
              return 1
            return 0 // Никакой сортировки
          })

          excellist = this.addTotalPrice(excellist)
          headers = this.addHeaderForTotalPrice(headers)
          excellist = this.addTotalValues(excellist)
          this.setTableHandler(headers, excellist);

          // Get header2-2
        } catch (e) {
          return alert("Read failure!");
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      input.value = "";
    },
    getHeader(sheet) {
      const XLSX = xlsx;
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]); // worksheet['!ref'] Is the valid range of the worksheet
      let C;
      /* Get cell value start in the first row */
      const R = range.s.r; //Line / / column C
      let i = 0;
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cell =
            sheet[
                XLSX.utils.encode_cell({c: C, r: R})
                ]; /* Get the cell value based on the address  find the cell in the first row */
        var hdr = "UNKNOWN" + C; // replace with your desired default
        // XLSX.utils.format_cell Generate cell text value
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        if (hdr.indexOf('UNKNOWN') > -1) {
          if (!i) {
            hdr = '__EMPTY';
          } else {
            hdr = '__EMPTY_' + i;
          }
          i++;
        }
        headers.push(hdr);
      }
      return headers;
    },
    setTableHandler(headers, excellist) {
      this.$store.dispatch('SET_EXCEL_ACTION', this.excel)
      let result = setTable(headers, excellist)


      this.changedExcel.headers = result.headers
      this.changedExcel.body = result.excellist
      this.$store.dispatch('SET_EXCEL_CHANGED_1_ACTION', this.changedExcel)
    },
    addTotalPrice(excellist) {
      excellist.forEach((item, index) => {
        let cur = item['Количество'] * item['Цена']
        item['Затраты'] = +cur.toFixed(2)
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
        price += item['Цена']
        count += item['Количество']
        totalPrice += item['Затраты']
      })
      excellist.push(
          {
            "Международное непатентованное наименование": 'Итого',
            "Торговое наименование": ' ',
            "Форма выпуска": ' ',
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
