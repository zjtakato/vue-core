import Vue from 'Vue';

let vm = new Vue({
  data: function () {
    return {
      name: 'xx',
      age: 18,
      info: {
        address: 'china',
      },
    };
  },
  watch: {
    // info() {
    //   console.log('xxx');
    // },
  },
  computed: {
    full(){
      return this.name + this.age;
    }
  }
});

// vm.full;
// vm.full;
// vm.name = 'xxx';
// vm.full;